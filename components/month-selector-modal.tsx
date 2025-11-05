import { useEffect, useRef } from 'react';
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
  const scrollViewRef = useRef<ScrollView>(null);
  const itemHeight = 56;
  useEffect(() => {
    if (visible && scrollViewRef.current) {
      const selectedMonth = selectedDate.getMonth();
      
      const scrollPosition = Math.max(0, selectedMonth * itemHeight - 120);
      
      setTimeout(() => {
        scrollViewRef.current?.scrollTo({
          y: scrollPosition,
          animated: true,
        });
      }, 150); 
    }
  }, [visible, selectedDate]);

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
          
          <ScrollView 
            ref={scrollViewRef}
            style={styles.monthList}
            showsVerticalScrollIndicator={true}
          >
            {Array.from({ length: 12 }, (_, i) => {
              const date = new Date(selectedDate.getFullYear(), i, 1);
              return (
                <TouchableOpacity
                  key={i}
                  style={[
                    styles.monthItem,
                    selectedDate.getMonth() === i && styles.selectedMonthItem
                  ]}
                  onPress={() => {
                    onDateSelect(new Date(selectedDate.getFullYear(), i, 1));
                    onClose();
                  }}
                >
                  <ThemedText style={[
                    styles.monthItemText, 
                    selectedDate.getMonth() === i && styles.selectedMonthText
                  ]}>
                    {`${date.toLocaleDateString('en-US', { month: 'long' })} ${date.getFullYear()}`}
                    {selectedDate.getMonth() === i && ' ✓'}
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
    minHeight: 56, // Garantir altura consistente
  },
  selectedMonthItem: {
    backgroundColor: Colors.light.tint + '20',
  },
  monthItemText: {
    fontSize: 16,
    textAlign: 'center',
    textTransform: 'capitalize',
  },
  selectedMonthText: {
    fontWeight: 'bold',
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
