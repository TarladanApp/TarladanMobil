import React, { createContext, useContext, useEffect, useState } from 'react';
import { mockApi } from '../services/api';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  farm: string;
  image: string;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: Omit<CartItem, 'quantity'>) => Promise<void>;
  removeFromCart: (itemId: string) => Promise<void>;
  updateQuantity: (itemId: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  loading: boolean;
  error: string | null;
  totalAmount: number;
}

const CartContext = createContext<CartContextType>({
  cartItems: [],
  addToCart: async () => {},
  removeFromCart: async () => {},
  updateQuantity: async () => {},
  clearCart: async () => {},
  loading: false,
  error: null,
  totalAmount: 0
});

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    loadCart();
  }, []);

  useEffect(() => {
    calculateTotal();
  }, [cartItems]);

  const loadCart = async () => {
    try {
      setLoading(true);
      const items = await mockApi.cart.getItems();
      setCartItems(items);
      setError(null);
    } catch (err) {
      setError('Sepet yüklenirken bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  const calculateTotal = () => {
    const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    setTotalAmount(total);
  };

  const addToCart = async (item: Omit<CartItem, 'quantity'>) => {
    try {
      setLoading(true);
      const existingItem = cartItems.find(cartItem => cartItem.id === item.id);
      let updatedCart: CartItem[];

      if (existingItem) {
        updatedCart = cartItems.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        updatedCart = [...cartItems, { ...item, quantity: 1 }];
      }

      await mockApi.cart.updateItems(updatedCart);
      setCartItems(updatedCart);
      setError(null);
    } catch (err) {
      setError('Ürün sepete eklenirken bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  const removeFromCart = async (itemId: string) => {
    try {
      setLoading(true);
      const updatedCart = cartItems.filter(item => item.id !== itemId);
      await mockApi.cart.updateItems(updatedCart);
      setCartItems(updatedCart);
      setError(null);
    } catch (err) {
      setError('Ürün sepetten silinirken bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (itemId: string, quantity: number) => {
    try {
      setLoading(true);
      if (quantity < 0) return;

      const updatedCart = cartItems.map(item =>
        item.id === itemId ? { ...item, quantity } : item
      ).filter(item => item.quantity > 0);

      await mockApi.cart.updateItems(updatedCart);
      setCartItems(updatedCart);
      setError(null);
    } catch (err) {
      setError('Ürün miktarı güncellenirken bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  const clearCart = async () => {
    try {
      setLoading(true);
      await mockApi.cart.updateItems([]);
      setCartItems([]);
      setError(null);
    } catch (err) {
      setError('Sepet temizlenirken bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      loading,
      error,
      totalAmount
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext); 