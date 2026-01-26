
import React, { useState, useEffect } from 'react';
import { View, StatusBar, StyleSheet, LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import * as Font from 'expo-font';
import { FontAwesome6, MaterialIcons, Ionicons } from '@expo/vector-icons';

import AppTabs from './src/navigation/AppTabs';
import { AuthProvider, useAuth } from './src/context/AuthContext';
import AuthScreen from './src/screens/AuthScreen';
import SmartSplashScreen from './src/screens/SplashScreen';
import AddChargerScreen from './src/screens/AddChargerScreen'; 
import ChargerDetailsScreen from './src/screens/ChargerDetailsScreen'; // IMPORTANTE

LogBox.ignoreLogs([
  'Setting a timer',
  'The action \'GO_BACK\' was not handled by any navigator'
]);

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const { loading, user } = useAuth();

  if (loading) return null;

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!user ? (
          <Stack.Screen name="Auth" component={AuthScreen} />
        ) : (
          <>
            <Stack.Screen name="MainTabs" component={AppTabs} />
            {/* Registo Crítico para Navegação */}
            <Stack.Screen 
              name="ChargerDetails" 
              component={ChargerDetailsScreen} 
              options={{ headerShown: true, title: 'Detalhes do Posto' }} 
            />
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

export default function App() {
  return (
    <AuthProvider>
      <AppNavigator />
    </AuthProvider>
  );
}