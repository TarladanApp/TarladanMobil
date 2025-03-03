/* eslint-disable prettier/prettier */
import { NavigationProp } from '@react-navigation/native';
import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Image, ImageSourcePropType, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { mockApi } from "../../services/api";
import { Product } from "../../services/mockData";

interface HomeProps {
  navigation: NavigationProp<any>;
}

interface Category {
  id: string;
  name: string;
  image: ImageSourcePropType;
}

function Home({ navigation }: HomeProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories: Category[] = [
    { 
      id: '1', 
      name: 'Meyve', 
      image: require('../images/meyve.png')
    },
    { 
      id: '2', 
      name: 'Sebze', 
      image: require('../images/sebze.png')
    },
    { 
      id: '3', 
      name: 'Süt Ürünleri', 
      image: require('../images/sut.png')
    },
    { 
      id: '4', 
      name: 'Katma Değer', 
      image: require('../images/katma.png')
    },
  ];

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await mockApi.products.getAll();
      setProducts(data as Product[]);
      setError(null);
    } catch (err) {
      setError('Ürünler yüklenirken bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({ item }: { item: Product }) => {
    return (
      <TouchableOpacity 
        style={styles.productItem}
        onPress={() => navigation.navigate('ProductDetails', { product: item })}
      >
        <Image source={{ uri: item.image }} style={styles.productImage} />
        <Text style={styles.productName}>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  const renderCategory = ({ item }: { item: Category }) => (
    <TouchableOpacity 
      style={styles.categoryItem}
      onPress={() => setSelectedCategory(item.name.toLowerCase())}
    >
      <Image source={item.image} style={styles.categoryImage} />
      <Text style={styles.categoryName}>{item.name}</Text>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2DB300" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.addressButton}>
          <Image 
            source={require('../images/plus.png')}
            style={styles.plusIcon} 
          />
          <Text style={styles.addressButtonText}>Yeni adres ekle</Text>
        </TouchableOpacity>
      </View>

      {/* Welcome Banner */}
      <View style={styles.bannerContainer}>
        <Image 
          source={require('../images/welcome-banner.png')}
          style={styles.bannerImage}
        />
        <View style={styles.bannerTextContainer}>
          <Text style={styles.bannerTitle}>Hoşgeldin İndirimi</Text>
          <Text style={styles.bannerSubtitle}>İlk siparişinize özel 250₺ indirim kodu</Text>
        </View>
      </View>

      {/* Categories */}
      <View style={styles.categoriesHeader}>
        <Text style={styles.sectionTitle}>Kategoriler</Text>
        <TouchableOpacity>
          <Text style={styles.seeAllText}>Tümünü gör</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        horizontal
        data={categories}
        renderItem={renderCategory}
        keyExtractor={item => item.id}
        showsHorizontalScrollIndicator={false}
        style={styles.categoriesList}
      />

      {/* Products */}
      <Text style={styles.sectionTitle}>Ürünler</Text>
      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.productsList}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    backgroundColor: '#2DB300',
    padding: 15,
  },
  addressButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  plusIcon: {
    width: 20,
    height: 20,
    tintColor: 'white',
    marginRight: 8,
  },
  addressButtonText: {
    color: 'white',
    fontSize: 16,
  },
  bannerContainer: {
    margin: 15,
    borderRadius: 10,
    overflow: 'hidden',
    height: 150,
  },
  bannerImage: {
    width: '100%',
    height: '100%',
  },
  bannerTextContainer: {
    position: 'absolute',
    top: 20,
    left: 20,
  },
  bannerTitle: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  bannerSubtitle: {
    color: 'white',
    fontSize: 16,
  },
  categoriesHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  seeAllText: {
    color: '#2DB300',
    fontSize: 16,
  },
  categoriesList: {
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  categoryItem: {
    marginHorizontal: 5,
    width: 100,
    alignItems: 'center',
  },
  categoryImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 5,
  },
  categoryName: {
    fontSize: 14,
    color: 'black',
    textAlign: 'center',
  },
  productsList: {
    paddingHorizontal: 10,
  },
  productItem: {
    flex: 1,
    margin: 5,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  productImage: {
    width: '100%',
    height: 120,
    borderRadius: 10,
    marginBottom: 5,
  },
  productName: {
    fontSize: 14,
    color: 'black',
    textAlign: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    fontSize: 16,
  },
});

export default Home;
