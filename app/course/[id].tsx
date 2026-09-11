import { View, Text, Button, StyleSheet } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

export default function CourseDetails() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  if (!id) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>Invalid Course ID</Text>
        <Button title="Go Back" onPress={() => router.back()} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Course Details</Text>
      <Text style={styles.idText}>Course ID: {id}</Text>
      <Button title="Go Back" onPress={() => router.back()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  idText: { fontSize: 18, marginBottom: 20 },
  error: { fontSize: 18, color: 'red', marginBottom: 20 }
});
