import React, { useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, FontAwesome6 } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics'; 

import HomeScreen from '../screens/HomeScreen';
import MapScreen from '../screens/MapScreen';
import BookingsScreen from '../screens/BookingsScreen';
import ProfileScreen from '../screens/ProfileScreen';

import { Colors } from '../styles/GlobalStyles';
import { AppTabsStyles, TAB_WIDTH } from '../styles/Navigation/AppTabsStyles';

const Tab = createBottomTabNavigator();

type TabRoutes = 'Carregadores' | 'Mapa' | 'Reservas' | 'Perfil';

const TAB_CONFIG: Record<TabRoutes, any> = {
  Carregadores: { lib: FontAwesome6, iconActive: 'charging-station', iconInactive: 'charging-station', label: 'Postos', size: 23 },
  Mapa: { lib: Ionicons, iconActive: 'map', iconInactive: 'map-outline', label: 'Mapa', size: 25 },
  Reservas: { lib: Ionicons, iconActive: 'calendar', iconInactive: 'calendar-outline', label: 'Reservas', size: 25 },
  Perfil: { lib: Ionicons, iconActive: 'person', iconInactive: 'person-outline', label: 'Perfil', size: 25 }
};

interface TabIconProps {
  isFocused: boolean;
  routeName: TabRoutes;
  onPress: () => void;
}

const TabIcon = ({ isFocused, routeName, onPress }: TabIconProps) => {
  const iconScale = useRef(new Animated.Value(1)).current;
  const iconTranslateY = useRef(new Animated.Value(0)).current;
  const config = TAB_CONFIG[routeName];
  const IconLib = config.lib;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(iconScale, { toValue: isFocused ? 1.2 : 1, useNativeDriver: true, friction: 8 }),
      Animated.spring(iconTranslateY, { toValue: isFocused ? -15 : 0, useNativeDriver: true, friction: 7 })
    ]).start();
  }, [isFocused]);

  return (
    <TouchableOpacity onPress={onPress} style={AppTabsStyles.tabButton} activeOpacity={1}>
      <Animated.View style={[AppTabsStyles.iconWrapper, { transform: [{ translateY: iconTranslateY }, { scale: iconScale }] }]}>
        <IconLib 
          name={isFocused ? config.iconActive : config.iconInactive} 
          size={config.size} 
          color={isFocused ? Colors.white : Colors.gray} 
        />
      </Animated.View>
      <Text style={[AppTabsStyles.label, { color: isFocused ? Colors.primary : Colors.gray, opacity: isFocused ? 1 : 0.6 }]}>
        {config.label}
      </Text>
    </TouchableOpacity>
  );
};

const CustomTabBar = ({ state, navigation }: any) => {
  const translateValue = useRef(new Animated.Value(state.index * TAB_WIDTH)).current;
  const bubbleStretchX = useRef(new Animated.Value(1)).current;
  const bubbleStretchY = useRef(new Animated.Value(1)).current;
  
  const lastIndex = useRef(state.index);

  useEffect(() => {
    if (state.index !== lastIndex.current) {
      lastIndex.current = state.index;
      
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

      Animated.parallel([
        // Movimento lateral com amortecimento reduzido para permitir o efeito de mola
        Animated.spring(translateValue, {
          toValue: state.index * TAB_WIDTH,
          useNativeDriver: true,
          damping: 13, // Reduzido de 18 para 12 para permitir overshoot (mola)
          stiffness: 100,
        }),
        // Efeito de compressão mantendo os valores de 2 e 0.3
        Animated.sequence([
          Animated.parallel([
            Animated.timing(bubbleStretchX, { toValue: 2, duration: 180, useNativeDriver: true }),
            Animated.timing(bubbleStretchY, { toValue: 0.3, duration: 180, useNativeDriver: true }),
          ]),
          Animated.parallel([
            Animated.spring(bubbleStretchX, { toValue: 1, useNativeDriver: true, friction: 6 }),
            Animated.spring(bubbleStretchY, { toValue: 1, useNativeDriver: true, friction: 6 }),
          ])
        ])
      ]).start();
    }
  }, [state.index]);

  return (
    <View style={AppTabsStyles.tabBarContainer}>
      <Animated.View style={[
        AppTabsStyles.travelerContainer, 
        { transform: [{ translateX: translateValue }] }
      ]}>
        <Animated.View style={[
          AppTabsStyles.bubble,
          { transform: [{ scaleX: bubbleStretchX }, { scaleY: bubbleStretchY }] } 
        ]} />
      </Animated.View>

      <View style={AppTabsStyles.iconsContainer}>
        {state.routes.map((route: any, index: number) => {
          const isFocused = state.index === index;
          const onPress = () => {
            const event = navigation.emit({ type: 'tabPress', target: route.key, canPreventDefault: true });
            if (!isFocused && !event.defaultPrevented) navigation.navigate(route.name);
          };
          return <TabIcon key={index} isFocused={isFocused} routeName={route.name as TabRoutes} onPress={onPress} />;
        })}
      </View>
    </View>
  );
};

const AppTabs = () => (
  <Tab.Navigator 
    tabBar={props => <CustomTabBar {...props} />} 
    screenOptions={{ headerShown: false }} 
    initialRouteName="Mapa"
  >
    <Tab.Screen name="Carregadores" component={HomeScreen} />
    <Tab.Screen name="Mapa" component={MapScreen} />
    <Tab.Screen name="Reservas" component={BookingsScreen} />
    <Tab.Screen name="Perfil" component={ProfileScreen} />
  </Tab.Navigator>
);

export default AppTabs;