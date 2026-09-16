import { Pressable, StyleSheet, Text, View } from 'react-native';

type TaskCardProps = {
  title: string;
  subject: string;
  dueDate: string;
  status: 'Pending' | 'Completed';
  onPress: () => void;
};

export default function TaskCard({
  title,
  subject,
  dueDate,
  status,
  onPress,
}: TaskCardProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        pressed && styles.pressed,
      ]}
    >
      <View style={styles.topRow}>
        <Text style={styles.title}>{title}</Text>

        <Text
          style={[
            styles.status,
            status === 'Completed'
              ? styles.completed
              : styles.pending,
          ]}
        >
          {status}
        </Text>
      </View>

      <Text style={styles.subject}>{subject}</Text>

      <Text style={styles.dueDate}>
        Due: {dueDate}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#ddd',
  },

  pressed: {
    opacity: 0.6,
  },

  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  title: {
    fontSize: 17,
    fontWeight: 'bold',
    flex: 1,
    marginRight: 10,
  },

  subject: {
    fontSize: 14,
    color: '#666',
    marginTop: 8,
  },

  dueDate: {
    fontSize: 14,
    marginTop: 6,
  },

  status: {
    fontSize: 12,
    fontWeight: 'bold',
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 8,
  },

  completed: {
    backgroundColor: '#d9f7df',
    color: '#217a35',
  },

  pending: {
    backgroundColor: '#fff0c2',
    color: '#8a6500',
  },
});