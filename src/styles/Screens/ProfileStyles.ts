import { StyleSheet } from 'react-native';
import { Colors } from '../GlobalStyles';

export const ProfileStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background,
    padding: 20
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.white,
    marginBottom: 20
  },
  placeholderText: {
    fontSize: 16,
    color: Colors.gray,
    textAlign: 'center',
    marginBottom: 30,
  },
  actionButton: {
    backgroundColor: Colors.primary,
    width: '100%',
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 10
  },
  authButton: {
    backgroundColor: '#4CAF50', // Verde de destaque para registo
    width: '100%',
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center'
  },
  logoutButton: {
    backgroundColor: '#FF3B30',
    marginTop: 20
  },
  buttonText: {
    color: Colors.white,
    fontWeight: 'bold',
    fontSize: 16,
  }
});