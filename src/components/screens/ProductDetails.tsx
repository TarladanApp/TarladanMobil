/* eslint-disable prettier/prettier */
import { ParamListBase, RouteProp, useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect, useState, useCallback } from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useCart } from '../../context/CartContext';
import ProductDetailsItem from '../customComponents/ProductDetailsItem';

interface RouteParams {
  product: {
    id: number;
    name: string;
    price: number;
    // ... diğer product özellikleri
  };
}

interface Quantities {
  [key: number]: number;
}

interface Favorites {
  [key: number]: boolean;
}

interface SampleProduct {
  id: number;
  name: string;
  price: number;
  farm: string;
}

const ProductDetails = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const route = useRoute<RouteProp<Record<string, RouteParams>, string>>();
  const { product } = route.params;

  const [productQuantities, setProductQuantities] = useState<Quantities>({});
  const [favorites, setFavorites] = useState<Favorites>({}); 
  const [cartBadgeCount, setCartBadgeCount] = useState(0);

  const { cartItems, updateCart } = useCart();

  useEffect(() => {
    const newQuantities: Quantities = {};
    cartItems.forEach(item => {
      newQuantities[item.id] = item.quantity;
    });
    setProductQuantities(newQuantities);
    
    const totalItems = Object.values(newQuantities).reduce((a, b) => a + b, 0);
    setCartBadgeCount(totalItems);
  }, [cartItems]);

  const handleAddToCart = (productId: number) => {
    setProductQuantities(prevQuantities => {
      const newQuantities = {
        ...prevQuantities,
        [productId]: (prevQuantities[productId] || 0) + 1
      };
      
      updateCartItems(productId, newQuantities[productId]);
      return newQuantities;
    });
  };

  const handleRemoveFromCart = (productId: number) => {
    if (productQuantities[productId] > 0) {
      setProductQuantities(prevQuantities => {
        const newQuantities = {
          ...prevQuantities,
          [productId]: prevQuantities[productId] - 1
        };
        
        updateCartItems(productId, newQuantities[productId]);
        return newQuantities;
      });
    }
  };

  const updateCartItems = async (productId: number, quantity: number) => {
    const product = sampleProducts.find(p => p.id === productId);
    if (product) {
      const cartItem = {
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: quantity,
        farm: product.farm,
        image: require('../images/hasan.jpeg')
      };

      try {
        const existingCart = [...cartItems];
        const itemIndex = existingCart.findIndex(item => item.id === productId);
        
        if (itemIndex > -1) {
          if (quantity === 0) {
            existingCart.splice(itemIndex, 1);
          } else {
            existingCart[itemIndex].quantity = quantity;
          }
        } else if (quantity > 0) {
          existingCart.push(cartItem);
        }
        
        updateCart(existingCart);
      } catch (error) {
        console.error('Cart update error:', error);
      }
    }
  };

  const handleFavoriteToggle = (itemId: number) => {
    setFavorites(prevFavorites => ({
      ...prevFavorites,
      [itemId]: !prevFavorites[itemId]
    }));
  };

  const handleFarmPress = (farmName: string) => {
    navigation.navigate('FarmProfile', { farmName });
  };

  useFocusEffect(
    useCallback(() => {
      navigation.setOptions({
        title: product.name,
        headerTitleAlign: 'center',
        headerTitleStyle: {
          color: 'white',
        },
        headerTintColor: 'white',
        headerStyle: {
          backgroundColor: '#2DB300',
        },
        headerRight: () => (
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginRight: 20 }}>
            <TouchableOpacity onPress={() => navigation.navigate("Cart")}>
              <Image
                source={require('../images/cart.png')}
                style={{ width: 30, height: 30, tintColor: 'white' }}
              />
              {cartBadgeCount > 0 && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{cartBadgeCount}</Text>
                </View>
              )}
            </TouchableOpacity>
          </View>
        ),
        headerLeft: () => (
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              source={require('../images/back.png')}
              style={{ width: 30, height: 30, tintColor: 'white', marginLeft: 10 }}
            />
          </TouchableOpacity>
        ),
      });
    }, [navigation, product, cartBadgeCount])
  );


  const sampleProducts = [
    { id: 1, name: 'Yeşil Salatalık', price: 5, farm: 'Yeşil Tarım Çiftliği' },
    { id: 2, name: 'Taze Salatalık', price: 6, farm: 'Güneşin Doğuşu Çiftliği' },
    { id: 3, name: 'Organik Salatalık', price: 7, farm: 'Doğal Bereket Çiftliği' },
    { id: 4, name: 'Çıtır Salatalık', price: 8, farm: 'Kırsal Lezzetler Çiftliği' },
    { id: 5, name: 'Bahçe Salatalığı', price: 9, farm: 'Rüzgarın Şarkısı Çiftliği' },
    { id: 6, name: 'Lezzetli Salatalık', price: 10, farm: 'Harika Doğa Çiftliği' },
    { id: 7, name: 'Doğal Salatalık', price: 11, farm: 'Nar Tadı Çiftliği' },
    { id: 8, name: 'Organik Salatalık', price: 12, farm: 'Bereketli Topraklar Çiftliği' },
    { id: 9, name: 'Sulu Salatalık', price: 13, farm: 'Gökyüzü Bahçeleri Çiftliği' },
    { id: 10, name: 'Taze Salatalık', price: 14, farm: 'Güneşin Işığı Çiftliği' }
  ];

  const renderItem = ({ item }: { item: SampleProduct }) => (
    <ProductDetailsItem
      item={item}
      productQuantities={productQuantities}
      handleFavoriteToggle={handleFavoriteToggle}
      handleRemoveFromCart={handleRemoveFromCart}
      handleAddToCart={handleAddToCart}
      favorites={favorites}
      onFarmPress={handleFarmPress}
    />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={sampleProducts}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: 'white',
  },
  farmNameClickable: {
    textDecorationLine: 'underline',
  },
  badge: {
    position: 'absolute',
    right: 5,
    top: -5,
    backgroundColor: 'red',
    borderRadius: 10,
    width: 20,
    height: 20,
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
