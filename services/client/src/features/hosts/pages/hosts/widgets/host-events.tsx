import { Widget } from "../../../../../components/widget";
import { useHost } from "../../../contexts/host-provider";
import { CpuLoadEventsTable } from "./cpu-load-event-table";

export const HostEvents = () => {
  const { cpuLoadEvents, isLoading, cpuEventsError } = useHost();

  return (
    <Widget
      isLoading={isLoading}
      hasData={!!cpuLoadEvents}
      error={cpuEventsError}
      title={"Events"}
      description="List of events such as outages, cpu or memory issues"
    >
      <CpuLoadEventsTable data={cpuLoadEvents?.events ?? []} />
    </Widget>
  );
};
