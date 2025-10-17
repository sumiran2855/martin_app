import React from 'react';
import { Image, ScrollView, StatusBar, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Icon from "react-native-vector-icons/MaterialIcons";
import useDashboard from '../../hooks/useDashboard';
import Sidebar from '../common/Sidebar';
import styles from './DashboardScreen.styles';

interface DashboardScreenProps { }

const DashboardScreen: React.FC<DashboardScreenProps> = () => {

  const { 
    // State
    selectedFilter,
    dropdownVisible,
    searchQuery,
    sidebarVisible,
    
    // Data
    filterOptions,
    filteredCards,
    
    // Functions
    setDropdownVisible,
    setSidebarVisible,
    handleFilterSelect,
    handleSearchChange,
    handleSidebarMenuPress,
    handleRegisterXRGI,
  } = useDashboard();


  const renderCard = (item: any) => (
    <View key={item.id} style={styles.card}>
      <View style={styles.cardContent}>
        <Image source={require('../../../assets/card.png')} style={styles.cardImage} />

        <View style={styles.cardInfo}>
          <View style={styles.statusContainer}>
            <Text style={[
              styles.statusText,
              item.status === 'Active' ? styles.activeStatusText :
                item.status === 'Inactive' ? styles.inactiveStatusText :
                  styles.dataMissingStatusText
            ]}>
              {item.status}
            </Text>
          </View>

          <Text style={styles.cardName}>{item.name}</Text>
          <Text style={styles.cardSerial}>{item.serialNumber}</Text>
        </View>

        <TouchableOpacity style={styles.deleteButton}>
          <View style={styles.deleteIcon}>
            <Icon name="delete-outline" size={20} color="#FF3B30" />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      {/* Top Navigation */}
      <View style={styles.topNav}>
        <TouchableOpacity style={styles.appIcon} onPress={() => setSidebarVisible(true)}>
          {/* <Image source={require('../../assets/logo.png')} style={styles.logoImage} /> */}
          <Icon name="format-list-bulleted" size={24} color="#000" />
        </TouchableOpacity>
        <View style={styles.profileIcon}>
          <Image source={require('../../../assets/profile.jpeg')} style={styles.profileImage} />
        </View>
      </View>

      {/* Title Section */}
      <View style={styles.titleSection}>
        <Text style={styles.mainTitle}>Your XRGI® Systems</Text>
        <Text style={styles.subtitle}>This is an overview of your XRGI® Systems.</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search by name or XRGI ID"
            placeholderTextColor="#999"
            value={searchQuery}
            onChangeText={handleSearchChange}
          />
        </View>
      </View>

      {/* Controls Section */}
      <View style={styles.controlsSection}>
        <View style={styles.dropdownContainer}>
          <TouchableOpacity
            style={styles.sortButton}
            onPress={() => setDropdownVisible(!dropdownVisible)}
          >
            <Text style={styles.sortText}>Sort by: {selectedFilter}</Text>
            <Text style={[styles.dropdownIcon, dropdownVisible && styles.dropdownIconRotated]}>▼</Text>
          </TouchableOpacity>

          {dropdownVisible && (
            <View style={styles.dropdownMenu}>
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
                    <Icon name="check" size={16} color="#1a5490" />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        <TouchableOpacity style={styles.registerButton} onPress={handleRegisterXRGI}>
          <Text style={styles.registerText}>Register XRGI®</Text>
        </TouchableOpacity>
      </View>

      {/* Overlay to close dropdown */}
      {dropdownVisible && (
        <TouchableOpacity
          style={styles.dropdownOverlay}
          onPress={() => setDropdownVisible(false)}
        />
      )}

      {/* Scrollable Content */}
      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Active Section */}
        {filteredCards.active.length > 0 && (
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Active</Text>
            {filteredCards.active.map(renderCard)}
          </View>
        )}

        {/* Inactive Section */}
        {filteredCards.inactive.length > 0 && (
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitleInactive}>Inactive</Text>
            {filteredCards.inactive.map(renderCard)}
          </View>
        )}

        {/* Data Missing Section */}
        {filteredCards.dataMissing.length > 0 && (
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitleDataMissing}>Data Missing</Text>
            {filteredCards.dataMissing.map(renderCard)}
          </View>
        )}

        {/* No Results Message */}
        {filteredCards.active.length === 0 &&
          filteredCards.inactive.length === 0 &&
          filteredCards.dataMissing.length === 0 &&
          searchQuery.trim() !== '' && (
            <View style={styles.noResultsContainer}>
              <Text style={styles.noResultsText}>
                No XRGI® systems found matching "{searchQuery}"
              </Text>
            </View>
          )}
      </ScrollView>

      <Sidebar
        isVisible={sidebarVisible}
        onClose={() => setSidebarVisible(false)}
        onMenuItemPress={handleSidebarMenuPress}
      />
    </View>
  );
};

export default DashboardScreen;