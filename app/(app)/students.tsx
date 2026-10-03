import { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import StudentCard from '../../components/StudentCard';
import { API_BASE_URL } from '../../constants/api';
import { useAuth } from '../../context/AuthContext';

type Student = {
  id: string;
  name: string;
  email: string;
  course: string;
};

export default function StudentsScreen() {
  const { token } = useAuth();

  const [students, setStudents] = useState<Student[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadStudents = useCallback(async () => {
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError('');

      const response = await fetch(`${API_BASE_URL}/students`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to load students.');
      }

      setStudents(data);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : 'Something went wrong while loading students.'
      );
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    loadStudents();
  }, [loadStudents]);

  const filteredStudents = students.filter((student) => {
    const query = search.toLowerCase().trim();

    return (
      student.name.toLowerCase().includes(query) ||
      student.email.toLowerCase().includes(query) ||
      student.course.toLowerCase().includes(query)
    );
  });

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text style={styles.message}>Loading students...</Text>
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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Students</Text>

      <TextInput
        style={styles.search}
        placeholder="Search students..."
        value={search}
        onChangeText={setSearch}
      />

      {filteredStudents.length === 0 ? (
        <View style={styles.center}>
          <Text style={styles.message}>No students found.</Text>
        </View>
      ) : (
        <FlatList
          data={filteredStudents}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <StudentCard student={item} />}
          contentContainerStyle={styles.list}
        />
      )}
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
    marginBottom: 16,
  },
  search: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 16,
  },
  list: {
    paddingBottom: 20,
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
});