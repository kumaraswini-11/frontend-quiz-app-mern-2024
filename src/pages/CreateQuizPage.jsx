import React, { useState } from "react";
import { QuizCreator, QuestionCreator, ShareQuiz } from "../components";

function CreateQuizPage() {
  const [currentStep, setCurrentStep] = useState(1);

  const handleNext = () => {
    setCurrentStep(currentStep + 1);
  };

  // If in futuer, i need to impliment the back step, than its going to be used.
  // const handlePrev = () => {
  //   setCurrentStep(currentStep - 1);
  // };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <QuizCreator onNext={handleNext} />;
      case 2:
        return <QuestionCreator onNext={handleNext} />;
      case 3:
        return <ShareQuiz onNext={handleNext} />;
      default:
        return <div>Invalid step</div>;
    }
  };

  return <div>{renderStep()}</div>;
}

export default CreateQuizPage;

/**
 * Yes, based on your description, it seems like you have a multi-step form where each step collects specific information. In Step 1, you collect details about a quiz. In Step 2, you collect multiple questions for that quiz, and in Step 3, you display the finalized quiz details.

Your approach of using a single object (formData) to accumulate data across steps and then sending it to the database in the final step is a reasonable approach. It allows you to maintain a cohesive set of data as the user progresses through the form.

Here's a quick recap of the flow:

Step 1: Collect quiz details and update the formData.
Step 2: Collect questions related to the quiz and update the formData.
Step 3: Display the finalized quiz details using the accumulated formData.
Make sure to handle any validations, error handling, or edge cases based on your application requirements. Also, consider providing a way for users to navigate back to previous steps if needed. Overall, this approach aligns with the concept of a controlled form in React, where the form state is managed by React components.
 */
/*
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setQuizDetails } from 'path/to/quizSlice';

const Step1 = ({ onNext }) => {
  const dispatch = useDispatch();
  const quizDetails = useSelector(selectQuizDetails);

  const handleNext = () => {
    dispatch(setQuizDetails(quizDetails));
  };

  return (
    <div>
      <h2>Step 1: Quiz Details</h2>
      <label>Title:</label>
      <input
        type="text"
        value={quizDetails.title}
        onChange={(e) => setQuizDetails({ ...quizDetails, title: e.target.value })}
      />
      <label>Description:</label>
      <textarea
        value={quizDetails.description}
        onChange={(e) => setQuizDetails({ ...quizDetails, description: e.target.value })}
      />
      <button onClick={handleNext}>Next</button>
    </div>
  );
};

export default Step1;





import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addQuestion } from 'path/to/quizSlice';

const Step2 = ({ quizDetails, onNext }) => {
  const dispatch = useDispatch();
  const quizDetails = useSelector(selectQuizDetails);

  const handleNext = () => {
    dispatch(addQuestion({ ...quizDetails, questions }));
  };

  return (
    <div>
      <h2>Step 2: Questions</h2>
      <label>Question 1:</label>
      <input
        type="text"
        onChange={(e) => setQuestions([...questions, { text: e.target.value }])}
      />
      {/* Add more question input fields as needed *}
      <button onClick={handleNext}>Next</button>
    </div>
  );
};

export default Step2;





import React from 'react';
import { useSelector } from 'react-redux';
import { selectQuizDetails, selectQuestions } from 'path/to/quizSlice';


const Step3 = ({ finalizedQuiz }) => {
  const quizDetails = useSelector(selectQuizDetails);
  const questions = useSelector(selectQuestions);

  return (
    <div>
      <h2>Step 3: Finalized Quiz</h2>
      <p>Title: {finalizedQuiz.title}</p>
      <p>Description: {finalizedQuiz.description}</p>
      <p>Questions:</p>
      <ul>
        {finalizedQuiz.questions.map((question, index) => (
          <li key={index}>{question.text}</li>
        ))}
      </ul>
    </div>
  );
};

export default Step3;

*/
