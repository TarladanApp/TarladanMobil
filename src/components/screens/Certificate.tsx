import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import Certificate from './Certificate';

const certificatesData = [
  { id: '1', title: 'Biobel', description: 'Organik Tarım', image: 'https://example.com/biobel.png' },
  { id: '2', title: 'ÖR-KOOP', description: 'Organik Tarım Müşteri Belgesi', image: 'https://example.com/orkoop.png' },
  // Diğer sertifikalar...
];

const CertificatesScreen = () => {
  return (
    <ScrollView style={styles.container}>
      {certificatesData.map((item) => (
        <Certificate key={item.id} title={item.title} description={item.description} image={item.image} />
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
});

export default CertificatesScreen;
