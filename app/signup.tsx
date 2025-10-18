import { router } from 'expo-router';
import { useState } from 'react';
import { 
  Alert, 
  Dimensions, 
  KeyboardAvoidingView, 
  Modal,
  Platform, 
  ScrollView, 
  StyleSheet, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  View 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { useUser } from '@/contexts/UserContext';

const { width } = Dimensions.get('window');

export default function SignupScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [birthDate, setBirthDate] = useState(new Date());
  const [tempBirthDate, setTempBirthDate] = useState(new Date());
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { updateUser, completeWelcome } = useUser();

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const formatPhone = (text: string) => {
    // Remove tudo que não é número
    const numbers = text.replace(/\D/g, '');
    
    // Aplica a máscara (11) 99999-9999
    if (numbers.length <= 11) {
      const formatted = numbers.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
      return formatted;
    }
    return text;
  };

  const formatBirthDate = (date: Date) => {
    return date.toLocaleDateString('pt-BR');
  };

  const handleSignup = async () => {
    router.replace('/(tabs)');
  //   if (!name.trim()) {
  //     Alert.alert('Erro', 'Por favor, insira seu nome.');
  //     return;
  //   }

  //   if (!email.trim()) {
  //     Alert.alert('Erro', 'Por favor, insira seu email.');
  //     return;
  //   }

  //   if (!validateEmail(email)) {
  //     Alert.alert('Erro', 'Por favor, insira um email válido.');
  //     return;
  //   }

  //   if (!phone.trim()) {
  //     Alert.alert('Erro', 'Por favor, insira seu telefone.');
  //     return;
  //   }

  //   if (!password.trim()) {
  //     Alert.alert('Erro', 'Por favor, insira sua senha.');
  //     return;
  //   }

  //   if (password.length < 6) {
  //     Alert.alert('Erro', 'A senha deve ter pelo menos 6 caracteres.');
  //     return;
  //   }

  //   if (password !== confirmPassword) {
  //     Alert.alert('Erro', 'As senhas não coincidem.');
  //     return;
  //   }

  //   // Verificar se é maior de idade
  //   const today = new Date();
  //   const age = today.getFullYear() - birthDate.getFullYear();
  //   const monthDiff = today.getMonth() - birthDate.getMonth();
    
  //   if (age < 18 || (age === 18 && monthDiff < 0)) {
  //     Alert.alert('Erro', 'Você deve ter pelo menos 18 anos para se cadastrar.');
  //     return;
  //   }

  //   setIsLoading(true);

  //   // Simular cadastro (aqui você adicionaria a lógica real de registro)
  //   setTimeout(() => {
  //     // Atualizar dados do usuário
  //     updateUser({
  //       name: name.trim(),
  //       email: email.trim().toLowerCase(),
  //       phone: phone.trim(),
  //     });
      
  //     setIsLoading(false);
  //     completeWelcome();
      
  //     Alert.alert(
  //       'Sucesso!', 
  //       'Conta criada com sucesso! Bem-vindo ao 75 Challenge App!',
  //       [
  //         { text: 'OK', onPress: () => router.replace('/(tabs)') }
  //       ]
  //     );
  //   }, 1500);
  };


  const goToLogin = () => {
    router.push('./login' as any);
  };

  const onDateChange = (event: any, selectedDate?: Date) => {
    if (Platform.OS === 'android') {
      setShowDatePicker(false);
    }
    if (selectedDate) {
      setTempBirthDate(selectedDate);
    }
  };

  const confirmDateSelection = () => {
    setBirthDate(tempBirthDate);
    setShowDatePicker(false);
  };

  const cancelDateSelection = () => {
    setTempBirthDate(birthDate);
    setShowDatePicker(false);
  };

  const openDatePicker = () => {
    setTempBirthDate(birthDate);
    setShowDatePicker(true);
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
            {/* Header */}
            <View style={styles.header}>
              <TouchableOpacity 
                style={styles.backButton}
                onPress={() => router.back()}
              >
                <AntDesign name="left" size={24} color={Colors.light.text} />
              </TouchableOpacity>
            </View>

            {/* Logo e Título */}
            <View style={styles.logoContainer}>
              <View style={styles.logoIcon}>
                <Text style={styles.logoEmoji}>🎯</Text>
              </View>
              <Text style={styles.title}>Criar Conta</Text>
              <Text style={styles.subtitle}>
                Junte-se a milhares de pessoas transformando suas vidas!
              </Text>
            </View>

            {/* Form */}
            <View style={styles.form}>
              {/* Name Input */}
              <View style={styles.inputContainer}>
                <ThemedText style={styles.label}>Nome Completo</ThemedText>
                <View style={styles.inputWrapper}>
                  <Ionicons 
                    name="person-outline" 
                    size={20} 
                    color={Colors.light.gray} 
                    style={styles.inputIcon} 
                  />
                  <TextInput
                    style={styles.textInput}
                    placeholder="Digite seu nome completo"
                    placeholderTextColor={Colors.light.gray}
                    value={name}
                    onChangeText={setName}
                    autoCapitalize="words"
                    autoCorrect={false}
                  />
                </View>
              </View>

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

              {/* Phone Input */}
              <View style={styles.inputContainer}>
                <ThemedText style={styles.label}>Telefone</ThemedText>
                <View style={styles.inputWrapper}>
                  <Ionicons 
                    name="call-outline" 
                    size={20} 
                    color={Colors.light.gray} 
                    style={styles.inputIcon} 
                  />
                  <TextInput
                    style={styles.textInput}
                    placeholder="(11) 99999-9999"
                    placeholderTextColor={Colors.light.gray}
                    value={phone}
                    onChangeText={(text) => setPhone(formatPhone(text))}
                    keyboardType="phone-pad"
                    maxLength={15}
                  />
                </View>
              </View>

              {/* Birth Date Input */}
              <View style={styles.inputContainer}>
                <ThemedText style={styles.label}>Data de Nascimento</ThemedText>
                <TouchableOpacity 
                  style={styles.inputWrapper}
                  onPress={openDatePicker}
                >
                  <Ionicons 
                    name="calendar-outline" 
                    size={20} 
                    color={Colors.light.gray} 
                    style={styles.inputIcon} 
                  />
                  <ThemedText style={styles.dateText}>
                    {formatBirthDate(birthDate)}
                  </ThemedText>
                  <AntDesign name="down" size={16} color={Colors.light.gray} />
                </TouchableOpacity>
              </View>

              {/* Password Input */}
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
                    placeholder="Mínimo 6 caracteres"
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

              {/* Confirm Password Input */}
              <View style={styles.inputContainer}>
                <ThemedText style={styles.label}>Confirmar Senha</ThemedText>
                <View style={styles.inputWrapper}>
                  <Ionicons 
                    name="lock-closed-outline" 
                    size={20} 
                    color={Colors.light.gray} 
                    style={styles.inputIcon} 
                  />
                  <TextInput
                    style={[styles.textInput, styles.passwordInput]}
                    placeholder="Repita sua senha"
                    placeholderTextColor={Colors.light.gray}
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    secureTextEntry={!showConfirmPassword}
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                  <TouchableOpacity
                    style={styles.eyeButton}
                    onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    <Ionicons 
                      name={showConfirmPassword ? "eye-outline" : "eye-off-outline"} 
                      size={20} 
                      color={Colors.light.gray} 
                    />
                  </TouchableOpacity>
                </View>
              </View>

              {/* Terms and Conditions */}
              <View style={styles.termsContainer}>
                <ThemedText style={styles.termsText}>
                  Ao criar uma conta, você concorda com nossos{' '}
                  <ThemedText style={[styles.termsLink, { color: Colors.light.tint }]}>
                    Termos de Uso
                  </ThemedText>
                  {' '}e{' '}
                  <ThemedText style={[styles.termsLink, { color: Colors.light.tint }]}>
                    Política de Privacidade
                  </ThemedText>
                </ThemedText>
              </View>

              {/* Signup Button */}
              <TouchableOpacity
                style={[
                  styles.signupButton,
                  { backgroundColor: Colors.light.tint },
                  isLoading && styles.signupButtonDisabled
                ]}
                onPress={handleSignup}
                disabled={isLoading}
              >
                {isLoading ? (
                  <ThemedText style={styles.signupButtonText}>Criando conta...</ThemedText>
                ) : (
                  <ThemedText style={styles.signupButtonText}>Criar Conta</ThemedText>
                )}
              </TouchableOpacity>
            </View>

            {/* Footer */}
            <View style={styles.footer}>
              <ThemedText style={styles.footerText}>
                Já tem uma conta?{' '}
              </ThemedText>
              <TouchableOpacity onPress={goToLogin}>
                <ThemedText style={[styles.footerLink, { color: Colors.light.tint }]}>
                  Entrar
                </ThemedText>
              </TouchableOpacity>
            </View>
          </ThemedView>
        </ScrollView>

        {/* Date Picker Modal */}
        <Modal
          visible={showDatePicker}
          transparent={true}
          animationType="slide"
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <TouchableOpacity onPress={cancelDateSelection}>
                  <ThemedText style={[styles.modalButton, styles.cancelButton]}>
                    Cancelar
                  </ThemedText>
                </TouchableOpacity>
                <ThemedText style={styles.modalTitle}>
                  Data de Nascimento
                </ThemedText>
                <TouchableOpacity onPress={confirmDateSelection}>
                  <ThemedText style={[styles.modalButton, styles.confirmButton]}>
                    Confirmar
                  </ThemedText>
                </TouchableOpacity>
              </View>
              
              <View style={styles.datePickerContainer}>
                <DateTimePicker
                  value={tempBirthDate}
                  mode="date"
                  display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                  onChange={onDateChange}
                  maximumDate={new Date()}
                  minimumDate={new Date(1900, 0, 1)}
                  textColor={Colors.light.text}
                  style={styles.datePicker}
                />
              </View>
            </View>
          </View>
        </Modal>
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
    paddingVertical: 16,
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
    marginBottom: 20,
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
    marginBottom: 16,
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
  dateText: {
    flex: 1,
    fontSize: 16,
    color: Colors.light.text,
    paddingVertical: 12,
  },
  termsContainer: {
    marginBottom: 24,
    paddingHorizontal: 4,
  },
  termsText: {
    fontSize: 14,
    color: Colors.light.gray,
    lineHeight: 20,
    textAlign: 'center',
  },
  termsLink: {
    fontWeight: '600',
  },
  signupButton: {
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  signupButtonDisabled: {
    opacity: 0.6,
  },
  signupButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
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
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.lightGray,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.light.text,
  },
  modalButton: {
    fontSize: 16,
    paddingVertical: 4,
  },
  cancelButton: {
    color: Colors.light.gray,
  },
  confirmButton: {
    color: Colors.light.tint,
    fontWeight: '600',
  },
  datePickerContainer: {
    paddingHorizontal: 20,
    // paddingVertical: 20,
  },
  datePicker: {
    width: '100%',
    // height: 200,
  },
});
