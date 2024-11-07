/* eslint-disable prettier/prettier */
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Image } from "react-native";
//import Splash from "./components/screens/Splash";
import Profile from "./components/screens/Profile";
import Home from "./components/screens/Home";
import ProductDetails from "./components/screens/ProductDetails"; // Ürün detayları sayfası
import Login from "./components/screens/Login"
import Splash from "./components/screens/Splash"
import Payment from "./components/screens/Payment";
import Cart from "./components/screens/Cart";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="HomeScreen" component={Home} options={{ headerShown: false }} />
      <Stack.Screen name="ProductDetails" component={ProductDetails}  />
    </Stack.Navigator>
  );
};

const CartStack = () =>{
  return (
    <Stack.Navigator>
      <Stack.Screen name="CartScreen" component={Cart}/>
      <Stack.Screen name="PaymentScreen" component={Payment}/>
    </Stack.Navigator>
  );
};


const Router = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
      
        screenOptions={({ route }) => ({
          tabBarVisible:route.name !== 'Cart',
          tabBarIcon: ({ focused }) => {
            let iconSource;

            if (route.name === "Home") {
              iconSource = focused
                ? require("./components/images/home.png")
                : require("./components/images/home-outline.png");
            } else if (route.name === "Cart") {
              iconSource = focused
                ? require("./components/images/cart.png")
                : require("./components/images/cart-outline.png");
            } else if (route.name === "Profile") {
              iconSource = focused
                ? require("./components/images/person.png")
                : require("./components/images/person-outline.png");
            }

            return <Image source={iconSource} style={{ width: 20, height: 20 }} />;
          }
        })}
      >
        <Tab.Screen name="Home" component={HomeStack} options={{ tabBarLabel: 'Anasayfa', headerShown: false }} />
        <Tab.Screen name="Cart" component={CartStack} options={{ tabBarLabel: 'Sipariş Ver', headerShown: false }} />
        <Tab.Screen name="Profile" component={Login} options={{ tabBarLabel: 'Hesabım', headerShown: false }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};



export default Router;
