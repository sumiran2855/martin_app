import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F1F5F9',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: '#ffffff',
        borderBottomWidth: 1,
        borderBottomColor: '#e2e8f0',
        zIndex: 10,
    },
    backButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8,
        paddingRight: 12,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#0F172A',
        position: 'absolute',
        left: 0,
        right: 0,
        textAlign: 'center',
    },
    headerSpacer: {
        width: 40,
    },
    scrollView: {
        flex: 1,
    },

    // System Info Card
    systemInfoCard: {
        backgroundColor: '#FFFFFF',
        margin: 16,
        padding: 20,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 4,
    },
    systemTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#0F172A',
        marginBottom: 4,
    },
    systemId: {
        fontSize: 13,
        color: '#64748B',
        marginBottom: 2,
    },
    systemSubtitle: {
        fontSize: 12,
        color: '#94A3B8',
        marginBottom: 16,
    },

    // Time Buttons
    timeButtonsContainer: {
        flexDirection: 'row',
        marginBottom: 16,
        paddingHorizontal: 8,
        height: 50,
    },
    timeButtonsScrollView: {
        paddingVertical: 4,
    },
    timeButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 14,
        backgroundColor: '#F8FAFC',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#E2E8F0',
        gap: 6,
        marginRight: 10,
        height: 42,
        minWidth: 100,
        justifyContent: 'center',
    },
    timeButtonActive: {
        backgroundColor: '#EFF6FF',
        borderColor: '#3B82F6',
    },
    timeButtonText: {
        fontSize: 13,
        fontWeight: '600',
        color: '#64748B',
    },
    timeButtonTextActive: {
        color: '#3B82F6',
    },
    timeButtonValue: {
        fontSize: 11,
        color: '#94A3B8',
        marginTop: 2,
    },
    recordsInfo: {
        fontSize: 12,
        color: '#64748B',
        textAlign: 'center',
    },

    // Status Cards Grid
    statusGrid: {
        flexDirection: 'row',
        paddingHorizontal: 16,
        gap: 12,
        marginBottom: 12,
    },
    statusCardWrapper: {
        flex: 1,
    },
    statusCardFull: {
        paddingHorizontal: 16,
        marginBottom: 12,
    },
    statusCard: {
        backgroundColor: '#FFFFFF',
        padding: 16,
        borderRadius: 12,
        borderLeftWidth: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.06,
        shadowRadius: 4,
        elevation: 2,
    },
    statusCardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    statusCardTitle: {
        fontSize: 13,
        fontWeight: '600',
        color: '#475569',
    },
    statusCardValue: {
        fontSize: 16,
        fontWeight: '700',
        color: '#0F172A',
    },
    activeValue: {
        color: '#3B82F6',
    },

    // Section
    section: {
        backgroundColor: '#FFFFFF',
        margin: 16,
        marginTop: 0,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.06,
        shadowRadius: 4,
        elevation: 2,
        overflow: 'hidden',
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#F8FAFC',
        borderBottomWidth: 1,
        borderBottomColor: '#E2E8F0',
        gap: 8,
    },
    sectionTitle: {
        fontSize: 15,
        fontWeight: '600',
        color: '#0F172A',
    },
    sectionContent: {
        padding: 16,
    },

    // Sensor Row
    sensorRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#F1F5F9',
    },
    sensorLabel: {
        fontSize: 14,
        color: '#475569',
        flex: 1,
    },
    sensorValue: {
        fontSize: 14,
        fontWeight: '600',
        color: '#0F172A',
    },
    percentageValue: {
        color: '#10B981',
    },

    // Green Status Cards
    greenStatusCard: {
        backgroundColor: '#ECFDF5',
        padding: 14,
        borderRadius: 8,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#D1FAE5',
    },
    greenStatusHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 6,
    },
    greenStatusLabel: {
        fontSize: 13,
        color: '#059669',
        fontWeight: '500',
    },
    greenStatusBadge: {
        fontSize: 11,
        fontWeight: '600',
        color: '#10B981',
        backgroundColor: '#D1FAE5',
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 4,
    },
    greenStatusValue: {
        fontSize: 15,
        fontWeight: '700',
        color: '#047857',
    },

    // Control Parameters
    parameterRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 14,
        borderBottomWidth: 1,
        borderBottomColor: '#F1F5F9',
    },
    parameterInfo: {
        flex: 1,
        marginRight: 12,
    },
    parameterLabel: {
        fontSize: 14,
        color: '#475569',
        marginBottom: 2,
    },
    parameterSubtitle: {
        fontSize: 12,
        color: '#94A3B8',
    },
    parameterValue: {
        fontSize: 15,
        fontWeight: '700',
        color: '#8B5CF6',
    },

    // Footer
    footer: {
        backgroundColor: '#0F172A',
        padding: 20,
        marginTop: 16,
    },
    footerText: {
        fontSize: 11,
        color: '#94A3B8',
        marginBottom: 4,
    },
});