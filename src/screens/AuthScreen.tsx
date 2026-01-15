// src/screens/AuthScreen.tsx
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  SafeAreaView, 
  Alert,
  ActivityIndicator,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  LayoutAnimation, // Importante para a animação
  UIManager
} from 'react-native';
import { useAuth } from '../context/AuthContext';
import { AuthStyles } from '../styles/Screens/AuthStyles';

// Ativar animações no Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const AuthScreen = () => {
  const { login, register } = useAuth();
  
  const [isLogin, setIsLogin] = useState(true);
  const [localLoading, setLocalLoading] = useState(false);

  // Estados dos Inputs
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Função para alternar modos com animação suave
  const toggleMode = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsLogin(!isLogin);
  };

  const handleAuth = async () => {
    // Validações básicas
    if (!email || !password) {
      Alert.alert('Erro', 'Por favor preenche o email e a password.');
      return;
    }

    if (!isLogin) {
      if (!nome) {
        Alert.alert('Erro', 'O nome é obrigatório para o registo.');
        return;
      }
      if (password !== confirmPassword) {
        Alert.alert('Erro', 'As passwords não coincidem.');
        return;
      }
    }

    setLocalLoading(true);
    try {
      if (isLogin) {
        await login(email, password);
      } else {
        // Agora passamos também o nome para o contexto criar no Firestore
        await register(email, password, nome);
        Alert.alert('Sucesso', 'Conta criada! Bem-vindo à Aktie.');
      }
    } catch (error: any) {
      console.error(error);
      let msg = error.message;
      if (error.code === 'auth/invalid-email') msg = 'Email inválido.';
      if (error.code === 'auth/user-not-found') msg = 'Utilizador não encontrado.';
      if (error.code === 'auth/wrong-password') msg = 'Password errada.';
      if (error.code === 'auth/email-already-in-use') msg = 'Este email já está registado.';
      if (error.code === 'auth/weak-password') msg = 'A password deve ter pelo menos 6 caracteres.';
      
      Alert.alert('Erro de Autenticação', msg);
    } finally {
      setLocalLoading(false);
    }
  };

  return (
    <SafeAreaView style={AuthStyles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView 
          contentContainerStyle={AuthStyles.scrollContainer}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={AuthStyles.headerTitle}>Aktie Energy</Text>
          <Text style={AuthStyles.subTitle}>
            {isLogin ? 'Bem-vindo de volta' : 'Cria a tua conta'}
          </Text>

          <View style={AuthStyles.formContainer}>
            
            {/* INPUT NOME (Só aparece no registo) */}
            {!isLogin && (
              <View>
                <Text style={[AuthStyles.toggleText, { marginBottom: 5, marginLeft: 4 }]}>Nome Completo</Text>
                <TextInput 
                  style={AuthStyles.input} 
                  placeholder="O teu nome"
                  value={nome}
                  onChangeText={setNome}
                  placeholderTextColor="#999"
                />
              </View>
            )}

            {/* INPUT EMAIL */}
            <Text style={[AuthStyles.toggleText, { marginBottom: 5, marginLeft: 4 }]}>Email</Text>
            <TextInput 
              style={AuthStyles.input} 
              placeholder="exemplo@aktie.com"
              autoCapitalize="none"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
              placeholderTextColor="#999"
            />

            {/* INPUT PASSWORD */}
            <Text style={[AuthStyles.toggleText, { marginBottom: 5, marginLeft: 4 }]}>Password</Text>
            <TextInput 
              style={AuthStyles.input} 
              placeholder="********"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
              placeholderTextColor="#999"
            />

            {/* INPUT CONFIRMAR PASSWORD (Só aparece no registo) */}
            {!isLogin && (
              <View>
                <Text style={[AuthStyles.toggleText, { marginBottom: 5, marginLeft: 4 }]}>Confirmar Password</Text>
                <TextInput 
                  style={AuthStyles.input} 
                  placeholder="********"
                  secureTextEntry
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  placeholderTextColor="#999"
                />
              </View>
            )}

            <TouchableOpacity 
              style={AuthStyles.primaryButton} 
              onPress={handleAuth}
              disabled={localLoading}
            >
              {localLoading ? (
                <ActivityIndicator color="#FFF" />
              ) : (
                <Text style={AuthStyles.primaryButtonText}>
                  {isLogin ? 'ENTRAR' : 'REGISTAR'}
                </Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity 
              style={AuthStyles.toggleContainer} 
              onPress={toggleMode} // Usa a função com animação
            >
              <Text style={AuthStyles.toggleText}>
                {isLogin ? 'Não tens conta? ' : 'Já tens conta? '}
                <Text style={AuthStyles.toggleTextBold}>
                  {isLogin ? 'Regista-te' : 'Entra'}
                </Text>
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default AuthScreen;