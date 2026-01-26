// src/services/ChargerService.ts
import { addDoc, collection, updateDoc, Timestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../config/firebaseConfig';

export interface ChargerFormData {
  morada: string;
  potencia_kw: string;
  preco_kwh: string;
  tipo_tomada: string;
  location_type: "Indoor" | "Outdoor";
  connection_type: "Socket" | "Tethered";
  access_info: string;
  owner_uid: string;
  imageUri?: string;
  manualLat?: number;
  manualLng?: number;
}

export const fetchAddressSuggestions = async (query: string) => {
  if (query.length < 5) return [];
  try {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query + ', Portugal')}&limit=5`;
    const response = await fetch(url, { 
      headers: { 'User-Agent': 'Aktie-Production-v1' } 
    });
    const data = await response.json();
    return data.map((item: any) => ({
      label: item.display_name,
      lat: parseFloat(item.lat),
      lng: parseFloat(item.lon),
    }));
  } catch (error) {
    console.error("Geocoding failed:", error);
    return [];
  }
};

export const createCharger = async (data: ChargerFormData) => {
  try {
    const potencia = parseFloat(String(data.potencia_kw).replace(',', '.'));
    const preco = parseFloat(String(data.preco_kwh).replace(',', '.'));

    const docRef = await addDoc(collection(db, "chargers"), {
      morada: data.morada,
      potencia_kw: potencia,
      preco_kwh: preco,
      tipo_tomada: data.tipo_tomada,
      location_type: data.location_type,
      connection_type: data.connection_type,
      access_info: data.access_info,
      owner_uid: data.owner_uid,
      is_active: true,
      rating_medio: 0,
      num_reviews: 0,
      created_at: Timestamp.now(),
      localizacao: {
        latitude: data.manualLat || 38.7369,
        longitude: data.manualLng || -9.1427
      }
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error("Firestore Error:", error);
    return { success: false, error };
  }
};