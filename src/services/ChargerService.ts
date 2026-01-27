import { addDoc, collection, Timestamp } from 'firebase/firestore';
import { db } from '../config/firebaseConfig';
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
  manualLat?: number;
  manualLng?: number;
}

export const fetchAddressSuggestions = async (query: string) => {
  if (query.length < 5) return [];

  try {
    const baseUrl = "https://nominatim.openstreetmap.org/search";
    const params = new URLSearchParams({
      q: query,
      format: "json",
      countrycodes: "pt",
      addressdetails: "1",
      limit: "5"
    });

    const response = await fetch(`${baseUrl}?${params.toString()}`, { 
      headers: { 'User-Agent': 'Aktie-Production-v1' } 
    });

    const data = await response.json();

    return data.map((item: any) => ({
      label: item.display_name,
      lat: parseFloat(item.lat),
      lng: parseFloat(item.lon),
    }));
  } catch (error) {
    console.error("[Service] Autocomplete error:", error);
    return [];
  }
};

export const getAddressFromCoords = async (latitude: number, longitude: number) => {
  try {
    const reverse = await Location.reverseGeocodeAsync({ latitude, longitude });
    
    if (reverse.length > 0) {
      const addr = reverse[0];
      const street = addr.street || addr.name || "";
      const number = addr.streetNumber ? ` ${addr.streetNumber}` : "";
      const city = addr.city ? `, ${addr.city}` : "";
      
      return `${street}${number}${city}`.trim() || "Morada selecionada via Mapa";
    }
    return "Localização manual";
  } catch (error) {
    return "Coordenadas manuais";
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
    console.error("[Service] Firestore Error:", error);
    return { success: false, error };
  }
};