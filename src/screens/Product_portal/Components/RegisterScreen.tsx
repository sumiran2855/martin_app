import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { Alert, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import styles from './RegisterScreen.styles';
import { FormData } from '../../authScreens/types';
import { RootStackParamList } from '../../../navigation/AppNavigator';

type RegisterScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface CountryCode {
  flag: string;
  code: string;
  country: string;
}

const RegisterScreen: React.FC = () => {
  const navigation = useNavigation<RegisterScreenNavigationProp>();

  // Dropdown states
  const [showModelPicker, setShowModelPicker] = useState(false);
  const [showCountryPicker, setShowCountryPicker] = useState(false);
  const [showServiceCountryCodePicker, setShowServiceCountryCodePicker] = useState(false);
  const [showSalesCountryCodePicker, setShowSalesCountryCodePicker] = useState(false);
  const [showIndustryPicker, setShowIndustryPicker] = useState(false);

  // Form data
  const [formData, setFormData] = useState<FormData>({
    companyName: '',
    vatNo: '',
    address: '',
    postcode: '',
    city: '',
    email: '',
    phone: '',
    firstName: '',
    lastName: '',
    contactEmail: '',
    contactPhone: '',
    countryCode: '+1',
    contactCountryCode: '+1',
    systemName: '',
    xrgiIdNumber: '',
    selectedModel: '',
    systemAddress: '',
    systemPostcode: '',
    systemCity: '',
    systemCountry: '',
    hasServiceContract: null,
    interestedInServiceContract: null,
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
    distributeHoursEvenly: true,
    monthlyDistribution: [
      { month: 'January', percentage: '8.33', hours: '0', editable: true },
      { month: 'February', percentage: '8.33', hours: '0', editable: true },
      { month: 'March', percentage: '8.33', hours: '0', editable: true },
      { month: 'April', percentage: '8.33', hours: '0', editable: true },
      { month: 'May', percentage: '8.33', hours: '0', editable: true },
      { month: 'June', percentage: '8.33', hours: '0', editable: true },
      { month: 'July', percentage: '8.33', hours: '0', editable: true },
      { month: 'August', percentage: '8.33', hours: '0', editable: true },
      { month: 'September', percentage: '8.33', hours: '0', editable: true },
      { month: 'October', percentage: '8.33', hours: '0', editable: true },
      { month: 'November', percentage: '8.33', hours: '0', editable: true },
      { month: 'December', percentage: '8.33', hours: '0', editable: true },
    ],
    installSmartPrice: false,
    installationTiming: 'asap',
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

  const distributeHoursEvenly = () => {
    const totalHours = parseFloat(formData.expectedOperatingHours) || 0;
    const hoursPerMonth = totalHours / 12;
    const percentagePerMonth = (100 / 12);

    const newDistribution = formData.monthlyDistribution.map(month => ({
      ...month,
      hours: hoursPerMonth.toFixed(2),
      percentage: percentagePerMonth.toFixed(2),
    }));

    setFormData(prev => ({
      ...prev,
      monthlyDistribution: newDistribution,
    }));

    setMonthlyErrors(Array(12).fill(''));
    setTotalPercentageError('');
  };

  const validateMonthHours = (hours: number, index: number) => {
    const errors = [...monthlyErrors];
    if (hours > 730) {
      errors[index] = 'Hours cannot exceed 730 per month';
    } else {
      errors[index] = '';
    }
    setMonthlyErrors(errors);
  };

  const validateTotalPercentage = () => {
    const total = formData.monthlyDistribution.reduce((sum, month) => {
      return sum + (parseFloat(month.percentage) || 0);
    }, 0);

    if (total > 100) {
      setTotalPercentageError('Total percentage cannot exceed 100%');
    } else if (total < 100) {
      setTotalPercentageError('Total percentage should equal 100%');
    } else {
      setTotalPercentageError('');
    }
  };

  const updateMonthlyPercentage = (index: number, value: string) => {
    const totalHours = parseFloat(formData.expectedOperatingHours) || 0;
    const percentage = parseFloat(value) || 0;
    const hours = (totalHours * percentage) / 100;

    const newDistribution = [...formData.monthlyDistribution];
    newDistribution[index] = {
      ...newDistribution[index],
      percentage: value,
      hours: hours.toFixed(2),
    };

    setFormData(prev => ({
      ...prev,
      monthlyDistribution: newDistribution,
    }));

    validateMonthHours(hours, index);
    setTimeout(validateTotalPercentage, 0);
  };

  const calculateTotalHours = () => {
    const total = formData.monthlyDistribution.reduce((sum, month) => {
      const hours = parseFloat(month.hours) || 0;
      return sum + hours;
    }, 0);
    return `${total.toFixed(0)}h`;
  };

  const calculateTotalPercentage = () => {
    const total = formData.monthlyDistribution.reduce((sum, month) => {
      const percentage = parseFloat(month.percentage) || 0;
      return sum + percentage;
    }, 0);
    return `${total.toFixed(2)}%`;
  };

  return (
    <View style={styles.container}>
      {/* Update header with centered title */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={handleBackPress}
          activeOpacity={0.7}
        >
          <Icon name="arrow-back" size={24} color="#1a5490" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Register</Text>
        <View style={styles.backButton} /> {/* Empty view for spacing */}
      </View>

      <ScrollView style={styles.formContainer} showsVerticalScrollIndicator={false}>
        {/* Header with Back Button */}
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

          {/* Show "Interested in Service Contract" question when user selects NO */}
          {formData.hasServiceContract === false && (
            <>
              <View style={styles.divider} />
              <Text style={styles.questionText}>
                Are you interested in a service contract?
              </Text>

              <View style={styles.toggleContainer}>
                <TouchableOpacity
                  style={[
                    styles.toggleButton,
                    styles.toggleButtonLeft,
                    formData.interestedInServiceContract === true && styles.toggleButtonActive,
                  ]}
                  onPress={() => updateFormData('interestedInServiceContract', true)}
                >
                  <Icon
                    name="check-circle"
                    size={20}
                    color={formData.interestedInServiceContract === true ? '#fff' : '#999'}
                  />
                  <Text
                    style={[
                      styles.toggleButtonText,
                      formData.interestedInServiceContract === true && styles.toggleButtonTextActive,
                    ]}
                  >
                    Yes
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.toggleButton,
                    styles.toggleButtonRight,
                    formData.interestedInServiceContract === false && styles.toggleButtonActive,
                  ]}
                  onPress={() => updateFormData('interestedInServiceContract', false)}
                >
                  <Icon
                    name="cancel"
                    size={20}
                    color={formData.interestedInServiceContract === false ? '#fff' : '#999'}
                  />
                  <Text
                    style={[
                      styles.toggleButtonText,
                      formData.interestedInServiceContract === false && styles.toggleButtonTextActive,
                    ]}
                  >
                    No
                  </Text>
                </TouchableOpacity>
              </View>
            </>
          )}

          {/* Show service provider details when hasServiceContract is YES */}
          {formData.hasServiceContract === true && (
            <>
              <View style={styles.divider} />
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
                {/* {errors.serviceProviderName && (
                  <Text style={styles.errorText}>
                    <Icon name="error-outline" size={12} color="#EF4444" /> {errors.serviceProviderName}
                  </Text>
                )} */}
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
                {/* {errors.serviceProviderEmail && (
                  <Text style={styles.errorText}>
                    <Icon name="error-outline" size={12} color="#EF4444" /> {errors.serviceProviderEmail}
                  </Text>
                )} */}
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
                {/* {errors.serviceProviderPhone && (
                  <Text style={styles.errorText}>
                    <Icon name="error-outline" size={12} color="#EF4444" /> {errors.serviceProviderPhone}
                  </Text>
                )} */}

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
            </>
          )}

          {/* Show "Is sales partner same" question when hasServiceContract is YES OR interestedInServiceContract is YES */}
          {(formData.hasServiceContract === true || formData.interestedInServiceContract === true) && (
            <>
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

              {/* Show sales partner details when isSalesPartnerSame is NO */}
              {formData.isSalesPartnerSame === false && (
                <>
                  <View style={styles.divider} />
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
                    {/* {errors.salesPartnerName && (
                      <Text style={styles.errorText}>
                        <Icon name="error-outline" size={12} color="#EF4444" /> {errors.salesPartnerName}
                      </Text>
                    )} */}
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
                    {/* {errors.salesPartnerEmail && (
                      <Text style={styles.errorText}>
                        <Icon name="error-outline" size={12} color="#EF4444" /> {errors.salesPartnerEmail}
                      </Text>
                    )} */}
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
                    {/* {errors.salesPartnerPhone && (
                      <Text style={styles.errorText}>
                        <Icon name="error-outline" size={12} color="#EF4444" /> {errors.salesPartnerPhone}
                      </Text>
                    )} */}

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

        {formData.isSystemInstalled && (
          <>
            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <Icon name="analytics" size={24} color="#003D82" />
                <View style={styles.cardHeaderText}>
                  <Text style={styles.cardTitle}>EnergyCheck Plus</Text>
                </View>
              </View>
              <Text style={styles.cardSubtitle}>
                Get a monthly overview of how much you have saved with your XRGI System
              </Text>

              <TouchableOpacity
                style={styles.featureCard}
                onPress={() => updateFormData('energyCheckPlus', !formData.energyCheckPlus)}
              >
                <View style={[styles.checkbox, formData.energyCheckPlus && styles.checkboxChecked]}>
                  {formData.energyCheckPlus && <Icon name="check" size={16} color="#fff" />}
                </View>
                <View style={styles.checkboxContent}>
                  <Text style={styles.checkboxLabel}>Enable EnergyCheck Plus</Text>
                </View>
              </TouchableOpacity>

              {formData.energyCheckPlus && (
                <>
                  <Text style={styles.checkboxDescription}>
                    We will compare the actual running hours of your XRGI® system to the expected running hours
                  </Text>
                  <Text style={styles.checkboxDescription}>
                    Please find the values in your initial quote* and fill in below
                  </Text>
                  <View style={styles.divider} />

                  <View style={styles.inputGroup}>
                    <Text style={styles.label}>Expected annual savings</Text>
                    <View style={styles.inputWrapper}>
                      <Icon name="euro" size={18} color="#999" style={styles.inputIcon} />
                      <TextInput
                        style={styles.input}
                        placeholder="Amount in Euro per year"
                        placeholderTextColor="#999"
                        keyboardType="numeric"
                        value={formData.expectedAnnualSavings}
                        onChangeText={(text) => updateFormData('expectedAnnualSavings', text)}
                      />
                    </View>
                  </View>

                  <View style={styles.inputGroup}>
                    <Text style={styles.label}>Expected annual CO₂ savings</Text>
                    <View style={styles.inputWrapper}>
                      <Icon name="eco" size={18} color="#999" style={styles.inputIcon} />
                      <TextInput
                        style={styles.input}
                        placeholder="Total per year"
                        placeholderTextColor="#999"
                        keyboardType="numeric"
                        value={formData.expectedCO2Savings}
                        onChangeText={(text) => updateFormData('expectedCO2Savings', text)}
                      />
                    </View>
                  </View>

                  <View style={styles.inputGroup}>
                    <Text style={styles.label}>Expected operating hours per year</Text>
                    <View style={styles.inputWrapper}>
                      <Icon name="schedule" size={18} color="#999" style={styles.inputIcon} />
                      <TextInput
                        style={styles.input}
                        placeholder="0-8760 hours"
                        placeholderTextColor="#999"
                        keyboardType="numeric"
                        maxLength={4}
                        value={formData.expectedOperatingHours}
                        onChangeText={(text) => updateFormData('expectedOperatingHours', text)}
                      />
                    </View>
                    <Text style={styles.helperText}>
                      <Icon name="info-outline" size={12} color="#999" /> Maximum: 8760 hours per year (24h × 365 days)
                    </Text>
                  </View>

                  <View style={styles.inputGroup}>
                    <Text style={styles.label}>Industry</Text>
                    <TouchableOpacity
                      style={styles.pickerContainer}
                      onPress={() => setShowIndustryPicker(!showIndustryPicker)}
                    >
                      <View style={styles.pickerButton}>
                        <Icon name="business-center" size={18} color="#999" style={styles.inputIcon} />
                        <Text style={formData.industry ? styles.pickerText : styles.pickerPlaceholder}>
                          {formData.industry || 'Select your industry'}
                        </Text>
                        <Icon
                          name={showIndustryPicker ? "expand-less" : "expand-more"}
                          size={24}
                          color="#666"
                        />
                      </View>
                    </TouchableOpacity>
                    {showIndustryPicker && (
                      <View style={styles.dropdownOverlay}>
                        {industries.map((industry, idx) => (
                          <TouchableOpacity
                            key={industry}
                            style={[
                              styles.pickerOption,
                              idx === industries.length - 1 && styles.pickerOptionLast
                            ]}
                            onPress={() => {
                              updateFormData('industry', industry);
                              setShowIndustryPicker(false);
                            }}
                          >
                            <Text style={styles.pickerOptionText}>{industry}</Text>
                            {formData.industry === industry && (
                              <Text>
                                <Icon name="check" size={20} color="#00B050" />
                              </Text>
                            )}
                          </TouchableOpacity>
                        ))}
                      </View>
                    )}
                  </View>

                  <View style={styles.inputGroup}>
                    <Text style={styles.label}>Recipient Email Address(es)</Text>
                    <Text style={styles.labelHelper}>You can enter multiple addresses separated by commas</Text>
                    <View style={styles.inputWrapper}>
                      <Icon name="email" size={18} color="#999" style={styles.inputIcon} />
                      <TextInput
                        style={[styles.input, styles.textArea]}
                        placeholder="user@example.com, admin@example.com"
                        placeholderTextColor="#999"
                        multiline
                        numberOfLines={3}
                        textAlignVertical="top"
                        value={formData.recipientEmails}
                        onChangeText={(text) => updateFormData('recipientEmails', text)}
                      />
                    </View>
                  </View>
                </>
              )}
            </View>

            {formData.energyCheckPlus && (
              <View style={styles.card}>
                <View style={styles.cardHeader}>
                  <Icon name="calendar-today" size={24} color="#003D82" />
                  <View style={styles.cardHeaderText}>
                    <Text style={styles.cardTitle}>Adjust Hours Distribution</Text>
                  </View>
                </View>

                <TouchableOpacity
                  style={styles.checkboxCard}
                  onPress={() => {
                    const newValue = !formData.distributeHoursEvenly;
                    updateFormData('distributeHoursEvenly', newValue);
                    if (newValue) {
                      distributeHoursEvenly();
                    }
                  }}
                >
                  <View style={[styles.checkbox, formData.distributeHoursEvenly && styles.checkboxChecked]}>
                    {formData.distributeHoursEvenly && (
                      <Text>
                        <Icon name="check" size={16} color="#fff" />
                      </Text>
                    )}
                  </View>
                  <View style={styles.checkboxContent}>
                    <Text style={styles.checkboxLabel}>Distribute hours evenly</Text>
                    <Text style={styles.checkboxDescription}>Apply equal hours across all months</Text>
                  </View>
                </TouchableOpacity>

                <View style={styles.tableContainer}>
                  <View style={styles.tableHeader}>
                    <Text style={[styles.tableHeaderText, styles.monthColumn]}>Month</Text>
                    <Text style={[styles.tableHeaderText, styles.percentageColumn]}>Percentage</Text>
                    <Text style={[styles.tableHeaderText, styles.hoursColumn]}>Hours</Text>
                  </View>

                  <ScrollView style={styles.tableBody} nestedScrollEnabled>
                    {formData.monthlyDistribution.map((item, index) => (
                      <View key={item.month}>
                        <View
                          style={[
                            styles.tableRow,
                            index % 2 === 0 && styles.tableRowEven
                          ]}
                        >
                          <Text style={[styles.tableCellText, styles.monthColumn]}>{item.month}</Text>
                          {formData.distributeHoursEvenly ? (
                            <>
                              <Text style={[styles.tableCellText, styles.percentageColumn]}>
                                <Text>{item.percentage}%</Text>
                              </Text>
                              <Text style={[styles.tableCellText, styles.hoursColumn]}>
                                <Text>{parseFloat(item.hours).toFixed(0)}h</Text>
                              </Text>
                            </>
                          ) : (
                            <>
                              <View style={styles.percentageColumn}>
                                <TextInput
                                  style={styles.tableInput}
                                  keyboardType="numeric"
                                  value={item.percentage}
                                  onChangeText={(text) => updateMonthlyPercentage(index, text)}
                                  placeholder="0"
                                />
                              </View>
                              <Text style={[styles.tableCellText, styles.hoursColumn]}>
                                <Text>{parseFloat(item.hours).toFixed(0)}h</Text>
                              </Text>
                            </>
                          )}
                        </View>
                        {monthlyErrors[index] && (
                          <Text style={styles.tableErrorText}>{monthlyErrors[index]}</Text>
                        )}
                      </View>
                    ))}
                  </ScrollView>

                  <View style={styles.tableTotalRow}>
                    <Text style={[styles.tableTotalText, styles.monthColumn]}>Total</Text>
                    <Text style={[styles.tableTotalText, styles.percentageColumn]}>
                      {calculateTotalPercentage()}
                    </Text>
                    <Text style={[styles.tableTotalText, styles.hoursColumn]}>
                      {calculateTotalHours()}
                    </Text>
                  </View>
                </View>

                {totalPercentageError && (
                  <Text style={styles.errorText}>
                    <Icon name="error-outline" size={12} color="#EF4444" /> {totalPercentageError}
                  </Text>
                )}
              </View>
            )}
          </>
        )}

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