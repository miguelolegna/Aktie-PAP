// src/screens/ChargerDetailsScreen.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../config/firebaseConfig';
import { Colors } from '../styles/GlobalStyles';
import { chargerDetailsStyles as styles } from '../styles/Screens/ChargerDetailsStyles';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

const ChargerDetailsScreen = ({ route, navigation }: any) => {
  const { chargerId } = route.params;
  const [charger, setCharger] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChargerDetails = async () => {
      try {
        const docRef = doc(db, "chargers", chargerId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setCharger({ id: docSnap.id, ...docSnap.data() });
        } else {
          Alert.alert("Erro", "Carregador não encontrado.");
          navigation.goBack();
        }
      } catch (error) {
        console.error("Erro ao buscar detalhes:", error);
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

  // Lógica de apresentação
  const isAvailable = charger.is_active;
  const locationType = charger.location_type || "Outdoor";
  const connectionType = charger.connection_type || "Socket";

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        {/* HEADER */}
        <View style={styles.header}>
          <View style={styles.titleRow}>
            <Text style={styles.addressTitle}>{charger.morada}</Text>
            <View style={styles.ratingBadge}>
              <Ionicons name="star" size={14} color="#FFD700" />
              <Text style={styles.ratingText}>{charger.rating_medio || "Novo"}</Text>
            </View>
          </View>
          
          <View style={[styles.statusTag, { backgroundColor: isAvailable ? Colors.primaryLight : Colors.dangerLight }]}>
            <View style={[styles.statusDot, { backgroundColor: isAvailable ? Colors.primary : Colors.danger }]} />
            <Text style={[styles.statusText, { color: isAvailable ? Colors.primaryDark : Colors.danger }]}>
              {isAvailable ? "Disponível agora" : "Indisponível"}
            </Text>
          </View>
        </View>

        {/* SPECS GRID */}
        <Text style={styles.sectionTitle}>Especificações</Text>
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
            <MaterialCommunityIcons name={connectionType === 'Tethered' ? "power-plug" : "power-socket-eu"} size={24} color={Colors.primary} />
            <Text style={styles.specLabel}>Cabo</Text>
            <Text style={styles.specValue}>{connectionType === 'Tethered' ? "Incluído" : "Traga o seu"}</Text>
          </View>
          <View style={styles.specCard}>
            <MaterialCommunityIcons name={locationType === 'Indoor' ? "garage" : "weather-sunny"} size={24} color={Colors.primary} />
            <Text style={styles.specLabel}>Local</Text>
            <Text style={styles.specValue}>{locationType === 'Indoor' ? "Interior" : "Exterior"}</Text>
          </View>
        </View>

        {/* INFO */}
        <View style={styles.infoSection}>
          <View style={styles.infoRow}>
            <Ionicons name="information-circle-outline" size={20} color={Colors.gray} />
            <Text style={styles.infoText}>
              {charger.access_info || "Acesso livre. Detalhes exatos fornecidos após a reserva."}
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* FOOTER */}
      <View style={styles.footer}>
        <View>
          <Text style={styles.priceLabel}>Preço por kWh</Text>
          <Text style={styles.priceValue}>{charger.preco_kwh} €</Text>
        </View>
        
        <TouchableOpacity 
          style={[styles.reserveButton, { opacity: isAvailable ? 1 : 0.6 }]}
          disabled={!isAvailable}
          onPress={() => Alert.alert("Reserva", "Iniciando fluxo de pagamento...")}
        >
          <Text style={styles.reserveButtonText}>
            {isAvailable ? "Reservar" : "Ocupado"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChargerDetailsScreen;