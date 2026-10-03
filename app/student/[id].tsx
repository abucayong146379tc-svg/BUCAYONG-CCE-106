import { useLocalSearchParams, useRouter } from 'expo-router';
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

type Student = {
  id: string;
  name: string;
  email: string;
  course: string;
};

export default function StudentDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { token } = useAuth();

  const [student, setStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadStudent = async () => {
      if (!token || !id) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError('');

        const response = await fetch(
          `${API_BASE_URL}/students/${String(id)}`,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Failed to load student.');
        }

        setStudent(data);
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : 'Something went wrong while loading the student.'
        );
      } finally {
        setLoading(false);
      }
    };

    loadStudent();
  }, [id, token]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text style={styles.message}>Loading student...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>{error}</Text>

        <Pressable style={styles.button} onPress={() => router.back()}>
          <Text style={styles.buttonText}>Go Back</Text>
        </Pressable>
      </View>
    );
  }

  if (!student) {
    return (
      <View style={styles.center}>
        <Text style={styles.message}>Student not found.</Text>

        <Pressable style={styles.button} onPress={() => router.back()}>
          <Text style={styles.buttonText}>Go Back</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Student Details</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Student ID</Text>
        <Text style={styles.value}>{student.id}</Text>

        <Text style={styles.label}>Name</Text>
        <Text style={styles.value}>{student.name}</Text>

        <Text style={styles.label}>Email</Text>
        <Text style={styles.value}>{student.email}</Text>

        <Text style={styles.label}>Course</Text>
        <Text style={styles.value}>{student.course}</Text>
      </View>

      <Pressable style={styles.button} onPress={() => router.back()}>
        <Text style={styles.buttonText}>Go Back</Text>
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
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#111',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
});