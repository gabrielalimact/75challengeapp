import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Colors } from '@/constants/theme';

interface HabitItemProps {
  icon: string;
  name: string;
  isCompleted: boolean;
  onToggle: () => void;
}

export default function HabitItem({ icon, name, isCompleted, onToggle }: HabitItemProps) {
  return (
    <TouchableOpacity style={styles.habitCard} onPress={onToggle}>
      <View style={styles.habitContent}>
        <View style={styles.habitIconContainer}>
          <Ionicons name={icon as any} size={24} color={Colors.light.tint} />
        </View>
        
        <ThemedText style={[
          styles.habitName,
          isCompleted && styles.habitNameCompleted
        ]}>
          {name}
        </ThemedText>
      </View>
      
      <TouchableOpacity style={[
        styles.habitCheckbox,
        isCompleted && styles.habitCheckboxCompleted
      ]} onPress={onToggle}>
        {isCompleted && (
          <Ionicons name="checkmark" size={16} color="white" />
        )}
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  habitCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  habitContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  habitIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  habitName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    flex: 1,
  },
  habitNameCompleted: {
    textDecorationLine: 'line-through',
    color: '#999',
  },
  habitCheckbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  habitCheckboxCompleted: {
    backgroundColor: Colors.light.tint,
    borderColor: Colors.light.tint,
  },
});
