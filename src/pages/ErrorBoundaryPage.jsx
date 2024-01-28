import React from "react";
import { Link } from "react-router-dom";

const errorContainerStyle = {
  textAlign: "center",
  padding: "20px",
  border: "1px solid #ccc",
  borderRadius: "5px",
  maxWidth: "400px",
  margin: "auto",
  marginTop: "50px",
};

const goBackLinkStyle = {
  display: "block",
  marginTop: "10px",
  color: "#007bff",
  textDecoration: "none",
};

const ErrorPage = () => {
  return (
    <div style={errorContainerStyle}>
      <h1>Error ::::</h1>
      <p>Oops! Something went wrong.</p>
      <p>Please try again later or contact support if the problem persists.</p>
      <Link to="/app" style={goBackLinkStyle}>
        Go back to the home page
      </Link>
    </div>
  );
};

export default ErrorPage;
