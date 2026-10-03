import { AuthContext, AuthProvider } from '@/context/AuthContext';
import { Redirect, Stack } from 'expo-router';
import { useContext } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

function RootNavigation() {
  const auth = useContext(AuthContext);

  if (!auth || auth.authLoading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator color="#245bb2" />
      </View>
    );
  }

  const isAuthenticated = Boolean(auth.token && auth.user);

  return (
    <>
      {!isAuthenticated ? (
        <Redirect href="/sign-in" />
      ) : null}

      <Stack screenOptions={{ headerTintColor: '#17324d' }}>
        <Stack.Screen
          name="sign-in"
          options={{ title: 'Sign In' }}
        />

        <Stack.Screen
          name="(app)"
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="student/[id]"
          options={{ title: 'Student Details' }}
        />
      </Stack>
    </>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <RootNavigation />
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f2f5fa',
  },
});