import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { GlobalStyles, Colors } from '../styles/GlobalStyles';

const HomeScreen: React.FC = () => {
  return (
    <View style={GlobalStyles.container}>
      <Text style={[GlobalStyles.title, styles.greeting]}>
        Bem-vindo à Aktie! 🌍
      </Text>
      <Text style={GlobalStyles.text}>
        O mapa e as funcionalidades principais aparecerão aqui.
      </Text>
      <View style={styles.card}>
        <Text style={styles.cardText}>
          Encontre carregadores de VE próximos.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  greeting: {
    marginBottom: 20,
    color: Colors.primary,
  },
  card: {
    marginTop: 40,
    padding: 20,
    backgroundColor: Colors.dark,
    borderRadius: 8,
  },
  cardText: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: '600',
  }
});

export default HomeScreen;