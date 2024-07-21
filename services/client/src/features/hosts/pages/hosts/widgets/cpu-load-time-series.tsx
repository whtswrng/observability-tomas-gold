import TimeSeries from "../../../../../components/time-series";
import { Widget } from "../../../../../components/widget";
import { useHost } from "../../../contexts/host-provider";

export const CpuLoadTimeSeries = () => {
  const { cpuLoadMetrics, isLoading } = useHost();

  const data = cpuLoadMetrics?.metrics.map((m) => ({
    timestamp: m.timestamp,
    value: m.load,
  }));

  return (
    <Widget
      isLoading={isLoading}
      hasData={!!cpuLoadMetrics}
      title={"CPU Load Over Time"}
      description="Average CPU load during the time window over time"
    >
      <TimeSeries data={data} label="CPU Load" />
    </Widget>
  );
};