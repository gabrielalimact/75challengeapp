import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, Switch, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';

export default function NotificationsScreen() {
  const [pushNotifications, setPushNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(false);
  const [challengeReminders, setChallengeReminders] = useState(true);
  const [habitReminders, setHabitReminders] = useState(true);
  const [weeklyReports, setWeeklyReports] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [vibrationEnabled, setVibrationEnabled] = useState(true);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={Colors.light.text} />
        </TouchableOpacity>
        <ThemedText type="title" style={styles.headerTitle}>
          Notifications
        </ThemedText>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* General Settings */}
        <ThemedView style={styles.section}>
          <ThemedText style={styles.sectionTitle}>General</ThemedText>
          
          <View style={styles.settingItem}>
            <View style={styles.settingContent}>
              <Ionicons name="notifications-outline" size={20} color={Colors.light.icon} />
              <View style={styles.settingTextContainer}>
                <ThemedText style={styles.settingText}>Push Notifications</ThemedText>
                <ThemedText style={styles.settingDescription}>
                  Receive notifications on your device
                </ThemedText>
              </View>
            </View>
            <Switch
              value={pushNotifications}
              onValueChange={setPushNotifications}
              trackColor={{ false: '#e0e0e0', true: Colors.light.tint }}
              thumbColor={pushNotifications ? 'white' : '#f4f3f4'}
            />
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingContent}>
              <Ionicons name="mail-outline" size={20} color={Colors.light.icon} />
              <View style={styles.settingTextContainer}>
                <ThemedText style={styles.settingText}>Email Notifications</ThemedText>
                <ThemedText style={styles.settingDescription}>
                  Receive updates via email
                </ThemedText>
              </View>
            </View>
            <Switch
              value={emailNotifications}
              onValueChange={setEmailNotifications}
              trackColor={{ false: '#e0e0e0', true: Colors.light.tint }}
              thumbColor={emailNotifications ? 'white' : '#f4f3f4'}
            />
          </View>
        </ThemedView>

        {/* Challenge & Habits */}
        <ThemedView style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Challenge & Habits</ThemedText>
          
          <View style={styles.settingItem}>
            <View style={styles.settingContent}>
              <Ionicons name="trophy-outline" size={20} color={Colors.light.icon} />
              <View style={styles.settingTextContainer}>
                <ThemedText style={styles.settingText}>Challenge Reminders</ThemedText>
                <ThemedText style={styles.settingDescription}>
                  Daily reminders about your challenge progress
                </ThemedText>
              </View>
            </View>
            <Switch
              value={challengeReminders}
              onValueChange={setChallengeReminders}
              trackColor={{ false: '#e0e0e0', true: Colors.light.tint }}
              thumbColor={challengeReminders ? 'white' : '#f4f3f4'}
            />
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingContent}>
              <Ionicons name="checkmark-circle-outline" size={20} color={Colors.light.icon} />
              <View style={styles.settingTextContainer}>
                <ThemedText style={styles.settingText}>Habit Reminders</ThemedText>
                <ThemedText style={styles.settingDescription}>
                  Reminders to complete your daily habits
                </ThemedText>
              </View>
            </View>
            <Switch
              value={habitReminders}
              onValueChange={setHabitReminders}
              trackColor={{ false: '#e0e0e0', true: Colors.light.tint }}
              thumbColor={habitReminders ? 'white' : '#f4f3f4'}
            />
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingContent}>
              <Ionicons name="bar-chart-outline" size={20} color={Colors.light.icon} />
              <View style={styles.settingTextContainer}>
                <ThemedText style={styles.settingText}>Weekly Reports</ThemedText>
                <ThemedText style={styles.settingDescription}>
                  Weekly progress summary and insights
                </ThemedText>
              </View>
            </View>
            <Switch
              value={weeklyReports}
              onValueChange={setWeeklyReports}
              trackColor={{ false: '#e0e0e0', true: Colors.light.tint }}
              thumbColor={weeklyReports ? 'white' : '#f4f3f4'}
            />
          </View>
        </ThemedView>

        {/* Notification Style */}
        <ThemedView style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Notification Style</ThemedText>
          
          <View style={styles.settingItem}>
            <View style={styles.settingContent}>
              <Ionicons name="volume-high-outline" size={20} color={Colors.light.icon} />
              <View style={styles.settingTextContainer}>
                <ThemedText style={styles.settingText}>Sound</ThemedText>
                <ThemedText style={styles.settingDescription}>
                  Play sound with notifications
                </ThemedText>
              </View>
            </View>
            <Switch
              value={soundEnabled}
              onValueChange={setSoundEnabled}
              trackColor={{ false: '#e0e0e0', true: Colors.light.tint }}
              thumbColor={soundEnabled ? 'white' : '#f4f3f4'}
            />
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingContent}>
              <Ionicons name="phone-portrait-outline" size={20} color={Colors.light.icon} />
              <View style={styles.settingTextContainer}>
                <ThemedText style={styles.settingText}>Vibration</ThemedText>
                <ThemedText style={styles.settingDescription}>
                  Vibrate when receiving notifications
                </ThemedText>
              </View>
            </View>
            <Switch
              value={vibrationEnabled}
              onValueChange={setVibrationEnabled}
              trackColor={{ false: '#e0e0e0', true: Colors.light.tint }}
              thumbColor={vibrationEnabled ? 'white' : '#f4f3f4'}
            />
          </View>
        </ThemedView>

        {/* Quiet Hours */}
        <ThemedView style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Quiet Hours</ThemedText>
          
          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingContent}>
              <Ionicons name="moon-outline" size={20} color={Colors.light.icon} />
              <View style={styles.settingTextContainer}>
                <ThemedText style={styles.settingText}>Do Not Disturb</ThemedText>
                <ThemedText style={styles.settingDescription}>
                  Set quiet hours (10:00 PM - 8:00 AM)
                </ThemedText>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={20} color={Colors.light.icon} />
          </TouchableOpacity>
        </ThemedView>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  placeholder: {
    width: 24,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  section: {
    paddingVertical: 20,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    color: '#333',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  settingContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 12,
  },
  settingTextContainer: {
    flex: 1,
  },
  settingText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 2,
  },
  settingDescription: {
    fontSize: 13,
    color: '#666',
    lineHeight: 18,
  },
});
