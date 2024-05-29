/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import ProductDetailsItem from '../customComponents/ProductDetailsItem';
import Order from "./Splash"

const ProductDetails = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { product } = route.params;

  const [productQuantities, setProductQuantities] = useState({});
  const [favorites, setFavorites] = useState({}); 

  const handleAddToCart = (productId) => {
    setProductQuantities(prevQuantities => ({
      ...prevQuantities,
      [productId]: (prevQuantities[productId] || 0) + 1
    }));
  };

  const handleRemoveFromCart = (productId) => {
    if (productQuantities[productId] > 0) {
      setProductQuantities(prevQuantities => ({
        ...prevQuantities,
        [productId]: prevQuantities[productId] - 1
      }));
    }
  };

  const handleFavoriteToggle = (itemId) => {
    setFavorites(prevFavorites => ({
      ...prevFavorites,
      [itemId]: !prevFavorites[itemId]
    }));
  };

  useEffect(() => {
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
        <TouchableOpacity onPress={() => navigation.navigate("Cart")}>
          <Image
            source={require('../images/cart.png')}
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
  }, [navigation, product]);


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

  const renderItem = ({ item }) => (
    <ProductDetailsItem
      item={item}
      productQuantities={productQuantities}
      handleFavoriteToggle={handleFavoriteToggle}
      handleRemoveFromCart={handleRemoveFromCart}
      handleAddToCart={handleAddToCart}
      favorites={favorites}
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
});

export default ProductDetails;
