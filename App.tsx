import React, { useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// 1. Importa os teus ecrãs e contextos
import { AuthProvider, useAuth } from './src/context/AuthContext';
import AuthScreen from './src/screens/AuthScreen';
import HomeScreen from './src/screens/HomeScreen';
import SplashScreen from './src/screens/SplashScreen';
import { Colors } from './src/styles/GlobalStyles';

const Stack = createNativeStackNavigator();

// 2. Componente que gere as Rotas (Navigator)
const AppNavigator = () => {
  const { user, loading } = useAuth();

  // Enquanto o Firebase vê se o user existe, mostra um spinner
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {user ? (
          // Se tiver user -> Vai para Home
          <Stack.Screen name="Home" component={HomeScreen} />
        ) : (
          // Se não tiver -> Vai para Auth (Login/Registo)
          <Stack.Screen name="Auth" component={AuthScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

// 3. Componente Principal
export default function App() {
  const [isSplashFinished, setIsSplashFinished] = useState(false);

  // FASE 1: Mostra o Splash Screen até ele terminar a animação
  if (!isSplashFinished) {
    return <SplashScreen onFinish={() => setIsSplashFinished(true)} />;
  }

  // FASE 2: Inicia o Contexto de Auth e o Navegador
  return (
    <AuthProvider>
      <AppNavigator />
    </AuthProvider>
  );
}