import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { authAPI, userAPI } from '../api/apiService';

interface AuthContextType {
  isAuthenticated: boolean;
  user: any | null;
  login: (credentials: { email: string; password: string }) => Promise<void>;
  register: (userData: any) => Promise<void>;
  logout: () => Promise<void>;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        setIsAuthenticated(true);
        // Kullanıcı bilgilerini getir
        const userData = await userAPI.getProfile();
        setUser(userData);
      }
    } catch (error) {
      console.error('Auth check failed:', error);
    }
  };

  const login = async (credentials: { email: string; password: string }) => {
    try {
      console.log('AuthContext: Attempting login...');
      const response = await authAPI.login(credentials);
      console.log('AuthContext: Login successful, response:', response);
      
      if (!response.access_token) {
        throw new Error('Token not received from server');
      }

      await AsyncStorage.setItem('token', response.access_token);
      setIsAuthenticated(true);
      
      // Kullanıcı bilgilerini getir
      try {
        const userData = await userAPI.getProfile();
        setUser(userData);
      } catch (error) {
        console.error('Failed to fetch user profile:', error);
      }
      
      return response;
    } catch (error: any) {
      console.error('AuthContext: Login failed:', error.response?.data || error.message);
      throw error;
    }
  };

  const register = async (userData: any) => {
    try {
      console.log('AuthContext: Attempting registration...');
      const response = await authAPI.register(userData);
      console.log('AuthContext: Registration successful, response:', response);
      
      if (!response.access_token) {
        throw new Error('Token not received from server');
      }

      await AsyncStorage.setItem('token', response.access_token);
      setIsAuthenticated(true);
      
      // Kullanıcı bilgilerini getir
      try {
        const userData = await userAPI.getProfile();
        setUser(userData);
      } catch (error) {
        console.error('Failed to fetch user profile:', error);
      }
      
      return response;
    } catch (error: any) {
      console.error('AuthContext: Registration failed:', error.response?.data || error.message);
      throw error;
    }
  };

  const logout = async () => {
    await AsyncStorage.removeItem('token');
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
