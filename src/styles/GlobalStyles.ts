// src/styles/GlobalStyles.ts
import { StyleSheet } from 'react-native';

export const Colors = {
  // --- A TUA MARCA (Teal Energy) ---
  primary: '#00BFA5',      // Cor Principal (Botões, Tabs Ativas, Links)
  primaryDark: '#008F7A',  // Estado "Pressionado" ou Títulos Fortes
  primaryLight: '#E0F2F1', // Fundo subtil (Badge, Fundo de ícone)

  // --- NEUTROS (Blue Grey - Mais moderno que preto puro) ---
  dark: '#263238',         // Texto Principal (Títulos)
  gray: '#78909C',         // Texto Secundário (Descrições, Placeholders)
  border: '#CFD8DC',       // Bordas de inputs e divisórias
  white: '#FFFFFF',
  background: '#F5F7FA',   // Fundo dos ecrãs (Não é branco puro, cansa menos a vista)
  
  // --- FEEDBACK ---
  success: '#00BFA5',      // O próprio Teal serve de sucesso
  danger: '#FF5252',       // Vermelho vibrante (Erros, Apagar, Sair)
  dangerLight: '#FFEBEE',  // Fundo do botão de erro/sair
  warning: '#FFAB40',      // Laranja para alertas (Atenção)
  
  // --- SOMBRAS ---
  shadow: '#000000',       // Cor base para sombras
};

export const GlobalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background, // Usa o novo fundo off-white
  },
  title: {
    fontSize: 28, // Ajustei ligeiramente para mobile
    fontWeight: 'bold',
    color: Colors.dark, // Títulos em Dark Blue Grey leem-se melhor
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.gray,
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    color: Colors.dark,
    lineHeight: 24, // Melhora a leitura de parágrafos
  },
  input: {
    backgroundColor: Colors.white,
    borderColor: Colors.border,
    borderWidth: 1,
    borderRadius: 12,
    padding: 15,
    fontSize: 16,
    color: Colors.dark,
  },
  // Classe utilitária para sombras suaves (podes usar em Cards)
  shadow: {
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1, // Sombra suave
    shadowRadius: 8,
    elevation: 4, // Android
  }
});