import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { MaterialIcons, Ionicons, Feather } from '@expo/vector-icons';
import styles from './SettingScreen.styles';
import React, { useState } from "react";

interface SettingScreenProps {
    navigation: any;
}

interface Language {
    code: string;
    name: string;
    nativeName: string;
}

const SettingScreen: React.FC<SettingScreenProps> = ({ navigation }) => {
    const [selectedLanguage, setSelectedLanguage] = useState<string>('en');

    const languages: Language[] = [
        { code: 'en', name: 'English', nativeName: 'English' },
        { code: 'fr', name: 'French', nativeName: 'Français' },
        { code: 'de', name: 'German', nativeName: 'Deutsch' },
        { code: 'it', name: 'Italian', nativeName: 'Italiano' },
        { code: 'pl', name: 'Polish', nativeName: 'Polski' },
        { code: 'da', name: 'Danish', nativeName: 'Dansk' },
    ];

    const handleBackButton = () => {
        navigation.goBack();
    };

    const handleLanguageSelect = (code: string) => {
        setSelectedLanguage(code);
        // Add your language change logic here
        // e.g., i18n.changeLanguage(code);
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={handleBackButton}>
                    <Ionicons name="arrow-back" size={22} color="#0F172A" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Settings</Text>
                <View style={styles.headerSpacer} />
            </View>

            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Language</Text>
                    <Text style={styles.sectionDescription}>
                        Choose your preferred language
                    </Text>
                </View>

                <View style={styles.languageContainer}>
                    {languages.map((language, index) => (
                        <TouchableOpacity
                            key={language.code}
                            style={[
                                styles.languageItem,
                                index === languages.length - 1 && styles.languageItemLast,
                            ]}
                            onPress={() => handleLanguageSelect(language.code)}
                            activeOpacity={0.7}
                        >
                            <View style={styles.languageInfo}>
                                <View style={styles.languageIcon}>
                                    <Ionicons name="language-outline" size={20} color="#64748B" />
                                </View>
                                <View style={styles.languageText}>
                                    <Text style={styles.languageName}>{language.nativeName}</Text>
                                    <Text style={styles.languageSubtext}>{language.name}</Text>
                                </View>
                            </View>

                            {selectedLanguage === language.code ? (
                                <View style={styles.checkmarkContainer}>
                                    <Ionicons name="checkmark-circle" size={24} color="#3B82F6" />
                                </View>
                            ) : (
                                <View style={styles.radioCircle} />
                            )}
                        </TouchableOpacity>
                    ))}
                </View>

                <View style={styles.footerNote}>
                    <Feather name="info" size={16} color="#64748B" />
                    <Text style={styles.footerNoteText}>
                        The app will restart to apply language changes
                    </Text>
                </View>
            </ScrollView>
        </View>
    );
}

export default SettingScreen;
