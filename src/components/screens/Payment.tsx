/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import AsyncStorage from '@react-native-async-storage/async-storage';
import CheckBox from '@react-native-community/checkbox';
import { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { ParamListBase } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { Alert, Image, Keyboard, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import { useCart } from '../../context/CartContext';


interface Card {
  id: number;
  cardNumber: string;
  cardHolder: string;
  expiryDate: string;
  type: string;
}
interface DeliveryTimeSlot {
  id: string;
  time: string;
  price: number;
  available: boolean;
}

const TURKISH_DAYS = ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'];
const TURKISH_MONTHS = [
  'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
  'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'
];

const formatDate = (date: Date): string => {
  return `${date.getDate()} ${TURKISH_MONTHS[date.getMonth()]} ${TURKISH_DAYS[date.getDay()]}`;
};

const getDeliveryDates = () => {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const dayAfter = new Date(today);
  dayAfter.setDate(dayAfter.getDate() + 2);

  return [
    { 
      id: 'today', 
      label: 'Bugün',
      date: today,
      fullDate: formatDate(today)
    },
    { 
      id: 'tomorrow', 
      label: 'Yarın',
      date: tomorrow,
      fullDate: formatDate(tomorrow)
    },
    { 
      id: 'dayAfter', 
      label: TURKISH_DAYS[dayAfter.getDay()],
      date: dayAfter,
      fullDate: formatDate(dayAfter)
    },
  ];
};


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
        <TouchableOpacity onPress={() => navigation.navigate('Adresses')}>
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
  const [selectedDeliveryOption, setSelectedDeliveryOption] = useState<'now' | 'schedule'>('now');

  const [savedCards, setSavedCards] = useState<Card[]>([]);

  const [showTimeModal, setShowTimeModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);
  const [deliveryDates, setDeliveryDates] = useState(getDeliveryDates());
  const [selectedFullDate, setSelectedFullDate] = useState(formatDate(new Date()));

  const timeSlots: DeliveryTimeSlot[] = [
    { id: '1', time: '10:30 - 12:30', price: 26.99, available: false },
    { id: '2', time: '12:30 - 14:30', price: 26.99, available: true },
    { id: '3', time: '15:00 - 17:00', price: 26.99, available: true },
    { id: '4', time: '17:00 - 19:00', price: 26.99, available: true },
    { id: '5', time: '19:00 - 21:00', price: 26.99, available: true },
  ];


  useEffect(() => {
    const loadCards = async () => {
      try {
        const cardsData = await AsyncStorage.getItem('savedCards');
        if (cardsData) {
          setSavedCards(JSON.parse(cardsData));
        } else {
          const defaultCards = [
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
          ];
          setSavedCards(defaultCards);
          await AsyncStorage.setItem('savedCards', JSON.stringify(defaultCards));
        }
      } catch (error) {
        console.error('Kartları yükleme hatası:', error);
      }
    };
    loadCards();
  }, []);

  useEffect(() => {
    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    setTotalAmount(total);
  }, [cartItems]);

  
  useEffect(() => {
    // Gece yarısı geçtiğinde tarihleri güncelle
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    
    const timeUntilMidnight = tomorrow.getTime() - now.getTime();
    
    const updateDates = () => {
      setDeliveryDates(getDeliveryDates());
      // İlk tarihi seç
      const newDates = getDeliveryDates();
      setSelectedDate(newDates[0].date);
      setSelectedFullDate(newDates[0].fullDate);
    };

    const midnightTimer = setTimeout(updateDates, timeUntilMidnight);

    return () => clearTimeout(midnightTimer);
  }, []);


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

  const onChange = (event: DateTimePickerEvent, selectedTime?: Date) => {
    if (selectedTime) {
      const hours = selectedTime.getHours();
      if (hours >= 0 && hours < 9) {
        Alert.alert('Uyarı', 'Lütfen uygun zamanı seçiniz.');
      }
      else{
        setTime(selectedTime);
      }
      setShow(false);
    }
  };


  const onShowMode = (modeToShow: 'date' | 'time') => {
    if(!show){
      setShow(true);
      setMode(modeToShow);
    }
  };

  const handleDeliveryDateSelect = (dateId: string) => {
    const selectedDateObj = deliveryDates.find(d => d.id === dateId);
    if (selectedDateObj) {
      setSelectedDate(selectedDateObj.date);
      setSelectedFullDate(selectedDateObj.fullDate);
    }
  };

  const handleTimeSlotSelect = (slotId: string) => {
    setSelectedTimeSlot(slotId);
    const slot = timeSlots.find(s => s.id === slotId);
    if (slot) {
      setTime(new Date(selectedDate.setHours(parseInt(slot.time.split(':')[0]))));
    }
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.container}>
        <Text style={styles.title}>Teslimat</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={[
              styles.button, 
              selectedDeliveryOption === 'now' ? styles.selectedButton : styles.unselectedButton
            ]}
            onPress={() => setSelectedDeliveryOption('now')}
          >
            <Text style={styles.buttonText}>Şimdi Gelsin</Text>
          </TouchableOpacity>
          <View style={styles.scheduleContainer}>

            <TouchableOpacity 
              style={[
                styles.scheduleButton,
                selectedDeliveryOption === 'schedule' ? styles.selectedButton : styles.unselectedButton
              ]}
              onPress={() => {
                setSelectedDeliveryOption('schedule');
                setShowTimeModal(true);
              }}
            >
              <Text style={styles.buttonText}>Teslimat Zamanını Seç</Text>
              </TouchableOpacity>

              {selectedDeliveryOption === 'schedule' && selectedTimeSlot && (
              <View style={styles.selectedTimeContainer}>
                <Icon name="time-outline" size={16} color="#2DB300" />
                <Text style={styles.selectedTimeText}>
                  {selectedFullDate} - {timeSlots.find(slot => slot.id === selectedTimeSlot)?.time}
                </Text>
              </View>
            )}

          </View>
        </View>
        <Text style={styles.title}>Kayıtlı Kartlarım</Text>
        <View style={styles.paymentOptions}>
          {savedCards.map((card) => (
            <TouchableOpacity key={card.id} onPress={() => handlePaymentSelection(card.cardNumber)}>
              <View style={styles.paymentOption}>
                <CheckBox
                  value={selectedPayment === card.cardNumber}
                  onValueChange={() => handlePaymentSelection(card.cardNumber)}
                  style={styles.checkbox}
                />
                <View style={styles.cardInfo}>
                  <Text style={styles.paymentOptionText}>{card.cardHolder}</Text>
                  <Text style={styles.paymentOptionText}>{card.cardNumber}</Text>
                  <Text style={styles.cardDetails}>{card.type} • {card.expiryDate}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
          <Text style={styles.title}>Diğer Ödeme Yöntemleri</Text>
          <TouchableOpacity onPress={() => handlePaymentSelection('Kapıda Nakit')}>
            <View style={styles.paymentOption}>
              <CheckBox
                value={selectedPayment === 'Kapıda Nakit'}
                onValueChange={() => handlePaymentSelection('Kapıda Nakit')}
                style={styles.checkbox}
              />
              <Text style={styles.otherPaymentOptions}>Kapıda Nakit</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handlePaymentSelection('Kapıda Kredi / Banka Kartı')}>
            <View style={styles.paymentOption}>
              <CheckBox
                value={selectedPayment === 'Kapıda Kredi / Banka Kartı'}
                onValueChange={() => handlePaymentSelection('Kapıda Kredi / Banka Kartı')}
                style={styles.checkbox}
              />
              <Text style={styles.otherPaymentOptions}>Kapıda Kredi / Banka Kartı</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handlePaymentSelection('Sodexo / Multinet / Setcard')}>
            <View style={styles.paymentOption}>
              <CheckBox
                value={selectedPayment === 'Sodexo / Multinet / Setcard'}
                onValueChange={() => handlePaymentSelection('Sodexo / Multinet / Setcard')}
                style={styles.checkbox}
              />
              <Text style={styles.otherPaymentOptions}>Sodexo / Multinet / Setcard</Text>
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
     
      
      <Modal
          visible={showTimeModal}
          animationType="slide"
          transparent={true}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Teslimat Zamanı Seç</Text>
                <TouchableOpacity onPress={() => setShowTimeModal(false)}>
                  <Icon name="close" size={24} color="#000" />
                </TouchableOpacity>
              </View>

              <View style={styles.deliveryTypeContainer}>
                <Text style={styles.deliveryTypeTitle}>Randevulu Teslimat</Text>
                <Image 
                  source={require('../images/delivery-van.png')} 
                  style={styles.deliveryIcon}
                />
              </View>

              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.dateSelector}>
                {deliveryDates.map((date) => (
                  <TouchableOpacity
                    key={date.id}
                    style={[
                      styles.dateButton,
                      selectedDate.toDateString() === date.date.toDateString() && styles.selectedDateButton
                    ]}
                    onPress={() => handleDeliveryDateSelect(date.id)}
                  >
                    <Text style={[
                      styles.dateButtonText,
                      selectedDate.toDateString() === date.date.toDateString() && styles.selectedDateButtonText
                    ]}>
                      {date.label}
                    </Text>
                    <Text style={[
                      styles.dateButtonSubText,
                      selectedDate.toDateString() === date.date.toDateString() && styles.selectedDateButtonText
                    ]}>
                      {date.date.getDate()} {TURKISH_MONTHS[date.date.getMonth()]}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>

              <View style={styles.selectedDateContainer}>
                <Icon name="calendar-outline" size={20} color="#2DB300" />
                <Text style={styles.selectedDateText}>{selectedFullDate}</Text>
              </View>

              <View style={styles.timeSlotsContainer}>
                {timeSlots.map((slot) => (
                  <TouchableOpacity
                    key={slot.id}
                    style={[
                      styles.timeSlotButton,
                      !slot.available && styles.disabledTimeSlot,
                      selectedTimeSlot === slot.id && styles.selectedTimeSlot
                    ]}
                    onPress={() => slot.available && handleTimeSlotSelect(slot.id)}
                    disabled={!slot.available}
                  >
                    <Text style={[
                      styles.timeSlotText,
                      !slot.available && styles.disabledTimeSlotText,
                      selectedTimeSlot === slot.id && styles.selectedTimeSlotText
                    ]}>
                      {slot.time}
                    </Text>
                    {!slot.available && (
                      <Text style={styles.capacityText}>Kapasite Dolu</Text>
                    )}
                    {slot.available && (
                      <Text style={styles.priceText}>{slot.price.toFixed(2)} TL</Text>
                    )}
                  </TouchableOpacity>
                ))}
              </View>

              <View style={styles.quickDeliveryContainer}>
                <Text style={styles.quickDeliveryTitle}>Hızlı Teslimat</Text>
                <Text style={styles.quickDeliveryText}>
                  Seçili bölgede hizmet verilmemektedir. Diğer kayıtlı adreslerinizi deneyebilirsiniz.
                </Text>
              </View>

              <TouchableOpacity 
                style={styles.confirmButton}
                onPress={() => {
                  if (selectedTimeSlot) {
                    setShowTimeModal(false);
                  } else {
                    Alert.alert('Uyarı', 'Lütfen bir teslimat zamanı seçin.');
                  }
                }}
              >
                <Text style={styles.confirmButtonText}>Ödemeye Geç</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
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
    alignItems: 'flex-start',
    marginBottom: 20,
    width: '100%',
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    width: '48%',
    height: 50,
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 15,
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
  timePickerContainer: {
    alignItems: 'center',
    marginTop: 28,
  },
  selectedButton: {
    backgroundColor: '#4CAF50', // Seçili buton rengi
  },
  unselectedButton: {
    backgroundColor: '#D3D3D3', // Gri tonlarında buton rengi
  },
  cardInfo: {
    flex: 1,
    marginLeft: 10,
  },
  cardDetails: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  otherPaymentOptions :{
      fontSize: 14,
      flex: 1,
      color: '#333',
      fontWeight: 'normal',
      marginLeft : 10,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: '100%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  deliveryTypeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#F5F5F5',
    padding: 15,
    borderRadius: 10,
  },
  deliveryTypeTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    flex: 1,
  },
  deliveryIcon: {
    width: 40,
    height: 40,
  },
  dateSelector: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  dateButton: {
    padding: 10,
    marginRight: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    alignItems: 'center',
    minWidth: 80,
  },
  selectedDateButton: {
    backgroundColor: '#2DB300',
    borderColor: '#2DB300',
  },
  dateButtonText: {
    fontSize: 14,
    color: '#000',
    marginBottom: 4,
  },
  dateButtonSubText: {
    fontSize: 12,
    color: '#666',
  },
  selectedDateButtonText: {
    color: 'white',
  },
  timeSlotsContainer: {
    marginBottom: 20,
  },
  timeSlotButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    marginBottom: 10,
  },
  selectedTimeSlot: {
    backgroundColor: '#2DB300',
    borderColor: '#2DB300',
  },
  disabledTimeSlot: {
    backgroundColor: '#F5F5F5',
    borderColor: '#E0E0E0',
  },
  timeSlotText: {
    fontSize: 14,
    color: '#000',
  },
  selectedTimeSlotText: {
    color: 'white',
  },
  disabledTimeSlotText: {
    color: '#999',
  },
  capacityText: {
    fontSize: 12,
    color: '#999',
  },
  priceText: {
    fontSize: 14,
    color: '#2DB300',
    fontWeight: 'bold',
  },
  quickDeliveryContainer: {
    backgroundColor: '#F5F5F5',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  quickDeliveryTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 8,
  },
  quickDeliveryText: {
    fontSize: 14,
    color: '#666',
  },
  confirmButton: {
    backgroundColor: '#2DB300',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  confirmButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  selectedDateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
  },
  selectedDateText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#2DB300',
    fontWeight: '500',
  },
  scheduleContainer: {
    width: '48%',
  },
  scheduleButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    height: 50,
    justifyContent: 'center',
  },
  selectedTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    padding: 8,
    backgroundColor: '#F5F5F5',
    borderRadius: 5,
  },
  selectedTimeText: {
    marginLeft: 8,
    fontSize: 12,
    color: '#2DB300',
    flex: 1,
  },
});

export default PaymentScreen;
