import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Navigate,
  Routes,
} from "react-router-dom";
import { useSelector } from "react-redux";
import { Provider } from "react-redux";
import store from "./store";
import Login from "./Pages/Login";
import LoginPage from "./Pages/loginpage";
import Logout from "./Pages/logout";
import { Dashboard } from "./Pages/Dashboard";
import { ThemeProvider, createTheme } from '@mui/material/styles';
const AppRoutes = () => {
  // const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const isAuthenticated = () => {
    const accessToken = localStorage.getItem("accessToken");
    return accessToken !== null;
  };

  return (
    <Routes>
      <Route
        path="/login"
        element={
           <LoginPage />
        }
      />
      <Route
        path="/logout"
        element={
           <Logout />
        }
      />
      {/* <Route
        path="/"
        element={
          isAuthenticated() ? <div> hey </div> : <Navigate to="/login" replace />
        }
      /> */}
      <Route
        path="*"
        element={
          isAuthenticated() ? (
            <Navigate to="/" replace />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
    </Routes>
  );
};

const App = () => {
  const theme = createTheme({
    typography: {
      fontFamily: [
        'Open Sans'
      ].join(','),
      fontSize: '16px'
    }
  });
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
      <Router>
        <AppRoutes />
      </Router></ThemeProvider>
    </Provider>
  );
};

export default App;
