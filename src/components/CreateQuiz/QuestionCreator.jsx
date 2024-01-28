import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { FaPlus } from "react-icons/fa";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { InputComponent, ButtonComponent } from "..";
import styles from "./QuestionCreator.module.css";
import { createQuiz } from "../../api/quizService";
import { selectUserData } from "../../redux/slices/authenticationSlice";
import { selectQuizDetails } from "../../redux/slices/quizSlice";

const initialQuestion = {
  questionText: "",
  questionType: "",
  questionOptions: [
    { optionText: "", optionImageUrl: "", isCorrect: false },
    { optionText: "", optionImageUrl: "", isCorrect: false },
  ],
  circleCount: 1,
};

function QuestionCreator({ onNext }) {
  // Get the data from store
  const userDetails = useSelector(selectUserData);
  let quizData = useSelector(selectQuizDetails);

  const [quizType, setQuizType] = useState(false);
  const [timer, setTimer] = useState(5);
  const [questions, setQuestions] = useState([initialQuestion]);
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    // Use userDetails and quizDetails here
    if (quizData?.quizType === "questionAndAnswer") {
      setQuizType(true);
    }
  }, [quizData]);

  const updateQuestions = (callback) => {
    setQuestions((prevQuestions) => {
      const updatedQuestions = [...prevQuestions];
      callback(updatedQuestions);
      return updatedQuestions;
    });
  };

  const handleChange = (event, index) => {
    updateQuestions((updatedQuestions) => {
      updatedQuestions[index].questionText = event.target.value;
    });
  };

  const handleRadioChange = (event, index) => {
    updateQuestions((updatedQuestions) => {
      updatedQuestions[index].questionType = event.target.value;
    });
  };

  const handleChangeOption = (
    questionIndex,
    optionIndex,
    questionType,
    event
  ) => {
    updateQuestions((updatedQuestions) => {
      updatedQuestions[questionIndex].questionOptions[optionIndex][
        questionType
      ] = event.target.value;
    });
  };

  const handleCancel = () => {
    navigate(-1);
  };
  const handleContinue = async () => {
    // Basic Validation
    if (questions.length === 0) {
      toast.error("Please add at least one question to create a quiz.");
      return;
    }

    // Extracting question details without 'circleCount'
    const quizQuestions = questions.map(({ circleCount, ...rest }) => ({
      ...rest,
    }));

    // Get quizDetails
    const quizDetails = {
      userId: userDetails?.user?._id,
      title: quizData?.quizName,
      quizType: quizData?.quizType,
      quizTimer: timer,
      quizQuestions,
    };

    try {
      console.log(quizDetails);
      const response = await createQuiz(quizDetails);
      console.log(response);

      // Only when successful
      if (response && response.success) {
        toast.success("Quiz created successfully!");
        onNext();
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleAddCircle = () => {
    if (questions.length < 5) {
      setQuestions((prevQuestions) => [
        ...prevQuestions,
        {
          questionText: "",
          questionType: "text",
          questionOptions: [
            { optionText: "", optionImageUrl: "", isCorrect: false },
            { optionText: "", optionImageUrl: "", isCorrect: false },
          ],
          circleCount: 1,
        },
      ]);
      setSelectedQuestionIndex(questions.length);
    }
  };

  const handleRemoveCircle = (index) => {
    updateQuestions((updatedQuestions) => {
      if (updatedQuestions.length === 1) {
        return updatedQuestions;
      }
      updatedQuestions.splice(index, 1);
    });
  };

  const handleTimerSelect = (selectedTimer, index) => {
    setTimer(selectedTimer);
  };

  const handleCorrectOptionSelect = (questionIndex, optionIndex) => {
    updateQuestions((updatedQuestions) => {
      // Reset 'isCorrect' for all options in the current question
      updatedQuestions[questionIndex].questionOptions.forEach((option) => {
        option.isCorrect = false;
      });

      // Set 'isCorrect' to true for the selected option
      updatedQuestions[questionIndex].questionOptions[
        optionIndex
      ].isCorrect = true;
    });
  };

  const handleAddOption = (index) => {
    updateQuestions((updatedQuestions) => {
      const options = updatedQuestions[index].questionOptions;
      if (options.length < 4) {
        updatedQuestions[index].questionOptions = [
          ...options,
          { optionText: "", optionImageUrl: "", isCorrect: false },
        ];
      }
    });
  };

  const handleDeleteOption = (questionIndex, optionIndex) => {
    updateQuestions((updatedQuestions) => {
      updatedQuestions[questionIndex].questionOptions = updatedQuestions[
        questionIndex
      ].questionOptions.filter((_, i) => i !== optionIndex);
    });
  };

  const renderOptionInputs = (questionIndex, optionIndex) => {
    const currentQuestion = questions[questionIndex];

    const renderTextOption = (
      <input
        className={styles.textInput}
        type="text"
        id={`textOption${optionIndex}`}
        value={currentQuestion.questionOptions[optionIndex]?.optionText || ""}
        onChange={(e) =>
          handleChangeOption(questionIndex, optionIndex, "optionText", e)
        }
      />
    );

    const renderImageOption = (
      <input
        className={styles.textInput}
        type="text"
        id={`imageOption${optionIndex}`}
        value={
          currentQuestion.questionOptions[optionIndex]?.optionImageUrl || ""
        }
        onChange={(e) =>
          handleChangeOption(questionIndex, optionIndex, "optionImageUrl", e)
        }
      />
    );

    return (
      <div key={optionIndex} className={styles.inputGroup}>
        {quizType && (
          <input
            type="radio"
            className={styles.radioInput}
            id={`tOptions${optionIndex}`}
            name={`tOptions${questionIndex}`}
            value={`tOptions${optionIndex}`}
            onChange={() =>
              handleCorrectOptionSelect(questionIndex, optionIndex)
            }
            checked={
              currentQuestion.questionOptions[optionIndex]?.isCorrect || false
            }
          />
        )}

        {currentQuestion.questionType === "text" && renderTextOption}

        {currentQuestion.questionType === "image" && renderImageOption}

        {currentQuestion.questionType === "textImage" && (
          <>
            {renderTextOption}
            {renderImageOption}
          </>
        )}

        {optionIndex >= 2 && (
          <RiDeleteBin5Fill
            className={styles.deleteIcon}
            onClick={() => handleDeleteOption(questionIndex, optionIndex)}
          />
        )}
      </div>
    );
  };

  return (
    <section className={styles.questionModal}>
      <div className={styles.modalBox}>
        <div className={styles.modalContainer}>
          <div className={styles.numberField}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "25px",
              }}
            >
              {questions.map((question, index) => (
                <div
                  className={styles.circleContainer}
                  key={index}
                  onClick={() => setSelectedQuestionIndex(index)}
                >
                  {index >= 1 && (
                    <label
                      className={styles.closeIcon}
                      onClick={() => handleRemoveCircle(index)}
                    >
                      X
                    </label>
                  )}
                  <span>{index + 1}</span>
                </div>
              ))}
              {questions.length < 5 && (
                <FaPlus className={styles.plusIcon} onClick={handleAddCircle} />
              )}
            </div>
            <h4 className={styles.maxQuestionsText}>Max 5 questions</h4>
          </div>

          {questions.map((question, index) => (
            <div
              className={styles.questionField}
              key={index}
              style={{
                display: index === selectedQuestionIndex ? "block" : "none",
              }}
            >
              <InputComponent
                type="text"
                className={styles.questionFieldInput}
                placeholder="Question"
                required
                onChange={(event) => handleChange(event, index)}
                value={question.questionText}
              />

              <fieldset className={styles.optionType}>
                <label className={styles.optionTypeLegend}>Question Type</label>
                {["text", "image", "textImage"].map((type, i) => (
                  <div className={styles.optionTypeItem} key={i}>
                    <input
                      type="radio"
                      id={type}
                      name={`questionType${index}`}
                      value={type}
                      checked={question.questionType === type}
                      onChange={(event) => handleRadioChange(event, index)}
                    />
                    <label htmlFor={type}>
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </label>
                  </div>
                ))}
              </fieldset>

              <div className={styles.container}>
                <div className={styles.outerRow}>
                  {question.questionOptions.map((_, optionIndex) =>
                    renderOptionInputs(index, optionIndex)
                  )}
                  {question.questionOptions.length < 4 && (
                    <ButtonComponent
                      type="button"
                      onClick={() => handleAddOption(index)}
                    >
                      Add Option
                    </ButtonComponent>
                  )}
                </div>

                <div className={styles.timerContainer}>
                  <label style={{ fontWeight: "bold" }}>Timer</label>
                  {[0, 5, 10].map((timerOption) => (
                    <span
                      key={timerOption}
                      className={timer === timerOption ? styles.selected : ""}
                      onClick={() => handleTimerSelect(timerOption, index)}
                    >
                      {timerOption === 0 ? "OFF" : `${timerOption} Sec`}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}

          <div className={styles.buttonContainer}>
            <ButtonComponent
              type="button"
              className={`${styles.btn} ${styles.btnCancel}`}
              onClick={handleCancel}
            >
              Cancel
            </ButtonComponent>

            <ButtonComponent
              type="button"
              className={styles.createButton}
              onClick={handleContinue}
            >
              Create Quiz
            </ButtonComponent>
          </div>
        </div>
      </div>
    </section>
  );
}

export default QuestionCreator;
