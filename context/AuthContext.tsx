import * as SecureStore from 'expo-secure-store';
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { Platform } from 'react-native';

import { API_BASE_URL } from '../constants/api';

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  studentId: string;
  course: string;
};

type AuthContextType = {
  token: string | null;
  user: User | null;
  authLoading: boolean;
  login: (token: string, user: User) => Promise<void>;
  logout: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

  const login = async (newToken: string, newUser: User) => {
    if (Platform.OS !== 'web') {
      await SecureStore.setItemAsync('auth_token', newToken);
    }

    setToken(newToken);
    setUser(newUser);
  };

  const logout = async () => {
    if (Platform.OS !== 'web') {
      await SecureStore.deleteItemAsync('auth_token');
    }

    setToken(null);
    setUser(null);
  };

  useEffect(() => {
    const restoreSession = async () => {
      try {
        if (Platform.OS === 'web') {
          return;
        }

        const savedToken = await SecureStore.getItemAsync('auth_token');

        if (!savedToken) {
          return;
        }

        const response = await fetch(`${API_BASE_URL}/profile`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${savedToken}`,
          },
        });

        if (!response.ok) {
          if (response.status === 401) {
            await SecureStore.deleteItemAsync('auth_token');
          }

          return;
        }

        const data = await response.json();

        setToken(savedToken);
        setUser(data.user);
      } catch (error) {
        console.error('Session restoration failed:', error);
      } finally {
        setAuthLoading(false);
      }
    };

    restoreSession();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        authLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider');
  }

  return context;
}