/* eslint-disable prettier/prettier */
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { ActivityIndicator, Alert, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useAuth } from '../../context/AuthContext';

const LoginScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Hata', 'Lütfen e-posta ve şifrenizi giriniz.');
      return;
    }

    try {
      setLoading(true);
      setError('');
      console.log('Login attempt with:', { email }); // Şifreyi loglamıyoruz
      const response = await login({ email, password });
      console.log('Login response:', response);
      navigation.navigate('Ana Sayfa');
    } catch (error: any) {
      console.error('Login error:', error.response?.data || error.message);
      const errorMessage = error.response?.data?.message || 'Giriş başarısız. Lütfen bilgilerinizi kontrol edin.';
      setError(errorMessage);
      Alert.alert('Hata', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterPress = () => {
    navigation.navigate('Register');
  };

  const handleForgotPassword = () => {
    // Şifremi unuttum işlevselliği eklenecek
    Alert.alert('Bilgi', 'Şifre sıfırlama bağlantısı e-posta adresinize gönderilecek.');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={require('../images/homescreenlogo.png')} style={styles.logo} />
      <TouchableOpacity onPress={handleRegisterPress}>
        <Text style={styles.prompt}>Üyeliğin yok mu?</Text>
      </TouchableOpacity>
      
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      
      <TextInput 
        style={styles.input} 
        placeholder="E-posta veya Cep Telefonu" 
        placeholderTextColor="#000000"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      
      <TextInput 
        style={styles.input} 
        placeholder="Şifre" 
        secureTextEntry 
        placeholderTextColor="#000000"
        value={password}
        onChangeText={setPassword}
        autoCapitalize="none"
      />
      
      <View style={styles.row}>
        <TouchableOpacity onPress={handleForgotPassword}>
          <Text style={styles.forgotPassword}>Şifremi unuttum</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.continueButton, loading && styles.disabledButton]} 
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" size="small" />
          ) : (
            <Text style={styles.continueButtonText}>Devam</Text>
          )}
        </TouchableOpacity>
      </View>

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
    color: '#000000',
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
  },
  forgotPassword: {
    fontSize: 14,
    color: '#000000',
    textDecorationLine: 'underline',
  },
  continueButton: {
    backgroundColor: '#2DB300',
    padding: 15,
    borderRadius: 25,
    width: '33%',
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#93c990',
  },
  continueButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  errorText: {
    color: '#ff0000',
    marginBottom: 10,
    textAlign: 'center',
    width: '100%',
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
});

export default LoginScreen; 