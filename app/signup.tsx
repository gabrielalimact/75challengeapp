import { AntDesign, Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
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

  const handleClose = () => {
    router.back();
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const formatPhone = (text: string) => {
    const numbers = text.replace(/\D/g, '');
    
    if (numbers.length <= 11) {
      const formatted = numbers.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
      return formatted;
    }
    return text;
  };

  const formatBirthDate = (date: Date) => {
    return date.toLocaleDateString('en-US');
  };

  const handleSignup = async () => {
    router.replace('/(tabs)');

    // if (!name.trim()) {
    //   Alert.alert('Error', 'Please enter your full name.');
    //   return;
    // }

    // if (!email.trim()) {
    //   Alert.alert('Error', 'Please enter your email.');
    //   return;
    // }

    // if (!validateEmail(email)) {
    //   Alert.alert('Error', 'Please enter a valid email.');
    //   return;
    // }

    // if (!phone.trim()) {
    //   Alert.alert('Error', 'Please enter your phone number.');
    //   return;
    // }

    // if (!password.trim()) {
    //   Alert.alert('Error', 'Please enter a password.');
    //   return;
    // }

    // if (password.length < 6) {
    //   Alert.alert('Error', 'Password must have at least 6 characters.');
    //   return;
    // }

    // if (password !== confirmPassword) {
    //   Alert.alert('Error', 'Passwords do not match.');
    //   return;
    // }

    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    // if (age < 18 || (age === 18 && monthDiff < 0)) {
    //   Alert.alert('Error', 'You must be at least 18 years old to sign up.');
    //   return;
    // }

    setIsLoading(true);

    setTimeout(() => {
      updateUser({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        phone: phone.trim(),
      });
      
      setIsLoading(false);
      completeWelcome();
      
      Alert.alert(
        'Success!', 
        'Account created successfully! Welcome to the 75 Challenge App!',
        [
          { text: 'OK', onPress: () => router.replace('/(tabs)') }
        ]
      );
    }, 1500);
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
                onPress={handleClose}
              >
                <AntDesign name="left" size={24} color={Colors.light.text} />
              </TouchableOpacity>
            </View>

            {/* Logo and Title */}
            <View style={styles.logoContainer}>
              <View style={styles.logoIcon}>
                <Text style={styles.logoEmoji}>🎯</Text>
              </View>
              <Text style={styles.title}>Create Account</Text>
              <Text style={styles.subtitle}>
                Join thousands of people transforming their lives!
              </Text>
            </View>

            {/* Form */}
            <View style={styles.form}>
              {/* Name */}
              <View style={styles.inputContainer}>
                <ThemedText style={styles.label}>Full Name</ThemedText>
                <View style={styles.inputWrapper}>
                  <Ionicons 
                    name="person-outline" 
                    size={20} 
                    color={Colors.light.gray} 
                    style={styles.inputIcon} 
                  />
                  <TextInput
                    style={styles.textInput}
                    placeholder="Enter your full name"
                    placeholderTextColor={Colors.light.gray}
                    value={name}
                    onChangeText={setName}
                    autoCapitalize="words"
                    autoCorrect={false}
                  />
                </View>
              </View>

              {/* Email */}
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
                    placeholder="Enter your email"
                    placeholderTextColor={Colors.light.gray}
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                </View>
              </View>

              {/* Phone */}
              <View style={styles.inputContainer}>
                <ThemedText style={styles.label}>Phone</ThemedText>
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

              {/* Birth Date */}
              <View style={styles.inputContainer}>
                <ThemedText style={styles.label}>Birth Date</ThemedText>
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

              {/* Password */}
              <View style={styles.inputContainer}>
                <ThemedText style={styles.label}>Password</ThemedText>
                <View style={styles.inputWrapper}>
                  <Ionicons 
                    name="lock-closed-outline" 
                    size={20} 
                    color={Colors.light.gray} 
                    style={styles.inputIcon} 
                  />
                  <TextInput
                    style={[styles.textInput, styles.passwordInput]}
                    placeholder="Minimum 6 characters"
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

              {/* Confirm Password */}
              <View style={styles.inputContainer}>
                <ThemedText style={styles.label}>Confirm Password</ThemedText>
                <View style={styles.inputWrapper}>
                  <Ionicons 
                    name="lock-closed-outline" 
                    size={20} 
                    color={Colors.light.gray} 
                    style={styles.inputIcon} 
                  />
                  <TextInput
                    style={[styles.textInput, styles.passwordInput]}
                    placeholder="Repeat your password"
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

              {/* Terms */}
              <View style={styles.termsContainer}>
                <ThemedText style={styles.termsText}>
                  By creating an account, you agree to our{' '}
                  <ThemedText style={[styles.termsLink, { color: Colors.light.tint }]}>
                    Terms of Use
                  </ThemedText>
                  {' '}and{' '}
                  <ThemedText style={[styles.termsLink, { color: Colors.light.tint }]}>
                    Privacy Policy
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
                  <ThemedText style={styles.signupButtonText}>Creating account...</ThemedText>
                ) : (
                  <ThemedText style={styles.signupButtonText}>Sign Up</ThemedText>
                )}
              </TouchableOpacity>
            </View>

            {/* Footer */}
            <View style={styles.footer}>
              <ThemedText style={styles.footerText}>
                Already have an account?{' '}
              </ThemedText>
              <TouchableOpacity onPress={goToLogin}>
                <ThemedText style={[styles.footerLink, { color: Colors.light.tint }]}>
                  Log in
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
                    Cancel
                  </ThemedText>
                </TouchableOpacity>
                <ThemedText style={styles.modalTitle}>
                  Birth Date
                </ThemedText>
                <TouchableOpacity onPress={confirmDateSelection}>
                  <ThemedText style={[styles.modalButton, styles.confirmButton]}>
                    Confirm
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
  },
  datePicker: {
    width: '100%',
  },
});
