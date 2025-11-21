import React, { useState } from 'react';
import SplashScreen from './screens/SplashScreen';
import HomeScreen from './screens/HomeScreen';

// Esta é a função principal que o Expo/React Native irá renderizar.
const App: React.FC = () => {
  // Estado para controlar se o carregamento inicial (Splash Screen) terminou.
  const [isAppLoading, setIsAppLoading] = useState(true);

  if (isAppLoading) {
    // 1. Mostrar o Logo/Splash Screen
    return <SplashScreen onFinish={() => setIsAppLoading(false)} />;
  }

  // 2. Mostrar a Tela Inicial (após o carregamento)
  return <HomeScreen />;
};

export default App;