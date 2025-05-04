/* eslint-disable prettier/prettier */
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { userAPI } from '../../api/apiService';
import { useAuth } from '../../context/AuthContext';

interface UserProfile {
  user_name: string;
  user_surname: string;
  user_mail: string;
  user_phone_number: string;
}

const Profile = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const { logout } = useAuth();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const response = await userAPI.getProfile();
      setUserProfile(response.user);
    } catch (error) {
      console.error('Kullanıcı bilgileri alınamadı:', error);
    } finally {
      setLoading(false);
    }
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  const handleLogout = async () => {
    try {
      await logout();
      navigation.navigate('Login');
    } catch (error) {
      console.error('Çıkış yapılırken hata oluştu:', error);
    }
  };

  const menuItems = [
    {
      id: 1,
      title: 'Ayarlar',
      icon: require('../images/settings.png'),
      onPress: () => navigation.navigate('Settings'),
    },
    {
      id: 2,
      title: 'Kart Bilgileri',
      icon: require('../images/credit-card.png'),
      onPress: () => navigation.navigate('PaymentMethods'),
    },
    {
      id: 3,
      title: 'Kayıtlı Adreslerim',
      icon: require('../images/location.png'),
      onPress: () => navigation.navigate('SavedAddresses'),
    },
    {
      id: 4,
      title: 'Önceki Siparişlerim',
      icon: require('../images/order-history.png'),
      onPress: () => navigation.navigate('OrderHistory'),
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

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2DB300" />
      </View>
    );
  }

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
        <Text style={styles.profileName}>
          {userProfile ? `${userProfile.user_name} ${userProfile.user_surname}` : 'Yükleniyor...'}
        </Text>
        <Text style={styles.profileEmail}>
          {userProfile ? userProfile.user_mail : 'Yükleniyor...'}
        </Text>
        <Text style={styles.profilePhone}>
          {userProfile ? userProfile.user_phone_number : 'Yükleniyor...'}
        </Text>
      </View>

      {/* Menu Items */}
      <View style={styles.menuContainer}>
        {menuItems.map(renderMenuItem)}
      </View>

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Image 
          source={require('../images/settings.png')} 
          style={[styles.menuIcon, styles.logoutIcon]} 
        />
        <Text style={styles.logoutText}>Çıkış Yap</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
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
    marginBottom: 5,
  },
  profilePhone: {
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
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF5F5',
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginTop: 'auto',
    marginBottom: 20,
    marginHorizontal: 20,
    borderRadius: 10,
  },
  logoutIcon: {
    tintColor: '#FF4B4B',
  },
  logoutText: {
    fontSize: 16,
    color: '#FF4B4B',
    fontWeight: 'bold',
  },
});

export default Profile;
