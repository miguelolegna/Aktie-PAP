import React, { useState, useEffect } from 'react';
import { View, StatusBar, StyleSheet, LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Importação de Recursos
import * as Font from 'expo-font';
import { FontAwesome6, MaterialIcons, Ionicons } from '@expo/vector-icons';

import AppTabs from './src/navigation/AppTabs';
import { AuthProvider, useAuth } from './src/context/AuthContext';
import AuthScreen from './src/screens/AuthScreen';
import SmartSplashScreen from './src/screens/SplashScreen';
import AddChargerScreen from './src/screens/AddChargerScreen'; 
import ChargerDetailsScreen from './src/screens/ChargerDetailsScreen';
import { Colors } from './src/styles/GlobalStyles';

LogBox.ignoreLogs([
  'Setting a timer',
  'The action \'GO_BACK\' was not handled by any navigator'
]);

const Stack = createNativeStackNavigator();

/**
 * Gestor de Navegação Sem Bloqueio (Guest Mode Habilitado) 
 */
const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        
        {/* ENTRADA PRINCIPAL: Aberta a todos os utilizadores [cite: 10] */}
        <Stack.Screen name="MainTabs" component={AppTabs} />
        
        {/* AUTH: Acessível como Modal para convidados  */}
        <Stack.Screen 
          name="Auth" 
          component={AuthScreen} 
          options={{ presentation: 'modal' }} 
        />

        {/* ECRÃS DE DETALHES E GESTÃO */}
        <Stack.Screen 
          name="ChargerDetails" 
          component={ChargerDetailsScreen} 
          options={{ 
            headerShown: true, 
            title: 'Detalhes do Posto',
            headerTintColor: Colors.primary 
          }} 
        />
        
        <Stack.Screen 
          name="AddCharger" 
          component={AddChargerScreen} 
          options={{ 
            headerShown: true, 
            title: 'Registar Carregador',
            headerTintColor: Colors.primary 
          }} 
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

/**
 * Camada de Root: Gere Splash Screen e Carregamento de Recursos
 */
const RootLayout = () => {
  const { loading: authLoading } = useAuth();
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [isSplashVisible, setSplashVisible] = useState(true);

  // Carregamento de Fontes e Ícones Críticos
  useEffect(() => {
    async function prepare() {
      try {
        await Font.loadAsync({
          ...FontAwesome6.font,
          ...MaterialIcons.font,
          ...Ionicons.font,
        });
        setFontsLoaded(true);
      } catch (e) {
        console.warn("Erro no carregamento de fontes:", e);
        setFontsLoaded(true); // Failsafe
      }
    }
    prepare();
  }, []);

  // O Navigator só aparece quando a Splash Screen termina ou os dados carregam
  const isAppReady = !authLoading && fontsLoaded;

  return (
    <View style={{ flex: 1, backgroundColor: '#000' }}>
      <StatusBar barStyle="light-content" />
      
      <AppNavigator />
      
      {/* Camada Superior: Splash Screen  */}
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