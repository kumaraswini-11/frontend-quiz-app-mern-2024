import React from "react";
import trophy from "../../assets/trophy.svg";
import styles from "./ResultPage.module.css";

const ResultPage = ({ testResult, total }) => {
  return (
    <div className={styles.resultContainer}>
      <div className={styles.subResultContainer}>
        <h1>Congrats! Quiz is completed</h1>
        <img src={trophy} alt="Result Trophy" />
        <h2>
          Your Score is
          <span className={styles.result}>
            {`${String(testResult).padStart(2, "0")}/${String(total).padStart(
              2,
              "0"
            )}`}
          </span>
        </h2>
      </div>
    </div>
  );
};

export default ResultPage;
