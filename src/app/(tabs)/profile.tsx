import { useState } from 'react';
import {
    Image,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';

export default function Profile() {
  const [name, setName] = useState('Allen Joseph M. Bucayong');
  const [program, setProgram] = useState(
    'BSIT - Department of Computing Education'
  );

  const [nameError, setNameError] = useState('');
  const [saved, setSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setSaved(false);

    if (name.trim() === '') {
      setNameError('Full Name is required.');
      return;
    }

    setNameError('');
    setIsSaving(true);

    setTimeout(() => {
      setIsSaving(false);
      setSaved(true);
    }, 800);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Profile</Text>

      <Image
        source={require('@/assets/images/xc.jpg')}
        style={styles.avatar}
      />

      <Text style={styles.name}>{name}</Text>
      <Text style={styles.program}>{program}</Text>

      <View style={styles.form}>
        <Text style={styles.label}>Full Name</Text>

        <TextInput
          style={[
            styles.input,
            nameError !== '' && styles.inputError,
          ]}
          value={name}
          onChangeText={(text) => {
            setName(text);
            setNameError('');
            setSaved(false);
          }}
          placeholder="Enter your full name"
        />

        {nameError !== '' && (
          <Text style={styles.error}>{nameError}</Text>
        )}

        <Text style={styles.label}>Program / Course</Text>

        <TextInput
          style={styles.input}
          value={program}
          onChangeText={(text) => {
            setProgram(text);
            setSaved(false);
          }}
          placeholder="Enter your program"
        />

        <Pressable
          disabled={isSaving}
          onPress={handleSave}
          style={({ pressed }) => [
            styles.saveButton,
            pressed && styles.pressed,
            isSaving && styles.disabled,
          ]}
        >
          <Text style={styles.saveButtonText}>
            {isSaving ? 'Saving...' : 'Save Profile'}
          </Text>
        </Pressable>

        {saved && (
          <View style={styles.successBox}>
            <Text style={styles.successText}>
              Profile saved successfully!
            </Text>
          </View>
        )}
      </View>
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

  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
    marginBottom: 12,
  },

  name: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  program: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginTop: 5,
    marginBottom: 25,
  },

  form: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ddd',
  },

  label: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 7,
    marginTop: 5,
  },

  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 5,
    backgroundColor: '#fff',
  },

  inputError: {
    borderColor: '#d00',
  },

  error: {
    color: '#d00',
    fontSize: 13,
    marginBottom: 10,
  },

  saveButton: {
    backgroundColor: '#222',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },

  pressed: {
    opacity: 0.6,
  },

  disabled: {
    opacity: 0.5,
  },

  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },

  successBox: {
    backgroundColor: '#d9f7df',
    padding: 12,
    borderRadius: 8,
    marginTop: 15,
  },

  successText: {
    color: '#217a35',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});