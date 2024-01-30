import React, { useState, useEffect } from "react";
import styles from "./PlayQuiz.module.css";
import { ButtonComponent } from "../";

// if quizType is "poll", then by default quizTimer is 0. So need of quizType.
// This is just the dummy data for referance how my server response structer will be.
const questionsForThisQuiz = {
  quizTimer: 0,
  quizQuestions: [
    {
      questionText: "This is demo1?",
      questionOptions: [
        {
          optionText: "Option A",
          optionImageUrl:
            "https://buffer.com/cdn-cgi/image/w=1000,fit=contain,q=90,f=auto/library/content/images/size/w600/2023/10/free-images.jpg",
          isCorrect: false,
        },
        {
          optionText: "Option B",
          optionImageUrl:
            "https://buffer.com/cdn-cgi/image/w=1000,fit=contain,q=90,f=auto/library/content/images/size/w600/2023/10/free-images.jpg",
          isCorrect: false,
        },
        {
          optionText: "Option C",
          optionImageUrl:
            "https://buffer.com/cdn-cgi/image/w=1000,fit=contain,q=90,f=auto/library/content/images/size/w600/2023/10/free-images.jpg",
          isCorrect: true,
        },
        {
          optionText: "Option D",
          optionImageUrl:
            "https://buffer.com/cdn-cgi/image/w=1000,fit=contain,q=90,f=auto/library/content/images/size/w600/2023/10/free-images.jpg",
          isCorrect: false,
        },
      ],
    },
    {
      questionText: "Is just for demo2?",
      questionOptions: [
        {
          optionText: "Option 1",
          optionImageUrl:
            "https://buffer.com/cdn-cgi/image/w=1000,fit=contain,q=90,f=auto/library/content/images/size/w600/2023/10/free-images.jpg",
          isCorrect: false,
        },
        {
          optionText: "Option 2",
          optionImageUrl:
            "https://buffer.com/cdn-cgi/image/w=1000,fit=contain,q=90,f=auto/library/content/images/size/w600/2023/10/free-images.jpg",
          isCorrect: true,
        },
        { optionText: "Option 3", optionImageUrl: "", isCorrect: false },
        // { optionText: "Option 4", optionImageUrl: "", isCorrect: false },
      ],
    },
    {
      questionText: "This is demo1?",
      questionOptions: [
        {
          optionText: "Option A",
          optionImageUrl:
            "https://buffer.com/cdn-cgi/image/w=1000,fit=contain,q=90,f=auto/library/content/images/size/w600/2023/10/free-images.jpg",
          isCorrect: false,
        },
        {
          optionText: "Option B",
          optionImageUrl:
            "https://buffer.com/cdn-cgi/image/w=1000,fit=contain,q=90,f=auto/library/content/images/size/w600/2023/10/free-images.jpg",
          isCorrect: false,
        },
        {
          optionText: "Option C",
          optionImageUrl:
            "https://buffer.com/cdn-cgi/image/w=1000,fit=contain,q=90,f=auto/library/content/images/size/w600/2023/10/free-images.jpg",
          isCorrect: true,
        },
        {
          optionText: "Option D",
          optionImageUrl:
            "https://buffer.com/cdn-cgi/image/w=1000,fit=contain,q=90,f=auto/library/content/images/size/w600/2023/10/free-images.jpg",
          isCorrect: false,
        },
      ],
    },
  ],
};

function PlayQuiz({ questions }) {
  //delete
  questions = questionsForThisQuiz;

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [result, setResult] = useState(0);
  const [timer, setTimer] = useState(questions.quizTimer);
  const [selectedOption, setSelectedOption] = useState(null);
  const isCorrect = false;

  useEffect(() => {
    let timerInterval;

    if (timer > 0) {
      timerInterval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    }

    return () => clearInterval(timerInterval);
  }, [timer]);

  // useEffect(() => {
  //   if (timer === 0) {
  //     handleNextQuestion();
  //   }
  // }, [timer]);

  const handleNextQuestion = () => {
    verifyIsCorrectOption(selectedOption);

    if (currentQuestionIndex < questionsForThisQuiz.quizQuestions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setTimer(questionsForThisQuiz.quizTimer);
      setSelectedOption(null);
    } else {
      // Go to ResultPage when all questions are answered or submit button clicked
      // if (
      //   currentQuestionIndex ===
      //   questionsForThisQuiz.quizQuestions.length - 1
      // ) {
      return (
        <ResultPage
          result={result}
          totalQuestions={questionsForThisQuiz.quizQuestions.length}
        />
      );
      // }
    }
  };

  const verifyIsCorrectOption = (choosedOption) => {
    const isCorrect =
      questionsForThisQuiz.quizQuestions[currentQuestionIndex].questionOptions[
        choosedOption
      ].isCorrect;

    // update the result
    if (isCorrect) {
      setResult((prevResult) => prevResult + 1);
    }
  };

  console.log("sleected option", selectedOption);
  console.log("iscorrect", isCorrect);
  console.log("result", result);

  const { quizTimer, quizQuestions } = questionsForThisQuiz;
  const currentQuestion = quizQuestions[currentQuestionIndex];

  return (
    <main className={styles.container}>
      <div className={styles.subContainer}>
        <div className={styles.infoContainer}>
          <label>{`${currentQuestionIndex + 1}/${quizQuestions.length}`}</label>
          {quizTimer !== 0 && (
            <label style={{ color: "red" }}>{`00:${timer}s`}</label>
          )}
        </div>

        <div className={styles.bodyContainer}>
          <label>{currentQuestion.questionText}</label>
          <div className={styles.optionsContainer}>
            {currentQuestion.questionOptions.map((option, index) => (
              <div
                className={`${styles.optionContainer} ${
                  selectedOption === index ? styles.selectedOption : ""
                }`}
                key={index}
                onClick={() => {
                  // verifyIsCorrectOption(index);
                  setSelectedOption(index);
                }}
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

        <div className={styles.btnContainer}>
          <ButtonComponent
            className={styles.submitBtn}
            onClick={handleNextQuestion}
          >
            {currentQuestionIndex === quizQuestions.length - 1
              ? "Submit"
              : "Next"}
          </ButtonComponent>
        </div>
      </div>
    </main>
  );
}

export default PlayQuiz;
