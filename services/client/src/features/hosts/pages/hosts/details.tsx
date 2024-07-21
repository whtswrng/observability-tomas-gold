import { Box, Container, Grid, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { Layout } from "../../../../components/layout";
import TimeWindow from "../../../../components/time-window";
import { useTimeWindow } from "../../../../contexts/time-window-provider";
import { HostProvider, useHost } from "../../contexts/host-provider";
import { CpuHeavyLoadOccurences } from "./widgets/cpu-heavy-load-occurences";
import { CpuLoadBigNumber } from "./widgets/cpu-load-big-number/cpu-load-big-number";
import { CpuLoadTimeSeries } from "./widgets/cpu-load-time-series";
import { CpuRecoveryLoadOccurences } from "./widgets/cpu-recovery-load-occurences";
import { HostEvents } from "./widgets/host-events";

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

export default HostDetails;
