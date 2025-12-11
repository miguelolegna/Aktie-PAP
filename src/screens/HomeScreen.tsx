import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, FlatList, StyleSheet } from 'react-native';
// Importa a instância da DB configurada
import { db } from '../config/firebaseConfig'; 
import { collection, getDocs } from 'firebase/firestore';

const HomeScreen: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [chargers, setChargers] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const testConnection = async () => {
      try {
        console.log("--- A TENTAR LIGAR AO FIRESTORE ---");
        
        // 1. Tenta ler a coleção 'chargers'
        const querySnapshot = await getDocs(collection(db, "chargers"));
        
        const data: any[] = [];
        querySnapshot.forEach((doc) => {
          // Extrai os dados e adiciona o ID
          data.push({ id: doc.id, ...doc.data() });
        });

        console.log(`[SUCESSO] Encontrados ${data.length} carregadores.`);
        setChargers(data);
      } catch (err: any) {
        console.error("[ERRO CRÍTICO] Falha na conexão:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    testConnection();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>A testar conexão...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={{ color: 'red', fontWeight: 'bold' }}>Erro de Conexão:</Text>
        <Text>{error}</Text>
        <Text style={{ marginTop: 10, fontSize: 12 }}>
          Verifica se o .env está correto e se reiniciaste o servidor com --clear.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Teste de Conexão DB</Text>
      <Text style={styles.subtitle}>Carregadores encontrados: {chargers.length}</Text>

      <FlatList
        data={chargers}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>{item.morada || "Sem morada"}</Text>
            <Text>Potência: {item.potencia_kw} kW</Text>
            <Text>Tipo: {item.tipo_tomada}</Text>
            <Text style={{ fontSize: 10, color: '#666', marginTop: 5 }}>ID: {item.id}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, paddingTop: 50, backgroundColor: '#f5f5f5' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  subtitle: { fontSize: 16, marginBottom: 20, color: 'green' },
  card: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardTitle: { fontWeight: 'bold', fontSize: 16, marginBottom: 5 }
});

export default HomeScreen;