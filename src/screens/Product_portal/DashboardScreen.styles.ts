import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff93',
    paddingTop: 50,
  },

  // Top navigation styles
  topNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  appIcon: {
    width: 42,
    height: 42,
    backgroundColor: '#fffcfcff',
    borderRadius: 21,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  logoImage: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  profileIcon: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImage: {
    width: 38,
    height: 38,
    borderRadius: 19,
    resizeMode: 'cover',
  },

  // Title section styles
  titleSection: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  mainTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },

  // Search container styles
  searchContainer: {
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffffff',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  searchIcon: {
    fontSize: 16,
    marginRight: 8,
    color: '#666',
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#000',
    padding: 0,
  },

  // Controls section styles
  controlsSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  sortButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
    backgroundColor: '#ffffff',
    borderRadius: 6,
    paddingHorizontal: 12
  },
  sortText: {
    fontSize: 16,
    color: '#666',
    marginRight: 5,
  },
  dropdownIcon: {
    fontSize: 12,
    color: '#666',
  },
  registerButton: {
    backgroundColor: '#1a5490',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 6,
  },
  registerText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },

  // Active section styles
  activeSection: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  activeText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2936ecff',
  },

  scrollContainer: {
  flex: 1,
  paddingHorizontal: 20,
},

// Section container styles
sectionContainer: {
  marginBottom: 30,
},
sectionTitle: {
  fontSize: 18,
  fontWeight: '600',
  color: '#4CAF50',
  marginBottom: 15,
},
sectionTitleInactive: {
  fontSize: 18,
  fontWeight: '600',
  color: '#FF5722',
  marginBottom: 15,
},

// Card styles
card: {
  backgroundColor: '#ffffff',
  borderRadius: 12,
  marginBottom: 15,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 4,
  elevation: 3,
},
cardContent: {
  flexDirection: 'row',
  alignItems: 'center',
  padding: 16,
},
cardImage: {
  width: 60,
  height: 45,
  resizeMode: 'contain',
  marginRight: 15,
},
cardInfo: {
  flex: 1,
},
statusContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  marginBottom: 8,
},
statusIndicator: {
  width: 8,
  height: 8,
  borderRadius: 4,
  marginRight: 6,
},
activeIndicator: {
  backgroundColor: '#4CAF50',
},
inactiveIndicator: {
  backgroundColor: '#FF5722',
},
statusText: {
  fontSize: 14,
  fontWeight: '500',
  paddingVertical: 4,
  paddingHorizontal: 8,
  backgroundColor: '#C8E6C9',
  borderRadius: 4,
},
activeStatusText: {
  color: '#2E7D32', 
},
inactiveStatusText: {
  color: '#eb5916ff', 
},
cardName: {
  fontSize: 16,
  fontWeight: '600',
  color: '#000',
  marginBottom: 4,
},
cardSerial: {
  fontSize: 14,
  color: '#666',
},
deleteButton: {
  padding: 8,
},
deleteIcon: {
  width: 32,
  height: 32,
  borderRadius: 16,
  backgroundColor: '#FFEBEE',
  justifyContent: 'center',
  alignItems: 'center',
  borderWidth: 1,
  borderColor: '#FFCDD2',
},
deleteIconText: {
  fontSize: 16,
  color: '#F44336',
},

dropdownContainer: {
  position: 'relative',
  zIndex: 1000,
},
dropdownMenu: {
  position: 'absolute',
  top: '100%',
  left: 0,
  right: 0,
  backgroundColor: '#ffffff',
  borderRadius: 8,
  marginTop: 4,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.15,
  shadowRadius: 8,
  elevation: 8,
  borderWidth: 1,
  borderColor: '#e0e0e0',
  maxHeight: 200,
},
dropdownItem: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingHorizontal: 16,
  paddingVertical: 12,
  borderBottomWidth: 1,
  borderBottomColor: '#f0f0f0',
},
dropdownItemSelected: {
  backgroundColor: '#f8f9ff',
},
dropdownItemText: {
  fontSize: 16,
  color: '#333',
  fontWeight: '400',
},
dropdownItemTextSelected: {
  color: '#1a5490',
  fontWeight: '600',
},
dropdownIconRotated: {
  transform: [{ rotate: '180deg' }],
},
dropdownOverlay: {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'transparent',
  zIndex: 999,
},

// Updated status text styles for Data Missing
dataMissingStatusText: {
  color: '#FF9800',
  backgroundColor: '#FFF3E0',
},

// Section title for Data Missing
sectionTitleDataMissing: {
  fontSize: 18,
  fontWeight: '600',
  color: '#FF9800',
  marginBottom: 15,
},

noResultsContainer: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  paddingVertical: 40,
  paddingHorizontal: 20,
},

noResultsText: {
  fontSize: 16,
  color: '#666',
  textAlign: 'center',
  fontWeight: '500',
},
});

export default styles;