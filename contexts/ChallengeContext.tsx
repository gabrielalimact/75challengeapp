import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';

interface ChallengeData {
  startDate: Date | null;
  challengeDays: number;
  isActive: boolean;
  completedDays: number[];
}

interface ChallengeContextType {
  challengeData: ChallengeData;
  startChallenge: (startDate: Date, days?: number) => Promise<void>;
  resetChallenge: () => void;
  getCurrentDay: () => number;
  getDaysRemaining: () => number;
  getProgressPercentage: () => number;
  isCompleted: () => boolean;
  isDayCompleted: (challengeDay: number) => boolean;
  markDayCompleted: (challengeDay: number) => Promise<void>;
  markDayIncomplete: (challengeDay: number) => Promise<void>;
}

const ChallengeContext = createContext<ChallengeContextType | undefined>(undefined);

const STORAGE_KEY = '@75challenge_data';

export const ChallengeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [challengeData, setChallengeData] = useState<ChallengeData>({
    startDate: null,
    challengeDays: 75,
    isActive: false,
    completedDays: [],
  });

  const loadChallengeData = useCallback(async () => {
    try {
      const storedData = await AsyncStorage.getItem('challenge-data');
      if (storedData) {
        const parsed = JSON.parse(storedData);
        setChallengeData({
          ...parsed,
          startDate: parsed.startDate ? new Date(parsed.startDate) : null,
        });
      }
    } catch (error) {
      console.log('Erro ao carregar dados do desafio:', error);
      setChallengeData({
        startDate: null,
        challengeDays: 75,
        isActive: false,
        completedDays: [],
      });
    }
  }, []);

  useEffect(() => {
    loadChallengeData();
  }, [loadChallengeData]);  const saveChallengeData = useCallback(async (data: ChallengeData) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
      console.error('Erro ao salvar dados do desafio:', error);
    }
  }, []);

  const startChallenge = useCallback(async (startDate: Date, days: number = 75) => {
    const newData: ChallengeData = {
      startDate,
      challengeDays: days,
      isActive: true,
      completedDays: [],
    };
    
    setChallengeData(newData);
    await saveChallengeData(newData);
  }, [saveChallengeData]);

  const resetChallenge = useCallback(() => {
    setChallengeData({
      startDate: null,
      challengeDays: 75,
      isActive: false,
      completedDays: [],
    });
  }, []);

  const getCurrentDay = useCallback((): number => {
    if (!challengeData.startDate || !challengeData.isActive) return 0;
    
    const today = new Date();
    const startDate = new Date(challengeData.startDate);
    
    today.setHours(0, 0, 0, 0);
    startDate.setHours(0, 0, 0, 0);
    
    const diffTime = today.getTime() - startDate.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;
    return Math.max(0, Math.min(diffDays, challengeData.challengeDays));
  }, [challengeData.startDate, challengeData.isActive, challengeData.challengeDays]);

  const getDaysRemaining = useCallback((): number => {
    if (!challengeData.isActive) return 0;
    
    const currentDay = getCurrentDay();
    return Math.max(0, challengeData.challengeDays - currentDay);
  }, [challengeData.isActive, challengeData.challengeDays, getCurrentDay]);

  const getProgressPercentage = useCallback((): number => {
    if (!challengeData.isActive) return 0;
    
    const currentDay = getCurrentDay();
    return Math.min(100, (currentDay / challengeData.challengeDays) * 100);
  }, [challengeData.isActive, challengeData.challengeDays, getCurrentDay]);

  const isCompleted = useCallback((): boolean => {
    return challengeData.isActive && getCurrentDay() >= challengeData.challengeDays;
  }, [challengeData.isActive, challengeData.challengeDays, getCurrentDay]);

  const isDayCompleted = useCallback((challengeDay: number): boolean => {
    return challengeData.completedDays.includes(challengeDay);
  }, [challengeData.completedDays]);

  const markDayCompleted = useCallback(async (challengeDay: number) => {
    setChallengeData(prevData => {
      if (!prevData.isActive || prevData.completedDays.includes(challengeDay)) {
        return prevData;
      }

      const newCompletedDays = [...prevData.completedDays, challengeDay];
      const newData: ChallengeData = {
        ...prevData,
        completedDays: newCompletedDays,
      };

      saveChallengeData(newData);
      return newData;
    });
  }, [saveChallengeData]);

  const markDayIncomplete = useCallback(async (challengeDay: number) => {
    setChallengeData(prevData => {
      if (!prevData.isActive || !prevData.completedDays.includes(challengeDay)) {
        return prevData;
      }

      const newCompletedDays = prevData.completedDays.filter(day => day !== challengeDay);
      const newData: ChallengeData = {
        ...prevData,
        completedDays: newCompletedDays,
      };

      saveChallengeData(newData);
      return newData;
    });
  }, [saveChallengeData]);







  const contextValue: ChallengeContextType = {
    challengeData,
    startChallenge,
    resetChallenge,
    getCurrentDay,
    getDaysRemaining,
    getProgressPercentage,
    isCompleted,
    isDayCompleted,
    markDayCompleted,
    markDayIncomplete,
  };

  return (
    <ChallengeContext.Provider value={contextValue}>
      {children}
    </ChallengeContext.Provider>
  );
};

export const useChallenge = (): ChallengeContextType => {
  const context = useContext(ChallengeContext);
  if (context === undefined) {
    throw new Error('useChallenge must be used within a ChallengeProvider');
  }
  return context;
};
