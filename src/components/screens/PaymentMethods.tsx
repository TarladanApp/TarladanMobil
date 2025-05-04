/* eslint-disable prettier/prettier */
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Image, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { cardAPI } from '../../api/apiService';
import { useAuth } from '../../context/AuthContext';

interface Card {
  card_id: number;
  user_id: number;
  user_card_name: string;
  user_card_number: string;
  user_card_ending_date: string;
  user_card_code: string;
}

const PaymentMethods = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const { user } = useAuth();
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [newCard, setNewCard] = useState({
    user_card_name: '',
    user_card_number: '',
    user_card_ending_date: '',
    user_card_code: '',
  });
  const [cards, setCards] = useState<Card[]>([]);

  useEffect(() => {
    fetchCards();
  }, []);

  const fetchCards = async () => {
    try {
      setLoading(true);
      const response = await cardAPI.getCards();
      setCards(response);
    } catch (error) {
      console.error('Kartları yükleme hatası:', error);
      Alert.alert('Hata', 'Kartlar yüklenirken bir hata oluştu.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCard = async (cardId: number) => {
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
          onPress: async () => {
            try {
              setLoading(true);
              await cardAPI.deleteCard(cardId);
              await fetchCards();
              Alert.alert('Başarılı', 'Kart başarıyla silindi.');
            } catch (error) {
              console.error('Kart silme hatası:', error);
              Alert.alert('Hata', 'Kart silinirken bir hata oluştu.');
            } finally {
              setLoading(false);
            }
          },
          style: 'destructive',
        },
      ],
    );
  };

  const handleAddCard = async () => {
    if (!newCard.user_card_name || !newCard.user_card_number || !newCard.user_card_ending_date || !newCard.user_card_code) {
      Alert.alert('Hata', 'Lütfen tüm alanları doldurun');
      return;
    }

    try {
      setLoading(true);
      await cardAPI.addCard({
        ...newCard,
        user_id: user?.id,
      });
      await fetchCards();
      setModalVisible(false);
      setNewCard({
        user_card_name: '',
        user_card_number: '',
        user_card_ending_date: '',
        user_card_code: '',
      });
      Alert.alert('Başarılı', 'Kart başarıyla eklendi.');
    } catch (error) {
      console.error('Kart ekleme hatası:', error);
      Alert.alert('Hata', 'Kart eklenirken bir hata oluştu.');
    } finally {
      setLoading(false);
    }
  };

  const formatExpiryDate = (text: string) => {
    const numbers = text.replace(/[^\d]/g, '');
    if (numbers.length >= 2) {
      return `${numbers.slice(0, 2)}/${numbers.slice(2, 4)}`;
    }
    return numbers;
  };

  const handleCardNumberChange = (text: string) => {
    const numbers = text.replace(/[^\d]/g, '');
    let formattedNumber = '';
    for (let i = 0; i < numbers.length && i < 16; i++) {
      if (i > 0 && i % 4 === 0) {
        formattedNumber += ' ';
      }
      formattedNumber += numbers[i];
    }
    setNewCard({...newCard, user_card_number: formattedNumber});
  };

  const handleExpiryDateChange = (text: string) => {
    const month = parseInt(text.slice(0, 2));
    if (text.length >= 2 && (month < 1 || month > 12)) {
      Alert.alert('Hata', 'Lütfen geçerli bir ay giriniz (01-12)');
      return;
    }
    const formatted = formatExpiryDate(text);
    setNewCard({...newCard, user_card_ending_date: formatted});
  };

  const handleCardHolderChange = (text: string) => {
    const cardHolderValue = text.toUpperCase();
    setNewCard(prevState => ({
      ...prevState,
      user_card_name: cardHolderValue,
    }));
  };

  const renderCard = (card: Card) => (
    <View key={card.card_id} style={styles.cardItem}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardType}>{card.user_card_name}</Text>
        <TouchableOpacity onPress={() => handleDeleteCard(card.card_id)}>
          <Image 
            source={require('../images/rubbish.png')} 
            style={styles.deleteIcon} 
          />
        </TouchableOpacity>
      </View>
      <Text style={styles.cardNumber}>{card.user_card_number}</Text>
      <View style={styles.cardFooter}>
        <Text style={styles.cardHolder}>{card.user_card_name}</Text>
        <Text style={styles.expiryDate}>{card.user_card_ending_date}</Text>
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color="#2DB300" />
      </View>
    );
  }

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
        {cards.length === 0 ? (
          <Text style={styles.noCardText}>Henüz kayıtlı kart bulunmamaktadır.</Text>
        ) : (
          cards.map(renderCard)
        )}
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
              placeholder="Kart Üzerindeki İsim"
              placeholderTextColor="#666"
              value={newCard.user_card_name}
              onChangeText={handleCardHolderChange}
              autoCapitalize="characters"
              autoCorrect={false}
            />
            <TextInput
              style={styles.input}
              placeholder="Kart Numarası"
              placeholderTextColor="#666"
              value={newCard.user_card_number}
              onChangeText={handleCardNumberChange}
              keyboardType="numeric"
              maxLength={19}
            />
            <TextInput
              style={styles.input}
              placeholder="Son Kullanma Tarihi (AA/YY)"
              placeholderTextColor="#666"
              value={newCard.user_card_ending_date}
              onChangeText={handleExpiryDateChange}
              keyboardType="numeric"
              maxLength={5}
            />
            <TextInput
              style={styles.input}
              placeholder="Güvenlik kodu (CVV)"
              placeholderTextColor="#666"
              value={newCard.user_card_code}
              onChangeText={(text) => setNewCard({...newCard, user_card_code: text})}
              keyboardType="numeric"
              maxLength={3}
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
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
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
  noCardText: {
    textAlign: 'center',
    color: '#666',
    fontSize: 16,
    marginTop: 20,
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
    fontSize: 16,
    backgroundColor: '#FFFFFF',
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