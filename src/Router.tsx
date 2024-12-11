/* eslint-disable prettier/prettier */
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from "react";
import { Image } from "react-native";
import Gallery from './components/customComponents/Gallery';
import Cart from "./components/screens/Cart";
import Sertifikalar from './components/screens/Certificate';
import FarmProfile from "./components/screens/FarmProfile";
import Home from "./components/screens/Home";
import Payment from "./components/screens/Payment";
import ProductDetails from "./components/screens/ProductDetails";
import Splash from "./components/screens/Splash";
import { CartProvider } from './context/CartContext';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="HomeScreen" component={Home} options={{ headerShown: false }} />
      <Stack.Screen name="ProductDetails" component={ProductDetails}  />
      <Stack.Screen 
        name="FarmProfile" 
        component={FarmProfile}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen 
        name="Gallery" 
        component={Gallery}
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: '#2DB300',
          },
          headerTintColor: 'white',
        }}
      />
      <Stack.Screen 
        name="Sertifikalar" 
        component={Sertifikalar}
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: '#2DB300',
          },
          headerTintColor: 'white',
        }}
      />
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
    <CartProvider>
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
          <Tab.Screen name="Profile" component={Splash} options={{ tabBarLabel: 'Hesabım', headerShown: false }} />
        </Tab.Navigator>
      </NavigationContainer>
    </CartProvider>
  );
};



export default Router;
