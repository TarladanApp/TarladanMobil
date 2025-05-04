/* eslint-disable prettier/prettier */
/* eslint-disable quotes */
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from "react";
import Gallery from './components/customComponents/Gallery';
import Cart from "./components/screens/Cart";
import Sertifikalar from './components/screens/Certificate';
import FarmProfile from "./components/screens/FarmProfile";
import Home from "./components/screens/Home";
import LoginScreen from "./components/screens/LoginScreen";
import OrderHistory from "./components/screens/OrderHistory";
import PaymentScreen from "./components/screens/Payment";
import PaymentMethods from "./components/screens/PaymentMethods";
import ProductDetails from "./components/screens/ProductDetails";
import Products from "./components/screens/Products";
import Profile from "./components/screens/Profile";
import RegisterScreen from "./components/screens/RegisterScreen";
import SavedAddresses from "./components/screens/SavedAddresses";
import Settings from "./components/screens/Settings";
import { AuthProvider, useAuth } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="HomeScreen" component={Home} options={{ headerShown: false }} />
      <Stack.Screen name="Products" component={Products} />
      <Stack.Screen name="ProductDetails" component={ProductDetails} />
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
      <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

const CartStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="CartScreen" component={Cart} options={{ headerShown: false }} />
      <Stack.Screen
        name="Payment"
        component={PaymentScreen}
        options={{
          headerShown: true,
          title: 'Deniz Ev',
          headerStyle: {
            backgroundColor: '#2DB300',
          },
          headerTintColor: '#fff',
        }} 
      />
      <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Adresses" component={SavedAddresses} options={{headerShown : false}} />
    </Stack.Navigator>
  );
};

const ProfileStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ProfileScreen" component={Profile} options={{ headerShown: false }} />
      <Stack.Screen name="Settings" component={Settings} options={{ headerShown: false }} />
      <Stack.Screen name="PaymentMethods" component={PaymentMethods} options={{ headerShown: false }} />
      <Stack.Screen name="SavedAddresses" component={SavedAddresses} options={{ headerShown: false }} />
      <Stack.Screen name="OrderHistory" component={OrderHistory} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

const AppNavigator = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Tab.Navigator>
      {!isAuthenticated ? (
        // Auth stack
        <>
          <Tab.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
          <Tab.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
        </>
      ) : (
        // App stack
        <>
          <Tab.Screen name="Ana Sayfa" component={HomeStack} options={{ headerShown: false }} />
          <Tab.Screen name="Sepetim" component={CartStack} options={{ headerShown: false }} />
          <Tab.Screen name="Profilim" component={ProfileStack} options={{ headerShown: false }} />
        </>
      )}
    </Tab.Navigator>
  );
};

const Router = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </CartProvider>
    </AuthProvider>
  );
};

export default Router;
