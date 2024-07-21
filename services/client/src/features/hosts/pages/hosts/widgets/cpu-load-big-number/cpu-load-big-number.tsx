import { BigNumber, Widget } from "../../../../../../components/widget";
import { useHost } from "../../../../contexts/host-provider";

export const CpuLoadBigNumber = () => {
  const { cpuLoadMetrics, isLoading, cpuMetricsError } = useHost();

  return (
    <Widget
      isLoading={isLoading}
      hasData={!!cpuLoadMetrics}
      title={"CPU load"}
      error={cpuMetricsError}
      description="Average CPU load during the time window"
    >
      <BigNumber>{cpuLoadMetrics?.avg}</BigNumber>
    </Widget>
  );
};
