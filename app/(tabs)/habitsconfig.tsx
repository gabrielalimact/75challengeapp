import { AntDesign, Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Alert, KeyboardAvoidingView, Modal, Platform, ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { useHabits, type Habit } from '@/contexts/HabitsContext';

// Lista de ícones disponíveis para os hábitos
const HABIT_ICONS = [
  { name: 'water-outline', label: 'Água' },
  { name: 'barbell-outline', label: 'Exercício' },
  { name: 'book-outline', label: 'Leitura' },
  { name: 'moon-outline', label: 'Sono' },
  { name: 'restaurant-outline', label: 'Alimentação' },
  { name: 'walk-outline', label: 'Caminhada' },
  { name: 'bicycle-outline', label: 'Bicicleta' },
  { name: 'musical-notes-outline', label: 'Música' },
  { name: 'leaf-outline', label: 'Meditação' },
  { name: 'sunny-outline', label: 'Sol' },
  { name: 'heart-outline', label: 'Saúde' },
  { name: 'time-outline', label: 'Tempo' },
];

export default function HabitsConfigScreen() {
  const { habits, addHabit, updateHabit, deleteHabit, toggleHabit } = useHabits();

  const [showAddModal, setShowAddModal] = useState(false);
  const [editingHabit, setEditingHabit] = useState<Habit | null>(null);
  const [habitName, setHabitName] = useState('');
  const [selectedIcon, setSelectedIcon] = useState('water-outline');

  const handleTextChange = (text: string) => {
    try {
      setHabitName(text);
    } catch (error) {
      console.error('Erro ao alterar texto:', error);
    }
  };

  const openAddModal = () => {
    setEditingHabit(null);
    setHabitName('');
    setSelectedIcon('water-outline');
    setShowAddModal(true);
  };

  const saveHabit = () => {
    if (!habitName.trim()) {
      Alert.alert('Erro', 'Por favor, digite um nome para o hábito');
      return;
    }

    if (editingHabit) {
      updateHabit(editingHabit.id, {
        name: habitName.trim(),
        icon: selectedIcon
      });
    } else {
      addHabit({
        icon: selectedIcon,
        name: habitName.trim(),
      });
    }

    setShowAddModal(false);
    setHabitName('');
    setSelectedIcon('water-outline');
    setEditingHabit(null);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <ThemedText type="title" style={styles.headerTitle}>
          Configurar Hábitos
        </ThemedText>
        <TouchableOpacity style={styles.addButton} onPress={openAddModal}>
          <AntDesign name="plus" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <ThemedView style={styles.habitsContainer}>
        <ThemedText style={styles.sectionTitle}>Meus Hábitos ({habits.length})</ThemedText>
        
        <ScrollView 
          style={styles.habitsList}
          contentContainerStyle={styles.habitsListContent}
          showsVerticalScrollIndicator={false}
        >
          {habits.map((habit) => (
            <View key={habit.id} style={styles.habitCard}>
              <View style={styles.habitContent}>
                <View style={styles.habitIconContainer}>
                  <Ionicons name={habit.icon as any} size={24} color={Colors.light.tint} />
                </View>
                
                <ThemedText style={styles.habitName}>
                  {habit.name}
                </ThemedText>
              </View>
              
              <View style={styles.habitActions}>
                <TouchableOpacity
                  style={styles.editButton}
                  onPress={() => {
                    setEditingHabit(habit);
                    setHabitName(habit.name);
                    setSelectedIcon(habit.icon);
                    setShowAddModal(true);
                  }}
                >
                  <Ionicons name="pencil" size={16} color={Colors.light.tint} />
                </TouchableOpacity>
                
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => {
                    Alert.alert(
                      'Excluir Hábito',
                      `Tem certeza que deseja excluir "${habit.name}"?`,
                      [
                        { text: 'Cancelar', style: 'cancel' },
                        { text: 'Excluir', style: 'destructive', onPress: () => deleteHabit(habit.id) }
                      ]
                    );
                  }}
                >
                  <Ionicons name="trash" size={16} color="#ff4757" />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView>
      </ThemedView>

      <Modal
        visible={showAddModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowAddModal(false)}
      >
        <KeyboardAvoidingView 
          style={styles.modalOverlay}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <View style={styles.modalContent}>
            <ThemedText type="subtitle" style={styles.modalTitle}>
              Novo Hábito
            </ThemedText>
            
            <View style={styles.inputContainer}>
              <ThemedText style={styles.inputLabel}>Nome do hábito:</ThemedText>
              <TextInput
                style={styles.textInput}
                value={habitName}
                onChangeText={handleTextChange}
                placeholder="Ex: Beber água, Fazer exercício..."
                placeholderTextColor="#999"
                maxLength={50}
                autoCorrect={false}
                autoCapitalize="sentences"
                blurOnSubmit={true}
                returnKeyType="done"
                selectTextOnFocus={false}
                textContentType="none"
              />
            </View>

            <View style={styles.iconSelector}>
              <ThemedText style={styles.sectionTitle}>Escolha um ícone:</ThemedText>
              <View style={styles.iconsGrid}>
                {HABIT_ICONS.map((iconItem) => (
                  <TouchableOpacity
                    key={iconItem.name}
                    style={[
                      styles.iconOption,
                      selectedIcon === iconItem.name && styles.iconOptionSelected
                    ]}
                    onPress={() => setSelectedIcon(iconItem.name)}
                  >
                    <Ionicons 
                      name={iconItem.name as any} 
                      size={24} 
                      color={selectedIcon === iconItem.name ? 'white' : Colors.light.tint}
                    />
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setShowAddModal(false)}
              >
                <ThemedText style={styles.cancelButtonText}>Cancelar</ThemedText>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={styles.saveButton}
                onPress={saveHabit}
              >
                <ThemedText style={styles.saveButtonText}>Adicionar</ThemedText>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: Colors.light.tint,
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  habitsContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    color: '#333',
  },
  habitsList: {
    flex: 1,
  },
  habitsListContent: {
    paddingBottom: 100,
  },
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
  habitActions: {
    flexDirection: 'row',
    gap: 8,
  },
  editButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
  },
  deleteButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
  },
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
    width: '90%',
    maxHeight: '80%',
  },
  modalTitle: {
    textAlign: 'center',
    marginBottom: 20,
    fontSize: 20,
    fontWeight: '700',
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    backgroundColor: 'white',
    color: '#333',
    minHeight: 44,
    textAlignVertical: 'center',
  },
  iconSelector: {
    marginBottom: 20,
  },
  iconsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginTop: 8,
  },
  iconOption: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  iconOptionSelected: {
    backgroundColor: Colors.light.tint,
    borderColor: Colors.light.tint,
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 20,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    paddingVertical: 12,
  },
  cancelButtonText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
  },
  saveButton: {
    flex: 1,
    backgroundColor: Colors.light.tint,
    borderRadius: 10,
    paddingVertical: 12,
  },
  saveButtonText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
});
