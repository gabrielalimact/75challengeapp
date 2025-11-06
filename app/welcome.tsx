import { AntDesign } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useState } from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, {
  FadeIn,
  interpolate,
  SlideInRight,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming
} from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

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
  
  const slideAnimation = useSharedValue(0);
  const iconScale = useSharedValue(1);
  const textOpacity = useSharedValue(1);

  const animatedSlideStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: interpolate(
            slideAnimation.value,
            [0, 1],
            [0, -width * 0.1]
          ),
        },
      ],
      opacity: interpolate(
        slideAnimation.value,
        [0, 0.5, 1],
        [1, 0.7, 1]
      ),
    };
  });

  const animatedIconStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { scale: iconScale.value },
        {
          rotateY: interpolate(
            slideAnimation.value,
            [0, 1],
            [0, 360]
          ) + 'deg',
        },
      ],
    };
  });

  const animatedTextStyle = useAnimatedStyle(() => {
    return {
      opacity: textOpacity.value,
      transform: [
        {
          translateY: interpolate(
            textOpacity.value,
            [0, 1],
            [20, 0]
          ),
        },
      ],
    };
  });

  const nextSlide = () => {
    if (currentSlide < welcomeSlides.length - 1) {
      slideAnimation.value = withTiming(1, { duration: 300 });
      textOpacity.value = withTiming(0, { duration: 200 });
      iconScale.value = withSpring(0.8, { damping: 15 });
      
      setTimeout(() => {
        setCurrentSlide(currentSlide + 1);
        slideAnimation.value = withTiming(0, { duration: 300 });
        textOpacity.value = withTiming(1, { duration: 400 });
        iconScale.value = withSpring(1, { damping: 15 });
      }, 150);
    } else {
      handleGetStarted();
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      slideAnimation.value = withTiming(-1, { duration: 300 });
      textOpacity.value = withTiming(0, { duration: 200 });
      iconScale.value = withSpring(0.8, { damping: 15 });
      
      setTimeout(() => {
        setCurrentSlide(currentSlide - 1);
        slideAnimation.value = withTiming(0, { duration: 300 });
        textOpacity.value = withTiming(1, { duration: 400 });
        iconScale.value = withSpring(1, { damping: 15 });
      }, 150);
    }
  };

  const handleGetStarted = () => {
    if (currentSlide === welcomeSlides.length - 1) {
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
    slideAnimation.value = withTiming(1, { duration: 400 });
    textOpacity.value = withTiming(0, { duration: 300 });
    iconScale.value = withSpring(0.5, { damping: 15 });
    
    setTimeout(() => {
      setCurrentSlide(welcomeSlides.length - 1);
      slideAnimation.value = withTiming(0, { duration: 400 });
      textOpacity.value = withTiming(1, { duration: 500 });
      iconScale.value = withSpring(1, { damping: 15 });
    }, 200);
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={[
          currentSlideData.color + '08',
          currentSlideData.color + '12',
          currentSlideData.color + '06'
        ]}
        style={StyleSheet.absoluteFillObject}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />
      <ThemedView style={[styles.content, { backgroundColor: 'transparent' }]}>
        <View style={styles.header}>
          <View style={styles.indicators}>
            {welcomeSlides.map((_, index) => (
              <Animated.View
                key={index}
                entering={FadeIn.delay(index * 100)}
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
        <Animated.View style={[styles.slideContent, animatedSlideStyle]}>
          <Animated.View 
            style={[
              styles.iconContainer, 
              { backgroundColor: currentSlideData.color + '20' },
              animatedIconStyle
            ]}
          >
            <Text style={styles.iconEmoji}>{currentSlideData.icon}</Text>
          </Animated.View>

          <Animated.View style={[styles.textContainer, animatedTextStyle]}>
            <Text style={styles.title}>{currentSlideData.title}</Text>
            <Text style={[styles.subtitle, { color: currentSlideData.color }]}>
              {currentSlideData.subtitle}
            </Text>
            <Text style={styles.description}>{currentSlideData.description}</Text>
          </Animated.View>
        </Animated.View>

        {/* Footer */}
        {currentSlide === welcomeSlides.length - 1 ? (
          <Animated.View 
            style={styles.authFooter}
            entering={FadeIn.delay(300)}
          >
            <Animated.View entering={SlideInRight.delay(400)}>
              <TouchableOpacity
                style={[styles.signupButton, { backgroundColor: currentSlideData.color }]}
                onPress={handleSignup}
              >
                <ThemedText style={styles.authButtonText}>Criar Conta</ThemedText>
              </TouchableOpacity>
            </Animated.View>
            
            <Animated.View entering={SlideInRight.delay(500)}>
              <TouchableOpacity
                style={[styles.loginButton, { borderColor: currentSlideData.color }]}
                onPress={handleLogin}
              >
                <ThemedText style={[styles.loginButtonText, { color: currentSlideData.color }]}>
                  Já tenho conta
                </ThemedText>
              </TouchableOpacity>
            </Animated.View>
          </Animated.View>
        ) : (
          <Animated.View 
            style={styles.footer}
            entering={FadeIn.delay(400)}
          >
            <TouchableOpacity
              style={[styles.navButton, { opacity: currentSlide === 0 ? 0.3 : 1 }]}
              onPress={prevSlide}
              disabled={currentSlide === 0}
            >
              <AntDesign name="left" size={24} color={currentSlideData.color} />
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.navButton, { opacity: currentSlide === welcomeSlides.length - 1 ? 0.3 : 1 }]}
              onPress={nextSlide}
              disabled={currentSlide === welcomeSlides.length - 1}
            >
              <AntDesign name="right" size={24} color={currentSlideData.color} />
            </TouchableOpacity>
          </Animated.View>
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
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  skipText: {
    fontSize: 16,
    color: '#666666',
    fontWeight: '600',
  },
  slideContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    width: 140,
    height: 140,
    borderRadius: 70,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
    borderWidth: 3,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  iconEmoji: {
    fontSize: 64,
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  textContainer: {
    alignItems: 'center',
    maxWidth: width * 0.85,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: '300',
    color: '#333333',
    textAlign: 'center',
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 34,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 24,
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
    letterSpacing: 0.5,
  },
  description: {
    fontSize: 18,
    color: '#666666',
    textAlign: 'center',
    lineHeight: 28,
    maxWidth: width * 0.8,
    fontWeight: '400',
    letterSpacing: 0.3,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 32,
  },
  navButton: {
    width: 52,
    height: 52,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 26,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 4,
  },
  nextButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 36,
    paddingVertical: 18,
    borderRadius: 30,
    gap: 10,
    minWidth: 160,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 8,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  nextButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  authFooter: {
    paddingVertical: 24,
    paddingHorizontal: 8,
    gap: 18,
  },
  signupButton: {
    borderRadius: 16,
    paddingVertical: 18,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 8,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  authButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  loginButton: {
    borderRadius: 16,
    paddingVertical: 18,
    alignItems: 'center',
    borderWidth: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  loginButtonText: {
    fontSize: 18,
    fontWeight: '600',
    letterSpacing: 0.5,
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
