import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/AppNavigator';
import {
  signupSchema,
  verificationSchema,
  SignupFormData,
  VerificationFormData,
  signupDefaultValues,
  verificationDefaultValues,
  countryCodes,
} from '../validations/LoginValidation';

export const useSignupLogic = () => {
  // State management
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<'signup' | 'verification'>('signup');
  const [showCountryPicker, setShowCountryPicker] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Navigation
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  // Signup form management
  const {
    control: signupControl,
    handleSubmit: handleSignupSubmit,
    formState: { errors: signupErrors, isValid: isSignupValid, isDirty: isSignupDirty },
    watch: signupWatch,
    setValue: setSignupValue,
    getValues: getSignupValues,
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: signupDefaultValues,
    mode: 'onChange',
  });

  // Verification form management
  const {
    control: verificationControl,
    handleSubmit: handleVerificationSubmit,
    formState: { errors: verificationErrors, isValid: isVerificationValid, isDirty: isVerificationDirty },
    watch: verificationWatch,
    setValue: setVerificationValue,
  } = useForm<VerificationFormData>({
    resolver: zodResolver(verificationSchema),
    defaultValues: verificationDefaultValues,
    mode: 'onChange',
  });

  // Watch form values
  const countryCode = signupWatch('countryCode');

  // Handler functions
  const handleSignup = async (data: SignupFormData): Promise<void> => {
    if (isSubmitting) return;

    setIsSubmitting(true);

    try {
      console.log('Signup pressed', data);
      // Simulate API call
      await new Promise((resolve:any) => setTimeout(resolve, 1000));
      setCurrentStep('verification');
    } catch (error) {
      console.error('Signup error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVerifyCode = async (data: VerificationFormData): Promise<void> => {
    if (isSubmitting) return;

    setIsSubmitting(true);

    try {
      const signupData = getSignupValues();
      console.log('Verify code pressed', {
        email: signupData.email,
        verificationCode: data.verificationCode,
      });
      // Simulate API call
      await new Promise((resolve:any) => setTimeout(resolve, 1000));
      (navigation as any).navigate({ name: 'Login', params: { portalType: 'user' } });
    } catch (error) {
      console.error('Verification error:', error);
    } finally {
      setIsSubmitting(false);
    }
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

  const handleCountryCodeSelect = (code: string): void => {
    setSignupValue('countryCode', code, { shouldValidate: true });
    setShowCountryPicker(false);
  };

  const toggleCountryPicker = (): void => {
    setShowCountryPicker(!showCountryPicker);
  };

  const handleBackToSignup = (): void => {
    setCurrentStep('signup');
  };

  // Helper function to get error message for signup form
  const getSignupErrorMessage = (fieldName: keyof SignupFormData): string | undefined => {
    return signupErrors[fieldName]?.message;
  };

  // Helper function to get error message for verification form
  const getVerificationErrorMessage = (fieldName: keyof VerificationFormData): string | undefined => {
    return verificationErrors[fieldName]?.message;
  };

  return {
    // State
    isPasswordVisible,
    isConfirmPasswordVisible,
    currentStep,
    showCountryPicker,
    isSubmitting,
    countryCode,

    // Signup form
    signupControl,
    handleSignupSubmit,
    signupErrors,
    isSignupValid,
    isSignupDirty,

    // Verification form
    verificationControl,
    handleVerificationSubmit,
    verificationErrors,
    isVerificationValid,
    isVerificationDirty,

    // Handlers
    handleSignup,
    handleVerifyCode,
    handleBackToLogin,
    handleBackToSignup,
    togglePasswordVisibility,
    toggleConfirmPasswordVisibility,
    handleCountryCodeSelect,
    toggleCountryPicker,
    getSignupErrorMessage,
    getVerificationErrorMessage,

    // Data
    countryCodes,
  };
};