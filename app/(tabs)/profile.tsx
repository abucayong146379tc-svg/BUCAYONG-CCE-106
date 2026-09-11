import { View, Text, Button, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function Profile() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Student Profile</Text>
      <Text>Name: Jane Doe</Text>
      <Text>Major: Computer Science</Text>
      <View style={styles.buttonContainer}>
        <Button 
          title="View Student Details" 
          onPress={() => router.push('/student/jane_doe')} 
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  buttonContainer: { marginTop: 20 }
});
