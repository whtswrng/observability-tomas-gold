import DashboardIcon from "@mui/icons-material/Dashboard";
import DeveloperBoardIcon from "@mui/icons-material/DeveloperBoard";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AlertIcon from "@mui/icons-material/Warning";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { NavLink, useNavigate } from "react-router-dom";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useAuth } from "../contexts/auth-provider";
import { getHostsRoute, getOrgRoute } from "../router";
import { assertUserLoggedIn } from "../utils/assert-user-logged-in";

import { Alert, Divider } from "@mui/material";
import { Alerts } from "./alerts";

const getNavigationStyle = (isActive: boolean) => {
  return {
    textDecoration: "none",
    display: "flex",
    color: "black",
    alignItems: "center",
    background: isActive ? "#dbdbdb" : "inherit",
  };
};

const NavItem = ({
  route,
  text,
  icon,
  end = false,
  disabled = false,
}: {
  route: string;
  text: string;
  icon: any;
  end?: boolean;
  disabled?: boolean;
}) => {
  const handleClick = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    if (disabled) {
      event.preventDefault();
    }
  };
  return (
    <NavLink to={route} end={end} onClick={handleClick} style={({ isActive }) => getNavigationStyle(isActive)}>
      <ListItem disabled={disabled} button>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={text} />
      </ListItem>
    </NavLink>
  );
};

const Sidebar = ({ width }: { width: number }) => {
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
        background: "#f8f8f8",
      }}
    >
      <List>
        <NavItem end={true} route={getOrgRoute(user.orgId)} text="Dashboard" icon={<DashboardIcon />} />
        <NavItem route={getHostsRoute(user.orgId)} text="Hosts" icon={<DeveloperBoardIcon />} />
        <NavItem route={""} text="DEM" icon={<AlertIcon />} disabled />
        <NavItem route={""} text="k8s" icon={<AlertIcon />} disabled />
        <NavItem route={""} text="Alerting" icon={<AlertIcon />} disabled />
      </List>
      <Box sx={{ padding: 2 }}>
        <Divider />
        <Alerts />
      </Box>
    </Box>
  );
};

export default Sidebar;
