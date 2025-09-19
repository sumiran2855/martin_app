import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList, PortalType } from '../navigation/AppNavigator';
import { portalStyles } from './PortalSelection.styles';

interface PortalSelectionScreenProps {}

const PortalSelectionScreen: React.FC<PortalSelectionScreenProps> = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handlePortalSelection = (portalType: PortalType): void => {
    navigation.navigate('Login', { portalType });
  };

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#1e3a8a" />
      <SafeAreaView style={portalStyles.container}>
        <View style={portalStyles.content}>
          <View style={portalStyles.backgroundTop} />
          <View style={portalStyles.backgroundBottom} />
          
          <View style={portalStyles.form}>
            <View style={portalStyles.header}>
              <Image
                source={require('../assets/logo.png')}
                style={portalStyles.logo}
                resizeMode="contain"
              />
              <Text style={portalStyles.title}>Welcome</Text>
              <Text style={portalStyles.subtitle}>
                Select your portal to continue
              </Text>
            </View>

            <View style={portalStyles.buttonContainer}>
              <TouchableOpacity
                style={portalStyles.portalButton}
                onPress={() => handlePortalSelection('PRODUCT')}
                activeOpacity={0.8}
              >
                <Text style={portalStyles.portalButtonText}>
                  EC POWER PRODUCT PORTAL
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={portalStyles.portalButton}
                onPress={() => handlePortalSelection('SERVICE')}
                activeOpacity={0.8}
              >
                <Text style={portalStyles.portalButtonText}>
                  EC POWER SERVICE DATABASE
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

export default PortalSelectionScreen;