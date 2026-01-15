import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../config/firebaseConfig'; // Certifica-te que exportaste 'storage' no config

// Interface atualizada com TUDO o que pediste
export interface ChargerFormData {
  morada: string;
  potencia_kw: string;
  preco_kwh: string;
  tipo_tomada: string;
  location_type: "Indoor" | "Outdoor";
  connection_type: "Socket" | "Tethered";
  access_info: string;
  owner_uid: string;
  imageUri?: string; // Caminho temporário da foto no telemóvel
  manualLat?: number; // Se o user usar o GPS
  manualLng?: number;
}

/**
 * FUNÇÃO AUXILIAR 1: Upload de Imagem para o Firebase Storage
 */
const uploadImage = async (uri: string, chargerId: string): Promise<string | null> => {
  if (!uri) return null;
  
  try {
    const response = await fetch(uri);
    const blob = await response.blob();
    
    // Cria uma referência: chargers/ID_DO_CARREGADOR/photo.jpg
    const storageRef = ref(storage, `chargers/${chargerId}/cover_image.jpg`);
    
    await uploadBytes(storageRef, blob);
    const downloadUrl = await getDownloadURL(storageRef);
    return downloadUrl;
  } catch (error) {
    console.error("Erro no upload da imagem:", error);
    return null; // Não bloqueia a criação se a foto falhar
  }
};

/**
 * FUNÇÃO AUXILIAR 2: Geocoding (Morada -> Coordenadas)
 * Usa OpenStreetMap (Nominatim) que é grátis.
 */
const getCoordinatesFromAddress = async (address: string) => {
  try {
    // Adiciona "Portugal" para limitar a busca e evitar erros
    const query = encodeURIComponent(`${address}, Portugal`);
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${query}&limit=1`;
    
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'AktieApp/1.0' // Nominatim exige um User-Agent
      }
    });
    const data = await response.json();

    if (data && data.length > 0) {
      return {
        lat: parseFloat(data[0].lat),
        lng: parseFloat(data[0].lon),
        displayName: data[0].display_name // Nome completo oficial
      };
    }
    return null;
  } catch (error) {
    console.error("Erro no Geocoding:", error);
    return null;
  }
};

/**
 * FUNÇÃO PRINCIPAL: Criar Carregador
 */
export const createCharger = async (data: ChargerFormData) => {
  try {
    // 1. Resolver Coordenadas
    // Prioridade: GPS Manual > Geocoding da Morada > Default (Lisboa)
    let finalLat = data.manualLat || 38.7369;
    let finalLng = data.manualLng || -9.1427;
    let finalAddress = data.morada;

    // Se não temos GPS, tentamos descobrir pela morada escrita
    if (!data.manualLat) {
      const geoResult = await getCoordinatesFromAddress(data.morada);
      if (geoResult) {
        finalLat = geoResult.lat;
        finalLng = geoResult.lng;
        // Opcional: Atualizar a morada para a versão "bonita" oficial
        // finalAddress = geoResult.displayName; 
      }
    }

    // 2. Preparar dados numéricos
    const potencia = parseFloat(data.potencia_kw.replace(',', '.'));
    const preco = parseFloat(data.preco_kwh.replace(',', '.'));

    // 3. Criar documento no Firestore (Primeiro, para ter o ID)
    const docRef = await addDoc(collection(db, "chargers"), {
      morada: finalAddress,
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
      created_at: new Date(),
      
      localizacao: {
        latitude: finalLat,
        longitude: finalLng
      },
      
      photo_url: null // Placeholder, atualizamos já a seguir
    });

    // 4. Se houver imagem, fazer upload e atualizar o documento
    if (data.imageUri) {
      const imageUrl = await uploadImage(data.imageUri, docRef.id);
      if (imageUrl) {
        await updateDoc(docRef, { photo_url: imageUrl });
      }
    }

    return { success: true, id: docRef.id };

  } catch (error) {
    console.error("Erro CRÍTICO ao criar carregador:", error);
    return { success: false, error };
  }
};