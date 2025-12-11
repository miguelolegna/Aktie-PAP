import * as admin from 'firebase-admin';
import { createRequire } from 'module'; // Necessário para ler JSON em ESM

// Criação de um 'require' compatível com ESM
const require = createRequire(import.meta.url);
const serviceAccount = require('./serviceAccountKey.json');

// Inicialização
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

interface UserData {
  nome: string;
  email: string;
  telefone: string;
  rating_medio: number;
  fcm_token: string;
  data_registo: admin.firestore.Timestamp;
  is_verified: boolean;
}

async function seedDatabase() {
  console.log("--- A INICIAR POVOAMENTO (FIXED ESM) ---");

  try {
    // 1. CRIAR UTILIZADOR
    const userId = "user_ts_demo";
    const userData: UserData = {
      nome: "Tiago Typescript",
      email: "tiago@ts.com",
      telefone: "+351919999999",
      rating_medio: 5.0,
      fcm_token: "",
      data_registo: admin.firestore.Timestamp.now(),
      is_verified: true
    };

    // set() com merge: true evita apagar campos se o doc já existir
    await db.collection('users').doc(userId).set(userData, { merge: true });
    console.log(`[OK] User criado/atualizado: ${userId}`);

    // 2. CRIAR CARREGADOR
    const chargerData = {
      owner_uid: userId,
      localizacao: new admin.firestore.GeoPoint(38.7369, -9.1427),
      morada: "Praça do Duque de Saldanha",
      preco_kwh: 0.22,
      potencia_kw: 22,
      tipo_tomada: "Type 2",
      is_active: true,
      rating_medio: 4.5,
      num_reviews: 0
    };

    const chargerRef = await db.collection('chargers').add(chargerData);
    console.log(`[OK] Carregador criado: ${chargerRef.id}`);

    // 3. CRIAR REVIEW
    await chargerRef.collection('reviews').add({
      author_uid: "user_random_007",
      author_name: "Visitante TS",
      booking_id: "book_xyz",
      rating: 4,
      comentario: "Funciona bem com TS!",
      timestamp: admin.firestore.Timestamp.now()
    });
    console.log(`[OK] Review criada.`);

  } catch (error) {
    console.error("ERRO CRÍTICO:", error);
  }
}

seedDatabase();