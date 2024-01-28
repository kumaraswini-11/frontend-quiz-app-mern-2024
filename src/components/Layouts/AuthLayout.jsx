import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { selectIsAuthenticated } from "../../redux/slices/authenticationSlice";
import { UnprotectedLayout, ProtectedLayout } from "../";

function AuthLayout() {
  const navigate = useNavigate();
  const isAlreadyLoggedIn = useSelector(selectIsAuthenticated);

  useEffect(() => {
    if (isAlreadyLoggedIn) {
      // toast.error("Please log in to access the application.", {
      //   position: "top-center",
      navigate("/app/dashboard");
    } else {
      navigate("/login");
    }
  }, [isAlreadyLoggedIn]);

  // If user logedin go to Protected Layout else the UnprotectedLayout
  return !isAlreadyLoggedIn ? <UnprotectedLayout /> : <ProtectedLayout />;
}

export default AuthLayout;
