// src/screens/SplashScreen.tsx
import React, { useEffect, useRef, useState } from 'react';
import { Animated } from 'react-native';
import { useVideoPlayer, VideoView } from 'expo-video'; // Nova biblioteca
import { useEvent } from 'expo';
import { splashStyles } from '../styles/Screens/SplashScreenStyles';

interface SmartSplashScreenProps {
  isLoading: boolean;
  onFinish: () => void;
}

const SmartSplashScreen: React.FC<SmartSplashScreenProps> = ({ isLoading, onFinish }) => {
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const [isVisible, setIsVisible] = useState(true);
  const [videoFinished, setVideoFinished] = useState(false);

  // 1. Configurar o Player com a nova API
  const player = useVideoPlayer(require('../../assets/Animação_com_Ficha_na_Ponta.mp4'), (player) => {
    player.loop = false;
    player.muted = true;
    player.play();
  });

  // 2. Hook para ouvir eventos do player (status, tempo, etc)
  useEvent(player, 'playingChange'); 
  // Nota: expo-video gere o tempo internamente, não precisamos de state para cada milissegundo

  // Lógica de Controlo (Rápido vs Lento)
  useEffect(() => {
    // Verificar periodicamente o tempo, já que o evento de timeUpdate é muito rápido
    const interval = setInterval(() => {
      if (!player) return;
      
      const duration = player.duration;
      const currentTime = player.currentTime;

      // Se duração ainda for 0 (não carregou metadata), ignora
      if (duration <= 0) return;

      // Se o vídeo terminou
      if (currentTime >= duration - 0.1) { // margem de erro pequena
         setVideoFinished(true);
         checkCompletion(isLoading, true);
         return;
      }

      // LÓGICA INTELIGENTE
      // Se faltar pouco para acabar (0.2s)
      if (currentTime > duration - 0.2) {
        if (isLoading) {
          // Se a app ainda carrega, PAUSA no fim
          if (player.playing) {
            console.log('Loading lento: Pausando vídeo...');
            player.pause();
          }
        } else {
          // Se a app já carregou, ACELERA ou DEIXA TERMINAR
          // Na nova API, checkCompletion trata de fechar se já acabou
        }
      }
    }, 100); // Verifica a cada 100ms

    return () => clearInterval(interval);
  }, [isLoading, player.currentTime]); // Dependências do efeito


  // Reagir ao fim do loading externo
  useEffect(() => {
    if (!isLoading) {
      // Se o loading acabou e o vídeo ainda está no início/meio -> ACELERA
      if (player.duration > 0 && player.currentTime < player.duration - 0.5) {
        console.log('Loading rápido: Acelerando (4x)');
        player.playbackRate = 4.0; 
      }
      
      // Se o vídeo estava pausado no fim à espera -> Retoma/Finaliza
      // A verificação periódica acima vai apanhar o estado de "finished"
      if (!player.playing && player.currentTime > player.duration - 0.2) {
          setVideoFinished(true);
          checkCompletion(false, true);
      }
    }
  }, [isLoading]);


  const checkCompletion = (loadingState: boolean, videoState: boolean) => {
    if (!loadingState && videoState) {
      startExitAnimation();
    }
  };

  const startExitAnimation = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 800,
      useNativeDriver: true,
    }).start(() => {
      setIsVisible(false);
      if (onFinish) onFinish();
    });
  };

  if (!isVisible) return null;

  return (
    <Animated.View style={[splashStyles.container, { opacity: fadeAnim }]}>
      <VideoView
        player={player}
        style={splashStyles.videoView}
        contentFit="contain" // Equivalente ao resizeMode: CONTAIN
        nativeControls={false} // Esconde controlos nativos
        showsTimecodes={false}
      />
    </Animated.View>
  );
};

export default SmartSplashScreen;