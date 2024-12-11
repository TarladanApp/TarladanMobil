/* eslint-disable prettier/prettier */
import React from "react";
import { Dimensions, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import CustomButton from "../customComponents/CustomButton";
import Produce from "../customComponents/Produce";
import data from "../data.json";

interface Item {
  u_id: number;
  name: string;
  imageUrl: string;
  // Add other properties of the item here
}

import { NavigationProp } from '@react-navigation/native';

interface HomeProps {
  navigation: NavigationProp<any>;
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

      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={styles.text}>Kategoriler</Text>
        <Text style={{ fontSize: 16, padding: 12, color: "black", fontWeight: "bold" }}>Tümünü Gör</Text>
      </View>

      <CustomButton />
      <Text style={styles.text}>Ürünler</Text>
      <FlatList
        keyExtractor={item => item.u_id.toString()}
        data={data}
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
    padding: 10,
    paddingBottom: 0,
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
