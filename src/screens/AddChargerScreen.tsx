// src/screens/AddChargerScreen.tsx
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  ScrollView, 
  Alert, 
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'; // Correção de depreciação
import { useAuth } from '../context/AuthContext';
import { createCharger, fetchAddressSuggestions } from '../services/ChargerService';
import { AddChargerStyles as styles } from '../styles/Screens/AddChargerStyles';
import { Colors } from '../styles/GlobalStyles';

const AddChargerScreen = ({ navigation }: any) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [selectedCoords, setSelectedCoords] = useState<{lat: number, lng: number} | null>(null);

  const [form, setForm] = useState({
    morada: '',
    potencia: '',
    preco: '',
    tipoTomada: 'Type 2',
    local: 'Indoor',
    cabo: 'Socket',
    info: ''
  });

  const handleSearchAddress = async (text: string) => {
    setForm({ ...form, morada: text });
    if (text.length > 5) {
      const res = await fetchAddressSuggestions(text);
      setSuggestions(res);
    } else {
      setSuggestions([]);
    }
  };

  const selectAddress = (item: any) => {
    setForm({ ...form, morada: item.label });
    setSelectedCoords({ lat: item.lat, lng: item.lng });
    setSuggestions([]);
  };

  const handleSubmit = async () => {
    if (!selectedCoords) {
      Alert.alert("Erro", "Seleciona uma localização da lista sugerida.");
      return;
    }

    setLoading(true);
    const result = await createCharger({
      morada: form.morada,
      potencia_kw: form.potencia,
      preco_kwh: form.preco,
      tipo_tomada: form.tipoTomada,
      location_type: form.local as "Indoor" | "Outdoor",
      connection_type: form.cabo as "Socket" | "Tethered",
      access_info: form.info,
      owner_uid: user?.uid || "anonimo",
      manualLat: selectedCoords.lat,
      manualLng: selectedCoords.lng,
    });

    setLoading(false);
    if (result.success) {
      Alert.alert("Sucesso", "Carregador registado.");
      navigation.goBack();
    } else {
      Alert.alert("Erro", "Falha no registo.");
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
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.background }}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
          <Text style={styles.title}>Novo Carregador Aktie</Text>

          <Text style={styles.label}>Morada / Localização *</Text>
          <TextInput 
            style={styles.input} 
            placeholder="Procure a morada exata..." 
            value={form.morada}
            onChangeText={handleSearchAddress}
            placeholderTextColor={Colors.gray}
          />

          {suggestions.length > 0 && (
            <View style={styles.suggestionsContainer}>
              {suggestions.map((item, index) => (
                <TouchableOpacity key={index} style={styles.suggestionItem} onPress={() => selectAddress(item)}>
                  <Text style={styles.suggestionText} numberOfLines={1}>{item.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}

          {selectedCoords && (
            <Text style={{ color: Colors.success, fontSize: 12, marginTop: 5, fontWeight: 'bold' }}>
              ✓ Pin georreferenciado com sucesso.
            </Text>
          )}

          <View style={styles.row}>
            <View style={{ flex: 1, marginRight: 8 }}>
              <Text style={styles.label}>Potência (kW) *</Text>
              <TextInput style={styles.input} keyboardType="numeric" value={form.potencia} onChangeText={(t) => setForm({ ...form, potencia: t })} />
            </View>
            <View style={{ flex: 1, marginLeft: 8 }}>
              <Text style={styles.label}>Preço (€/kWh) *</Text>
              <TextInput style={styles.input} keyboardType="numeric" value={form.preco} onChangeText={(t)=> setForm({ ...form, preco: t })} />
            </View>
          </View>

          <Text style={styles.label}>Tipo de Tomada</Text>
          <View style={styles.row}>
            <Selector label="Type 2" value="Type 2" current={form.tipoTomada} field="tipoTomada" />
            <Selector label="CCS2" value="CCS2" current={form.tipoTomada} field="tipoTomada" />
          </View>

          <Text style={styles.label}>Ambiente</Text>
          <View style={styles.row}>
            <Selector label="Interior" value="Indoor" current={form.local} field="local" />
            <Selector label="Exterior" value="Outdoor" current={form.local} field="local" />
          </View>

          <Text style={styles.label}>Cabo</Text>
          <View style={styles.row}>
            <Selector label="Tomada" value="Socket" current={form.cabo} field="cabo" />
            <Selector label="Preso" value="Tethered" current={form.cabo} field="cabo" />
          </View>

          <Text style={styles.label}>Instruções de Acesso</Text>
          <TextInput 
            style={[styles.input, { height: 80 }]} 
            placeholder="Ex: Código do portão..." 
            multiline 
            value={form.info} 
            onChangeText={(t) => setForm({ ...form, info: t })} 
          />

          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit} disabled={loading}>
            {loading ? <ActivityIndicator color={Colors.white} /> : <Text style={styles.submitText}>REGISTAR</Text>}
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default AddChargerScreen;