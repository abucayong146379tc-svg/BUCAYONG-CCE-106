import React from 'react';
import { StyleSheet, ScrollView, View, Image, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';

const ORANGE = '#F27438';
const PEACH = '#F7DFD4';
const BLACK = '#1A1A1A';

export default function AboutMeScreen() {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} bounces={false}>
        
        <View style={styles.topSection}>
          <SafeAreaView edges={['top', 'left', 'right']} style={styles.safeAreaTop}>
            <Image 
              source={require('@/assets/images/xc.jpg')} 
              style={styles.avatar} 
            />
            <Text style={styles.name}>Allen Joseph M. Bucayong</Text>
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
                Hi! I'm Allen Joseph M. Bucayong, a 20-year-old BSIT student at the University of Mindanao Tagum, under the Department of Computing Education (DCE). I’m originally from Kapalong, Maniki, Davao del Norte, and I’m currently staying in Tagum City while pursuing my studies.
              </Text>
              
              <Text style={styles.paragraph}>
                I'm someone who enjoys both technology and music. I love playing different musical instruments, including the piano, drums, bass, and guitar. I also enjoy singing and performing at various events and gigs. Performing gives me a chance to share my passion for music while also earning an extra income.
              </Text>
              
              <Text style={styles.paragraph}>
                When I'm not studying or making music, I enjoy playing online games, eating good food, and getting plenty of sleep. I believe that having time for the things you enjoy is important while working toward your goals.
              </Text>
              
              <Text style={styles.paragraph}>
                As an IT student, I'm continuously learning and developing new skills. My goal is to combine my interest in technology and creativity to build something meaningful and useful in the future.
              </Text>
              
              <Text style={styles.paragraph}>
                Thanks for visiting my website!
              </Text>
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
});
