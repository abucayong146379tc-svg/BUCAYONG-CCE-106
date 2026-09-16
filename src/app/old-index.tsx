import React, { useState } from 'react';
import {
  Image,
  Keyboard,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';

const ORANGE = '#F27438';
const PEACH = '#F7DFD4';
const BLACK = '#1A1A1A';
const RED = '#D9534F';
const GRAY = '#8A8A8A';

type ProfileErrors = {
  name?: string;
  program?: string;
  age?: string;
  bio?: string;
};  

export default function AboutMeScreen() {

  const [name, setName] = useState('Allen Joseph M. Bucayong');
  const [program, setProgram] = useState('BSIT - Department of Computing Education');
  const [age, setAge] = useState('20');
  const [bio, setBio] = useState(
    'IT student who loves building apps and playing music on the side.'
  );

  
  const [draftName, setDraftName] = useState(name);
  const [draftProgram, setDraftProgram] = useState(program);
  const [draftAge, setDraftAge] = useState(age);
  const [draftBio, setDraftBio] = useState(bio);

  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState<ProfileErrors>({});
  const [isSaving, setIsSaving] = useState(false);
  const [savedVisible, setSavedVisible] = useState(false);

  const startEditing = () => {
    setDraftName(name);
    setDraftProgram(program);
    setDraftAge(age);
    setDraftBio(bio);
    setErrors({});
    setIsEditing(true);
    setSavedVisible(false);
  };

  const cancelEditing = () => {
    setErrors({});
    setIsEditing(false);
    Keyboard.dismiss();
  };

  const validate = (): ProfileErrors => {
    const next: ProfileErrors = {};

    if (!draftName.trim()) {
      next.name = 'Name is required.';
    }

    if (!draftProgram.trim()) {
      next.program = 'Program is required.';
    }

    const trimmedAge = draftAge.trim();
    if (!trimmedAge) {
      next.age = 'Age is required.';
    } else if (!/^\d+$/.test(trimmedAge) || Number(trimmedAge) <= 0 || Number(trimmedAge) > 120) {
      next.age = 'Enter a valid age.';
    }

    if (!draftBio.trim()) {
      next.bio = 'Short bio is required.';
    } else if (draftBio.trim().length < 10) {
      next.bio = 'Bio should be at least 10 characters.';
    }

    return next;
  };

  const handleSave = () => {
    const foundErrors = validate();
    setErrors(foundErrors);

    if (Object.keys(foundErrors).length > 0) {
      return;
    }

    setIsSaving(true);
    Keyboard.dismiss();

    
    setTimeout(() => {
      setName(draftName.trim());
      setProgram(draftProgram.trim());
      setAge(draftAge.trim());
      setBio(draftBio.trim());
      setIsSaving(false);
      setIsEditing(false);
      setSavedVisible(true);

      
      setTimeout(() => {
        setSavedVisible(false);
      }, 2000);
    }, 400);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        bounces={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.topSection}>
          <SafeAreaView edges={['top', 'left', 'right']} style={styles.safeAreaTop}>
            <Image source={require('@/assets/images/xc.jpg')} style={styles.avatar} />
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.subtitle}>My first mobile app.</Text>
            <Text style={styles.tagline}>
              <Text style={styles.accentText}>{'< '}</Text>
              3rd Year BSIT Student @ UM Tagum (DCE)
              <Text style={styles.accentText}>{' />'}</Text>
            </Text>
          </SafeAreaView>
        </View>

        <View style={styles.bottomSection}>
          <SafeAreaView edges={['bottom', 'left', 'right']} style={styles.safeAreaBottom}>
           
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>About Me</Text>
              <Text style={styles.paragraph}>
                Hi! I'm Allen Joseph M. Bucayong, a 20-year-old BSIT student at the University of
                Mindanao Tagum, under the Department of Computing Education (DCE). I'm originally
                from Kapalong, Maniki, Davao del Norte, and I'm currently staying in Tagum City
                while pursuing my studies.
              </Text>
              <Text style={styles.paragraph}>
                I'm someone who enjoys both technology and music. I love playing different
                musical instruments, including the piano, drums, bass, and guitar. I also enjoy
                singing and performing at various events and gigs.
              </Text>
              <Text style={styles.paragraph}>Thanks for visiting my website!</Text>
            </View>

            
            <View style={styles.section}>
              <View style={styles.cardHeaderRow}>
                <Text style={styles.sectionTitle}>Profile</Text>
                {!isEditing && (
                  <Pressable
                    onPress={startEditing}
                    style={({ pressed }) => [
                      styles.editLink,
                      pressed && styles.editLinkPressed,
                    ]}
                    hitSlop={8}
                  >
                    <Text style={styles.editLinkText}>Edit</Text>
                  </Pressable>
                )}
              </View>

              <View style={styles.card}>
               
                <Text style={styles.fieldLabel}>Full Name</Text>
                {isEditing ? (
                  <>
                    <TextInput
                      value={draftName}
                      onChangeText={setDraftName}
                      style={[styles.input, errors.name && styles.inputError]}
                      placeholder="e.g. Juan Dela Cruz"
                      placeholderTextColor={GRAY}
                    />
                    {!!errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
                  </>
                ) : (
                  <Text style={styles.fieldValue}>{name}</Text>
                )}

                
                <Text style={[styles.fieldLabel, { marginTop: Spacing.three }]}>Program</Text>
                {isEditing ? (
                  <>
                    <TextInput
                      value={draftProgram}
                      onChangeText={setDraftProgram}
                      style={[styles.input, errors.program && styles.inputError]}
                      placeholder="e.g. BSIT - DCE"
                      placeholderTextColor={GRAY}
                    />
                    {!!errors.program && <Text style={styles.errorText}>{errors.program}</Text>}
                  </>
                ) : (
                  <Text style={styles.fieldValue}>{program}</Text>
                )}

                
                <Text style={[styles.fieldLabel, { marginTop: Spacing.three }]}>Age</Text>
                {isEditing ? (
                  <>
                    <TextInput
                      value={draftAge}
                      onChangeText={setDraftAge}
                      style={[styles.input, errors.age && styles.inputError]}
                      placeholder="e.g. 20"
                      placeholderTextColor={GRAY}
                      keyboardType="number-pad"
                      maxLength={3}
                    />
                    {!!errors.age && <Text style={styles.errorText}>{errors.age}</Text>}
                  </>
                ) : (
                  <Text style={styles.fieldValue}>{age} years old</Text>
                )}

               
                <Text style={[styles.fieldLabel, { marginTop: Spacing.three }]}>Short Bio</Text>
                {isEditing ? (
                  <>
                    <TextInput
                      value={draftBio}
                      onChangeText={setDraftBio}
                      style={[styles.input, styles.textArea, errors.bio && styles.inputError]}
                      placeholder="Write a short bio..."
                      placeholderTextColor={GRAY}
                      multiline
                      numberOfLines={3}
                    />
                    {!!errors.bio && <Text style={styles.errorText}>{errors.bio}</Text>}
                  </>
                ) : (
                  <Text style={styles.fieldValue}>{bio}</Text>
                )}

                
                {isEditing && (
                  <View style={styles.buttonRow}>
                    <Pressable
                      onPress={cancelEditing}
                      disabled={isSaving}
                      style={({ pressed }) => [
                        styles.cancelButton,
                        pressed && styles.cancelButtonPressed,
                      ]}
                    >
                      <Text style={styles.cancelButtonText}>Cancel</Text>
                    </Pressable>

                    <Pressable
                      onPress={handleSave}
                      disabled={isSaving}
                      style={({ pressed }) => [
                        styles.saveButton,
                        pressed && !isSaving && styles.saveButtonPressed,
                        isSaving && styles.saveButtonSaving,
                      ]}
                    >
                      <Text style={styles.saveButtonText}>
                        {isSaving ? 'Saving...' : 'Save'}
                      </Text>
                    </Pressable>
                  </View>
                )}
              </View>

              {/* Saved confirmation message */}
              {savedVisible && (
                <View style={styles.savedBanner}>
                  <Text style={styles.savedBannerText}>Profile updated successfully</Text>
                </View>
              )}
            </View>
          </SafeAreaView>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    flexGrow: 1,
  },
  topSection: {
    backgroundColor: PEACH,
    paddingHorizontal: Spacing.four,
    paddingBottom: Spacing.five,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    alignItems: 'center',
    shadowColor: ORANGE,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  safeAreaTop: {
    alignItems: 'center',
    width: '100%',
    maxWidth: MaxContentWidth,
    paddingTop: Spacing.four,
  },
  bottomSection: {
    backgroundColor: '#FFFFFF',
    flex: 1,
    paddingHorizontal: Spacing.four,
    paddingTop: Spacing.five,
  },
  safeAreaBottom: {
    width: '100%',
    maxWidth: MaxContentWidth,
    alignSelf: 'center',
    paddingBottom: BottomTabInset + Spacing.four,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 65,
    marginBottom: Spacing.three,
    borderWidth: 4,
    borderColor: '#FFFFFF',
  },
  name: {
    fontSize: 30,
    lineHeight: 36,
    fontWeight: '900',
    color: ORANGE,
    textAlign: 'center',
    marginBottom: Spacing.one,
  },
  subtitle: {
    fontSize: 16,
    color: BLACK,
    fontWeight: 'bold',
    marginBottom: Spacing.one,
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  tagline: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
    marginTop: 4,
  },
  accentText: {
    color: ORANGE,
    fontWeight: 'bold',
  },
  section: {
    marginBottom: Spacing.five,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '900',
    color: ORANGE,
    marginBottom: Spacing.three,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  paragraph: {
    fontSize: 15,
    lineHeight: 24,
    color: BLACK,
    marginBottom: Spacing.three,
  },

 
  cardHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.three,
  },
  editLink: {
    paddingVertical: 4,
    paddingHorizontal: 10,
  },
  editLinkPressed: {
    opacity: 0.5,
  },
  editLinkText: {
    color: BLACK,
    fontWeight: '700',
    fontSize: 13,
    textDecorationLine: 'underline',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: Spacing.four,
    borderWidth: 1.5,
    borderColor: BLACK,
  },
  fieldLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: GRAY,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  fieldValue: {
    fontSize: 15,
    lineHeight: 22,
    color: BLACK,
  },
  input: {
    borderWidth: 1,
    borderColor: '#DDDDDD',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 15,
    color: BLACK,
    backgroundColor: '#FFFFFF',
  },
  textArea: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  inputError: {
    borderColor: RED,
  },
  errorText: {
    color: RED,
    fontSize: 12,
    marginTop: 4,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: Spacing.four,
    gap: 10,
  },
  cancelButton: {
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#CCCCCC',
  },
  cancelButtonPressed: {
    opacity: 0.5,
  },
  cancelButtonText: {
    color: BLACK,
    fontWeight: '700',
  },
  saveButton: {
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: BLACK,
  },
  saveButtonPressed: {
    opacity: 0.5,
  },
  saveButtonSaving: {
    opacity: 0.4,
  },
  saveButtonText: {
    color: BLACK,
    fontWeight: '700',
  },
  savedBanner: {
    marginTop: Spacing.three,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: BLACK,
  },
  savedBannerText: {
    color: BLACK,
    fontWeight: '700',
    fontSize: 14,
    textAlign: 'center',
  },
});
