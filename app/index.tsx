import { useEffect } from 'react';
import { router } from 'expo-router';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { useUser } from '@/contexts/UserContext';
import { Colors } from '@/constants/theme';

export default function InitialScreen() {
  const { isFirstTime } = useUser();

  useEffect(() => {
    // Pequeno delay para permitir que o contexto carregue
    const timer = setTimeout(() => {
      if (isFirstTime) {
        router.replace('/welcome');
      } else {
        router.replace('/(tabs)');
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [isFirstTime]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <ThemedText style={styles.logoEmoji}>🎯</ThemedText>
          <ThemedText style={styles.logoText}>75 Challenge</ThemedText>
        </View>
        <ActivityIndicator 
          size="large" 
          color={Colors.light.tint} 
          style={styles.loader}
        />
        <ThemedText style={styles.loadingText}>Carregando...</ThemedText>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 60,
  },
  logoEmoji: {
    fontSize: 64,
    marginBottom: 16,
  },
  logoText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.light.text,
  },
  loader: {
    marginBottom: 16,
  },
  loadingText: {
    fontSize: 16,
    color: Colors.light.gray,
  },
});
