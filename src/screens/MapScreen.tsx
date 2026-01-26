import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator, Text } from 'react-native';
// Adiciona PROVIDER_GOOGLE aqui
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
import { collection, onSnapshot, query } from 'firebase/firestore';
import { db } from '../config/firebaseConfig';
import { Colors } from '../styles/GlobalStyles';
import { MapScreenStyles } from '../styles/Screens/MapScreenStyles';
import { FontAwesome6 } from '@expo/vector-icons';

const MapScreen = () => {
  const [loading, setLoading] = useState(true);
  const [chargers, setChargers] = useState<any[]>([]);
  const navigation = useNavigation<any>();

  const initialRegion = {
    latitude: 38.7369,
    longitude: -9.1427,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  };

  useEffect(() => {
    const q = query(collection(db, "chargers"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const data: any[] = [];
      querySnapshot.forEach((doc) => {
        const d = doc.data();
        const lat = d.localizacao?.latitude || d.latitude;
        const lng = d.localizacao?.longitude || d.longitude;

        if (lat && lng) {
          data.push({
            id: doc.id,
            latitude: Number(lat), // Garante que é número
            longitude: Number(lng),
            title: d.morada || "Carregador Aktie",
            power: d.potencia_kw || "?",
            price: d.preco_kwh || "?",
            isActive: d.is_active ?? true,
          });
        }
      });
      setChargers(data);
      setLoading(false);
    }, (error) => {
      console.error("[MapScreen] Erro Firestore:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <View style={MapScreenStyles.center}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <View style={MapScreenStyles.container}>
      <MapView
        provider={PROVIDER_GOOGLE} // Ativa o Google Maps nativo
        style={MapScreenStyles.map}
        initialRegion={initialRegion}
        mapType="standard" // Volta ao padrão visual
      >
        {chargers.map((charger) => (
          <Marker
            key={charger.id}
            coordinate={{ latitude: charger.latitude, longitude: charger.longitude }}
            // Removido tracksViewChanges={false} inicial para garantir renderização do ícone
          >
            <View style={MapScreenStyles.markerContainer}>
              <FontAwesome6 
                name="charging-station" 
                size={20} 
                color={charger.isActive ? Colors.primary : "#808080"} 
              />
            </View>

            <Callout 
              tooltip 
              onPress={() => navigation.navigate('ChargerDetails', { chargerId: charger.id })}
            >
              <View style={MapScreenStyles.calloutContainer}>
                <Text style={MapScreenStyles.calloutTitle}>{charger.title}</Text>
                <Text style={MapScreenStyles.calloutInfo}>
                  {charger.power} kW • {charger.price} €/kWh
                </Text>
                <View style={MapScreenStyles.calloutButton}>
                  <Text style={MapScreenStyles.calloutButtonText}>VER DETALHES</Text>
                </View>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>
    </View>
  );
};

export default MapScreen;