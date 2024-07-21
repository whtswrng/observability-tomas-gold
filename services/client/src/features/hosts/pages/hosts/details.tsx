import { useParams } from "react-router-dom";
import { Layout } from "../../../../components/layout";
import TimeWindow from "../../../../components/time-window";
import { Box, Card, Container, Grid, LinearProgress, Skeleton, Typography } from "@mui/material";
import { HostProvider, useHost } from "../../contexts/host-provider";
import { useTimeWindow } from "../../../../contexts/time-window-provider";
import { IconWithTooltip } from "../../../../components/tooltip";
import TimeSeries from "../../../../components/time-series";
import { CpuLoadEventsTable } from "./widgets/cpu-load-event-table";

export enum CpuState {
  Recovered = "RECOVERED",
  HeavyLoad = "HEAVY_LOAD",
}

const HostDetails = () => {
  const { hostId } = useParams();
  const { startTime } = useTimeWindow();

  return (
    <Layout title={"Host Details"}>
      <TimeWindow />
      {hostId && startTime ? <Details /> : <Typography sx={{ mt: 2 }}>Select a time window</Typography>}
    </Layout>
  );
};

const Details = () => {
  return (
    <HostProvider>
      <HostInfo />
      <Container sx={{ m: 0, mt: 4, padding: "0 !important" }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4}>
            <CpuLoadBigNumber />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <CpuHeavyLoadOccurences />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <CpuRecoveryLoadOccurences />
          </Grid>
          <Grid item xs={8} sm={8} md={8} sx={{ minWidth: 750 }}>
            <CpuLoadTimeSeries />
          </Grid>
          <Grid item xs={8} sm={8} md={8}>
            <HostEvents />
          </Grid>
        </Grid>
      </Container>
    </HostProvider>
  );
};

const HostInfo = () => {
  const { hostName } = useHost();

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h6">{hostName}</Typography>
    </Box>
  );
};

interface WidgetProps {
  isLoading: boolean;
  hasData: boolean;
  title: string;
  description: string;
  children: any;
}

const Widget = ({ isLoading, hasData, title, description, children }: WidgetProps) => {
  return (
    <Card>
      <Box>
        <Box>{isLoading ? <LinearProgress /> : null}</Box>
        <Box style={{ padding: 10, paddingTop: 1 }}>
          <Box style={{ marginTop: 5, display: "flex", justifyContent: "space-between" }}>
            <Typography variant="h6">{title}</Typography>
            <IconWithTooltip description={description} />
          </Box>
          {isLoading && !hasData ? <Skeleton variant="rectangular" height={60} /> : children}
        </Box>
      </Box>
    </Card>
  );
};

const BigNumber = ({ children }) => {
  return (
    <Box>
      <Typography fontSize={40}>{children}</Typography>
    </Box>
  );
};

const CpuLoadBigNumber = () => {
  const { cpuLoadMetrics, isLoading } = useHost();

  return (
    <Widget
      isLoading={isLoading}
      hasData={!!cpuLoadMetrics}
      title={"CPU load"}
      description="Average CPU load during the time window"
    >
      <BigNumber>{cpuLoadMetrics?.avg}</BigNumber>
    </Widget>
  );
};

const CpuLoadTimeSeries = () => {
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

const HostEvents = () => {
  const { cpuLoadEvents, isLoading } = useHost();

  if (!cpuLoadEvents) return;

  return (
    <Widget
      isLoading={isLoading}
      hasData={!!cpuLoadEvents}
      title={"Events"}
      description="List of events such as outages, cpu or memory issues"
    >
      <CpuLoadEventsTable data={cpuLoadEvents.events} />
    </Widget>
  );
};

const CpuHeavyLoadOccurences = () => {
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

const CpuRecoveryLoadOccurences = () => {
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

// const BigNumber: React.FC = () => {
//   return (
//     <Box sx={{ padding: 2, border: "1px solid gray", borderRadius: 1 }}>
//       <Typography variant="h4">12345</Typography>
//       <Typography variant="body2">Big Number Component</Typography>
//     </Box>
//   );
// };

export default HostDetails;
