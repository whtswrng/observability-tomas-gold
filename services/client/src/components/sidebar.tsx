import DashboardIcon from "@mui/icons-material/Dashboard";
import DeveloperBoardIcon from "@mui/icons-material/DeveloperBoard";
import DevicesOtherIcon from "@mui/icons-material/DevicesOther";
import LanIcon from "@mui/icons-material/Lan";
import AlertIcon from "@mui/icons-material/Warning";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { NavLink } from "react-router-dom";
import { useAuth } from "../contexts/auth-provider";
import { getHostsRoute, getOrgRoute } from "../router";
import { assertUserLoggedIn } from "../utils/assertions";


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
        <NavItem route={""} text="DEM" icon={<DevicesOtherIcon />} disabled />
        <NavItem route={""} text="k8s" icon={<LanIcon />} disabled />
        <NavItem route={""} text="Alerting" icon={<AlertIcon />} disabled />
      </List>
    </Box>
  );
};

export default Sidebar;
