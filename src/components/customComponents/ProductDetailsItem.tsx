/* eslint-disable prettier/prettier */
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface ProductItem {
  id: number;
  name: string;
  price: number;
  farm: string;
}

interface ProductDetailsItemProps {
  item: ProductItem;
  productQuantities: Record<number, number>;
  handleFavoriteToggle: (id: number) => void;
  handleRemoveFromCart: (id: number) => void;
  handleAddToCart: (id: number) => void;
  favorites: Record<number, boolean>;
  onFarmPress: (farmName: string) => void;
}

const ProductDetailsItem: React.FC<ProductDetailsItemProps> = ({ 
  item, 
  productQuantities, 
  handleFavoriteToggle, 
  handleRemoveFromCart, 
  handleAddToCart, 
  favorites,
  onFarmPress 
}) => {
  return (
    <View style={[styles.item, productQuantities[item.id] ? styles.selectedItem : null]}>
      <View style={styles.content}>
        <Image
          source={require('../images/Salatalık.png')} 
          style={styles.image}
        />
        <View style={styles.details}>
          <Text style={styles.productName}>{item.name}</Text>
          <Text>1 kg</Text>
          <Text style={styles.price}>₺{item.price}</Text>
          <TouchableOpacity onPress={() => onFarmPress(item.farm)}>
            <Text style={[styles.farmName, styles.farmNameClickable]}>{item.farm}</Text>
          </TouchableOpacity>
          <View style={styles.actions}>
            <TouchableOpacity onPress={() => handleFavoriteToggle(item.id)} style={styles.button}>
              <Image source={require('../images/star.png')} style={[styles.notFavorited, favorites[item.id] && styles.icon]}/>
            </TouchableOpacity>
            {productQuantities[item.id] > 0 && (
              <TouchableOpacity onPress={() => handleRemoveFromCart(item.id)} style={styles.button}>
                {productQuantities[item.id] === 1 ? (
                  <Image source={require('../images/rubbish.png')} style={styles.icon} />) 
                  : (
                  <Text style={styles.minus}>-</Text>
                )}
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
  farmNameClickable: {
    textDecorationLine: 'underline',
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
    borderColor: "#2DB300",
    borderWidth: 1,
    marginRight: 3,
    padding: 0,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
  },
  buttonText: {
    fontSize: 22,
    color: '#2DB300',
    fontWeight: 'bold',
    lineHeight: 22,
    textAlign: 'center',
    textAlignVertical: 'center',
    marginTop: -2,
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
  minus: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
  },
});

export default ProductDetailsItem;
