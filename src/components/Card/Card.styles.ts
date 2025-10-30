import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  cardImageContainer: {
    marginRight: 16,
  },
  cardImageWrapper: {
    width: 72,
    height: 72,
    borderRadius: 12,
    backgroundColor: '#f8fafc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardImage: {
    width: '80%',
    height: '80%',
  },
  cardInfo: {
    flex: 1,
    gap: 6,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  statusBadgeActive: {
    backgroundColor: '#f0fdf4',
    borderWidth: 0.5,
    borderColor: '#86efac',
  },
  statusBadgeInactive: {
    backgroundColor: '#fef2f2',
    borderWidth: 0.5,
    borderColor: '#fca5a5',
  },
  statusBadgePending: {
    backgroundColor: '#fffbeb',
    borderWidth: 0.5,
    borderColor: '#fcd34d',
  },
  statusBadgeDataMissing: {
    backgroundColor: '#f9fafb',
    borderWidth: 0.5,
    borderColor: '#d1d5db',
  },
  statusText: {
    fontSize: 11,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  activeStatusText: {
    color: '#16a34a',
  },
  inactiveStatusText: {
    color: '#dc2626',
  },
  statusTextPending: {
    color: '#d97706',
  },
  dataMissingStatusText: {
    color: '#6b7280',
  },
  cardName: {
    fontSize: 17,
    fontWeight: '600',
    color: '#0f172a',
    lineHeight: 24,
  },
  cardSerial: {
    fontSize: 14,
    color: '#64748b',
    fontWeight: '400',
  },
  deleteButton: {
    padding: 8,
    marginLeft: 12,
  },
});