import { addMinutes } from "date-fns";
import React, { createContext, useState, useContext, ReactNode, useMemo } from "react";

interface TimeWindowContextProps {
  startTime: number;
  labelInMinutes: string;
  setLabelInMinutes: (raw: string) => void;
}

const TimeWindowContext = createContext<TimeWindowContextProps | undefined>(undefined);

export const useTimeWindow = (): TimeWindowContextProps => {
  const context = useContext(TimeWindowContext);
  if (!context) {
    throw new Error("useTimeWindow must be used within a TimeWindowProvider");
  }
  return context;
};

interface TimeWindowProviderProps {
  children: ReactNode;
}

export const TimeWindowProvider: React.FC<TimeWindowProviderProps> = ({ children }) => {
  const [labelInMinutes, setLabelInMinutes] = useState<string>("10");
  const [startTime, setStartTime] = useState(getStartTime(labelInMinutes));

  function getStartTime(fromString: string) {
    const now = new Date();
    const newStartTime = addMinutes(now, -parseInt(fromString)).getTime();
    return newStartTime;
  }

  function setLabel(newString: string) {
    setLabelInMinutes(newString);
    setStartTime(getStartTime(newString))
  }

  return (
    <TimeWindowContext.Provider value={{ startTime, labelInMinutes, setLabelInMinutes: setLabel }}>
      {children}
    </TimeWindowContext.Provider>
  );
};
