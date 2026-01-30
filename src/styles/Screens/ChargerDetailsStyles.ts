import { StyleSheet, Dimensions, Platform } from 'react-native';
import { Colors } from '../GlobalStyles';

const { width } = Dimensions.get('window');

export const chargerDetailsStyles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: Colors.white 
  },
  loadingContainer: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  scrollContent: { 
    paddingBottom: 120 
  },

  // --- IMAGE SECTION ---
  imageContainer: {
    width: width,
    height: 280,
    backgroundColor: Colors.background,
  },
  chargerImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  placeholderImage: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
  },

  // --- CONTENT WRAPPER ---
  contentWrapper: {
    paddingHorizontal: 20,
    marginTop: -25, // Sobreposição para efeito moderno
    backgroundColor: Colors.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 30,
  },

  // --- HEADER SECTION ---
  header: { 
    marginBottom: 25 
  },
  titleRow: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    marginBottom: 10 
  },
  addressTitle: { 
    fontSize: 22, 
    fontWeight: 'bold', 
    color: Colors.dark, 
    flex: 1, 
    marginRight: 10 
  },
  ratingBadge: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: '#FFF9C4', 
    paddingHorizontal: 10, 
    paddingVertical: 5, 
    borderRadius: 15 
  },
  ratingText: { 
    fontSize: 14, 
    fontWeight: 'bold', 
    color: '#FBC02D', 
    marginLeft: 4 
  },

  // --- SPECS GRID ---
  sectionTitle: { 
    fontSize: 18, 
    fontWeight: '700', 
    color: Colors.dark, 
    marginBottom: 15,
    letterSpacing: 0.5
  },
  specsGrid: { 
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    justifyContent: 'space-between',
    marginBottom: 25 
  },
  specCard: { 
    width: '48%', 
    backgroundColor: '#F8F9FA', 
    borderRadius: 16, 
    padding: 18, 
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#F1F3F5'
  },
  specLabel: { 
    fontSize: 11, 
    color: Colors.gray, 
    marginTop: 8, 
    textTransform: 'uppercase',
    fontWeight: '700'
  },
  specValue: { 
    fontSize: 15, 
    fontWeight: 'bold', 
    color: Colors.dark,
    marginTop: 2
  },

  // --- INFO SECTION ---
  infoSection: { 
    backgroundColor: '#F8F9FA', 
    padding: 20, 
    borderRadius: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#F1F3F5'
  },
  infoText: { 
    fontSize: 14, 
    color: '#495057', 
    lineHeight: 22 
  },

  // --- FOOTER (FIXO) ---
  footer: {
    position: 'absolute', 
    bottom: 0, 
    left: 0, 
    right: 0,
    backgroundColor: Colors.white,
    borderTopWidth: 1, 
    borderTopColor: '#EEEEEE',
    padding: 20, 
    paddingBottom: Platform.OS === 'ios' ? 40 : 25,
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center',
    elevation: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -10 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
  },
  priceLabel: { // O ESTILO QUE FALTAVA
    fontSize: 12,
    color: Colors.gray,
    textTransform: 'uppercase',
    fontWeight: '600',
    marginBottom: 2
  },
  priceValue: { 
    fontSize: 24, 
    fontWeight: '800', 
    color: Colors.primary 
  },
  reserveButton: { 
    backgroundColor: Colors.primary, 
    paddingVertical: 15, 
    paddingHorizontal: 35, 
    borderRadius: 15, 
  },
  reserveButtonText: { 
    color: Colors.white, 
    fontSize: 16, 
    fontWeight: 'bold',
    textTransform: 'uppercase'
  }
});