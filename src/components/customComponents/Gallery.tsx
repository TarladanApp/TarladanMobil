import React, { useState } from 'react';
import { Dimensions, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Icon } from 'react-native-elements';
import Modal from 'react-native-modal';

interface GalleryProps {
  route: any;
}

const Gallery = ({ route }: GalleryProps) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const galleryImages = [
    { 
      id: '1', 
      uri: 'https://www.upload.ee/image/16684000/Rectangle_55.png',
      title: 'Domates Serası',
      date: '15 Mart 2024'
    },
    { 
      id: '2', 
      uri: 'https://www.upload.ee/image/16684004/Rectangle_52.png',
      title: 'Salatalık Üretimi',
      date: '14 Mart 2024'
    },
    { 
      id: '3', 
      uri: 'https://www.upload.ee/image/16684005/Rectangle_54.png',
      title: 'Taze Ürünler',
      date: '13 Mart 2024'
    },
    { 
      id: '4', 
      uri: 'https://www.upload.ee/image/16684008/Rectangle_57.png',
      title: 'Biber Hasadı',
      date: '12 Mart 2024'
    },
  ];

  const handleImagePress = (uri: string) => {
    setSelectedImage(uri);
    setIsModalVisible(true);
  };

  const renderItem = ({ item }: { item: { id: string; uri: string; title: string; date: string } }) => (
    <TouchableOpacity 
      style={styles.imageContainer}
      onPress={() => handleImagePress(item.uri)}
    >
      <Image source={{ uri: item.uri }} style={styles.image} />
      <View style={styles.imageInfo}>
        <Text style={styles.imageTitle}>{item.title}</Text>
        <Text style={styles.imageDate}>{item.date}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{route.params?.farmName || 'Galeri'}</Text>
        <Text style={styles.subtitle}>{galleryImages.length} Fotoğraf</Text>
      </View>
      
      <FlatList
        data={galleryImages}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        showsVerticalScrollIndicator={false}
      />

      <Modal 
        isVisible={isModalVisible}
        onBackdropPress={() => setIsModalVisible(false)}
        style={styles.modal}
      >
        <View style={styles.modalContent}>
          {selectedImage && (
            <Image 
              source={{ uri: selectedImage }} 
              style={styles.modalImage} 
              resizeMode="contain"
            />
          )}
          <TouchableOpacity 
            style={styles.closeButton}
            onPress={() => setIsModalVisible(false)}
          >
            <Icon name="close" type="material" color="#fff" size={30} />
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2DB300',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  row: {
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  imageContainer: {
    width: Dimensions.get('window').width / 2 - 15,
    marginVertical: 5,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#fff',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  image: {
    width: '100%',
    height: Dimensions.get('window').width / 2 - 15,
    borderRadius: 10,
  },
  imageInfo: {
    padding: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
  imageTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
  },
  imageDate: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  modal: {
    margin: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
  },
  modalImage: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height / 1.5,
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    padding: 10,
  },
});

export default Gallery; 