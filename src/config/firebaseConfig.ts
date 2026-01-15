import { initializeApp, getApp, getApps, FirebaseApp } from 'firebase/app';
import { 
  initializeAuth, 
  getAuth, 
  Auth, 
  // @ts-ignore - Força a resolução se o TS local falhar no mapeamento
  getReactNativePersistence 
} from 'firebase/auth'; 
import { getFirestore, Firestore } from 'firebase/firestore';
import { getStorage, FirebaseStorage } from 'firebase/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID
};

// Inicialização da App
const app: FirebaseApp = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

/**
 * EXPORTAÇÕES DIRETAS (Solução para ts(2305) e ts(2459))
 * Exportar como 'const' garante visibilidade global no projeto.
 */
export const auth: Auth = getApps().length === 0 
  ? initializeAuth(app, { persistence: getReactNativePersistence(AsyncStorage) }) 
  : getAuth(app);

export const db: Firestore = getFirestore(app);
export const storage: FirebaseStorage = getStorage(app);