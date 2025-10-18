import { Modal, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Colors } from '@/constants/theme';

interface MonthSelectorModalProps {
  visible: boolean;
  selectedDate: Date;
  onDateSelect: (date: Date) => void;
  onClose: () => void;
}

export default function MonthSelectorModal({ 
  visible, 
  selectedDate, 
  onDateSelect, 
  onClose 
}: MonthSelectorModalProps) {
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
            Select Month
          </ThemedText>
          
          <ScrollView style={styles.monthList}>
            {Array.from({ length: 12 }, (_, i) => {
              const date = new Date(selectedDate.getFullYear(), i, 1);
              return (
                <TouchableOpacity
                  key={i}
                  style={styles.monthItem}
                  onPress={() => {
                    onDateSelect(new Date(selectedDate.getFullYear(), i, 1));
                    onClose();
                  }}
                >
                  <ThemedText style={styles.monthItemText}>
                    {`${date.toLocaleDateString('en-US', { month: 'long' })}/${date.getFullYear()}`}
                  </ThemedText>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
          
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
  monthList: {
    maxHeight: 300,
  },
  monthItem: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  monthItemText: {
    fontSize: 16,
    textAlign: 'center',
    textTransform: 'capitalize',
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
