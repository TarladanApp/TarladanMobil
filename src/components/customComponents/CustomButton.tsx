/* eslint-disable prettier/prettier */
/* eslint-disable quotes */
/* eslint-disable prettier/prettier */
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const FilterButtons = () => {
  const [selectedButton, setSelectedButton] = useState("all"); // Seçilen butonun durumunu saklar

  // Buton tıklandığında çağrılır ve seçilen butonun durumunu günceller
  const handleButtonPress = (buttonName: string) => {
    setSelectedButton(buttonName);
  };

  return (
    <View style={styles.container}>
      {/* Tümü butonu */}
      <TouchableOpacity
        style={[styles.button, selectedButton === "all" && styles.selectedButton]}
        onPress={() => handleButtonPress("all")}
      >
        <Text style={[styles.buttonText, selectedButton === "all" && styles.selectedButtonText]}>
            Tümü      
        </Text>
      </TouchableOpacity>

      {/* Sebzeler butonu */}
      <TouchableOpacity
        style={[styles.button, selectedButton === "vegetables" && styles.selectedButton]}
        onPress={() => handleButtonPress("vegetables")}
      >
        <Text style={[styles.buttonText, selectedButton === "vegetables" && styles.selectedButtonText]}>
          Yeşillik
        </Text>
      </TouchableOpacity>

      {/* Meyveler butonu */}
      <TouchableOpacity
        style={[styles.button, selectedButton === "fruits" && styles.selectedButton]}
        onPress={() => handleButtonPress("fruits")}
      >
        <Text style={[styles.buttonText, selectedButton === "fruits" && styles.selectedButtonText]}>
          Meyveler
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, selectedButton === "salad ingredients" && styles.selectedButton]}
        onPress={() => handleButtonPress("salad ingredients")}
      >
        <Text style={[styles.buttonText, selectedButton === "salad ingredients" && styles.selectedButtonText]}>
          Salata Malzemesi
        </Text>
      </TouchableOpacity>
    </View>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 10,
    marginLeft:20
  },
  button: {
    backgroundColor: "#eceff1",
    padding: 10,
    marginRight: 20,
  },
  buttonText: {
    color: "black",
    fontWeight: "bold",
  },
  selectedButton: {
    backgroundColor: "black",
  },
  selectedButtonText: {
    color: "white",
  },
});

export default FilterButtons;