import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';

export type RootStackParamList = {
  Login: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen 
        name="Login" 
        component={LoginScreen} 
        options={{ headerShown: false }} 
      />
    </Stack.Navigator>
  );
}
