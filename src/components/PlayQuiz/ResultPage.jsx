import React from "react";
import { Container } from "../index";
import styles from "./ResultPage.module.css";

const ResultPage = ({ result, totalQuestions }) => {
  return (
    <Container backColor="red">
      <div className={styles.resultContainer}>
        <div className={styles.subResultContainer}>
          <h1>Congrats! Quiz is completed</h1>
          <img src="" alt="Result Trophy" />
          <h2>
            Your Score is {result}/{totalQuestions}
          </h2>
        </div>
      </div>
    </Container>
  );
};

export default ResultPage;
