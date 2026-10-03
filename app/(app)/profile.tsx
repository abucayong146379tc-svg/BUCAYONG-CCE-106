import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { API_BASE_URL } from '../../constants/api';
import { useAuth } from '../../context/AuthContext';

type Profile = {
  id: string;
  name: string;
  email: string;
  role: string;
  studentId: string;
  course: string;
};

export default function ProfileScreen() {
  const { token, logout } = useAuth();

  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadProfile = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError('');

        const response = await fetch(`${API_BASE_URL}/profile`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Failed to load profile.');
        }

        setProfile(data.user);
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : 'Something went wrong while loading your profile.'
        );
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [token]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text style={styles.message}>Loading profile...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>{error}</Text>
      </View>
    );
  }

  if (!profile) {
    return (
      <View style={styles.center}>
        <Text style={styles.message}>Profile not available.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Profile</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Name</Text>
        <Text style={styles.value}>{profile.name}</Text>

        <Text style={styles.label}>Student ID</Text>
        <Text style={styles.value}>{profile.studentId}</Text>

        <Text style={styles.label}>Email</Text>
        <Text style={styles.value}>{profile.email}</Text>

        <Text style={styles.label}>Course</Text>
        <Text style={styles.value}>{profile.course}</Text>

        <Text style={styles.label}>Role</Text>
        <Text style={styles.value}>{profile.role}</Text>
      </View>

      <Pressable style={styles.logoutButton} onPress={logout}>
        <Text style={styles.logoutText}>Logout</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 20,
  },
  card: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    padding: 20,
  },
  label: {
    fontSize: 13,
    color: '#777',
    marginTop: 12,
  },
  value: {
    fontSize: 17,
    fontWeight: '600',
    marginTop: 4,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  message: {
    marginTop: 10,
    color: '#666',
  },
  error: {
    color: 'red',
    textAlign: 'center',
  },
  logoutButton: {
    backgroundColor: '#c62828',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 24,
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});