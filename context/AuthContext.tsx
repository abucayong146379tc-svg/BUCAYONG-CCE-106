import { MockApi, type MockUser } from '@/constants/mockApi';
import { useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { createContext, useEffect, useState, type ReactNode } from 'react';
import { Platform } from 'react-native';

export type User = MockUser;

type AuthContextValue = {
  token: string | null;
  user: User | null;
  authLoading: boolean;
  login: (accessToken: string, userData: User) => Promise<void>;
  logout: () => Promise<void>;
  restoreSession: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextValue | undefined>(
  undefined
);

const TOKEN_KEY = 'access_token';

export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();

  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

  const login = async (accessToken: string, userData: User) => {
    try {
      // TODO EXAM: Save the access token with SecureStore.setItemAsync().
      // SecureStore is only available on native platforms.
      if (Platform.OS !== 'web') {
        await SecureStore.setItemAsync(TOKEN_KEY, accessToken);
      }

      // TODO EXAM: Update token state and user state with the supplied arguments.
      setToken(accessToken);
      setUser(userData);
    } catch (error) {
      console.error('Login storage error:', error);
      throw new Error('Unable to save login session.');
    }
  };

  const logout = async () => {
    try {
      // TODO EXAM: Delete the saved token using SecureStore.deleteItemAsync().
      if (Platform.OS !== 'web') {
        await SecureStore.deleteItemAsync(TOKEN_KEY);
      }

      // TODO EXAM: Clear token state and user state.
      setToken(null);
      setUser(null);

      // TODO EXAM: Redirect to sign-in after logout.
      router.replace('/sign-in');
    } catch (error) {
      console.error('Logout storage error:', error);

      // Still clear the in-memory session.
      setToken(null);
      setUser(null);

      router.replace('/sign-in');
    }
  };

  const restoreSession = async () => {
    // TODO EXAM: Set authLoading while restoring the session.
    setAuthLoading(true);

    try {
      // SecureStore is not available on web.
      if (Platform.OS === 'web') {
        setToken(null);
        setUser(null);
        return;
      }

      // TODO EXAM: Read the saved token with SecureStore.getItemAsync().
      const savedToken = await SecureStore.getItemAsync(TOKEN_KEY);

      if (!savedToken) {
        setToken(null);
        setUser(null);
        return;
      }

      try {
        // TODO EXAM: Validate the token via the profile request.
        const data = await MockApi.getProfile(savedToken);

        // TODO EXAM: Update token and user state for a valid session.
        setToken(savedToken);
        setUser(data.user);
      } catch (error) {
        const apiError = error as { status?: number };

        // TODO EXAM: Handle 401 Unauthorized / expired sessions.
        if (apiError.status === 401) {
          await SecureStore.deleteItemAsync(TOKEN_KEY);
          setToken(null);
          setUser(null);
          return;
        }

        throw error;
      }
    } catch (error) {
      console.error('Session restore error:', error);

      setToken(null);
      setUser(null);

      if (Platform.OS !== 'web') {
        await SecureStore.deleteItemAsync(TOKEN_KEY).catch(() => {});
      }
    } finally {
      // TODO EXAM: Handle errors and stop authLoading.
      setAuthLoading(false);
    }
  };

  useEffect(() => {
    // TODO EXAM: Call restoreSession() on startup.
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
        restoreSession,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}