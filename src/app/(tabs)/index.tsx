import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import StatCard from '@/components/StatCard';

export default function Dashboard() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>StudyFlow</Text>

      <Text style={styles.welcome}>
        Welcome, Allen Joseph!
      </Text>

      <Text style={styles.subtitle}>
        Stay organized and keep track of your school tasks.
      </Text>

      <View style={styles.stats}>
        <StatCard label="Total Tasks" value={5} />
        <StatCard label="Completed" value={2} />
        <StatCard label="Pending" value={3} />
      </View>

      <Pressable
        style={({ pressed }) => [
          styles.button,
          pressed && styles.buttonPressed,
        ]}
        onPress={() => router.push('/(tabs)/tasks')}
      >
        <Text style={styles.buttonText}>View My Tasks</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#f5f7fb',
  },

  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: 40,
  },

  welcome: {
    fontSize: 22,
    fontWeight: '600',
    marginTop: 10,
  },

  subtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 8,
    marginBottom: 25,
  },

  stats: {
    gap: 10,
  },

  button: {
    backgroundColor: '#222',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
  },

  buttonPressed: {
    opacity: 0.6,
  },

  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});