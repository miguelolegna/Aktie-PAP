import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  Alert, 
  ActivityIndicator, 
  LayoutAnimation, 
  Platform, 
  UIManager,
  KeyboardAvoidingView,
  ScrollView
} from 'react-native';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, Timestamp } from 'firebase/firestore';
import { auth, db } from '../config/firebaseConfig';
import { Colors } from '../styles/GlobalStyles'; // <--- IMPORTA AS TUAS CORES

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const AuthScreen: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  
  // State para os inputs
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const toggleMode = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsLogin(!isLogin);
  };

  const handleAuth = async () => {
    if (!email || !password) {
      Alert.alert("Erro", "Preenche os campos obrigatórios.");
      return;
    }

    setLoading(true);
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        if (password !== confirmPassword) {
          Alert.alert("Erro", "As passwords não coincidem.");
          setLoading(false);
          return;
        }
        if (!nome) {
          Alert.alert("Erro", "O nome é obrigatório.");
          setLoading(false);
          return;
        }

        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        await setDoc(doc(db, "users", user.uid), {
          nome: nome,
          email: email,
          telefone: "",
          rating_medio: 0,
          data_registo: Timestamp.now(),
          is_verified: false,
          fcm_token: ""
        });
      }
    } catch (error: any) {
      console.error(error);
      let msg = error.message;
      if (error.code === 'auth/invalid-credential') msg = "Dados incorretos.";
      if (error.code === 'auth/email-already-in-use') msg = "Este email já existe.";
      Alert.alert("Erro", msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"} 
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        
        {/* TÍTULO COM A COR PRIMARY */}
        <Text style={styles.headerTitle}>Aktie</Text>
        <Text style={styles.subTitle}>{isLogin ? "Bem-vindo de volta" : "Cria a tua conta"}</Text>

        <View style={styles.formContainer}>
          {!isLogin && (
            <TextInput 
              placeholder="Nome Completo" 
              placeholderTextColor="#999"
              value={nome} onChangeText={setNome} 
              style={styles.input} 
            />
          )}

          <TextInput 
            placeholder="Email" 
            placeholderTextColor="#999"
            value={email} onChangeText={setEmail} 
            style={styles.input} 
            autoCapitalize="none"
            keyboardType="email-address"
          />

          <TextInput 
            placeholder="Password" 
            placeholderTextColor="#999"
            value={password} onChangeText={setPassword} 
            style={styles.input} 
            secureTextEntry 
          />

          {!isLogin && (
            <TextInput 
              placeholder="Confirmar Password" 
              placeholderTextColor="#999"
              value={confirmPassword} onChangeText={setConfirmPassword} 
              style={styles.input} 
              secureTextEntry 
            />
          )}

          {/* BOTÃO COM A COR PRIMARY */}
          <TouchableOpacity style={styles.primaryButton} onPress={handleAuth} disabled={loading}>
            {loading ? (
              <ActivityIndicator color={Colors.white} />
            ) : (
              <Text style={styles.primaryButtonText}>
                {isLogin ? "Entrar" : "Registar"}
              </Text>
            )}
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={toggleMode} style={styles.toggleContainer}>
          <Text style={styles.toggleText}>
            {isLogin ? "Ainda não tens conta? " : "Já tens conta? "}
            <Text style={styles.toggleTextBold}>
              {isLogin ? "Regista-te" : "Faz Login"}
            </Text>
          </Text>
        </TouchableOpacity>

      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.white },
  scrollContainer: { flexGrow: 1, justifyContent: 'center', padding: 20 },
  
  headerTitle: { 
    fontSize: 32, 
    fontWeight: 'bold', 
    color: Colors.primary, // <--- VERDE
    textAlign: 'center', 
    marginBottom: 10 
  },
  
  subTitle: { 
    fontSize: 18, 
    color: Colors.dark, // <--- ESCURO
    textAlign: 'center', 
    marginBottom: 30,
    opacity: 0.8 
  },
  
  formContainer: { width: '100%' },
  
  input: { 
    backgroundColor: '#f5f5f5', // Um cinza claro neutro para contraste com o branco
    borderWidth: 1, 
    borderColor: '#e0e0e0', 
    padding: 15, 
    borderRadius: 12, 
    marginBottom: 15,
    fontSize: 16,
    color: Colors.dark // Texto digitado escuro
  },
  
  primaryButton: { 
    backgroundColor: Colors.primary, // <--- VERDE
    padding: 15, 
    borderRadius: 12, 
    alignItems: 'center', 
    marginTop: 10,
    // Sombra suave
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  
  primaryButtonText: { 
    color: Colors.white, 
    fontWeight: 'bold', 
    fontSize: 16 
  },
  
  toggleContainer: { marginTop: 20, alignItems: 'center', padding: 10 },
  
  toggleText: { 
    color: Colors.dark, 
    fontSize: 14 
  },
  
  toggleTextBold: { 
    color: Colors.primary, // <--- VERDE
    fontWeight: 'bold' 
  }
});

export default AuthScreen;