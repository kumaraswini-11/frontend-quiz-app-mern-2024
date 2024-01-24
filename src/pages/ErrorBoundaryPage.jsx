import React from "react";
import { Link } from "react-router-dom";

const ErrorPage = ({ errorCode }) => {
  return (
    <div className="error-container">
      <h1>Error {errorCode}</h1>
      <p>Oops! Something went wrong.</p>
      <p>Please try again later or contact support if the problem persists.</p>
      <Link to="/app">Go back to the home page</Link>
    </div>
  );
};

export default ErrorPage;
