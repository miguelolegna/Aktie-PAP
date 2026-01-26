// App.tsx
import React, { useState, useEffect } from 'react';
import { View, StatusBar, StyleSheet, LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Importação das Fontes e Ícones
import * as Font from 'expo-font';
import { FontAwesome6, MaterialIcons, Ionicons } from '@expo/vector-icons';

import AppTabs from './src/navigation/AppTabs';
import { AuthProvider, useAuth } from './src/context/AuthContext';
import AuthScreen from './src/screens/AuthScreen';
import SmartSplashScreen from './src/screens/SplashScreen';
import AddChargerScreen from './src/screens/AddChargerScreen'; 

// Ignorar avisos de timers e o aviso de GO_BACK em desenvolvimento
LogBox.ignoreLogs([
  'Setting a timer',
  'The action \'GO_BACK\' was not handled by any navigator'
]);

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const { loading, user } = useAuth();

  // FAILSAFE: Não renderiza enquanto o Firebase carrega
  if (loading) return null;

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!user ? (
          <Stack.Screen name="Auth" component={AuthScreen} />
        ) : (
          <>
            <Stack.Screen name="MainTabs" component={AppTabs} />
            <Stack.Screen 
              name="AddCharger" 
              component={AddChargerScreen} 
              options={{ headerShown: true, title: 'Novo Carregador' }} 
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const RootLayout = () => {
  const { loading: authLoading } = useAuth();
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [isSplashVisible, setSplashVisible] = useState(true);

  // Carregamento de Recursos Críticos
  useEffect(() => {
    async function prepare() {
      try {
        // Carrega as fontes dos ícones manualmente para o Build de Desenvolvimento
        await Font.loadAsync({
          ...FontAwesome6.font,
          ...MaterialIcons.font,
          ...Ionicons.font,
        });
        setFontsLoaded(true);
      } catch (e) {
        console.warn("Erro ao carregar fontes:", e);
      }
    }
    prepare();

    // FAILSAFE: Remove a splash screen após 6s mesmo em caso de erro
    const timeout = setTimeout(() => {
      setSplashVisible(false);
    }, 6000);

    return () => clearTimeout(timeout);
  }, []);

  // Condição de carregamento completa
  const isAppReady = !authLoading && fontsLoaded;

  return (
    <View style={{ flex: 1, backgroundColor: '#000' }}>
      <StatusBar barStyle="light-content" />
      
      {/* O Navigator só monta quando temos Auth + Fontes ou quando o Failsafe atua */}
      {(isAppReady || !isSplashVisible) && <AppNavigator />}
      
      {isSplashVisible && (
        <View style={StyleSheet.absoluteFill}>
          <SmartSplashScreen 
            isLoading={!isAppReady} 
            onFinish={() => setSplashVisible(false)} 
          />
        </View>
      )}
    </View>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <RootLayout />
    </AuthProvider>
  );
}