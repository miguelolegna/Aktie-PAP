import { StyleSheet } from 'react-native';
import { Colors, Metrics, GlobalStyles } from '../GlobalStyles';

export const AddChargerStyles = StyleSheet.create({
  // ==========================================
  // 1. LAYOUT & CONTENT
  // ==========================================
  container: { ...GlobalStyles.container },
  scrollContent: {
    padding: Metrics.padding,
    paddingBottom: Metrics.padding * 2,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: Metrics.spacing / 2,
    marginHorizontal: -4,
  },

  // ==========================================
  // 2. TYPOGRAPHY
  // ==========================================
  title: {
    ...GlobalStyles.title,
    marginBottom: Metrics.padding,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.gray,
    marginBottom: Metrics.spacing - 2,
    marginTop: Metrics.padding,
  },

  // ==========================================
  // 3. FORM INPUTS & SEARCH
  // ==========================================
  input: {
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Metrics.radius,
    padding: 15,
    fontSize: 16,
    color: Colors.dark,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E9ECEF',
    borderRadius: Metrics.radius,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  mapTrigger: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  mapTriggerText: {
    marginLeft: 10,
    color: Colors.primary,
    fontWeight: 'bold',
  },

  // ==========================================
  // 4. IMAGE PICKER & SUGGESTIONS
  // ==========================================
  imagePicker: {
    width: '100%',
    height: 180,
    backgroundColor: Colors.white,
    borderRadius: Metrics.radius,
    borderWidth: 1.5,
    borderColor: Colors.border,
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagePlaceholder: { alignItems: 'center' },
  previewImage: { width: '100%', height: '100%', borderRadius: Metrics.radius },
  suggestionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: Colors.background,
  },
  suggestionText: { fontSize: 14, color: Colors.dark },

  // ==========================================
  // 5. SLIDING CONTROLS
  // ==========================================
  gridContainer: {
    backgroundColor: '#E9ECEF',
    borderRadius: Metrics.radius + 4,
    padding: 4,
    position: 'relative',
    overflow: 'hidden',
  },
  slidingContainer: {
    flexDirection: 'row',
    backgroundColor: '#E9ECEF',
    borderRadius: Metrics.radius + 4,
    padding: 4,
    position: 'relative',
    alignItems: 'center',
  },
  sliderActiveBg: {
    position: 'absolute',
    left: 4, top: 4,
    backgroundColor: Colors.white,
    borderRadius: Metrics.radius,
    ...GlobalStyles.shadow,
  },
  gridOverlay: { ...StyleSheet.absoluteFillObject, flexDirection: 'row', flexWrap: 'wrap', zIndex: 10 },
  gridOption: { justifyContent: 'center', alignItems: 'center' },
  slidingOption: { justifyContent: 'center', alignItems: 'center', height: '100%', zIndex: 10 },

  // ==========================================
  // 6. STATES & BUTTONS
  // ==========================================
  optionText: { fontSize: 14, color: Colors.gray, fontWeight: '600' },
  optionTextSelected: { color: Colors.primary, fontWeight: 'bold' },
  subLabelText: { fontSize: 10, color: '#ADB5BD', marginTop: 2, textTransform: 'uppercase' },
  subLabelSelected: { color: Colors.primary, fontWeight: '600' },
  
  submitButton: {
    backgroundColor: Colors.primary,
    borderRadius: Metrics.radius,
    padding: 18,
    marginTop: Metrics.padding * 1.5,
    alignItems: 'center',
    ...GlobalStyles.shadow,
  },
  submitText: { color: Colors.white, fontWeight: 'bold', fontSize: 16, letterSpacing: 1 },

  // ==========================================
  // 7. MODAL ELEMENTS (UBER STYLE)
  // ==========================================
  fixedPinContainer: {
    position: 'absolute',
    top: '50%', left: '50%',
    marginLeft: -24, marginTop: -48,
    alignItems: 'center',
  },
  pinShadow: { width: 6, height: 6, borderRadius: 3, backgroundColor: 'rgba(0,0,0,0.2)', marginTop: -2 },
  mapFooter: {
    position: 'absolute',
    bottom: 0, width: '100%',
    backgroundColor: Colors.white,
    borderTopLeftRadius: 25, borderTopRightRadius: 25,
    padding: 25, alignItems: 'center', elevation: 20,
  },
  confirmMapButton: {
    backgroundColor: Colors.primary,
    width: '100%', paddingVertical: 16,
    borderRadius: 12, alignItems: 'center',
  },
  confirmMapText: { color: Colors.white, fontWeight: 'bold', fontSize: 16 },
});