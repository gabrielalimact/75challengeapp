import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import * as ImagePicker from 'expo-image-picker';
import { Alert, StyleSheet, TouchableOpacity, View } from 'react-native';

import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { useChallenge } from '@/contexts/ChallengeContext';
import { useUser } from '@/contexts/UserContext';

// Helper function to calculate consecutive days
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
    Alert.alert(
      'Update Profile Picture',
      'Choose an option',
      [
        { text: 'Camera', onPress: openCamera },
        { text: 'Gallery', onPress: openGallery },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  const openCamera = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert('Permission Required', 'Camera permission is required to take photos.');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]) {
      updateProfileImage(result.assets[0].uri);
    }
  };

  const openGallery = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert('Permission Required', 'Gallery permission is required to select photos.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]) {
      updateProfileImage(result.assets[0].uri);
    }
  };
  
  return (
    <View style={styles.profileHeader}>
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
    </View>
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
    return (
      <ThemedView style={styles.challengeCard}>
        <ThemedText type="subtitle" style={styles.challengeTitle}>
          75 Challenge
        </ThemedText>
        <View style={styles.inactiveChallengeContainer}>
          <Ionicons name="play-circle-outline" size={48} color={Colors.light.successColor} />
          <ThemedText style={styles.inactiveChallengeText}>
            No active challenge
          </ThemedText>
          <ThemedText style={styles.inactiveChallengeSubtext}>
            Start your 75-day journey from the Challenge tab
          </ThemedText>
        </View>
      </ThemedView>
    );
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
  const { user } = useUser();
  
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#fff', dark: '#353636' }}
      headerImage={<ProfileHeader />}>
      <View style={styles.contentContainer}>
        <ChallengeProgressCard />
        
        <View>
        <ThemedText type="subtitle" style={styles.sectionTitle}>
          Personal Information
        </ThemedText>
        
        <ThemedView style={styles.infoSection}>
          <ThemedText type="defaultSemiBold">Full name</ThemedText>
          <ThemedText>{user.name}</ThemedText>
        </ThemedView>
        
        <ThemedView style={styles.infoSection}>
          <ThemedText type="defaultSemiBold">Email</ThemedText>
          <ThemedText>{user.email}</ThemedText>
        </ThemedView>
        
        <ThemedView style={styles.infoSection}>
          <ThemedText type="defaultSemiBold">Phone</ThemedText>
          <ThemedText>{user.phone}</ThemedText>
        </ThemedView>
        </View>
        <View style={styles.divider} />
        <View>
        <ThemedText type="subtitle" style={styles.sectionTitle}>
          Settings
        </ThemedText>
        
        <ThemedView style={styles.infoSection}>
          <ThemedText>Notifications</ThemedText>
        </ThemedView>
        
        <ThemedView style={styles.infoSection}>
          <ThemedText>Privacy</ThemedText>
        </ThemedView>
        
        <ThemedView style={styles.infoSection}>
          <ThemedText>About the app</ThemedText>
        </ThemedView>
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
    paddingTop: 60,
    gap: 4,
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
    opacity: 0.7,
    textAlign: 'center',
  },
  contentContainer: {
    gap: 20,
    paddingBottom: 70,
  },
  sectionTitle: {
    marginBottom: 8,
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
  inactiveChallengeContainer: {
    alignItems: 'center',
    padding: 20,
    gap: 8,
  },
  inactiveChallengeText: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  inactiveChallengeSubtext: {
    fontSize: 14,
    textAlign: 'center',
    opacity: 0.7,
  },
});
