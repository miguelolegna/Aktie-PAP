// App.tsx (na raiz do projeto Aktie)
import React from 'react';
// Importa o ecrã que acabámos de criar
import HomeScreen from './screens/HomeScreen';

// Para o Aktie, o App.tsx vai ser o ponto de entrada principal,
// onde futuramente irá colocar o seu sistema de navegação (React Navigation).
const App = () => {
  // Por enquanto, apenas exibe o ecrã de Início
  return (
    <HomeScreen />
  );
};

export default App;