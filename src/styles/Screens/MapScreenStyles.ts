// src/styles/Screens/MapScreenStyles.ts
import { StyleSheet } from 'react-native';
import { Colors } from '../GlobalStyles';

export const MapScreenStyles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.background }
});

export const MapHtmlStyles = `
  body { margin: 0; padding: 0; font-family: -apple-system, sans-serif; }
  #map { height: 100vh; width: 100vw; }

  /* POPUP Styles - Mantive igual, apenas removi o !important desnecessário */
  .leaflet-popup-content-wrapper { border-radius: 12px; padding: 0; overflow: hidden; box-shadow: 0 3px 14px rgba(0,0,0,0.4); }
  .leaflet-popup-content { margin: 0; width: 220px; }
  
  .popup-header { background-color: ${Colors.primary}; color: white; padding: 10px 15px; font-size: 14px; font-weight: bold; }
  .popup-body { padding: 12px 15px; background-color: white; }
  
  .info-row { display: flex; justify-content: space-between; margin-bottom: 6px; font-size: 13px; color: ${Colors.dark}; }
  .info-label { color: ${Colors.gray}; font-size: 11px; text-transform: uppercase; }
  .info-value { font-weight: 600; }
  
  .rating-row { display: flex; align-items: center; margin-bottom: 8px; }
  .stars { color: ${Colors.warning}; font-size: 14px; margin-right: 5px; letter-spacing: 1px; }
  .review-count { color: ${Colors.gray}; font-size: 11px; }
  .new-badge { background-color: ${Colors.success}; color: white; padding: 2px 6px; border-radius: 4px; font-size: 10px; font-weight: bold; }
  
  .popup-footer { border-top: 1px solid ${Colors.border}; padding: 8px 15px; font-size: 11px; color: ${Colors.dark}; font-weight: bold; display: flex; align-items: center; }
  .dot { width: 8px; height: 8px; border-radius: 50%; margin-right: 6px; }
`;