import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Switch, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';

export default function PrivacyScreen() {
  const [dataCollection, setDataCollection] = useState(true);
  const [analytics, setAnalytics] = useState(false);
  const [crashReports, setCrashReports] = useState(true);
  const [personalizedAds, setPersonalizedAds] = useState(false);

  const handleDataExport = () => {
    Alert.alert(
      'Export Data',
      'Your data will be prepared and sent to your email address within 24 hours.',
      [{ text: 'OK' }]
    );
  };

  const handleDeleteData = () => {
    Alert.alert(
      'Delete All Data',
      'This action cannot be undone. All your challenge progress, habits, and personal data will be permanently deleted.',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive',
          onPress: () => {
            Alert.alert('Data Deleted', 'All your data has been permanently deleted.');
          }
        }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={Colors.light.text} />
        </TouchableOpacity>
        <ThemedText type="title" style={styles.headerTitle}>
          Privacy
        </ThemedText>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Data Collection */}
        <ThemedView style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Data Collection</ThemedText>
          
          <View style={styles.settingItem}>
            <View style={styles.settingContent}>
              <Ionicons name="server-outline" size={20} color={Colors.light.icon} />
              <View style={styles.settingTextContainer}>
                <ThemedText style={styles.settingText}>Usage Data Collection</ThemedText>
                <ThemedText style={styles.settingDescription}>
                  Allow collection of app usage data to improve experience
                </ThemedText>
              </View>
            </View>
            <Switch
              disabled
              value={dataCollection}
              onValueChange={setDataCollection}
              trackColor={{ false: '#e0e0e0', true: Colors.light.tint }}
              thumbColor={dataCollection ? 'white' : '#f4f3f4'}
            />
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingContent}>
              <Ionicons name="analytics-outline" size={20} color={Colors.light.icon} />
              <View style={styles.settingTextContainer}>
                <ThemedText style={styles.settingText}>Analytics</ThemedText>
                <ThemedText style={styles.settingDescription}>
                  Help us understand how you use the app
                </ThemedText>
              </View>
            </View>
            <Switch
              disabled
              value={analytics}
              onValueChange={setAnalytics}
              trackColor={{ false: '#e0e0e0', true: Colors.light.tint }}
              thumbColor={analytics ? 'white' : '#f4f3f4'}
            />
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingContent}>
              <Ionicons name="bug-outline" size={20} color={Colors.light.icon} />
              <View style={styles.settingTextContainer}>
                <ThemedText style={styles.settingText}>Crash Reports</ThemedText>
                <ThemedText style={styles.settingDescription}>
                  Automatically send crash reports to help fix bugs
                </ThemedText>
              </View>
            </View>
            <Switch
              disabled
              value={crashReports}
              onValueChange={setCrashReports}
              trackColor={{ false: '#e0e0e0', true: Colors.light.tint }}
              thumbColor={crashReports ? 'white' : '#f4f3f4'}
            />
          </View>
        </ThemedView>

        {/* Advertising */}
        <ThemedView style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Advertising</ThemedText>
          
          <View style={styles.settingItem}>
            <View style={styles.settingContent}>
              <Ionicons name="megaphone-outline" size={20} color={Colors.light.icon} />
              <View style={styles.settingTextContainer}>
                <ThemedText style={styles.settingText}>Personalized Ads</ThemedText>
                <ThemedText style={styles.settingDescription}>
                  Show ads based on your interests and usage
                </ThemedText>
              </View>
            </View>
            <Switch
              disabled
              value={personalizedAds}
              onValueChange={setPersonalizedAds}
              trackColor={{ false: '#e0e0e0', true: Colors.light.tint }}
              thumbColor={personalizedAds ? 'white' : '#f4f3f4'}
            />
          </View>

          <TouchableOpacity disabled style={styles.settingItem}>
            <View style={styles.settingContent}>
              <Ionicons name="shield-outline" size={20} color={Colors.light.icon} />
              <View style={styles.settingTextContainer}>
                <ThemedText style={styles.settingText}>Ad Tracking</ThemedText>
                <ThemedText style={styles.settingDescription}>
                  Manage ad tracking preferences
                </ThemedText>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={20} color={Colors.light.icon} />
          </TouchableOpacity>
        </ThemedView>

        {/* Data Management */}
        <ThemedView style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Data Management</ThemedText>
          
          <TouchableOpacity disabled style={styles.settingItem} onPress={handleDataExport}>
            <View style={styles.settingContent}>
              <Ionicons name="download-outline" size={20} color={Colors.light.icon} />
              <View style={styles.settingTextContainer}>
                <ThemedText style={styles.settingText}>Export My Data</ThemedText>
                <ThemedText style={styles.settingDescription}>
                  Download a copy of your data
                </ThemedText>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={20} color={Colors.light.icon} />
          </TouchableOpacity>

          <TouchableOpacity disabled style={styles.settingItem} onPress={handleDeleteData}>
            <View style={styles.settingContent}>
              <Ionicons name="trash-outline" size={20} color="#ff4757" />
              <View style={styles.settingTextContainer}>
                <ThemedText style={[styles.settingText, { color: '#ff4757' }]}>Delete All Data</ThemedText>
                <ThemedText style={styles.settingDescription}>
                  Permanently delete all your data
                </ThemedText>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#ff4757" />
          </TouchableOpacity>
        </ThemedView>

        {/* Legal */}
        <ThemedView style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Legal</ThemedText>
          
          <TouchableOpacity disabled style={styles.settingItem}>
            <View style={styles.settingContent}>
              <Ionicons name="document-text-outline" size={20} color={Colors.light.icon} />
              <View style={styles.settingTextContainer}>
                <ThemedText style={styles.settingText}>Privacy Policy</ThemedText>
                <ThemedText style={styles.settingDescription}>
                  Read our privacy policy
                </ThemedText>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={20} color={Colors.light.icon} />
          </TouchableOpacity>

          <TouchableOpacity disabled style={styles.settingItem}>
            <View style={styles.settingContent}>
              <Ionicons name="document-outline" size={20} color={Colors.light.icon} />
              <View style={styles.settingTextContainer}>
                <ThemedText style={styles.settingText}>Terms of Service</ThemedText>
                <ThemedText style={styles.settingDescription}>
                  Read our terms of service
                </ThemedText>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={20} color={Colors.light.icon} />
          </TouchableOpacity>

          <TouchableOpacity disabled style={styles.settingItem}>
            <View style={styles.settingContent}>
              <Ionicons name="help-circle-outline" size={20} color={Colors.light.icon} />
              <View style={styles.settingTextContainer}>
                <ThemedText style={styles.settingText}>Data Usage</ThemedText>
                <ThemedText style={styles.settingDescription}>
                  Learn how we use your data
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
    opacity: 0.5,
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
