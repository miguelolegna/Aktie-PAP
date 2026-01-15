import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { ProfileStyles } from '../styles/Screens/ProfileStyles';

const ProfileScreen = ({ navigation }: any) => {
  const { user, logout } = useAuth(); // Obtém estado e funções do contexto

  return (
    <View style={ProfileStyles.container}>
      {user ? (
        // VISÃO: Utilizador Autenticado
        <>
          <Text style={ProfileStyles.headerText}>Bem-vindo, {user.email}</Text>
          
          <TouchableOpacity 
            style={ProfileStyles.actionButton} 
            onPress={() => navigation.navigate('AddCharger')}
          >
            <Text style={ProfileStyles.buttonText}>+ Adicionar Carregador</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[ProfileStyles.actionButton, ProfileStyles.logoutButton]} 
            onPress={logout}
          >
            <Text style={ProfileStyles.buttonText}>Sair da Conta</Text>
          </TouchableOpacity>
        </>
      ) : (
        // VISÃO: Convidado (Guest) - Bloqueio de funcionalidade
        <>
          <Text style={ProfileStyles.placeholderText}>Acede à tua conta para gerir carregadores</Text>
          
          <TouchableOpacity 
            style={ProfileStyles.authButton} 
            onPress={() => navigation.navigate('Auth')}
          >
            <Text style={ProfileStyles.buttonText}>Registar / Login</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

export default ProfileScreen;