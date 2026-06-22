import { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthResult {
  success: boolean;
  error?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthModalOpen: boolean;
  login: (email: string, password: string, rememberMe?: boolean) => Promise<AuthResult>;
  register: (data: { full_name: string; phone: string; email: string; password: string }) => Promise<AuthResult>;
  logout: () => void;
  openAuthModal: () => void;
  closeAuthModal: () => void;
  requestPasswordReset: (email: string) => Promise<AuthResult>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const login = async (email: string, _password: string, _rememberMe?: boolean): Promise<AuthResult> => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setUser({ id: '1', email, name: email.split('@')[0] });
    setIsLoading(false);
    return { success: true };
  };

  const register = async (data: { full_name: string; phone: string; email: string; password: string }): Promise<AuthResult> => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setUser({ id: '1', email: data.email, name: data.full_name });
    setIsLoading(false);
    return { success: true };
  };

  const logout = () => {
    setUser(null);
  };

  const openAuthModal = () => setIsAuthModalOpen(true);
  const closeAuthModal = () => setIsAuthModalOpen(false);

  const requestPasswordReset = async (_email: string): Promise<AuthResult> => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
    return { success: true };
  };

  return (
    <AuthContext.Provider value={{
      user,
      isLoading,
      isAuthModalOpen,
      login,
      register,
      logout,
      openAuthModal,
      closeAuthModal,
      requestPasswordReset,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
