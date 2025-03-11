/* eslint-disable prettier/prettier */
import React from 'react';
import {View, Text, StyleSheet, Image, Pressable, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

const Splash = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const handleOrderPress = () => {
    navigation.navigate('MainTabs');
  };

  const handleWorkWithUsPress = () => {
    navigation.navigate('');
  };

  return (
    <View style={styles.container}>
      <View style={styles.imagestyle}>
        <Image
          style={styles.imagestyle}
          source={require('../images/home_screen_top.png')}
        />
      </View>
      <View style={styles.logo_imageview}>
        <Image
          style={styles.logostyle}
          source={require('../images/homescreenlogo.png')}
        />
      </View>
      <View style={styles.textviewstyle}>
        <Text style={styles.boldtext}>tarla'dan</Text>
        <Text style={styles.mediumtext_mainmenu}>en taze ürünler</Text>
        <Text style={styles.mediumtext_mainmenu}>bir tık uzağınızda</Text>
        <Text style={styles.smalltext_mainmenu}>
          üreticilerden günlük olarak toplanan taze
        </Text>
        <Text style={styles.smalltext_mainmenu}>
          ürünleri isteyin ve hemen kapınıza gelsin
        </Text>
      </View>
      <View style={styles.buttonviewstyle}>
        <TouchableOpacity style={styles.buttonstyle} onPress={handleOrderPress}>
          <Text style={styles.buttontext}>Sipariş Ver</Text>
        </TouchableOpacity>
        <Pressable style={styles.workwithusbutton} onPress={handleWorkWithUsPress}>
          <Text style={styles.workwithustext}>
            Bizimle Çalışmak ister misiniz?
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  logo_imageview: {
    flex: 0.2,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
  },
  logostyle: {
    width: 123,
    height: 70,
    resizeMode: 'contain',
    marginTop: 22,
    marginLeft: 160,
  },
  imagestyle: {
    flex: 1.2,
    width: '100%',
  },
  textviewstyle: {
    flex: 0.5,
    flexWrap: 'wrap',
    alignItems: 'center',
    marginTop: 10,
    marginLeft: 100,
  },
  buttonviewstyle: {
    flex: 0.4,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  boldtext: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: 32,
  },
  smalltext_mainmenu: {
    fontSize: 14,
  },
  mediumtext_mainmenu: {
    fontSize: 24,
    color: 'black',
  },
  buttonstyle: {
    borderRadius: 20,
    backgroundColor: '#2DB300',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 40,
    height: 40,
    marginBottom: 0,
    width: '70%',
  },
  buttontext: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
    letterSpacing: 0.25,
  },
  workwithusbutton: {
    marginBottom: 15,
    alignItems: 'center',
  },
  workwithustext: {
    fontWeight: 'bold',
    fontSize: 15,
    color: '#202020',
    marginBottom : 20,
  },
});

export default Splash;
