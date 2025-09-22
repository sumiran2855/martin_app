import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './LoginScreen.styles';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/AppNavigator';

interface SignupScreenProps { }

const SignupScreen: React.FC<SignupScreenProps> = () => {
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [countryCode, setCountryCode] = useState<string>('+49');
  const [showCountryPicker, setShowCountryPicker] = useState<boolean>(false);
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<'signup' | 'verification'>('signup');
  const [verificationCode, setVerificationCode] = useState<string>('');
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleSignup = (): void => {
    console.log('Signup pressed', {
      firstName,
      lastName,
      email,
      countryCode,
      phoneNumber,
      password,
      confirmPassword
    });
    setCurrentStep('verification');
  };

  const handleVerifyCode = (): void => {
    console.log('Verify code pressed', {
      email,
      verificationCode,
    });
    (navigation as any).navigate({ name: 'Login', params: { portalType: 'user' } });
  };

  const handleBackToLogin = (): void => {
    navigation.goBack();
  };

  const togglePasswordVisibility = (): void => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const toggleConfirmPasswordVisibility = (): void => {
    setIsConfirmPasswordVisible(!isConfirmPasswordVisible);
  };

  const countryCodes = [
    { label: 'United States (+1)', value: '+1' },
    { label: 'India (+91)', value: '+91' },
    { label: 'Germany (+49)', value: '+49' },
    { label: 'France (+33)', value: '+33' },
  ];

  const renderSignupStep = () => (
    <>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Create Account</Text>
        <Text style={styles.subtitle}>
          Fill in the details below to create{'\n'}your new account
        </Text>
      </View>

      {/* Name Fields */}
      <View style={styles.nameContainer}>
        <View style={styles.nameField}>
          <Text style={styles.label}>First Name</Text>
          <TextInput
            style={styles.input}
            value={firstName}
            onChangeText={setFirstName}
            placeholder="First name"
            placeholderTextColor="#9ca3af"
            autoCapitalize="words"
            autoCorrect={false}
          />
        </View>

        <View style={styles.nameField}>
          <Text style={styles.label}>Last Name</Text>
          <TextInput
            style={styles.input}
            value={lastName}
            onChangeText={setLastName}
            placeholder="Last name"
            placeholderTextColor="#9ca3af"
            autoCapitalize="words"
            autoCorrect={false}
          />
        </View>
      </View>

      {/* Email Field */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email Address</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="Enter your email"
          placeholderTextColor="#9ca3af"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
        />
      </View>

      {/* Phone Number Field */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Phone Number</Text>
        <View style={styles.phoneContainer}>
          <TouchableOpacity
            style={styles.countryCodeButton}
            onPress={() => setShowCountryPicker(!showCountryPicker)}
          >
            <Text style={styles.countryCodeText}>{countryCode}</Text>
            <Text style={styles.dropdownArrow}>▼</Text>
          </TouchableOpacity>

          {showCountryPicker && (
            <View style={styles.countryDropdown}>
              {countryCodes.map((country) => (
                <TouchableOpacity
                  key={country.value}
                  style={styles.countryOption}
                  onPress={() => {
                    setCountryCode(country.value);
                    setShowCountryPicker(false);
                  }}
                >
                  <Text style={styles.countryOptionText}>{country.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}

          <TextInput
            style={styles.phoneInput}
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            placeholder="Phone number"
            placeholderTextColor="#9ca3af"
            keyboardType="phone-pad"
            autoCorrect={false}
          />
        </View>
      </View>

      {/* Password Field */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Password</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            value={password}
            onChangeText={setPassword}
            placeholder="Enter your password"
            placeholderTextColor="#9ca3af"
            secureTextEntry={!isPasswordVisible}
            autoCapitalize="none"
            autoCorrect={false}
          />
          <TouchableOpacity
            style={styles.eyeButton}
            onPress={togglePasswordVisibility}
            activeOpacity={0.7}
          >
            <Text style={styles.eyeIcon}>
              {isPasswordVisible ? '👁️' : '👁️‍🗨️'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Confirm Password Field */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Confirm Password</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholder="Confirm your password"
            placeholderTextColor="#9ca3af"
            secureTextEntry={!isConfirmPasswordVisible}
            autoCapitalize="none"
            autoCorrect={false}
          />
          <TouchableOpacity
            style={styles.eyeButton}
            onPress={toggleConfirmPasswordVisibility}
            activeOpacity={0.7}
          >
            <Text style={styles.eyeIcon}>
              {isConfirmPasswordVisible ? '👁️' : '👁️‍🗨️'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Signup Button */}
      <TouchableOpacity
        style={styles.loginButton}
        onPress={handleSignup}
        activeOpacity={0.8}
      >
        <Text style={styles.loginButtonText}>Create Account</Text>
      </TouchableOpacity>

      {/* Footer - Back to Login */}
      <View style={styles.signupFooter}>
        <Text style={styles.alreadyHaveAccountText}>
          Already have an account?
        </Text>
        <TouchableOpacity
          onPress={handleBackToLogin}
          activeOpacity={0.7}
        >
          <Text style={styles.backToLoginText}>Back to Login</Text>
        </TouchableOpacity>
      </View>
    </>
  );

  const renderVerificationStep = () => (
    <>
      <View style={styles.header}>
        <Text style={styles.title}>Verify Your Email</Text>
        <Text style={styles.subtitle}>
          Enter the 6-digit code sent to your email{'\n'}to verify your account.
        </Text>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Verification Code</Text>
        <TextInput
          style={styles.input}
          value={verificationCode}
          onChangeText={setVerificationCode}
          placeholder="Enter 6-digit code"
          placeholderTextColor="#9ca3af"
          keyboardType="numeric"
          maxLength={6}
          autoCorrect={false}
        />
      </View>
      <TouchableOpacity
        style={styles.loginButton}
        onPress={handleVerifyCode}
        activeOpacity={0.8}
      >
        <Text style={styles.loginButtonText}>Verify</Text>
      </TouchableOpacity>
      <View style={styles.signupFooter}>
        <TouchableOpacity
          onPress={handleBackToLogin}
          activeOpacity={0.7}
        >
          <Text style={styles.backToLoginText}>Back to Login</Text>
        </TouchableOpacity>
      </View>
    </>
  );

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#1e3a8a" />
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <View style={styles.backgroundTop} />
          <View style={styles.backgroundBottom} />
          <View style={styles.form}>
            {currentStep === 'signup' ? renderSignupStep() : renderVerificationStep()}
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

export default SignupScreen;