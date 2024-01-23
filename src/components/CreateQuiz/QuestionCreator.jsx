import React, { useState } from "react";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { FaPlus } from "react-icons/fa";
import { IoIosClose } from "react-icons/io";
import { InputComponent, ButtonComponent } from "../";
import styles from "./QuestionCreator.module.css";
import { useNavigate } from "react-router-dom";

const initialQuestion = {
  questionData: { questionName: "", optionType: "text" },
  options: [
    { text: "", image: "" },
    { text: "", image: "" },
  ],
  circleCount: 1,
  timer: "off",
};

function QuestionCreator({ proceedToNextStep }) {
  const [questions, setQuestions] = useState([initialQuestion]);
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(0);
  const navigate = useNavigate();

  const updateQuestions = (callback) => {
    setQuestions((prevQuestions) => {
      const updatedQuestions = [...prevQuestions];
      callback(updatedQuestions);
      return updatedQuestions;
    });
  };

  const handleChange = (event, index) => {
    updateQuestions((updatedQuestions) => {
      updatedQuestions[index].questionData.questionName = event.target.value;
    });
  };

  const handleRadioChange = (event, index) => {
    updateQuestions((updatedQuestions) => {
      updatedQuestions[index].questionData.optionType = event.target.value;
    });
  };

  const handleChangeOption = (
    questionIndex,
    optionIndex,
    optionType,
    event
  ) => {
    updateQuestions((updatedQuestions) => {
      updatedQuestions[questionIndex].options[optionIndex][optionType] =
        event.target.value;
    });
  };

  const handleCancel = () => {
    navigate(-1);
  };

  const handleContinue = () => {
    proceedToNextStep();
  };

  const handleAddCircle = () => {
    if (questions.length < 5) {
      setQuestions((prevQuestions) => [
        ...prevQuestions,
        {
          questionData: { questionName: "", optionType: "text" },
          options: [
            { text: "", image: "" },
            { text: "", image: "" },
          ],
          circleCount: 1,
          timer: "off",
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
    updateQuestions((updatedQuestions) => {
      updatedQuestions[index].timer = selectedTimer;
    });
  };

  const handleAddOption = (index) => {
    updateQuestions((updatedQuestions) => {
      const options = updatedQuestions[index].options;
      if (options.length < 4) {
        updatedQuestions[index].options = [...options, { text: "", image: "" }];
      }
    });
  };

  const handleDeleteOption = (index, optionIndex) => {
    updateQuestions((updatedQuestions) => {
      updatedQuestions[index].options = updatedQuestions[index].options.filter(
        (_, i) => i !== optionIndex
      );
    });
  };

  const renderOptionInputs = (questionIndex, optionIndex) => {
    const currentQuestion = questions[questionIndex];

    const renderTextOption = (
      <input
        className={styles.optionInput}
        type="text"
        id={`textOption${optionIndex}`}
        value={currentQuestion.options[optionIndex]?.text || ""}
        onChange={(e) =>
          handleChangeOption(questionIndex, optionIndex, "text", e)
        }
      />
    );

    const renderImageOption = (
      <input
        className={styles.optionInput}
        type="text"
        id={`imageOption${optionIndex}`}
        value={currentQuestion.options[optionIndex]?.image || ""}
        onChange={(e) =>
          handleChangeOption(questionIndex, optionIndex, "image", e)
        }
      />
    );

    return (
      <div key={optionIndex} className={styles.option}>
        <input
          type="radio"
          id={`tOptions${optionIndex}`}
          name={`tOptions${questionIndex}`}
          value={`tOptions${optionIndex}`}
        />

        {currentQuestion.questionData.optionType === "text" && renderTextOption}

        {currentQuestion.questionData.optionType === "image" &&
          renderImageOption}

        {currentQuestion.questionData.optionType === "textImage" && (
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
    <div className={styles.backdrop}>
      <div className={`${styles.modalContainer} ${styles.modal}`}>
        <section className={styles.container}>
          <div className={styles.questionNumbersContainer}>
            {questions.map((question, index) => (
              <div
                key={index}
                className={styles.questionNumber}
                onClick={() => setSelectedQuestionIndex(index)}
              >
                <div className={styles.circle}>{index + 1}</div>
                {index >= 1 && (
                  <IoIosClose
                    className={styles.closeButton}
                    onClick={() => handleRemoveCircle(index)}
                  />
                )}
              </div>
            ))}
            {questions.length < 5 && (
              <FaPlus className={styles.plusIcon} onClick={handleAddCircle} />
            )}
            <label>Max 5 questions</label>
          </div>

          {questions.map((question, index) => (
            <div
              key={index}
              style={{
                display: index === selectedQuestionIndex ? "block" : "none",
              }}
            >
              <InputComponent
                type="text"
                className={styles.questionInput}
                placeholder="Question"
                ariaLabelledby="Question"
                required
                onChange={(event) => handleChange(event, index)}
                value={question.questionData.questionName}
              />

              <fieldset className={styles.optionTypeContainer}>
                <label>Option Type</label>
                <div className={styles.optionTypes}>
                  {["text", "image", "textImage"].map((type) => (
                    <div key={type}>
                      <input
                        type="radio"
                        id={type}
                        name={`optionType${index}`}
                        value={type}
                        checked={question.questionData.optionType === type}
                        onChange={(event) => handleRadioChange(event, index)}
                      />
                      <label htmlFor={type}>
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </label>
                    </div>
                  ))}
                </div>
              </fieldset>

              <div className={styles.questionOptionsContainer}>
                <div className={styles.optionsContainer}>
                  {question.options.map((_, optionIndex) =>
                    renderOptionInputs(index, optionIndex)
                  )}
                  {question.options.length < 4 && (
                    <ButtonComponent
                      type="button"
                      ariaLabel="Add option"
                      className={`${styles.btn}`}
                      onClick={() => handleAddOption(index)}
                    >
                      Add Option
                    </ButtonComponent>
                  )}
                </div>

                <div className={styles.timer}>
                  <span className={styles.timerHeading}>Timer</span>
                  {["off", "5", "10"].map((timerOption) => (
                    <span
                      key={timerOption}
                      className={`${styles.timerOption} ${
                        question.timer === timerOption && styles.selected
                      }`}
                      onClick={() => handleTimerSelect(timerOption, index)}
                    >
                      {timerOption === "off" ? "OFF" : `${timerOption} Sec`}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}

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
              aria-label="Create Quiz"
              className={`${styles.btn} ${styles.btnContinue}`}
              onClick={handleContinue}
            >
              Create Quiz
            </ButtonComponent>
          </div>
        </section>
      </div>
    </div>
  );
}

export default QuestionCreator;
