import { StyleSheet } from 'react-native';
import { Colors, Metrics, GlobalStyles } from '../GlobalStyles';

export const MyChargersStyles = StyleSheet.create({
  // ==========================================
  // 1. CONTENTOR PRINCIPAL
  // ==========================================
  container: {
    ...GlobalStyles.container,
  },
  listContent: {
    padding: Metrics.padding,
    paddingBottom: 40,
  },

  // ==========================================
  // 2. CARTÃO DO CARREGADOR (LIST ITEM)
  // ==========================================
  card: {
    backgroundColor: Colors.white,
    borderRadius: Metrics.radius + 4,
    marginBottom: Metrics.spacing * 1.5,
    flexDirection: 'row',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.border,
    ...GlobalStyles.shadow, // Aplica a sombra definida no GlobalStyles
  },
  imagePreview: {
    width: 100,
    height: '100%',
    backgroundColor: Colors.primaryLight,
  },
  infoContainer: {
    flex: 1,
    padding: 12,
    justifyContent: 'center',
  },

  // ==========================================
  // 3. TIPOGRAFIA DO CARTÃO
  // ==========================================
  address: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.dark,
    marginBottom: 4,
  },
  specRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  specText: {
    fontSize: 12,
    color: Colors.gray,
    marginLeft: 6,
  },

  // ==========================================
  // 4. AÇÕES E STATUS
  // ==========================================
  actionsContainer: {
    flexDirection: 'column',
    borderLeftWidth: 1,
    borderLeftColor: Colors.border,
    width: 50,
  },
  actionButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
  deleteButton: {
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  statusBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    zIndex: 10,
  },
  statusText: {
    fontSize: 9,
    fontWeight: '800',
    color: Colors.white,
    textTransform: 'uppercase',
  },

  // ==========================================
  // 5. ESTADO VAZIO (EMPTY STATE)
  // ==========================================
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
    paddingHorizontal: 40,
  },
  emptyText: {
    fontSize: 16,
    color: Colors.gray,
    textAlign: 'center',
    marginTop: 15,
    lineHeight: 22,
  },
  addFirstButton: {
    marginTop: 20,
    paddingVertical: 12,
    paddingHorizontal: 25,
    backgroundColor: Colors.primaryLight,
    borderRadius: Metrics.radius,
  },
  addFirstText: {
    color: Colors.primaryDark,
    fontWeight: 'bold',
  }
});