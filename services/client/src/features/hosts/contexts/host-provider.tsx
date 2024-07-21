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
  cpuMetricsError?: string;
  cpuEventsError?: string;
}

const HostContext = createContext<IAuthContext>({} as any);

export const useHost = () => useContext(HostContext);

// In production code we would want to probably switch to https://tanstack.com/query/latest/docs/framework/react/guides/query-options and remove this provider
export const HostProvider = ({ children }) => {
  const { hostId } = useParams();
  const { startTime } = useTimeWindow();
  const hostName = "My Computer";

  const {
    isLoading: isCpuLoadLoading,
    data: cpuLoadMetrics,
    refetch: refetchCpuMetrics,
    error: metricsError,
  } = useGetCpuLoadMetrics(hostId!, startTime);

  const {
    isLoading: isEventsLoading,
    data: cpuLoadEvents,
    refetch: refetchEvents,
    error: eventsError,
  } = useGetCpuLoadEvents(hostId!, startTime);

  useEffect(() => {
    refetchEvents();
    refetchCpuMetrics();
  }, [hostId, startTime]);

  return (
    <HostContext.Provider
      value={{
        cpuLoadMetrics,
        hostName,
        cpuLoadEvents,
        isLoading: isCpuLoadLoading || isEventsLoading,
        cpuEventsError: eventsError,
        cpuMetricsError: metricsError
      }}
    >
      {children}
    </HostContext.Provider>
  );
};
