/* eslint-disable no-trailing-spaces */
/* eslint-disable prettier/prettier */
// CartScreen.js

import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native';

const CartScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: "Sepetim",
      headerTitleAlign: 'center',
      headerTitleStyle: {
        color: 'white',
      },
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: '#2DB300',
      },
      headerRight: () => (
        <TouchableOpacity onPress={handleClearCart}>
          <Image
            source={require('../images/rubbish.png')}
            style={{ width: 30, height: 30, tintColor: 'white', marginRight: 10 }}
          />
        </TouchableOpacity>
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
  }, [navigation]);

  const [cartItems, setCartItems] = useState([
    { id: 1, name: 'Çilek', price: 24.99, quantity: 1, farm: 'Hamzababa Çiftliği', image: require('../images/cart.png') },
    { id: 2, name: 'Yeşil Biber', price: 24.99, quantity: 2, farm: 'Velibaba Çiftliği', image: require('../images/cart.png') },
  ]);

  const recommendedItems = [
    { id: 3, name: 'Domates', price: 24.99, image: require('../images/cart.png') },
    { id: 4, name: 'Salatalık', price: 24.99, image: require('../images/cart.png') },
    { id: 5, name: 'Erik', price: 24.99, image: require('../images/cart.png') },
    { id: 6, name: 'Çeri Domates', price: 24.99, image: require('../images/cart.png') },
  ];

  const handleAddToCart = (item) => {
    const existingItem = cartItems.find(cartItem => cartItem.id === item.id);
    if (existingItem) {
      setCartItems(cartItems.map(cartItem =>
        cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
      ));
    } else {
      setCartItems([...cartItems, { ...item, quantity: 1, farm: 'Önerilen Çiftlik' }]);
    }
  };

  const handleRemoveFromCart = (id) => {
    setCartItems(cartItems.map(item =>
      item.id === id && item.quantity > 0 ? { ...item, quantity: item.quantity - 1 } : item
    ).filter(item => item.quantity > 0));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const renderCartItem = ({ item }) => (
    <View style={styles.item}>
      <View style={styles.content}>
        <Image source={item.image} style={styles.image} />
        <View style={styles.details}>
          <Text style={styles.cartItemName}>{item.name}</Text>
          <Text style={styles.cartItemFarm}>1 kg</Text>
          <Text style={styles.cartItemFarm}>{item.farm}</Text>
          <Text style={styles.cartItemPrice}>₺{item.price}</Text>
          <View style={styles.actions}>
            <View style={styles.quantityContainer}>
              <TouchableOpacity onPress={() => handleRemoveFromCart(item.id)} style={styles.button}>
                <Image source={require('../images/rubbish.png')} style={styles.icon} />
              </TouchableOpacity>
              <Text style={styles.quantityText}>{item.quantity}</Text>
              <TouchableOpacity onPress={() => handleAddToCart(item)} style={styles.button}>
                <Text style={styles.quantityText}>+</Text>
              </TouchableOpacity>  
            </View>
          </View>
        </View>
      </View>
    </View>
  );

  const renderRecommendedItem = ({ item }) => (
    <View style={styles.recommendedItem}>
      <Image source={item.image} style={styles.recommendedItemImage} />
      <TouchableOpacity onPress={() => handleAddToCart(item)} style={styles.addButton}>
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
      <Text style={styles.recommendedItemName}>{item.name}</Text>
      <Text style={styles.recommendedItemPrice}>₺{item.price}/kg</Text>
    </View>
  );

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);

  return (
    <View style={styles.container}>
      <FlatList
        data={cartItems}
        renderItem={renderCartItem}
        keyExtractor={item => item.id.toString()}
        ListFooterComponent={() => (
          <>
            <Text style={styles.sectionTitle}>Önerilen Ürünler</Text>
            <FlatList
              data={recommendedItems}
              renderItem={renderRecommendedItem}
              keyExtractor={item => item.id.toString()}
              horizontal
            />
          </>
        )}
      />
      <TouchableOpacity 
        style={styles.checkoutButton} 
        onPress={() => navigation.navigate('PaymentScreen')}
      >
        <Text style={styles.checkoutButtonText}>Devam</Text>
        <Text style={styles.totalText}>₺{total}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    padding: 1,
    marginVertical: 6,
    marginHorizontal: 0,
    borderColor: '#ccc',
    borderBottomWidth: 1,
    borderRadius: 5,
    position: 'relative',
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
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
    width: 70,
    height: 70,
    marginRight: 10,
    justifyContent: 'center',
  },
  details: {
    flex: 1,
    marginLeft: 10,
    marginBottom: 10,
  },
  cartItemName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  cartItemFarm: {
    fontSize: 14,
    color: 'gray',
  },
  cartItemPrice: {
    fontSize: 16,
    color: '#2DB300',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    marginHorizontal: 5,
  },
  quantityText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  recommendedItem: {
    alignItems: 'center',
    marginHorizontal: 10,
    position: 'relative',
  },
  recommendedItemImage: {
    width: 70,
    height: 70,
  },
  recommendedItemName: {
    fontSize: 14,
    marginTop: 5,
  },
  recommendedItemPrice: {
    fontSize: 14,
    color: '#555',
  },
  addButton: {
    position: 'absolute',
    top: 2,
    right: 2,
    backgroundColor: 'white',
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    width: 25,
    height: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  addButtonText: {
    fontSize: 16,
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
});

export default CartScreen;
