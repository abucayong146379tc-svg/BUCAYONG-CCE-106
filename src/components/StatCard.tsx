import { StyleSheet, Text, View } from 'react-native';

type StatCardProps = {
  label: string;
  value: number;
};

export default function StatCard({ label, value }: StatCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 12,
    marginBottom: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#dddddd',
  },
  value: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  label: {
    fontSize: 15,
    marginTop: 5,
  },
});