// src/screens/HomeScreen.tsx
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Aktie - Início</Text>
      <Text style={styles.subtitle}>Bem-vindo ao seu projeto de PAP!</Text>
      <Text style={styles.text}>Aqui será a área para visualizar as suas ações.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f8', // Um fundo claro
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1a3a5b', // Cor escura para o título
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#555',
    marginBottom: 30,
  },
  text: {
    fontSize: 16,
    color: '#777',
  }
});

export default HomeScreen;