import { StyleSheet } from 'react-native';
import { Colors } from '../GlobalStyles';

export const HomeStyles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: Colors.background, 
    paddingTop: 50 
  },
  
  center: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  
  title: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    color: Colors.dark 
  },
  
  subtitle: { 
    fontSize: 14, 
    color: Colors.primary 
  },
  
  // Botões
  logoutButton: {
    backgroundColor: Colors.dangerLight, 
    paddingVertical: 8, 
    paddingHorizontal: 12, 
    borderRadius: 8,
    borderWidth: 1, 
    borderColor: Colors.danger
  },
  logoutText: { 
    color: Colors.danger, 
    fontWeight: 'bold', 
    fontSize: 14 
  },

  loginButton: {
    backgroundColor: Colors.primary, 
    paddingVertical: 8, 
    paddingHorizontal: 12, 
    borderRadius: 8,
  },
  loginText: { 
    color: Colors.white, 
    fontWeight: 'bold', 
    fontSize: 14 
  },

  // Cards
  card: {
    backgroundColor: Colors.white,
    marginHorizontal: 20, 
    marginBottom: 15, 
    padding: 15, 
    borderRadius: 12,
    // Sombra
    shadowColor: Colors.shadow, 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05, 
    shadowRadius: 3, 
    elevation: 3,
  },
  
  cardHeader: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    marginBottom: 5 
  },
  
  cardTitle: { 
    fontWeight: 'bold', 
    fontSize: 16, 
    color: Colors.dark, 
    flex: 1 
  },
  
  cardInfo: { 
    fontSize: 14, 
    color: Colors.gray, 
    marginBottom: 5 
  },
  
  cardPrice: { 
    fontSize: 16, 
    fontWeight: 'bold', 
    color: Colors.primary 
  },
  
  // Badges de Estado
  badgeActive: { 
    width: 10, 
    height: 10, 
    borderRadius: 5, 
    backgroundColor: Colors.success 
  },
  
  badgeInactive: { 
    width: 10, 
    height: 10, 
    borderRadius: 5, 
    backgroundColor: Colors.danger 
  }
});