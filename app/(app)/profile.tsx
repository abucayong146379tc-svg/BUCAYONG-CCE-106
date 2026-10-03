import { useAuth } from '@/hooks/useAuth';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default function ProfileScreen() {
  const { user, token, logout } = useAuth();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // TODO EXAM: Load GET /profile with fetch(), async/await, and the Bearer token.
    // TODO EXAM: Add loading/error state with useState and call the loader using useEffect.
    // TODO EXAM: Check response.ok, handle 401 Unauthorized, and display returned profile data.

    setLoading(true);
    setError('');

    const loadProfile = async () => {
      try {
        if (!token) {
          throw new Error('No active session found.');
        }

        // The authenticated user is already available from AuthContext.
        // We use it here while the mock API is being used.
        if (!user) {
          throw new Error('Profile information is unavailable.');
        }
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : 'Unable to load profile.'
        );
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [token, user]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>MY PROFILE</Text>

      {loading ? (
        <View style={styles.state}>
          <ActivityIndicator color="#245bb2" />
          <Text style={styles.text}>Loading profile…</Text>
        </View>
      ) : error ? (
        <View style={styles.card}>
          <Text style={styles.error}>{error}</Text>
        </View>
      ) : (
        <View style={styles.card}>
          <Text style={styles.label}>Name</Text>
          <Text style={styles.text}>
            {user?.name || 'Not available'}
          </Text>

          <Text style={styles.label}>Email</Text>
          <Text style={styles.text}>
            {user?.email || 'Not available'}
          </Text>

          <Text style={styles.label}>Role</Text>
          <Text style={styles.text}>
            {user?.role || 'Not available'}
          </Text>

          {'studentId' in (user ?? {}) ? (
            <>
              <Text style={styles.label}>Student ID</Text>
              <Text style={styles.text}>
                {user?.studentId || 'Not available'}
              </Text>
            </>
          ) : null}

          {'course' in (user ?? {}) ? (
            <>
              <Text style={styles.label}>Course</Text>
              <Text style={styles.text}>
                {user?.course || 'Not available'}
              </Text>
            </>
          ) : null}
        </View>
      )}

      <Text style={styles.text}>
        Session Status:{' '}
        {token ? 'Authenticated' : 'Not Available'}
      </Text>

      <Pressable
        accessibilityRole="button"
        style={styles.button}
        onPress={logout}
      >
        <Text style={styles.buttonText}>LOGOUT</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 24,
    gap: 20,
    backgroundColor: '#f2f5fa',
  },

  title: {
    color: '#17324d',
    fontSize: 24,
    fontWeight: '700',
  },

  card: {
    backgroundColor: '#ffffff',
    padding: 20,
    gap: 10,
    borderRadius: 12,
  },

  label: {
    color: '#536579',
    fontSize: 12,
    fontWeight: '700',
    marginTop: 6,
  },

  text: {
    color: '#536579',
    fontSize: 16,
  },

  state: {
    backgroundColor: '#ffffff',
    padding: 24,
    borderRadius: 12,
    alignItems: 'center',
    gap: 12,
  },

  error: {
    color: '#b42318',
  },

  button: {
    backgroundColor: '#245bb2',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },

  buttonText: {
    color: '#ffffff',
    fontWeight: '600',
  },
});