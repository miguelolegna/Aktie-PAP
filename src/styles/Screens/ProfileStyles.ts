// src/styles/Screens/ProfileStyles.ts
import { StyleSheet } from 'react-native';
import { Colors, Metrics } from '../GlobalStyles';

export const ProfileStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: Metrics.padding,
    paddingBottom: 110, 
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background,
    padding: Metrics.padding,
  },
  header: {
    alignItems: 'center',
    marginVertical: 30,
  },
  avatarPlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  avatarLetter: {
    fontSize: 32,
    fontWeight: 'bold',
    color: Colors.primaryDark,
  },
  name: {
    color: Colors.dark,
    fontSize: 24,
    fontWeight: 'bold',
  },
  email: {
    color: Colors.gray,
    fontSize: 14,
    marginTop: 4,
  },
  guestTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.dark,
    marginTop: 10,
  },
  guestSubtitle: {
    fontSize: 14,
    color: Colors.gray,
    textAlign: 'center',
    marginTop: 10,
    lineHeight: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  statBox: {
    backgroundColor: Colors.white,
    padding: 15,
    borderRadius: Metrics.radius,
    alignItems: 'center',
    width: '48%',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  statLabel: {
    color: Colors.gray,
    fontSize: 11,
    textTransform: 'uppercase',
    marginBottom: 5,
  },
  statValue: {
    color: Colors.primary,
    fontSize: 18,
    fontWeight: 'bold',
  },
  primaryButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 16,
    borderRadius: Metrics.radius,
    alignItems: 'center',
    marginTop: 'auto',
    marginBottom: 12,
  },
  logoutButton: {
    backgroundColor: Colors.dangerLight,
    borderWidth: 1,
    borderColor: Colors.danger,
    paddingVertical: 16,
    borderRadius: Metrics.radius,
    alignItems: 'center',
  },
  buttonText: {
    color: Colors.white,
    fontWeight: 'bold',
    fontSize: 16,
  }
});