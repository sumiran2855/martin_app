import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    SafeAreaView,
    StatusBar,
    TextInput,
    Image,
    Animated,
} from 'react-native';
import { MaterialIcons as Icon } from '@expo/vector-icons';
import { styles } from './HomeScreen.styles';

interface MenuItem {
    id: string;
    title: string;
    icon: keyof typeof Icon.glyphMap;
    color: string;
    subtitle: string;
}

interface Section {
    id: string;
    title: string;
    items: MenuItem[];
}

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

const HomeScreen: React.FC = () => {
    const navigation = useNavigation<HomeScreenNavigationProp>();
    const [searchVisible, setSearchVisible] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const dropdownAnimation = React.useRef(new Animated.Value(0)).current;

    const toggleProfileMenu = () => {
        const toValue = showProfileMenu ? 0 : 1;
        setShowProfileMenu(!showProfileMenu);

        Animated.spring(dropdownAnimation, {
            toValue,
            useNativeDriver: true,
            tension: 100,
            friction: 10,
        }).start();
    };

    const handleLogout = () => {
        // Handle logout logic here
        console.log('User logged out');
        setShowProfileMenu(false);
    };

    const handleProfile = () => {
        // Handle profile navigation here
        console.log('Navigate to profile');
        setShowProfileMenu(false);
    };

    const allSections: Section[] = [
        {
            id: '1',
            title: 'Product Portal',
            items: [
                {
                    id: '1-1',
                    title: 'XRGI® Systems',
                    icon: 'devices',
                    color: '#1E88E5',
                    subtitle: 'Manage your systems'
                },
                {
                    id: '1-2',
                    title: 'Service Contracts',
                    icon: 'assignment',
                    color: '#43A047',
                    subtitle: 'View all contracts'
                },
            ],
        },
        {
            id: '2',
            title: 'Service Portal',
            items: [
                {
                    id: '2-1',
                    title: 'Statistics',
                    icon: 'bar-chart',
                    color: '#8E24AA',
                    subtitle: 'View analytics'
                },
                {
                    id: '2-2',
                    title: 'System Configuration',
                    icon: 'settings',
                    color: '#3949AB',
                    subtitle: 'Configure settings'
                },
                {
                    id: '2-3',
                    title: 'Service Reports',
                    icon: 'description',
                    color: '#F4511E',
                    subtitle: 'Access reports'
                },
            ],
        },
        {
            id: '3',
            title: 'Functional Portal',
            items: [
                {
                    id: '3-1',
                    title: 'Unit List',
                    icon: 'view-list',
                    color: '#00897B',
                    subtitle: 'Browse units'
                },
            ],
        },
    ];

    // Filter sections based on search query
    const filteredSections = allSections.filter(section => {
        if (!searchQuery.trim()) return true;
        return section.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            section.items.some(item =>
                item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.subtitle.toLowerCase().includes(searchQuery.toLowerCase())
            );
    });

    const handleMenuPress = (item: MenuItem) => {
        console.log(`Pressed: ${item.title}`);
        if (item.id === '1-1') { 
            navigation.navigate('ProductDashboard');
        } else if (item.id === '1-2') {
            navigation.navigate('ServiceContract');
        }
    };

    const renderMenuItem = (item: MenuItem) => (
        <TouchableOpacity
            key={item.id}
            style={styles.menuItem}
            onPress={() => handleMenuPress(item)}
            activeOpacity={0.7}
        >
            <View style={styles.menuItemContent}>
                <View style={[styles.iconWrapper, { backgroundColor: item.color + '15' }]}>
                    <View style={[styles.iconContainer, { backgroundColor: item.color }]}>
                        <Icon name={item.icon} size={22} color="#FFFFFF" />
                    </View>
                </View>
                <View style={styles.menuTextContainer}>
                    <Text style={styles.menuItemTitle}>{item.title}</Text>
                    <Text style={styles.menuItemSubtitle}>{item.subtitle}</Text>
                </View>
            </View>
            <Icon name="chevron-right" size={24} color="#90A4AE" />
        </TouchableOpacity>
    );

    const renderSection = (section: Section) => (
        <View key={section.id} style={styles.section}>
            <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>{section.title}</Text>
            </View>
            <View style={styles.card}>
                {section.items.map((item, index) => (
                    <View key={item.id}>
                        {renderMenuItem(item)}
                        {index < section.items.length - 1 && <View style={styles.divider} />}
                    </View>
                ))}
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

            {/* Header */}
            <View style={styles.header}>
                <View style={styles.headerContent}>
                    <View style={styles.headerLeft}>
                        <View style={styles.logoContainer}>
                            <Image
                                source={require('../../../assets/logo.png')}
                                style={styles.logoImage}
                                resizeMode="contain"
                            />
                        </View>
                    </View>
                    <View style={styles.headerRight}>
                        <TouchableOpacity
                            style={styles.iconButton}
                            onPress={() => setSearchVisible(!searchVisible)}
                            activeOpacity={0.7}
                        >
                            <Icon name="search" size={22} color="#546E7A" />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.iconButton} activeOpacity={0.7}>
                            <Icon name="notifications-none" size={22} color="#546E7A" />
                            <View style={styles.notificationBadge} />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.profileButton}
                            onPress={toggleProfileMenu}
                            activeOpacity={0.8}
                        >
                            <View style={styles.profileAvatar}>
                                <Text style={styles.profileAvatarText}>JD</Text>
                            </View>
                        </TouchableOpacity>

                        {/* Profile Dropdown Menu */}
                        {showProfileMenu && (
                            <Animated.View
                                style={[
                                    styles.dropdownMenu,
                                    {
                                        opacity: dropdownAnimation,
                                        transform: [
                                            {
                                                translateY: dropdownAnimation.interpolate({
                                                    inputRange: [0, 1],
                                                    outputRange: [-10, 0]
                                                })
                                            },
                                            {
                                                scale: dropdownAnimation.interpolate({
                                                    inputRange: [0, 1],
                                                    outputRange: [0.95, 1]
                                                })
                                            }
                                        ]
                                    }
                                ]}
                            >
                                <View style={styles.dropdownHeader}>
                                    <View style={styles.dropdownProfileSection}>
                                        <View style={styles.dropdownAvatar}>
                                            <Text style={styles.dropdownAvatarText}>JD</Text>
                                        </View>
                                        <View style={styles.dropdownUserInfo}>
                                            <Text style={styles.dropdownUserName}>John Doe</Text>
                                            <Text style={styles.dropdownUserEmail}>Joe Interpreter</Text>
                                        </View>
                                    </View>
                                </View>

                                <View style={styles.dropdownDivider} />

                                <TouchableOpacity
                                    style={styles.dropdownItem}
                                    onPress={handleProfile}
                                    activeOpacity={0.7}
                                >
                                    <View style={styles.dropdownIconWrapper}>
                                        <Icon name="person-outline" size={20} color="#546E7A" />
                                    </View>
                                    <Text style={styles.dropdownItemText}>My Profile</Text>
                                    <Icon name="chevron-right" size={18} color="#B0BEC5" />
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={styles.dropdownItem}
                                    onPress={() => {
                                        console.log('Navigate to settings');
                                        setShowProfileMenu(false);
                                    }}
                                    activeOpacity={0.7}
                                >
                                    <View style={styles.dropdownIconWrapper}>
                                        <Icon name="settings" size={20} color="#546E7A" />
                                    </View>
                                    <Text style={styles.dropdownItemText}>Settings</Text>
                                    <Icon name="chevron-right" size={18} color="#B0BEC5" />
                                </TouchableOpacity>

                                <View style={styles.dropdownDivider} />

                                <TouchableOpacity
                                    style={[styles.dropdownItem, styles.logoutItem]}
                                    onPress={handleLogout}
                                    activeOpacity={0.7}
                                >
                                    <View style={[styles.dropdownIconWrapper, styles.logoutIconWrapper]}>
                                        <Icon name="logout" size={20} color="#E53935" />
                                    </View>
                                    <Text style={[styles.dropdownItemText, styles.logoutText]}>Logout</Text>
                                </TouchableOpacity>
                            </Animated.View>
                        )}
                    </View>
                </View>

                {/* Search Bar */}
                {searchVisible && (
                    <View style={styles.searchContainer}>
                        <Icon name="search" size={20} color="#90A4AE" style={styles.searchIcon} />
                        <TextInput
                            style={styles.searchInput}
                            placeholder="Search portals and services..."
                            placeholderTextColor="#90A4AE"
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                            autoCapitalize="none"
                            autoCorrect={false}
                            clearButtonMode="while-editing"
                            returnKeyType="search"
                            onSubmitEditing={() => setSearchVisible(false)}
                        />
                        {searchQuery.length > 0 && (
                            <TouchableOpacity
                                onPress={() => setSearchQuery('')}
                                style={styles.clearButton}
                            >
                                <Icon name="close" size={20} color="#90A4AE" />
                            </TouchableOpacity>
                        )}
                    </View>
                )}
            </View>

            {/* Content */}
            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.contentContainer}
                showsVerticalScrollIndicator={false}
            >

                {/* Sections */}
                {filteredSections.length > 0 ? (
                    filteredSections.map(renderSection)
                ) : (
                    <View style={styles.noResultsContainer}>
                        <Icon name="search-off" size={48} color="#90A4AE" />
                        <Text style={styles.noResultsText}>No results found</Text>
                        <Text style={styles.noResultsSubtext}>Try a different search term</Text>
                    </View>
                )}

                {/* Help Card */}
                <View style={styles.helpCard}>
                    <View style={styles.helpContent}>
                        <View style={styles.helpTextContainer}>
                            <Text style={styles.helpTitle}>Need Assistance?</Text>
                            <Text style={styles.helpDescription}>
                                Our support team is here to help you 24/7
                            </Text>
                            <TouchableOpacity style={styles.helpButton} activeOpacity={0.8}>
                                <Text style={styles.helpButtonText}>Contact Support</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.helpIconContainer}>
                            <Icon name="help-outline" size={32} color="#FFFFFF" />
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default HomeScreen;