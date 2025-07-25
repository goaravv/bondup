import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User, UserProgress } from '../types';

interface AppContextType {
  user: User | null;
  setUser: (user: User) => void;
  progress: UserProgress;
  setProgress: (progress: UserProgress) => void;
  isOnboarded: boolean;
  setIsOnboarded: (onboarded: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [progress, setProgress] = useState<UserProgress>({
    completedTasks: [],
    currentTask: 1,
    unlockedMilestones: [],
    paidUpTo: 0, // 0 = free, 10 = first paid tier, etc.
  });
  const [isOnboarded, setIsOnboarded] = useState(false);

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        progress,
        setProgress,
        isOnboarded,
        setIsOnboarded,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};