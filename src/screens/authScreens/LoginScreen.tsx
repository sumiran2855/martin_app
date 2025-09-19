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
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { HorizontalScrollLanguageSelector } from '../common/LanguageSelector';
import { languageStyles } from '../common/LanguageSelector.styles';

interface LoginScreenProps { }

type LoginRouteProp = RouteProp<RootStackParamList, 'Login'>;

const PORTAL_TITLES = {
  PRODUCT: 'EC POWER PRODUCT PORTAL',
  SERVICE: 'EC POWER SERVICE DATABASE',
};

const LoginScreen: React.FC<LoginScreenProps> = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [selectedLanguage, setSelectedLanguage] = useState<string>('en');

  const navigation = useNavigation();
  const route = useRoute<LoginRouteProp>();
  const portalType = route.params?.portalType || 'PRODUCT';

  const handleLogin = (): void => {
    console.log('Login pressed', {
      username,
      password,
      rememberMe,
      portalType,
      language: selectedLanguage
    });
  };

  const handleForgotPassword = (): void => {
    (navigation as any).navigate('ForgotPassword', { portalType });
  };

  const handleCreateAccount = (): void => {
    (navigation as any).navigate('SignUp', { portalType });
  };

  const togglePasswordVisibility = (): void => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const toggleRememberMe = (): void => {
    setRememberMe(!rememberMe);
  };

  const handleLanguageChange = (languageCode: string): void => {
    setSelectedLanguage(languageCode);
  };

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#1e3a8a" />
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <View style={styles.backgroundTop} />
          <View style={styles.backgroundBottom} />

          <View style={styles.form}>
            <View style={styles.header}>
              <Image
                source={require('../../assets/logo.png')}
                style={styles.logo}
                resizeMode="contain"
              />
              <Text style={styles.title}>{PORTAL_TITLES[portalType]}</Text>
              <Text style={styles.subtitle}>
                Enter your username and password{'\n'}to sign in your account
              </Text>
            </View>

            {/* Form */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Username</Text>
              <TextInput
                style={styles.input}
                value={username}
                onChangeText={setUsername}
                placeholder="Enter your username"
                placeholderTextColor="#9ca3af"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>

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

            {/* Login Button */}
            <TouchableOpacity
              style={styles.loginButton}
              onPress={handleLogin}
              activeOpacity={0.8}
            >
              <Text style={styles.loginButtonText}>Login</Text>
            </TouchableOpacity>

            {/* Footer Options */}
            <View style={styles.footer}>
              <TouchableOpacity
                style={styles.rememberMeContainer}
                onPress={toggleRememberMe}
                activeOpacity={0.7}
              >
                <View style={[styles.checkbox, rememberMe && styles.checkboxChecked]}>
                  {rememberMe && <Text style={styles.checkmark}>✓</Text>}
                </View>
                <Text style={styles.rememberMeText}>Remember Me</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={handleForgotPassword}
                activeOpacity={0.7}
              >
                <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
              </TouchableOpacity>
            </View>

            {/* Create Account */}
            <TouchableOpacity
              style={styles.createAccountContainer}
              onPress={handleCreateAccount}
              activeOpacity={0.7}
            >
              <Text style={styles.createAccountText}>
                Don't have an account?
                <Text style={styles.createAccountLink} onPress={handleCreateAccount}> Create Account</Text>
              </Text>
            </TouchableOpacity>

            {/* Language Selection */}
            <HorizontalScrollLanguageSelector
              selectedLanguage={selectedLanguage}
              onLanguageChange={handleLanguageChange}
              styles={languageStyles}
            />

          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

export default LoginScreen;