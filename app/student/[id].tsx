import { MockApi, type MockStudent } from '@/constants/mockApi';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default function StudentDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  const [student, setStudent] = useState<MockStudent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadStudent = useCallback(async () => {
    // TODO EXAM: Validate the id read from useLocalSearchParams().
    if (!id) {
      setError('Student ID is missing.');
      setLoading(false);
      return;
    }

    setLoading(true);
    setError('');

    try {
      // TODO EXAM: GET /students/{id} with fetch(), async/await, and a Bearer token.
      // TODO EXAM: Check response.ok; handle 401 Unauthorized and missing records.
      // TODO EXAM: Parse JSON and update student state.
      const data = await MockApi.getStudent(String(id));

      setStudent(data);
    } catch (err) {
      const apiError = err as { status?: number; message?: string };

      if (apiError.status === 404) {
        setError('Student record not found.');
      } else if (apiError.status === 401) {
        setError('Your session has expired. Please sign in again.');
      } else {
        setError(
          apiError.message || 'Unable to load student information.'
        );
      }

      setStudent(null);
    } finally {
      // TODO EXAM: Handle errors and stop loading in finally.
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    // TODO EXAM: Call loadStudent() when id changes.
    loadStudent();
  }, [loadStudent]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Student Details</Text>

      {loading ? (
        <View style={styles.state}>
          <ActivityIndicator color="#245bb2" />
          <Text style={styles.text}>Loading student…</Text>
        </View>
      ) : error ? (
        <View style={styles.state}>
          <Text style={styles.error}>{error}</Text>

          <Pressable
            accessibilityRole="button"
            style={styles.button}
            onPress={loadStudent}
          >
            <Text style={styles.buttonText}>Try Again</Text>
          </Pressable>
        </View>
      ) : student ? (
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
      ) : (
        <Text style={styles.text}>No student record available.</Text>
      )}

      <Pressable
        accessibilityRole="button"
        style={styles.backButton}
        onPress={() => router.back()}
      >
        <Text style={styles.backButtonText}>Back</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 24,
    backgroundColor: '#f2f5fa',
  },

  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#17324d',
    marginBottom: 20,
  },

  state: {
    padding: 24,
    alignItems: 'center',
    gap: 12,
  },

  text: {
    color: '#536579',
    textAlign: 'center',
  },

  error: {
    color: '#b42318',
    textAlign: 'center',
  },

  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: '#d9e2ec',
  },

  label: {
    fontSize: 12,
    fontWeight: '700',
    color: '#536579',
    marginTop: 12,
    marginBottom: 4,
  },

  value: {
    fontSize: 16,
    color: '#17324d',
  },

  button: {
    backgroundColor: '#245bb2',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },

  buttonText: {
    color: '#ffffff',
    fontWeight: '700',
  },

  backButton: {
    marginTop: 20,
    padding: 14,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#245bb2',
    alignItems: 'center',
  },

  backButtonText: {
    color: '#245bb2',
    fontWeight: '700',
  },
});