import React from 'react';
import { View, Text } from 'react-native';
import styles from './DashboardScreen.styles';

interface DashboardScreenProps {}

const DashboardScreen: React.FC<DashboardScreenProps> = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Welcome to the Service Dashboard!</Text>
    </View>
  );
};

export default DashboardScreen;