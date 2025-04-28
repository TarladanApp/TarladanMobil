/* eslint-disable prettier/prettier */
import { NavigationProp } from '@react-navigation/native';
import React, { useState } from 'react';
import {
    Dimensions,
    FlatList,
    Image,
    Modal,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface ProductsProps {
  navigation: NavigationProp<any>;
}

interface SortOption {
  id: string;
  label: string;
}

interface FilterOption {
  id: string;
  label: string;
  isSelected: boolean;
}

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
  subCategory?: string;
  inStock: boolean;
  onSale: boolean;
  organic: boolean;
  farm: string;
  unit: string;
  quantity: number;
}

interface Category {
  id: number;
  name: string;
}

interface SubCategories {
  [key: string]: Category[];
}

const mainCategories: Category[] = [
  { id: 1, name: 'Yumurta' },
  { id: 2, name: 'Bal' },
  { id: 3, name: 'Tohum' },
  { id: 4, name: 'Meyve' },
  { id: 5, name: 'Sebze' },
  { id: 6, name: 'Süt Ürünleri' },
  { id: 7, name: 'Katı Yağ' },
];

const subCategories: SubCategories = {
  Meyve: [
    { id: 1, name: 'Çilek' },
    { id: 2, name: 'Ayva' },
    { id: 3, name: 'Mandalina' },
    { id: 4, name: 'Portakal' },
  ],
  // Diğer ana kategoriler için alt kategoriler eklenebilir
};

const sortOptions: SortOption[] = [
  { id: 'price-asc', label: 'Fiyat (Artan)' },
  { id: 'price-desc', label: 'Fiyat (Azalan)' },
  { id: 'name-asc', label: 'İsim (A-Z)' },
  { id: 'name-desc', label: 'İsim (Z-A)' },
];

const filterOptions: FilterOption[] = [
  { id: 'inStock', label: 'Stokta Var', isSelected: false },
  { id: 'onSale', label: 'İndirimde', isSelected: false },
  { id: 'organic', label: 'Organik', isSelected: false },
];

const Products = ({ navigation }: ProductsProps) => {
  const [selectedMainCategory, setSelectedMainCategory] = useState<string>('Meyve');
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>('Çilek');
  const [sortType, setSortType] = useState<'grid' | 'list'>('grid');
  const [showSortModal, setShowSortModal] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [sortBy, setSortBy] = useState<'name' | 'price' | 'none'>('none');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
  const [selectedSort, setSelectedSort] = useState<string>('');
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [products, setProducts] = useState<Product[]>([
    {
      id: '1',
      name: 'Çilek',
      price: 45,
      image: 'https://www.intfarming.com/blog/wp-content/uploads/2021/01/cilek-yetisme-kosullari-2.jpg',
      description: 'Taze bahçe çileği',
      category: 'Meyve',
      subCategory: 'Çilek',
      inStock: true,
      onSale: false,
      organic: true,
      farm: 'Doğal Bahçe',
      unit: 'kg',
      quantity: 1
    },
    {
      id: '2',
      name: 'Ayva',
      price: 35,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzEAz84MPAZHV-d0wj0R-xdntyIA3wW4w_og&s',
      description: 'Taze ayva',
      category: 'Meyve',
      subCategory: 'Ayva',
      inStock: true,
      onSale: true,
      organic: true,
      farm: 'Organik Tarla',
      unit: 'kg',
      quantity: 1
    },
    {
      id: '3',
      name: 'Mandalina',
      price: 25,
      image: 'https://iasbh.tmgrup.com.tr/6a0319/1200/627/0/28/940/519?u=https://isbh.tmgrup.com.tr/sbh/2020/05/13/mandalinanin-faydalari-nelerdir-ne-ise-yarar-mandalina-ishale-iyi-gelir-mi-1589364135521.jpg',
      description: 'Taze mandalina',
      category: 'Meyve',
      subCategory: 'Mandalina',
      inStock: true,
      onSale: false,
      organic: false,
      farm: 'Meyve Bahçesi',
      unit: 'kg',
      quantity: 1
    },
    {
      id: '4',
      name: 'Portakal',
      price: 30,
      image: 'https://i.nefisyemektarifleri.com/2023/02/03/portakal-kabugunun-11-sasirtici-faydasi-16.jpg',
      description: 'Taze portakal',
      category: 'Meyve',
      subCategory: 'Portakal',
      inStock: true,
      onSale: true,
      organic: true,
      farm: 'Organik Bahçe',
      unit: 'kg',
      quantity: 1
    }
  ]);
  const [originalProducts, setOriginalProducts] = useState<Product[]>([]);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Ürünler',
      headerTitleAlign: 'center',
      headerTitleStyle: {
        color: 'white',
        fontSize: 18,
      },
      headerStyle: {
        backgroundColor: '#2DB300',
      },
      headerTintColor: 'white',
    });
  }, [navigation]);

  // İlk yüklemede orijinal ürün listesini kaydet
  React.useEffect(() => {
    setOriginalProducts(products);
  }, []);

  const handleSort = (sortId: string) => {
    setSelectedSort(sortId);
    let sortedProducts = [...products];

    switch (sortId) {
      case 'price-asc':
        sortedProducts.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        sortedProducts.sort((a, b) => b.price - a.price);
        break;
      case 'name-asc':
        sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        break;
    }

    setProducts(sortedProducts);
  };

  const handleFilter = (filterId: string) => {
    let updatedFilters = [...selectedFilters];
    
    if (updatedFilters.includes(filterId)) {
      updatedFilters = updatedFilters.filter(id => id !== filterId);
    } else {
      updatedFilters.push(filterId);
    }
    
    setSelectedFilters(updatedFilters);
    applyFilters(updatedFilters);
  };

  const applyFilters = (filters: string[]) => {
    let filteredProducts = [...originalProducts];

    if (filters.length > 0) {
      filteredProducts = filteredProducts.filter(product => {
        return filters.every(filter => {
          switch (filter) {
            case 'inStock':
              return product.inStock;
            case 'onSale':
              return product.onSale;
            case 'organic':
              return product.organic;
            default:
              return true;
          }
        });
      });
    }

    // Fiyat aralığı filtresini uygula
    filteredProducts = filteredProducts.filter(product => 
      product.price >= priceRange.min && product.price <= priceRange.max
    );

    setProducts(filteredProducts);

    // Mevcut sıralamayı korumak için
    if (selectedSort) {
      handleSort(selectedSort);
    }
  };

  const renderMainCategoryItem = ({ item }: { item: { id: number; name: string } }) => (
    <TouchableOpacity
      style={[
        styles.categoryItem,
        selectedMainCategory === item.name && styles.selectedCategoryItem,
      ]}
      onPress={() => {
        setSelectedMainCategory(item.name);
        if (subCategories[item.name]?.length > 0) {
          setSelectedSubCategory(subCategories[item.name][0].name);
        }
      }}
    >
      <Text
        style={[
          styles.categoryText,
          selectedMainCategory === item.name && styles.selectedCategoryText,
        ]}
      >
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  const renderSubCategoryItem = ({ item }: { item: { id: number; name: string } }) => (
    <TouchableOpacity
      style={[
        styles.subCategoryItem,
        selectedSubCategory === item.name && styles.selectedSubCategoryItem,
      ]}
      onPress={() => setSelectedSubCategory(item.name)}
    >
      <Text
        style={[
          styles.subCategoryText,
          selectedSubCategory === item.name && styles.selectedSubCategoryText,
        ]}
      >
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  const renderProductItem = ({ item }: { item: Product }) => (
    <TouchableOpacity
      style={[styles.productItem, sortType === 'list' && styles.productItemList]}
      onPress={() => navigation.navigate('ProductDetails', { product: item })}
    >
      <Image 
        source={{ uri: item.image }} 
        style={[styles.productImage, sortType === 'list' && styles.productImageList]} 
      />
      <View style={styles.productInfo}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productPrice}>{item.price} ₺/{item.unit}</Text>
        {item.onSale && <Text style={styles.saleTag}>İndirimde</Text>}
        {item.organic && <Text style={styles.organicTag}>Organik</Text>}
      </View>
    </TouchableOpacity>
  );

  const SortModal = () => (
    <Modal
      visible={showSortModal}
      transparent
      animationType="slide"
      onRequestClose={() => setShowSortModal(false)}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Sıralama</Text>
          {sortOptions.map((option) => (
            <TouchableOpacity 
              key={option.id}
              style={[
                styles.modalOption,
                selectedSort === option.id && styles.selectedModalOption
              ]}
              onPress={() => {
                handleSort(option.id);
                setShowSortModal(false);
              }}
            >
              <Text style={[
                styles.modalOptionText,
                selectedSort === option.id && styles.selectedModalOptionText
              ]}>
                {option.label}
              </Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity 
            style={styles.modalCloseButton}
            onPress={() => setShowSortModal(false)}
          >
            <Text style={styles.modalCloseButtonText}>Kapat</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  const FilterModal = () => (
    <Modal
      visible={showFilterModal}
      transparent
      animationType="slide"
      onRequestClose={() => setShowFilterModal(false)}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Filtrele</Text>
          {filterOptions.map((option) => (
            <TouchableOpacity 
              key={option.id}
              style={[
                styles.modalOption,
                selectedFilters.includes(option.id) && styles.selectedModalOption
              ]}
              onPress={() => handleFilter(option.id)}
            >
              <Text style={[
                styles.modalOptionText,
                selectedFilters.includes(option.id) && styles.selectedModalOptionText
              ]}>
                {option.label}
              </Text>
            </TouchableOpacity>
          ))}
          <View style={styles.priceRangeContainer}>
            <Text style={styles.modalSubTitle}>Fiyat Aralığı</Text>
            <View style={styles.priceInputContainer}>
              <TouchableOpacity 
                style={[
                  styles.priceRangeButton,
                  priceRange.max === 50 && styles.selectedPriceRange
                ]}
                onPress={() => {
                  setPriceRange({ min: 0, max: 50 });
                  handlePriceFilter(0, 50);
                }}
              >
                <Text style={priceRange.max === 50 ? styles.selectedModalOptionText : styles.modalOptionText}>
                  0-50 TL
                </Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[
                  styles.priceRangeButton,
                  priceRange.min === 50 && priceRange.max === 100 && styles.selectedPriceRange
                ]}
                onPress={() => {
                  setPriceRange({ min: 50, max: 100 });
                  handlePriceFilter(50, 100);
                }}
              >
                <Text style={priceRange.min === 50 && priceRange.max === 100 ? styles.selectedModalOptionText : styles.modalOptionText}>
                  50-100 TL
                </Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[
                  styles.priceRangeButton,
                  priceRange.min === 100 && styles.selectedPriceRange
                ]}
                onPress={() => {
                  setPriceRange({ min: 100, max: 1000 });
                  handlePriceFilter(100, 1000);
                }}
              >
                <Text style={priceRange.min === 100 ? styles.selectedModalOptionText : styles.modalOptionText}>
                  100+ TL
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity 
            style={styles.modalCloseButton}
            onPress={() => setShowFilterModal(false)}
          >
            <Text style={styles.modalCloseButtonText}>Uygula</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  // Fiyat filtreleme fonksiyonu
  const handlePriceFilter = (min: number, max: number) => {
    const filteredByPrice = products.filter(product => 
      product.price >= min && product.price <= max
    );
    setProducts(filteredByPrice);
  };

  return (
    <View style={styles.container}>
      {/* Ana Kategori Listesi */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoryContainer}
      >
        {mainCategories.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={[
              styles.categoryItem,
              selectedMainCategory === category.name && styles.selectedCategoryItem,
            ]}
            onPress={() => {
              setSelectedMainCategory(category.name);
              if (subCategories[category.name]?.length > 0) {
                setSelectedSubCategory(subCategories[category.name][0].name);
              }
            }}
          >
            <Text
              style={[
                styles.categoryText,
                selectedMainCategory === category.name && styles.selectedCategoryText,
              ]}
            >
              {category.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Alt Kategori Listesi */}
      {subCategories[selectedMainCategory] && (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.subCategoryContainer}
        >
          {subCategories[selectedMainCategory].map((category) => (
            <TouchableOpacity
              key={category.id}
              style={[
                styles.subCategoryItem,
                selectedSubCategory === category.name && styles.selectedSubCategoryItem,
              ]}
              onPress={() => setSelectedSubCategory(category.name)}
            >
              <Text
                style={[
                  styles.subCategoryText,
                  selectedSubCategory === category.name && styles.selectedSubCategoryText,
                ]}
              >
                {category.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}

      {/* Filtreleme ve Sıralama */}
      <View style={styles.filterContainer}>
        <TouchableOpacity 
          style={styles.filterButton}
          onPress={() => setShowSortModal(true)}
        >
          <Text style={styles.filterButtonText}>Sırala</Text>
          <Icon name="arrow-up-outline" size={16} color="#2DB300" />
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.filterButton}
          onPress={() => setShowFilterModal(true)}
        >
          <Text style={styles.filterButtonText}>Filtrele</Text>
          <Icon name="filter-outline" size={16} color="#2DB300" />
        </TouchableOpacity>

        <View style={styles.viewTypeContainer}>
          <TouchableOpacity
            style={[styles.viewTypeButton, sortType === 'grid' && styles.activeViewType]}
            onPress={() => setSortType('grid')}
          >
            <Icon name="grid-outline" size={20} color={sortType === 'grid' ? '#2DB300' : '#666'} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.viewTypeButton, sortType === 'list' && styles.activeViewType]}
            onPress={() => setSortType('list')}
          >
            <Icon name="list-outline" size={20} color={sortType === 'list' ? '#2DB300' : '#666'} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Ürün Listesi */}
      <FlatList
        data={products}
        renderItem={renderProductItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={sortType === 'grid' ? 2 : 1}
        key={sortType} // Bu satır görünüm tipi değiştiğinde FlatList'in yeniden render edilmesini sağlar
        columnWrapperStyle={sortType === 'grid' ? styles.productRow : null}
        showsVerticalScrollIndicator={false}
      />

      <SortModal />
      <FilterModal />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  categoryContainer: {
    maxHeight: 45,
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  subCategoryContainer: {
    maxHeight: 40,
    paddingVertical: 5,
    paddingHorizontal: 15,
    backgroundColor: '#f9f9f9',
  },
  categoryItem: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    borderRadius: 16,
    backgroundColor: '#f5f5f5',
  },
  selectedCategoryItem: {
    backgroundColor: '#2DB300',
  },
  categoryText: {
    fontSize: 14,
    color: '#666',
  },
  selectedCategoryText: {
    color: '#fff',
  },
  subCategoryItem: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    borderRadius: 15,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  selectedSubCategoryItem: {
    backgroundColor: '#e8f5e9',
    borderColor: '#2DB300',
  },
  subCategoryText: {
    fontSize: 12,
    color: '#666',
  },
  selectedSubCategoryText: {
    color: '#2DB300',
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#2DB300',
  },
  filterButtonText: {
    fontSize: 14,
    color: '#2DB300',
    marginRight: 5,
  },
  viewTypeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewTypeButton: {
    padding: 8,
    marginLeft: 10,
  },
  activeViewType: {
    backgroundColor: '#f5f5f5',
    borderRadius: 5,
  },
  productRow: {
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  productItem: {
    width: Dimensions.get('window').width / 2 - 23,
    marginVertical: 8,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  productItemList: {
    width: Dimensions.get('window').width - 30,
    flexDirection: 'row',
    alignItems: 'center',
  },
  productImage: {
    width: '100%',
    height: 150,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    resizeMode: 'cover',
  },
  productImageList: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 10,
  },
  productInfo: {
    padding: 10,
    flex: 1,
  },
  productName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
    marginBottom: 5,
  },
  productPrice: {
    fontSize: 14,
    color: '#2DB300',
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#000',
  },
  modalOption: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  selectedModalOption: {
    backgroundColor: '#e8f5e9',
  },
  modalOptionText: {
    fontSize: 16,
    color: '#333',
  },
  selectedModalOptionText: {
    color: '#2DB300',
    fontWeight: 'bold',
  },
  modalCloseButton: {
    marginTop: 15,
    padding: 12,
    backgroundColor: '#2DB300',
    borderRadius: 8,
    alignItems: 'center',
  },
  modalCloseButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  priceRangeContainer: {
    marginVertical: 10,
  },
  priceInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  priceRangeButton: {
    padding: 8,
    borderWidth: 1,
    borderColor: '#2DB300',
    borderRadius: 5,
    marginHorizontal: 5,
  },
  saleTag: {
    color: '#FF4D4D',
    fontSize: 12,
    marginTop: 4,
  },
  organicTag: {
    color: '#2DB300',
    fontSize: 12,
    marginTop: 2,
  },
  modalSubTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  selectedPriceRange: {
    backgroundColor: '#e8f5e9',
    borderColor: '#2DB300',
  },
});

export default Products; 