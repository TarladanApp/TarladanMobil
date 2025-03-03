import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { MOCK_DATA } from './mockData';

const BASE_URL = __DEV__ ? 'http://localhost:3000/api' : 'https://api.tarladan.com/api';

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

// Mock API fonksiyonları (backend hazır olana kadar)
export const mockApi = {
  products: {
    getAll: async () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(MOCK_DATA.products);
        }, 500);
      });
    },
    getById: async (id: string) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          const product = MOCK_DATA.products.find(p => p.id === id);
          resolve(product);
        }, 500);
      });
    }
  },
  farms: {
    getAll: async () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(MOCK_DATA.farms);
        }, 500);
      });
    },
    getById: async (id: string) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          const farm = MOCK_DATA.farms.find(f => f.id === id);
          resolve(farm);
        }, 500);
      });
    }
  },
  cart: {
    getItems: async () => {
      try {
        const cartData = await AsyncStorage.getItem('cart');
        return cartData ? JSON.parse(cartData) : [];
      } catch (error) {
        console.error('Cart load error:', error);
        return [];
      }
    },
    updateItems: async (items: any[]) => {
      try {
        await AsyncStorage.setItem('cart', JSON.stringify(items));
        return true;
      } catch (error) {
        console.error('Cart update error:', error);
        return false;
      }
    }
  }
};

export default api; 