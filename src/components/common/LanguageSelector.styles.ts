import { StyleSheet } from 'react-native';

export const languageStyles = StyleSheet.create({
  // Base container styles
  languageContainer: {
    marginBottom: 8,
  },
  languageLabel: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 8,
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  horizontalScrollContainer: {
    maxHeight: 60,
  },
  scrollContent: {
    paddingHorizontal: 4,
  },
  languageChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginHorizontal: 4,
    borderRadius: 20,
    backgroundColor: '#f3f4f6',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  selectedChip: {
    backgroundColor: '#1e3a8a',
    borderColor: '#1e3a8a',
  },
  chipFlag: {
    fontSize: 16,
    marginRight: 6,
  },
  chipText: {
    fontSize: 14,
    color: '#6b7280',
    fontWeight: '500',
  },
  selectedChipText: {
    color: '#ffffff',
    fontWeight: '600',
  },
});