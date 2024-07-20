import { CssBaseline } from "@mui/material";
import { styled } from "@mui/system";
import React, { Suspense, lazy } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { NavBar } from "./components/navbar";
import Sidebar from "./components/sidebar";
import { AuthProvider, useAuth } from "./contexts/auth-provider";
import { Home } from "./pages/home";
import { Spinner } from "./components/spinner";

const Entities = lazy(() => import("./pages/entities/entities"));
const Hosts = lazy(() => import("./pages/hosts/hosts"));
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
        <AppContent />
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
        <Suspense fallback={<Spinner/>}>
          <Routes>
            <Route path="/org/:id/" element={<Home />} />
            <Route path="/org/:id/entities" element={<Entities />} />
            <Route path="/org/:id/entities/hosts" element={<Hosts />} />
            <Route path="/org/:id/entities/hosts/:id" element={<HostDetails />} />
          </Routes>
        </Suspense>
      </Content>
    </Root>
  );
};

export default App;
