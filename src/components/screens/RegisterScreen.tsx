/* eslint-disable prettier/prettier */
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { ActivityIndicator, Alert, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useAuth } from '../../context/AuthContext';

const RegisterScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const { register } = useAuth();                           
  const [formData, setFormData] = useState({
    user_name: '',
    user_surname: '',
    user_mail: '',
    user_phone_number: '',
    user_birthday_date: '',
    user_password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleRegister = async () => {
    // Form validasyonu
    if (!formData.user_name || !formData.user_surname || !formData.user_mail || 
        !formData.user_phone_number || !formData.user_birthday_date || !formData.user_password) {
      Alert.alert('Hata', 'Lütfen tüm alanları doldurunuz.');
      return;
    }

    try {
      setLoading(true);
      setError('');
      console.log('Register attempt with:', { ...formData, password: '***' });
      const response = await register(formData);
      console.log('Register response:', response);
      navigation.navigate('Ana Sayfa');
    } catch (error: any) {
      console.error('Register error:', error.response?.data || error.message);
      const errorMessage = error.response?.data?.message || 'Kayıt başarısız. Lütfen bilgilerinizi kontrol edin.';
      setError(errorMessage);
      Alert.alert('Hata', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleLoginPress = () => {
    navigation.navigate('Login');
  };

  const updateFormData = (key: string, value: string) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={require('../images/homescreenlogo.png')} style={styles.logo} />
      <TouchableOpacity onPress={handleLoginPress}>
        <Text style={styles.prompt}>Zaten üye misin?</Text>
      </TouchableOpacity>

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <TextInput 
        style={styles.input} 
        placeholder="İsim" 
        placeholderTextColor="#000000"
        value={formData.user_name}
        onChangeText={(value) => updateFormData('user_name', value)}
      />
      <TextInput 
        style={styles.input} 
        placeholder="Soyisim" 
        placeholderTextColor="#000000"
        value={formData.user_surname}
        onChangeText={(value) => updateFormData('user_surname', value)}
      />
      <TextInput 
        style={styles.input} 
        placeholder="E-posta" 
        placeholderTextColor="#000000"
        value={formData.user_mail}
        onChangeText={(value) => updateFormData('user_mail', value)}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput 
        style={styles.input} 
        placeholder="Cep Telefonu" 
        placeholderTextColor="#000000"
        value={formData.user_phone_number}
        onChangeText={(value) => updateFormData('user_phone_number', value)}
        keyboardType="phone-pad"
      />
      <TextInput 
        style={styles.input} 
        placeholder="Doğum Tarihi" 
        placeholderTextColor="#000000"
        value={formData.user_birthday_date}
        onChangeText={(value) => updateFormData('user_birthday_date', value)}
      />
      <TextInput 
        style={styles.input} 
        placeholder="Şifre" 
        placeholderTextColor="#000000"
        value={formData.user_password}
        onChangeText={(value) => updateFormData('user_password', value)}
        secureTextEntry
        autoCapitalize="none"
      />
      
      <TouchableOpacity 
        style={[styles.continueButton, loading && styles.disabledButton]}
        onPress={handleRegister}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" size="small" />
        ) : (
          <Text style={styles.continueButtonText}>Devam</Text>
        )}
      </TouchableOpacity>
      <TouchableOpacity style={styles.googleButton}>
        <Image source={require('../images/googlelogo.png')} style={styles.icon} />
        <Text style={styles.googleButtonText}>Google ile devam et</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.appleButton}>
        <Image source={require('../images/applelogo.png')} style={styles.icon} />
        <Text style={styles.appleButtonText}>Apple ile devam et</Text>
      </TouchableOpacity>
      <View style={styles.footer}>
        <Text style={styles.footerTitle}>tarla'dan</Text>
        <Text style={styles.footerSubtitle}>direkt evinize organik ve taze</Text>
        <Text style={styles.footerText}>
          Üreticilerden günlük olarak toplanan taze ürünleri listeleyin ve hemen kapınıza gelsin.
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    width: 70,
    height: 70,
    marginBottom: 10,
  },
  prompt: {
    fontSize: 16,
    marginBottom: 20,
    textDecorationLine: 'underline',
    color: '#000000',
  },
  input: {
    width: '100%',
    padding: 15,
    borderRadius: 25,
    backgroundColor: '#f5f5f5',
    marginBottom: 10,
    color: '#000000',
  },
  continueButton: {
    backgroundColor: '#2DB300',
    padding: 15,
    borderRadius: 25,
    width: '33%', // Genişliği 3'te 1 olacak şekilde ayarlayın
    alignItems: 'center',
    marginBottom: 20,
    alignSelf: 'flex-end', // Sağa yasla
  },
  continueButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#DB4437',
    padding: 15,
    borderRadius: 25,
    width: '100%',
    marginBottom: 10,
  },
  googleButtonText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 10,
  },
  appleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#000',
    padding: 15,
    borderRadius: 25,
    width: '100%',
    marginBottom: 20,
  },
  appleButtonText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 10,
  },
  icon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  footer: {
    alignItems: 'flex-start',
    marginTop: 20,
    width: '100%',
  },
  footerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  footerSubtitle: {
    fontSize: 18,
    marginTop: 5,
  },
  footerText: {
    fontSize: 14,
    textAlign: 'left',
    marginTop: 10,
    color: '#757575',
  },
  errorText: {
    color: '#ff0000',
    marginBottom: 10,
    textAlign: 'center',
    width: '100%',
  },
  disabledButton: {
    backgroundColor: '#93c990',
  },
});

export default RegisterScreen; 