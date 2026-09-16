import { router, useLocalSearchParams } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import {
    tasks,
    toggleTaskStatus,
} from '@/constants/tasks';

export default function TaskDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const task = tasks.find((item) => item.id === id);

  if (!task) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Task Not Found</Text>

        <Text style={styles.message}>
          The task you are looking for does not exist.
        </Text>

        <Pressable
          style={({ pressed }) => [
            styles.button,
            pressed && styles.pressed,
          ]}
          onPress={() => router.back()}
        >
          <Text style={styles.buttonText}>Go Back</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Task Details</Text>

      <View style={styles.card}>
        <Text style={styles.taskTitle}>{task.title}</Text>

        <Text style={styles.label}>Subject</Text>
        <Text style={styles.info}>{task.subject}</Text>

        <Text style={styles.label}>Due Date</Text>
        <Text style={styles.info}>{task.dueDate}</Text>

        <Text style={styles.label}>Status</Text>
        <Text style={styles.status}>{task.status}</Text>

        <Pressable
          style={({ pressed }) => [
            styles.button,
            pressed && styles.pressed,
          ]}
          onPress={() => {
            toggleTaskStatus(task.id);
          }}
        >
          <Text style={styles.buttonText}>
            Mark as{' '}
            {task.status === 'Pending'
              ? 'Completed'
              : 'Pending'}
          </Text>
        </Pressable>
      </View>

      <Pressable
        style={({ pressed }) => [
          styles.backButton,
          pressed && styles.pressed,
        ]}
        onPress={() => router.back()}
      >
        <Text style={styles.backButtonText}>
          Back to Tasks
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7fb',
    padding: 24,
  },

  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 35,
    marginBottom: 20,
  },

  message: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },

  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ddd',
  },

  taskTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },

  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#666',
    marginTop: 10,
  },

  info: {
    fontSize: 16,
    marginTop: 4,
  },

  status: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 4,
  },

  button: {
    backgroundColor: '#222',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
  },

  backButton: {
    backgroundColor: '#e5e5e5',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 15,
  },

  pressed: {
    opacity: 0.6,
  },

  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },

  backButtonText: {
    color: '#222',
    fontSize: 16,
    fontWeight: 'bold',
  },
});