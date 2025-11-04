import { View, Text, TouchableOpacity, ScrollView, Platform } from "react-native";
import React, { useState } from "react";
import styles from "./get-statisticsScreen.styles";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from '@react-native-community/datetimepicker';

interface StatisticsScreenProps {
    navigation: any;
}

const Get_StatisticsScreen: React.FC<StatisticsScreenProps> = ({ navigation }) => {
    const [fromDate, setFromDate] = useState<Date>(new Date(2025, 8, 19, 0, 0)); // Sept 19, 2025
    const [toDate, setToDate] = useState<Date>(new Date(2026, 8, 19, 0, 0)); // Sept 19, 2026
    const [showFromDatePicker, setShowFromDatePicker] = useState(false);
    const [showFromTimePicker, setShowFromTimePicker] = useState(false);
    const [showToDatePicker, setShowToDatePicker] = useState(false);
    const [showToTimePicker, setShowToTimePicker] = useState(false);

    const handleBackButton = () => {
        navigation.goBack();
    };

    const handleGetData = () => {
        // Format dates for display
        const formattedFromDate = formatDateTime(fromDate);
        const formattedToDate = formatDateTime(toDate);

        console.log("From Date:", formattedFromDate);
        console.log("To Date:", formattedToDate);

        // Navigate to StatisticsResultScreen with the date parameters
        navigation.navigate('StatisticsResult', {
            fromDate: formattedFromDate,
            toDate: formattedToDate,
            fromDateObject: fromDate,
            toDateObject: toDate
        });
    };

    const formatDateTime = (date: Date): string => {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');

        return `${day}-${month}-${year} ${hours}:${minutes}`;
    };

    const formatDate = (date: Date): string => {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();

        return `${day}-${month}-${year}`;
    };

    const formatTime = (date: Date): string => {
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');

        return `${hours}:${minutes}`;
    };

    const onFromDateChange = (event: any, selectedDate?: Date) => {
        setShowFromDatePicker(Platform.OS === 'ios');
        if (selectedDate) {
            setFromDate(selectedDate);
        }
    };

    const onFromTimeChange = (event: any, selectedDate?: Date) => {
        setShowFromTimePicker(Platform.OS === 'ios');
        if (selectedDate) {
            setFromDate(selectedDate);
        }
    };

    const onToDateChange = (event: any, selectedDate?: Date) => {
        setShowToDatePicker(Platform.OS === 'ios');
        if (selectedDate) {
            setToDate(selectedDate);
        }
    };

    const onToTimeChange = (event: any, selectedDate?: Date) => {
        setShowToTimePicker(Platform.OS === 'ios');
        if (selectedDate) {
            setToDate(selectedDate);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={handleBackButton}>
                    <Ionicons name="arrow-back" size={22} color="#0F172A" />
                </TouchableOpacity>
                <View style={styles.headerSpacer} />
            </View>

            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                <View style={styles.titleSection}>
                    <View style={styles.titleRow}>
                        <View style={styles.iconContainer}>
                            <Ionicons name="stats-chart" size={22} color="#FFFFFF" />
                        </View>
                        <Text style={styles.title}>Statistics</Text>
                    </View>
                    <Text style={styles.subtitle}>See system statistics 1470167385 / XRGI* 25</Text>
                </View>

                <View style={styles.card}>
                    <View style={styles.noteContainer}>
                        <Text style={styles.noteText}>
                            Please note: Both date and hour must be set
                        </Text>
                    </View>

                    {/* From Date Input */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>
                            From Date (DD-MM-YY HH:MM) <Text style={styles.required}>*</Text>
                        </Text>
                        <View style={styles.dateTimePickerContainer}>
                            <View style={styles.dateTimeRow}>
                                <View style={styles.dateInputWrapper}>
                                    <TouchableOpacity
                                        style={styles.inputTouchable}
                                        onPress={() => setShowFromDatePicker(true)}
                                    >
                                        <View style={styles.inputContent}>
                                            <Text style={styles.inputLabel}>DATE</Text>
                                            <Text style={styles.inputValue}>{formatDate(fromDate)}</Text>
                                        </View>
                                        <Ionicons name="calendar-outline" size={20} color="#3B82F6" style={styles.inputIcon} />
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.timeInputWrapper}>
                                    <TouchableOpacity
                                        style={styles.inputTouchable}
                                        onPress={() => setShowFromTimePicker(true)}
                                    >
                                        <View style={styles.inputContent}>
                                            <Text style={styles.inputLabel}>TIME</Text>
                                            <Text style={styles.inputValue}>{formatTime(fromDate)}</Text>
                                        </View>
                                        <Ionicons name="time-outline" size={20} color="#3B82F6" style={styles.inputIcon} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>

                    {/* To Date Input */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>
                            To Date (DD-MM-YY HH:MM) <Text style={styles.required}>*</Text>
                        </Text>
                        <View style={styles.dateTimePickerContainer}>
                            <View style={styles.dateTimeRow}>
                                <View style={styles.dateInputWrapper}>
                                    <TouchableOpacity
                                        style={styles.inputTouchable}
                                        onPress={() => setShowToDatePicker(true)}
                                    >
                                        <View style={styles.inputContent}>
                                            <Text style={styles.inputLabel}>DATE</Text>
                                            <Text style={styles.inputValue}>{formatDate(toDate)}</Text>
                                        </View>
                                        <Ionicons name="calendar-outline" size={20} color="#3B82F6" style={styles.inputIcon} />
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.timeInputWrapper}>
                                    <TouchableOpacity
                                        style={styles.inputTouchable}
                                        onPress={() => setShowToTimePicker(true)}
                                    >
                                        <View style={styles.inputContent}>
                                            <Text style={styles.inputLabel}>TIME</Text>
                                            <Text style={styles.inputValue}>{formatTime(toDate)}</Text>
                                        </View>
                                        <Ionicons name="time-outline" size={20} color="#3B82F6" style={styles.inputIcon} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>

                    {/* Buttons */}
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={[styles.button, styles.backButtonStyle]}
                            onPress={handleBackButton}
                        >
                            <Text style={[styles.buttonText, styles.backButtonText]}>Back</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.button, styles.getDataButton]}
                            onPress={handleGetData}
                        >
                            <Text style={[styles.buttonText, styles.getDataButtonText]}>Get Data</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>

            {/* Date/Time Pickers */}
            {showFromDatePicker && (
                <DateTimePicker
                    value={fromDate}
                    mode="date"
                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                    onChange={onFromDateChange}
                />
            )}
            {showFromTimePicker && (
                <DateTimePicker
                    value={fromDate}
                    mode="time"
                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                    onChange={onFromTimeChange}
                />
            )}
            {showToDatePicker && (
                <DateTimePicker
                    value={toDate}
                    mode="date"
                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                    onChange={onToDateChange}
                />
            )}
            {showToTimePicker && (
                <DateTimePicker
                    value={toDate}
                    mode="time"
                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                    onChange={onToTimeChange}
                />
            )}
        </View>
    );
}

export default Get_StatisticsScreen;