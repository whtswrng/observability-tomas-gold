import LogoutIcon from "@mui/icons-material/Logout";
import { IconButton, Tooltip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/auth-provider";

export const NavBar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };
  return (
    <nav style={{ float: "right", padding: 10 }}>
      <Tooltip title="Logout">
        <IconButton edge="end" color="inherit" aria-label="logout" onClick={handleLogout} href="/login">
          <LogoutIcon />
        </IconButton>
      </Tooltip>
    </nav>
  );
};
