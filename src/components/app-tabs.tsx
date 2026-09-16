import { Tabs } from 'expo-router';
import { Image, useColorScheme } from 'react-native';

import { Colors } from '@/constants/theme';

export default function AppTabs() {
  const scheme = useColorScheme();
  const colors = Colors[scheme ?? 'light'];

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.text,
        tabBarStyle: { backgroundColor: colors.background },
        headerShown: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => (
            <Image 
              source={require('@/assets/images/tabIcons/home.png')} 
              style={{ tintColor: color, width: 24, height: 24 }} 
            />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color }) => (
            <Image 
              source={require('@/assets/images/tabIcons/explore.png')} 
              style={{ tintColor: color, width: 24, height: 24 }} 
            />
          ),
        }}
      />
    </Tabs>
  );
}
