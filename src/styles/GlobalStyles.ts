import { StyleSheet } from 'react-native';

export const Colors = {
  primary: '#99AA38', // Verde Azeitona (Tua marca)
  dark: '#262623',    // Preto Suave (Texto)
  white: '#FFFFFF',
  
  // Adiciona estas para a UI funcionar bem:
  gray: '#999999',       // Placeholders
  lightGray: '#F5F5F5',  // Fundo de inputs
  border: '#E0E0E0',     // Bordas subtis
  danger: '#DC3545',     // Erros (Vermelho padrão)
  link: '#007AFF'        // Links clicáveis (opcional)
};

export const GlobalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    // Removi alignItems/justifyContent para não estragar layouts complexos
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: Colors.primary, // Usa a cor da marca
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    color: Colors.dark,
  },
  // Podes adicionar um estilo base para inputs aqui se quiseres padronizar
  input: {
    backgroundColor: Colors.lightGray,
    borderColor: Colors.border,
    borderWidth: 1,
    borderRadius: 12,
    padding: 15,
    fontSize: 16,
    color: Colors.dark,
  }
});