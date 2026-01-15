// src/utils/maintenance.ts
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import { db } from '../config/firebaseConfig';

export const updateChargersSchema = async () => {
  console.log("Iniciando atualização do Schema...");
  try {
    const querySnapshot = await getDocs(collection(db, "chargers"));
    let updatedCount = 0;

    // Mapeamos todas as atualizações em Promises
    const updates = querySnapshot.docs.map(async (document) => {
      const data = document.data();
      
      // Verifica se falta o campo novo e atualiza
      if (!data.location_type) {
        const docRef = doc(db, "chargers", document.id);
        
        await updateDoc(docRef, {
          location_type: "Outdoor",        // Default
          connection_type: "Socket",       // Default
          access_info: "Acesso público. Ver detalhes na app.",
          updated_at: new Date()
        });
        updatedCount++;
      }
    });

    await Promise.all(updates);
    console.log(`SUCESSO: ${updatedCount} carregadores atualizados.`);
    return updatedCount;
  } catch (error) {
    console.error("ERRO na manutenção:", error);
    throw error;
  }
};