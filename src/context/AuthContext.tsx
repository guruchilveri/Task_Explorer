import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type AuthContextType = {
  isLoggedIn: boolean;
  login: (email: string) => void;
  logout: () => void;
  currentUser: string | null;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEYS = {
  CURRENT_USER: '@task_explorer_current_user',
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<string | null>(null);

  useEffect(() => {
    // Check for existing login session
    const checkLoginStatus = async () => {
      try {
        const storedUser = await AsyncStorage.getItem(STORAGE_KEYS.CURRENT_USER);
        if (storedUser) {
          setCurrentUser(storedUser);
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.error('Error checking login status:', error);
      }
    };
    checkLoginStatus();
  }, []);

  const login = async (email: string) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.CURRENT_USER, email);
      setCurrentUser(email);
      setIsLoggedIn(true);
    } catch (error) {
      console.error('Error storing user session:', error);
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
      setCurrentUser(null);
      setIsLoggedIn(false);
    } catch (error) {
      console.error('Error removing user session:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};