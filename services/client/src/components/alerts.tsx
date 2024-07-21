import AlertIcon from "@mui/icons-material/Warning";
import { Alert, List, ListItem, ListItemIcon, Tooltip } from "@mui/material";
import ListItemText from "@mui/material/ListItemText";
import { useGetAlerts } from "../queries/alerts";
import { useEffect } from "react";
import { Notification } from "../queries/alerts";

const FETCH_ALERTS_INTERVAL_IN_MS = 5000;

export const Alerts = () => {
  const { data, refetch } = useGetAlerts();

  useEffect(() => {
    const interval = setInterval(() => {
      console.log("fetching new data!");
      refetch();
    }, FETCH_ALERTS_INTERVAL_IN_MS);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <List>
      <ListItem>
        <ListItemIcon>
          <AlertIcon sx={{ color: "#f85d5d" }} />
        </ListItemIcon>
        <ListItemText primary="Alerts" />
      </ListItem>
      <List>
        {data?.notifications.map((n) => (
          <ListItem>
            <Alert severity={getSeverity(n.type)}>
              <Tooltip title={n.timestamp}>
                <span>{n.message}</span>
              </Tooltip>
            </Alert>
          </ListItem>
        ))}
        {!data || data.notifications?.length === 0 ? (
          <ListItem>
            <Alert severity="info">All systems are stable.</Alert>
          </ListItem>
        ) : (
          <span></span>
        )}
      </List>
    </List>
  );

  function getSeverity(type: Notification["type"]) {
    if (type === "recovery") return "success";
    return "error";
  }
};
