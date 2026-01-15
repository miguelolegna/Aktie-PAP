// App.tsx
import React, { useState } from 'react';
import { View, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AppTabs from './src/navigation/AppTabs';
import { AuthProvider, useAuth } from './src/context/AuthContext';
import AuthScreen from './src/screens/AuthScreen';
import ChargerDetailsScreen from './src/screens/ChargerDetailsScreen';
import AddChargerScreen from './src/screens/AddChargerScreen';
import SmartSplashScreen from './src/screens/SplashScreen';
import { Colors } from './src/styles/GlobalStyles';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  // Já não precisamos do 'user' aqui para decidir as rotas
  // Todas as rotas estão disponíveis, o bloqueio será feito nos botões
  const { user } = useAuth();

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        
        {/* ROTA INICIAL: Sempre as Abas (Mapa/Perfil) */}
        <Stack.Screen name="MainTabs" component={AppTabs} />
        
        {/* Auth agora é um ecrã acessível, não um bloqueio */}
        <Stack.Screen 
          name="Auth" 
          component={AuthScreen} 
          options={{ presentation: 'modal' }} // Fica bonito a abrir tipo popup
        />

        {/* Ecrãs Secundários */}
        <Stack.Screen 
          name="ChargerDetails" 
          component={ChargerDetailsScreen} 
          options={{ 
            headerShown: true, 
            title: 'Detalhes',
            headerTintColor: Colors.primary 
          }} 
        />
        
        <Stack.Screen 
          name="AddCharger" 
          component={AddChargerScreen} 
          options={{ 
            headerShown: true, 
            title: 'Novo Carregador',
            headerTintColor: Colors.primary 
          }} 
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

const RootLayout = () => {
  const { loading } = useAuth();
  const [isSplashVisible, setSplashVisible] = useState(true);

  return (
    <View style={{ flex: 1, backgroundColor: '#000' }}>
      <StatusBar barStyle="light-content" />
      <AppNavigator />
      {isSplashVisible && (
        <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 999 }}>
            <SmartSplashScreen 
              isLoading={loading} 
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