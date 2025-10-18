import { router } from 'expo-router';
import { useState } from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AntDesign } from '@expo/vector-icons';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { useUser } from '@/contexts/UserContext';

const { width } = Dimensions.get('window');

interface WelcomeSlide {
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  color: string;
}

const welcomeSlides: WelcomeSlide[] = [
  {
    title: 'Bem-vindo ao',
    subtitle: '75 Challenge App',
    description: 'Transforme sua vida em 75 dias com o desafio de disciplina mental mais desafiador do mundo.',
    icon: '🎯',
    color: Colors.light.tint,
  },
  {
    title: 'Acompanhe',
    subtitle: 'Seus Hábitos',
    description: 'Crie e monitore hábitos diários personalizados. Marque como completo e veja seu progresso crescer.',
    icon: '📋',
    color: Colors.light.successColor,
  },
  {
    title: 'Visual',
    subtitle: 'Calendário',
    description: 'Veja seu progresso de forma visual com nosso calendário interativo. Cada dia completo é uma vitória!',
    icon: '📅',
    color: Colors.light.dangerColor,
  },
  {
    title: 'Comece',
    subtitle: 'Sua Jornada',
    description: 'Pronto para aceitar o desafio? Vamos configurar seu perfil e começar esta transformação incrível!',
    icon: '🚀',
    color: Colors.light.tint,
  },
];

export default function WelcomeScreen() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { completeWelcome } = useUser();

  const nextSlide = () => {
    if (currentSlide < welcomeSlides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      handleGetStarted();
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const handleGetStarted = () => {
    // Na última tela, mostra opções de login/cadastro
    if (currentSlide === welcomeSlides.length - 1) {
      // Não faz nada, deixa os botões de login/cadastro aparecerem
      return;
    }
    completeWelcome();
  };

  const handleLogin = () => {
    router.push('./login' as any);
  };

  const handleSignup = () => {
    router.push('./signup' as any);
  };

  const currentSlideData = welcomeSlides[currentSlide];

  const goToLastSlide = () => {
    setCurrentSlide(welcomeSlides.length - 1);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ThemedView style={[styles.content, { backgroundColor: currentSlideData.color + '10' }]}>
        <View style={styles.header}>
          <View style={styles.indicators}>
            {welcomeSlides.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.indicator,
                  {
                    backgroundColor: index === currentSlide ? currentSlideData.color : '#E0E0E0',
                    width: index === currentSlide ? 24 : 8,
                  },
                ]}
              />
            ))}
          </View>
          
            <TouchableOpacity 
              style={styles.skipButton}
              onPress={currentSlide < welcomeSlides.length - 1 ? goToLastSlide : prevSlide}
            >
              <ThemedText style={styles.skipText}>
                {currentSlide < welcomeSlides.length - 1 ? 'Pular' : 'Voltar'}
              </ThemedText>
            </TouchableOpacity>
        </View>

        {/* Conteúdo principal */}
        <View style={styles.slideContent}>
          <View style={[styles.iconContainer, { backgroundColor: currentSlideData.color + '20' }]}>
            <Text style={styles.iconEmoji}>{currentSlideData.icon}</Text>
          </View>

          <View style={styles.textContainer}>
            <Text style={styles.title}>{currentSlideData.title}</Text>
            <Text style={[styles.subtitle, { color: currentSlideData.color }]}>
              {currentSlideData.subtitle}
            </Text>
            <Text style={styles.description}>{currentSlideData.description}</Text>
          </View>
        </View>

        {/* Footer */}
        {currentSlide === welcomeSlides.length - 1 ? (
          // Última tela - mostrar botões de Login e Cadastro
          <View style={styles.authFooter}>
            <TouchableOpacity
              style={[styles.signupButton, { backgroundColor: currentSlideData.color }]}
              onPress={handleSignup}
            >
              <ThemedText style={styles.authButtonText}>Criar Conta</ThemedText>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[styles.loginButton, { borderColor: currentSlideData.color }]}
              onPress={handleLogin}
            >
              <ThemedText style={[styles.loginButtonText, { color: currentSlideData.color }]}>
                Já tenho conta
              </ThemedText>
            </TouchableOpacity>
          </View>
        ) : (
          // Telas anteriores - navegação normal
          <View style={styles.footer}>
            <TouchableOpacity
              style={[styles.navButton, { opacity: currentSlide === 0 ? 0.3 : 1 }]}
              onPress={prevSlide}
              disabled={currentSlide === 0}
            >
              <AntDesign name="left" size={24} color={currentSlideData.color} />
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.nextButton, { backgroundColor: currentSlideData.color }]}
              onPress={nextSlide}
            >
              <ThemedText style={styles.nextButtonText}>Próximo</ThemedText>
              <AntDesign name="right" size={20} color="#FFFFFF" />
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.navButton, { opacity: currentSlide === welcomeSlides.length - 1 ? 0.3 : 1 }]}
              onPress={nextSlide}
              disabled={currentSlide === welcomeSlides.length - 1}
            >
              <AntDesign name="right" size={24} color={currentSlideData.color} />
            </TouchableOpacity>
          </View>
        )}
      </ThemedView>
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
    paddingHorizontal: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
  },
  indicators: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  indicator: {
    height: 8,
    borderRadius: 4,
  },
  skipButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  skipText: {
    fontSize: 16,
    color: '#666666',
    fontWeight: '500',
  },
  slideContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  iconEmoji: {
    fontSize: 58,
  },
  textContainer: {
    alignItems: 'center',
    maxWidth: width * 0.8,
  },
  title: {
    fontSize: 24,
    fontWeight: '300',
    color: '#333333',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 24,
  },
  description: {
    fontSize: 18,
    color: '#666666',
    textAlign: 'center',
    lineHeight: 26,
    maxWidth: width * 0.75,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 32,
  },
  navButton: {
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 24,
  },
  nextButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 28,
    gap: 8,
    minWidth: 140,
  },
  nextButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  authFooter: {
    paddingVertical: 20,
    paddingHorizontal: 4,
    gap: 16,
  },
  signupButton: {
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  authButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  loginButton: {
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    borderWidth: 2,
    backgroundColor: 'transparent',
  },
  loginButtonText: {
    fontSize: 18,
    fontWeight: '600',
  },
  skipAuthButton: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  skipAuthText: {
    fontSize: 16,
    color: '#666666',
    fontWeight: '500',
  },
});
