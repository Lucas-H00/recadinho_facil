import { createContext, useContext, type ReactNode } from 'react';
import type { Student, DailyStatus } from '../types';
import { useLocalStorage } from '../hooks/useLocalStorage';

interface AppContextType {
  students: Student[];
  setStudents: (value: Student[] | ((prev: Student[]) => Student[])) => void;
  dailyStatuses: DailyStatus[];
  setDailyStatuses: (value: DailyStatus[] | ((prev: DailyStatus[]) => DailyStatus[])) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [students, setStudents] = useLocalStorage<Student[]>('recadinho_students', []);
  const [dailyStatuses, setDailyStatuses] = useLocalStorage<DailyStatus[]>('recadinho_daily', []);

  return (
    <AppContext.Provider value={{ students, setStudents, dailyStatuses, setDailyStatuses }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext(): AppContextType {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}
