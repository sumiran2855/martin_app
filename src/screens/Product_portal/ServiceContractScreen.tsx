import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useMemo, useState } from 'react';
import {
    ScrollView,
    StatusBar,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import Card from '../../components/Card/Card';
import styles from './ServiceContractScreen.styles';

interface XRGISystem {
    id: string;
    name: string;
    systemId: string;
    status: 'pending' | 'active' | 'inactive' | 'data-missing';
    image?: string;
}

type RootStackParamList = {
    XRGI_System: undefined;
    XRGI_Details: { item: any };
};
type XRGISystemScreenNavigationProp = StackNavigationProp<RootStackParamList, 'XRGI_System'>;

const ServiceContractScreen: React.FC = () => {
    const navigation = useNavigation<XRGISystemScreenNavigationProp>();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedFilter, setSelectedFilter] = useState<string>('All');
    const [showFilterModal, setShowFilterModal] = useState(false);

    // Mock data - updated with matching statuses
    const systems: XRGISystem[] = [
        { id: '1', name: 'Sumiran S01', systemId: '2100770084', status: 'pending' },
        { id: '2', name: 'Sumiran S02', systemId: '2100770084', status: 'pending' },
        { id: '3', name: 'Sumiran S03', systemId: '2100770084', status: 'pending' },
        { id: '4', name: 'Sumiran S04', systemId: '2100770084', status: 'pending' },
        { id: '5', name: 'Martin S01', systemId: '2100770085', status: 'active' },
        { id: '6', name: 'Martin S02', systemId: '2100770086', status: 'active' },
        { id: '7', name: 'Wilson S01', systemId: '2100770087', status: 'active' },
    ];

    const filterOptions = [
        { label: 'All', value: 'All' },
        { label: 'Active', value: 'Active' },
        { label: 'Pending', value: 'Pending' },
    ];

    const handleFilterSelect = (filterValue: string) => {
        setSelectedFilter(filterValue);
        setShowFilterModal(false);
    };

    // Filter and search logic - FIXED
    const filteredSystems = useMemo(() => {
        let filtered = systems;

        // Apply filter
        if (selectedFilter !== 'All') {
            const statusMap: Record<string, XRGISystem['status'] | null> = {
                'All': null,
                'Active': 'active',
                'Pending': 'pending',
            };
            const mappedStatus = statusMap[selectedFilter];
            if (mappedStatus) {
                filtered = filtered.filter(system => system.status === mappedStatus);
            }
        }

        // Apply search
        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter(
                system =>
                    system.name.toLowerCase().includes(query) ||
                    system.systemId.includes(query)
            );
        }

        return filtered;
    }, [searchQuery, selectedFilter]);

    // Separate systems by status
    const pendingSystems = filteredSystems.filter(s => s.status === 'pending');
    const activeSystems = filteredSystems.filter(s => s.status === 'active');

    const handleBackButton = () => {
        navigation.goBack();
    };

    const handleCardPress = (item: XRGISystem) => {
        console.log('Card pressed:', item.id);
    };

    const handleDelete = (id: string) => {
        console.log('Delete system:', id);
    };

    const renderSystemCard = (system: XRGISystem) => (
        <Card
            key={system.id}
            item={{
                ...system,
                status: system.status as any,
                serialNumber: system.systemId,
            }}
            onPress={handleCardPress}
            onDelete={handleDelete}
        />
    );

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#fff" />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={handleBackButton}>
                    <Ionicons name="arrow-back" size={24} color="#1a365d" />
                </TouchableOpacity>
                <View style={styles.headerSpacer} />
            </View>

            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                {/* Title Section */}
                <View style={styles.titleSection}>
                    <Text style={styles.title}>Service Contracts</Text>
                    <Text style={styles.subtitle}>
                        View and manage all XRGi® systems that have an associated service partner
                    </Text>
                </View>

                {/* Search and Filter Section */}
                <View style={styles.controlsSection}>
                    <View style={styles.searchContainer}>
                        <Ionicons name="search" size={20} color="#64748b" />
                        <TextInput
                            style={styles.searchInput}
                            placeholder="Search by name or XRGI ID"
                            placeholderTextColor="#94a3b8"
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                        />
                        {searchQuery.length > 0 && (
                            <TouchableOpacity onPress={() => setSearchQuery('')}>
                                <Ionicons name="close-circle" size={20} color="#94a3b8" />
                            </TouchableOpacity>
                        )}
                    </View>

                    {/* FIXED: Dropdown with proper container */}
                    <View style={styles.dropdownContainer}>
                        <TouchableOpacity
                            style={styles.sortButton}
                            onPress={() => setShowFilterModal(!showFilterModal)}
                        >
                            <MaterialIcons name="filter-list" size={20} color="#1a365d" />
                            <Text style={styles.sortButtonText}>Sort by : </Text>
                            <Ionicons
                                name="chevron-down"
                                size={16}
                                color="#1a365d"
                                style={showFilterModal ? styles.dropdownIconRotated : undefined}
                            />
                        </TouchableOpacity>

                        {/* Dropdown Menu */}
                        {showFilterModal && (
                            <ScrollView
                                style={styles.dropdownMenu}
                                nestedScrollEnabled={true}
                                showsVerticalScrollIndicator={false}
                            >
                                {filterOptions.map((option) => (
                                    <TouchableOpacity
                                        key={option.value}
                                        style={[
                                            styles.dropdownItem,
                                            selectedFilter === option.value && styles.dropdownItemSelected
                                        ]}
                                        onPress={() => handleFilterSelect(option.value)}
                                    >
                                        <Text style={[
                                            styles.dropdownItemText,
                                            selectedFilter === option.value && styles.dropdownItemTextSelected
                                        ]}>
                                            {option.label}
                                        </Text>
                                        {selectedFilter === option.value && (
                                            <MaterialIcons name="check" size={16} color="#1a5490" />
                                        )}
                                    </TouchableOpacity>
                                ))}
                            </ScrollView>
                        )}
                    </View>
                </View>

                {pendingSystems.length > 0 && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>
                            XRGi® systems requesting a service contract
                        </Text>
                        {pendingSystems.map(renderSystemCard)}
                    </View>
                )}

                {/* Active Systems Section */}
                {activeSystems.length > 0 && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>
                            XRGi® systems with active service contract
                        </Text>
                        {activeSystems.map(renderSystemCard)}
                    </View>
                )}

                {/* Empty State */}
                {filteredSystems.length === 0 && (
                    <View style={styles.emptyState}>
                        <MaterialIcons name="search-off" size={64} color="#cbd5e1" />
                        <Text style={styles.emptyStateTitle}>No systems found</Text>
                        <Text style={styles.emptyStateText}>
                            Try adjusting your search or filter criteria
                        </Text>
                    </View>
                )}

                <View style={styles.bottomSpacer} />
            </ScrollView>
        </View>
    );
};

export default ServiceContractScreen;
