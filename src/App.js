import React from "react";
import Login from "./Components/Login";
import { useContext } from "react";
import Dashboard from "./Components/dashboard";
import MainNavigation from "./Components/navBar";
import AuthContext from "./Components/store/auth";
import { Route, Navigate, Routes } from "react-router-dom";

function App() {
  const authCtx = useContext(AuthContext);
  return (
    <React.Fragment>
      <MainNavigation />
      <Routes>
      {!authCtx.isLoggedIn && (
        <Route path="/" element={<Login />}>
        </Route>
      )}
      {/* <Route path="/track">
        {authCtx.isLoggedIn && <Dashboard />}
        {!authCtx.isLoggedIn && <Navigate to="/" />}
      </Route> */}
      {authCtx.isLoggedIn && (
        <Route path="/dash" element={<Dashboard />}>
        </Route>
      )}
      </Routes>
    </React.Fragment>
  );
}

export default App;
