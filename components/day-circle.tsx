import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Colors } from '@/constants/theme';

interface DayCircleProps {
  day: number;
  dayName: string;
  isDisabled: boolean;
  isCompleted: boolean;
  isSelected: boolean;
  isFuture: boolean;
  challengeDay?: number;
  isInChallenge?: boolean;
  onSelect: () => void;
}

export default function DayCircle({ 
  day, 
  dayName, 
  isDisabled, 
  isCompleted, 
  isSelected, 
  isFuture, 
  challengeDay, 
  isInChallenge, 
  onSelect 
}: DayCircleProps) {
  return (
    <TouchableOpacity 
      style={[
        styles.dayContainer,
        isCompleted && styles.dayContainerCompleted,
        isSelected && styles.dayContainerToday,
        isDisabled && styles.dayContainerDisabled,
        { opacity: isFuture ? 0.5 : isDisabled ? 0.3 : 1 }
      ]}
      onPress={isDisabled ? undefined : onSelect}
      disabled={isDisabled}
    >
      <ThemedText style={[
        styles.dayNameText,
        isCompleted && styles.dayNameTextCompleted,
        isSelected && styles.dayNameTextToday,
        isDisabled && styles.dayNameTextDisabled,
      ]}>
        {dayName}
      </ThemedText>
      
      {isInChallenge && challengeDay && (
        <View style={styles.challengeIndicatorContainer}>
          <ThemedText style={styles.challengeDayIndicator}>
            D{challengeDay}
          </ThemedText>
        </View>
      )}
      
      <ThemedText style={[
        styles.dayText,
        isCompleted && styles.dayTextCompleted,
        isSelected && styles.dayTextToday,
        isDisabled && styles.dayTextDisabled,
      ]}>
        {day}
      </ThemedText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  dayContainer: {
    width: 50,
    height: 110,
    borderRadius: 30,
    backgroundColor: '#f5f5f5',
    borderWidth: 0.5,
    borderColor: Colors.light.lightGray,
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'relative',
    paddingVertical: 8,
  },
  dayContainerCompleted: {
    backgroundColor: Colors.light.successColor,
    borderColor: Colors.light.successColor,
  },
  dayContainerToday: {
    borderColor: Colors.light.tint,
    borderWidth: 3,
  },
  dayContainerDisabled: {
    backgroundColor: '#e0e0e0',
    borderColor: '#c0c0c0',
  },
  dayNameText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#666',
  },
  dayNameTextCompleted: {
    color: 'white',
  },
  dayNameTextToday: {
    fontWeight: '700',
  },
  dayNameTextDisabled: {
    color: '#999',
  },
  dayText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
  },
  dayTextCompleted: {
    color: 'white',
  },
  dayTextToday: {
    fontWeight: 'bold',
  },
  dayTextDisabled: {
    color: '#999',
  },
  challengeIndicatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  challengeDayIndicator: {
    fontSize: 10,
    fontWeight: '600',
    color: Colors.light.tint,
    backgroundColor: 'rgba(0, 122, 255, 0.1)',
    paddingHorizontal: 4,
    paddingVertical: 1,
    borderRadius: 8,
    textAlign: 'center',
  },
});
