import { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    StyleSheet,
    Text,
    View,
} from 'react-native';

import { getToken } from '../services/auth';

export default function ProfileScreen() {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadToken();
  }, []);

  const loadToken = async () => {
    const savedToken = await getToken();
    setToken(savedToken);
    setLoading(false);
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text style={styles.loadingText}>
          Loading profile...
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Student Profile</Text>

      {token ? (
        <View style={styles.card}>
          <Text style={styles.label}>Authentication</Text>

          <Text style={styles.success}>
            Logged in successfully
          </Text>

          <Text style={styles.label}>Token</Text>

          <Text style={styles.token}>
            {token.substring(0, 20)}...
          </Text>
        </View>
      ) : (
        <Text style={styles.error}>
          No authentication token found.
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 24,
    justifyContent: 'center',
  },

  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  loadingText: {
    marginTop: 10,
    fontSize: 16,
  },

  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 25,
  },

  card: {
    backgroundColor: '#ffffff',
    padding: 24,
    borderRadius: 16,
    elevation: 4,
  },

  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },

  success: {
    fontSize: 18,
    marginBottom: 25,
  },

  token: {
    fontSize: 14,
    color: '#555555',
  },

  error: {
    textAlign: 'center',
    fontSize: 16,
  },
});