import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export type Student = {
  id?: string | number;
  name?: string | null;
  email?: string | null;
  course?: string | null;
};

export default function StudentCard({ student }: { student: Student }) {
  const router = useRouter();

  const handleViewDetails = () => {
    // TODO EXAM: Check that the student has an id.
    if (student.id === undefined || student.id === null) {
      return;
    }

    // TODO EXAM: Use Expo Router to navigate to /student/[id].
    router.push({
      pathname: '/student/[id]',
      params: {
        id: String(student.id),
      },
    });
  };

  return (
    <View style={styles.card}>
      <Text style={styles.name}>
        {student.name || 'Name not available'}
      </Text>

      <Text style={styles.text}>
        {student.email || 'Email not available'}
      </Text>

      {student.course ? (
        <Text style={styles.text}>{student.course}</Text>
      ) : null}

      <Pressable
        accessibilityRole="button"
        style={styles.button}
        onPress={handleViewDetails}
      >
        <Text style={styles.buttonText}>View Details</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 18,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#d9e2ec',
  },

  name: {
    fontSize: 18,
    fontWeight: '700',
    color: '#17324d',
    marginBottom: 6,
  },

  text: {
    color: '#536579',
    marginBottom: 4,
  },

  button: {
    backgroundColor: '#245bb2',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 12,
  },

  buttonText: {
    color: '#ffffff',
    fontWeight: '700',
  },
});