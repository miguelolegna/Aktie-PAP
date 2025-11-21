import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native'; // Importar 'Image' e 'StyleSheet'
import { GlobalStyles, Colors } from '../styles/GlobalStyles';

interface SplashScreenProps {
  onFinish: () => void; // Função para chamar quando o carregamento terminar
}

// ⚠️ Importa a imagem
const AktieLogo = require('../../assets/logos/simpler_logo_vector.svg'); 

const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  
  useEffect(() => {
    // Simula um carregamento de 2000 milissegundos (2 segundos)
    const timer = setTimeout(() => {
      onFinish();
    }, 2000);

    // Limpeza da função
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <View style={[GlobalStyles.container, { backgroundColor: Colors.primary }]}>
      
      {/* 🖼️ Componente Image substitui o componente Text */}
      <Image 
        source={AktieLogo} 
        style={styles.logo} // Aplicamos um estilo para definir o tamanho
      />
      
      <Text style={{ fontSize: 18, color: Colors.dark, marginTop: 10 }}>
        Partilha Inteligente de Carregadores
      </Text>
    </View>
  );
};

// Adicionamos um estilo local para o tamanho da imagem
const styles = StyleSheet.create({
    logo: {
        width: 250, // Ajuste estes valores conforme o tamanho real do seu logo
        height: 100, // Ajuste estes valores conforme o tamanho real do seu logo
        resizeMode: 'contain', // Garante que a imagem se ajusta sem cortar
        marginBottom: 20,
    }
});

export default SplashScreen;


//