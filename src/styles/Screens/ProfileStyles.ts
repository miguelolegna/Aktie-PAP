// src/styles/Screens/ProfileStyles.ts
import { StyleSheet } from 'react-native';
import { Colors, Metrics } from '../GlobalStyles';

export const ProfileStyles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: { 
    alignItems: 'center', 
    paddingVertical: 30, 
    backgroundColor: Colors.white,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    elevation: 4,
  },
  avatarContainer: { position: 'relative' },
  avatar: { width: 100, height: 100, borderRadius: 50 },
  editAvatarButton: {
    position: 'absolute', bottom: 0, right: 0,
    backgroundColor: Colors.primary, padding: 8, borderRadius: 20,
    borderWidth: 3, borderColor: Colors.white
  },
  userName: { fontSize: 20, fontWeight: 'bold', color: Colors.dark, marginTop: 12 },
  userEmail: { fontSize: 14, color: Colors.gray },
  section: { marginTop: 25, paddingHorizontal: 20 },
  sectionTitle: { fontSize: 12, fontWeight: '800', color: Colors.gray, textTransform: 'uppercase', marginBottom: 10, letterSpacing: 1 },
  menuItem: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    backgroundColor: Colors.white, padding: 15, borderRadius: 15, marginBottom: 8,
    elevation: 1,
  },
  menuItemLeft: { flexDirection: 'row', alignItems: 'center' },
  iconContainer: { padding: 10, borderRadius: 12, marginRight: 15 },
  menuLabel: { fontSize: 15, fontWeight: '600', color: Colors.dark },
});