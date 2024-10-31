import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { FlatList, Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Icon } from 'react-native-elements';
import Sertifikalar from './Certificate';

const Stack = createStackNavigator();

const farmData = {
  profile: {
    headerImage: 'https://www.upload.ee/image/16683568/header_image.png',
    name: 'Alibaba Çiftliği',
    rating: 4.2,
    reviews: 372,
    location: 'Çubuk / Akkuzulu',
    distance: '7.2 km',
    image: 'https://www.upload.ee/image/16683574/pp.png',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
  },
  products: [
    { id: '1', name: 'Domates', price: '24.99 ₺/kg', image: 'https://www.upload.ee/image/16684000/Rectangle_55.png' },
    { id: '2', name: 'Salatalık', price: '24.99 ₺/kg', image: 'https://www.upload.ee/image/16684004/Rectangle_52.png' },
    { id: '3', name: 'Erik', price: '24.99 ₺/kg', image: 'https://www.upload.ee/image/16684005/Rectangle_54.png' },
  ],
  featuredProducts: [
    { id: '4', name: 'Sırık Domates', price: '24.99 ₺/kg', image: 'https://www.upload.ee/image/16684000/Rectangle_55.png' },
    { id: '5', name: 'Çarliston Biber', price: '24.99 ₺/kg', image: 'https://www.upload.ee/image/16684008/Rectangle_57.png' },
    { id: '6', name: 'Sırık Domates', price: '24.99 ₺/kg', image: 'https://www.upload.ee/image/16684000/Rectangle_55.png' },
    { id: '7', name: 'Sırık Domates', price: '24.99 ₺/kg', image: 'https://www.upload.ee/image/16684000/Rectangle_55.png' },
    { id: '8', name: 'Sırık Domates', price: '24.99 ₺/kg', image: 'https://www.upload.ee/image/16684000/Rectangle_55.png' },
    { id: '9', name: 'Sırık Domates', price: '24.99 ₺/kg', image: 'https://www.upload.ee/image/16684000/Rectangle_55.png' },
    { id: '10', name: 'Sırık Domates', price: '24.99 ₺/kg', image: 'https://www.upload.ee/image/16684000/Rectangle_55.png' },

  ]
};

import { StackNavigationProp } from '@react-navigation/stack';

type FarmProfileScreenNavigationProp = StackNavigationProp<any, 'FarmProfile'>;

const FarmProfileScreen = ({ navigation }: { navigation: FarmProfileScreenNavigationProp }) => {
  const renderProductItem = ({ item }: { item: { id: string; name: string; price: string; image: string } }) => (
    <View style={styles.productItem}>
      <Image source={{ uri: item.image }} style={styles.productImage} />
      <View style={styles.productInfo}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productPrice}>{item.price}</Text>
      </View>
      <TouchableOpacity style={styles.addButton}>
        <Icon name="plus" type="font-awesome" color="#269900" />
      </TouchableOpacity>
    </View>
  );
const Certificate = ({ title, description, image }: { title: string; description: string; image: string }) => {
  return (
    <View style={styles.certificateContainer}>
      <Image source={{ uri: image }} style={styles.image} />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
};
  const renderFeaturedProductItem = ({ item }: { item: { id: string; name: string; price: string; image: string } }) => (
    <View style={styles.featuredProductItem}>
      <Image source={{ uri: item.image }} style={styles.featuredProductImage} />
      <View style={styles.featuredProductInfo}>
        <Text style={styles.featuredProductName}>{item.name}</Text>
        <Text style={styles.featuredProductPrice}>{item.price}</Text>
      </View>
      <TouchableOpacity style={styles.addButton}>
        <Icon name="plus" type="font-awesome" color="#269900" size={12} />
      </TouchableOpacity>
    </View>
  );
    const chunkArray = (arr: { id: string; name: string; price: string; image: string }[], chunkSize: number) => {
    const result = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
      result.push(arr.slice(i, i + chunkSize));
    }
    return result;
  };

  // Split data into rows of 2 items each
  const rows = chunkArray(farmData.featuredProducts, 3);

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="FarmProfile">
        <Stack.Screen name="FarmProfile" component={FarmProfileScreen} />
        <Stack.Screen name="Sertifikalar" component={Sertifikalar} /> 
        {/* Sertifikalar ekranını Stack'e ekledik */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.headerContainer}>
          <Image source={{ uri: farmData.profile.headerImage }} style={styles.headerImage} />
          <Image source={{ uri: farmData.profile.image }} style={styles.profileImage} />
        </View>
        <View style={styles.profileContainer}>
          <Text style={styles.profileName}>{farmData.profile.name}</Text>
          <View style={styles.profileInfo}>
            <Text style={styles.profileDetailText}><Text style={styles.boldText}>Üretici:</Text> Hasan Gürbüz</Text>
            <Text style={styles.profileDetailText}><Text style={styles.boldText}>Üretim Yeri:</Text>{farmData.profile.location}</Text>
            <Text style={styles.profileDetailText}>{farmData.profile.distance} | Sebze, Meyve, Süt Ürünleri</Text>
            <View style={styles.ratingBoxContainer}>
              <View style={styles.ratingBox}>
                <Icon name="star" type="font-awesome" color="#FFFFFF" size={16} />
                <Text style={styles.profileRating}>{farmData.profile.rating} (999+)</Text>
              </View>
              <Text style={styles.profileReviews}>{farmData.profile.reviews} Yorum</Text>
            </View>
            <View style={styles.buttonsContainer}>
              <TouchableOpacity style={styles.button}>
                <Icon name="image" type="font-awesome" color="#269900" size={20} />
                <Text style={styles.buttonText}>Galeri</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button}>
                <Icon name="certificate" type="font-awesome" color="#269900" size={20} />
                <Text style={styles.buttonText}>Sertifikalar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <Text style={styles.sectionTitle}>En Sevilenler</Text>
        <FlatList
          horizontal
          data={farmData.products}
          renderItem={renderProductItem}
          keyExtractor={(item) => item.id}
          style={styles.productList}
        />
        
        <Text style={styles.sectionTitle}>Sebze</Text>
        <FlatList
        data={rows}
        renderItem={({ item }) => (
          <View style={styles.row}>
            {item.map((product: { id: string; name: string; price: string; image: string }) => (
              <View key={product.id} style={styles.productContainer}>
                {renderFeaturedProductItem({ item: product })}
              </View>
            ))}
          </View>
        )}
        keyExtractor={(item) => item.id}
        style={styles.productList}
        // Ensure vertical scrolling by setting horizontal to false
        horizontal={true}
      />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    position: 'relative',
  },
  headerImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    position: 'absolute',
    bottom: -40,
    left: 20,
    borderWidth: 3,
    borderColor: '#fff',
  },
   certificateContainer: {
    margin: 10,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    backgroundColor: 'white',
  },
   description: {
    fontSize: 14,
  },
  profileContainer: {
    paddingTop: 50,
    paddingHorizontal: 10,
  },
  profileInfo: {
    marginLeft: 10,
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 5,
  },
  profileDetailText: {
    fontSize: 14,
    color: 'gray',
    marginVertical: 2,
  },
  boldText: {
    fontWeight: 'bold',
  },
  ratingBoxContainer: {
    position: 'absolute',
    right: 10,
    top: -40,
    backgroundColor: '#E3F2D9',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 5,
  },
  ratingBox: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 2,
    paddingHorizontal: 6,
    backgroundColor: '#269900',
    borderRadius: 4,
  },
  profileRating: {
    marginLeft: 4,
    fontSize: 16,
    color: '#FFFFFF',
  },
  profileReviews: {
    fontSize: 16,
    marginTop: 4,
    color: '#000',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    width: '100%',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#E3F2D9',
    borderRadius: 8,
    marginHorizontal: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 5,
  },
  buttonText: {
    marginLeft: 5,
    color: '#269900',
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    marginLeft: 10,
  },
  productList: {
    marginBottom: 20,
  },
   productContainer: {
    flex: 1,
    marginHorizontal: 5, // Adjust margin as needed
  },
  productItem: {
    flexDirection: 'column',
    alignItems: 'center',
    marginRight: 10,
    padding: 10,
    borderColor: '#ddd',
    borderRadius: 5,
    width: 150,
  },
  productImage: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  productInfo: {
    alignItems: 'center',
  },
  productName: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  productPrice: {
    fontSize: 12,
    color: 'gray',
  },
  addButton: {
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  featuredProductItem: {
    flexDirection: 'row',
    height:100,
    width:250,
    marginBottom: 50,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#269900',
    borderRadius: 5,
    padding: 10,
  },
  featuredProductImage: {
    width: 75,
    height: 75,
    marginRight: 10,
  },
  featuredProductInfo: {
    flex: 1,
  },
  featuredProductName: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  featuredProductPrice: {
    fontSize: 12,
    color: 'gray',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 5,
  },
});

export default FarmProfileScreen;
