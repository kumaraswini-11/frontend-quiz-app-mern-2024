import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import styles from "./PlayQuiz.module.css";
import { ButtonComponent } from "../";
import { updateQuestionsResponse } from "../../api/quizService";

function PlayQuiz({ quizAndQuestions, setShowResult, setTestResult }) {
  // Destructuring props
  const { quizTimer = 0, quizQuestions = [] } = quizAndQuestions || {};

  // State variables
  const [timer, setTimer] = useState(quizTimer);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [result, setResult] = useState(0);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(null);

  // Get the current question
  const currentQuestion = quizQuestions[currentQuestionIndex];

  // useEffect(() => {
  //   let timerInterval;

  //   if (timer > 0) {
  //     timerInterval = setInterval(() => {
  //       setTimer((prevTimer) => prevTimer - 1);
  //     }, 1000);
  //   }

  //   return () => clearInterval(timerInterval);
  // }, [timer]);

  // useEffect(() => {
  //   if (timer === 0) {
  //     handleNextQuestion();
  //   }
  // }, [timer]);

  // move to the next question

  const handleNextQuestion = async () => {
    // Validate to choose an option
    if (timer > 0 && selectedOptionIndex === null) {
      toast("Choose an option first");
      return;
    }

    // Retrieve the selected option
    const selectedOption =
      currentQuestion?.questionOptions[selectedOptionIndex];

    if (selectedOption && selectedOption.isCorrect !== undefined) {
      // if the selected option is correct, then update the 'correctResponses' & 'result' count by 1
      if (selectedOption && selectedOption?.isCorrect) {
        currentQuestion.correctResponses += 1;
        setResult((prevResult) => prevResult + 1);
      } else {
        currentQuestion.incorrectResponses += 1;
      }

      // Go to the next question if it's not the last one
      if (currentQuestionIndex < quizQuestions?.length - 1) {
        // Replace the currentQuestion with its respective index in quizQuestions
        quizQuestions[currentQuestionIndex] = {
          ...currentQuestion,
        };

        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
        setSelectedOptionIndex(null);
      } else {
        //Make the api call to update the response
        const updateQueResponse = quizQuestions?.map((question, index) => ({
          questionId: question._id,
          correctResponses: question.correctResponses,
          incorrectResponses: question.incorrectResponses,
        }));
        await updateQuestionsResponse(updateQueResponse);

        // Go to the Result componnet
        setShowResult(true);
        setTestResult(result);
      }
    }
  };

  return (
    quizQuestions.length > 0 && (
      <div className={styles.container}>
        <div className={styles.subContainer}>
          {/* Information Container */}
          <div className={styles.infoContainer}>
            <label>{`${String(currentQuestionIndex + 1).padStart(
              2,
              "0"
            )}/${String(quizQuestions?.length).padStart(2, "0")}`}</label>
            {timer > 0 && (
              <label style={{ color: "red" }}>{`00:${timer}s`}</label>
            )}
          </div>

          {/* Body Container */}
          <div className={styles.bodyContainer}>
            <label>{currentQuestion.questionText}</label>
            {/* Options Container */}
            <div className={styles.optionsContainer}>
              {currentQuestion.questionOptions.map((option, index) => (
                <div
                  key={index}
                  className={`${styles.optionContainer} ${
                    selectedOptionIndex === index ? styles.selectedOption : ""
                  }`}
                  onClick={() => setSelectedOptionIndex(index)}
                >
                  {option.optionImageUrl && (
                    <img
                      src={option.optionImageUrl}
                      alt={`Option${currentQuestionIndex} Image Url`}
                    />
                  )}
                  <label>{option.optionText}</label>
                </div>
              ))}
            </div>
          </div>

          {/* Button Container */}
          <div className={styles.btnContainer}>
            <ButtonComponent
              className={styles.submitBtn}
              onClick={handleNextQuestion}
            >
              {currentQuestionIndex === quizQuestions?.length - 1
                ? "Submit"
                : "Next"}
            </ButtonComponent>
          </div>
        </div>
      </div>
    )
  );
}

export default PlayQuiz;
