import React, { createContext, useState, useEffect, useContext } from 'react';
import { onAuthStateChanged, User, signOut as firebaseSignOut } from 'firebase/auth';
// Nota: getAuth já deve estar exportado do teu firebaseConfig ou importado diretamente
import { getAuth } from 'firebase/auth'; 
import { app } from '../config/firebaseConfig'; // Ajusta se necessário

// Inicializa Auth
const auth = getAuth(app);

interface AuthContextData {
  user: User | null;
  loading: boolean;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Ouve alterações no estado de autenticação (Login/Logout/Recarga)
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return unsubscribe; // Limpa o ouvinte quando o componente desmonta
  }, []);

  const logout = async () => {
    await firebaseSignOut(auth);
  };

  return (
    <AuthContext.Provider value={{ user, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado para usar o contexto facilmente
export const useAuth = () => useContext(AuthContext);
export { auth }; // Exporta o auth para usar nos ecrãs de login/registo