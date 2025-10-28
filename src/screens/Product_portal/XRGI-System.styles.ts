import { Dimensions, StyleSheet } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },

  // Header styles
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
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingRight: 12,
  },
  backButtonText: {
    color: '#1a5490',
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 4,
  },

  // Top navigation styles
  topNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SCREEN_WIDTH * 0.05,
    paddingVertical: SCREEN_HEIGHT * 0.02,
    backgroundColor: '#ffffff',
    shadowColor: '#1a5490',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  appIcon: {
    width: 44,
    height: 44,
    backgroundColor: '#f0f4f8',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#1a5490',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  logoImage: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  profileIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#f0f4f8',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#e3e8ef',
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    resizeMode: 'cover',
  },

  // Title section styles
  titleSection: {
    paddingHorizontal: SCREEN_WIDTH * 0.05,
    paddingTop: SCREEN_HEIGHT * 0.025,
    paddingBottom: SCREEN_HEIGHT * 0.015,
  },
  mainTitle: {
    fontSize: SCREEN_WIDTH * 0.065,
    fontWeight: '700',
    color: '#1a365d',
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: SCREEN_WIDTH * 0.038,
    color: '#64748b',
    lineHeight: 22,
    fontWeight: '400',
  },

  // Search container styles
  searchContainer: {
    paddingHorizontal: SCREEN_WIDTH * 0.05,
    paddingVertical: SCREEN_HEIGHT * 0.015,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    paddingHorizontal: SCREEN_WIDTH * 0.04,
    paddingVertical: SCREEN_HEIGHT * 0.015,
    borderWidth: 1.5,
    borderColor: '#e2e8f0',
    shadowColor: '#1a5490',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  searchIcon: {
    fontSize: 18,
    marginRight: 10,
    color: '#94a3b8',
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#1e293b',
    padding: 0,
    fontWeight: '400',
  },

  // Controls section styles
  controlsSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SCREEN_WIDTH * 0.05,
    paddingVertical: SCREEN_HEIGHT * 0.015,
    zIndex: 1000,
  },
  sortButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    shadowColor: '#1a5490',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  sortText: {
    fontSize: 15,
    color: '#475569',
    marginRight: 6,
    fontWeight: '500',
  },
  dropdownIcon: {
    fontSize: 12,
    color: '#64748b',
  },
  registerButton: {
    backgroundColor: '#1a5490',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 10,
    shadowColor: '#1a5490',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  registerText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '600',
    letterSpacing: 0.3,
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
    paddingHorizontal: SCREEN_WIDTH * 0.05,
    paddingTop: SCREEN_HEIGHT * 0.01,
  },

  // Section container styles
  sectionContainer: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#059669',
    marginBottom: 16,
    letterSpacing: 0.2,
    textTransform: 'uppercase',
  },
  sectionTitleInactive: {
    fontSize: 14,
    fontWeight: '700',
    color: '#dc2626',
    marginBottom: 16,
    letterSpacing: 0.2,
    textTransform: 'uppercase',
  },

  // Card styles
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    marginBottom: SCREEN_HEIGHT * 0.015,
    shadowColor: '#1a5490',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#f1f5f9',
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SCREEN_WIDTH * 0.045,
  },
  cardImage: {
    width: 70,
    height: 52,
    resizeMode: 'contain',
    marginRight: 16,
  },
  cardInfo: {
    flex: 1,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
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
    fontSize: 12,
    fontWeight: '600',
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: '#d1fae5',
    borderRadius: 6,
    overflow: 'hidden',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  activeStatusText: {
    color: '#065f46',
    backgroundColor: '#d1fae5',
  },
  inactiveStatusText: {
    color: '#991b1b',
    backgroundColor: '#fee2e2',
  },
  cardName: {
    fontSize: 17,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 6,
    letterSpacing: -0.2,
  },
  cardSerial: {
    fontSize: 14,
    color: '#64748b',
    fontWeight: '400',
  },
  deleteButton: {
    padding: 8,
  },
  deleteIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#fee2e2',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#fecaca',
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
    borderRadius: 12,
    marginTop: 8,
    shadowColor: '#1a5490',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    maxHeight: 200,
    minWidth: 160,
    zIndex: 1000,
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  dropdownItemSelected: {
    backgroundColor: '#eff6ff',
  },
  dropdownItemText: {
    fontSize: 15,
    color: '#475569',
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
    color: '#92400e',
    backgroundColor: '#fef3c7',
  },

  // Section title for Data Missing
  sectionTitleDataMissing: {
    fontSize: 14,
    fontWeight: '700',
    color: '#d97706',
    marginBottom: 16,
    letterSpacing: 0.2,
    textTransform: 'uppercase',
  },

  noResultsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
    paddingHorizontal: 20,
  },

  noResultsText: {
    fontSize: 16,
    color: '#64748b',
    textAlign: 'center',
    fontWeight: '500',
    lineHeight: 24,
  },
});

export default styles;