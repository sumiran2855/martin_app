import { useState, useEffect } from 'react';
import { FormData } from '../screens/authScreens/types';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type RegisterScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const useRegisterForm = () => {
    const navigation = useNavigation<RegisterScreenNavigationProp>();

    // Form state
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
        monthlyDistribution: Array(12).fill(0).map((_, index) => ({
            month: new Date(0, index).toLocaleString('en-US', { month: 'long' }),
            percentage: '8.33',
            hours: '0',
            editable: true
        })),
        installSmartPrice: false,
        installationTiming: 'asap',
    });

    // UI state
    const [showModelPicker, setShowModelPicker] = useState(false);
    const [showCountryPicker, setShowCountryPicker] = useState(false);
    const [showServiceCountryCodePicker, setShowServiceCountryCodePicker] = useState(false);
    const [showSalesCountryCodePicker, setShowSalesCountryCodePicker] = useState(false);
    const [showIndustryPicker, setShowIndustryPicker] = useState(false);
    const [monthlyErrors, setMonthlyErrors] = useState<string[]>(Array(12).fill(''));
    const [totalPercentageError, setTotalPercentageError] = useState('');
    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleBackPress = () => {
        navigation.goBack();
    };

    // Distribute hours evenly when expectedOperatingHours changes and distributeHoursEvenly is true
    useEffect(() => {
        if (formData.expectedOperatingHours && formData.distributeHoursEvenly) {
            distributeHoursEvenly();
        }
    }, [formData.expectedOperatingHours, formData.distributeHoursEvenly]);

    // Form update handler
    const updateFormData = (field: keyof FormData, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    // Handle form submission
    const handleSubmit = () => {
        const isValid = validateForm();
        if (isValid) {
            navigation.navigate('Installation', { formData });
        }
    };

    const validateEmail = (email: string) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    const validatePhone = (phone: string) => {
        return phone.length >= 8 && /^\d+$/.test(phone);
    };

    const validateForm = (): boolean => {
        const newErrors: Record<string, string> = {};
        let isValid = true;

        setErrors({});

        // System Details Validation
        if (!formData.systemName?.trim()) {
            newErrors.systemName = 'System name is required';
            isValid = false;
        }

        if (!formData.xrgiIdNumber?.trim()) {
            newErrors.xrgiIdNumber = 'XRGI ID Number is required';
            isValid = false;
        } else if (!/^\d{10}$/.test(formData.xrgiIdNumber)) {
            newErrors.xrgiIdNumber = 'XRGI ID must be 10 digits';
            isValid = false;
        }

        if (!formData.selectedModel) {
            newErrors.selectedModel = 'Please select a model';
            isValid = false;
        }

        // XRGI Site Validation
        if (!formData.systemAddress?.trim()) {
            newErrors.systemAddress = 'Address is required';
            isValid = false;
        }

        if (!formData.systemPostcode?.trim()) {
            newErrors.systemPostcode = 'Postcode is required';
            isValid = false;
        }

        if (!formData.systemCity?.trim()) {
            newErrors.systemCity = 'City is required';
            isValid = false;
        }

        if (!formData.systemCountry) {
            newErrors.systemCountry = 'Country is required';
            isValid = false;
        }

        // Service Contract Validation
        if (formData.hasServiceContract === true) {
            if (!formData.serviceProviderName?.trim()) {
                newErrors.serviceProviderName = 'Service provider name is required';
                isValid = false;
            }

            if (!formData.serviceProviderEmail?.trim()) {
                newErrors.serviceProviderEmail = 'Service provide   r email is required';
                isValid = false;
            } else if (!validateEmail(formData.serviceProviderEmail)) {
                newErrors.serviceProviderEmail = 'Please enter a valid email address';
                isValid = false;
            }

            if (!formData.serviceProviderPhone?.trim()) {
                newErrors.serviceProviderPhone = 'Service provider phone is required';
                isValid = false;
            } else if (!validatePhone(formData.serviceProviderPhone)) {
                newErrors.serviceProviderPhone = 'Phone number must be at least 8 digits';
                isValid = false;
            }

            // Sales Partner Validation if different from service provider
            if (formData.isSalesPartnerSame === false) {
                if (!formData.salesPartnerName?.trim()) {
                    newErrors.salesPartnerName = 'Sales partner name is required';
                    isValid = false;
                }

                if (!formData.salesPartnerEmail?.trim()) {
                    newErrors.salesPartnerEmail = 'Sales partner email is required';
                    isValid = false;
                } else if (!validateEmail(formData.salesPartnerEmail)) {
                    newErrors.salesPartnerEmail = 'Please enter a valid email address';
                    isValid = false;
                }

                if (!formData.salesPartnerPhone?.trim()) {
                    newErrors.salesPartnerPhone = 'Sales partner phone is required';
                    isValid = false;
                } else if (!validatePhone(formData.salesPartnerPhone)) {
                    newErrors.salesPartnerPhone = 'Phone number must be at least 8 digits';
                    isValid = false;
                }
            }
        }

        // EnergyCheck Plus Validation
        if (formData.energyCheckPlus) {

            if(!formData.expectedAnnualSavings?.trim()) {
                newErrors.expectedAnnualSavings = 'Expected annual savings are required';
                isValid = false;
            }

            if(!formData.expectedCO2Savings?.trim()) {
                newErrors.expectedCO2Savings = 'Expected annual CO2 savings are required';
                isValid = false;
            }

            // Make all EnergyCheck Plus fields required
            if (!formData.expectedOperatingHours?.trim()) {
                newErrors.expectedOperatingHours = 'Expected operating hours are required';
                isValid = false;
            } else {
                const hours = parseFloat(formData.expectedOperatingHours);
                if (isNaN(hours) || hours < 0 || hours > 8760) {
                    newErrors.expectedOperatingHours = 'Operating hours must be between 0 and 8760';
                    isValid = false;
                }
            }

            if (!formData.recipientEmails?.trim()) {
                newErrors.recipientEmails = 'At least one recipient email is required';
                isValid = false;
            } else {
                const emails = formData.recipientEmails.split(',').map(email => email.trim()).filter(Boolean);
                if (emails.length === 0) {
                    newErrors.recipientEmails = 'At least one recipient email is required';
                    isValid = false;
                } else {
                    const invalidEmails = emails.filter(email => !validateEmail(email));
                    if (invalidEmails.length > 0) {
                        newErrors.recipientEmails = 'Please enter valid email addresses separated by commas';
                        isValid = false;
                    }
                }
            }
        }

        // Update errors state
        setErrors(newErrors);

        // Scroll to first error if any
        if (!isValid) {
            console.log('Validation failed:', newErrors);
        }

        setErrors(newErrors);
        return isValid;
    };

    // Distribute hours evenly across all months
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

    // Validate individual month hours
    const validateMonthHours = (hours: number, index: number) => {
        const errors = [...monthlyErrors];
        if (hours > 730) {
            errors[index] = 'Hours cannot exceed 730 per month';
        } else {
            errors[index] = '';
        }
        setMonthlyErrors(errors);
    };

    // Update monthly percentage and recalculate hours
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
            distributeHoursEvenly: false,
        }));

        validateMonthHours(hours, index);
        setTimeout(validateTotalPercentage, 0);
    };

    // Validate total percentage across all months
    const validateTotalPercentage = () => {
        const total = formData.monthlyDistribution.reduce((sum, month) => {
            return sum + (parseFloat(month.percentage) || 0);
        }, 0);

        if (Math.abs(total - 100) > 0.01) {
            setTotalPercentageError('Total percentage must equal 100%');
            return false;
        } else {
            setTotalPercentageError('');
            return true;
        }
    };

    // Calculate total hours from distribution
    const calculateTotalHours = (): string => {
        const total = formData.monthlyDistribution.reduce((sum, month) => {
            return sum + (parseFloat(month.hours) || 0);
        }, 0);
        return `${total.toFixed(0)}h`;
    };

    // Calculate total percentage from distribution
    const calculateTotalPercentage = (): string => {
        const total = formData.monthlyDistribution.reduce((sum, month) => {
            return sum + (parseFloat(month.percentage) || 0);
        }, 0);
        return `${total.toFixed(2)}%`;
    };

    return {
        // Form state
        formData,
        updateFormData,

        // UI state
        showModelPicker,
        setShowModelPicker,
        showCountryPicker,
        setShowCountryPicker,
        showServiceCountryCodePicker,
        setShowServiceCountryCodePicker,
        showSalesCountryCodePicker,
        setShowSalesCountryCodePicker,
        showIndustryPicker,
        setShowIndustryPicker,
        monthlyErrors,
        totalPercentageError,
        errors,

        // Methods
        handleSubmit,
        distributeHoursEvenly,
        updateMonthlyPercentage,
        calculateTotalHours,
        calculateTotalPercentage,
        handleBackPress,
    };
};

export default useRegisterForm;