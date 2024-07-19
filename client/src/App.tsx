import React, { Suspense, lazy, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { styled } from "@mui/system";
// import Login from './pages/Login';
// import Register from './pages/Register';
import { AuthProvider, useAuth } from "./contexts/auth-provider";
// import { Login } from './pages/login/login';
import { NavBar } from "./components/navbar";
import { CssBaseline } from "@mui/material";
import Sidebar from "./components/sidebar";

const Entities = lazy(() => import("./pages/entities/entities"));
const Login = lazy(() => import("./pages/login/login"));
const HostDetails = lazy(() => import("./pages/hosts/details"));

const Root = styled("div")(({ theme }) => ({
  display: "flex",
}));

const Content = styled("main")(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
}));

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent/>
      </AuthProvider>
    </Router>
  );
}

const AppContent: React.FC = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Login />;
  }

  return (
    <Root>
      <CssBaseline />
      <Sidebar />
      <Content>
        <NavBar />
        <div style={{ minHeight: 64 }} /> {/* Toolbar placeholder */}
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            {/* <Route path="/register" element={<Register />} /> */}
            <Route path="/entities" element={<Entities />} />
            <Route path="/entities/hosts/:id" element={<HostDetails />} />
          </Routes>
        </Suspense>
      </Content>
    </Root>
  );
};

export default App;
