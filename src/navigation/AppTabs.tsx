import React, { useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, Animated, Easing } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, FontAwesome6 } from '@expo/vector-icons';

// ECRÃS REAIS
import HomeScreen from '../screens/HomeScreen';
import MapScreen from '../screens/MapScreen'; // <--- A PEÇA QUE FALTAVA

import { Colors } from '../styles/GlobalStyles';
import { AppTabsStyles, TAB_WIDTH } from '../styles/Navigation/AppTabsStyles';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();

// --- CONFIGURAÇÃO CENTRAL ---
const TAB_CONFIG: any = {
  Carregadores: {
    lib: FontAwesome6,
    iconActive: 'charging-station',
    iconInactive: 'charging-station',
    label: 'Carregadores',
    iconSize: 20
  },
  Mapa: {
    lib: Ionicons,
    iconActive: 'map',
    iconInactive: 'map-outline',
    label: 'Mapa',
    iconSize: 24
  },
  Reservas: {
    lib: Ionicons,
    iconActive: 'calendar',
    iconInactive: 'calendar-outline',
    label: 'Reservas',
    iconSize: 24
  },
  Perfil: {
    lib: Ionicons,
    iconActive: 'person',
    iconInactive: 'person-outline',
    label: 'Perfil',
    iconSize: 24
  }
};

// --- PLACEHOLDERS (Só para o que ainda não existe) ---
const BookingsPlaceholder = () => <View style={AppTabsStyles.screenCenter}><Text>Reservas</Text></View>;
const ProfilePlaceholder = () => <View style={AppTabsStyles.screenCenter}><Text>Perfil</Text></View>;

// --- COMPONENTE ÍCONE ---
const TabIcon = ({ isFocused, routeName, onPress }: any) => {
  const iconScale = useRef(new Animated.Value(1)).current;
  const iconTranslateY = useRef(new Animated.Value(0)).current;

  const config = TAB_CONFIG[routeName];
  const IconLib = config.lib;
  const iconName = isFocused ? config.iconActive : config.iconInactive;
  const color = isFocused ? Colors.white : Colors.gray;

  useEffect(() => {
    if (isFocused) {
      Animated.parallel([
        Animated.sequence([
          Animated.timing(iconScale, { toValue: 1.2, duration: 100, useNativeDriver: true }),
          Animated.spring(iconScale, { toValue: 1, friction: 4, useNativeDriver: true })
        ]),
        Animated.spring(iconTranslateY, { toValue: -5, useNativeDriver: true })
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(iconScale, { toValue: 1, duration: 200, useNativeDriver: true }),
        Animated.spring(iconTranslateY, { toValue: 0, useNativeDriver: true })
      ]).start();
    }
  }, [isFocused]);

  return (
    <TouchableOpacity onPress={onPress} style={AppTabsStyles.tabButton} activeOpacity={1}>
      <Animated.View style={[
        AppTabsStyles.iconWrapper, 
        { transform: [{ translateY: iconTranslateY }, { scale: iconScale }] }
      ]}>
        <IconLib name={iconName} size={config.iconSize} color={color} />
      </Animated.View>
      
      <Text numberOfLines={1} style={[
        AppTabsStyles.label, 
        { color: isFocused ? Colors.primary : Colors.gray, opacity: isFocused ? 1 : 0.7 }
      ]}>
        {config.label}
      </Text>
    </TouchableOpacity>
  );
};

// --- BARRA PRINCIPAL ---
const CustomTabBar = ({ state, descriptors, navigation }: any) => {
  const translateValue = useRef(new Animated.Value(0)).current;
  const widthScale = useRef(new Animated.Value(1)).current;
  const heightScale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const currentTabPosition = state.index * TAB_WIDTH;

    Animated.parallel([
      Animated.spring(translateValue, {
        toValue: currentTabPosition,
        useNativeDriver: true,
        damping: 14,
        mass: 1,
        stiffness: 100,
      }),
      Animated.sequence([
        Animated.parallel([
          Animated.timing(widthScale, {
            toValue: 2.0,
            duration: 150,
            useNativeDriver: true,
            easing: Easing.out(Easing.poly(4))
          }),
          Animated.timing(heightScale, {
            toValue: 0.15,
            duration: 150,
            useNativeDriver: true,
            easing: Easing.out(Easing.poly(4)), 
          })
        ]),
        Animated.parallel([
          Animated.spring(widthScale, { toValue: 1, useNativeDriver: true, friction: 5, tension: 40 }),
          Animated.spring(heightScale, { toValue: 1, useNativeDriver: true, friction: 5, tension: 40 })
        ])
      ])
    ]).start();
  }, [state.index]);

  return (
    <View style={AppTabsStyles.tabBarContainer}>
      <Animated.View
        style={[
          AppTabsStyles.bubble,
          {
            transform: [
              { translateX: translateValue },
              { scaleX: widthScale },
              { scaleY: heightScale }
            ],
          },
        ]}
      />
      <View style={AppTabsStyles.iconsContainer}>
        {state.routes.map((route: any, index: number) => {
          const isFocused = state.index === index;
          const onPress = () => {
            const event = navigation.emit({ type: 'tabPress', target: route.key, canPreventDefault: true });
            if (!isFocused && !event.defaultPrevented) navigation.navigate(route.name);
          };
          return <TabIcon key={index} isFocused={isFocused} routeName={route.name} onPress={onPress} />;
        })}
      </View>
    </View>
  );
};

const AppTabs = () => {
  return (
    <Tab.Navigator 
      tabBar={props => <CustomTabBar {...props} />} 
      screenOptions={{ headerShown: false }} 
      initialRouteName="Mapa" 
    >
      <Tab.Screen name="Carregadores" component={HomeScreen} />
      <Tab.Screen name="Mapa" component={MapScreen} />      
      <Tab.Screen name="Reservas" component={BookingsPlaceholder} />
      <Tab.Screen name="Perfil" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default AppTabs;