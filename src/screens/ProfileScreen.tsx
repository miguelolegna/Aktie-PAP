// src/screens/ProfileScreen.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, SafeAreaView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { doc, getDoc } from 'firebase/firestore';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';
import { db } from '../config/firebaseConfig';
import { ProfileStyles as styles } from '../styles/Screens/ProfileStyles';
import { Colors } from '../styles/GlobalStyles';

interface UserProfile {
  nome: string;
  email: string;
  telefone: string;
  rating_medio: number;
}

const ProfileScreen = () => {
  const navigation = useNavigation<any>();
  const { user, logout, loading: authLoading } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) {
        setLoading(false);
        return;
      }
      try {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProfile(docSnap.data() as UserProfile);
        }
      } catch (error) {
        console.error("Erro ao carregar perfil:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [user]);

  const handleLogout = () => {
    Alert.alert("Sair", "Tens a certeza que desejas terminar sessão?", [
      { text: "Cancelar", style: "cancel" },
      { text: "Sair", style: "destructive", onPress: logout }
    ]);
  };

  if (loading || authLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  // GUEST MODE VIEW
  if (!user) {
    return (
      <SafeAreaView style={styles.centered}>
        <Ionicons name="person-circle-outline" size={100} color={Colors.gray} />
        <Text style={styles.guestTitle}>Olá, Visitante</Text>
        <Text style={styles.guestSubtitle}>Inicia sessão para gerir os teus postos, reservas e pagamentos.</Text>
        <TouchableOpacity 
          style={[styles.primaryButton, { width: '80%', marginTop: 20 }]} 
          onPress={() => navigation.navigate('Auth')}
        >
          <Text style={styles.buttonText}>ENTRAR / REGISTAR</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  // AUTHENTICATED VIEW
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatarPlaceholder}>
            <Text style={styles.avatarLetter}>{profile?.nome?.charAt(0) || "U"}</Text>
        </View>
        <Text style={styles.name}>{profile?.nome || "Utilizador Aktie"}</Text>
        <Text style={styles.email}>{user.email}</Text>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>Rating</Text>
          <Text style={styles.statValue}>{profile?.rating_medio?.toFixed(1) || "5.0"} ★</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>Telemóvel</Text>
          <Text style={styles.statValue}>{profile?.telefone || "---"}</Text>
        </View>
      </View>

      <TouchableOpacity 
        style={styles.primaryButton} 
        onPress={() => navigation.navigate('AddCharger')}
      >
        <Text style={styles.buttonText}>Adicionar Carregador</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={[styles.buttonText, { color: Colors.danger }]}>Terminar Sessão</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default ProfileScreen;