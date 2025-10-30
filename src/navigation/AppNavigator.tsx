import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import ForgotPasswordScreen from '../screens/authScreens/ForgetPasswordScreen';
import LoginScreen from '../screens/authScreens/LoginScreen';
import SignupScreen from '../screens/authScreens/SignupScreen';
import StepperScreen from '../screens/authScreens/StepperScreen';
import { FormData } from '../screens/authScreens/types';
import HomeScreen from '../screens/common/HomeScreen';
import InstallationScreen from '../screens/Product_portal/Components/Register-XRGI/InstallationScreen';
import RegisterScreen from '../screens/Product_portal/Components/Register-XRGI/RegisterScreen';
import XRGI_System from '../screens/Product_portal/XRGI-System';
import ServiceDashboardScreen from '../screens/Service_portal/DashboardScreen';
import DetailScreen from '../screens/Product_portal/Components/XRGI-Details/DetailScreen';
import ServiceContractScreen from '../screens/Product_portal/ServiceContractScreen';

export type PortalType = 'PRODUCT' | 'SERVICE';

export type RootStackParamList = {
  PortalSelection: undefined;
  Login: { portalType: PortalType };
  ForgotPassword: { portalType: PortalType };
  SignUp: { portalType: PortalType };
  ProductDashboard: undefined;
  ServiceDashboard: undefined;
  Register: undefined;
  Installation: { formData: FormData };
  Stepper: undefined;
  Home: undefined;
  XRGI_Details: { item: any };
  ServiceContract: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ForgotPassword"
          component={ForgotPasswordScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignupScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ProductDashboard"
          component={XRGI_System}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ServiceDashboard"
          component={ServiceDashboardScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Stepper"
          component={StepperScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Installation"
          component={InstallationScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="XRGI_Details"
          component={DetailScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ServiceContract"
          component={ServiceContractScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}