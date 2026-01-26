// src/screens/ChargerDetailsScreen.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../config/firebaseConfig';
import { Colors } from '../styles/GlobalStyles';
import { chargerDetailsStyles as styles } from '../styles/Screens/ChargerDetailsStyles';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

const ChargerDetailsScreen = ({ route, navigation }: any) => {
  const { chargerId } = route.params; // Recebe o ID do mapa
  const [charger, setCharger] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChargerDetails = async () => {
      try {
        const docRef = doc(db, "chargers", chargerId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          // Mapeia os dados do Firestore para o estado local
          setCharger({ id: docSnap.id, ...docSnap.data() });
        } else {
          Alert.alert("Erro", "Posto de carregamento não encontrado.");
          navigation.goBack();
        }
      } catch (error) {
        console.error("Erro Firestore:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchChargerDetails();
  }, [chargerId]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  if (!charger) return null;

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        {/* HEADER DINÂMICO */}
        <View style={styles.header}>
          <Text style={styles.addressTitle}>{charger.morada}</Text>
          <View style={styles.ratingBadge}>
            <Ionicons name="star" size={14} color="#FFD700" />
            <Text style={styles.ratingText}>{charger.rating_medio?.toFixed(1) || "Novo"}</Text>
          </View>
        </View>

        {/* SPECS GRID - Usa os campos do teu formulário */}
        <Text style={styles.sectionTitle}>Características do Posto</Text>
        <View style={styles.specsGrid}>
          <View style={styles.specCard}>
            <MaterialCommunityIcons name="flash" size={24} color={Colors.primary} />
            <Text style={styles.specLabel}>Potência</Text>
            <Text style={styles.specValue}>{charger.potencia_kw} kW</Text>
          </View>

          <View style={styles.specCard}>
            <MaterialCommunityIcons name="ev-plug-type2" size={24} color={Colors.primary} />
            <Text style={styles.specLabel}>Ficha</Text>
            <Text style={styles.specValue}>{charger.tipo_tomada}</Text>
          </View>

          <View style={styles.specCard}>
            <MaterialCommunityIcons 
               name={charger.connection_type === 'Tethered' ? "power-plug" : "power-socket-eu"} 
               size={24} color={Colors.primary} 
            />
            <Text style={styles.specLabel}>Cabo</Text>
            <Text style={styles.specValue}>
              {charger.connection_type === 'Tethered' ? "Incluído" : "Traga o seu"}
            </Text>
          </View>

          <View style={styles.specCard}>
            <MaterialCommunityIcons 
               name={charger.location_type === 'Indoor' ? "garage" : "weather-sunny"} 
               size={24} color={Colors.primary} 
            />
            <Text style={styles.specLabel}>Local</Text>
            <Text style={styles.specValue}>
              {charger.location_type === 'Indoor' ? "Interior" : "Exterior"}
            </Text>
          </View>
        </View>

        {/* INFORMAÇÕES DE ACESSO */}
        <Text style={styles.sectionTitle}>Instruções de Acesso</Text>
        <View style={styles.infoSection}>
          <Text style={styles.infoText}>
            {charger.access_info || "O proprietário não forneceu instruções adicionais."}
          </Text>
        </View>

      </ScrollView>

      {/* FOOTER COM PREÇO DINÂMICO */}
      <View style={styles.footer}>
        <View>
          <Text style={styles.priceLabel}>Tarifa Estimada</Text>
          <Text style={styles.priceValue}>{charger.preco_kwh} €/kWh</Text>
        </View>
        
        <TouchableOpacity 
          style={[styles.reserveButton, { opacity: charger.is_active ? 1 : 0.6 }]}
          disabled={!charger.is_active}
          onPress={() => Alert.alert("Sucesso", "Solicitação enviada ao proprietário!")}
        >
          <Text style={styles.reserveButtonText}>
            {charger.is_active ? "RESERVAR" : "OCUPADO"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChargerDetailsScreen;