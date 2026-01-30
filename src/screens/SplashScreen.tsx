import React, { useEffect, useRef, useState } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { useVideoPlayer, VideoView } from 'expo-video'; 
import { useEvent } from 'expo';

interface SmartSplashScreenProps {
  isLoading: boolean;
  onPrepareExit: () => void; // Gatilho para montar o Navigator pesado
  onFinish: () => void;      // Gatilho para desmontar a Splash
}

const SmartSplashScreen: React.FC<SmartSplashScreenProps> = ({ isLoading, onPrepareExit, onFinish }) => {
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const [isVisible, setIsVisible] = useState(true);
  const exitTriggered = useRef(false);

  const player = useVideoPlayer(require('../../assets/Animação_com_Ficha_na_Ponta.mp4'), (p) => {
    p.loop = false;
    p.muted = true;
    p.play();
  });

  // Listeners de eventos para atualização de estado
  useEvent(player, 'playingChange');
  useEvent(player, 'statusChange');

  useEffect(() => {
    const checkStatus = () => {
      if (exitTriggered.current) return;

      // 1. Aceleração se os dados já carregaram
      if (!isLoading && player.playing) {
        player.playbackRate = 2.5;
      }

      // 2. Verificação de Fim de Vídeo
      const isVideoAtEnd = player.duration > 0 && player.currentTime >= (player.duration - 0.2);
      const isIdle = player.status === 'idle';

      // 3. Saída Sequencial: Só quando Loading termina E Vídeo acaba
      if (!isLoading && (isVideoAtEnd || isIdle)) {
        exitTriggered.current = true;
        
        // PRIMEIRO: Sinaliza ao App.tsx para montar o Mapa em background
        onPrepareExit(); 

        // SEGUNDO: Inicia o fade-out visual
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 700,
          useNativeDriver: true,
        }).start(() => {
          setIsVisible(false);
          onFinish();
        });
      }
    };

    // Usamos requestAnimationFrame para manter a fluidez sem entupir a thread
    const frame = requestAnimationFrame(checkStatus);
    return () => cancelAnimationFrame(frame);
  }, [isLoading, player.currentTime, player.status]);

  if (!isVisible) return null;

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <VideoView
        player={player}
        style={styles.videoView}
        contentFit="contain"
        nativeControls={false}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#FFFFFF',
    zIndex: 99999,
  },
  videoView: {
    width: '100%',
    height: '100%',
  },
});

export default SmartSplashScreen;