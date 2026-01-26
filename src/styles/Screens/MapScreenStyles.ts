// src/styles/Screens/MapScreenStyles.ts
import { StyleSheet } from 'react-native';
import { Colors, Metrics } from '../GlobalStyles';

export const MapScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background,
  },
  markerContainer: {
    padding: 5,
    backgroundColor: 'white',
    borderRadius: 20,
    borderWidth: 2,
    borderColor: Colors.primary,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  calloutContainer: {
    backgroundColor: 'white',
    borderRadius: Metrics.radius,
    padding: 12,
    width: 200,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  calloutTitle: {
    fontWeight: 'bold',
    fontSize: 14,
    color: Colors.dark,
    marginBottom: 4,
  },
  calloutInfo: {
    fontSize: 12,
    color: Colors.gray,
    marginBottom: 8,
  },
  calloutButton: {
    backgroundColor: Colors.primary,
    borderRadius: 6,
    padding: 6,
    alignItems: 'center',
  },
  calloutButtonText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  }
});