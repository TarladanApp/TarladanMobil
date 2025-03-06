/* eslint-disable prettier/prettier */
import React from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';

const certificatesData = [
  { id: '1', title: 'Biobel', description: 'Organik Tarım', image: 'https://example.com/biobel.png' },
  { id: '2', title: 'ÖR-KOOP', description: 'Organik Tarım Müşteri Belgesi', image: 'https://example.com/orkoop.png' },
  // Diğer sertifikalar...
];

interface CertificateProps {
  title: string;
  description: string;
  image: string;
}

const CertificateItem: React.FC<CertificateProps> = ({ title, description, image }) => {
  return (
    <View style={styles.certificateContainer}>
      <Image source={{ uri: image }} style={styles.image} />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
};

const CertificatesScreen = () => {
  return (
    <ScrollView style={styles.container}>
      {certificatesData.map((item) => (
        <CertificateItem key={item.id} title={item.title} description={item.description} image={item.image} />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f0f0f0',
  },
  certificateContainer: {
    padding: 15,
    marginBottom: 10,
    backgroundColor: 'white',
    borderRadius: 8,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
});

export default CertificatesScreen;
