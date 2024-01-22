import React, { useState } from "react";
import { Signup, Login } from "../components";
import styles from "../styles/SignupLogin.module.css";

function SignupLogin() {
  const [activeComponent, setActiveComponent] = useState("signup");

  const handleNavigation = (component) => {
    setActiveComponent(component);
  };

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>QUIZZIE</h1>
      <div className={styles.navigation}>
        <nav
          className={styles.link}
          onClick={() => handleNavigation("signup")}
          style={{
            fontWeight: activeComponent === "signup" ? "bold" : "normal",
          }}
        >
          Sign Up
        </nav>
        <nav
          className={styles.link}
          onClick={() => handleNavigation("login")}
          style={{
            fontWeight: activeComponent === "login" ? "bold" : "normal",
          }}
        >
          Login
        </nav>
      </div>

      {activeComponent === "signup" && <Signup />}
      {activeComponent === "login" && <Login />}
    </main>
  );
}

export default SignupLogin;
