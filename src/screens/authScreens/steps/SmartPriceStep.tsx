import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Switch } from 'react-native';
import { MaterialIcons as Icon } from "@expo/vector-icons";
import { StepProps } from '../types';
import { styles } from '../StepperScreen.styles';

const SmartPriceStep: React.FC<StepProps> = ({
    formData,
    updateFormData,
    onBack,
    onNext,
}) => {

    return (
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
                <TouchableOpacity style={styles.buttonSecondary} onPress={onBack}>
                    <Icon name="arrow-back" size={20} color="#003D82" />
                    <Text style={styles.buttonSecondaryText}>Back</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonPrimary} onPress={onNext}>
                    <Icon name="check" size={20} color="#fff" />
                    <Text style={styles.buttonPrimaryText}>Complete Setup</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

export default SmartPriceStep;
