import LogoutIcon from "@mui/icons-material/Logout";
import { Box, IconButton, Stack, Tooltip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/auth-provider";
import { AlertBudge } from "./alerts/alert-budge";

export const NavBar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <Box sx={{ bgcolor: "background.paper", p: 2, float: "right" }}>
      <Stack direction="row" spacing={2}>
        <AlertBudge />
        <Tooltip title="Logout">
          <IconButton edge="end" color="inherit" aria-label="logout" onClick={handleLogout} href="/login">
            <LogoutIcon />
          </IconButton>
        </Tooltip>
      </Stack>
    </Box>
  );
};
