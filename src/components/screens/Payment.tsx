/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import CheckBox from '@react-native-community/checkbox';
import { ParamListBase } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { Alert, Image, Keyboard, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import { useCart } from '../../context/CartContext';
import DateTimePicker from "@react-native-community/datetimepicker";

const PaymentScreen = ({ navigation }: { navigation: NativeStackNavigationProp<ParamListBase> }) => {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: "Deniz Ev",
      headerTitleAlign: 'center',
      headerTitleStyle: {
        color: 'white',
        fontSize: 14,
      },
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: '#2DB300',
      },
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require('../images/back.png')}
            style={{ width: 30, height: 30, tintColor: 'white', marginLeft: 10 }}
          />
        </TouchableOpacity>
      ),
      
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.navigate('SavedAddresses')}>
          <Image
            source={require('../images/Vector.png')}
            style={{ width: 15, height: 15, marginRight: 10 }}
          />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const [showCoupons, setShowCoupons] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState('');
  const [couponCode, setCouponCode] = useState('');
  const [isCouponValid, setIsCouponValid] = useState<boolean | null>(null);
  const [agreeTerms, setAgreeTerms] = useState(false);
  
  const { cartItems } = useCart(); // Sepet verilerini alın
  const [totalAmount, setTotalAmount] = useState(0); // Toplam tutar
  const [discountedAmount, setDiscountedAmount] = useState<number | null>(null);
  const [time,setTime] = useState(new Date());
  const [show,setShow] = useState(false);
  const [mode, setMode] = useState<'date' | 'time'>('time');

  useEffect(() => {
    // Sepet toplamını hesaplayın
    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    setTotalAmount(total);
  }, [cartItems]);

  const handlePaymentSelection = (paymentOption: string) => {
    setSelectedPayment(paymentOption);
  };

  const toggleCoupons = () => {
    setShowCoupons(!showCoupons);
  };

  const handleCouponCodeChange = (text: string) => {
    setCouponCode(text);
  };

  const handleAgreeTermsChange = () => {
    setAgreeTerms(!agreeTerms);
  };

  const handleCouponSubmit = () => {
    checkCouponValidity();
    Keyboard.dismiss(); // Klavyeyi kapat
  };

  const checkCouponValidity = async () => {
    try {
      // Örnek bir promosyon kodu kontrolü
      if (couponCode === 'TARLADAN10') {
        setIsCouponValid(true);
        const discount = 10; // %10 indirim
        const newTotal = totalAmount - (totalAmount * discount / 100);
        setDiscountedAmount(newTotal);
        Alert.alert('Başarılı', `Promosyon kodu geçerli! Yeni toplam: ₺${newTotal.toFixed(2)}`);
      } else {
        setIsCouponValid(false);
        setDiscountedAmount(null);
        Alert.alert('Hata', 'Promosyon kodu geçersiz.');
      }
    } catch (error) {
      console.error('Kupon kontrol hatası:', error);
      Alert.alert('Hata', 'Kupon kontrolü sırasında bir hata oluştu.');
    }
  };

  const onChange = (e, selectedTime) => {
    setTime(selectedTime);
    setShow(false);
  };
   
  
  const onShowMode = (modeToShow: 'date' | 'time') => {
    setShow(true);
    setMode(modeToShow);
  } 

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.container}>
        <Text style={styles.title}>Teslimat</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Şimdi Gelsin</Text>
          </TouchableOpacity>
          <View>
            <TouchableOpacity style={styles.button} onPress={showMode => onShowMode('time')}>
              <Text style={styles.buttonText}>Teslimat Zamanını ayarla</Text>
            </TouchableOpacity>

            {show && (
              <DateTimePicker
                value={time}
                mode={mode}
                is24Hour={true}
                onChange={onChange}
              />
            )}

            <Text style={styles.smalltimetext}>{time.toTimeString()}</Text>



          </View>
        </View>
        <Text style={styles.title}>Ödeme Yöntemi</Text>
        <View style={styles.paymentOptions}>
          <TouchableOpacity onPress={() => handlePaymentSelection('54XXX XXXX XXXX XXXX92 Ziraat Bankası')}>
            <View style={styles.paymentOption}>
              <CheckBox
                value={selectedPayment === '54XXX XXXX XXXX XXXX92 Ziraat Bankası'}
                onValueChange={() => handlePaymentSelection('54XXX XXXX XXXX XXXX92 Ziraat Bankası')}
                style={styles.checkbox}
              />
              <Text style={styles.paymentOptionText}>54XXX XXXX XXXX XXXX92 Ziraat Bankası</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handlePaymentSelection('52XXX XXXX XXXX XXXX38 Yapı Kredi Bankası')}>
            <View style={styles.paymentOption}>
              <CheckBox
                value={selectedPayment === '52XXX XXXX XXXX XXXX38 Yapı Kredi Bankası'}
                onValueChange={() => handlePaymentSelection('52XXX XXXX XXXX XXXX38 Yapı Kredi Bankası')}
                style={styles.checkbox}
              />
              <Text style={styles.paymentOptionText}>52XXX XXXX XXXX XXXX38 Yapı Kredi Bankası</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handlePaymentSelection('51XXX XXXX XXXX XXXX41 Enpara Kartı')}>
            <View style={styles.paymentOption}>
              <CheckBox
                value={selectedPayment === '51XXX XXXX XXXX XXXX41 Enpara Kartı'}
                onValueChange={() => handlePaymentSelection('51XXX XXXX XXXX XXXX41 Enpara Kartı')}
                style={styles.checkbox}
              />
              <Text style={styles.paymentOptionText}>51XXX XXXX XXXX XXXX41 Enpara Kartı</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handlePaymentSelection('Kapıda Nakit')}>
            <View style={styles.paymentOption}>
              <CheckBox
                value={selectedPayment === 'Kapıda Nakit'}
                onValueChange={() => handlePaymentSelection('Kapıda Nakit')}
                style={styles.checkbox}
              />
              <Text style={styles.paymentOptionText}>Kapıda Nakit</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handlePaymentSelection('Kapıda Kredi / Banka Kartı')}>
            <View style={styles.paymentOption}>
              <CheckBox
                value={selectedPayment === 'Kapıda Kredi / Banka Kartı'}
                onValueChange={() => handlePaymentSelection('Kapıda Kredi / Banka Kartı')}
                style={styles.checkbox}
              />
              <Text style={styles.paymentOptionText}>Kapıda Kredi / Banka Kartı</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handlePaymentSelection('Sodexo / Multinet / Setcard')}>
            <View style={styles.paymentOption}>
              <CheckBox
                value={selectedPayment === 'Sodexo / Multinet / Setcard'}
                onValueChange={() => handlePaymentSelection('Sodexo / Multinet / Setcard')}
                style={styles.checkbox}
              />
              <Text style={styles.paymentOptionText}>Sodexo / Multinet / Setcard</Text>
            </View>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={toggleCoupons} style={styles.couponButton}>
          <Text style={styles.buttonText}>Promosyon Kodu Kullan</Text>
        </TouchableOpacity>
        {showCoupons && (
          <>
            <TextInput
              style={styles.couponInput}
              placeholder="Promosyon Kodu"
              value={couponCode}
              onChangeText={setCouponCode}
              returnKeyType="done"
            />
            <TouchableOpacity onPress={handleCouponSubmit} style={styles.checkButton}>
              <Icon name="checkmark" size={20} color="white" />
            </TouchableOpacity>
          </>
        )}
        {isCouponValid !== null && (
          <Text style={{ color: isCouponValid ? 'green' : 'red' }}>
            {isCouponValid ? 'Kupon geçerli!' : 'Kupon geçersiz!'}
          </Text>
        )}
        <View style={styles.termsContainer}>
          <CheckBox
            value={agreeTerms}
            onValueChange={handleAgreeTermsChange}
            style={styles.checkbox}
          />
          <Text style={styles.termsText}>Teslimat Sözleşmesini okudum ve kabul ediyorum.</Text>
        </View>
        <View style={styles.checkoutButton}>
          <Text style={styles.checkoutButtonText}>Ödeme Yap</Text>
          <Text style={styles.totalText}>₺{(discountedAmount ?? totalAmount).toFixed(2)}</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  smalltimetext: {
    fontSize: 12,
    color: 'black',
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'black',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    width: '100%',
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginRight: 10,
    height: 50,
    justifyContent: 'center',
    position: 'relative',
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
  },
  paymentOptions: {
    marginBottom: 20,
  },
  paymentOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    backgroundColor: '#f9f9f9',
    flex: 1,
  },
  paymentOptionText: {
    fontSize: 14,
    marginLeft: 10,
    flex: 1,
    color: '#333',
    fontWeight: 'normal',
  },
  checkbox: {
    marginLeft: 5,
    transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }],
  },
  couponButton: {
    backgroundColor: '#4CAF50',
    padding: 8,
    borderRadius: 5,
    marginBottom: 20,
  },
  couponInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  termsText: {
    fontSize: 14,
    marginLeft: 5,
    flex:1,
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
  checkButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  },
});

export default PaymentScreen;
