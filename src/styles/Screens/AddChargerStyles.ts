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

  // ESTILOS DO MAPA (NOVO)
  mapContainer: {
    height: 200,
    width: '100%',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 15,
    borderWidth: 1,
    borderColor: Colors.border,
  },

  mapOverlayLabel: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },

  // COMPONENTES DE SELECÇÃO
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

  // LISTA DE SUGESTÕES
  suggestionsContainer: {
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Metrics.radius,
    marginTop: 2,
    maxHeight: 200,
    zIndex: 10,
    elevation: 5,
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

  // BOTÃO DE ENVIO
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
  // Adicionar ao AddChargerStyles.ts 
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#eee',
  },
  mapTrigger: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  mapTriggerText: {
    marginLeft: 10,
    color: Colors.primary,
    fontWeight: 'bold',
  },
  fixedPinContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginLeft: -22,
    marginTop: -45,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pinShadow: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(0,0,0,0.2)',
    marginTop: -2,
  },
  mapFooter: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: 'white',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    padding: 25,
    alignItems: 'center',
    elevation: 20,
  },
  mapInstruction: {
    fontSize: 14,
    color: '#888',
    marginBottom: 20,
  },
  confirmMapButton: {
    backgroundColor: Colors.primary,
    width: '100%',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  confirmMapText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  }
});