/* eslint-disable prettier/prettier */
import { NavigationProp } from '@react-navigation/native';
import React from "react";
import { Dimensions, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import CustomButton from "../customComponents/CustomButton";
import Produce from "../customComponents/Produce";
import data from "../data.json";

interface HomeProps {
  navigation: NavigationProp<any>;
}

interface Item {
  u_id: number;
  name: string;
  imageUrl: string;
  // Add other properties of the item here
  price?: number;
}

function Home({ navigation }: HomeProps) {
  const renderItem = ({ item }: { item: Item }) => {
    return (
      <TouchableOpacity onPress={() => navigation.navigate('ProductDetails', { product: item })}>
        <Produce produce={item}/>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerImageContainer}>
        <Image style={styles.headerImage}
          source={{ uri: "https://ideacdn.net/idea/ef/27/myassets/blogs/1.JPG?revision=1586724702" }} />
      </View>

      <View style={styles.sectionHeader}>
        <Text style={styles.text}>Kategoriler</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Products')}>
          <Text style={styles.seeAllText}>Tümünü Gör</Text>
        </TouchableOpacity>
      </View>

      <CustomButton />
      <View style={styles.sectionHeader}>
        <Text style={styles.text}>Ürünler</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Products')}>
          <Text style={styles.seeAllText}>Tümünü Gör</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        keyExtractor={item => item.u_id.toString()}
        data={data.slice(0, 8)} // Sadece ilk 8 ürünü göster
        renderItem={renderItem}
        numColumns={4}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  text: {
    fontSize: 20,
    color: "black",
    fontWeight: "bold"
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 12,
  },
  seeAllText: {
    fontSize: 16,
    color: "black",
    fontWeight: "bold"
  },
  headerImage: {
    width: Dimensions.get("window").width / 1.1,
    height: Dimensions.get("window").height / 6,
    borderRadius: 10,
    resizeMode: 'cover'
  },
  headerImageContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 50,
    paddingBottom: 20
  }
});
export default Home;
