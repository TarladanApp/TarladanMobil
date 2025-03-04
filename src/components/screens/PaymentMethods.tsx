/* eslint-disable prettier/prettier */
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { Alert, Image, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const PaymentMethods = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const [modalVisible, setModalVisible] = useState(false);
  const [newCard, setNewCard] = useState({
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    type: 'Mastercard',
  });
  const [cards, setCards] = useState([
    {
      id: 1,
      cardNumber: '**** **** **** 1234',
      cardHolder: 'JOHN DOE',
      expiryDate: '12/24',
      type: 'Mastercard',
    },
    {
      id: 2,
      cardNumber: '**** **** **** 5678',
      cardHolder: 'JOHN DOE',
      expiryDate: '06/25',
      type: 'Visa',
    },
  ]);

  const handleDeleteCard = (id: number) => {
    Alert.alert(
      'Kartı Sil',
      'Bu kartı silmek istediğinize emin misiniz?',
      [
        {
          text: 'İptal',
          style: 'cancel',
        },
        {
          text: 'Sil',
          onPress: () => {
            setCards(cards.filter(card => card.id !== id));
          },
          style: 'destructive',
        },
      ],
    );
  };

  const handleAddCard = () => {
    if (!newCard.cardNumber || !newCard.cardHolder || !newCard.expiryDate) {
      Alert.alert('Hata', 'Lütfen tüm alanları doldurun');
      return;
    }

    const newCardObj = {
      id: cards.length + 1,
      ...newCard,
    };

    setCards([...cards, newCardObj]);
    setModalVisible(false);
    setNewCard({
      cardNumber: '',
      cardHolder: '',
      expiryDate: '',
      type: 'Mastercard',
    });
  };

  const renderCard = (card: any) => (
    <View key={card.id} style={styles.cardItem}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardType}>{card.type}</Text>
        <TouchableOpacity onPress={() => handleDeleteCard(card.id)}>
          <Image 
            source={require('../images/rubbish.png')} 
            style={styles.deleteIcon} 
          />
        </TouchableOpacity>
      </View>
      <Text style={styles.cardNumber}>{card.cardNumber}</Text>
      <View style={styles.cardFooter}>
        <Text style={styles.cardHolder}>{card.cardHolder}</Text>
        <Text style={styles.expiryDate}>{card.expiryDate}</Text>
      </View>
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
        <Text style={styles.headerTitle}>Kart Bilgileri</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Cards List */}
      <View style={styles.cardsContainer}>
        {cards.map(renderCard)}
      </View>

      {/* Add New Card Button */}
      <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.addButtonText}>Yeni Kart Ekle</Text>
      </TouchableOpacity>

      {/* Add Card Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Yeni Kart Ekle</Text>
            
            <TextInput
              style={styles.input}
              placeholder="Kart Numarası"
              value={newCard.cardNumber}
              onChangeText={(text) => setNewCard({...newCard, cardNumber: text})}
              keyboardType="numeric"
              maxLength={19}
            />
            
            <TextInput
              style={styles.input}
              placeholder="Kart Sahibi"
              value={newCard.cardHolder}
              onChangeText={(text) => setNewCard({...newCard, cardHolder: text.toUpperCase()})}
            />
            
            <TextInput
              style={styles.input}
              placeholder="Son Kullanma Tarihi (AA/YY)"
              value={newCard.expiryDate}
              onChangeText={(text) => setNewCard({...newCard, expiryDate: text})}
              maxLength={5}
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity 
                style={[styles.modalButton, styles.cancelButton]} 
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>İptal</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.modalButton, styles.saveButton]} 
                onPress={handleAddCard}
              >
                <Text style={styles.modalButtonText}>Kaydet</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
  cardsContainer: {
    padding: 20,
  },
  cardItem: {
    backgroundColor: '#F8F8F8',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#E3F2D9',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  cardType: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  deleteIcon: {
    width: 20,
    height: 20,
    tintColor: '#FF3B30',
  },
  cardNumber: {
    fontSize: 18,
    letterSpacing: 2,
    marginBottom: 15,
    color: '#333',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardHolder: {
    fontSize: 14,
    color: '#666',
  },
  expiryDate: {
    fontSize: 14,
    color: '#666',
  },
  addButton: {
    backgroundColor: '#2DB300',
    margin: 20,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: '90%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'black',
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#E3F2D9',
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
    color: 'black',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 10,
  },
  modalButton: {
    flex: 1,
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: '#FF3B30',
  },
  saveButton: {
    backgroundColor: '#2DB300',
  },
  modalButtonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default PaymentMethods; 