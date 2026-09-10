import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity, Image, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const THEME = {
  colors: {
    background: '#F4F7FA',
    surface: '#FFFFFF',
    primary: '#4338CA',
    primaryLight: '#EEF2FF',
    text: '#1F2937',
    textMuted: '#6B7280',
    success: '#10B981',
    successLight: '#D1FAE5',
    danger: '#EF4444',
    border: '#E5E7EB',
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  borderRadius: {
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
  }
};

const MetricCard = ({ title, value, icon, trend, trendPositive, fullWidth = false }) => (
  <View style={[styles.card, fullWidth ? styles.cardFull : styles.cardHalf]}>
    <View style={styles.cardHeader}>
      <View style={styles.iconContainer}>
        <Ionicons name={icon} size={20} color={THEME.colors.primary} />
      </View>
      <View style={[styles.trendBadge, { backgroundColor: trendPositive ? THEME.colors.successLight : '#FEE2E2' }]}>
        <Ionicons name={trendPositive ? 'arrow-up' : 'arrow-down'} size={12} color={trendPositive ? THEME.colors.success : THEME.colors.danger} />
        <Text style={[styles.trendText, { color: trendPositive ? THEME.colors.success : THEME.colors.danger }]}>{trend}</Text>
      </View>
    </View>
    <View style={styles.cardBody}>
      <Text style={styles.cardValue}>{value}</Text>
      <Text style={styles.cardTitle}>{title}</Text>
    </View>
  </View>
);

const ActivityItem = ({ title, subtitle, amount, icon, isPositive }) => (
  <View style={styles.activityItem}>
    <View style={styles.activityIconWrapper}>
      <Ionicons name={icon} size={20} color={THEME.colors.textMuted} />
    </View>
    <View style={styles.activityDetails}>
      <Text style={styles.activityTitle}>{title}</Text>
      <Text style={styles.activitySubtitle}>{subtitle}</Text>
    </View>
    <Text style={[styles.activityAmount, { color: isPositive ? THEME.colors.success : THEME.colors.text }]}>
      {isPositive ? '+' : ''}{amount}
    </Text>
  </View>
);

export default function App() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Good morning,</Text>
            <Text style={styles.headerTitle}>Allen Gwapo</Text>
          </View>
          <TouchableOpacity style={styles.profileAction} activeOpacity={0.8}>
            <Image 
              source={{ uri: 'https://i.pravatar.cc/150?img=11' }} 
              style={styles.profileImage}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.metricsContainer}>
          <MetricCard 
            title="Total Revenue" 
            value="$45,231.89" 
            icon="wallet" 
            trend="20.1%" 
            trendPositive={true} 
            fullWidth={true} 
          />
          <View style={styles.metricsRow}>
            <MetricCard 
              title="Active Users" 
              value="2,314" 
              icon="people" 
              trend="5.2%" 
              trendPositive={true} 
            />
            <MetricCard 
              title="Bounce Rate" 
              value="42%" 
              icon="stats-chart" 
              trend="1.4%" 
              trendPositive={false} 
            />
          </View>
        </View>

        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Activity</Text>
            <TouchableOpacity activeOpacity={0.6}>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.activityList}>
            <ActivityItem 
              title="Stripe Payout" 
              subtitle="Today, 9:41 AM" 
              amount="$3,400.00" 
              icon="logo-usd" 
              isPositive={true}
            />
            <ActivityItem 
              title="AWS Hosting" 
              subtitle="Yesterday, 2:15 PM" 
              amount="-$124.50" 
              icon="cloud" 
              isPositive={false}
            />
            <ActivityItem 
              title="Figma Subscription" 
              subtitle="Oct 24, 10:00 AM" 
              amount="-$45.00" 
              icon="color-palette" 
              isPositive={false}
            />
            <ActivityItem 
              title="Client Retainer" 
              subtitle="Oct 20, 11:30 AM" 
              amount="$5,000.00" 
              icon="briefcase" 
              isPositive={true}
            />
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: THEME.colors.background,
  },
  scrollContent: {
    padding: THEME.spacing.lg,
    paddingTop: Platform.OS === 'android' ? THEME.spacing.xl + 20 : THEME.spacing.xl,
    paddingBottom: THEME.spacing.xl * 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: THEME.spacing.xl,
  },
  greeting: {
    fontSize: 14,
    color: THEME.colors.textMuted,
    marginBottom: 4,
    fontWeight: '500',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: THEME.colors.text,
  },
  profileAction: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  profileImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: THEME.colors.surface,
  },
  metricsContainer: {
    gap: THEME.spacing.md,
    marginBottom: THEME.spacing.xl,
  },
  metricsRow: {
    flexDirection: 'row',
    gap: THEME.spacing.md,
  },
  card: {
    backgroundColor: THEME.colors.surface,
    borderRadius: THEME.borderRadius.lg,
    padding: THEME.spacing.lg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 2,
  },
  cardFull: {
    width: '100%',
  },
  cardHalf: {
    flex: 1,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: THEME.spacing.lg,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: THEME.borderRadius.md,
    backgroundColor: THEME.colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  trendBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: THEME.borderRadius.sm,
    gap: 2,
  },
  trendText: {
    fontSize: 12,
    fontWeight: '600',
  },
  cardBody: {
    gap: 4,
  },
  cardValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: THEME.colors.text,
  },
  cardTitle: {
    fontSize: 14,
    color: THEME.colors.textMuted,
    fontWeight: '500',
  },
  sectionContainer: {
    flex: 1,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: THEME.spacing.md,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: THEME.colors.text,
  },
  seeAllText: {
    fontSize: 14,
    color: THEME.colors.primary,
    fontWeight: '600',
  },
  activityList: {
    backgroundColor: THEME.colors.surface,
    borderRadius: THEME.borderRadius.lg,
    padding: THEME.spacing.lg,
    gap: THEME.spacing.lg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 2,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: THEME.spacing.md,
  },
  activityIconWrapper: {
    width: 40,
    height: 40,
    borderRadius: THEME.borderRadius.md,
    backgroundColor: THEME.colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: THEME.colors.border,
  },
  activityDetails: {
    flex: 1,
    gap: 2,
  },
  activityTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: THEME.colors.text,
  },
  activitySubtitle: {
    fontSize: 13,
    color: THEME.colors.textMuted,
  },
  activityAmount: {
    fontSize: 15,
    fontWeight: 'bold',
  },
});
