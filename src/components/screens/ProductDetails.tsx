/* eslint-disable prettier/prettier */
import { ParamListBase, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useCart } from '../../context/CartContext';
import { mockApi } from '../../services/api';
import { Product } from '../../services/mockData';
import ProductDetailsItem from '../customComponents/ProductDetailsItem';

interface RouteParams {
  product: Product;
}

const ProductDetails = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const route = useRoute<RouteProp<Record<string, RouteParams>, string>>();
  const { product } = route.params;

  const [favorites, setFavorites] = useState<{[key: string]: boolean}>({});
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { cartItems, addToCart, removeFromCart, updateQuantity } = useCart();

  useEffect(() => {
    loadRelatedProducts();
  }, []);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.navigate('Cart')} style={{ marginRight: 15 }}>
          <Image
            source={require('../images/cart.png')}
            style={{ width: 24, height: 24, tintColor: 'white' }}
          />
          {cartItems.length > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{cartItems.length}</Text>
            </View>
          )}
        </TouchableOpacity>
      ),
      headerStyle: {
        backgroundColor: '#2DB300',
      },
      headerTintColor: 'white',
    });
  }, [navigation, cartItems.length]);

  const loadRelatedProducts = async () => {
    try {
      setLoading(true);
      const products = await mockApi.products.getAll() as Product[];
      const filtered = products.filter(p => 
        p.category === product.category && p.id !== product.id
      ).slice(0, 5);
      setRelatedProducts(filtered);
      setError(null);
    } catch (err) {
      setError('Benzer ürünler yüklenirken bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  const handleFavoriteToggle = (itemId: string) => {
    setFavorites(prev => ({
      ...prev,
      [itemId]: !prev[itemId]
    }));
  };

  const handleAddToCart = async (item: Product) => {
    try {
      await addToCart({
        id: item.id,
        name: item.name,
        price: item.price,
        farm: item.farm,
        image: item.image
      });
      Alert.alert('Başarılı', 'Ürün sepete eklendi');
    } catch (err) {
      Alert.alert('Hata', 'Ürün sepete eklenirken bir hata oluştu');
    }
  };

  const handleRemoveFromCart = async (itemId: string) => {
    try {
      await removeFromCart(itemId);
    } catch (err) {
      Alert.alert('Hata', 'Ürün sepetten çıkarılırken bir hata oluştu');
    }
  };

  const handleQuantityChange = async (itemId: string, quantity: number) => {
    try {
      await updateQuantity(itemId, quantity);
    } catch (err) {
      Alert.alert('Hata', 'Ürün miktarı güncellenirken bir hata oluştu');
    }
  };

  const handleFarmPress = (farmName: string) => {
    navigation.navigate('FarmProfile', { farmName });
  };

  if (loading && relatedProducts.length === 0) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2DB300" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  const renderItem = ({ item }: { item: Product }) => {
    const quantity = cartItems.find(cartItem => cartItem.id === item.id)?.quantity || 0;

    return (
      <ProductDetailsItem
        item={item}
        quantity={quantity}
        isFavorite={favorites[item.id] || false}
        onFavoriteToggle={() => handleFavoriteToggle(item.id)}
        onRemoveFromCart={() => handleRemoveFromCart(item.id)}
        onAddToCart={() => handleAddToCart(item)}
        onQuantityChange={(newQuantity) => handleQuantityChange(item.id, newQuantity)}
        onFarmPress={() => handleFarmPress(item.farm)}
      />
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={[product, ...relatedProducts]}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        ListHeaderComponent={() => (
          <Text style={styles.sectionTitle}>
            {relatedProducts.length > 0 ? 'Benzer Ürünler' : ''}
          </Text>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    fontSize: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    padding: 15,
    backgroundColor: '#f5f5f5',
  },
  badge: {
    position: 'absolute',
    right: -6,
    top: -3,
    backgroundColor: 'red',
    borderRadius: 9,
    width: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default ProductDetails;
