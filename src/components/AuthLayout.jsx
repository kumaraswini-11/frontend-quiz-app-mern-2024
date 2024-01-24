import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { selectIsAuthenticated } from "../redux/slices/authenticationSlice";
import { Sidebar } from "./";

function AuthLayout() {
  // Retrieve authentication status and userdata from Redux store, for giveing acces to the protected routes
  const isAlreadyLoggedIn = useSelector(selectIsAuthenticated);

  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is not logged in - redirect to login page
    if (!isAlreadyLoggedIn) {
      toast("Please sign up or log in to view this page.");
      navigate("/login");
    }
  }, [isAlreadyLoggedIn, navigate]);

  // Render the Sidebar only if the user is already logged in
  return isAlreadyLoggedIn && <Sidebar />;
}

export default AuthLayout;
