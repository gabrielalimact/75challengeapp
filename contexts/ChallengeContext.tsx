import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';

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

  // Carregar dados do AsyncStorage quando o app iniciar
  useEffect(() => {
    loadChallengeData();
  }, []);

  const loadChallengeData = async () => {
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
  };  const saveChallengeData = async (data: ChallengeData) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
      console.error('Erro ao salvar dados do desafio:', error);
    }
  };

  const startChallenge = async (startDate: Date, days: number = 75) => {
    const newData: ChallengeData = {
      startDate,
      challengeDays: days,
      isActive: true,
      completedDays: [],
    };
    
    setChallengeData(newData);
    await saveChallengeData(newData);
  };

    const resetChallenge = () => {
    setChallengeData({
      startDate: null,
      challengeDays: 75,
      isActive: false,
      completedDays: [],
    });
  };

  const getCurrentDay = (): number => {
    if (!challengeData.startDate || !challengeData.isActive) return 0;
    
    const today = new Date();
    const startDate = new Date(challengeData.startDate);
    
    // Zerar as horas para comparar apenas as datas
    today.setHours(0, 0, 0, 0);
    startDate.setHours(0, 0, 0, 0);
    
    const diffTime = today.getTime() - startDate.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1; // +1 porque o primeiro dia é o dia 1
    
    return Math.max(0, Math.min(diffDays, challengeData.challengeDays));
  };

  const getDaysRemaining = (): number => {
    if (!challengeData.isActive) return 0;
    
    const currentDay = getCurrentDay();
    return Math.max(0, challengeData.challengeDays - currentDay);
  };

  const getProgressPercentage = (): number => {
    if (!challengeData.isActive) return 0;
    
    const currentDay = getCurrentDay();
    return Math.min(100, (currentDay / challengeData.challengeDays) * 100);
  };

  const isCompleted = (): boolean => {
    return challengeData.isActive && getCurrentDay() >= challengeData.challengeDays;
  };

  const isDayCompleted = (challengeDay: number): boolean => {
    return challengeData.completedDays.includes(challengeDay);
  };

  const markDayCompleted = async (challengeDay: number) => {
    if (!challengeData.isActive || isDayCompleted(challengeDay)) return;

    const newCompletedDays = [...challengeData.completedDays, challengeDay];
    const newData: ChallengeData = {
      ...challengeData,
      completedDays: newCompletedDays,
    };

    setChallengeData(newData);
    await saveChallengeData(newData);
  };

  const markDayIncomplete = async (challengeDay: number) => {
    if (!challengeData.isActive || !isDayCompleted(challengeDay)) return;

    const newCompletedDays = challengeData.completedDays.filter(day => day !== challengeDay);
    const newData: ChallengeData = {
      ...challengeData,
      completedDays: newCompletedDays,
    };

    setChallengeData(newData);
    await saveChallengeData(newData);
  };







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
