import { BigNumber, Widget } from "../../../../../components/widget";
import { useHost } from "../../../contexts/host-provider";
import { CpuState } from "../details";

export const CpuHeavyLoadOccurences = () => {
  const { cpuLoadEvents, isLoading } = useHost();

  const count = cpuLoadEvents?.events?.filter((e) => e.type === CpuState.HeavyLoad).length;

  return (
    <Widget
      isLoading={isLoading}
      hasData={!!cpuLoadEvents}
      title={"CPU Heavy Load Count"}
      description="How many times was CPU under heavy load for more than 2 minutes"
    >
      <BigNumber>{count}</BigNumber>
    </Widget>
  );
};
