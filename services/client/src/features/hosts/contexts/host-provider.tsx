import React, { createContext, useState, useEffect, useContext } from "react";
import { CpuLoadMetric, useGetCpuLoadMetrics } from "../queries/metrics";
import { useParams } from "react-router-dom";
import { useTimeWindow } from "../../../contexts/time-window-provider";

interface IAuthContext {
  cpuLoadMetrics: Array<CpuLoadMetric> | undefined;
  isLoading: boolean;
}

const HostContext = createContext<IAuthContext>({} as any);

export const useHosts = () => useContext(HostContext);

export const HostProvider = ({ children }) => {
  const { hostId } = useParams();
  const { startTime } = useTimeWindow();

  const { isLoading, data: cpuLoadMetrics, refetch: refetchCpuMetrics } = useGetCpuLoadMetrics(hostId!, startTime);

  useEffect(() => {
    console.log("call API");
    refetchCpuMetrics();
  }, [hostId, startTime]);

  return <HostContext.Provider value={{ cpuLoadMetrics, isLoading }}>{!isLoading && children}</HostContext.Provider>;
};
