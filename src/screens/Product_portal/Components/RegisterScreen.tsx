import React, { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import styles from './RegisterScreen.styles';

interface RegisterScreenProps {}

const RegisterScreen: React.FC<RegisterScreenProps> = () => {
  const [systemName, setSystemName] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [xrgiId, setXrgiId] = useState('');
  const [address, setAddress] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [city, setCity] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [hasServiceContract, setHasServiceContract] = useState<boolean | null>(null);
  const [isSystemInstalled, setIsSystemInstalled] = useState(false);
  const [showModelDropdown, setShowModelDropdown] = useState(false);
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);

  const models = ['Model A', 'Model B', 'Model C', 'Model D'];
  const countries = ['United States', 'Canada', 'United Kingdom', 'Germany', 'France', 'Australia'];

  const handleAddFacility = () => {
    if (!systemName.trim()) {
      Alert.alert('Error', 'Please enter a system name');
      return;
    }
    if (!selectedModel) {
      Alert.alert('Error', 'Please select a model');
      return;
    }
    if (!xrgiId.trim()) {
      Alert.alert('Error', 'Please enter XRGI ID Number');
      return;
    }
    if (!address.trim() || !city.trim() || !selectedCountry) {
      Alert.alert('Error', 'Please fill in all address fields');
      return;
    }
    if (hasServiceContract === null) {
      Alert.alert('Error', 'Please select if you have a service contract');
      return;
    }

    Alert.alert('Success', 'XRGI System registered successfully!');
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Register Your XRGI System</Text>
          <Text style={styles.subtitle}>
            We have now created a login for you and your company. If you do not have the system details, you can always return later.
          </Text>
        </View>

        {/* XRGI System Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>XRGI® System Information</Text>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Name the system</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter name the system"
              value={systemName}
              onChangeText={setSystemName}
              placeholderTextColor="#999"
            />
            <Text style={styles.example}>Example: "System in basement 01"</Text>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Select Model</Text>
            <TouchableOpacity 
              style={styles.dropdown}
              onPress={() => setShowModelDropdown(!showModelDropdown)}
            >
              <Text style={[styles.dropdownText, !selectedModel && styles.placeholderText]}>
                {selectedModel || 'Select'}
              </Text>
              <Text style={styles.dropdownArrow}>▼</Text>
            </TouchableOpacity>
            {showModelDropdown && (
              <View style={styles.dropdownMenu}>
                {models.map((model, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.dropdownItem}
                    onPress={() => {
                      setSelectedModel(model);
                      setShowModelDropdown(false);
                    }}
                  >
                    <Text style={styles.dropdownItemText}>{model}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
            <Text style={styles.helperText}>
              The model is on the name plate on the back of the Power Unit
            </Text>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>XRGI ID Number</Text>
            <View style={styles.inputWithIcon}>
              <TextInput
                style={styles.input}
                placeholder="Enter XRGI ID Number"
                value={xrgiId}
                onChangeText={setXrgiId}
                placeholderTextColor="#999"
                keyboardType="numeric"
              />
              <TouchableOpacity style={styles.infoIcon}>
                <Text style={styles.infoIconText}>?</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.helperText}>
              The XRGI® ID is a 10 digit number located on the side of the iG-Control Panel
            </Text>
          </View>
        </View>

        {/* XRGI Site */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>XRGI® Site</Text>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Address</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Address"
              value={address}
              onChangeText={setAddress}
              placeholderTextColor="#999"
            />
            <Text style={styles.helperText}>
              Please enter the address at which your XRGI® system is located
            </Text>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Postal Code</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Postal Code"
              value={postalCode}
              onChangeText={setPostalCode}
              placeholderTextColor="#999"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>City</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter City"
              value={city}
              onChangeText={setCity}
              placeholderTextColor="#999"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Select Country</Text>
            <TouchableOpacity 
              style={styles.dropdown}
              onPress={() => setShowCountryDropdown(!showCountryDropdown)}
            >
              <Text style={[styles.dropdownText, !selectedCountry && styles.placeholderText]}>
                {selectedCountry || 'Select Country'}
              </Text>
              <Text style={styles.dropdownArrow}>▼</Text>
            </TouchableOpacity>
            {showCountryDropdown && (
              <View style={styles.dropdownMenu}>
                {countries.map((country, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.dropdownItem}
                    onPress={() => {
                      setSelectedCountry(country);
                      setShowCountryDropdown(false);
                    }}
                  >
                    <Text style={styles.dropdownItemText}>{country}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
        </View>

        {/* Service Contract */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Do you have a service contract for your XRGI® system?</Text>
          <Text style={styles.helperText}>
            The information is required to grant your service partner access to our EC POWER Service Database
          </Text>
          
          <View style={styles.buttonGroup}>
            <TouchableOpacity
              style={[
                styles.optionButton,
                hasServiceContract === true && styles.optionButtonSelected
              ]}
              onPress={() => setHasServiceContract(true)}
            >
              <Text style={[
                styles.optionButtonText,
                hasServiceContract === true && styles.optionButtonTextSelected
              ]}>
                Yes
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.optionButton,
                hasServiceContract === false && styles.optionButtonSelected
              ]}
              onPress={() => setHasServiceContract(false)}
            >
              <Text style={[
                styles.optionButtonText,
                hasServiceContract === false && styles.optionButtonTextSelected
              ]}>
                No
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Checkbox */}
        <TouchableOpacity 
          style={styles.checkboxContainer}
          onPress={() => setIsSystemInstalled(!isSystemInstalled)}
        >
          <View style={[styles.checkbox, isSystemInstalled && styles.checkboxChecked]}>
            {isSystemInstalled && <Text style={styles.checkmark}>✓</Text>}
          </View>
          <Text style={styles.checkboxLabel}>Is your system installed ?</Text>
        </TouchableOpacity>

        {/* Add Facility Button */}
        <TouchableOpacity style={styles.addButton} onPress={handleAddFacility}>
          <Text style={styles.addButtonText}>Add Facility</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default RegisterScreen;