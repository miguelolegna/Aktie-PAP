import React, { useState, useEffect, useRef } from 'react';
import { View, ActivityIndicator, Text, TouchableOpacity, Animated } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
import { collection, onSnapshot, query } from 'firebase/firestore';
import { db } from '../config/firebaseConfig';
import { Colors } from '../styles/GlobalStyles';
import { MapScreenStyles } from '../styles/Screens/MapScreenStyles';
import { FontAwesome6, Ionicons } from '@expo/vector-icons';

const MapScreen = () => {
  const [loading, setLoading] = useState(true);
  const [chargers, setChargers] = useState<any[]>([]);
  const [selectedCharger, setSelectedCharger] = useState<any | null>(null);
  const [trackChanges, setTrackChanges] = useState(true);
  const navigation = useNavigation<any>();

  const slideAnim = useRef(new Animated.Value(400)).current;

  useEffect(() => {
    if (selectedCharger) {
      Animated.spring(slideAnim, {
        toValue: 0,
        useNativeDriver: true,
        friction: 8,
        tension: 50,
      }).start();
    }
  }, [selectedCharger]);

  const handleClose = () => {
    Animated.timing(slideAnim, {
      toValue: 400,
      duration: 250,
      useNativeDriver: true,
    }).start(() => {
      setSelectedCharger(null);
    });
  };

  useEffect(() => {
    const q = query(collection(db, "chargers"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const data: any[] = [];
      querySnapshot.forEach((doc) => {
        const d = doc.data();
        data.push({
          id: doc.id,
          latitude: Number(d.localizacao?.latitude || d.latitude),
          longitude: Number(d.localizacao?.longitude || d.longitude),
          title: d.morada || "Carregador Aktie",
          power: d.potencia_kw || "?",
          price: d.preco_kwh || "?",
          isActive: d.is_active ?? true,
          tipoTomada: d.tipo_tomada || "Type 2"
        });
      });
      setChargers(data);
      setLoading(false);
    }, (error) => {
      console.error("Erro Firestore:", error);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!loading && chargers.length > 0) {
      setTimeout(() => setTrackChanges(false), 2000);
    }
  }, [loading, chargers]);

  if (loading) return <View style={MapScreenStyles.center}><ActivityIndicator size="large" color={Colors.primary} /></View>;

  return (
    <View style={MapScreenStyles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={MapScreenStyles.map}
        initialRegion={{ latitude: 38.7369, longitude: -9.1427, latitudeDelta: 0.05, longitudeDelta: 0.05 }}
        onPress={handleClose}
        // DESATIVA OS BOTOES DE NAVEGAÇÃO NATUIVOS DO GOOGLE
        toolbarEnabled={false} 
      >
        {chargers.map((charger) => (
          <Marker
            key={charger.id}
            coordinate={{ latitude: charger.latitude, longitude: charger.longitude }}
            onPress={() => setSelectedCharger(charger)}
            tracksViewChanges={trackChanges}
          >
            <View style={MapScreenStyles.markerContainer}>
              <FontAwesome6 name="charging-station" size={20} color={charger.isActive ? Colors.primary : "#808080"} />
            </View>
          </Marker>
        ))}
      </MapView>

      {selectedCharger && (
        <Animated.View style={[MapScreenStyles.overlayContainer, { transform: [{ translateY: slideAnim }] }]}>
          <View style={MapScreenStyles.calloutContainer}>
            <View style={MapScreenStyles.calloutHeader}>
              <Text style={MapScreenStyles.calloutTitle} numberOfLines={1}>{selectedCharger.title}</Text>
              <TouchableOpacity onPress={handleClose}>
                <Ionicons name="close-circle" size={26} color="white" />
              </TouchableOpacity>
            </View>

            <View style={MapScreenStyles.calloutBody}>
              <View style={MapScreenStyles.calloutRow}>
                <Text style={MapScreenStyles.calloutLabel}>POTÊNCIA</Text>
                <Text style={MapScreenStyles.calloutValue}>{selectedCharger.power} kW</Text>
              </View>
              <View style={MapScreenStyles.calloutRow}>
                <Text style={MapScreenStyles.calloutLabel}>PREÇO</Text>
                <Text style={MapScreenStyles.calloutValue}>{selectedCharger.price} €/kWh</Text>
              </View>
              
              <View style={MapScreenStyles.calloutDivider} />

              <TouchableOpacity 
                style={[MapScreenStyles.actionButton, { opacity: selectedCharger.isActive ? 1 : 0.6 }]}
                disabled={!selectedCharger.isActive}
                onPress={() => navigation.navigate('ChargerDetails', { chargerId: selectedCharger.id })}
              >
                <Text style={MapScreenStyles.actionButtonText}>
                  {selectedCharger.isActive ? "RESERVAR AGORA" : "INDISPONÍVEL"}
                </Text>
                <Ionicons name="chevron-forward" size={18} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        </Animated.View>
      )}
    </View>
  );
};

export default MapScreen;