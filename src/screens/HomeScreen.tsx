import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../config/firebaseConfig';
// 1. Importar o Contexto e as Cores
import { useAuth } from '../context/AuthContext';
import { Colors } from '../styles/GlobalStyles';

const HomeScreen: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [chargers, setChargers] = useState<any[]>([]);
  
  // 2. Usar o hook de Logout
  const { logout } = useAuth();

  useEffect(() => {
    const fetchChargers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "chargers"));
        const data: any[] = [];
        querySnapshot.forEach((doc) => {
          data.push({ id: doc.id, ...doc.data() });
        });
        setChargers(data);
      } catch (err: any) {
        console.error("Erro:", err);
        Alert.alert("Erro", "Falha ao carregar dados.");
      } finally {
        setLoading(false);
      }
    };

    fetchChargers();
  }, []);

  // Função auxiliar para confirmar o logout
  const handleLogout = () => {
    Alert.alert(
      "Sair",
      "Tens a certeza que queres sair da conta?",
      [
        { text: "Cancelar", style: "cancel" },
        { 
          text: "Sair", 
          style: "destructive", 
          onPress: () => logout() // <--- ISTO TROCA O ECRÃ AUTOMATICAMENTE
        }
      ]
    );
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      
      {/* CABEÇALHO PERSONALIZADO */}
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Olá, Condutor</Text>
          <Text style={styles.subtitle}>{chargers.length} postos disponíveis</Text>
        </View>
        
        {/* BOTÃO DE LOGOUT */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Sair</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={chargers}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>{item.morada || "Sem morada"}</Text>
              <View style={item.is_active ? styles.badgeActive : styles.badgeInactive} />
            </View>
            
            <Text style={styles.cardInfo}>Potência: {item.potencia_kw} kW • {item.tipo_tomada}</Text>
            <Text style={styles.cardPrice}>{item.preco_kwh} €/kWh</Text>
          </View>
        )}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa', paddingTop: 50 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  title: { fontSize: 24, fontWeight: 'bold', color: Colors.dark },
  subtitle: { fontSize: 14, color: Colors.primary },
  
  logoutButton: {
    backgroundColor: '#ffebee', // Fundo vermelho muito claro
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.danger
  },
  logoutText: {
    color: Colors.danger,
    fontWeight: 'bold',
    fontSize: 14
  },

  // Cards
  card: {
    backgroundColor: Colors.white,
    marginHorizontal: 20,
    marginBottom: 15,
    padding: 15,
    borderRadius: 12,
    // Sombra
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5
  },
  cardTitle: { fontWeight: 'bold', fontSize: 16, color: Colors.dark, flex: 1 },
  cardInfo: { fontSize: 14, color: '#666', marginBottom: 5 },
  cardPrice: { fontSize: 16, fontWeight: 'bold', color: Colors.primary },

  // Indicador de Status
  badgeActive: { width: 10, height: 10, borderRadius: 5, backgroundColor: '#28a745' },
  badgeInactive: { width: 10, height: 10, borderRadius: 5, backgroundColor: '#dc3545' }
});

export default HomeScreen;