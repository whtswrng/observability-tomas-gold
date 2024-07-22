import { CssBaseline } from "@mui/material";
import { styled } from "@mui/system";
import React, { Suspense, lazy } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { NavBar } from "./components/navbar";
import Sidebar from "./components/sidebar";
import { AuthProvider, useAuth } from "./contexts/auth-provider";
import { Home } from "./pages/home";
import { Spinner } from "./components/spinner";
import { TimeWindowProvider } from "./contexts/time-window-provider";

const Login = lazy(() => import("./pages/login/login"));
// feature navigators
const HostsNavigator = lazy(() => import("./features/hosts/navigator"));

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
        <TimeWindowProvider>
          <AppContent />
        </TimeWindowProvider>
      </AuthProvider>
    </Router>
  );
}

const AppContent: React.FC = () => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Login />;
  }

  const sideBarWidth = 240;

  return (
    <Root>
      <CssBaseline />
      <Sidebar width={sideBarWidth} />
      <Content style={{marginLeft: sideBarWidth}}>
        <NavBar />
        <Suspense fallback={<Spinner/>}>
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
