import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/ErrorPage.module.css";

function ErrorPage() {
  const navigate = useNavigate();

  return (
    <main className={styles.errorPageContainer}>
      <h1 className={styles.errorPageText}>This page is under maintenance.</h1>
      <p className={styles.errorMessage}>Sorry, please come back later!</p>
      <button
        className={styles.backToDashboardBtn}
        onClick={() => {
          navigate("/dashboard");
        }}
      >
        Back To Dashboard
      </button>
    </main>
  );
}

export default ErrorPage;
