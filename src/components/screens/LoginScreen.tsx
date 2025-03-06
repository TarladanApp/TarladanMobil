/* eslint-disable prettier/prettier */
import React from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

const LoginScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const handleRegisterPress = () => {
    navigation.navigate('Register'); // Register sayfasına yönlendirin
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={require('../images/homescreenlogo.png')} style={styles.logo} />
      <TouchableOpacity onPress={handleRegisterPress}>
        <Text style={styles.prompt}>Üyeliğin yok mu?</Text>
      </TouchableOpacity>
      <TextInput style={styles.input} placeholder="E-posta veya Cep Telefonu" />
      <TextInput style={styles.input} placeholder="Şifre" secureTextEntry />
      <View style={styles.row}>
        <TouchableOpacity>
          <Text style={styles.forgotPassword}>Şifremi unuttum</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.continueButton}>
          <Text style={styles.continueButtonText}>Devam</Text>
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
    width: '33%', // Genişliği 3'te 1 olacak şekilde ayarlayın
    alignItems: 'center',
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
});

export default LoginScreen; 