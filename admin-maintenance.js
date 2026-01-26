// admin-maintenance.js
const admin = require('firebase-admin');

// 1. Precisas de descarregar este ficheiro da Consola do Firebase
// (Project Settings -> Service Accounts -> Generate New Private Key)
const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

async function updateAllChargers() {
  console.log("--- Iniciando Pintura Geral (Manutenção) ---");
  
  try {
    const chargersRef = db.collection('chargers');
    const snapshot = await chargersRef.get();

    if (snapshot.empty) {
      console.log("Nenhum carregador encontrado.");
      return;
    }

    let count = 0;
    const batch = db.batch(); // Usamos Batch para ser mais rápido e seguro

    snapshot.forEach(doc => {
      const data = doc.data();
      
      // Só atualizamos se o campo não existir (para não sobrescrever dados reais)
      if (!data.location_type) {
        const docRef = chargersRef.doc(doc.id);
        batch.update(docRef, {
          location_type: "Outdoor",
          connection_type: "Socket",
          access_info: "Acesso público. Ver detalhes na app.",
          updated_at: admin.firestore.FieldValue.serverTimestamp()
        });
        count++;
      }
    });

    await batch.commit();
    console.log(`SUCESSO: ${count} carregadores atualizados globalmente.`);
  } catch (error) {
    console.error("ERRO CRÍTICO na manutenção:", error);
  }
}

updateAllChargers();