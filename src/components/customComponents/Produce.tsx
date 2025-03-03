/* eslint-disable prettier/prettier */
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { Product } from '../../services/mockData';

interface ProduceProps {
  produce: Product;
}

const Produce: React.FC<ProduceProps> = ({ produce }) => {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{ uri: produce.image }} />
      <Text style={styles.title}>{produce.name}</Text>
      <Text style={styles.price}>₺{produce.price}/{produce.unit}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginBottom: 8,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 4,
  },
  price: {
    fontSize: 12,
    color: '#2DB300',
    fontWeight: 'bold',
  },
});

export default Produce;

