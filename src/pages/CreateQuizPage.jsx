import React, { useState } from "react";
import { QuizCreator, QuestionCreator, ShareQuiz } from "../components";

function CreateQuizPage() {
  const [activePage, setActivePage] = useState("createquiz");

  const handleNavigation = () => {
    // Determine the next page based on the current activePage
    let nextPage;
    switch (activePage) {
      case "createquiz":
        nextPage = "questioncreator";
        break;
      case "questioncreator":
        nextPage = "sharequiz";
        break;

      default:
        // Handle the case where there's no next page
        break;
    }

    // Update the activePage state to navigate to the next page
    setActivePage(nextPage);
  };

  return (
    <div style={{ display: "flex" }}>
      <Sidebar activePage={activePage} handleNavigation={handleNavigation} />

      {/* Render the active component based on the value of activePage */}
      {activePage === "createquiz" && (
        <QuizCreator proceedToNextStep={handleNavigation} />
      )}
      {activePage === "questioncreator" && (
        <QuestionCreator proceedToNextStep={handleNavigation} />
      )}
      {activePage === "sharequiz" && <ShareQuiz />}
    </div>
  );
}

export default CreateQuizPage;
