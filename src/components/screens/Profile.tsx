/* eslint-disable prettier/prettier */
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const Profile = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  const menuItems = [
    {
      id: 1,
      title: 'Ayarlar',
      icon: require('../images/settings.png'),
      onPress: () => console.log('Ayarlar'),
    },
    {
      id: 2,
      title: 'Kart Bilgileri',
      icon: require('../images/credit-card.png'),
      onPress: () => console.log('Kart Bilgileri'),
    },
    {
      id: 3,
      title: 'Kayıtlı Adreslerim',
      icon: require('../images/location.png'),
      onPress: () => console.log('Kayıtlı Adreslerim'),
    },
    {
      id: 4,
      title: 'Önceki Siparişlerim',
      icon: require('../images/order-history.png'),
      onPress: () => console.log('Önceki Siparişlerim'),
    },
  ];

  const renderMenuItem = (item: any) => (
    <TouchableOpacity key={item.id} style={styles.menuItem} onPress={item.onPress}>
      <View style={styles.menuItemContent}>
        <Image source={item.icon} style={styles.menuIcon} />
        <Text style={styles.menuText}>{item.title}</Text>
      </View>
      <Image 
        source={require('../images/back.png')} 
        style={styles.arrowIcon} 
      />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Custom Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Hesabım</Text>
        </View>
      </View>

      {/* Profile Info */}
      <View style={styles.profileInfo}>
        <Image 
          source={require('../images/person.png')} 
          style={styles.profileImage} 
        />
        <Text style={styles.profileName}>Kullanıcı Adı</Text>
        <Text style={styles.profileEmail}>kullanici@email.com</Text>
      </View>

      {/* Menu Items */}
      <View style={styles.menuContainer}>
        {menuItems.map(renderMenuItem)}
      </View>
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
    paddingTop: 20,
    paddingBottom: 5,
    height: 60,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 15,
    height: '100%',
  },
  headerTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  profileInfo: {
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E3F2D9',
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  profileEmail: {
    fontSize: 14,
    color: '#666',
  },
  menuContainer: {
    paddingTop: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E3F2D9',
  },
  menuItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuIcon: {
    width: 24,
    height: 24,
    tintColor: '#2DB300',
    marginRight: 15,
  },
  menuText: {
    fontSize: 16,
    color: '#333',
  },
  arrowIcon: {
    width: 20,
    height: 20,
    tintColor: '#666',
  },
});

export default Profile;
