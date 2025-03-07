/* eslint-disable prettier/prettier */
import React from "react";
import { Image, Text, View } from "react-native";
import styles from "./Produce.style";

interface ProduceProps {
  produce: {
    imageUrl: string;
    name: string;
  };
}

const Produce: React.FC<ProduceProps> = ({produce}) => {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{uri:produce.imageUrl}}></Image>
      <Text style={styles.title}>{produce.name}</Text>
    </View>
  );
};

export default Produce;

