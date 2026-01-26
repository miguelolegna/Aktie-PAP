import { StyleSheet, Dimensions } from 'react-native';
import { Colors } from '../GlobalStyles';

const { width } = Dimensions.get('window');

export const MapScreenStyles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  map: { ...StyleSheet.absoluteFillObject },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  markerContainer: {
    width: 38, height: 38, justifyContent: 'center', alignItems: 'center',
    backgroundColor: 'white', borderRadius: 19, borderWidth: 2, borderColor: Colors.primary, elevation: 4,
  },
  overlayContainer: {
    position: 'absolute',
    bottom: 95, // Elevado para não bater na Navbar
    width: width, paddingHorizontal: 20, zIndex: 1000,
  },
  calloutContainer: {
    width: '100%', backgroundColor: 'white', borderRadius: 20, overflow: 'hidden', elevation: 15,
  },
  calloutHeader: {
    backgroundColor: Colors.primary, padding: 15, flexDirection: 'row', 
    justifyContent: 'space-between', alignItems: 'center',
  },
  calloutTitle: { color: 'white', fontWeight: 'bold', fontSize: 16, flex: 1 },
  calloutBody: { padding: 20 },
  calloutRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  calloutLabel: { color: '#888', fontSize: 11, fontWeight: 'bold', textTransform: 'uppercase' },
  calloutValue: { color: '#333', fontWeight: '700', fontSize: 14 },
  calloutDivider: { height: 1, backgroundColor: '#f0f0f0', marginVertical: 15 },
  actionButton: {
    backgroundColor: Colors.primary, borderRadius: 12, paddingVertical: 15,
    flexDirection: 'row', justifyContent: 'center', alignItems: 'center',
  },
  actionButtonText: { color: 'white', fontWeight: 'bold', fontSize: 14, marginRight: 8 },
});