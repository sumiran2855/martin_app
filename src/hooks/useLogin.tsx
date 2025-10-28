import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/AppNavigator';
import { loginSchema, LoginFormData, loginDefaultValues } from '../validations/LoginValidation';

type LoginRouteProp = RouteProp<RootStackParamList, 'Login'>;

export const useLoginLogic = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [selectedLanguage, setSelectedLanguage] = useState<string>('en');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const navigation = useNavigation();
  const route = useRoute<LoginRouteProp>();
  const portalType = route.params?.portalType || 'PRODUCT';

  // Form management
  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isDirty },
    watch,
    setValue,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: loginDefaultValues,
    mode: 'onChange',
  });

  const rememberMe = watch('rememberMe');

  // Handler functions
  const handleLogin = async (data: LoginFormData): Promise<void> => {
    if (isSubmitting) return;

    setIsSubmitting(true);

    try {
      await new Promise((resolve: any) => setTimeout(resolve, 1000));
      (navigation as any).navigate('Home');
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setIsSubmitting(false);
    }
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
    setValue('rememberMe', !rememberMe, { shouldValidate: true });
  };

  const handleLanguageChange = (languageCode: string): void => {
    setSelectedLanguage(languageCode);
  };

  // Helper function to get error message
  const getErrorMessage = (fieldName: keyof LoginFormData): string | undefined => {
    return errors[fieldName]?.message;
  };

  return {
    // State
    isPasswordVisible,
    selectedLanguage,
    isSubmitting,
    portalType,
    rememberMe,
    
    // Form
    control,
    handleSubmit,
    errors,
    isValid,
    isDirty,
    
    // Handlers
    handleLogin,
    handleForgotPassword,
    handleCreateAccount,
    togglePasswordVisibility,
    toggleRememberMe,
    handleLanguageChange,
    getErrorMessage,
  };
};