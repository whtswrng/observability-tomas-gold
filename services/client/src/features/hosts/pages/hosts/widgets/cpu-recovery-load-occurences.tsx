import { BigNumber, Widget } from "../../../../../components/widget";
import { useHost } from "../../../contexts/host-provider";
import { CpuState } from "../details";

export const CpuRecoveryLoadOccurences = () => {
  const { cpuLoadEvents, isLoading } = useHost();

  const count = cpuLoadEvents?.events?.filter((e) => e.type === CpuState.Recovered).length;

  return (
    <Widget
      isLoading={isLoading}
      hasData={!!cpuLoadEvents}
      title={"CPU Recovery Load Count"}
      description="How many times CPU recovered from heavy load for more than 2 minutes"
    >
      <BigNumber>{count}</BigNumber>
    </Widget>
  );
};
