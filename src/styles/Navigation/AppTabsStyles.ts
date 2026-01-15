import { StyleSheet, Dimensions } from 'react-native';
import { Colors } from '../GlobalStyles';

const { width } = Dimensions.get('window');

const MARGIN_H = 16; 
const BAR_WIDTH = width - (MARGIN_H * 2); 
export const TAB_WIDTH = BAR_WIDTH / 4; 

// VOLTEI PARA 60 (O tamanho da "bola inicial" que gostavas)
const CIRCLE_SIZE = 60; 

export const AppTabsStyles = StyleSheet.create({
  screenCenter: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center',
    backgroundColor: Colors.background
  },
  
  tabBarContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 20, 
    width: BAR_WIDTH, 
    alignSelf: 'center', 
    height: 70, 
    backgroundColor: Colors.white,
    borderRadius: 35, 
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },

  bubble: {
    position: 'absolute',
    width: CIRCLE_SIZE, 
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    backgroundColor: Colors.primary,
    
    // Ajuste de posição para o tamanho 60
    top: -15, 
    left: (TAB_WIDTH - CIRCLE_SIZE) / 2, 
    
    borderWidth: 4, 
    borderColor: Colors.background, 
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },

  iconsContainer: {
    flexDirection: 'row',
    flex: 1,
  },

  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end', 
    paddingBottom: 10,
  },

  iconWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 40, 
    height: 40,
    marginBottom: 2,
  },

  iconWrapperActive: {
    // Vazio (gerido pela animação)
  },

  label: {
    fontSize: 10,
    fontWeight: '600',
    marginBottom: 4,
  }
});