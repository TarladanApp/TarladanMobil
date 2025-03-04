/* eslint-disable prettier/prettier */
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const OrderHistory = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const orders = [
    {
      id: 1,
      date: '01.03.2024',
      status: 'Teslim Edildi',
      total: '156.90',
      items: [
        { name: 'Organik Domates', quantity: 2, price: '45.90' },
        { name: 'Taze Salatalık', quantity: 1, price: '65.10' },
      ],
    },
    {
      id: 2,
      date: '28.02.2024',
      status: 'Teslim Edildi',
      total: '234.50',
      items: [
        { name: 'Çeri Domates', quantity: 3, price: '78.50' },
        { name: 'Taze Erik', quantity: 2, price: '77.75' },
      ],
    },
  ];

  const renderOrderItem = (item: any) => (
    <Text style={styles.itemText}>
      {item.quantity}x {item.name} - ₺{item.price}
    </Text>
  );

  const renderOrder = (order: any) => (
    <View key={order.id} style={styles.orderItem}>
      <View style={styles.orderHeader}>
        <View>
          <Text style={styles.orderDate}>{order.date}</Text>
          <Text style={styles.orderStatus}>{order.status}</Text>
        </View>
        <Text style={styles.orderTotal}>₺{order.total}</Text>
      </View>
      <View style={styles.orderItems}>
        {order.items.map((item: any, index: number) => (
          <View key={index}>
            {renderOrderItem(item)}
          </View>
        ))}
      </View>
      <TouchableOpacity style={styles.reorderButton}>
        <Text style={styles.reorderButtonText}>Tekrar Sipariş Ver</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Image
            source={require('../images/back.png')}
            style={styles.backIcon}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Önceki Siparişlerim</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Orders List */}
      <ScrollView style={styles.ordersContainer}>
        {orders.map(renderOrder)}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    backgroundColor: '#2DB300',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 20,
    paddingBottom: 5,
    height: 60,
    paddingHorizontal: 15,
  },
  backButton: {
    padding: 5,
  },
  backIcon: {
    width: 24,
    height: 24,
    tintColor: 'white',
  },
  headerTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  placeholder: {
    width: 24,
  },
  ordersContainer: {
    padding: 20,
  },
  orderItem: {
    backgroundColor: '#F8F8F8',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#E3F2D9',
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  orderDate: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  orderStatus: {
    fontSize: 14,
    color: '#2DB300',
    marginTop: 4,
  },
  orderTotal: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2DB300',
  },
  orderItems: {
    borderTopWidth: 1,
    borderTopColor: '#E3F2D9',
    paddingTop: 15,
    marginBottom: 15,
  },
  itemText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  reorderButton: {
    backgroundColor: '#2DB300',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  reorderButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default OrderHistory; 