/* eslint-disable prettier/prettier */
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { ActivityIndicator, Alert, Image, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { userAPI } from '../../api/apiService';

interface Address {
  user_address_id: number;
  user_id: number;
  full_address: string;
  city: string;
  district: string;
  neighborhood: string;
  street: string;
  floor: number;
  apartment: string;
  isDefault?: boolean; // Frontend için ek alan
}

const SavedAddresses = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const [modalVisible, setModalVisible] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [loading, setLoading] = useState(true);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [newAddress, setNewAddress] = useState<Omit<Address, 'user_address_id' | 'user_id'>>({
    full_address: '',
    city: '',
    district: '',
    neighborhood: '',
    street: '',
    floor: 0,
    apartment: '',
    isDefault: false,
  });

  useEffect(() => {
    fetchAddresses();
  }, []);

  const fetchAddresses = async () => {
    try {
      setLoading(true);
      const response = await userAPI.getAddresses();
      console.log('Gelen adres verileri:', response); // Debug için
      setAddresses(Array.isArray(response) ? response : []);
    } catch (error) {
      console.error('Adresler alınamadı:', error);
      Alert.alert('Hata', 'Adresler yüklenirken bir hata oluştu.');
    } finally {
      setLoading(false);
    }
  };

  useLayoutEffect(() => {
    const defaultAddress = addresses.find(addr => addr.isDefault);
    navigation.setOptions({
      headerTitle: defaultAddress ? `${defaultAddress.neighborhood}, ${defaultAddress.district}` : 'Kayıtlı Adreslerim',
      headerTitleAlign: 'center',
      headerTitleStyle: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
      },
      headerStyle: {
        backgroundColor: '#2DB300',
      },
      headerTintColor: 'white',
    });
  }, [navigation, addresses]);

  const handleDeleteAddress = async (id: number) => {
    const addressToDelete = addresses.find(addr => addr.user_address_id === id);
    if (addressToDelete?.isDefault) {
      Alert.alert('Hata', 'Varsayılan adres silinemez.');
      return;
    }

    Alert.alert(
      'Adresi Sil',
      'Bu adresi silmek istediğinize emin misiniz?',
      [
        {
          text: 'İptal',
          style: 'cancel',
        },
        {
          text: 'Sil',
          onPress: async () => {
            try {
              await userAPI.deleteAddress(id);
              setAddresses(addresses.filter(addr => addr.user_address_id !== id));
            } catch (error) {
              console.error('Adres silinirken hata oluştu:', error);
              Alert.alert('Hata', 'Adres silinirken bir hata oluştu.');
            }
          },
          style: 'destructive',
        },
      ],
    );
  };

  const handleEditAddress = (address: Address) => {
    setEditingAddress(address);
    setNewAddress({
      full_address: address.full_address,
      city: address.city,
      district: address.district,
      neighborhood: address.neighborhood,
      street: address.street,
      floor: address.floor,
      apartment: address.apartment,
      isDefault: address.isDefault,
    });
    setModalVisible(true);
  };

  const handleSaveAddress = async () => {
    if (!newAddress.city || !newAddress.district || !newAddress.neighborhood || !newAddress.street) {
      Alert.alert('Hata', 'Lütfen gerekli alanları doldurun (İl, İlçe, Mahalle, Sokak)');
      return;
    }

    try {
      const fullAddress = `${newAddress.neighborhood} Mah., ${newAddress.street} No:${newAddress.apartment}, Kat:${newAddress.floor}, ${newAddress.district}/${newAddress.city}`;
      const addressData = { ...newAddress, full_address: fullAddress };

      if (editingAddress) {
        await userAPI.updateAddress(editingAddress.user_address_id, addressData);
        setAddresses(addresses.map(addr => 
          addr.user_address_id === editingAddress.user_address_id 
            ? { ...addr, ...addressData }
            : addr
        ));
      } else {
        const response = await userAPI.addAddress(addressData);
        setAddresses([...addresses, response]);
      }

      setModalVisible(false);
      setEditingAddress(null);
      setNewAddress({
        full_address: '',
        city: '',
        district: '',
        neighborhood: '',
        street: '',
        floor: 0,
        apartment: '',
        isDefault: false,
      });
    } catch (error) {
      console.error('Adres kaydedilirken hata oluştu:', error);
      Alert.alert('Hata', 'Adres kaydedilirken bir hata oluştu.');
    }
  };

  const handleSetDefault = async (id: number) => {
    try {
      await userAPI.setDefaultAddress(id);
      setAddresses(addresses.map(addr => ({
        ...addr,
        isDefault: addr.user_address_id === id,
      })));
    } catch (error) {
      console.error('Varsayılan adres ayarlanırken hata oluştu:', error);
      Alert.alert('Hata', 'Varsayılan adres ayarlanırken bir hata oluştu.');
    }
  };

  const renderAddress = (address: Address) => (
    <View key={address.user_address_id} style={styles.addressItem}>
      <View style={styles.addressHeader}>
        <View style={styles.titleContainer}>
          <Text style={styles.addressTitle}>{address.neighborhood}</Text>
          {address.isDefault && (
            <View style={styles.defaultBadge}>
              <Text style={styles.defaultText}>Varsayılan</Text>
            </View>
          )}
        </View>
        <TouchableOpacity onPress={() => handleDeleteAddress(address.user_address_id)}>
          <Image 
            source={require('../images/rubbish.png')} 
            style={styles.deleteIcon} 
          />
        </TouchableOpacity>
      </View>
      <Text style={styles.addressText}>{address.full_address}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.editButton}
          onPress={() => handleEditAddress(address)}
        >
          <Text style={styles.editButtonText}>Düzenle</Text>
        </TouchableOpacity>
        {!address.isDefault && (
          <TouchableOpacity 
            style={styles.defaultButton}
            onPress={() => handleSetDefault(address.user_address_id)}
          >
            <Text style={styles.defaultButtonText}>Varsayılan Yap</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
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
        <Text style={styles.headerTitle}>Kayıtlı Adreslerim</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Addresses List */}
      <ScrollView style={styles.addressesContainer}>
        {addresses.length === 0 ? (
          <Text style={styles.noAddressText}>Kayıtlı adres bulunamadı.</Text>
        ) : (
          addresses.map(renderAddress)
        )}
      </ScrollView>

      {/* Add New Address Button */}
      <TouchableOpacity 
        style={styles.addButton}
        onPress={() => {
          setEditingAddress(null);
          setNewAddress({
            full_address: '',
            city: '',
            district: '',
            neighborhood: '',
            street: '',
            floor: 0,
            apartment: '',
            isDefault: false,
          });
          setModalVisible(true);
        }}
      >
        <Text style={styles.addButtonText}>Yeni Adres Ekle</Text>
      </TouchableOpacity>

      {/* Add/Edit Address Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
          setEditingAddress(null);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalOverlay}>
            <ScrollView style={styles.modalScrollView} contentContainerStyle={styles.modalScrollViewContent}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>
                  {editingAddress ? 'Adresi Düzenle' : 'Yeni Adres Ekle'}
                </Text>

                <TextInput
                  style={styles.input}
                  placeholder="İl"
                  placeholderTextColor="#666"
                  value={newAddress.city}
                  onChangeText={(text) => setNewAddress({...newAddress, city: text})}
                />

                <TextInput
                  style={styles.input}
                  placeholder="İlçe"
                  placeholderTextColor="#666"
                  value={newAddress.district}
                  onChangeText={(text) => setNewAddress({...newAddress, district: text})}
                />

                <TextInput
                  style={styles.input}
                  placeholder="Mahalle"
                  placeholderTextColor="#666"
                  value={newAddress.neighborhood}
                  onChangeText={(text) => setNewAddress({...newAddress, neighborhood: text})}
                />

                <TextInput
                  style={styles.input}
                  placeholder="Cadde/Sokak"
                  placeholderTextColor="#666"
                  value={newAddress.street}
                  onChangeText={(text) => setNewAddress({...newAddress, street: text})}
                />

                <View style={styles.rowContainer}>
                  <TextInput
                    style={[styles.input, styles.halfInput]}
                    placeholder="Kat"
                    placeholderTextColor="#666"
                    value={newAddress.floor.toString()}
                    onChangeText={(text) => setNewAddress({...newAddress, floor: parseInt(text) || 0})}
                    keyboardType="numeric"
                  />

                  <TextInput
                    style={[styles.input, styles.halfInput]}
                    placeholder="Daire No"
                    placeholderTextColor="#666"
                    value={newAddress.apartment}
                    onChangeText={(text) => setNewAddress({...newAddress, apartment: text})}
                  />
                </View>

                <TouchableOpacity 
                  style={styles.defaultCheckbox}
                  onPress={() => setNewAddress({...newAddress, isDefault: !newAddress.isDefault})}
                >
                  <View style={[
                    styles.checkbox,
                    newAddress.isDefault && styles.checkboxChecked
                  ]} />
                  <Text style={styles.checkboxLabel}>Varsayılan adres olarak ayarla</Text>
                </TouchableOpacity>

                <View style={styles.modalButtons}>
                  <TouchableOpacity 
                    style={[styles.modalButton, styles.cancelButton]} 
                    onPress={() => {
                      setModalVisible(false);
                      setEditingAddress(null);
                    }}
                  >
                    <Text style={styles.modalButtonText}>İptal</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity 
                    style={[styles.modalButton, styles.saveButton]} 
                    onPress={handleSaveAddress}
                  >
                    <Text style={styles.modalButtonText}>Kaydet</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
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
  addressesContainer: {
    padding: 20,
  },
  addressItem: {
    backgroundColor: '#F8F8F8',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#E3F2D9',
  },
  addressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addressTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginRight: 10,
  },
  defaultBadge: {
    backgroundColor: '#2DB300',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  defaultText: {
    color: 'white',
    fontSize: 12,
  },
  deleteIcon: {
    width: 20,
    height: 20,
    tintColor: '#FF3B30',
  },
  addressText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  editButton: {
    alignSelf: 'flex-start',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#2DB300',
  },
  editButtonText: {
    color: '#2DB300',
    fontSize: 14,
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 10,
  },
  defaultButton: {
    marginLeft: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#2DB300',
    backgroundColor: 'white',
  },
  defaultButtonText: {
    color: '#2DB300',
    fontSize: 14,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalOverlay: {
    width: '90%',
    maxHeight: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  modalScrollView: {
    width: '100%',
  },
  modalScrollViewContent: {
    flexGrow: 1,
  },
  modalContent: {
    padding: 20,
    width: '100%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
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
  addressInput: {
    height: 80,
    textAlignVertical: 'top',
    paddingTop: 10,
  },
  defaultCheckbox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#2DB300',
    borderRadius: 4,
    marginRight: 10,
  },
  checkboxChecked: {
    backgroundColor: '#2DB300',
  },
  checkboxLabel: {
    color: '#333',
    fontSize: 14,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  halfInput: {
    width: '48%',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noAddressText: {
    textAlign: 'center',
    color: '#666',
    marginTop: 20,
    fontSize: 16,
  },
});

export default SavedAddresses; 