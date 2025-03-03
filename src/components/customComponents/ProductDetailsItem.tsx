/* eslint-disable prettier/prettier */
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Product } from '../../services/mockData';

interface ProductDetailsItemProps {
  item: Product;
  quantity: number;
  isFavorite: boolean;
  onFavoriteToggle: () => void;
  onRemoveFromCart: () => void;
  onAddToCart: () => void;
  onQuantityChange: (quantity: number) => void;
  onFarmPress: (farmName: string) => void;
}

const ProductDetailsItem: React.FC<ProductDetailsItemProps> = ({
  item,
  quantity,
  isFavorite,
  onFavoriteToggle,
  onRemoveFromCart,
  onAddToCart,
  onQuantityChange,
  onFarmPress
}) => {
  return (
    <View style={[styles.item, quantity > 0 ? styles.selectedItem : null]}>
      <View style={styles.content}>
        <Image
          source={require('../images/hasan.jpeg')}
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
            <TouchableOpacity onPress={onFavoriteToggle} style={styles.button}>
              <Image 
                source={require('../images/star.png')} 
                style={[styles.notFavorited, isFavorite && styles.icon]} 
              />
            </TouchableOpacity>
            
            {quantity > 0 && (
              <>
                <TouchableOpacity onPress={() => onRemoveFromCart()} style={styles.button}>
                  <Image source={require('../images/rubbish.png')} style={styles.icon} />
                </TouchableOpacity>
                
                <View style={styles.quantity}>
                  <Text style={styles.quantityText}>{quantity}</Text>
                </View>
              </>
            )}
            
            <TouchableOpacity onPress={onAddToCart} style={styles.button}>
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
    fontWeight: "bold",
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
    backgroundColor: '#2DB300',
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityText: {
    fontSize: 16,
    marginHorizontal: 5,
    color: "white",
  },
  icon: {
    width: 20,
    height: 20,
    tintColor: '#2DB300',
    opacity: 1
  },
  notFavorited: {
    width: 20,
    height: 20,
    tintColor: '#2DB300',
    opacity: 0.3
  },
});

export default ProductDetailsItem;
