import React, { createContext, useState, useContext, ReactNode } from 'react';

interface TimeWindowContextProps {
  startTime: Date;
  endTime: Date;
  setStartTime: (date: Date) => void;
  setEndTime: (date: Date) => void;
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
  const [startTime, setStartTime] = useState<Date>(new Date());
  const [endTime, setEndTime] = useState<Date>(new Date());

  return (
    <TimeWindowContext.Provider value={{ startTime, endTime, setStartTime, setEndTime }}>
      {children}
    </TimeWindowContext.Provider>
  );
};
