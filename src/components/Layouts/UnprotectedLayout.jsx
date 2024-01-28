import React from "react";
import { NavLink, Outlet } from "react-router-dom";

export default function UnprotectedLayout() {
  return (
    <div className="container">
      <main className="subContainer">
        <h1 className="title">QUIZZIE</h1>
        <div className="navigation">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `link ${isActive ? "activeClass" : ""}`
            }
          >
            Sign Up
          </NavLink>
          <NavLink
            to="/login"
            className={({ isActive }) =>
              `link ${isActive ? "activeClass" : ""}`
            }
          >
            Login
          </NavLink>
        </div>

        {/* Render the Signup or Login Page */}
        <div className="componetReneder">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
