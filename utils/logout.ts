import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Utilitário para logout completo do aplicativo
 * Remove todas as chaves relacionadas ao app do AsyncStorage
 */
export const clearAllAppData = async (): Promise<void> => {
  try {
    const allKeys = await AsyncStorage.getAllKeys();
    
    const appRelatedPatterns = [
      '@75challenge',
      '75challenge',
      'challenge',
      'habit',
      'user',
      'first_time',
      'welcome',
      'profile',
      'settings'
    ];
    
    const appKeys = allKeys.filter(key => 
      appRelatedPatterns.some(pattern => 
        key.toLowerCase().includes(pattern.toLowerCase())
      )
    );

    const knownAppKeys = [
      '@75challenge_user',
      '@75challenge_first_time',
      '@75challenge_data',
      '@75challenge_habits',
      'challenge-data',
      'habits-data',
      'user-data'
    ];

    const allAppKeys = [...new Set([...appKeys, ...knownAppKeys])];

    if (allAppKeys.length > 0) {
      await AsyncStorage.multiRemove(allAppKeys);
      console.log('✅ Dados do app limpos com sucesso');
      console.log('🗑️ Chaves removidas:', allAppKeys);
    } else {
      console.log('ℹ️ Nenhum dado do app encontrado para remoção');
    }

    return;
  } catch (error) {
    console.error('❌ Erro ao limpar dados do app:', error);
    throw new Error('Falha ao limpar dados do aplicativo');
  }
};

/**
 * Função para verificar se há dados residuais após logout
 */
export const verifyDataCleared = async (): Promise<boolean> => {
  try {
    const allKeys = await AsyncStorage.getAllKeys();
    const remainingAppKeys = allKeys.filter(key => 
      key.includes('75challenge') || 
      key.includes('challenge') || 
      key.includes('habit')
    );
    
    if (remainingAppKeys.length > 0) {
      console.warn('⚠️ Dados residuais encontrados após logout:', remainingAppKeys);
      return false;
    }
    
    console.log('✅ Verificação de limpeza: todos os dados foram removidos');
    return true;
  } catch (error) {
    console.error('❌ Erro ao verificar limpeza de dados:', error);
    return false;
  }
};
