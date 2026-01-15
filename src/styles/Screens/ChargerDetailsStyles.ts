// src/styles/Screens/ChargerDetailsStyles.ts
import { StyleSheet } from 'react-native';
import { Colors } from '../GlobalStyles';

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
    padding: 20, 
    paddingBottom: 120 // Espaço extra para o footer não tapar o conteúdo
  },

  // --- HEADER SECTION ---
  header: { 
    marginBottom: 25 
  },
  titleRow: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'flex-start', 
    marginBottom: 8 
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
    backgroundColor: '#FFF9C4', // Amarelo muito claro
    paddingHorizontal: 8, 
    paddingVertical: 4, 
    borderRadius: 12 
  },
  ratingText: { 
    fontSize: 14, 
    fontWeight: 'bold', 
    color: '#FBC02D', // Amarelo escuro
    marginLeft: 4 
  },
  statusTag: { 
    alignSelf: 'flex-start', 
    flexDirection: 'row', 
    alignItems: 'center', 
    paddingHorizontal: 10, 
    paddingVertical: 6, 
    borderRadius: 20,
    // Cor de fundo é dinâmica no componente
  },
  statusDot: { 
    width: 8, 
    height: 8, 
    borderRadius: 4, 
    marginRight: 6 
  },
  statusText: { 
    fontSize: 12, 
    fontWeight: 'bold' 
  },

  // --- SPECS GRID ---
  sectionTitle: { 
    fontSize: 18, 
    fontWeight: '600', 
    color: Colors.dark, 
    marginBottom: 15 
  },
  specsGrid: { 
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    gap: 12, 
    marginBottom: 25 
  },
  specCard: { 
    width: '48%', // Quase metade para caber 2 por linha com gap
    backgroundColor: Colors.background, 
    borderRadius: 12, 
    padding: 15, 
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border
  },
  specLabel: { 
    fontSize: 12, 
    color: Colors.gray, 
    marginTop: 8, 
    marginBottom: 4 
  },
  specValue: { 
    fontSize: 16, 
    fontWeight: 'bold', 
    color: Colors.dark 
  },

  // --- INFO SECTION ---
  infoSection: { 
    backgroundColor: Colors.background, 
    padding: 15, 
    borderRadius: 12 
  },
  infoRow: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    gap: 10 
  },
  infoText: { 
    fontSize: 14, 
    color: Colors.gray, 
    flex: 1, 
    lineHeight: 20 
  },

  // --- FOOTER (Sticky) ---
  footer: {
    position: 'absolute', 
    bottom: 0, 
    left: 0, 
    right: 0,
    backgroundColor: Colors.white,
    borderTopWidth: 1, 
    borderTopColor: Colors.border,
    padding: 20, 
    paddingBottom: 30, // Safe area para iPhones novos
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center',
    // Sombra para dar destaque
    shadowColor: Colors.shadow, 
    shadowOffset: { width: 0, height: -3 }, 
    shadowOpacity: 0.1, 
    shadowRadius: 4, 
    elevation: 10
  },
  priceLabel: { 
    fontSize: 12, 
    color: Colors.gray 
  },
  priceValue: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    color: Colors.dark 
  },
  reserveButton: { 
    backgroundColor: Colors.primary, 
    paddingVertical: 14, 
    paddingHorizontal: 32, 
    borderRadius: 12, 
    elevation: 2 
  },
  reserveButtonText: { 
    color: Colors.white, 
    fontSize: 16, 
    fontWeight: 'bold' 
  }
});