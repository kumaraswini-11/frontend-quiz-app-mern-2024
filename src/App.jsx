import React from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

export function App() {
  const navigate = useNavigate();

  // Extracting authentication status from the Redux store using useSelector
  const isAlreadyLoggedIn = useSelector((store) => store.auth.status);

  return <Outlet />;
  // return <>{isAlreadyLoggedIn ? <Outlet /> : navigate("/login")}</>;
}
