import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { useChallenge } from '@/contexts/ChallengeContext';
import { useUser } from '@/contexts/UserContext';
import { selectImageSource } from '@/utils';
import { SafeAreaView } from 'react-native-safe-area-context';
const calculateConsecutiveDays = (completedDays: number[], currentDay: number): number => {
  if (completedDays.length === 0 || currentDay === 0) return 0;
  
  let consecutive = 0;
  for (let i = currentDay; i >= 1; i--) {
    if (completedDays.includes(i)) {
      consecutive++;
    } else {
      break;
    }
  }
  return consecutive;
};

const ProfileHeader = () => {
  const { user, updateProfileImage } = useUser();
  
  const selectImage = () => {
    selectImageSource((uri: string) => {
      updateProfileImage(uri);
    });
  };
  
  return (
    <SafeAreaView style={styles.profileHeader}>
      <TouchableOpacity onPress={selectImage} style={styles.profileImageContainer}>
        <Image
          source={user.profileImage ? { uri: user.profileImage } : require('@/assets/images/avatar.jpg')}
          style={styles.profileImage}
        />
        <View style={styles.editImageIcon}>
          <Ionicons name="camera" size={16} color="#fff" />
        </View>
      </TouchableOpacity>
      <View>
        <ThemedText 
          type="title" 
          style={styles.userName}>
          {user.name}
        </ThemedText>
        <ThemedText
          style={styles.userEmail}>
          {user.email}
        </ThemedText>
      </View>
    </SafeAreaView>
  );
};

const ChallengeProgressCard = () => {
  const { challengeData, getCurrentDay, getDaysRemaining } = useChallenge();
  
  const currentDay = getCurrentDay();
  const totalDays = challengeData.challengeDays;
  const remainingDays = getDaysRemaining();
  const completedDaysCount = challengeData.completedDays.length;
  
  const consecutiveDays = calculateConsecutiveDays(challengeData.completedDays, currentDay);
  const failedDays = Math.max(0, currentDay - completedDaysCount);
  const completionRate = currentDay > 0 ? Math.round((completedDaysCount / currentDay) * 100) : 0;
  
  if (!challengeData.isActive) {
    return null;
  }
  
  return (
    <ThemedView style={styles.challengeCard}>
      <ThemedText type="subtitle" style={styles.challengeTitle}>
        75 Challenge Progress
      </ThemedText>
      
      <View style={styles.progressGrid}>
        <View style={styles.progressItem}>
          <ThemedText type="title" style={styles.progressNumber}>
            {completedDaysCount}
          </ThemedText>
          <ThemedText style={styles.progressLabel}>
            Days Completed
          </ThemedText>
        </View>
        
        <View style={styles.progressItem}>
          <ThemedText type="title" style={styles.progressNumber}>
            {consecutiveDays}
          </ThemedText>
          <ThemedText style={styles.progressLabel}>
            Current Streak
          </ThemedText>
        </View>
        
        <View style={styles.progressItem}>
          <ThemedText type="title" style={[styles.progressNumber, styles.failedNumber]}>
            {failedDays}
          </ThemedText>
          <ThemedText style={styles.progressLabel}>
            Days Failed
          </ThemedText>
        </View>
        
        <View style={styles.progressItem}>
          <ThemedText type="title" style={styles.progressNumber}>
            {remainingDays}
          </ThemedText>
          <ThemedText style={styles.progressLabel}>
            Days Remaining
          </ThemedText>
        </View>
      </View>
      
      <View style={styles.progressBarContainer}>
        <View style={styles.progressBar}>
          <View 
            style={[
              styles.progressFill, 
              { width: `${(currentDay / totalDays) * 100}%` }
            ]} 
          />
        </View>
        <ThemedText style={styles.progressText}>
          Day {currentDay} of {totalDays} ({completionRate}% success rate)
        </ThemedText>
      </View>
    </ThemedView>
  );
};

export default function ProfileScreen() {  
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#fff', dark: '#353636' }}
      headerImage={<ProfileHeader />}>
      <View style={styles.contentContainer}>
        <ChallengeProgressCard />
        <View style={styles.infoSection}>
        <ThemedText type="subtitle">
          Settings
        </ThemedText>
        
        <TouchableOpacity 
          style={styles.settingItem}
          onPress={() => router.push('/settings/edit-profile' as any)}
        >
          <View style={styles.settingContent}>
            <Ionicons name="person-outline" size={20} color={Colors.light.icon} />
            <ThemedText style={styles.settingText}>Edit Profile</ThemedText>
          </View>
          <Ionicons name="chevron-forward" size={20} color={Colors.light.icon} />
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.settingItem}
          onPress={() => router.push('/settings/notifications' as any)}
        >
          <View style={styles.settingContent}>
            <Ionicons name="notifications-outline" size={20} color={Colors.light.icon} />
            <ThemedText style={styles.settingText}>Notifications</ThemedText>
          </View>
          <Ionicons name="chevron-forward" size={20} color={Colors.light.icon} />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.settingItem}
          onPress={() => router.push('/settings/privacy' as any)}
        >
          <View style={styles.settingContent}>
            <Ionicons name="shield-outline" size={20} color={Colors.light.icon} />
            <ThemedText style={styles.settingText}>Privacy</ThemedText>
          </View>
          <Ionicons name="chevron-forward" size={20} color={Colors.light.icon} />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.settingItem}
          onPress={() => router.push('/settings/about' as any)}
        >
          <View style={styles.settingContent}>
            <Ionicons name="information-circle-outline" size={20} color={Colors.light.icon} />
            <ThemedText style={styles.settingText}>About the app</ThemedText>
          </View>
          <Ionicons name="chevron-forward" size={20} color={Colors.light.icon} />
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.settingItem}
          onPress={() => router.push('/welcome')}
        >
          <View style={styles.settingContent}>
            <Ionicons name="log-out-outline" size={20} color={Colors.light.dangerColor} />
            <ThemedText style={[styles.settingText, {
               color: Colors.light.dangerColor
            }]}>Logout</ThemedText>
          </View>
          <Ionicons name="chevron-forward" size={20} color={Colors.light.dangerColor} />
        </TouchableOpacity>
        </View>
      </View>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  profileHeader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    paddingTop: 20,
  },
  profileImageContainer: {
    position: 'relative',
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 60,
  },
  editImageIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: Colors.light.successColor,
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  userEmail: {
    fontSize: 16,
    color: Colors.light.gray,
    textAlign: 'center',
  },
  contentContainer: {
    gap: 20,
    paddingBottom: 70,
  },
  infoSection: {
    gap: 6,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.light.lightGray,
  },
  challengeCard: {
    padding: 20,
    borderRadius: 16,
    backgroundColor: '#f8f9fa',
  },
  challengeTitle: {
    marginBottom: 16,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  progressGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 4,
  },
  progressItem: {
    width: '48%',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 12,
  },
  progressNumber: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.light.successColor,
    marginBottom: 4,
  },
  failedNumber: {
    color: Colors.light.dangerColor,
  },
  progressLabel: {
    fontSize: 12,
    textAlign: 'center',
    opacity: 0.7,
  },
  progressBarContainer: {
    marginTop: 8,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.light.successColor,
    borderRadius: 4,
  },
  progressText: {
    fontSize: 12,
    textAlign: 'center',
    opacity: 0.7,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 4,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  settingContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  settingText: {
    fontSize: 16,
    color: '#333',
  },
});
