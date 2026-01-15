import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, FlatList, TouchableOpacity, Alert } from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../config/firebaseConfig';
import { useAuth } from '../context/AuthContext';
import { useNavigation } from '@react-navigation/native';

// IMPORTS DE ESTILO ATUALIZADOS
import { Colors } from '../styles/GlobalStyles';
import { HomeStyles } from '../styles/Screens/HomeStyles'; 

const HomeScreen: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [chargers, setChargers] = useState<any[]>([]);
  
  const navigation = useNavigation<any>();
  const { user, logout } = useAuth();

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
      } finally {
        setLoading(false);
      }
    };

    fetchChargers();
  }, []);

  const handleLogout = () => {
    Alert.alert("Sair", "Tens a certeza?", [
      { text: "Cancelar", style: "cancel" },
      { text: "Sair", style: "destructive", onPress: logout }
    ]);
  };

  const handleLoginPress = () => {
    navigation.navigate('Auth');
  };

  if (loading) {
    return (
      <View style={HomeStyles.center}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <View style={HomeStyles.container}>
      
      {/* HEADER */}
      <View style={HomeStyles.header}>
        <View>
          <Text style={HomeStyles.title}>
            {user ? `Olá, Condutor` : "Olá, Visitante"}
          </Text>
          <Text style={HomeStyles.subtitle}>{chargers.length} postos disponíveis</Text>
        </View>
        
        {user ? (
          <TouchableOpacity style={HomeStyles.logoutButton} onPress={handleLogout}>
            <Text style={HomeStyles.logoutText}>Sair</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={HomeStyles.loginButton} onPress={handleLoginPress}>
            <Text style={HomeStyles.loginText}>Entrar</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* LISTA */}
      <FlatList
        data={chargers}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={HomeStyles.card}>
            <View style={HomeStyles.cardHeader}>
              <Text style={HomeStyles.cardTitle}>{item.morada || "Sem morada"}</Text>
              <View style={item.is_active ? HomeStyles.badgeActive : HomeStyles.badgeInactive} />
            </View>
            <Text style={HomeStyles.cardInfo}>Potência: {item.potencia_kw} kW • {item.tipo_tomada}</Text>
            <Text style={HomeStyles.cardPrice}>{item.preco_kwh} €/kWh</Text>
            
            {!user && (
              <Text style={{fontSize: 10, color: Colors.primary, marginTop: 5}}>
                Faz login para reservar
              </Text>
            )}
          </View>
        )}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
};

export default HomeScreen;