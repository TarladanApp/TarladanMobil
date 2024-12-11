import { NavigationContainer, NavigationProp } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Alert, FlatList, Image, Linking, Platform, SafeAreaView, ScrollView, Share, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Icon } from 'react-native-elements';
import Sertifikalar from './Certificate';

const Stack = createStackNavigator();

// Ürün tipini tanımlayalım
interface Product {
  id: string;
  name: string;
  price: string;
  image: string;
  category: string;
}

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
    { id: '1', name: 'Domates', price: '24.99 ₺/kg', image: 'https://www.upload.ee/image/16684000/Rectangle_55.png', category: 'vegetables' },
    { id: '2', name: 'Salatalık', price: '24.99 ₺/kg', image: 'https://www.upload.ee/image/16684004/Rectangle_52.png', category: 'vegetables' },
    { id: '3', name: 'Erik', price: '24.99 ₺/kg', image: 'https://www.upload.ee/image/16684005/Rectangle_54.png', category: 'fruits' },
  ] as Product[],
  featuredProducts: [
    { id: '4', name: 'Sırık Domates', price: '24.99 ₺/kg', image: 'https://www.upload.ee/image/16684000/Rectangle_55.png', category: 'vegetables' },
    { id: '5', name: 'Çarliston Biber', price: '24.99 ₺/kg', image: 'https://www.upload.ee/image/16684008/Rectangle_57.png', category: 'vegetables' },
    { id: '6', name: 'Sırık Domates', price: '24.99 ₺/kg', image: 'https://www.upload.ee/image/16684000/Rectangle_55.png', category: 'vegetables' },
    { id: '7', name: 'Sırık Domates', price: '24.99 ₺/kg', image: 'https://www.upload.ee/image/16684000/Rectangle_55.png', category: 'vegetables' },
    { id: '8', name: 'Sırık Domates', price: '24.99 ₺/kg', image: 'https://www.upload.ee/image/16684000/Rectangle_55.png', category: 'vegetables' },
    { id: '9', name: 'Sırık Domates', price: '24.99 ₺/kg', image: 'https://www.upload.ee/image/16684000/Rectangle_55.png', category: 'vegetables' },
    { id: '10', name: 'Sırık Domates', price: '24.99 ₺/kg', image: 'https://www.upload.ee/image/16684000/Rectangle_55.png', category: 'vegetables' },

  ] as Product[],
};

import { StackNavigationProp } from '@react-navigation/stack';

type FarmProfileScreenNavigationProp = StackNavigationProp<any, 'FarmProfile'>;

interface FarmProfileScreenProps {
  navigation: NavigationProp<any>;
}

const FarmProfileScreen = ({ navigation }: FarmProfileScreenProps) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [cartItems, setCartItems] = useState<{[key: string]: number}>({});
  const [totalCartAmount, setTotalCartAmount] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showAllProducts, setShowAllProducts] = useState(false);
  const [sortBy, setSortBy] = useState('default');

  useEffect(() => {
    const total = Object.entries(cartItems).reduce((sum, [id, quantity]) => {
      const product = [...farmData.products, ...farmData.featuredProducts]
        .find(p => p.id === id);
      return sum + (quantity * parseFloat(product?.price.replace('₺/kg', '') || '0'));
    }, 0);
    setTotalCartAmount(total);
  }, [cartItems]);

  const handleGalleryPress = () => {
    navigation.navigate('Gallery', { 
      farmName: farmData.profile.name 
    });
  };

  const handleCertificatesPress = () => {
    navigation.navigate('Sertifikalar', {
      farmName: farmData.profile.name
    });
  };

  const handleAddToCart = useCallback((item: { id: string; name: string; price: string }) => {
    setCartItems(prev => ({
      ...prev,
      [item.id]: (prev[item.id] || 0) + 1
    }));
    
    Alert.alert(
      "Ürün Eklendi",
      `${item.name} sepete eklendi`,
      [{ text: "Tamam", onPress: () => console.log("OK Pressed") }]
    );
  }, []);

  const handleShare = async () => {
    try {
      await Share.share({
        message: `${farmData.profile.name} çiftliğini keşfet! Taze ve organik ürünler için: [App Link]`,
      });
    } catch (error) {
      Alert.alert('Hata', 'Paylaşım yapılırken bir hata oluştu');
    }
  };

  const handleLocation = () => {
    const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
    const latLng = `${farmData.profile.location}`;
    const label = farmData.profile.name;
    const url = Platform.select({
      ios: `${scheme}${label}@${latLng}`,
      android: `${scheme}${latLng}(${label})`
    });

    Linking.openURL(url!);
  };

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
    Alert.alert(
      isFollowing ? 'Takipten Çıkıldı' : 'Takip Edildi',
      isFollowing ? 
        `${farmData.profile.name} çiftliğini takipten çıktınız` : 
        `${farmData.profile.name} çiftliğini takip ediyorsunuz`
    );
  };

  const renderProductItem = ({ item }: { item: { id: string; name: string; price: string; image: string } }) => (
    <View style={styles.productItem}>
      <Image source={{ uri: item.image }} style={styles.productImage} />
      <View style={styles.productInfo}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productPrice}>{item.price}</Text>
        <TouchableOpacity style={styles.addButton} onPress={() => handleAddToCart(item)}>
          <Icon name="plus" type="font-awesome" color="#269900" />
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderFeaturedProductItem = ({ item }: { item: { id: string; name: string; price: string; image: string } }) => (
    <View style={styles.featuredProductItem}>
      <Image source={{ uri: item.image }} style={styles.featuredProductImage} />
      <View style={styles.featuredProductInfo}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productPrice}>{item.price}</Text>
        <TouchableOpacity style={styles.addButton} onPress={() => handleAddToCart(item)}>
          <Icon name="plus" type="font-awesome" color="#269900" size={12} />
        </TouchableOpacity>
      </View>
    </View>
  );

  const CertificateItem = ({ title, description, image }: { title: string; description: string; image: string }) => {
    return (
      <View style={styles.certificateContainer}>
        <Image source={{ uri: image }} style={styles.image} />
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
    );
  };

  const chunkArray = (arr: { id: string; name: string; price: string; image: string }[], chunkSize: number) => {
    const result = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
      result.push(arr.slice(i, i + chunkSize));
    }
    return result;
  };

  // Split data into rows of 2 items each
  const rows = chunkArray(farmData.featuredProducts, 3);

  const filteredProducts = useMemo(() => {
    let filtered = [...farmData.featuredProducts];
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }
    
    // Sıralama
    switch (sortBy) {
      case 'priceAsc':
        filtered.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
        break;
      case 'priceDesc':
        filtered.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
        break;
      default:
        break;
    }
    
    return filtered;
  }, [selectedCategory, sortBy]);

  const renderCategoryButtons = () => (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryContainer}>
      <TouchableOpacity
        style={[styles.categoryButton, selectedCategory === 'all' && styles.selectedCategory]}
        onPress={() => setSelectedCategory('all')}
      >
        <Text style={styles.categoryText}>Tümü</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.categoryButton, selectedCategory === 'vegetables' && styles.selectedCategory]}
        onPress={() => setSelectedCategory('vegetables')}
      >
        <Text style={styles.categoryText}>Sebzeler</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.categoryButton, selectedCategory === 'fruits' && styles.selectedCategory]}
        onPress={() => setSelectedCategory('fruits')}
      >
        <Text style={styles.categoryText}>Meyveler</Text>
      </TouchableOpacity>
    </ScrollView>
  );

  const renderSortMenu = () => (
    <View style={styles.sortContainer}>
      <TouchableOpacity
        style={styles.sortButton}
        onPress={() => setSortBy(sortBy === 'priceAsc' ? 'default' : 'priceAsc')}
      >
        <Icon name="sort" type="font-awesome" color="#269900" size={16} />
        <Text style={styles.sortText}>Fiyat: Düşükten Yükseğe</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.sortButton}
        onPress={() => setSortBy(sortBy === 'priceDesc' ? 'default' : 'priceDesc')}
      >
        <Icon name="sort" type="font-awesome" color="#269900" size={16} />
        <Text style={styles.sortText}>Fiyat: Yüksekten Düşüğe</Text>
      </TouchableOpacity>
    </View>
  );

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
      <View style={styles.customHeader}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Image 
            source={require('../images/back.png')} 
            style={styles.backIcon} 
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{farmData.profile.name}</Text>
      </View>
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
              <TouchableOpacity style={styles.button} onPress={handleGalleryPress}>
                <Icon name="image" type="font-awesome" color="#269900" size={20} />
                <Text style={styles.buttonText}>Galeri</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={handleCertificatesPress}>
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
          data={filteredProducts}
          renderItem={renderFeaturedProductItem}
          keyExtractor={(item) => item.id}
          numColumns={2}
          scrollEnabled={false}
          columnWrapperStyle={styles.productRow}
        />

        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.actionButton} onPress={handleLocation}>
            <Icon name="map-marker" type="font-awesome" color="#269900" size={20} />
            <Text style={styles.actionButtonText}>Konum</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionButton} onPress={handleShare}>
            <Icon name="share" type="font-awesome" color="#269900" size={20} />
            <Text style={styles.actionButtonText}>Paylaş</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.actionButton, isFollowing && styles.followingButton]} 
            onPress={handleFollow}
          >
            <Icon 
              name={isFollowing ? "check" : "plus"} 
              type="font-awesome" 
              color={isFollowing ? "#fff" : "#269900"} 
              size={20} 
            />
            <Text style={[styles.actionButtonText, isFollowing && styles.followingText]}>
              {isFollowing ? 'Takipte' : 'Takip Et'}
            </Text>
          </TouchableOpacity>
        </View>

        {totalCartAmount > 0 && (
          <TouchableOpacity 
            style={styles.cartSummary}
            onPress={() => navigation.navigate('Cart')}
          >
            <View style={styles.cartInfo}>
              <Text style={styles.cartItemCount}>
                {Object.values(cartItems).reduce((a, b) => a + b, 0)} ürün
              </Text>
              <Text style={styles.cartTotal}>₺{totalCartAmount.toFixed(2)}</Text>
            </View>
            <Text style={styles.cartCheckout}>Sepete Git</Text>
          </TouchableOpacity>
        )}

        {!showAllProducts && filteredProducts.length > 6 && (
          <TouchableOpacity 
            style={styles.showMoreButton}
            onPress={() => setShowAllProducts(true)}
          >
            <Text style={styles.showMoreText}>Daha Fazla Göster</Text>
          </TouchableOpacity>
        )}
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
  customHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    zIndex: 1,
  },
  backButton: {
    padding: 8,
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
    marginLeft: 16,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
  },
  headerContainer: {
    position: 'relative',
    height: 250,
  },
  headerImage: {
    width: '100%',
    height: 250,
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
    width: 150,
    padding: 10,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
  },
  productImage: {
    width: 100,
    height: 100,
    alignSelf: 'center',
  },
  productInfo: {
    marginTop: 10,
  },
  productName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 5,
  },
  productPrice: {
    fontSize: 12,
    color: '#269900',
    marginBottom: 5,
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
    width: '48%',
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#269900',
    borderRadius: 5,
  },
  featuredProductImage: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  featuredProductInfo: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  productRow: {
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  actionButton: {
    alignItems: 'center',
    padding: 10,
  },
  actionButtonText: {
    color: '#269900',
    marginTop: 5,
    fontSize: 12,
  },
  followingButton: {
    backgroundColor: '#269900',
    borderRadius: 20,
    paddingHorizontal: 15,
  },
  followingText: {
    color: '#fff',
  },
  cartSummary: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#269900',
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cartInfo: {
    flex: 1,
  },
  cartItemCount: {
    color: '#fff',
    fontSize: 14,
  },
  cartTotal: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  cartCheckout: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  categoryContainer: {
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  categoryButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#E3F2D9',
    marginRight: 10,
  },
  selectedCategory: {
    backgroundColor: '#269900',
  },
  categoryText: {
    color: '#269900',
    fontWeight: 'bold',
  },
  sortContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  sortButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    marginLeft: 10,
  },
  sortText: {
    marginLeft: 5,
    color: '#269900',
    fontSize: 12,
  },
  showMoreButton: {
    padding: 10,
    alignItems: 'center',
    backgroundColor: '#E3F2D9',
    marginTop: 10,
    marginHorizontal: 10,
    borderRadius: 5,
  },
  showMoreText: {
    color: '#269900',
    fontWeight: 'bold',
  },
});

export default FarmProfileScreen;
