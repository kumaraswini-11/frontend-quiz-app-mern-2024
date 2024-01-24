import React from "react";
import { NavLink, Outlet } from "react-router-dom";

export default function App() {
  return (
    <main className={styles.container}>
      <h1 className={styles.title}>QUIZZIE</h1>
      <div className={styles.navigation}>
        <NavLink
          to="/signup"
          className={({ isActive }) => `link ${isActive ? "activeClass" : ""}`}
        >
          Sign Up
        </NavLink>
        <NavLink
          to="/login"
          className={({ isActive }) => `link ${isActive ? "activeClass" : ""}`}
        >
          Login
        </NavLink>
      </div>

      {/* Render the Signup or Login Page */}
      <Outlet />
    </main>
  );
}
