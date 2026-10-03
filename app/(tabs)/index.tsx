import { StyleSheet, Text, View } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Student Service Portal</Text>

      <Text style={styles.subtitle}>
        Welcome to the CCE106 Student Service Portal.
      </Text>

      <Text style={styles.text}>
        Use the application tabs to access your dashboard, students, and
        profile.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#f2f5fa',
  },

  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#17324d',
    textAlign: 'center',
    marginBottom: 12,
  },

  subtitle: {
    fontSize: 16,
    color: '#536579',
    textAlign: 'center',
    marginBottom: 12,
  },

  text: {
    fontSize: 14,
    color: '#536579',
    textAlign: 'center',
    lineHeight: 22,
  },
});