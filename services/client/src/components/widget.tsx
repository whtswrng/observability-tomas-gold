import { Alert, Box, Card, LinearProgress, Skeleton, Typography } from "@mui/material";
import { ReactNode } from "react";
import { IconWithTooltip } from "./tooltip";

interface WidgetProps {
  isLoading: boolean;
  hasData: boolean;
  title: string;
  description: string;
  children: ReactNode;
  error?: string;
}

export const Widget = ({ isLoading, error, hasData, title, description, children }: WidgetProps) => {
  return (
    <Card>
      <Box>
        <Box>{isLoading ? <LinearProgress /> : null}</Box>
        <Box style={{ padding: 10, paddingTop: 1 }}>
          <Box style={{ marginTop: 5, display: "flex", justifyContent: "space-between" }}>
            <Typography variant="h6">{title}</Typography>
            <IconWithTooltip description={description} />
          </Box>
          {isLoading && !hasData ? <Skeleton variant="rectangular" height={60} /> : renderContent()}
        </Box>
      </Box>
    </Card>
  );

  function renderContent() {
    if (error) return <ErrorMessage />;
    return <>{children}</>;
  }
};

const ErrorMessage = () => {
  return <Alert severity="error">Something went wrong when loading a widget.</Alert>;
};

export const BigNumber = ({ children, severity = "info" }) => {
  return (
    <Box>
      <Typography fontSize={40} color={severity === "warning" ? "red" : "black"}>
        {children}
      </Typography>
    </Box>
  );
};
