import { StyleSheet, Dimensions } from 'react-native';
import { Colors } from '../GlobalStyles';

const { width } = Dimensions.get('window');
const MARGIN_H = 16; 
const BAR_WIDTH = width - (MARGIN_H * 2); 
export const TAB_WIDTH = BAR_WIDTH / 4; 
export const CIRCLE_SIZE = 60; 

export const AppTabsStyles = StyleSheet.create({
  tabBarContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 25, 
    width: BAR_WIDTH, 
    alignSelf: 'center', 
    height: 75, 
    backgroundColor: Colors.white,
    borderRadius: 35, 
    zIndex: 1000, 
    elevation: 15, 
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
  travelerContainer: {
    position: 'absolute',
    width: TAB_WIDTH,
    height: CIRCLE_SIZE,
    top: -14, 
    left: 0, 
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: -1, 
  },
  bubble: {
    width: CIRCLE_SIZE, 
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    backgroundColor: Colors.primary,
    borderWidth: 4, 
    borderColor: Colors.background,
  },
  iconsContainer: {
    flexDirection: 'row',
    flex: 1,
    zIndex: 1001,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start', 
    height: '100%',
    paddingTop: 12,
  },
  iconWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 30,
    height: 30,
  },
  label: {
    fontSize: 11,
    fontWeight: '700',
    position: 'absolute',
    bottom: 11,
  }
});