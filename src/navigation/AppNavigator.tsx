import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import ForgotPasswordScreen from '../screens/authScreens/ForgetPasswordScreen';
import LoginScreen from '../screens/authScreens/LoginScreen';
import SignupScreen from '../screens/authScreens/SignupScreen';
import PortalSelectionScreen from '../screens/PortalSelectionScreen';
import RegisterScreen from '../screens/Product_portal/Components/RegisterScreen';
import ProductDashboardScreen from '../screens/Product_portal/DashboardScreen';
import ServiceDashboardScreen from '../screens/Service_portal/DashboardScreen';

export type PortalType = 'PRODUCT' | 'SERVICE';

export type RootStackParamList = {
  PortalSelection: undefined;
  Login: { portalType: PortalType };
  ForgotPassword: { portalType: PortalType };
  SignUp: { portalType: PortalType };
  ProductDashboard: undefined;
  ServiceDashboard: undefined;
  Register: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
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
      <Stack.Screen
        name="ProductDashboard"
        component={ProductDashboardScreen}
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
    </Stack.Navigator>
    </NavigationContainer>
  );
}