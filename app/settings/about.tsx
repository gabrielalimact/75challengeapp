import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Alert, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';

export default function AboutScreen() {
  const appVersion = '1.0.0';
  const buildNumber = '1';

  const handleRateApp = () => {
    Alert.alert(
      'Rate App',
      'Thank you for using 75 Challenge App! Please rate us on the App Store.',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Rate Now', 
          onPress: () => {
            Alert.alert('Opening App Store...', 'This would open the App Store rating page.');
          }
        }
      ]
    );
  };

  const handleShareApp = () => {
    Alert.alert(
      'Share App',
      'Share 75 Challenge App with your friends!',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Share', 
          onPress: () => {
            Alert.alert('Sharing...', 'This would open the share sheet.');
          }
        }
      ]
    );
  };

  // const handleContactSupport = () => {
  //   const email = 'support@75challengeapp.com';
  //   const subject = '75 Challenge App - Support Request';
  //   const url = `mailto:${email}?subject=${encodeURIComponent(subject)}`;
    
  //   Linking.openURL(url).catch(() => {
  //     Alert.alert('Error', 'Could not open email client. Please email us at support@75challengeapp.com');
  //   });
  // };

  // const handleWebsite = () => {
  //   const url = 'https://75challengeapp.com';
  //   Linking.openURL(url).catch(() => {
  //     Alert.alert('Error', 'Could not open website.');
  //   });
  // };

  // const handlePrivacyPolicy = () => {
  //   const url = 'https://75challengeapp.com/privacy';
  //   Linking.openURL(url).catch(() => {
  //     Alert.alert('Error', 'Could not open privacy policy.');
  //   });
  // };

  // const handleTermsOfService = () => {
  //   const url = 'https://75challengeapp.com/terms';
  //   Linking.openURL(url).catch(() => {
  //     Alert.alert('Error', 'Could not open terms of service.');
  //   });
  // };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={Colors.light.text} />
        </TouchableOpacity>
        <ThemedText type="title" style={styles.headerTitle}>
          About
        </ThemedText>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <ThemedView style={styles.appInfoSection}>
          <View style={styles.appIcon}>
            <Ionicons name="fitness" size={40} color={Colors.light.tint} />
          </View>
          <ThemedText style={styles.appName}>75 Challenge App</ThemedText>
          <ThemedText style={styles.appDescription}>
            Transform your life in 75 days with the ultimate challenge tracking app
          </ThemedText>
          <ThemedText style={styles.version}>
            Version {appVersion} (Build {buildNumber})
          </ThemedText>
        </ThemedView>

        <ThemedView style={styles.section}>
          <TouchableOpacity style={styles.settingItem} onPress={handleRateApp}>
            <View style={styles.settingContent}>
              <Ionicons name="star-outline" size={20} color={Colors.light.icon} />
              <ThemedText style={styles.settingText}>Rate App</ThemedText>
            </View>
            <Ionicons name="chevron-forward" size={20} color={Colors.light.icon} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem} onPress={handleShareApp}>
            <View style={styles.settingContent}>
              <Ionicons name="share-outline" size={20} color={Colors.light.icon} />
              <ThemedText style={styles.settingText}>Share App</ThemedText>
            </View>
            <Ionicons name="chevron-forward" size={20} color={Colors.light.icon} />
          </TouchableOpacity>

          <TouchableOpacity style={[styles.settingItem, {opacity: 0.3}]} disabled>
            <View style={styles.settingContent}>
              <Ionicons name="globe-outline" size={20} color={Colors.light.icon} />
              <ThemedText style={styles.settingText}>Visit Website</ThemedText>
            </View>
            <Ionicons name="chevron-forward" size={20} color={Colors.light.icon} />
          </TouchableOpacity>
        </ThemedView>

        <ThemedView style={[styles.section, {opacity: 0.3}]}>
          <ThemedText style={styles.sectionTitle}>Support</ThemedText>
          
          <TouchableOpacity style={styles.settingItem} disabled>
            <View style={styles.settingContent}>
              <Ionicons name="mail-outline" size={20} color={Colors.light.icon} />
              <ThemedText style={styles.settingText}>Contact Support</ThemedText>
            </View>
            <Ionicons name="chevron-forward" size={20} color={Colors.light.icon} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem} disabled>
            <View style={styles.settingContent}>
              <Ionicons name="help-circle-outline" size={20} color={Colors.light.icon} />
              <ThemedText style={styles.settingText}>FAQ</ThemedText>
            </View>
            <Ionicons name="chevron-forward" size={20} color={Colors.light.icon} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem} disabled>
            <View style={styles.settingContent}>
              <Ionicons name="chatbubble-outline" size={20} color={Colors.light.icon} />
              <ThemedText style={styles.settingText}>Community</ThemedText>
            </View>
            <Ionicons name="chevron-forward" size={20} color={Colors.light.icon} />
          </TouchableOpacity>
        </ThemedView>

        <ThemedView style={[styles.section, {opacity: 0.3}]}>
          <ThemedText style={styles.sectionTitle}>Legal</ThemedText>
          
          <TouchableOpacity style={styles.settingItem} disabled>
            <View style={styles.settingContent}>
              <Ionicons name="document-text-outline" size={20} color={Colors.light.icon} />
              <ThemedText style={styles.settingText}>Privacy Policy</ThemedText>
            </View>
            <Ionicons name="chevron-forward" size={20} color={Colors.light.icon} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem} disabled>
            <View style={styles.settingContent}>
              <Ionicons name="document-outline" size={20} color={Colors.light.icon} />
              <ThemedText style={styles.settingText}>Terms of Service</ThemedText>
            </View>
            <Ionicons name="chevron-forward" size={20} color={Colors.light.icon} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem} disabled>
            <View style={styles.settingContent}>
              <Ionicons name="shield-checkmark-outline" size={20} color={Colors.light.icon} />
              <ThemedText style={styles.settingText}>Licenses</ThemedText>
            </View>
            <Ionicons name="chevron-forward" size={20} color={Colors.light.icon} />
          </TouchableOpacity>
        </ThemedView>

        <ThemedView style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Development</ThemedText>
          
          <View style={styles.settingItem}>
            <View style={styles.settingContent}>
              <Ionicons name="code-outline" size={20} color={Colors.light.icon} />
              <ThemedText style={styles.settingText}>React Native</ThemedText>
            </View>
            <ThemedText style={styles.versionText}>0.74.x</ThemedText>
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingContent}>
              <Ionicons name="logo-react" size={20} color={Colors.light.icon} />
              <ThemedText style={styles.settingText}>Expo</ThemedText>
            </View>
            <ThemedText style={styles.versionText}>51.x</ThemedText>
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingContent}>
              <Ionicons name="build-outline" size={20} color={Colors.light.icon} />
              <ThemedText style={styles.settingText}>Build Date</ThemedText>
            </View>
            <ThemedText style={styles.versionText}>Dec 2024</ThemedText>
          </View>
        </ThemedView>

        {/* Copyright */}
        <View style={styles.copyright}>
          <ThemedText style={styles.copyrightText}>
            © 2025 | 75 Challenge App. All rights reserved.
          </ThemedText>
          <ThemedText style={styles.copyrightText}>
            Made by Gabriela Cena with ❤️ for your transformation journey
          </ThemedText>
        </View>
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
  appInfoSection: {
    alignItems: 'center',
    marginBottom: 20,
  },
  appIcon: {
    width: 80,
    height: 80,
    borderRadius: 20,
    backgroundColor: '#f8f8f8',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  appName: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 8,
    color: '#333',
  },
  appDescription: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
    marginBottom: 12,
    lineHeight: 22,
    paddingHorizontal: 20,
  },
  version: {
    fontSize: 14,
    color: '#999',
  },
  section: {
    marginVertical: 10,
    gap: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  settingContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 12,
  },
  settingText: {
    fontSize: 16,
    color: '#333',
  },
  versionText: {
    fontSize: 14,
    color: '#666',
  },
  copyright: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  copyrightText: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
    lineHeight: 18,
  },
});
