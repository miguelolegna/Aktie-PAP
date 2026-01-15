// src/styles/Screens/AddChargerStyles.ts
import { StyleSheet } from 'react-native';
import { Colors } from '../GlobalStyles';

export const addChargerStyles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  scrollContent: { padding: 20 },
  
  title: { fontSize: 24, fontWeight: 'bold', color: Colors.dark, marginBottom: 20 },
  
  label: { fontSize: 14, color: Colors.gray, marginBottom: 5, marginTop: 15, fontWeight: '600' },
  input: { 
    backgroundColor: Colors.white, 
    borderWidth: 1, 
    borderColor: Colors.border, 
    borderRadius: 8, 
    padding: 12, 
    fontSize: 16, 
    color: Colors.dark 
  },
  textArea: { height: 100, textAlignVertical: 'top' },

  // Seletores (Botões lado a lado)
  row: { flexDirection: 'row', gap: 10, marginTop: 5 },
  optionButton: { 
    flex: 1, 
    padding: 12, 
    borderWidth: 1, 
    borderColor: Colors.border, 
    borderRadius: 8, 
    alignItems: 'center', 
    backgroundColor: Colors.white 
  },
  optionSelected: { 
    backgroundColor: Colors.primaryLight, 
    borderColor: Colors.primary 
  },
  optionText: { color: Colors.gray, fontWeight: '600' },
  optionTextSelected: { color: Colors.primaryDark },

  submitButton: { 
    backgroundColor: Colors.primary, 
    padding: 15, 
    borderRadius: 10, 
    alignItems: 'center', 
    marginTop: 40,
    marginBottom: 40
  },
  submitText: { color: Colors.white, fontSize: 18, fontWeight: 'bold' }
});