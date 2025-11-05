import { AntDesign, Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import {
  Alert,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { useUser } from '@/contexts/UserContext';

const { width } = Dimensions.get('window');

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { completeWelcome } = useUser();

  const handleClose = () => {
    router.back();
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleLogin = async () => {
    router.replace('/(tabs)');
    if (!email.trim()) {
      Alert.alert('Erro', 'Por favor, insira seu email.');
      return;
    }

    if (!validateEmail(email)) {
      Alert.alert('Erro', 'Por favor, insira um email válido.');
      return;
    }

    if (!password.trim()) {
      Alert.alert('Erro', 'Por favor, insira sua senha.');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Erro', 'A senha deve ter pelo menos 6 caracteres.');
      return;
    }

    setIsLoading(true);

    // Simular login (aqui você adicionaria a lógica real de autenticação)
    setTimeout(() => {
      setIsLoading(false);
      completeWelcome();
      router.replace('/(tabs)');
    }, 1500);
  };

  const handleForgotPassword = () => {
    Alert.alert(
      'Recuperar Senha',
      'Um email com instruções para redefinir sua senha será enviado para: ' + email,
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Enviar', onPress: () => Alert.alert('Sucesso', 'Email enviado!') }
      ]
    );
  };

  const goToSignup = () => {
    router.push('./signup' as any);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <ThemedView style={styles.content}>
            <View style={styles.header}>
              <TouchableOpacity 
                style={styles.backButton}
                onPress={handleClose}
              >
                <AntDesign name="left" size={24} color={Colors.light.text} />
              </TouchableOpacity>
            </View>

            <View style={styles.logoContainer}>
              <View style={styles.logoIcon}>
                <Text style={styles.logoEmoji}>🎯</Text>
              </View>
              <Text style={styles.title}>Entrar</Text>
              <Text style={styles.subtitle}>
                Bem-vindo de volta! Entre para continuar sua jornada.
              </Text>
            </View>

            {/* Form */}
            <View style={styles.form}>
              {/* Email Input */}
              <View style={styles.inputContainer}>
                <ThemedText style={styles.label}>Email</ThemedText>
                <View style={styles.inputWrapper}>
                  <Ionicons 
                    name="mail-outline" 
                    size={20} 
                    color={Colors.light.gray} 
                    style={styles.inputIcon} 
                  />
                  <TextInput
                    style={styles.textInput}
                    placeholder="Digite seu email"
                    placeholderTextColor={Colors.light.gray}
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                </View>
              </View>

              <View style={styles.inputContainer}>
                <ThemedText style={styles.label}>Senha</ThemedText>
                <View style={styles.inputWrapper}>
                  <Ionicons 
                    name="lock-closed-outline" 
                    size={20} 
                    color={Colors.light.gray} 
                    style={styles.inputIcon} 
                  />
                  <TextInput
                    style={[styles.textInput, styles.passwordInput]}
                    placeholder="Digite sua senha"
                    placeholderTextColor={Colors.light.gray}
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!showPassword}
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                  <TouchableOpacity
                    style={styles.eyeButton}
                    onPress={() => setShowPassword(!showPassword)}
                  >
                    <Ionicons 
                      name={showPassword ? "eye-outline" : "eye-off-outline"} 
                      size={20} 
                      color={Colors.light.gray} 
                    />
                  </TouchableOpacity>
                </View>
              </View>

              {/* Forgot Password */}
              <TouchableOpacity 
                style={styles.forgotPassword}
                onPress={handleForgotPassword}
              >
                <ThemedText style={styles.forgotPasswordText}>
                  Esqueceu sua senha?
                </ThemedText>
              </TouchableOpacity>

              {/* Login Button */}
              <TouchableOpacity
                style={[
                  styles.loginButton,
                  { backgroundColor: Colors.light.tint },
                  isLoading && styles.loginButtonDisabled
                ]}
                onPress={handleLogin}
                disabled={isLoading}
              >
                {isLoading ? (
                  <ThemedText style={styles.loginButtonText}>Entrando...</ThemedText>
                ) : (
                  <ThemedText style={styles.loginButtonText}>Entrar</ThemedText>
                )}
              </TouchableOpacity>

              {/* Divider */}
              <View style={styles.divider}>
                <View style={styles.dividerLine} />
                <ThemedText style={styles.dividerText}>ou</ThemedText>
                <View style={styles.dividerLine} />
              </View>

              {/* Social Login Buttons */}
              <View style={styles.socialButtons}>
                <TouchableOpacity style={styles.socialButton}>
                  <AntDesign name="google" size={20} color="#DB4437" />
                  <ThemedText style={styles.socialButtonText}>Google</ThemedText>
                </TouchableOpacity>

                <TouchableOpacity style={styles.socialButton}>
                  <Ionicons name="logo-apple" size={20} color="#000000" />
                  <ThemedText style={styles.socialButtonText}>Apple</ThemedText>
                </TouchableOpacity>
              </View>
            </View>

            {/* Footer */}
            <View style={styles.footer}>
              <ThemedText style={styles.footerText}>
                Não tem uma conta?{' '}
              </ThemedText>
              <TouchableOpacity onPress={goToSignup}>
                <ThemedText style={[styles.footerLink, { color: Colors.light.tint }]}>
                  Cadastre-se
                </ThemedText>
              </TouchableOpacity>
            </View>
          </ThemedView>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  header: {
    paddingTop: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: Colors.light.background,
  },
  logoContainer: {
    alignItems: 'center',
  },
  logoIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.light.tint + '20',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  logoEmoji: {
    fontSize: 32,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: Colors.light.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.light.gray,
    textAlign: 'center',
    maxWidth: width * 0.8,
  },
  form: {
    flex: 1,
    paddingVertical: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.light.text,
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.light.background,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: Colors.light.lightGray,
  },
  inputIcon: {
    marginRight: 12,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: Colors.light.text,
    paddingVertical: 12,
  },
  passwordInput: {
    paddingRight: 12,
  },
  eyeButton: {
    padding: 4,
  },
  forgotPassword: {
    alignItems: 'flex-end',
    marginBottom: 32,
  },
  forgotPasswordText: {
    fontSize: 14,
    color: Colors.light.tint,
    fontWeight: '500',
  },
  loginButton: {
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 24,
  },
  loginButtonDisabled: {
    opacity: 0.6,
  },
  loginButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.light.lightGray,
  },
  dividerText: {
    fontSize: 14,
    color: Colors.light.gray,
    marginHorizontal: 16,
  },
  socialButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  socialButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.light.background,
    borderRadius: 12,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: Colors.light.lightGray,
    gap: 8,
  },
  socialButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.light.text,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 30,
  },
  footerText: {
    fontSize: 16,
    color: Colors.light.gray,
  },
  footerLink: {
    fontSize: 16,
    fontWeight: '600',
  },
});
