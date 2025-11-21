import { StyleSheet } from 'react-native';

// Definição das cores da paleta
export const Colors = {
  primary: '#99AA38', // Cor principal (verde-azeitona)
  dark: '#262623',    // Cor de contraste (quase preto)
  white: '#FFFFFF',
};

// Estilos globais básicos
export const GlobalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: Colors.dark,
  },
  text: {
    fontSize: 16,
    color: Colors.dark,
  }
});