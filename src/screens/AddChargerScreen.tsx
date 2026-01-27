import React, { useState, useEffect, useRef } from 'react';
import { 
  View, Text, TextInput, TouchableOpacity, ScrollView, 
  Alert, ActivityIndicator, KeyboardAvoidingView, Platform, Modal 
} from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../context/AuthContext';
import { createCharger, fetchAddressSuggestions, getAddressFromCoords } from '../services/ChargerService';
import { AddChargerStyles as styles } from '../styles/Screens/AddChargerStyles';
import { Colors } from '../styles/GlobalStyles';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';

const AddChargerScreen = ({ navigation }: any) => {
  const { user } = useAuth();
  const mapRef = useRef<MapView>(null);
  
  const [loading, setLoading] = useState(false);
  const [isMapPickerVisible, setIsMapPickerVisible] = useState(false);
  const [suggestions, setSuggestions] = useState<any[]>([]);
  
  const [confirmedCoords, setConfirmedCoords] = useState<{lat: number, lng: number} | null>(null);
  const [tempRegion, setTempRegion] = useState({
    latitude: 38.7369,
    longitude: -9.1427,
    latitudeDelta: 0.002,
    longitudeDelta: 0.002,
  });

  const [form, setForm] = useState({
    morada: '',
    potencia: '',
    preco: '',
    tipoTomada: 'Type 2',
    local: 'Indoor',
    cabo: 'Socket',
    info: ''
  });

  // GATILHO DE GPS INICIAL: Resolve o problema 1 e 2 [cite: 97, 115]
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert("Aviso", "A permissão de localização ajuda a encontrar a sua rua mais rápido.");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      const currentPos = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.002,
        longitudeDelta: 0.002,
      };
      setTempRegion(currentPos);
      setConfirmedCoords({ lat: currentPos.latitude, lng: currentPos.longitude });
    })();
  }, []);

  const handleSearchAddress = async (text: string) => {
    setForm({ ...form, morada: text });
    if (text.length > 4) {
      const res = await fetchAddressSuggestions(text);
      setSuggestions(res);
    } else {
      setSuggestions([]);
    }
  };

  const selectSuggestion = (item: any) => {
    const coords = { lat: Number(item.lat), lng: Number(item.lng) };
    setForm({ ...form, morada: item.label });
    setConfirmedCoords(coords);
    setTempRegion({
      ...tempRegion,
      latitude: coords.lat,
      longitude: coords.lng,
    });
    setSuggestions([]);
  };

  const handleConfirmMapLocation = async () => {
    setLoading(true);
    const address = await getAddressFromCoords(tempRegion.latitude, tempRegion.longitude);
    setForm({ ...form, morada: address });
    setConfirmedCoords({ lat: tempRegion.latitude, lng: tempRegion.longitude });
    setIsMapPickerVisible(false);
    setLoading(false);
  };

  const handleSubmit = async () => {
    if (!confirmedCoords || !form.morada || !form.potencia || !form.preco) {
      Alert.alert("Erro", "Preencha todos os campos e confirme a localização.");
      return;
    }

    setLoading(true);
    const result = await createCharger({
      morada: form.morada,
      potencia_kw: form.potencia,
      preco_kwh: form.preco,
      tipo_tomada: form.tipoTomada, // CORRIGIDO: Agora envia o valor real [cite: 62, 151]
      location_type: form.local as "Indoor" | "Outdoor",
      connection_type: form.cabo as "Socket" | "Tethered",
      access_info: form.info,
      owner_uid: user?.uid || "anonimo",
      manualLat: confirmedCoords.lat,
      manualLng: confirmedCoords.lng,
    });

    setLoading(false);
    if (result.success) {
      Alert.alert("Sucesso", "Carregador registado.");
      navigation.goBack();
    } else {
      Alert.alert("Erro", "Falha ao gravar na base de dados.");
    }
  };

  const Selector = ({ label, value, current, field }: any) => (
    <TouchableOpacity 
      style={[styles.optionButton, current === value && styles.optionSelected]}
      onPress={() => setForm({ ...form, [field]: value })}
    >
      <Text style={[styles.optionText, current === value && styles.optionTextSelected]}>{label}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
          
          <Text style={styles.title}>Novo Carregador</Text>

          <Text style={styles.label}>Onde está localizado? *</Text>
          <View style={styles.searchContainer}>
            <Ionicons name="location" size={20} color={Colors.primary} style={{ marginRight: 10 }} />
            <TextInput 
              style={{ flex: 1, height: 50, fontSize: 16 }}
              placeholder="Pesquisar morada..." 
              value={form.morada}
              onChangeText={handleSearchAddress}
            />
          </View>

          {suggestions.map((item, index) => (
            <TouchableOpacity key={index} style={styles.suggestionItem} onPress={() => selectSuggestion(item)}>
              <Ionicons name="pin" size={18} color="#999" style={{ marginRight: 12 }} />
              <View style={{ flex: 1 }}>
                <Text style={styles.suggestionText} numberOfLines={1}>{item.label}</Text>
              </View>
            </TouchableOpacity>
          ))}

          <TouchableOpacity style={styles.mapTrigger} onPress={() => setIsMapPickerVisible(true)}>
            <MaterialIcons name="map" size={20} color={Colors.primary} />
            <Text style={styles.mapTriggerText}>
              {confirmedCoords ? "✓ Localização definida" : "Definir no mapa (Uber Style)"}
            </Text>
          </TouchableOpacity>

          <View style={styles.row}>
            <View style={{ flex: 1, marginRight: 8 }}>
              <Text style={styles.label}>Potência (kW)</Text>
              <TextInput style={styles.input} keyboardType="numeric" value={form.potencia} onChangeText={(t) => setForm({ ...form, potencia: t })} placeholder="Ex: 11" />
            </View>
            <View style={{ flex: 1, marginLeft: 8 }}>
              <Text style={styles.label}>Preço (€/kWh)</Text>
              <TextInput style={styles.input} keyboardType="numeric" value={form.preco} onChangeText={(t)=> setForm({ ...form, preco: t })} placeholder="Ex: 0.25" />
            </View>
          </View>

          <Text style={styles.label}>Tipo de Tomada</Text>
          <View style={styles.row}>
            <Selector label="Type 2" value="Type 2" current={form.tipoTomada} field="tipoTomada" />
            <Selector label="CCS2" value="CCS2" current={form.tipoTomada} field="tipoTomada" />
          </View>

          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit} disabled={loading}>
            {loading ? <ActivityIndicator color="#FFF" /> : <Text style={styles.submitText}>CONFIRMAR E PUBLICAR</Text>}
          </TouchableOpacity>

        </ScrollView>
      </KeyboardAvoidingView>

      <Modal visible={isMapPickerVisible} animationType="slide">
        <View style={{ flex: 1 }}>
          <MapView
            provider={PROVIDER_GOOGLE}
            style={{ flex: 1 }}
            region={tempRegion}
            onRegionChangeComplete={(r) => setTempRegion(r)}
            toolbarEnabled={false}
          />
          <View style={styles.fixedPinContainer} pointerEvents="none">
            <Ionicons name="location" size={48} color={Colors.primary} />
            <View style={styles.pinShadow} />
          </View>
          <View style={styles.mapFooter}>
            <Text style={styles.mapInstruction}>Arraste o mapa para o ponto exato</Text>
            <TouchableOpacity style={styles.confirmMapButton} onPress={handleConfirmMapLocation}>
              <Text style={styles.confirmMapText}>Confirmar este local</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ marginTop: 15 }} onPress={() => setIsMapPickerVisible(false)}>
              <Text style={{ color: '#ff5252', fontWeight: 'bold' }}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default AddChargerScreen;