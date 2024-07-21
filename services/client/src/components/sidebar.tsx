import DashboardIcon from "@mui/icons-material/Dashboard";
import DeveloperBoardIcon from "@mui/icons-material/DeveloperBoard";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AlertIcon from "@mui/icons-material/Warning";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/auth-provider";
import { getHostsRoute, getOrgRoute } from "../router";
import { assertUserLoggedIn } from "../utils/assert-user-logged-in";

import { Alert, Divider } from "@mui/material";
import { Alerts } from "./alerts";

const Sidebar = ({ width }: { width: number }) => {
  const navigate = useNavigate();
  const { user } = useAuth();

  assertUserLoggedIn(user);

  return (
    <Box
      sx={{
        width,
        height: "100vh",
        borderRight: "1px solid #ddd",
        boxSizing: "border-box",
        position: "fixed",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: '#f8f8f8'
      }}
    >
      <List>
        <ListItem button onClick={() => navigate(getOrgRoute(user?.orgId))}>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button onClick={() => navigate(getHostsRoute(user?.orgId))}>
          <ListItemIcon>
            <DeveloperBoardIcon />
          </ListItemIcon>
          <ListItemText primary="Hosts" />
        </ListItem>
      </List>
      <Box sx={{ padding: 2 }}>
        <Divider />
        <Alerts/>
      </Box>
    </Box>
  );
};

export default Sidebar;
