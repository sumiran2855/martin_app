import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    SafeAreaView,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons as Icon } from "@expo/vector-icons";
import { styles } from './StepperScreen.styles';
import { FormData, countryCodes, models, industries, country } from './types';

const StepperScreen: React.FC = () => {
    const navigation = useNavigation();
    const [currentStep, setCurrentStep] = useState(1);
    const [showCountryCodePicker, setShowCountryCodePicker] = useState(false);
    const [showContactCountryCodePicker, setShowContactCountryCodePicker] = useState(false);
    const [showServiceCountryCodePicker, setShowServiceCountryCodePicker] = useState(false);
    const [showSalesCountryCodePicker, setShowSalesCountryCodePicker] = useState(false);
    const [showModelPicker, setShowModelPicker] = useState(false);
    const [showIndustryPicker, setShowIndustryPicker] = useState(false);
    const [showCountryPicker, setShowCountryPicker] = useState(false);
    const [monthlyErrors, setMonthlyErrors] = useState<string[]>(Array(12).fill(''));
    const [totalPercentageError, setTotalPercentageError] = useState('');

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
        installSmartPrice: false,
        installationTiming: 'asap',
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
    });

    // Effect to distribute hours when expected operating hours changes
    useEffect(() => {
        if (formData.expectedOperatingHours && formData.distributeHoursEvenly) {
            distributeHoursEvenly();
        }
    }, [formData.expectedOperatingHours]);

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

        // Clear errors when distributing evenly
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

    const steps = [
        { id: 1, label: 'Profile', icon: 'person', completed: currentStep > 1 },
        { id: 2, label: 'System Registration', icon: 'settings', completed: currentStep > 2 },
        { id: 3, label: 'Smart Price Control', icon: 'electrical-services', completed: currentStep > 3 },
    ];

    const updateFormData = (field: keyof FormData, value: any) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleNext = () => {
        if (currentStep < 3) {
            setCurrentStep(currentStep + 1);
        } else {
            console.log('Form completed:', formData);
        }
    };

    const handleBack = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        } else {
            navigation.goBack();
        }
    };

    const handleSaveForLater = () => {
        console.log('Saved for later:', formData);
        navigation.goBack();
    };

    const renderStepIndicator = () => (
        <View style={styles.stepIndicatorContainer}>
            <View style={styles.stepIndicatorContent}>
                {steps.map((step, index) => (
                    <React.Fragment key={step.id}>
                        <View style={styles.stepItem}>
                            <View style={styles.stepIconWrapper}>
                                <View
                                    style={[
                                        styles.stepCircle,
                                        currentStep === step.id && styles.stepCircleActive,
                                        step.completed && styles.stepCircleCompleted,
                                    ]}
                                >
                                    {step.completed ? (
                                        <Icon name="check" size={20} color="#fff" />
                                    ) : (
                                        <Icon
                                            name={step.icon as any}
                                            size={20}
                                            color={currentStep === step.id ? '#003D82' : '#999'}
                                        />
                                    )}
                                </View>
                            </View>
                            <Text
                                style={[
                                    styles.stepLabel,
                                    currentStep === step.id && styles.stepLabelActive,
                                    step.completed && styles.stepLabelCompleted,
                                ]}
                            >
                                {step.label}
                            </Text>
                        </View>
                        {index < steps.length - 1 && (
                            <View style={styles.stepConnector}>
                                <View
                                    style={[
                                        styles.stepConnectorLine,
                                        step.completed && styles.stepConnectorLineCompleted
                                    ]}
                                />
                            </View>
                        )}
                    </React.Fragment>
                ))}
            </View>
        </View>
    );

    const renderProfileStep = () => (
        <ScrollView style={styles.formContainer} showsVerticalScrollIndicator={false}>
            <View style={styles.headerSection}>
                <Text style={styles.title}>Create Your Profile</Text>
                <Text style={styles.subtitle}>Follow the steps to complete your profile setup.</Text>
            </View>

            <View style={styles.card}>
                <View style={styles.cardHeader}>
                    <Icon name="business" size={24} color="#003D82" />
                    <View style={styles.cardHeaderText}>
                        <Text style={styles.cardTitle}>Company Information</Text>
                        <Text style={styles.cardSubtitle}>Enter your business details</Text>
                    </View>
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Company name *</Text>
                    <View style={styles.inputWrapper}>
                        <Icon name="business" size={18} color="#999" style={styles.inputIcon} />
                        <TextInput
                            style={styles.input}
                            placeholder="Enter company name"
                            placeholderTextColor="#999"
                            value={formData.companyName}
                            onChangeText={(text) => updateFormData('companyName', text)}
                        />
                    </View>
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>VAT no. *</Text>
                    <View style={styles.inputWrapper}>
                        <Icon name="receipt" size={18} color="#999" style={styles.inputIcon} />
                        <TextInput
                            style={styles.input}
                            placeholder="Enter VAT number"
                            placeholderTextColor="#999"
                            value={formData.vatNo}
                            onChangeText={(text) => updateFormData('vatNo', text)}
                        />
                    </View>
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Address *</Text>
                    <View style={styles.inputWrapper}>
                        <Icon name="location-on" size={18} color="#999" style={styles.inputIcon} />
                        <TextInput
                            style={styles.input}
                            placeholder="Enter Address"
                            placeholderTextColor="#999"
                            value={formData.address}
                            onChangeText={(text) => updateFormData('address', text)}
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
                            value={formData.postcode}
                            onChangeText={(text) => updateFormData('postcode', text)}
                        />
                    </View>

                    <View style={[styles.inputGroup, styles.inputHalf]}>
                        <Text style={styles.label}>City *</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="City"
                            placeholderTextColor="#999"
                            value={formData.city}
                            onChangeText={(text) => updateFormData('city', text)}
                        />
                    </View>
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Email *</Text>
                    <View style={styles.inputWrapper}>
                        <Icon name="email" size={18} color="#999" style={styles.inputIcon} />
                        <TextInput
                            style={styles.input}
                            placeholder="company@example.com"
                            placeholderTextColor="#999"
                            keyboardType="email-address"
                            autoCapitalize="none"
                            value={formData.email}
                            onChangeText={(text) => updateFormData('email', text)}
                        />
                    </View>
                </View>

                <View style={showCountryCodePicker ? styles.inputGroupActive : styles.inputGroup}>
                    <Text style={styles.label}>Phone *</Text>
                    <View style={showCountryCodePicker ? styles.phoneInputRowActive : styles.phoneInputRow}>
                        <TouchableOpacity
                            style={styles.countryCodeButton}
                            onPress={() => setShowCountryCodePicker(!showCountryCodePicker)}
                        >
                            <Text style={styles.countryCodeText}>
                                {countryCodes.find(c => c.code === formData.countryCode)?.flag} {formData.countryCode}
                            </Text>
                            <Icon
                                name={showCountryCodePicker ? "expand-less" : "expand-more"}
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
                                value={formData.phone}
                                onChangeText={(text) => {
                                    const cleaned = text.replace(/[^0-9]/g, '');
                                    updateFormData('phone', cleaned);
                                }}
                            />
                        </View>
                    </View>

                    {showCountryCodePicker && (
                        <View style={styles.dropdownOverlay}>
                            <ScrollView style={styles.countryCodeList} nestedScrollEnabled>
                                {countryCodes.map((country) => (
                                    <TouchableOpacity
                                        key={country.code}
                                        style={styles.countryCodeOption}
                                        onPress={() => {
                                            updateFormData('countryCode', country.code);
                                            setShowCountryCodePicker(false);
                                        }}
                                    >
                                        <Text style={styles.countryCodeOptionText}>
                                            {country.flag} {country.code} ({country.country})
                                        </Text>
                                        {formData.countryCode === country.code && (
                                            <Icon name="check" size={20} color="#00B050" />
                                        )}
                                    </TouchableOpacity>
                                ))}
                            </ScrollView>
                        </View>
                    )}

                    {formData.phone.length > 0 && formData.phone.length < 8 && (
                        <Text style={styles.errorText}>
                            <Icon name="error-outline" size={12} color="#EF4444" /> Phone number must be at least 8 digits
                        </Text>
                    )}
                    {formData.phone.length >= 8 && (
                        <Text style={styles.successText}>
                            <Icon name="check-circle" size={12} color="#00B050" /> Valid phone number
                        </Text>
                    )}
                </View>
            </View>

            <View style={styles.card}>
                <View style={styles.cardHeader}>
                    <Icon name="person" size={24} color="#003D82" />
                    <View style={styles.cardHeaderText}>
                        <Text style={styles.cardTitle}>Contact Person</Text>
                        <Text style={styles.cardSubtitle}>Fill in the details</Text>
                    </View>
                </View>

                <View style={styles.inputRow}>
                    <View style={[styles.inputGroup, styles.inputHalf]}>
                        <Text style={styles.label}>First name *</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="First name"
                            placeholderTextColor="#999"
                            value={formData.firstName}
                            onChangeText={(text) => updateFormData('firstName', text)}
                        />
                    </View>

                    <View style={[styles.inputGroup, styles.inputHalf]}>
                        <Text style={styles.label}>Last name *</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Last name"
                            placeholderTextColor="#999"
                            value={formData.lastName}
                            onChangeText={(text) => updateFormData('lastName', text)}
                        />
                    </View>
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Email *</Text>
                    <View style={styles.inputWrapper}>
                        <Icon name="email" size={18} color="#999" style={styles.inputIcon} />
                        <TextInput
                            style={styles.input}
                            placeholder="contact@example.com"
                            placeholderTextColor="#999"
                            keyboardType="email-address"
                            autoCapitalize="none"
                            value={formData.contactEmail}
                            onChangeText={(text) => updateFormData('contactEmail', text)}
                        />
                    </View>
                </View>

                <View style={showContactCountryCodePicker ? styles.inputGroupActive : styles.inputGroup}>
                    <Text style={styles.label}>Phone *</Text>
                    <View style={showContactCountryCodePicker ? styles.phoneInputRowActive : styles.phoneInputRow}>
                        <TouchableOpacity
                            style={styles.countryCodeButton}
                            onPress={() => setShowContactCountryCodePicker(!showContactCountryCodePicker)}
                        >
                            <Text style={styles.countryCodeText}>
                                {countryCodes.find(c => c.code === formData.contactCountryCode)?.flag} {formData.contactCountryCode}
                            </Text>
                            <Icon
                                name={showContactCountryCodePicker ? "expand-less" : "expand-more"}
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
                                value={formData.contactPhone}
                                onChangeText={(text) => {
                                    const cleaned = text.replace(/[^0-9]/g, '');
                                    updateFormData('contactPhone', cleaned);
                                }}
                            />
                        </View>
                    </View>

                    {showContactCountryCodePicker && (
                        <View style={styles.dropdownOverlay}>
                            <ScrollView style={styles.countryCodeList} nestedScrollEnabled>
                                {countryCodes.map((country) => (
                                    <TouchableOpacity
                                        key={country.code}
                                        style={styles.countryCodeOption}
                                        onPress={() => {
                                            updateFormData('contactCountryCode', country.code);
                                            setShowContactCountryCodePicker(false);
                                        }}
                                    >
                                        <Text style={styles.countryCodeOptionText}>
                                            {country.flag} {country.code} ({country.country})
                                        </Text>
                                        {formData.contactCountryCode === country.code && (
                                            <Icon name="check" size={20} color="#00B050" />
                                        )}
                                    </TouchableOpacity>
                                ))}
                            </ScrollView>
                        </View>
                    )}

                    {formData.contactPhone.length > 0 && formData.contactPhone.length < 8 && (
                        <Text style={styles.errorText}>
                            <Icon name="error-outline" size={12} color="#EF4444" /> Phone number must be at least 8 digits
                        </Text>
                    )}
                    {formData.contactPhone.length >= 8 && (
                        <Text style={styles.successText}>
                            <Icon name="check-circle" size={12} color="#00B050" /> Valid phone number
                        </Text>
                    )}
                </View>
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.buttonSecondary} onPress={handleSaveForLater}>
                    <Icon name="bookmark-border" size={20} color="#003D82" />
                    <Text style={styles.buttonSecondaryText}>Save For Later</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonPrimary} onPress={handleNext}>
                    <Text style={styles.buttonPrimaryText}>Continue</Text>
                    <Icon name="arrow-forward" size={20} color="#fff" />
                </TouchableOpacity>
            </View>
        </ScrollView>
    );

    const renderSystemRegistrationStep = () => (
        <ScrollView style={styles.formContainer} showsVerticalScrollIndicator={false}>
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
                                {country.map((countryItem) => (
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

            {formData.isSystemInstalled && (
                <>
                    <View style={styles.card}>
                        <View style={styles.cardHeader}>
                            <Icon name="analytics" size={24} color="#003D82" />
                            <View style={styles.cardHeaderText}>
                                <Text style={styles.cardTitle}>EnergyCheck Plus</Text>
                            </View>
                        </View>
                        <Text style={styles.cardSubtitle}>Get a monthly overview of how much you have saved with your XRGI System</Text>

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
                                                        <Icon name="check" size={20} color="#00B050" />
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
                                    {formData.distributeHoursEvenly && <Icon name="check" size={16} color="#fff" />}
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
                                                        <Text style={[styles.tableCellText, styles.percentageColumn]}>{item.percentage}%</Text>
                                                        <Text style={[styles.tableCellText, styles.hoursColumn]}>{parseFloat(item.hours).toFixed(0)}h</Text>
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
                                                        <Text style={[styles.tableCellText, styles.hoursColumn]}>{parseFloat(item.hours).toFixed(0)}h</Text>
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
                <TouchableOpacity style={styles.buttonSecondary} onPress={handleBack}>
                    <Icon name="arrow-back" size={20} color="#003D82" />
                    <Text style={styles.buttonSecondaryText}>Back</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonPrimary} onPress={handleNext}>
                    <Text style={styles.buttonPrimaryText}>Continue</Text>
                    <Icon name="arrow-forward" size={20} color="#fff" />
                </TouchableOpacity>
            </View>
        </ScrollView>
    );

    const renderSmartPriceControlStep = () => (
        <ScrollView style={styles.formContainer} showsVerticalScrollIndicator={false}>
            <View style={styles.headerSection}>
                <Text style={styles.title}>Smart PriceControl</Text>
                <Text style={styles.subtitle}>
                    Optimize your energy production with real-time electricity market prices
                </Text>
            </View>

            <View style={styles.infoCard}>
                <View style={styles.infoCardIcon}>
                    <Icon name="lightbulb" size={32} color="#FFA000" />
                </View>
                <View style={styles.infoCardContent}>
                    <Text style={styles.infoCardTitle}>How it works</Text>
                    <Text style={styles.infoCardText}>
                        Our software uses EPEX Day-ahead market prices to automatically pause energy
                        production when prices are zero or negative, maximizing your savings.
                    </Text>
                    <View style={styles.infoBadge}>
                        <Icon name="star" size={14} color="#FFA000" />
                        <Text style={styles.infoBadgeText}>Standard on all XRCP® systems from April 2025</Text>
                    </View>
                </View>
            </View>

            <View style={styles.card}>
                <TouchableOpacity
                    style={styles.featureToggleCard}
                    onPress={() => updateFormData('installSmartPrice', !formData.installSmartPrice)}
                >
                    <View style={styles.featureToggleLeft}>
                        <View style={[styles.checkbox, formData.installSmartPrice && styles.checkboxChecked]}>
                            {formData.installSmartPrice && <Icon name="check" size={16} color="#fff" />}
                        </View>
                        <View style={styles.featureToggleContent}>
                            <Text style={styles.featureToggleTitle}>Install SmartPriceControl</Text>
                            <Text style={styles.featureToggleDescription}>
                                Enable automatic optimization
                            </Text>
                        </View>
                    </View>
                    <Icon
                        name="electrical-services"
                        size={28}
                        color={formData.installSmartPrice ? "#003D82" : "#CCC"}
                    />
                </TouchableOpacity>
            </View>

            {formData.installSmartPrice && (
                <View style={styles.card}>
                    <View style={styles.cardHeader}>
                        <Icon name="build" size={24} color="#003D82" />
                        <View style={styles.cardHeaderText}>
                            <Text style={styles.cardTitle}>Installation Timing</Text>
                            <Text style={styles.cardSubtitle}>Choose when to install the software</Text>
                        </View>
                    </View>

                    <View style={styles.alertBox}>
                        <Icon name="info" size={20} color="#1976D2" />
                        <Text style={styles.alertText}>
                            Physical installation on your XRGI® system is required by your service partner
                        </Text>
                    </View>

                    <TouchableOpacity
                        style={[
                            styles.radioCard,
                            formData.installationTiming === 'next-visit' && styles.radioCardActive
                        ]}
                        onPress={() => updateFormData('installationTiming', 'next-visit')}
                    >
                        <View style={styles.radioButton}>
                            {formData.installationTiming === 'next-visit' && (
                                <View style={styles.radioButtonInner} />
                            )}
                        </View>
                        <View style={styles.radioCardContent}>
                            <Text style={styles.radioCardTitle}>At next on-site visit</Text>
                            <Text style={styles.radioCardDescription}>
                                Install during scheduled maintenance
                            </Text>
                        </View>
                        <Icon name="event" size={24} color="#003D82" />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[
                            styles.radioCard,
                            formData.installationTiming === 'asap' && styles.radioCardActive
                        ]}
                        onPress={() => updateFormData('installationTiming', 'asap')}
                    >
                        <View style={styles.radioButton}>
                            {formData.installationTiming === 'asap' && (
                                <View style={styles.radioButtonInner} />
                            )}
                        </View>
                        <View style={styles.radioCardContent}>
                            <Text style={styles.radioCardTitle}>As soon as possible</Text>
                            <Text style={styles.radioCardDescription}>
                                Schedule a dedicated installation visit
                            </Text>
                        </View>
                        <Icon name="flash-on" size={24} color="#003D82" />
                    </TouchableOpacity>
                </View>
            )}

            <View style={styles.successCard}>
                <View style={styles.successIconWrapper}>
                    <Icon name="check-circle" size={48} color="#00B050" />
                </View>
                <Text style={styles.successTitle}>Almost Done!</Text>
                <Text style={styles.successText}>
                    Review your information and save to complete the setup process
                </Text>
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.buttonSecondary} onPress={handleBack}>
                    <Icon name="arrow-back" size={20} color="#003D82" />
                    <Text style={styles.buttonSecondaryText}>Back</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonPrimary} onPress={handleNext}>
                    <Icon name="check" size={20} color="#fff" />
                    <Text style={styles.buttonPrimaryText}>Complete Setup</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );

    const renderCurrentStep = () => {
        switch (currentStep) {
            case 1:
                return renderProfileStep();
            case 2:
                return renderSystemRegistrationStep();
            case 3:
                return renderSmartPriceControlStep();
            default:
                return null;
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.container}
            >
                {renderStepIndicator()}
                {renderCurrentStep()}
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default StepperScreen;