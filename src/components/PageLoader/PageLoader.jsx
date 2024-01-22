import React from "react";
import { FiLoader } from "react-icons/fi";
import styles from "./PageLoader.module.css";

function PageLoader() {
  return (
    <div className={styles.loaderContainer}>
      <FiLoader className={styles.loaderIcon} />
      <p className={styles.loadingText}>Loading...</p>
    </div>
  );
}

export default PageLoader;
