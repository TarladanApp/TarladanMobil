import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useState } from 'react';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  farm: string;
  image: any;
}

interface CartContextType {
  cartItems: CartItem[];
  updateCart: (items: CartItem[]) => void;
}

const CartContext = createContext<CartContextType>({
  cartItems: [],
  updateCart: () => {},
});

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const updateCart = async (items: CartItem[]) => {
    setCartItems(items);
    await AsyncStorage.setItem('cart', JSON.stringify(items));
  };

  return (
    <CartContext.Provider value={{ cartItems, updateCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext); 