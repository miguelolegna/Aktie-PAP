// src/screens/MyChargersScreen.tsx
import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, ActivityIndicator, Alert } from 'react-native';
import { collection, query, where, onSnapshot, doc, deleteDoc } from 'firebase/firestore';
import { db } from '../config/firebaseConfig';
import { useAuth } from '../context/AuthContext';
import { MyChargersStyles as styles } from '../styles/Screens/MyChargersStyles';
import ChargerListItem from '../components/ChargerListItem'; // Componente reutilizável

const MyChargersScreen = ({ navigation }: any) => {
  const { user } = useAuth();
  const [myChargers, setMyChargers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    // Filtro Lógico: Apenas postos deste utilizador
    const q = query(collection(db, "chargers"), where("owner_uid", "==", user.uid));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setMyChargers(data);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  const handleDelete = (id: string) => {
    Alert.alert("Confirmar", "Deseja remover este carregador permanentemente?", [
      { text: "Cancelar", style: "cancel" },
      { text: "Eliminar", style: "destructive", onPress: async () => {
          await deleteDoc(doc(db, "chargers", id));
      }}
    ]);
  };

  if (loading) return <ActivityIndicator style={{ flex: 1 }} color="#00BFA5" />;

  return (
    <View style={styles.container}>
      <FlatList
        data={myChargers}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <ChargerListItem 
            charger={item} 
            onDelete={() => handleDelete(item.id)}
            onEdit={() => navigation.navigate('AddCharger', { editMode: true, charger: item })}
          />
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Ainda não registou nenhum carregador.</Text>
        }
      />
    </View>
  );
};

export default MyChargersScreen;