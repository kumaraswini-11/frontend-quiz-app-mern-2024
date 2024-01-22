import React, { useState } from "react";
import { InputComponent, ButtonComponent } from "../";
import styles from "./QuizCreator.module.css";

export default function QuizCreator({ activePage }) {
  const [quizData, setQuizData] = useState({
    quizName: "",
    quizType: "questionAndAnswer",
  });

  const handleChange = (event) => {
    // Update the quiz name in the state
    setQuizData({ ...quizData, quizName: event.target.value });
  };

  // Handel Updates of the  quiz type in the state
  const handleRadioChange = (event) => {
    setQuizData({ ...quizData, quizType: event.target.value });
  };

  // continue to the next page
  const handleContinue = () => {
    console.log("Quiz Data:", quizData);
  };

  const handleCancel = () => {
    // Reset the state to initial values
    setQuizData({
      quizName: "",
      quizType: "questionAndAnswer",
    });
  };

  return (
    <div className={styles.backdrop}>
      <div className={`${styles.modalContainer} ${styles.modal}`}>
        <section className={styles.container}>
          <InputComponent
            type="text"
            className={styles["quizInput"]}
            placeholder="Quiz name"
            ariaLabelledby="Quiz name"
            required
            onChange={handleChange}
            value={quizData.quizName}
          />

          <fieldset className={styles.radioContainer}>
            <label className="">Quiz Type</label>
            <div>
              <input
                type="radio"
                id="questionAndAnswer"
                name="quizType"
                value="questionAndAnswer"
                checked={quizData.quizType === "questionAndAnswer"}
                onChange={handleRadioChange}
              />
              <label htmlFor="questionAndAnswer">Question and Answer</label>

              <input
                type="radio"
                id="poll"
                name="quizType"
                value="poll"
                checked={quizData.quizType === "poll"}
                onChange={handleRadioChange}
              />
              <label htmlFor="poll">Poll</label>
            </div>
          </fieldset>

          <div className={styles.btnContainer}>
            <ButtonComponent
              type="button"
              aria-label="Cancel"
              className={`${styles.btn} ${styles.btnCancel}`}
              onClick={handleCancel}
            >
              Cancel
            </ButtonComponent>

            <ButtonComponent
              type="button"
              aria-label="Continue"
              className={`${styles.btn} ${styles.btnContinue}`}
              onClick={handleContinue}
            >
              Continue
            </ButtonComponent>
          </div>
        </section>
      </div>
    </div>
  );
}
