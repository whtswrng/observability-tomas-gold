import { Alert, Box, Button, Container, TextField, Typography } from "@mui/material";
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/auth-provider";
import { getOrgRoute } from "../../router";
import { UnauthorizedError } from "../../actions/login";

const Login: React.FC = () => {
  const usernameRef = useRef<HTMLInputElement>();
  const passwordRef = useRef<HTMLInputElement>();
  const [error, setError] = useState<string | null>(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);

    const username = usernameRef?.current?.value;
    const password = passwordRef?.current?.value;

    if (!username || !password) {
      return setError("Both fields are required");
    }

    try {
      const u = await login(username, password);
      navigate(getOrgRoute(u.orgId));
    } catch (e) {
      if (e instanceof UnauthorizedError) return setError("Wrong credentials.");
      setError((e as Error)?.message ?? "Something went wrong.");
    }
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            mt: 8,
            p: 3,
            borderRadius: 1,
            boxShadow: 3,
          }}
        >
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <Box component="form" onSubmit={handleLogin} noValidate sx={{ mt: 1 }}>
            <TextField
              inputRef={usernameRef}
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
            />
            <TextField
              inputRef={passwordRef}
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            {error && (
              <Alert severity="error" sx={{ mt: 2 }}>
                {error}
              </Alert>
            )}
            <Button type="submit" fullWidth variant="contained" color="primary" sx={{ mt: 3, mb: 2 }}>
              Login
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Login;
