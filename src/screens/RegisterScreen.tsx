import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, Timestamp } from 'firebase/firestore';
import { auth, db } from '../config/firebaseConfig'; // Importa da tua config

const RegisterScreen: React.FC = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    // 1. Validações UI
    if (password !== confirmPassword) {
      Alert.alert("Erro", "As passwords não coincidem.");
      return;
    }
    if (password.length < 6) {
      Alert.alert("Erro", "A password deve ter pelo menos 6 caracteres.");
      return;
    }
    if (!nome || !email) {
      Alert.alert("Erro", "Preenche todos os campos.");
      return;
    }

    setLoading(true);

    try {
      // 2. Criar utilizador no Authentication (Email/Pass)
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // 3. Criar perfil no Firestore (Dados extra)
      await setDoc(doc(db, "users", user.uid), {
        nome: nome,
        email: email,
        telefone: "", // Podes adicionar input para isto depois
        rating_medio: 0,
        data_registo: Timestamp.now(),
        is_verified: false,
        fcm_token: ""
      });

      Alert.alert("Sucesso", "Conta criada com sucesso!");
      // A navegação automática acontece porque o AuthContext vai detetar a mudança de estado
    } catch (error: any) {
      console.error(error);
      let msg = "Não foi possível criar a conta.";
      if (error.code === 'auth/email-already-in-use') msg = "Este email já está registado.";
      if (error.code === 'auth/invalid-email') msg = "Email inválido.";
      Alert.alert("Erro", msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Criar Conta</Text>

      <TextInput 
        placeholder="Nome Completo" 
        value={nome} onChangeText={setNome} 
        style={styles.input} 
      />
      
      <TextInput 
        placeholder="Email" 
        value={email} onChangeText={setEmail} 
        style={styles.input} 
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <TextInput 
        placeholder="Password" 
        value={password} onChangeText={setPassword} 
        style={styles.input} 
        secureTextEntry 
      />

      <TextInput 
        placeholder="Confirmar Password" 
        value={confirmPassword} onChangeText={setConfirmPassword} 
        style={styles.input} 
        secureTextEntry 
      />

      <TouchableOpacity style={styles.button} onPress={handleRegister} disabled={loading}>
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Registar</Text>}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#ddd', padding: 15, borderRadius: 10, marginBottom: 15 },
  button: { backgroundColor: '#007AFF', padding: 15, borderRadius: 10, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 }
});

export default RegisterScreen;