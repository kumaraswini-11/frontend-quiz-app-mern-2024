import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { InputComponent, ButtonComponent } from "../";
import styles from "./QuizCreator.module.css";

export default function QuizCreator({ proceedToNextStep }) {
  const [quizData, setQuizData] = useState({
    quizName: "",
    quizType: "questionAndAnswer",
  });
  const navigate = useNavigate();

  const handleChange = (event) => {
    setQuizData({ ...quizData, quizName: event.target.value });
  };

  const handleRadioChange = (event) => {
    setQuizData({ ...quizData, quizType: event.target.value });
  };

  const handleContinue = () => {
    console.log("Quiz Data:", quizData);
    proceedToNextStep();
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <div className={styles.backdrop}>
      <div className={`${styles.modalContainer} ${styles.modal}`}>
        <section className={styles.container}>
          <InputComponent
            type="text"
            className={styles.quizInput}
            placeholder="Quiz name"
            ariaLabelledby="Quiz name"
            required
            onChange={handleChange}
            value={quizData.quizName}
          />

          <fieldset className={styles.radioContainer}>
            <label className={styles.radioLabel}>Quiz Type</label>
            <div className={styles.radioOptions}>
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
              </div>

              <div>
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
