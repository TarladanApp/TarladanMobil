/* eslint-disable no-trailing-spaces */
/* eslint-disable prettier/prettier */
// CartScreen.js

import AsyncStorage from '@react-native-async-storage/async-storage';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import { Alert, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useCart } from '../../context/CartContext';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  farm: string;
  image: any;
}

interface RecommendedItem {
  id: number;
  name: string;
  price: number;
  image: any;
  farm: string;
}

const CartScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const { cartItems, updateCart } = useCart();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  const recommendedItems: RecommendedItem[] = [
    { 
      id: 101,
      name: 'Organik Domates', 
      price: 24.99, 
      image: require('../images/hasan.jpeg'),
      farm: 'Yeşil Tarım Çiftliği'
    },
    { 
      id: 102,
      name: 'Sera Salatalığı', 
      price: 19.99, 
      image: require('../images/hasan.jpeg'),
      farm: 'Güneşin Doğuşu Çiftliği'
    },
    { 
      id: 103,
      name: 'Taze Erik', 
      price: 29.99, 
      image: require('../images/hasan.jpeg'),
      farm: 'Doğal Bereket Çiftliği'
    },
    { 
      id: 104,
      name: 'Çeri Domates', 
      price: 34.99, 
      image: require('../images/hasan.jpeg'),
      farm: 'Kırsal Lezzetler Çiftliği'
    },
    { 
      id: 105,
      name: 'Taze Fasulye', 
      price: 22.99, 
      image: require('../images/hasan.jpeg'),
      farm: 'Anadolu Çiftliği'
    },
    { 
      id: 106,
      name: 'Organik Patlıcan', 
      price: 26.99, 
      image: require('../images/hasan.jpeg'),
      farm: 'Bereket Bahçesi'
    }
  ];

  useEffect(() => {
    const loadCart = async () => {
      try {
        const savedCart = await AsyncStorage.getItem('cart');
        if (savedCart) {
          updateCart(JSON.parse(savedCart));
        }
      } catch (error) {
        console.error('Cart load error:', error);
      }
    };
    
    loadCart();
  }, []);

  const handleAddToCart = (item: CartItem | RecommendedItem) => {
    const existingItem = cartItems.find(cartItem => cartItem.id === item.id);
    const updatedCart = [...cartItems];
    
    if (existingItem) {
      const index = cartItems.findIndex(cartItem => cartItem.id === item.id);
      updatedCart[index] = { ...existingItem, quantity: existingItem.quantity + 1 };
    } else {
      updatedCart.push({ 
        ...item, 
        quantity: 1, 
        farm: item.farm
      } as CartItem);
    }
    
    updateCart(updatedCart);
  };

  const handleRemoveFromCart = (id: number) => {
    const updatedCart = cartItems
      .map(item => item.id === id ? { ...item, quantity: item.quantity - 1 } : item)
      .filter(item => item.quantity > 0);
    
    updateCart(updatedCart);
  };

  const handleClearCart = () => {
    Alert.alert(
      'Sepeti Temizle',
      'Sepetinizdeki tüm ürünleri silmek istediğinize emin misiniz?',
      [
        {
          text: 'İptal',
          style: 'cancel',
        },
        {
          text: 'Evet',
          onPress: () => {
            updateCart([]);
            Alert.alert('Başarılı', 'Sepetiniz temizlendi');
          },
        },
      ],
    );
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleContinuePress = () => {
    navigation.navigate('Payment');
  };

  const renderCartItem = ({ item }: { item: CartItem }) => (
    <View style={styles.item}>
      <View style={styles.content}>
        <Image source={item.image} style={styles.image} />
        <View style={styles.details}>
          <Text style={styles.cartItemName}>{item.name}</Text>
          <Text style={styles.cartItemFarm}>1 kg</Text>
          <Text style={styles.cartItemFarm}>{item.farm}</Text>
          <Text style={styles.cartItemPrice}>₺{(item.price * item.quantity).toFixed(2)}</Text>
          <View style={styles.quantityContainer}>
            <TouchableOpacity 
              onPress={() => handleRemoveFromCart(item.id)} 
              style={styles.quantityButton}
            >
              <Text style={styles.quantityButtonText}>-</Text>
            </TouchableOpacity>
            <View style={styles.quantityBox}>
              <Text style={styles.quantityText}>{item.quantity}</Text>
            </View>
            <TouchableOpacity 
              onPress={() => handleAddToCart(item)} 
              style={styles.quantityButton}
            >
              <Text style={styles.quantityButtonText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );

  const renderRecommendedItem = ({ item }: { item: RecommendedItem }) => (
    <View style={styles.recommendedItem}>
      <Image source={item.image} style={styles.recommendedItemImage} />
      <TouchableOpacity onPress={() => handleAddToCart(item)} style={styles.addButton}>
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
      <View style={styles.recommendedItemInfo}>
        <Text style={styles.recommendedItemName}>{item.name}</Text>
        <Text style={styles.recommendedItemPrice}>₺{item.price}/kg</Text>
        <Text style={styles.recommendedItemFarm}>{item.farm}</Text>
      </View>
    </View>
  );

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);

  return (
    <View style={styles.container}>
      {/* Custom Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <TouchableOpacity onPress={handleGoBack} style={styles.headerButton}>
            <Image
              source={require('../images/back.png')}
              style={styles.headerIcon}
            />
          </TouchableOpacity>
          
          <Text style={styles.headerTitle}>Sepetim</Text>
          
          <TouchableOpacity onPress={handleClearCart} style={styles.headerButton}>
            <Image
              source={require('../images/rubbish.png')}
              style={styles.headerIcon}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Cart Items */}
      <FlatList
        data={cartItems}
        renderItem={renderCartItem}
        keyExtractor={item => item.id.toString()}
        ListEmptyComponent={() => (
          <View style={styles.emptyCart}>
            <Text style={styles.emptyCartText}>Sepetiniz boş</Text>
          </View>
        )}
        ListFooterComponent={() => (
          <>
            <View style={styles.recommendedHeader}>
              <Text style={styles.sectionTitle}>Önerilen Ürünler</Text>
              <Text style={styles.recommendedSubtitle}>Çiftliklerden Seçmeler</Text>
            </View>
            <FlatList
              data={recommendedItems}
              renderItem={renderRecommendedItem}
              keyExtractor={item => item.id.toString()}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          </>
        )}
      />

      {cartItems.length > 0 && (
        <TouchableOpacity 
          style={styles.checkoutButton} 
          onPress={handleContinuePress}
        >
          <Text style={styles.checkoutButtonText}>Devam</Text>
          <Text style={styles.totalText}>₺{total}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: 'white',
    padding: 10,
    marginVertical: 5,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E3F2D9',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    backgroundColor: '#2DB300',
    paddingTop: 20,
    paddingBottom: 5,
    height: 60,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    height: '100%',
  },
  headerButton: {
    padding: 5,
  },
  headerIcon: {
    width: 24,
    height: 24,
    tintColor: 'white',
  },
  headerTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  emptyCart: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyCartText: {
    fontSize: 16,
    color: '#666',
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
    position: 'absolute',
    top: 0,
    right: 0,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  details: {
    flex: 1,
    marginLeft: 10,
    padding: 5,
  },
  cartItemName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  cartItemFarm: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 2,
  },
  cartItemPrice: {
    fontSize: 16,
    color: '#2DB300',
    fontWeight: 'bold',
    marginBottom: 8,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  quantityButton: {
    backgroundColor: '#E3F2D9',
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
  },
  quantityButtonText: {
    fontSize: 20,
    color: '#2DB300',
    fontWeight: 'bold',
  },
  quantityBox: {
    backgroundColor: '#2DB300',
    paddingHorizontal: 15,
    paddingVertical: 5,
    marginHorizontal: 10,
    borderRadius: 5,
  },
  quantityText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  recommendedSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  recommendedItem: {
    width: 150,
    marginHorizontal: 8,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  recommendedItemImage: {
    width: '100%',
    height: 100,
    borderRadius: 8,
    marginBottom: 8,
  },
  recommendedItemInfo: {
    padding: 4,
  },
  recommendedItemName: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  recommendedItemPrice: {
    fontSize: 14,
    color: '#2DB300',
    fontWeight: 'bold',
    marginBottom: 4,
  },
  recommendedItemFarm: {
    fontSize: 12,
    color: '#666',
  },
  addButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#2DB300',
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  addButtonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  checkoutButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#2DB300',
    padding: 15,
    borderRadius: 5,
    marginVertical: 10,
  },
  checkoutButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  totalText: {
    color: 'white',
    fontSize: 18,
  },
  icon:{
    width:20,
    height:20,
    tintColor:'#2DB300',
    opacity:1,
  },
  recommendedHeader: {
    paddingHorizontal: 10,
    marginBottom: 10,
  },
});

export default CartScreen;
