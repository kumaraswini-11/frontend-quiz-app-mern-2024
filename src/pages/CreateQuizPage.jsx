import React, { useState } from "react";
import { Sidebar, QuizCreator } from "../components";

function CreateQuizPage() {
  const [activePage, setActivePage] = useState("createquiz");

  const handleNavigation = (pageId) => {
    setActivePage(pageId);
  };

  return (
    <div style={{ display: "flex" }}>
      <Sidebar activePage={activePage} handleNavigation={handleNavigation} />
      <QuizCreator activePage={activePage} />
    </div>
  );
}

export default CreateQuizPage;
