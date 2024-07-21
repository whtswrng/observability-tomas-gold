import { createContext, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useTimeWindow } from "../../../contexts/time-window-provider";
import { CpuLoadEvents, useGetCpuLoadEvents } from "../queries/cpu-load-events";
import { CpuLoadMetrics, useGetCpuLoadMetrics } from "../queries/metrics";

interface IAuthContext {
  cpuLoadMetrics: CpuLoadMetrics | undefined;
  cpuLoadEvents: CpuLoadEvents | undefined;
  isLoading: boolean;
  hostName: string;
}

const HostContext = createContext<IAuthContext>({} as any);

export const useHost = () => useContext(HostContext);

export const HostProvider = ({ children }) => {
  const { hostId } = useParams();
  const { startTime } = useTimeWindow();
  // TODO fetch this from /entities!
  const hostName = 'My Computer';

  const {
    isLoading: isCpuLoadLoading,
    data: cpuLoadMetrics,
    refetch: refetchCpuMetrics,
  } = useGetCpuLoadMetrics(hostId!, startTime);

  const {
    isLoading: isEventsLoading,
    data: cpuLoadEvents,
    refetch: refetchEvents,
  } = useGetCpuLoadEvents(hostId!, startTime);

  useEffect(() => {
    refetchEvents();
    refetchCpuMetrics();
  }, [hostId, startTime]);

  return (
    <HostContext.Provider value={{ cpuLoadMetrics, hostName, cpuLoadEvents, isLoading: isCpuLoadLoading || isEventsLoading }}>
      {children}
    </HostContext.Provider>
  );
};
