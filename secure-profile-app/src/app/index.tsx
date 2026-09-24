import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import {
  getCurrentUser,
  loginUser,
} from '../services/authService';

import {
  deleteToken,
  getToken,
  saveToken,
} from '../storage/tokenStorage';

export default function HomeScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    restoreSession();
  }, []);

  const restoreSession = async () => {
    try {
      const token = await getToken();

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const userProfile = await getCurrentUser(token);
        setProfile(userProfile);
      } catch (err) {
        await deleteToken();
        setProfile(null);
      }
    } catch (err) {
      setProfile(null);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async () => {
    setError('');
    setLoading(true);

    try {
      const data = await loginUser(username, password);

      if (!data.accessToken) {
        throw new Error('Login failed. Check your username and password.');
      }

      await saveToken(data.accessToken);

      const userProfile = await getCurrentUser(data.accessToken);

      setProfile(userProfile);
    } catch (err) {
      setError('Login failed. Check your username and password.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await deleteToken();

    setProfile(null);
    setError('');
    setUsername('');
    setPassword('');
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <View style={styles.logoCircle}>
          <Text style={styles.logoText}>🔐</Text>
        </View>

        <Text style={styles.loadingTitle}>
          Secure Profile
        </Text>

        <ActivityIndicator
          size="small"
          color="#4F7CFF"
          style={styles.spinner}
        />

        <Text style={styles.loadingText}>
          Checking your session...
        </Text>
      </View>
    );
  }

  if (profile) {
    return (
      <View style={styles.profileContainer}>
        <ScrollView
          contentContainerStyle={styles.profileContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.profileHeader}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {profile.firstName?.charAt(0)}
                {profile.lastName?.charAt(0)}
              </Text>
            </View>

            <Text style={styles.profileTitle}>
              My Profile
            </Text>

            <Text style={styles.profileSubtitle}>
              Your account information
            </Text>
          </View>

          <View style={styles.profileCard}>
            <ProfileItem
              label="FULL NAME"
              value={`${profile.firstName} ${profile.lastName}`}
              icon="USER"
            />

            <ProfileItem
              label="USERNAME"
              value={profile.username}
              icon="ACCOUNT"
            />

            <ProfileItem
              label="EMAIL"
              value={profile.email}
              icon="EMAIL"
            />

            <ProfileItem
              label="USER ID"
              value={String(profile.id)}
              icon="ID"
              last
            />
          </View>

          <View style={styles.secureBadge}>
            <Text style={styles.secureIcon}>✓</Text>

            <Text style={styles.secureText}>
              Your session is securely stored
            </Text>
          </View>

          <TouchableOpacity
            style={styles.logoutButton}
            onPress={handleLogout}
            activeOpacity={0.8}
          >
            <Text style={styles.logoutText}>
              Log Out
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.loginContainer}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.loginContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.loginHeader}>
          <View style={styles.logoCircle}>
            <Text style={styles.logoText}>🔐</Text>
          </View>

          <Text style={styles.appTitle}>
            Secure Profile
          </Text>

          <Text style={styles.appSubtitle}>
            Sign in to access your profile
          </Text>
        </View>

        <View style={styles.loginCard}>
          <Text style={styles.formTitle}>
            Welcome back
          </Text>

          <Text style={styles.formSubtitle}>
            Enter your account details below
          </Text>

          <Text style={styles.label}>
            USERNAME
          </Text>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Enter username"
              placeholderTextColor="#9AA4B2"
              value={username}
              onChangeText={setUsername}
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>

          <Text style={styles.label}>
            PASSWORD
          </Text>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Enter password"
              placeholderTextColor="#9AA4B2"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>

          {error !== '' && (
            <View style={styles.errorBox}>
              <Text style={styles.errorIcon}>!</Text>

              <Text style={styles.errorText}>
                {error}
              </Text>
            </View>
          )}

          <TouchableOpacity
            style={styles.loginButton}
            onPress={handleLogin}
            disabled={loading}
            activeOpacity={0.8}
          >
            <Text style={styles.loginButtonText}>
              Sign In
            </Text>
          </TouchableOpacity>

          <View style={styles.securityNote}>
            <Text style={styles.securityIcon}>
              🛡️
            </Text>

            <Text style={styles.securityText}>
              Your session is protected with secure storage.
            </Text>
          </View>
        </View>

        <Text style={styles.footerText}>
          Secure Profile App • CCE106
        </Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

function ProfileItem({
  label,
  value,
  icon,
  last = false,
}: {
  label: string;
  value: string;
  icon: string;
  last?: boolean;
}) {
  return (
    <View
      style={[
        styles.profileItem,
        !last && styles.profileItemBorder,
      ]}
    >
      <View style={styles.profileIcon}>
        <Text style={styles.profileIconText}>
          {icon}
        </Text>
      </View>

      <View style={styles.profileInfo}>
        <Text style={styles.profileLabel}>
          {label}
        </Text>

        <Text style={styles.profileValue}>
          {value}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    backgroundColor: '#0B1220',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },

  loadingTitle: {
    color: '#FFFFFF',
    fontSize: 25,
    fontWeight: '700',
    marginTop: 18,
  },

  spinner: {
    marginTop: 25,
  },

  loadingText: {
    color: '#9AA4B2',
    marginTop: 12,
    fontSize: 14,
  },

  loginContainer: {
    flex: 1,
    backgroundColor: '#0B1220',
  },

  loginContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 24,
  },

  loginHeader: {
    alignItems: 'center',
    marginBottom: 28,
  },

  logoCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#17233A',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#263957',
  },

  logoText: {
    fontSize: 32,
  },

  appTitle: {
    color: '#FFFFFF',
    fontSize: 30,
    fontWeight: '800',
    marginTop: 18,
  },

  appSubtitle: {
    color: '#9AA4B2',
    fontSize: 15,
    marginTop: 7,
  },

  loginCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 24,
  },

  formTitle: {
    color: '#111827',
    fontSize: 22,
    fontWeight: '800',
  },

  formSubtitle: {
    color: '#7A8494',
    fontSize: 14,
    marginTop: 5,
    marginBottom: 25,
  },

  label: {
    color: '#596579',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1,
    marginBottom: 8,
  },

  inputContainer: {
    height: 54,
    borderWidth: 1,
    borderColor: '#E1E6ED',
    borderRadius: 13,
    justifyContent: 'center',
    paddingHorizontal: 15,
    marginBottom: 18,
    backgroundColor: '#F9FAFC',
  },

  input: {
    color: '#111827',
    fontSize: 15,
  },

  errorBox: {
    backgroundColor: '#FFF1F1',
    borderWidth: 1,
    borderColor: '#FFD4D4',
    borderRadius: 12,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
  },

  errorIcon: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#EF4444',
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 22,
    fontWeight: '800',
    marginRight: 10,
  },

  errorText: {
    flex: 1,
    color: '#C62828',
    fontSize: 13,
  },

  loginButton: {
    height: 54,
    backgroundColor: '#4F7CFF',
    borderRadius: 13,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
  },

  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },

  securityNote: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },

  securityIcon: {
    fontSize: 14,
    marginRight: 7,
  },

  securityText: {
    color: '#8A94A3',
    fontSize: 11,
  },

  footerText: {
    color: '#667085',
    textAlign: 'center',
    fontSize: 11,
    marginTop: 22,
  },

  profileContainer: {
    flex: 1,
    backgroundColor: '#0B1220',
  },

  profileContent: {
    flexGrow: 1,
    padding: 24,
    justifyContent: 'center',
  },

  profileHeader: {
    alignItems: 'center',
    marginBottom: 28,
  },

  avatar: {
    width: 82,
    height: 82,
    borderRadius: 41,
    backgroundColor: '#4F7CFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },

  avatarText: {
    color: '#FFFFFF',
    fontSize: 25,
    fontWeight: '800',
  },

  profileTitle: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '800',
  },

  profileSubtitle: {
    color: '#9AA4B2',
    fontSize: 14,
    marginTop: 5,
  },

  profileCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    paddingHorizontal: 18,
    paddingVertical: 5,
  },

  profileItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 17,
  },

  profileItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#EDF0F4',
  },

  profileIcon: {
    width: 55,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#F1F4FA',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 13,
  },

  profileIconText: {
    color: '#596579',
    fontSize: 9,
    fontWeight: '700',
  },

  profileInfo: {
    flex: 1,
  },

  profileLabel: {
    color: '#8A94A3',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.8,
    marginBottom: 4,
  },

  profileValue: {
    color: '#182230',
    fontSize: 15,
    fontWeight: '600',
  },

  secureBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 18,
  },

  secureIcon: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#DDF7E8',
    color: '#159447',
    textAlign: 'center',
    lineHeight: 20,
    fontWeight: '800',
    marginRight: 8,
  },

  secureText: {
    color: '#9AA4B2',
    fontSize: 12,
  },

  logoutButton: {
    height: 52,
    borderRadius: 13,
    borderWidth: 1,
    borderColor: '#344158',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },

  logoutText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
});