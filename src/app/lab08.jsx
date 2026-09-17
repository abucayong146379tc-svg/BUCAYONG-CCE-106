import { useEffect, useState } from 'react';
import {
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';

export default function Lab08() {
  // Attendance list
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

  // Runs when the attendance screen loads
  useEffect(() => {
    console.log('Attendance list loaded');
  }, []);

  // Change student's attendance
  const markAttendance = (index, status) => {
    const updatedStudents = [...students];

    updatedStudents[index].status = status;

    setStudents(updatedStudents);
  };

  // Count present students
  const presentCount = students.filter(
    (student) => student.status === 'Present'
  ).length;

  // Count absent students
  const absentCount = students.length - presentCount;

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Attendance</Text>
        <Text style={styles.subtitle}>
          Manage today's student attendance
        </Text>
      </View>

      {/* Attendance Summary */}
      <View style={styles.summary}>
        <View style={styles.summaryBox}>
          <Text style={styles.summaryNumber}>{students.length}</Text>
          <Text style={styles.summaryLabel}>Students</Text>
        </View>

        <View style={styles.summaryBox}>
          <Text style={[styles.summaryNumber, styles.presentText]}>
            {presentCount}
          </Text>
          <Text style={styles.summaryLabel}>Present</Text>
        </View>

        <View style={styles.summaryBox}>
          <Text style={[styles.summaryNumber, styles.absentText]}>
            {absentCount}
          </Text>
          <Text style={styles.summaryLabel}>Absent</Text>
        </View>
      </View>

      {/* Student List */}
      <Text style={styles.sectionTitle}>Student List</Text>

      {students.map((student, index) => (
        <View style={styles.card} key={index}>
          {/* Student Information */}
          <View style={styles.studentInfo}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {student.name.charAt(0)}
              </Text>
            </View>

            <View>
              <Text style={styles.studentName}>{student.name}</Text>

              <Text
                style={[
                  styles.status,
                  student.status === 'Present'
                    ? styles.presentStatus
                    : styles.absentStatus,
                ]}
              >
                {student.status}
              </Text>
            </View>
          </View>

          {/* Attendance Buttons */}
          <View style={styles.buttons}>
            <Pressable
              style={[
                styles.button,
                styles.presentButton,
                student.status === 'Present' && styles.selectedPresent,
              ]}
              onPress={() => markAttendance(index, 'Present')}
            >
              <Text style={styles.buttonText}>Present</Text>
            </Pressable>

            <Pressable
              style={[
                styles.button,
                styles.absentButton,
                student.status === 'Absent' && styles.selectedAbsent,
              ]}
              onPress={() => markAttendance(index, 'Absent')}
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
    backgroundColor: '#F5F7FA',
    padding: 20,
  },

  header: {
    marginBottom: 20,
  },

  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1F2937',
  },

  subtitle: {
    fontSize: 15,
    color: '#6B7280',
    marginTop: 5,
  },

  summary: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 30,
  },

  summaryBox: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: 'center',
  },

  summaryNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
  },

  summaryLabel: {
    fontSize: 13,
    color: '#6B7280',
    marginTop: 4,
  },

  presentText: {
    color: '#16A34A',
  },

  absentText: {
    color: '#DC2626',
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 12,
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 16,
    marginBottom: 14,
  },

  studentInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#E8EEF7',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },

  avatarText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2563EB',
  },

  studentName: {
    fontSize: 17,
    fontWeight: '600',
    color: '#1F2937',
  },

  status: {
    fontSize: 13,
    marginTop: 3,
    fontWeight: '600',
  },

  presentStatus: {
    color: '#16A34A',
  },

  absentStatus: {
    color: '#DC2626',
  },

  buttons: {
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

  selectedPresent: {
    backgroundColor: '#15803D',
  },

  selectedAbsent: {
    backgroundColor: '#B91C1C',
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },

  footer: {
    alignItems: 'center',
    paddingVertical: 25,
  },

  footerText: {
    color: '#9CA3AF',
    fontSize: 13,
  },
});