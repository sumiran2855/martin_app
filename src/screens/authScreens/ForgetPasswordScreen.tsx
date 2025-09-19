import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './LoginScreen.styles';
import { useNavigation } from '@react-navigation/native';

interface ForgetPasswordScreenProps { }

const ForgetPasswordScreen: React.FC<ForgetPasswordScreenProps> = () => {
  const [email, setEmail] = useState<string>('');
  const [verificationCode, setVerificationCode] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [isNewPasswordVisible, setIsNewPasswordVisible] = useState<boolean>(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<'email' | 'verification'>('email');
  const navigation = useNavigation();

  const handleSendEmail = (): void => {
    console.log('Send email pressed', { email });
    setCurrentStep('verification');
  };

  const handleVerifyAndReset = (): void => {
    console.log('Verify and reset pressed', { 
      email, 
      verificationCode, 
      newPassword, 
      confirmPassword 
    });
    (navigation as any).navigate('Login');
  };

  const handleBackToLogin = (): void => {
    (navigation as any).navigate('Login');
  };

  const toggleNewPasswordVisibility = (): void => {
    setIsNewPasswordVisible(!isNewPasswordVisible);
  };

  const toggleConfirmPasswordVisibility = (): void => {
    setIsConfirmPasswordVisible(!isConfirmPasswordVisible);
  };

  const renderEmailStep = () => (
    <>
      <View style={styles.header}>
        <Image
          source={require('../../assets/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.title}>Forgot your password?</Text>
        <Text style={styles.subtitle}>
          To reset your password, enter the email address{'\n'}you use to sign in to this website.
        </Text>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email</Text>
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

      <TouchableOpacity
        style={styles.loginButton}
        onPress={handleSendEmail}
        activeOpacity={0.8}
      >
        <Text style={styles.loginButtonText}>Send</Text>
      </TouchableOpacity>

      <View style={styles.ForgetPasswordfooter}>
        <TouchableOpacity>
          <Text style={styles.createAccountText}>Remembered your Password?</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.ForgetPasswordfooter}>
        <TouchableOpacity
          onPress={handleBackToLogin}
          activeOpacity={0.7}
        >
          <Text style={styles.forgotPasswordText}>Back to Login</Text>
        </TouchableOpacity>
      </View>
    </>
  );

  const renderVerificationStep = () => (
    <>
      <View style={styles.header}>
        <Image
          source={require('../../assets/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.title}>Verify Your Email</Text>
        <Text style={styles.subtitle}>
          Enter the 6-digit code sent to your email{'\n'}and create a new password.
        </Text>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Verification Code</Text>
        <TextInput
          style={styles.verificationInput}
          value={verificationCode}
          onChangeText={setVerificationCode}
          placeholder="Enter 6-digit code"
          placeholderTextColor="#9ca3af"
          keyboardType="numeric"
          maxLength={6}
          autoCorrect={false}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>New Password</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            value={newPassword}
            onChangeText={setNewPassword}
            placeholder="Enter new password"
            placeholderTextColor="#9ca3af"
            secureTextEntry={!isNewPasswordVisible}
            autoCapitalize="none"
            autoCorrect={false}
          />
          <TouchableOpacity
            style={styles.eyeButton}
            onPress={toggleNewPasswordVisibility}
            activeOpacity={0.7}
          >
            <Text style={styles.eyeIcon}>
              {isNewPasswordVisible ? '👁️' : '👁️‍🗨️'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Confirm Password</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholder="Confirm new password"
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

      <TouchableOpacity
        style={styles.loginButton}
        onPress={handleVerifyAndReset}
        activeOpacity={0.8}
      >
        <Text style={styles.loginButtonText}>Reset Password</Text>
      </TouchableOpacity>

      <View style={styles.ForgetPasswordfooter}>
        <TouchableOpacity
          onPress={handleBackToLogin}
          activeOpacity={0.7}
        >
          <Text style={styles.forgotPasswordText}>Back to Login</Text>
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
            {currentStep === 'email' ? renderEmailStep() : renderVerificationStep()}
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

export default ForgetPasswordScreen;