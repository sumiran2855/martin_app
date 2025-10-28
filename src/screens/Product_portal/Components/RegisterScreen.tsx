import React, { useState, useEffect } from 'react';
import { Text, View, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  Installation: { formData: Omit<FormData, 'distributeHoursEvenly'> };
  // Add other screen params as needed
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Installation'>;
import styles from './RegisterScreen.styles';

// Types
interface MonthlyDistribution {
  month: string;
  percentage: string;
  hours: string;
}

interface CountryCode {
  flag: string;
  code: string;
  country: string;
}

interface FormData {
  systemName: string;
  xrgiIdNumber: string;
  selectedModel: string;
  systemAddress: string;
  systemPostcode: string;
  systemCity: string;
  systemCountry: string;
  hasServiceContract: boolean | null;
  serviceProviderName: string;
  serviceProviderEmail: string;
  serviceProviderPhone: string;
  serviceCountryCode: string;
  isSalesPartnerSame: boolean | null;
  salesPartnerName: string;
  salesPartnerEmail: string;
  salesPartnerPhone: string;
  salesCountryCode: string;
  isSystemInstalled: boolean;
  energyCheckPlus: boolean;
  expectedAnnualSavings: string;
  expectedCO2Savings: string;
  expectedOperatingHours: string;
  industry: string;
  recipientEmails: string;
  distributeHoursEvenly: boolean;
  monthlyDistribution: MonthlyDistribution[];
  installSmartPrice: boolean;
  installationTiming: string;
}

const RegisterScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();

  // Dropdown states
  const [showModelPicker, setShowModelPicker] = useState(false);
  const [showCountryPicker, setShowCountryPicker] = useState(false);
  const [showServiceCountryCodePicker, setShowServiceCountryCodePicker] = useState(false);
  const [showSalesCountryCodePicker, setShowSalesCountryCodePicker] = useState(false);

  // Form data
  const [formData, setFormData] = useState<Omit<FormData, 'distributeHoursEvenly'>>({
    systemName: '',
    xrgiIdNumber: '',
    selectedModel: '',
    systemAddress: '',
    systemPostcode: '',
    systemCity: '',
    systemCountry: '',
    hasServiceContract: null,
    serviceProviderName: '',
    serviceProviderEmail: '',
    serviceProviderPhone: '',
    serviceCountryCode: '+1',
    isSalesPartnerSame: null,
    salesPartnerName: '',
    salesPartnerEmail: '',
    salesPartnerPhone: '',
    salesCountryCode: '+1',
    isSystemInstalled: false,
    energyCheckPlus: false,
    expectedAnnualSavings: '',
    expectedCO2Savings: '',
    expectedOperatingHours: '',
    industry: '',
    recipientEmails: '',
    monthlyDistribution: [
      { month: 'January', percentage: '8.33', hours: '0' },
      { month: 'February', percentage: '8.33', hours: '0' },
      { month: 'March', percentage: '8.33', hours: '0' },
      { month: 'April', percentage: '8.33', hours: '0' },
      { month: 'May', percentage: '8.33', hours: '0' },
      { month: 'June', percentage: '8.33', hours: '0' },
      { month: 'July', percentage: '8.33', hours: '0' },
      { month: 'August', percentage: '8.33', hours: '0' },
      { month: 'September', percentage: '8.33', hours: '0' },
      { month: 'October', percentage: '8.33', hours: '0' },
      { month: 'November', percentage: '8.33', hours: '0' },
      { month: 'December', percentage: '8.33', hours: '0' },
    ],
    installSmartPrice: false,
    installationTiming: '',
  });

  const [monthlyErrors, setMonthlyErrors] = useState<string[]>([]);
  const [totalPercentageError, setTotalPercentageError] = useState('');

  // Data arrays
  const models = ['XRGI 15G', 'XRGI 20G', 'XRGI 15H', 'XRGI 20H'];
  const countries = ['United States', 'Canada', 'United Kingdom', 'Germany', 'France', 'Australia', 'India'];
  const industries = ['Residential', 'Commercial', 'Industrial', 'Healthcare', 'Education', 'Hospitality', 'Other'];
  const countryCodes: CountryCode[] = [
    { flag: '🇺🇸', code: '+1', country: 'United States' },
    { flag: '🇬🇧', code: '+44', country: 'United Kingdom' },
    { flag: '🇩🇪', code: '+49', country: 'Germany' },
    { flag: '🇫🇷', code: '+33', country: 'France' },
    { flag: '🇮🇳', code: '+91', country: 'India' },
  ];

  const updateFormData = (key: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };



  const validateStep1 = () => {
    if (!formData.systemName.trim()) {
      Alert.alert('Error', 'Please enter a system name');
      return false;
    }
    if (!formData.selectedModel) {
      Alert.alert('Error', 'Please select a model');
      return false;
    }
    if (!formData.xrgiIdNumber.trim() || formData.xrgiIdNumber.length !== 10) {
      Alert.alert('Error', 'Please enter a valid 10-digit XRGI ID Number');
      return false;
    }
    if (!formData.systemAddress.trim() || !formData.systemCity.trim() || !formData.systemCountry) {
      Alert.alert('Error', 'Please fill in all address fields');
      return false;
    }
    if (formData.hasServiceContract === null) {
      Alert.alert('Error', 'Please select if you have a service contract');
      return false;
    }
    if (formData.hasServiceContract) {
      if (!formData.serviceProviderName.trim() || !formData.serviceProviderEmail.trim() || !formData.serviceProviderPhone.trim()) {
        Alert.alert('Error', 'Please fill in all service provider details');
        return false;
      }
      if (formData.isSalesPartnerSame === null) {
        Alert.alert('Error', 'Please select if sales partner is same as service provider');
        return false;
      }
      if (formData.isSalesPartnerSame === false) {
        if (!formData.salesPartnerName.trim() || !formData.salesPartnerEmail.trim() || !formData.salesPartnerPhone.trim()) {
          Alert.alert('Error', 'Please fill in all sales partner details');
          return false;
        }
      }
    }
    return true;
  };

  const handleSubmit = () => {
    if (validateStep1()) {
      navigation.navigate('Installation', { formData });
    }
  };

    const handleBackPress = () => {
    navigation.goBack();
  };

  const Icon = MaterialIcons;

  return (
    <View style={styles.container}>

      <ScrollView style={styles.formContainer} showsVerticalScrollIndicator={false}>
              {/* Header with Back Button */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={handleBackPress}
          activeOpacity={0.7}
        >
          <Icon name="arrow-back" size={24} color="#1a5490" />
        </TouchableOpacity>
      </View>

        <View style={styles.headerSection}>
          <Text style={styles.title}>Register Your XRGI System</Text>
          <Text style={styles.subtitle}>
            If you do not have the system details, save for later at the bottom of the page
          </Text>
        </View>

        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Icon name="settings" size={24} color="#003D82" />
            <View style={styles.cardHeaderText}>
              <Text style={styles.cardTitle}>System Details</Text>
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>System name *</Text>
            <View style={styles.inputWrapper}>
              <Icon name="label" size={18} color="#999" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder='Enter the system name'
                placeholderTextColor="#999"
                value={formData.systemName}
                onChangeText={(text) => updateFormData('systemName', text)}
              />
            </View>
            <Text style={styles.helperText}>
              <Icon name="info-outline" size={12} color="#999" /> Example: "System in basement 01"
            </Text>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>XRGI ID Number *</Text>
            <View style={styles.inputWrapper}>
              <Icon name="fingerprint" size={18} color="#999" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Enter 10-digit XRGI ID"
                placeholderTextColor="#999"
                keyboardType="number-pad"
                maxLength={10}
                value={formData.xrgiIdNumber}
                onChangeText={(text) => updateFormData('xrgiIdNumber', text)}
              />
            </View>
            <Text style={styles.helperText}>
              <Icon name="info-outline" size={12} color="#999" /> The XRGI® ID is a 10 digit number located on the side of the IQ-Control Panel.
            </Text>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Select a Model *</Text>
            <TouchableOpacity
              style={styles.pickerContainer}
              onPress={() => setShowModelPicker(!showModelPicker)}
            >
              <View style={styles.pickerButton}>
                <Icon name="devices" size={18} color="#999" style={styles.inputIcon} />
                <Text style={formData.selectedModel ? styles.pickerText : styles.pickerPlaceholder}>
                  {formData.selectedModel || 'Choose your XRGI model'}
                </Text>
                <Icon
                  name={showModelPicker ? "expand-less" : "expand-more"}
                  size={24}
                  color="#666"
                />
              </View>
            </TouchableOpacity>
            {showModelPicker && (
              <View style={styles.dropdownOverlay}>
                {models.map((model, idx) => (
                  <TouchableOpacity
                    key={model}
                    style={[
                      styles.pickerOption,
                      idx === models.length - 1 && styles.pickerOptionLast
                    ]}
                    onPress={() => {
                      updateFormData('selectedModel', model);
                      setShowModelPicker(false);
                    }}
                  >
                    <Text style={styles.pickerOptionText}>{model}</Text>
                    {formData.selectedModel === model && (
                      <Icon name="check" size={20} color="#00B050" />
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            )}
            <Text style={styles.helperText}>
              <Icon name="info-outline" size={12} color="#999" /> The model is on the name plate on the back of the Power Unit
            </Text>
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Icon name="location-on" size={24} color="#003D82" />
            <View style={styles.cardHeaderText}>
              <Text style={styles.cardTitle}>XRGI® Site</Text>
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Address *</Text>
            <View style={styles.inputWrapper}>
              <Icon name="home" size={18} color="#999" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="XRGI® Site Address"
                placeholderTextColor="#999"
                value={formData.systemAddress}
                onChangeText={(text) => updateFormData('systemAddress', text)}
              />
            </View>
          </View>

          <View style={styles.inputRow}>
            <View style={[styles.inputGroup, styles.inputHalf]}>
              <Text style={styles.label}>Postcode *</Text>
              <TextInput
                style={styles.input}
                placeholder="Postcode"
                placeholderTextColor="#999"
                value={formData.systemPostcode}
                onChangeText={(text) => updateFormData('systemPostcode', text)}
              />
            </View>

            <View style={[styles.inputGroup, styles.inputHalf]}>
              <Text style={styles.label}>City *</Text>
              <TextInput
                style={styles.input}
                placeholder="City"
                placeholderTextColor="#999"
                value={formData.systemCity}
                onChangeText={(text) => updateFormData('systemCity', text)}
              />
            </View>
          </View>

          <View style={showCountryPicker ? styles.inputGroupActive : styles.inputGroup}>
            <Text style={styles.label}>Country *</Text>
            <TouchableOpacity
              style={styles.pickerButton}
              onPress={() => setShowCountryPicker(!showCountryPicker)}
            >
              <Icon name="public" size={18} color="#999" style={styles.pickerIcon} />
              <Text style={formData.systemCountry ? styles.pickerText : styles.pickerPlaceholder}>
                {formData.systemCountry || 'Select country'}
              </Text>
              <Icon
                name={showCountryPicker ? "expand-less" : "expand-more"}
                size={20}
                color="#666"
              />
            </TouchableOpacity>

            {showCountryPicker && (
              <View style={styles.dropdownOverlay}>
                <ScrollView style={styles.countryCodeList} nestedScrollEnabled>
                  {countries.map((countryItem) => (
                    <TouchableOpacity
                      key={countryItem}
                      style={styles.pickerOption}
                      onPress={() => {
                        updateFormData('systemCountry', countryItem);
                        setShowCountryPicker(false);
                      }}
                    >
                      <Text style={styles.pickerOptionText}>{countryItem}</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            )}
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Icon name="handshake" size={24} color="#003D82" />
            <View style={styles.cardHeaderText}>
              <Text style={styles.cardTitle}>Service Contract</Text>
            </View>
          </View>

          <Text style={styles.questionText}>
            Do you have a service contract for your XRGI® system ?
          </Text>
          <Text style={styles.cardSubtitle}>
            The information is required to grant your service partner access to our EC POWER Service Database.
          </Text>

          <View style={styles.toggleContainer}>
            <TouchableOpacity
              style={[
                styles.toggleButton,
                styles.toggleButtonLeft,
                formData.hasServiceContract === true && styles.toggleButtonActive,
              ]}
              onPress={() => updateFormData('hasServiceContract', true)}
            >
              <Icon
                name="check-circle"
                size={20}
                color={formData.hasServiceContract === true ? '#fff' : '#999'}
              />
              <Text
                style={[
                  styles.toggleButtonText,
                  formData.hasServiceContract === true && styles.toggleButtonTextActive,
                ]}
              >
                Yes
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.toggleButton,
                styles.toggleButtonRight,
                formData.hasServiceContract === false && styles.toggleButtonActive,
              ]}
              onPress={() => updateFormData('hasServiceContract', false)}
            >
              <Icon
                name="cancel"
                size={20}
                color={formData.hasServiceContract === false ? '#fff' : '#999'}
              />
              <Text
                style={[
                  styles.toggleButtonText,
                  formData.hasServiceContract === false && styles.toggleButtonTextActive,
                ]}
              >
                No
              </Text>
            </TouchableOpacity>
          </View>

          {formData.hasServiceContract === true && (
            <>
              <View style={styles.divider} />
              <Text style={styles.cardSubtitle}>Service Provider Details</Text>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Service Provider Name *</Text>
                <View style={styles.inputWrapper}>
                  <Icon name="business" size={18} color="#999" style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="Enter service provider name"
                    placeholderTextColor="#999"
                    value={formData.serviceProviderName}
                    onChangeText={(text) => updateFormData('serviceProviderName', text)}
                  />
                </View>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Email *</Text>
                <View style={styles.inputWrapper}>
                  <Icon name="email" size={18} color="#999" style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="provider@example.com"
                    placeholderTextColor="#999"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    value={formData.serviceProviderEmail}
                    onChangeText={(text) => updateFormData('serviceProviderEmail', text)}
                  />
                </View>
              </View>

              <View style={showServiceCountryCodePicker ? styles.inputGroupActive : styles.inputGroup}>
                <Text style={styles.label}>Phone *</Text>
                <View style={showServiceCountryCodePicker ? styles.phoneInputRowActive : styles.phoneInputRow}>
                  <TouchableOpacity
                    style={styles.countryCodeButton}
                    onPress={() => setShowServiceCountryCodePicker(!showServiceCountryCodePicker)}
                  >
                    <Text style={styles.countryCodeText}>
                      {countryCodes.find(c => c.code === formData.serviceCountryCode)?.flag} {formData.serviceCountryCode}
                    </Text>
                    <Icon
                      name={showServiceCountryCodePicker ? "expand-less" : "expand-more"}
                      size={20}
                      color="#666"
                    />
                  </TouchableOpacity>

                  <View style={styles.phoneInputWrapper}>
                    <TextInput
                      style={styles.phoneInput}
                      placeholder="Enter phone number"
                      placeholderTextColor="#999"
                      keyboardType="phone-pad"
                      maxLength={15}
                      value={formData.serviceProviderPhone}
                      onChangeText={(text) => {
                        const cleaned = text.replace(/[^0-9]/g, '');
                        updateFormData('serviceProviderPhone', cleaned);
                      }}
                    />
                  </View>
                </View>

                {showServiceCountryCodePicker && (
                  <View style={styles.dropdownOverlay}>
                    <ScrollView style={styles.countryCodeList} nestedScrollEnabled>
                      {countryCodes.map((country) => (
                        <TouchableOpacity
                          key={country.code}
                          style={styles.countryCodeOption}
                          onPress={() => {
                            updateFormData('serviceCountryCode', country.code);
                            setShowServiceCountryCodePicker(false);
                          }}
                        >
                          <Text style={styles.countryCodeOptionText}>
                            {country.flag} {country.code} ({country.country})
                          </Text>
                          {formData.serviceCountryCode === country.code && (
                            <Icon name="check" size={20} color="#00B050" />
                          )}
                        </TouchableOpacity>
                      ))}
                    </ScrollView>
                  </View>
                )}
              </View>

              <View style={styles.divider} />
              <Text style={styles.questionText}>
                Is your sales partner same as service contract provider?
              </Text>

              <View style={styles.toggleContainer}>
                <TouchableOpacity
                  style={[
                    styles.toggleButton,
                    styles.toggleButtonLeft,
                    formData.isSalesPartnerSame === true && styles.toggleButtonActive,
                  ]}
                  onPress={() => updateFormData('isSalesPartnerSame', true)}
                >
                  <Icon
                    name="check-circle"
                    size={20}
                    color={formData.isSalesPartnerSame === true ? '#fff' : '#999'}
                  />
                  <Text
                    style={[
                      styles.toggleButtonText,
                      formData.isSalesPartnerSame === true && styles.toggleButtonTextActive,
                    ]}
                  >
                    Yes
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.toggleButton,
                    styles.toggleButtonRight,
                    formData.isSalesPartnerSame === false && styles.toggleButtonActive,
                  ]}
                  onPress={() => updateFormData('isSalesPartnerSame', false)}
                >
                  <Icon
                    name="cancel"
                    size={20}
                    color={formData.isSalesPartnerSame === false ? '#fff' : '#999'}
                  />
                  <Text
                    style={[
                      styles.toggleButtonText,
                      formData.isSalesPartnerSame === false && styles.toggleButtonTextActive,
                    ]}
                  >
                    No
                  </Text>
                </TouchableOpacity>
              </View>

              {formData.isSalesPartnerSame === false && (
                <>
                  <View style={styles.divider} />
                  <Text style={styles.cardSubtitle}>Sales Partner Details</Text>

                  <View style={styles.inputGroup}>
                    <Text style={styles.label}>Sales Partner Name *</Text>
                    <View style={styles.inputWrapper}>
                      <Icon name="business" size={18} color="#999" style={styles.inputIcon} />
                      <TextInput
                        style={styles.input}
                        placeholder="Enter sales partner name"
                        placeholderTextColor="#999"
                        value={formData.salesPartnerName}
                        onChangeText={(text) => updateFormData('salesPartnerName', text)}
                      />
                    </View>
                  </View>

                  <View style={styles.inputGroup}>
                    <Text style={styles.label}>Email *</Text>
                    <View style={styles.inputWrapper}>
                      <Icon name="email" size={18} color="#999" style={styles.inputIcon} />
                      <TextInput
                        style={styles.input}
                        placeholder="sales@example.com"
                        placeholderTextColor="#999"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        value={formData.salesPartnerEmail}
                        onChangeText={(text) => updateFormData('salesPartnerEmail', text)}
                      />
                    </View>
                  </View>

                  <View style={showSalesCountryCodePicker ? styles.inputGroupActive : styles.inputGroup}>
                    <Text style={styles.label}>Phone *</Text>
                    <View style={showSalesCountryCodePicker ? styles.phoneInputRowActive : styles.phoneInputRow}>
                      <TouchableOpacity
                        style={styles.countryCodeButton}
                        onPress={() => setShowSalesCountryCodePicker(!showSalesCountryCodePicker)}
                      >
                        <Text style={styles.countryCodeText}>
                          {countryCodes.find(c => c.code === formData.salesCountryCode)?.flag} {formData.salesCountryCode}
                        </Text>
                        <Icon
                          name={showSalesCountryCodePicker ? "expand-less" : "expand-more"}
                          size={20}
                          color="#666"
                        />
                      </TouchableOpacity>

                      <View style={styles.phoneInputWrapper}>
                        <TextInput
                          style={styles.phoneInput}
                          placeholder="Enter phone number"
                          placeholderTextColor="#999"
                          keyboardType="phone-pad"
                          maxLength={15}
                          value={formData.salesPartnerPhone}
                          onChangeText={(text) => {
                            const cleaned = text.replace(/[^0-9]/g, '');
                            updateFormData('salesPartnerPhone', cleaned);
                          }}
                        />
                      </View>
                    </View>

                    {showSalesCountryCodePicker && (
                      <View style={styles.dropdownOverlay}>
                        <ScrollView style={styles.countryCodeList} nestedScrollEnabled>
                          {countryCodes.map((country) => (
                            <TouchableOpacity
                              key={country.code}
                              style={styles.countryCodeOption}
                              onPress={() => {
                                updateFormData('salesCountryCode', country.code);
                                setShowSalesCountryCodePicker(false);
                              }}
                            >
                              <Text style={styles.countryCodeOptionText}>
                                {country.flag} {country.code} ({country.country})
                              </Text>
                              {formData.salesCountryCode === country.code && (
                                <Icon name="check" size={20} color="#00B050" />
                              )}
                            </TouchableOpacity>
                          ))}
                        </ScrollView>
                      </View>
                    )}
                  </View>
                </>
              )}
            </>
          )}
        </View>

        <View style={styles.card}>
          <TouchableOpacity
            style={styles.checkboxCard}
            onPress={() => updateFormData('isSystemInstalled', !formData.isSystemInstalled)}
          >
            <View style={[styles.checkbox, formData.isSystemInstalled && styles.checkboxChecked]}>
              {formData.isSystemInstalled && <Icon name="check" size={16} color="#fff" />}
            </View>
            <View style={styles.checkboxContent}>
              <Text style={styles.checkboxLabel}>Is your system installed ?</Text>
              <Text style={styles.checkboxDescription}>Check this if your XRGI system is already set up</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.buttonPrimary}
            onPress={handleSubmit}
          >
            <Text style={styles.buttonPrimaryText}>Add Facility</Text>
            <Icon name="add-circle-outline" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default RegisterScreen;