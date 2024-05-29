/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const ProductDetailsItem = ({ item, productQuantities, handleFavoriteToggle, handleRemoveFromCart, handleAddToCart, favorites }) => {
  return (
    <View style={[styles.item, productQuantities[item.id] && styles.selectedItem]}>
      <View style={styles.content}>
        <Image
          source={require('../images/hasan.jpeg')} 
          style={styles.image}
        />
        <View style={styles.details}>
          <Text style={styles.productName}>{item.name}</Text>
          <Text>1 kg</Text>
          <Text style={styles.price}>₺{item.price}</Text>
          <View style={styles.actions}>
            <TouchableOpacity onPress={() => handleFavoriteToggle(item.id)} style={styles.button}>
              <Image source={require('../images/star.png')} style={[styles.notFavorited, favorites[item.id] && styles.icon]}/>
            </TouchableOpacity>
            {productQuantities[item.id] > 0 && (
              <TouchableOpacity onPress={() => handleRemoveFromCart(item.id)} style={styles.button}>
                <Image source={require('../images/rubbish.png')} style={styles.icon}/>
              </TouchableOpacity>
            )}
            {productQuantities[item.id] > 0 && (
              <View style={styles.quantity}>
                   <Text style={styles.quantityText}>{productQuantities[item.id]}</Text>
              </View>
             
            )}
            <TouchableOpacity onPress={() => handleAddToCart(item.id)} style={styles.button}>
              <Text style={styles.buttonText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Text style={styles.farmName}>{item.farm}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    padding: 10,
    marginVertical: 6,
    marginHorizontal: 0,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    position: 'relative',
  },
  selectedItem: {
    borderColor: "#2DB300",
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
  productName: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  price: {
    fontSize: 12,
    color: "#2DB300",
  },
  farmName: {
    fontSize: 12,
    fontWeight:"bold",
    color: '#2DB300',
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
    position: 'absolute',
    top: 0,
    right: 0,
  },
  button: {
    backgroundColor: 'white',
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    borderColor: "gray",
    borderWidth: 0.5,
    marginRight: 3
  },
  buttonText: {
    fontSize: 25,
    color: '#2DB300',
  },
  quantity: {
    backgroundColor:'#2DB300',
    width:30,
    height:30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityText:{
    fontSize: 16,
    marginHorizontal: 5,
    color:"white",
  },
  icon:{
    width:20,
    height:20,
    tintColor:'#2DB300',
    opacity:1
  },
  notFavorited:{
    width:20,
    height:20,
    tintColor:'#2DB300',
    opacity:0.3
  },
});

export default ProductDetailsItem;
