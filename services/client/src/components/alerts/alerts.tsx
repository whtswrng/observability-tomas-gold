import { Alert, List, ListItem, Tooltip } from "@mui/material";
import { Notification } from "../../queries/alerts";

export const Alerts = ({ data }) => {
  return (
    <List>
      {data?.notifications.map((n) => (
        <ListItem key={n.message}>
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
  );

  function getSeverity(type: Notification["type"]) {
    if (type === "recovery") return "success";
    return "error";
  }
};
