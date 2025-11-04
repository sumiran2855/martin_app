import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import styles from "./statisticsResultScreen.styles";

interface StatisticsResultScreenProps {
    navigation: any;
    route: any;
}

interface CallData {
    id: string;
    timeOfCall: string;
    cause: string;
    currentStatus: string;
    latestIncident: string;
    statusOfIncident: string;
}

const StatisticsResultScreen: React.FC<StatisticsResultScreenProps> = ({ navigation, route }) => {
    const { fromDate, toDate } = route.params;

    // Sample data - replace with actual API data
    const callsData: CallData[] = [
        {
            id: "1",
            timeOfCall: "19-09-2025 14:30",
            cause: "System Error",
            currentStatus: "Resolved",
            latestIncident: "Database timeout",
            statusOfIncident: "Closed"
        },
        {
            id: "2",
            timeOfCall: "20-09-2025 09:15",
            cause: "Network Issue",
            currentStatus: "In Progress",
            latestIncident: "Connection lost",
            statusOfIncident: "Open"
        },
        {
            id: "3",
            timeOfCall: "21-09-2025 16:45",
            cause: "Hardware Failure",
            currentStatus: "Pending",
            latestIncident: "Disk failure",
            statusOfIncident: "Under Review"
        },
        {
            id: "4",
            timeOfCall: "22-09-2025 11:20",
            cause: "Software Bug",
            currentStatus: "Resolved",
            latestIncident: "Memory leak",
            statusOfIncident: "Closed"
        },
        {
            id: "5",
            timeOfCall: "23-09-2025 08:00",
            cause: "Power Outage",
            currentStatus: "-",
            latestIncident: "-",
            statusOfIncident: "-"
        }
    ];

    const handleBackButton = () => {
        navigation.goBack();
    };

    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case 'resolved':
            case 'closed':
                return '#10B981';
            case 'in progress':
            case 'open':
                return '#F59E0B';
            case 'pending':
            case 'under review':
                return '#3B82F6';
            default:
                return '#6B7280';
        }
    };

    const getStatusBackground = (status: string) => {
        switch (status.toLowerCase()) {
            case 'resolved':
            case 'closed':
                return '#D1FAE5';
            case 'in progress':
            case 'open':
                return '#FEF3C7';
            case 'pending':
            case 'under review':
                return '#DBEAFE';
            default:
                return '#F3F4F6';
        }
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={handleBackButton}>
                    <Ionicons name="arrow-back" size={22} color="#0F172A" />
                </TouchableOpacity>
                <View style={styles.headerSpacer} />
            </View>

            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                {/* Title Section */}
                <View style={styles.titleSection}>
                    <View style={styles.titleRow}>
                        <View style={styles.iconContainer}>
                            <Ionicons name="stats-chart" size={22} color="#FFFFFF" />
                        </View>
                        <Text style={styles.title}>Statistics Results</Text>
                    </View>
                    <Text style={styles.subtitle}>1470167385 - XRGI® 25</Text>
                    <Text style={styles.description}>
                        Click on the system for which you want to generate an operational analysis
                    </Text>
                </View>

                {/* Summary Card */}
                <View style={styles.summaryCard}>
                    <View style={styles.summaryHeader}>
                        <Text style={styles.summaryTitle}>Total {callsData.length} calls</Text>
                    </View>
                </View>

                {/* Call Cards */}
                {callsData.map((call, index) => (
                    <View key={call.id} style={styles.callCard}>
                        {/* Card Header */}
                        <View style={styles.cardHeader}>
                            <View style={styles.cardHeaderLeft}>
                                <Ionicons name="time-outline" size={18} color="#1E40AF" />
                                <Text style={styles.timeText}>{call.timeOfCall}</Text>
                            </View>
                            <Text style={styles.callNumber}>#{index + 1}</Text>
                        </View>

                        {/* Card Content */}
                        <View style={styles.cardContent}>
                            {/* Cause */}
                            <View style={styles.cardRow}>
                                <Text style={styles.cardLabel}>Cause</Text>
                                <Text style={styles.cardValue}>{call.cause}</Text>
                            </View>

                            {/* Current Status */}
                            <View style={styles.cardRow}>
                                <Text style={styles.cardLabel}>Current Status</Text>
                                <View
                                    style={[
                                        styles.statusBadge,
                                        { backgroundColor: getStatusBackground(call.currentStatus) }
                                    ]}
                                >
                                    <Text
                                        style={[
                                            styles.statusText,
                                            { color: getStatusColor(call.currentStatus) }
                                        ]}
                                    >
                                        {call.currentStatus}
                                    </Text>
                                </View>
                            </View>

                            {/* Latest Incident */}
                            <View style={styles.cardRow}>
                                <Text style={styles.cardLabel}>Latest Incident</Text>
                                <Text style={styles.cardValue}>{call.latestIncident}</Text>
                            </View>

                            {/* Status of Incident */}
                            <View style={styles.cardRow}>
                                <Text style={styles.cardLabel}>Incident Status</Text>
                                <View
                                    style={[
                                        styles.statusBadge,
                                        { backgroundColor: getStatusBackground(call.statusOfIncident) }
                                    ]}
                                >
                                    <Text
                                        style={[
                                            styles.statusText,
                                            { color: getStatusColor(call.statusOfIncident) }
                                        ]}
                                    >
                                        {call.statusOfIncident}
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                ))}

                {/* Action Buttons */}
                <View style={styles.actionButtons}>
                    <TouchableOpacity
                        style={[styles.actionButton, styles.newSearchButton]}
                        onPress={handleBackButton}
                    >
                        <Ionicons name="search-outline" size={20} color="#FFFFFF" />
                        <Text style={styles.newSearchButtonText}>New Search</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
};

export default StatisticsResultScreen;