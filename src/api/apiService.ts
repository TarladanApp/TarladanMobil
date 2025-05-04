import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

// 💡 Backend sabit IP (USB debugging ile çalışan IP)
const API_BASE_URL = 'http://192.168.1.41:3000';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  withCredentials: true,
});

// ✅ Request interceptor
apiClient.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const token = await AsyncStorage.getItem('token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log('API Request:', {
      method: config.method?.toUpperCase(),
      url: `${config.baseURL}${config.url}`,
      headers: config.headers,
      data: config.data,
    });
    return config;
  },
  (error: AxiosError) => {
    console.error('Request error:', error.message);
    return Promise.reject(error);
  }
);

// ✅ Response interceptor
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    console.log('API Response:', {
      url: `${response.config.baseURL}${response.config.url}`,
      status: response.status,
      data: response.data,
    });
    return response;
  },
  async (error: AxiosError) => {
    if (error.response) {
      console.error('API Error Response:', {
        url: error.config?.url,
        status: error.response.status,
        data: error.response.data,
      });
    } else if (error.request) {
      console.error('API No Response:', {
        url: error.config?.url,
        message: 'Sunucudan yanıt alınamadı',
      });
    } else {
      console.error('API Request Error:', {
        message: 'İstek oluşturulamadı',
        error: error.message,
      });
    }

    if (error.response?.status === 401) {
      await AsyncStorage.removeItem('token');
      // Giriş ekranına yönlendirme burada yapılabilir
    }

    return Promise.reject(error);
  }
);

// ✅ Auth işlemleri
export const authAPI = {
  login: async (credentials: { email: string; password: string }) => {
    const requestData = {
      user_mail: credentials.email,
      user_password: credentials.password
    };
    const response = await apiClient.post('/auth/login', requestData);
    return response.data;
  },
  register: async (userData: {
    user_mail: string;
    user_phone_number: string;
    user_password: string; 
    user_name: string;
    user_surname: string;
    user_birthday_date: string;
  }) => {
    const response = await apiClient.post('/auth/register', userData);
    return response.data;
  },
};

// ✅ Kullanıcı işlemleri
export const userAPI = {
  getProfile: async () => {
    const response = await apiClient.get('/user/profile');
    return response.data;
  },
  updateProfile: async (profileData: any) => {
    const response = await apiClient.put('/user/profile', profileData);
    return response.data;
  },
  getAddresses: async () => {
    const response = await apiClient.get('/user/profile/addresses');
    return response.data;
  },
  addAddress: async (addressData: any) => {
    const response = await apiClient.post('/user/profile/addresses', addressData);
    return response.data;
  },
  updateAddress: async (addressId: number, addressData: any) => {
    const response = await apiClient.put(`/user/profile/addresses/${addressId}`, addressData);
    return response.data;
  },
  deleteAddress: async (addressId: number) => {
    const response = await apiClient.delete(`/user/profile/addresses/${addressId}`);
    return response.data;
  },
  setDefaultAddress: async (addressId: number) => {
    const response = await apiClient.put(`/user/profile/addresses/${addressId}/default`);
    return response.data;
  }
};

// ✅ Kart işlemleri
export const cardAPI = {
  getCards: async () => {
    const response = await apiClient.get('/user/profile/cards');
    return response.data;
  },
  addCard: async (cardData: any) => {
    const response = await apiClient.post('/user/profile/cards', cardData);
    return response.data;
  },
  updateCard: async (cardId: number, cardData: any) => {
    const response = await apiClient.put(`/user/profile/cards/${cardId}`, cardData);
    return response.data;
  },
  deleteCard: async (cardId: number) => {
    const response = await apiClient.delete(`/user/profile/cards/${cardId}`);
    return response.data;
  }
};
