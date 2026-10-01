import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, UserRole } from '../types';
import { DEMO_USERS } from '../data/mockData';

interface AuthContextType {
  currentUser: UserProfile | null;
  currentRole: UserRole | null;
  isAuthenticated: boolean;
  login: (email: string, role: UserRole) => boolean;
  register: (name: string, email: string, role: UserRole, organization?: string, district?: string) => boolean;
  logout: () => void;
  switchDemoRole: (role: UserRole | null) => void;
  updateProfile: (data: Partial<UserProfile>) => void;
  isAuthModalOpen: boolean;
  openAuthModal: (initialRole?: UserRole) => void;
  closeAuthModal: () => void;
  authModalRole: UserRole;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem('kaushal_setu_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalRole, setAuthModalRole] = useState<UserRole>('student');

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('kaushal_setu_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('kaushal_setu_user');
    }
  }, [currentUser]);

  const login = (email: string, role: UserRole): boolean => {
    // If matching a demo user email or role, load appropriate demo user or create custom
    const demo = DEMO_USERS[role];
    const userToSet: UserProfile = {
      ...demo,
      email: email || demo.email,
      role: role,
    };
    setCurrentUser(userToSet);
    setIsAuthModalOpen(false);
    return true;
  };

  const register = (
    name: string,
    email: string,
    role: UserRole,
    organization?: string,
    district: string = 'Pune'
  ): boolean => {
    const demo = DEMO_USERS[role];
    const newUser: UserProfile = {
      ...demo,
      id: `usr_${Date.now()}`,
      name: name || demo.name,
      email: email,
      role: role,
      organization: organization || demo.organization,
      district: district || demo.district,
    };
    setCurrentUser(newUser);
    setIsAuthModalOpen(false);
    return true;
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const switchDemoRole = (role: UserRole | null) => {
    if (!role) {
      setCurrentUser(null);
    } else if (DEMO_USERS[role]) {
      setCurrentUser({ ...DEMO_USERS[role] });
    }
  };

  const updateProfile = (data: Partial<UserProfile>) => {
    if (!currentUser) return;
    setCurrentUser({
      ...currentUser,
      ...data,
    });
  };

  const openAuthModal = (initialRole: UserRole = 'student') => {
    setAuthModalRole(initialRole);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        currentRole: currentUser?.role || null,
        isAuthenticated: !!currentUser,
        login,
        register,
        logout,
        switchDemoRole,
        updateProfile,
        isAuthModalOpen,
        openAuthModal,
        closeAuthModal,
        authModalRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
