import { AuthContext } from '@/context/AuthContext';
import { Redirect, Tabs } from 'expo-router';
import { useContext } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

export default function AppLayout() {
  const auth = useContext(AuthContext);

  if (!auth || auth.authLoading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator color="#245bb2" />
      </View>
    );
  }

  if (!auth.token || !auth.user) {
    return <Redirect href="/sign-in" />;
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#245bb2',
        headerTintColor: '#17324d',
        tabBarIconStyle: { display: 'none' },
      }}
    >
      <Tabs.Screen name="index" options={{ title: 'Home' }} />
      <Tabs.Screen name="students" options={{ title: 'Students' }} />
      <Tabs.Screen name="profile" options={{ title: 'Profile' }} />
    </Tabs>
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