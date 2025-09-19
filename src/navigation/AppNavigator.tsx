import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PortalSelectionScreen from '../screens/PortalSelectionScreen';
import LoginScreen from '../screens/authScreens/LoginScreen';
import ForgotPasswordScreen from '../screens/authScreens/ForgetPasswordScreen';
import SignupScreen from '../screens/authScreens/SignupScreen';

export type PortalType = 'PRODUCT' | 'SERVICE';

export type RootStackParamList = {
  PortalSelection: undefined;
  Login: { portalType: PortalType };
  ForgotPassword: { portalType: PortalType };
  SignUp: { portalType: PortalType };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="PortalSelection">
      <Stack.Screen
        name="PortalSelection"
        component={PortalSelectionScreen}
        options={{ headerShown: false }}
      />
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
    </Stack.Navigator>
  );
}