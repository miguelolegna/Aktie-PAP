// App.tsx
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
import ChargerDetailsScreen from './src/screens/ChargerDetailsScreen';
import { Colors } from './src/styles/GlobalStyles';
import { enableScreens } from 'react-native-screens';
enableScreens(); // Faz com que abas em background consumam 0% de CPU

LogBox.ignoreLogs(['Setting a timer', 'The action \'GO_BACK\' was not handled by any navigator']);

const Stack = createNativeStackNavigator();

const AppNavigator = () => (
  <NavigationContainer>
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MainTabs" component={AppTabs} />
      <Stack.Screen name="Auth" component={AuthScreen} options={{ presentation: 'modal' }} />
      <Stack.Screen 
        name="ChargerDetails" 
        component={ChargerDetailsScreen} 
        options={{ headerShown: true, title: 'Detalhes', headerTintColor: Colors.primary }} 
      />
      <Stack.Screen 
        name="AddCharger" 
        component={AddChargerScreen} 
        options={{ headerShown: true, title: 'Registar', headerTintColor: Colors.primary }} 
      />
    </Stack.Navigator>
  </NavigationContainer>
);

const RootLayout = () => {
  const { loading: authLoading } = useAuth();
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [isSplashVisible, setSplashVisible] = useState(true);
  // NOVO: Controla quando o Navigator pesado entra em cena
  const [mountNavigator, setMountNavigator] = useState(false);

  const handlePrepareExit = () => {
    // Adicionamos um pequeno respiro para evitar o IllegalStateException
    // Dá tempo ao Video Player para libertar o codec nativo
    setTimeout(() => {
      setMountNavigator(true);
    }, 300); 
  };

  useEffect(() => {
    async function prepare() {
      try {
        await Font.loadAsync({ ...FontAwesome6.font, ...MaterialIcons.font, ...Ionicons.font });
        setFontsLoaded(true);
      } catch (e) { setFontsLoaded(true); }
    }
    prepare();
  }, []);

  const isAppReady = fontsLoaded && !authLoading;

  return (
      <View style={{ flex: 1, backgroundColor: '#FFF' }}>
        {mountNavigator && <AppNavigator />}
        
        {isSplashVisible && (
          <SmartSplashScreen 
            isLoading={!isAppReady} 
            onPrepareExit={handlePrepareExit} // Agora usa a função com atraso
            onFinish={() => setSplashVisible(false)} 
          />
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