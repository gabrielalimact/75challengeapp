import { router } from 'expo-router';
import { Modal, StyleSheet, TouchableOpacity, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Colors } from '@/constants/theme';

interface ChallengeModalProps {
  visible: boolean;
  challengeData: any;
  habits: any[];
  onStartChallenge: (date: Date) => void;
  onResetChallenge: () => void;
  onClose: () => void;
  getCurrentDay: () => number;
  getDaysRemaining: () => number;
  getProgressPercentage: () => number;
}

export default function ChallengeModal({
  visible,
  challengeData,
  habits,
  onStartChallenge,
  onResetChallenge,
  onClose,
  getCurrentDay,
  getDaysRemaining,
  getProgressPercentage,
}: ChallengeModalProps) {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <ThemedText type="subtitle" style={styles.modalTitle}>
            {challengeData.isActive ? 'Configure Challenge' : 'Start Challenge'}
          </ThemedText>
          
          {!challengeData.isActive ? (
            <View>
              <ThemedText style={styles.challengeDescription}>
                Ready to start your {challengeData.challengeDays}-day challenge?
              </ThemedText>
              
              <View style={styles.preStartContainer}>
                <View style={styles.stepContainer}>
                  <View style={styles.stepNumber}>
                    <ThemedText style={styles.stepNumberText}>1</ThemedText>
                  </View>
                  <View style={styles.stepContent}>
                    <ThemedText style={styles.stepTitle}>Configure Your Habits</ThemedText>
                    <ThemedText style={styles.stepDescription}>
                      You currently have {habits.length} habits configured. Make sure to customize your daily habits before starting.
                    </ThemedText>
                  </View>
                </View>
                
                <View style={styles.stepContainer}>
                  <View style={styles.stepNumber}>
                    <ThemedText style={styles.stepNumberText}>2</ThemedText>
                  </View>
                  <View style={styles.stepContent}>
                    <ThemedText style={styles.stepTitle}>Start Your Challenge</ThemedText>
                    <ThemedText style={styles.stepDescription}>
                      Once you&apos;re happy with your habits, start the challenge and commit to {challengeData.challengeDays} days of consistency.
                    </ThemedText>
                  </View>
                </View>
              </View>
              
              <TouchableOpacity
                style={[styles.startChallengeButton]}
                onPress={() => {
                  if (habits.length === 0) {
                    onClose();
                    router.push('/(tabs)/habitsconfig');
                    return;
                  }
                  onStartChallenge(new Date());
                  onClose();
                }}
              >
                <ThemedText style={styles.startChallengeButtonText}>
                  {habits.length === 0 ? 'Configure Habits First' : 'Start Challenge Today'}
                </ThemedText>
              </TouchableOpacity>
            </View>
          ) : (
            <View>
              <ThemedText style={styles.challengeDescription}>
                Challenge in progress since {challengeData.startDate?.toLocaleDateString('en-US')}
              </ThemedText>
              
              <View style={styles.challengeStats}>
                <View style={styles.statItem}>
                  <ThemedText style={styles.statNumber}>{getCurrentDay()}</ThemedText>
                  <ThemedText style={styles.statLabel}>Current Day</ThemedText>
                </View>
                
                <View style={styles.statItem}>
                  <ThemedText style={styles.statNumber}>{getDaysRemaining()}</ThemedText>
                  <ThemedText style={styles.statLabel}>Remaining</ThemedText>
                </View>
                
                <View style={styles.statItem}>
                  <ThemedText style={styles.statNumber}>{Math.round(getProgressPercentage())}%</ThemedText>
                  <ThemedText style={styles.statLabel}>Complete</ThemedText>
                </View>
              </View>
              
              <TouchableOpacity
                style={styles.resetChallengeButton}
                onPress={() => {
                  onResetChallenge();
                  onClose();
                }}
              >
                <ThemedText style={styles.resetChallengeButtonText}>
                  Finish Challenge
                </ThemedText>
              </TouchableOpacity>
            </View>
          )}
          
          <TouchableOpacity
            style={styles.modalCloseButton}
            onPress={onClose}
          >
            <ThemedText style={styles.modalCloseText}>Close</ThemedText>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#edece4',
    borderRadius: 20,
    padding: 20,
    width: '80%',
    maxHeight: '70%',
  },
  modalTitle: {
    textAlign: 'center',
    marginBottom: 10,
    fontSize: 20,
    fontWeight: '700',
  },
  challengeDescription: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    lineHeight: 22,
  },
  preStartContainer: {
    marginVertical: 20,
  },
  stepContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  stepNumber: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: Colors.light.tint,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    marginTop: 2,
  },
  stepNumberText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
    color: '#333',
  },
  stepDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 8,
  },
  startChallengeButton: {
    backgroundColor: Colors.light.tint,
    borderRadius: 10,
    paddingVertical: 15,
  },
  startChallengeButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
  },
  challengeStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
    paddingVertical: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 10,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.light.tint,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  resetChallengeButton: {
    backgroundColor: '#ff4757',
    borderRadius: 10,
    paddingVertical: 12,
  },
  resetChallengeButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
  },
  modalCloseButton: {
    backgroundColor: Colors.light.tint,
    borderRadius: 10,
    paddingVertical: 12,
    marginTop: 20,
  },
  modalCloseText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
  },
});
