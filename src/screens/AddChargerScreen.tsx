import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { createCharger, ChargerFormData } from '../services/ChargerService';
import { addChargerStyles as styles } from '../styles/Screens/AddChargerStyles';
import { Colors } from '../styles/GlobalStyles';

const AddChargerScreen = ({ navigation }: any) => {
  const { user } = useAuth(); // Pegar o ID do utilizador logado
  const [loading, setLoading] = useState(false);

  // Estados do Formulário
  const [form, setForm] = useState({
    morada: '',
    potencia: '',
    preco: '',
    tipoTomada: 'Type 2',
    local: 'Indoor',
    cabo: 'Socket',
    info: ''
  });

  const handleSubmit = async () => {
    // 1. Validação Básica
    if (!form.morada || !form.potencia || !form.preco) {
      Alert.alert("Erro", "Preenche os campos obrigatórios.");
      return;
    }

    setLoading(true);

    // 2. Preparar dados
    const dataToSend: ChargerFormData = {
      morada: form.morada,
      potencia_kw: form.potencia,
      preco_kwh: form.preco,
      tipo_tomada: form.tipoTomada,
      location_type: form.local as "Indoor" | "Outdoor",
      connection_type: form.cabo as "Socket" | "Tethered",
      access_info: form.info,
      owner_uid: user?.uid || "anonimo"
    };

    // 3. Chamar o Service
    const result = await createCharger(dataToSend);

    setLoading(false);
    if (result.success) {
      Alert.alert("Sucesso", "Carregador criado!");
      navigation.goBack();
    } else {
      Alert.alert("Erro", "Falha ao criar carregador.");
    }
  };

  // Componente Auxiliar para Botões de Escolha
  const Option = ({ label, value, current, field }: any) => (
    <TouchableOpacity 
      style={[styles.optionButton, current === value && styles.optionSelected]}
      onPress={() => setForm({...form, [field]: value})}
    >
      <Text style={[styles.optionText, current === value && styles.optionTextSelected]}>{label}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Novo Carregador</Text>

        <Text style={styles.label}>Morada / Localização *</Text>
        <TextInput 
          style={styles.input} 
          placeholder="Ex: Garagem Rua das Flores, 12" 
          value={form.morada}
          onChangeText={t => setForm({...form, morada: t})}
        />

        <View style={styles.row}>
          <View style={{flex: 1}}>
            <Text style={styles.label}>Potência (kW) *</Text>
            <TextInput 
              style={styles.input} 
              placeholder="Ex: 11" 
              keyboardType="numeric"
              value={form.potencia}
              onChangeText={t => setForm({...form, potencia: t})}
            />
          </View>
          <View style={{flex: 1}}>
            <Text style={styles.label}>Preço (€/kWh) *</Text>
            <TextInput 
              style={styles.input} 
              placeholder="Ex: 0.25" 
              keyboardType="numeric"
              value={form.preco}
              onChangeText={t => setForm({...form, preco: t})}
            />
          </View>
        </View>

        <Text style={styles.label}>Tipo de Tomada</Text>
        <View style={styles.row}>
          <Option label="Type 2" value="Type 2" current={form.tipoTomada} field="tipoTomada" />
          <Option label="CCS2" value="CCS2" current={form.tipoTomada} field="tipoTomada" />
        </View>

        <Text style={styles.label}>Local de Instalação</Text>
        <View style={styles.row}>
          <Option label="Interior (Garagem)" value="Indoor" current={form.local} field="local" />
          <Option label="Exterior" value="Outdoor" current={form.local} field="local" />
        </View>

        <Text style={styles.label}>Cabo</Text>
        <View style={styles.row}>
          <Option label="Tomada (Traga cabo)" value="Socket" current={form.cabo} field="cabo" />
          <Option label="Cabo incluído" value="Tethered" current={form.cabo} field="cabo" />
        </View>

        <Text style={styles.label}>Informações de Acesso</Text>
        <TextInput 
          style={[styles.input, styles.textArea]} 
          placeholder="Ex: Código do portão é 1234. Ligue quando chegar."
          multiline
          numberOfLines={4}
          value={form.info}
          onChangeText={t => setForm({...form, info: t})}
        />

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit} disabled={loading}>
          {loading ? <ActivityIndicator color="#fff"/> : <Text style={styles.submitText}>Registar Carregador</Text>}
        </TouchableOpacity>

      </ScrollView>
    </View>
  );
};

export default AddChargerScreen;