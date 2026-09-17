
import { useEffect, useState } from 'react';
import {
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';

export default function Lab08() {
  const [students, setStudents] = useState([
    { name: 'Allen', status: 'Absent' },
    { name: 'Catolico', status: 'Absent' },
    { name: 'Junivy', status: 'Absent' },
    { name: 'Gil', status: 'Absent' },
    { name: 'Jayagan', status: 'Absent' },
    { name: 'Gonzales', status: 'Absent' },
    { name: 'Descartin', status: 'Absent' },
    { name: 'Facundo', status: 'Absent' },
    { name: 'Calizar', status: 'Absent' },
    { name: 'Bagay', status: 'Absent' },
  ]);

  useEffect(() => {
    console.log('Attendance list loaded');
  }, []);

  const markAttendance = (index, status) => {
    const updatedStudents = [...students];

    updatedStudents[index] = {
      ...updatedStudents[index],
      status: status,
    };

    setStudents(updatedStudents);
  };

  const presentCount = students.filter(
    (student) => student.status === 'Present'
  ).length;

  const absentCount = students.filter(
    (student) => student.status === 'Absent'
  ).length;

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Attendance List</Text>
        <Text style={styles.subtitle}>
          Manage today's student attendance
        </Text>
      </View>

      {/* Summary */}
      <View style={styles.summaryContainer}>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryNumber}>
            {students.length}
          </Text>
          <Text style={styles.summaryLabel}>Students</Text>
        </View>

        <View style={styles.summaryCard}>
          <Text style={[styles.summaryNumber, styles.presentNumber]}>
            {presentCount}
          </Text>
          <Text style={styles.summaryLabel}>Present</Text>
        </View>

        <View style={styles.summaryCard}>
          <Text style={[styles.summaryNumber, styles.absentNumber]}>
            {absentCount}
          </Text>
          <Text style={styles.summaryLabel}>Absent</Text>
        </View>
      </View>

      {/* Student List */}
      <Text style={styles.sectionTitle}>Students</Text>

      {students.map((student, index) => (
        <View style={styles.studentCard} key={student.name}>
          {/* Student information */}
          <View style={styles.studentInfo}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {student.name.charAt(0)}
              </Text>
            </View>

            <View style={styles.nameContainer}>
              <Text style={styles.studentName}>
                {student.name}
              </Text>

              <View
                style={[
                  styles.statusBadge,
                  student.status === 'Present'
                    ? styles.presentBadge
                    : styles.absentBadge,
                ]}
              >
                <Text
                  style={[
                    styles.statusText,
                    student.status === 'Present'
                      ? styles.presentStatusText
                      : styles.absentStatusText,
                  ]}
                >
                  {student.status}
                </Text>
              </View>
            </View>
          </View>

          {/* Buttons */}
          <View style={styles.buttonContainer}>
            <Pressable
              onPress={() => markAttendance(index, 'Present')}
              style={({ pressed }) => [
                styles.button,
                styles.presentButton,
                student.status === 'Present' &&
                  styles.selectedPresentButton,
                pressed && styles.pressedButton,
              ]}
            >
              <Text style={styles.buttonText}>Present</Text>
            </Pressable>

            <Pressable
              onPress={() => markAttendance(index, 'Absent')}
              style={({ pressed }) => [
                styles.button,
                styles.absentButton,
                student.status === 'Absent' &&
                  styles.selectedAbsentButton,
                pressed && styles.pressedButton,
              ]}
            >
              <Text style={styles.buttonText}>Absent</Text>
            </Pressable>
          </View>
        </View>
      ))}

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Attendance updates automatically
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F6F8',
  },

  content: {
    padding: 20,
    paddingBottom: 40,
  },

  header: {
    marginBottom: 24,
  },

  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#172033',
  },

  subtitle: {
    fontSize: 15,
    color: '#6B7280',
    marginTop: 6,
  },

  summaryContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 28,
  },

  summaryCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingVertical: 18,
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },

  summaryNumber: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#172033',
  },

  presentNumber: {
    color: '#16A34A',
  },

  absentNumber: {
    color: '#DC2626',
  },

  summaryLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 4,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#172033',
    marginBottom: 14,
  },

  studentCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 16,
    marginBottom: 14,
    shadowColor: '#000000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },

  studentInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#E8EEF9',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },

  avatarText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2563EB',
  },

  nameContainer: {
    flex: 1,
  },

  studentName: {
    fontSize: 17,
    fontWeight: '600',
    color: '#172033',
  },

  statusBadge: {
    alignSelf: 'flex-start',
    marginTop: 5,
    paddingHorizontal: 9,
    paddingVertical: 3,
    borderRadius: 10,
  },

  presentBadge: {
    backgroundColor: '#DCFCE7',
  },

  absentBadge: {
    backgroundColor: '#FEE2E2',
  },

  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },

  presentStatusText: {
    color: '#15803D',
  },

  absentStatusText: {
    color: '#B91C1C',
  },

  buttonContainer: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 15,
  },

  button: {
    flex: 1,
    paddingVertical: 11,
    borderRadius: 10,
    alignItems: 'center',
  },

  presentButton: {
    backgroundColor: '#22C55E',
  },

  absentButton: {
    backgroundColor: '#EF4444',
  },

  selectedPresentButton: {
    backgroundColor: '#15803D',
  },

  selectedAbsentButton: {
    backgroundColor: '#B91C1C',
  },

  pressedButton: {
    opacity: 0.7,
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },

  footer: {
    alignItems: 'center',
    marginTop: 10,
  },

  footerText: {
    fontSize: 12,
    color: '#9CA3AF',
  },
});
