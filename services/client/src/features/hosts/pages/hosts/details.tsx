import { useParams } from "react-router-dom";
import { Layout } from "../../../../components/layout";
import TimeWindow from "../../../../components/time-window";
import { Box, Container, Grid, LinearProgress, Skeleton, Typography } from "@mui/material";
import { HostProvider } from "../../contexts/host-provider";
import { useTimeWindow } from "../../../../contexts/time-window-provider";

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
      <Container sx={{ m: 0, mt: 4, padding: "0 !important" }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4}>
            {/* <Timeseries /> */}
            <Widget isLoading={true} data={undefined} render={(data) => <div>Hello data!</div>} />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <BigNumber />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Timeseries />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <BigNumber />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Timeseries />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <BigNumber />
          </Grid>
        </Grid>
      </Container>
    </HostProvider>
  );
};

interface WidgetProps<T> {
  isLoading: boolean;
  data: T | undefined;
  render: any;
}

const Widget = <T,>({ isLoading, data, render }: WidgetProps<T>) => {
  return (
    <Box sx={{ padding: 2, border: "1px solid gray", borderRadius: 1 }}>
      {!data ? <Skeleton variant="rectangular" height={60} /> : <div>{isLoading ? <LinearProgress /> : render(data)}</div>}
    </Box>
  );
};

const Timeseries: React.FC = () => {
  return (
    <Box sx={{ padding: 2, border: "1px solid gray", borderRadius: 1 }}>
      <Typography variant="h6">Timeseries Component</Typography>
      {/* Placeholder for timeseries chart */}
      <Box sx={{ height: 100, backgroundColor: "#f0f0f0" }} />
    </Box>
  );
};

const BigNumber: React.FC = () => {
  return (
    <Box sx={{ padding: 2, border: "1px solid gray", borderRadius: 1 }}>
      <Typography variant="h4">12345</Typography>
      <Typography variant="body2">Big Number Component</Typography>
    </Box>
  );
};

export default HostDetails;
