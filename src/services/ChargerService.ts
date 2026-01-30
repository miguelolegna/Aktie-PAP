// src/services/ChargerService.ts
import { addDoc, collection, Timestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../config/firebaseConfig';
import * as Location from 'expo-location'; 

export interface ChargerFormData {
  morada: string;
  potencia_kw: string;
  preco_kwh: string;
  tipo_tomada: string;
  location_type: "Indoor" | "Outdoor";
  connection_type: "Socket" | "Tethered";
  access_info: string;
  owner_uid: string;
  imageUri?: string; // URI da imagem temporária do telemóvel
  manualLat?: number;
  manualLng?: number;
}

/**
 * Faz o upload da imagem para o Firebase Storage [cite: 8]
 */
const uploadChargerImage = async (uri: string, ownerUid: string) => {
  const response = await fetch(uri);
  const blob = await response.blob();
  const filename = `chargers/${ownerUid}_${Date.now()}.jpg`;
  const storageRef = ref(storage, filename);
  
  await uploadBytes(storageRef, blob);
  return await getDownloadURL(storageRef);
};

export const fetchAddressSuggestions = async (query: string) => {
  if (query.length < 5) return [];
  try {
    const baseUrl = "https://nominatim.openstreetmap.org/search";
    const params = new URLSearchParams({
      q: query, format: "json", countrycodes: "pt", addressdetails: "1", limit: "5"
    });
    const response = await fetch(`${baseUrl}?${params.toString()}`, { 
      headers: { 'User-Agent': 'Aktie-Production-v1' } 
    });
    const data = await response.json();
    return data.map((item: any) => ({
      label: item.display_name, lat: parseFloat(item.lat), lng: parseFloat(item.lon),
    }));
  } catch (error) {
    return [];
  }
};

export const getAddressFromCoords = async (latitude: number, longitude: number) => {
  try {
    const reverse = await Location.reverseGeocodeAsync({ latitude, longitude });
    if (reverse.length > 0) {
      const addr = reverse[0];
      return `${addr.street || addr.name || ""}${addr.streetNumber ? ` ${addr.streetNumber}` : ""}${addr.city ? `, ${addr.city}` : ""}`.trim();
    }
    return "Morada selecionada";
  } catch (error) {
    return "Coordenadas manuais";
  }
};

export const createCharger = async (data: ChargerFormData) => {
  try {
    let firebaseUrl = "";
    
    // Se existir imagem, faz o upload primeiro [cite: 8, 61]
    if (data.imageUri) {
      firebaseUrl = await uploadChargerImage(data.imageUri, data.owner_uid);
    }

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
      image_url: firebaseUrl, // Guarda o link final da imagem 
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
    console.error("Erro Firestore:", error);
    return { success: false, error };
  }
};