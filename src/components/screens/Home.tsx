/* eslint-disable prettier/prettier */
import React from "react";
import { Dimensions, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import CustomButton from "../customComponents/CustomButton";

function Home({ navigation }) {
  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => navigation.navigate('ProductDetails', { product: item })}>
        <Produce produce={item}/>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={{ alignItems: "center", justifyContent: "center", paddingTop: 50 }}>
        <Image style={{ width: Dimensions.get("window").width / 1.1, height: Dimensions.get("window").height / 6, borderRadius: 10 }}
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
  }
});
export default Home;
