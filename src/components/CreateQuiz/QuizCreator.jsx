import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { InputComponent, ButtonComponent } from "../";
import styles from "./QuizCreator.module.css";
import {
  setQuizDetails,
  selectQuizDetails,
} from "../../redux/slices/quizSlice";

export default function QuizCreator({ onNext }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Local state to hold quiz details
  const [quizData, setQuizData] = useState({
    quizName: "",
    quizType: "questionAndAnswer", // Default value
  });

  // Update local state on input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setQuizData({ ...quizData, [name]: value });
  };

  // Handle selecting quiz type
  const handleSelectQuizType = (selectedType) => {
    setQuizData({ ...quizData, quizType: selectedType });
  };

  // Handle Continue button click
  const handleContinue = () => {
    // Basic Validation
    if (quizData.quizName.trim() === "") {
      toast.error("Quiz name is required");
      return;
    }

    // Bydefult Q&A selected,. This is just for the safty purpose.
    if (!["questionAndAnswer", "poll"].includes(quizData.quizType)) {
      toast.error("Invalid quiz type selected");
      return;
    }

    // console.log("Quiz Data:", quizData);
    dispatch(setQuizDetails(quizData));

    // Trigger the next step
    onNext();
  };

  // Handle Cancel button click
  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <section className={styles.backdrop}>
      <div className={`${styles.modalContainer} ${styles.modal}`}>
        <div className={styles.container}>
          {/* Input field */}
          <InputComponent
            type="text"
            className={styles.quizInput}
            placeholder="Quiz name"
            name="quizName"
            required
            onChange={handleInputChange}
            value={quizData.quizName}
          />

          {/* Quiz type selection */}
          <div className={styles.quizTypeContainer}>
            <label className={styles.quizeTypeLabel}>Quiz Type</label>
            <span
              className={`${styles.quizTypeBox} ${
                quizData.quizType === "questionAndAnswer" ? styles.selected : ""
              }`}
              onClick={() => handleSelectQuizType("questionAndAnswer")}
            >
              Q&A
            </span>
            <span
              className={`${styles.quizTypeBox} ${
                quizData.quizType === "poll" ? styles.selected : ""
              }`}
              onClick={() => handleSelectQuizType("poll")}
            >
              Poll
            </span>
          </div>

          {/* Buttons */}
          <div className={styles.btnContainer}>
            <ButtonComponent
              type="button"
              className={`${styles.btn} ${styles.btnCancel}`}
              onClick={handleCancel}
            >
              Cancel
            </ButtonComponent>

            <ButtonComponent
              type="button"
              className={`${styles.btn} ${styles.btnContinue}`}
              onClick={handleContinue}
            >
              Continue
            </ButtonComponent>
          </div>
        </div>
      </div>
    </section>
  );
}
