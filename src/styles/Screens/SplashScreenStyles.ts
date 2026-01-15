import { StyleSheet, Dimensions } from 'react-native';
import { Colors } from '../GlobalStyles';

const { width, height } = Dimensions.get('window');

export const splashStyles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: Colors.white, // Fundo do container
    zIndex: 9999,
    justifyContent: 'center',
    alignItems: 'center',
  },
  videoWrapper: {
    width: width,
    height: height,
    backgroundColor: Colors.white, // CRÍTICO: Fundo do wrapper do vídeo
  },
  videoView: {
    width: '100%',
    height: '100%',
    backgroundColor: Colors.white, // CRÍTICO: Fundo interno do player
  },
});