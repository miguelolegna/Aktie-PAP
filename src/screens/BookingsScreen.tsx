import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, SafeAreaView } from 'react-native';
import { collection, query, where, onSnapshot, orderBy } from 'firebase/firestore';
import { db } from '../config/firebaseConfig';
import { useAuth } from '../context/AuthContext';
import { BookingsStyles as styles } from '../styles/Screens/BookingsStyles';
import { Colors } from '../styles/GlobalStyles';
import { Ionicons } from '@expo/vector-icons';

const BookingsScreen = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [bookings, setBookings] = useState<any[]>([]);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    // Query: Reservas onde o utilizador é o cliente, ordenadas por data
    const q = query(
      collection(db, "bookings"),
      where("user_uid", "==", user.uid),
      orderBy("created_at", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setBookings(data);
      setLoading(false);
    }, (error) => {
      console.error("Erro Bookings:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  const renderItem = ({ item }: any) => {
    const isActive = item.status === 'active';
    
    return (
      <View style={[styles.bookingCard, isActive ? styles.activeBorder : styles.finishedBorder]}>
        <View style={styles.headerRow}>
          <Text style={styles.address} numberOfLines={1}>{item.charger_address}</Text>
          <View style={[styles.statusBadge, { backgroundColor: isActive ? Colors.primaryLight : '#333' }]}>
            <Text style={[styles.statusText, { color: isActive ? Colors.primary : Colors.gray }]}>
              {isActive ? "ATIVA" : "CONCLUÍDA"}
            </Text>
          </View>
        </View>

        <View style={styles.detailsRow}>
          <Ionicons name="time-outline" size={16} color={Colors.gray} />
          <Text style={styles.detailsText}>
            {item.date} • {item.duration} min
          </Text>
        </View>

        <View style={styles.detailsRow}>
          <Ionicons name="flash-outline" size={16} color={Colors.gray} />
          <Text style={styles.detailsText}>
            Consumo estimado: {item.estimated_kwh} kWh
          </Text>
        </View>
      </View>
    );
  };

  if (loading) return <View style={styles.container}><ActivityIndicator color={Colors.primary} /></View>;

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>As Minhas Reservas</Text>
      
      <FlatList
        data={bookings}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="calendar-outline" size={60} color={Colors.gray} />
            <Text style={styles.emptyText}>Ainda não tens reservas.</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};

export default BookingsScreen;