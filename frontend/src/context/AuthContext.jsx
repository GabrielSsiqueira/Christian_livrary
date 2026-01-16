import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('auth');

    if (stored) {
      const parsed = JSON.parse(stored);
      setUser(parsed.user);
    }

    setLoading(false);
  }, []);

  const signIn = (data) => {
    localStorage.setItem('auth', JSON.stringify(data));
    localStorage.setItem('token', data.token); // IMPORTANTE
    setUser(data.user);
  };

  const signOut = () => {
    localStorage.removeItem('auth');
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signOut, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth deve ser usado dentro de AuthProvider');
  }

  return context;
}
