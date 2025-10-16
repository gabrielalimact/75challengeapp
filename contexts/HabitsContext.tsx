import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';

export interface Habit {
  id: number;
  icon: string;
  name: string;
  isCompleted: boolean;
}

interface HabitsContextType {
  habits: Habit[];
  addHabit: (habit: Omit<Habit, 'id' | 'isCompleted'>) => void;
  updateHabit: (id: number, updates: Partial<Habit>) => void;
  deleteHabit: (id: number) => void;
  toggleHabit: (id: number) => void;
  resetHabitsForDay: () => void;
}

const HabitsContext = createContext<HabitsContextType | undefined>(undefined);

const STORAGE_KEY = '@75challenge_habits';

const DEFAULT_HABITS: Habit[] = [
  { id: 1, icon: 'water-outline', name: 'Drink 2L of water', isCompleted: false },
  { id: 2, icon: 'barbell-outline', name: 'Exercise', isCompleted: false },
  { id: 3, icon: 'book-outline', name: 'Read for 30 min', isCompleted: false },
  { id: 4, icon: 'moon-outline', name: 'Sleep 8 hours', isCompleted: false },
  { id: 5, icon: 'restaurant-outline', name: 'Eat healthy', isCompleted: false },
];

export const HabitsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [habits, setHabits] = useState<Habit[]>(DEFAULT_HABITS);

  const loadHabits = useCallback(async () => {
    try {
      const storedHabits = await AsyncStorage.getItem(STORAGE_KEY);
      if (storedHabits) {
        setHabits(JSON.parse(storedHabits));
      }
    } catch (error) {
      console.error('Error loading habits:', error);
    }
  }, []);

  useEffect(() => {
    loadHabits();
  }, [loadHabits]);

  const saveHabits = useCallback(async () => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(habits));
    } catch (error) {
      console.error('Error saving habits:', error);
    }
  }, [habits]);

  useEffect(() => {
    saveHabits();
  }, [saveHabits]);

  const addHabit = (habitData: Omit<Habit, 'id' | 'isCompleted'>) => {
    const newHabit: Habit = {
      ...habitData,
      id: Date.now(),
      isCompleted: false,
    };
    setHabits(prev => [...prev, newHabit]);
  };

  const updateHabit = (id: number, updates: Partial<Habit>) => {
    setHabits(prev => prev.map(habit => 
      habit.id === id ? { ...habit, ...updates } : habit
    ));
  };

  const deleteHabit = (id: number) => {
    setHabits(prev => prev.filter(habit => habit.id !== id));
  };

  const toggleHabit = (id: number) => {
    setHabits(prev => prev.map(habit => 
      habit.id === id ? { ...habit, isCompleted: !habit.isCompleted } : habit
    ));
  };

  const resetHabitsForDay = () => {
    setHabits(prev => prev.map(habit => ({ ...habit, isCompleted: false })));
  };

  const contextValue: HabitsContextType = {
    habits,
    addHabit,
    updateHabit,
    deleteHabit,
    toggleHabit,
    resetHabitsForDay,
  };

  return (
    <HabitsContext.Provider value={contextValue}>
      {children}
    </HabitsContext.Provider>
  );
};

export const useHabits = () => {
  const context = useContext(HabitsContext);
  if (!context) {
    throw new Error('useHabits deve ser usado dentro de um HabitsProvider');
  }
  return context;
};
