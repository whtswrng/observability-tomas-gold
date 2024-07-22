import { CssBaseline } from "@mui/material";
import { styled } from "@mui/system";
import React, { Suspense, lazy } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import ErrorBoundary from "./components/error-boundary";
import { NavBar } from "./components/navbar";
import Sidebar from "./components/sidebar";
import { Spinner } from "./components/spinner";
import { AuthProvider, useAuth } from "./contexts/auth-provider";
import { TimeWindowProvider } from "./contexts/time-window-provider";
import { Home } from "./pages/home";

const Login = lazy(() => import("./pages/login/login"));
// feature navigators
const HostsNavigator = lazy(() => import("./features/hosts/navigator"));

const Root = styled("div")(() => ({
  display: "flex",
}));

const Content = styled("main")(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
}));

function App() {
  return (
    <Router>
      <ErrorBoundary>
        <AuthProvider>
          <TimeWindowProvider>
            <AppContent />
          </TimeWindowProvider>
        </AuthProvider>
      </ErrorBoundary>
    </Router>
  );
}

const AppContent: React.FC = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Login />;
  }

  const sideBarWidth = 240;

  return (
    <Root>
      <CssBaseline />
      <Sidebar width={sideBarWidth} />
      <Content style={{ marginLeft: sideBarWidth }}>
        <NavBar />
        <Suspense fallback={<Spinner />}>
          <Routes>
            <Route path="/org/:id/" element={<Home />} />
            <Route path="/org/:id/entities/hosts/*" element={<HostsNavigator />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </Suspense>
      </Content>
    </Root>
  );
};

export default App;
