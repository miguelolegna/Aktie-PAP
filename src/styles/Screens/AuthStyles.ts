// src/styles/Screens/AuthStyles.ts
import { StyleSheet, Platform } from 'react-native';
import { Colors } from '../GlobalStyles';

export const AuthStyles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: Colors.background // Usa o off-white da paleta
  },
  
  scrollContainer: { 
    flexGrow: 1, 
    justifyContent: 'center', 
    padding: 20 
  },
  
  headerTitle: { 
    fontSize: 32, 
    fontWeight: 'bold', 
    color: Colors.primary, 
    textAlign: 'center', 
    marginBottom: 10 
  },
  
  subTitle: { 
    fontSize: 18, 
    color: Colors.gray, // Alterado para gray para ser subtil
    textAlign: 'center', 
    marginBottom: 30,
  },
  
  formContainer: { 
    width: '100%' 
  },
  
  input: { 
    backgroundColor: Colors.white, // Input branco sobre fundo cinza claro
    borderWidth: 1, 
    borderColor: Colors.border, // #CFD8DC
    padding: 15, 
    borderRadius: 12, 
    marginBottom: 15,
    fontSize: 16,
    color: Colors.dark 
  },
  
  primaryButton: { 
    backgroundColor: Colors.primary, 
    padding: 15, 
    borderRadius: 12, 
    alignItems: 'center', 
    marginTop: 10,
    // Sombra consistente
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 4
  },
  
  primaryButtonText: { 
    color: Colors.white, 
    fontWeight: 'bold', 
    fontSize: 16 
  },
  
  toggleContainer: { 
    marginTop: 20, 
    alignItems: 'center', 
    padding: 10 
  },
  
  toggleText: { 
    color: Colors.dark, 
    fontSize: 14 
  },
  
  toggleTextBold: { 
    color: Colors.primary, 
    fontWeight: 'bold' 
  }
});