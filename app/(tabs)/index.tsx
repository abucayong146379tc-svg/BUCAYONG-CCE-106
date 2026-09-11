import { View, Text, StyleSheet } from 'react-native';
import { Link } from 'expo-router';

export default function Home() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Student Portal</Text>
      <Text>Summary: You have 3 active courses.</Text>
      <Link href="/course/101" style={styles.link}>Go to Course 101</Link>
      <Link href="/course/102" style={styles.link}>Go to Course 102</Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  link: { color: 'blue', marginTop: 10, fontSize: 18 }
});
