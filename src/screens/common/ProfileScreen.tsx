import { View, TouchableOpacity, Text, TextInput, ScrollView } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import styles from './ProfileScreen.styles';
import React, { useState } from "react";

interface ProfileScreenProps {
    navigation: any;
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({ navigation }) => {
    // Business Information State
    const [businessName, setBusinessName] = useState('Gautam Adani');
    const [vatNo, setVatNo] = useState('45200200');
    const [address, setAddress] = useState('102R, Auxerre street');
    const [postalCode, setPostalCode] = useState('4520');
    const [city, setCity] = useState('London');

    // Contact Person State
    const [firstName, setFirstName] = useState('Gautam');
    const [lastName, setLastName] = useState('Adani');
    const [email, setEmail] = useState('sumiran@b.com');
    const [countryCode, setCountryCode] = useState('+44');
    const [mobile, setMobile] = useState('12000012');
    const [showCountryPicker, setShowCountryPicker] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState({
        code: '+44',
        flag: '🇬🇧',
        name: 'United Kingdom'
    });

    // Country list
    const countries = [
        { code: '+1', flag: '🇺🇸', name: 'United States' },
        { code: '+44', flag: '🇬🇧', name: 'United Kingdom' },
        { code: '+91', flag: '🇮🇳', name: 'India' },
        { code: '+86', flag: '🇨🇳', name: 'China' },
        { code: '+81', flag: '🇯🇵', name: 'Japan' },
        { code: '+49', flag: '🇩🇪', name: 'Germany' },
    ];

    const handleBackButton = () => {
        navigation.goBack();
    };

    const handleSaveChanges = () => {
        console.log('Saving changes...');
    };

    const handleChangePassword = () => {
        console.log('Change password...');
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={handleBackButton}>
                    <Ionicons name="arrow-back" size={24} color="#1E293B" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Profile Settings</Text>
                <TouchableOpacity
                    style={styles.changePasswordButton}
                    onPress={handleChangePassword}
                >
                    <Ionicons name="key-outline" size={20} color="#3B82F6" />
                </TouchableOpacity>
            </View>

            <ScrollView
                style={styles.scrollView}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {/* Business Information Section */}
                <View style={styles.card}>
                    <View style={styles.cardHeader}>
                        <View style={styles.iconContainer}>
                            <Ionicons name="business-outline" size={20} color="#3B82F6" />
                        </View>
                        <Text style={styles.cardTitle}>Business Information</Text>
                    </View>

                    <View style={styles.cardContent}>
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Business Name</Text>
                            <TextInput
                                style={styles.input}
                                value={businessName}
                                onChangeText={setBusinessName}
                                placeholder="Enter business name"
                                placeholderTextColor="#94A3B8"
                            />
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>VAT Number</Text>
                            <TextInput
                                style={styles.input}
                                value={vatNo}
                                onChangeText={setVatNo}
                                placeholder="Enter VAT number"
                                placeholderTextColor="#94A3B8"
                                keyboardType="numeric"
                            />
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Address</Text>
                            <TextInput
                                style={styles.input}
                                value={address}
                                onChangeText={setAddress}
                                placeholder="Enter address"
                                placeholderTextColor="#94A3B8"
                            />
                        </View>

                        <View style={styles.inputRow}>
                            <View style={styles.inputHalf}>
                                <Text style={styles.label}>Postal Code</Text>
                                <TextInput
                                    style={styles.input}
                                    value={postalCode}
                                    onChangeText={setPostalCode}
                                    placeholder="Enter code"
                                    placeholderTextColor="#94A3B8"
                                    keyboardType="numeric"
                                />
                            </View>

                            <View style={styles.inputHalf}>
                                <Text style={styles.label}>City</Text>
                                <TextInput
                                    style={styles.input}
                                    value={city}
                                    onChangeText={setCity}
                                    placeholder="Enter city"
                                    placeholderTextColor="#94A3B8"
                                />
                            </View>
                        </View>
                    </View>
                </View>

                {/* Contact Person Section */}
                <View style={styles.card}>
                    <View style={styles.cardHeader}>
                        <View style={styles.iconContainer}>
                            <Ionicons name="person-outline" size={20} color="#3B82F6" />
                        </View>
                        <Text style={styles.cardTitle}>Contact Person</Text>
                    </View>

                    <View style={styles.cardContent}>
                        <View style={styles.inputRow}>
                            <View style={styles.inputHalf}>
                                <Text style={styles.label}>First Name</Text>
                                <TextInput
                                    style={styles.input}
                                    value={firstName}
                                    onChangeText={setFirstName}
                                    placeholder="First name"
                                    placeholderTextColor="#94A3B8"
                                />
                            </View>

                            <View style={styles.inputHalf}>
                                <Text style={styles.label}>Last Name</Text>
                                <TextInput
                                    style={styles.input}
                                    value={lastName}
                                    onChangeText={setLastName}
                                    placeholder="Last name"
                                    placeholderTextColor="#94A3B8"
                                />
                            </View>
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Email Address</Text>
                            <View style={styles.inputWithIcon}>
                                <Ionicons name="mail-outline" size={20} color="#64748B" style={styles.inputIcon} />
                                <TextInput
                                    style={styles.inputWithIconField}
                                    value={email}
                                    onChangeText={setEmail}
                                    placeholder="Enter email address"
                                    placeholderTextColor="#94A3B8"
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                />
                            </View>
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Mobile Number</Text>
                            <View style={styles.phoneInputContainer}>
                                <TouchableOpacity
                                    style={styles.countryCodeContainer}
                                    onPress={() => setShowCountryPicker(!showCountryPicker)}
                                >
                                    <Text style={styles.flagEmoji}>{selectedCountry.flag}</Text>
                                    <Text style={styles.countryCodeInput}>{selectedCountry.code}</Text>
                                </TouchableOpacity>
                                <TextInput
                                    style={styles.phoneInput}
                                    value={mobile}
                                    onChangeText={setMobile}
                                    placeholder="Enter mobile number"
                                    placeholderTextColor="#94A3B8"
                                    keyboardType="phone-pad"
                                />
                            </View>

                            {/* Country Picker Dropdown */}
                            {showCountryPicker && (
                                <View style={styles.countryDropdown}>
                                    <ScrollView
                                        style={styles.countryList}
                                        nestedScrollEnabled={true}
                                    >
                                        {countries.map((country, index) => (
                                            <TouchableOpacity
                                                key={index}
                                                style={styles.countryItem}
                                                onPress={() => {
                                                    setSelectedCountry(country);
                                                    setCountryCode(country.code);
                                                    setShowCountryPicker(false);
                                                }}
                                            >
                                                <Text style={styles.countryFlag}>{country.flag}</Text>
                                                <Text style={styles.countryName}>{country.name}</Text>
                                                <Text style={styles.countryCode}>{country.code}</Text>
                                                {selectedCountry.code === country.code && (
                                                    <Ionicons name="checkmark-circle" size={20} color="#3B82F6" />
                                                )}
                                            </TouchableOpacity>
                                        ))}
                                    </ScrollView>
                                </View>
                            )}
                        </View>
                    </View>
                </View>

                {/* Account Deletion Section */}
                <View style={styles.dangerCard}>
                    <View style={styles.cardHeader}>
                        <View style={styles.dangerIconContainer}>
                            <Ionicons name="alert-circle-outline" size={20} color="#EF4444" />
                        </View>
                        <Text style={styles.dangerCardTitle}>Account Deletion</Text>
                    </View>
                    <View style={styles.cardContent}>
                        <Text style={styles.dangerDescription}>
                            To permanently delete your account, send an email to{' '}
                            <Text style={styles.emailLink}>productportal@ecpower.dk</Text>
                            {' '}requesting account removal. You'll receive confirmation upon completion.
                        </Text>
                    </View>
                </View>

                {/* Save Button */}
                <TouchableOpacity
                    style={styles.saveButton}
                    onPress={handleSaveChanges}
                    activeOpacity={0.8}
                >
                    <Text style={styles.saveButtonText}>Save Changes</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
}

export default ProfileScreen;