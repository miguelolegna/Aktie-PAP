// src/styles/Screens/AddChargerStyles.ts
import { StyleSheet } from 'react-native';
import { Colors, Metrics } from '../GlobalStyles';

export const AddChargerStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    padding: Metrics.padding,
    paddingBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.dark,
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.gray,
    marginBottom: 8,
    marginTop: 15,
  },
  input: {
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Metrics.radius,
    padding: 15,
    fontSize: 16,
    color: Colors.dark,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  optionButton: {
    flex: 1,
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Metrics.radius,
    paddingVertical: 12,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  optionSelected: {
    backgroundColor: Colors.primaryLight,
    borderColor: Colors.primary,
  },
  optionText: {
    fontSize: 13,
    color: Colors.gray,
    fontWeight: '500',
  },
  optionTextSelected: {
    color: Colors.primaryDark,
    fontWeight: 'bold',
  },
  suggestionsContainer: {
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Metrics.radius,
    marginTop: 2,
    maxHeight: 200,
    zIndex: 10,
    elevation: 5,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  suggestionItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: Colors.background,
  },
  suggestionText: {
    fontSize: 14,
    color: Colors.dark,
  },
  submitButton: {
    backgroundColor: Colors.primary,
    borderRadius: Metrics.radius,
    paddingVertical: 18,
    alignItems: 'center',
    marginTop: 30,
  },
  submitText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
});