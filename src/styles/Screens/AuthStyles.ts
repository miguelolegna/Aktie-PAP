// src/styles/Screens/AuthStyles.ts
import { StyleSheet } from 'react-native';
import { Colors, Metrics } from '../GlobalStyles';

export const AuthStyles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: Colors.background 
  },
  scrollContainer: { 
    flexGrow: 1, 
    justifyContent: 'center', 
    padding: Metrics.padding 
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
    color: Colors.gray, 
    textAlign: 'center', 
    marginBottom: 30 
  },
  formContainer: { 
    width: '100%' 
  },
  inputLabel: {
    color: Colors.gray,
    fontSize: 14,
    marginBottom: 5,
    marginLeft: 4,
    fontWeight: '600'
  },
  input: { 
    backgroundColor: Colors.white, 
    borderWidth: 1, 
    borderColor: Colors.border, 
    padding: 15, 
    borderRadius: Metrics.radius, 
    marginBottom: 15,
    fontSize: 16,
    color: Colors.dark 
  },
  primaryButton: { 
    backgroundColor: Colors.primary, 
    padding: 15, 
    borderRadius: Metrics.radius, 
    alignItems: 'center', 
    marginTop: 10,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3
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