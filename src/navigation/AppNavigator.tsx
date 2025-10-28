import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import ForgotPasswordScreen from '../screens/authScreens/ForgetPasswordScreen';
import LoginScreen from '../screens/authScreens/LoginScreen';
import SignupScreen from '../screens/authScreens/SignupScreen';
import RegisterScreen from '../screens/Product_portal/Components/RegisterScreen';
import XRGI_System from '../screens/Product_portal/XRGI-System';
import ServiceDashboardScreen from '../screens/Service_portal/DashboardScreen';
import StepperScreen from '../screens/authScreens/StepperScreen';
import HomeScreen from '../screens/common/HomeScreen';

export type PortalType = 'PRODUCT' | 'SERVICE';

export type RootStackParamList = {
  PortalSelection: undefined;
  Login: { portalType: PortalType };
  ForgotPassword: { portalType: PortalType };
  SignUp: { portalType: PortalType };
  ProductDashboard: undefined;
  ServiceDashboard: undefined;
  Register: undefined;
  Stepper: undefined;
  Home: undefined;
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
    </Stack.Navigator>
    </NavigationContainer>
  );
}