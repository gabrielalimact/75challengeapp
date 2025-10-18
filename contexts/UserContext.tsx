import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';

export interface User {
  name: string;
  email: string;
  phone: string;
  profileImage?: string;
}

interface UserContextType {
  user: User;
  isFirstTime: boolean;
  updateUser: (userData: Partial<User>) => void;
  updateName: (name: string) => void;
  updateEmail: (email: string) => void;
  updatePhone: (phone: string) => void;
  updateProfileImage: (imageUri: string) => void;
  completeWelcome: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

const STORAGE_KEY = '@75challenge_user';
const FIRST_TIME_KEY = '@75challenge_first_time';

const DEFAULT_USER: User = {
  name: 'Gabriela Cena',
  email: 'gabriela.cena@email.com',
  phone: '(11) 99999-9999',
  profileImage: undefined,
};

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User>(DEFAULT_USER);
  const [isFirstTime, setIsFirstTime] = useState<boolean>(true);

  // Carregar dados do usuário do AsyncStorage
  const loadUser = useCallback(async () => {
    try {
      const storedUser = await AsyncStorage.getItem(STORAGE_KEY);
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    }
  }, []);

  // Verificar se é a primeira vez
  const checkFirstTime = useCallback(async () => {
    try {
      const hasVisited = await AsyncStorage.getItem(FIRST_TIME_KEY);
      setIsFirstTime(hasVisited === null);
    } catch (error) {
      console.error('Error checking first time:', error);
    }
  }, []);

  // Marcar welcome como completo
  const completeWelcome = useCallback(async () => {
    try {
      await AsyncStorage.setItem(FIRST_TIME_KEY, 'completed');
      setIsFirstTime(false);
    } catch (error) {
      console.error('Error completing welcome:', error);
    }
  }, []);

  // Salvar dados do usuário no AsyncStorage
  const saveUser = useCallback(async (userData: User) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
    } catch (error) {
      console.error('Error saving user data:', error);
    }
  }, []);

  // Atualizar dados do usuário
  const updateUser = useCallback((userData: Partial<User>) => {
    setUser(prevUser => {
      const newUser = { ...prevUser, ...userData };
      saveUser(newUser);
      return newUser;
    });
  }, [saveUser]);

  // Atualizar apenas o nome
  const updateName = useCallback((name: string) => {
    updateUser({ name });
  }, [updateUser]);

  // Atualizar apenas o email
  const updateEmail = useCallback((email: string) => {
    updateUser({ email });
  }, [updateUser]);

  // Atualizar apenas o telefone
  const updatePhone = useCallback((phone: string) => {
    updateUser({ phone });
  }, [updateUser]);

  // Atualizar apenas a imagem de perfil
  const updateProfileImage = useCallback((imageUri: string) => {
    updateUser({ profileImage: imageUri });
  }, [updateUser]);

  // Carregar dados quando o componente for montado
  useEffect(() => {
    loadUser();
    checkFirstTime();
  }, [loadUser, checkFirstTime]);

  const contextValue: UserContextType = {
    user,
    isFirstTime,
    updateUser,
    updateName,
    updateEmail,
    updatePhone,
    updateProfileImage,
    completeWelcome,
  };

  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  );
};

// Hook personalizado para usar o contexto
export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
