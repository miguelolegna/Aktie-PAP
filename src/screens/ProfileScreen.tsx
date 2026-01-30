// src/screens/ProfileScreen.tsx
import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { ProfileStyles as styles } from '../styles/Screens/ProfileStyles';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors } from '../styles/GlobalStyles';

const ProfileScreen = ({ navigation }: any) => {
  const { user, logout } = useAuth();

  const MenuOption = ({ icon, label, onPress, color = Colors.dark }: any) => (
    <TouchableOpacity style={styles.menuItem} onPress={onPress}>
      <View style={styles.menuItemLeft}>
        <View style={[styles.iconContainer, { backgroundColor: color + '15' }]}>
          <MaterialCommunityIcons name={icon} size={22} color={color} />
        </View>
        <Text style={styles.menuLabel}>{label}</Text>
      </View>
      <Ionicons name="chevron-forward" size={18} color={Colors.gray} />
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      {/* HEADER: INFO DO UTILIZADOR */}
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <Image 
            source={{ uri: user?.photoURL || 'https://via.placeholder.com/150' }} 
            style={styles.avatar} 
          />
          <TouchableOpacity style={styles.editAvatarButton}>
            <Ionicons name="camera" size={16} color="white" />
          </TouchableOpacity>
        </View>
        <Text style={styles.userName}>{user?.displayName || 'Utilizador Aktie'}</Text>
        <Text style={styles.userEmail}>{user?.email}</Text>
      </View>

      {/* SECÇÃO: GESTÃO (DONO) */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Anfitrião</Text>
        <MenuOption 
          icon="ev-station" 
          label="Meus Carregadores" 
          color={Colors.primary}
          onPress={() => navigation.navigate('MyChargers')} 
        />
        <MenuOption 
          icon="calendar-clock" 
          label="Histórico de Ganhos" 
          onPress={() => navigation.navigate('History', { mode: 'host' })} 
        />
      </View>

      {/* SECÇÃO: UTILIZAÇÃO (CONDUTOR) */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Condutor</Text>
        <MenuOption 
          icon="history" 
          label="Histórico de Carregamentos" 
          onPress={() => navigation.navigate('History', { mode: 'driver' })} 
        />
        <MenuOption 
          icon="credit-card-outline" 
          label="Pagamentos e Faturação" 
          onPress={() => {}} 
        />
      </View>

      {/* SECÇÃO: CONFIGURAÇÕES */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Apoio</Text>
        <MenuOption icon="cog-outline" label="Configurações" onPress={() => {}} />
        <MenuOption 
          icon="logout" 
          label="Sair da Conta" 
          color={Colors.danger} 
          onPress={logout} 
        />
      </View>
    </ScrollView>
  );
};

export default ProfileScreen;