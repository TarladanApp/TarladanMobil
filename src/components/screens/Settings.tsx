/* eslint-disable prettier/prettier */
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { Image, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';

const Settings = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const [isDarkMode, setIsDarkMode] = React.useState(false);
  const [isNotifications, setIsNotifications] = React.useState(true);

  const settingsItems = [
    {
      id: 1,
      title: 'Karanlık Mod',
      value: isDarkMode,
      onValueChange: () => setIsDarkMode(prev => !prev),
      type: 'switch'
    },
    {
      id: 2,
      title: 'Bildirimler',
      value: isNotifications,
      onValueChange: () => setIsNotifications(prev => !prev),
      type: 'switch'
    },
    {
      id: 3,
      title: 'Dil',
      value: 'Türkçe',
      type: 'text'
    },
    {
      id: 4,
      title: 'Uygulama Versiyonu',
      value: '1.0.0',
      type: 'text'
    }
  ];

  const renderSettingItem = (item: any) => (
    <View key={item.id} style={styles.settingItem}>
      <Text style={styles.settingText}>{item.title}</Text>
      {item.type === 'switch' ? (
        <Switch
          value={item.value}
          onValueChange={item.onValueChange}
          trackColor={{ false: '#767577', true: '#2DB300' }}
          thumbColor={item.value ? '#fff' : '#f4f3f4'}
        />
      ) : (
        <Text style={styles.settingValue}>{item.value}</Text>
      )}
    </View>
  );

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
        <Text style={styles.headerTitle}>Ayarlar</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Settings List */}
      <View style={styles.settingsContainer}>
        {settingsItems.map(renderSettingItem)}
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
  settingsContainer: {
    paddingTop: 20,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E3F2D9',
  },
  settingText: {
    fontSize: 16,
    color: '#333',
  },
  settingValue: {
    fontSize: 16,
    color: '#666',
  },
});

export default Settings; 