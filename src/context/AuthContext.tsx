// src/context/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { onAuthStateChanged, User, deleteUser, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { doc, setDoc, Timestamp } from 'firebase/firestore';
// Importação agora garantida pelas constantes exportadas
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
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const login = async (email: string, pass: string) => {
    await signInWithEmailAndPassword(auth, email, pass);
  };

  const register = async (email: string, pass: string, nome: string) => {
    let userCredential;
    try {
      userCredential = await createUserWithEmailAndPassword(auth, email, pass);
      const newUser = userCredential.user;

      // Escrita atómica no Firestore para evitar utilizadores sem perfil
      await setDoc(doc(db, "users", newUser.uid), {
        nome: nome,
        email: email,
        telefone: "",
        rating_medio: 0,
        data_registo: Timestamp.now(),
        is_verified: false,
        fcm_token: ""
      });
    } catch (error) {
      // Rollback preventivo
      if (userCredential?.user) {
        await deleteUser(userCredential.user);
      }
      throw error;
    }
  };

  const logout = async () => {
    await signOut(auth);
  };

return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);