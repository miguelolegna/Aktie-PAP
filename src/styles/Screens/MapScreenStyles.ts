import { StyleSheet, Dimensions } from 'react-native';
import { Colors } from '../GlobalStyles';

const { width } = Dimensions.get('window');

export const MapScreenStyles = StyleSheet.create({
  // CONTENTOR PRINCIPAL
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  // MOTOR DO MAPA
  map: {
    ...StyleSheet.absoluteFillObject,
  },

  // ESTADO DE CARREGAMENTO
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background,
  },

  // DESIGN DO MARCADOR (MARKER)
  markerContainer: {
    width: 38,
    height: 38,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 19,
    borderWidth: 2,
    borderColor: Colors.primary,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },

  // SOBREPOSIÇÃO FLUTUANTE (OVERLAY)
  overlayContainer: {
    position: 'absolute',
    bottom: 95, 
    width: width,
    paddingHorizontal: 20,
    zIndex: 1000,
  },

  // CARD DE INFORMAÇÕES (CALLOUT ALTERNATIVO)
  calloutContainer: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 20,
    overflow: 'hidden',
    elevation: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },

  // CABEÇALHO DO CARD
  calloutHeader: {
    backgroundColor: Colors.primary,
    paddingVertical: 15,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  calloutTitle: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    flex: 1,
  },

  // CORPO DE DADOS DO CARD
  calloutBody: {
    padding: 20,
  },

  calloutRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },

  calloutLabel: {
    color: '#888',
    fontSize: 11,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },

  calloutValue: {
    color: '#333',
    fontWeight: '700',
    fontSize: 14,
  },

  // ELEMENTOS DE SEPARAÇÃO E BOTÕES
  calloutDivider: {
    height: 1,
    backgroundColor: '#f0f0f0',
    marginVertical: 15,
  },

  actionButton: {
    backgroundColor: Colors.primary,
    borderRadius: 12,
    paddingVertical: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
  },

  actionButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
    marginRight: 8,
  }
});