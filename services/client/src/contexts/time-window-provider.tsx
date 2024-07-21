import React, { createContext, useState, useContext, ReactNode } from 'react';

interface TimeWindowContextProps {
  startTime: number | null;
  endTime: number | null;
  setStartTime: (timestamp: number) => void;
  setEndTime: (timestamp: number) => void;
}

const TimeWindowContext = createContext<TimeWindowContextProps | undefined>(undefined);

export const useTimeWindow = (): TimeWindowContextProps => {
  const context = useContext(TimeWindowContext);
  if (!context) {
    throw new Error('useTimeWindow must be used within a TimeWindowProvider');
  }
  return context;
};

interface TimeWindowProviderProps {
  children: ReactNode;
}

export const TimeWindowProvider: React.FC<TimeWindowProviderProps> = ({ children }) => {
  const [startTime, setStartTime] = useState<number | null>(null);
  const [endTime, setEndTime] = useState<number | null>(null);

  return (
    <TimeWindowContext.Provider value={{ startTime, endTime, setStartTime, setEndTime }}>
      {children}
    </TimeWindowContext.Provider>
  );
};
