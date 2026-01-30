// src/context/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut,
  deleteUser,
  User 
} from 'firebase/auth';
import { doc, setDoc, Timestamp } from 'firebase/firestore';
import { auth, db } from '../config/firebaseConfig';

interface AuthContextData {
  user: User | null;
  loading: boolean;
  login: (email: string, pass: string) => Promise<void>;
  register: (email: string, pass: string, nome: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // FAILSAFE: Garante que o estado de loading termina mesmo sem resposta do Firebase
    const timeout = setTimeout(() => {
      if (loading) {
        console.warn("[Auth] Timeout de rede atingido. Forçando entrada como convidado.");
        setLoading(false);
      }
    }, 5000);

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
      clearTimeout(timeout); // Limpa o timer se o Firebase responder a tempo
    }, (error) => {
      console.error("[Auth] Erro no observador:", error);
      setLoading(false);
      clearTimeout(timeout);
    });

    return () => {
      unsubscribe();
      clearTimeout(timeout);
    };
  }, []);

  const authHelpers = useMemo(() => ({
    login: async (email: string, pass: string) => {
      await signInWithEmailAndPassword(auth, email, pass);
    },
    register: async (email: string, pass: string, nome: string) => {
      const userCredential = await createUserWithEmailAndPassword(auth, email, pass);
      try {
        await setDoc(doc(db, "users", userCredential.user.uid), {
          nome, email, telefone: "", rating_medio: 5.0,
          data_registo: Timestamp.now(), is_verified: false, fcm_token: ""
        });
      } catch (error) {
        await deleteUser(userCredential.user);
        throw error;
      }
    },
    logout: async () => {
      await signOut(auth);
    }
  }), []);

  const value = useMemo(() => ({
    user, loading, ...authHelpers
  }), [user, loading, authHelpers]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);