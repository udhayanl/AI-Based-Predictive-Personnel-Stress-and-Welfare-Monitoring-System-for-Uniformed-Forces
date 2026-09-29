import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '../types';
import { authApi } from '../api';

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (userId: string, password?: string) => Promise<boolean>;
  logout: () => void;
  switchDemoRole: (role: UserRole) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const initAuth = async () => {
      const storedToken = localStorage.getItem('crpf_welfare_token');
      const storedUser = localStorage.getItem('crpf_welfare_user');

      if (storedToken && storedUser) {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
        try {
          const res = await authApi.getCurrentUser();
          if (res.data?.success) {
            setUser(res.data.data.user);
            localStorage.setItem('crpf_welfare_user', JSON.stringify(res.data.data.user));
          }
        } catch {
          // Token might have expired, keep local state or reset if error
        }
      }
      setIsLoading(false);
    };

    initAuth();
  }, []);

  const login = async (userId: string, password = 'password123'): Promise<boolean> => {
    setIsLoading(true);
    try {
      const res = await authApi.login({ userId, password });
      if (res.data?.success) {
        const { token: newToken, user: newUser } = res.data.data;
        setToken(newToken);
        setUser(newUser);
        localStorage.setItem('crpf_welfare_token', newToken);
        localStorage.setItem('crpf_welfare_user', JSON.stringify(newUser));
        setIsLoading(false);
        return true;
      }
      setIsLoading(false);
      return false;
    } catch (err) {
      setIsLoading(false);
      return false;
    }
  };

  const logout = () => {
    authApi.logout().catch(() => {});
    setUser(null);
    setToken(null);
    localStorage.removeItem('crpf_welfare_token');
    localStorage.removeItem('crpf_welfare_user');
  };

  const switchDemoRole = async (role: UserRole) => {
    const roleMap: Record<UserRole, string> = {
      personnel: 'PF-1024',
      welfare_officer: 'WO-2001',
      commander: 'CMD-3001',
      admin: 'ADM-4001',
    };
    await login(roleMap[role], 'password123');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!token && !!user,
        isLoading,
        login,
        logout,
        switchDemoRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
