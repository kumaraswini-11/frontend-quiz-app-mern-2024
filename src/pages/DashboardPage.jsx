import React, { useState } from "react";
import { Sidebar, Dashboard } from "../components/";

function DashboardPage() {
  const [activePage, setActivePage] = useState("dashboard");

  const handleNavigation = (pageId) => {
    setActivePage(pageId);
  };

  return (
    <div style={{ display: "flex" }}>
      <Sidebar activePage={activePage} handleNavigation={handleNavigation} />
      <Dashboard activePage={activePage} />
    </div>
  );
}

export default DashboardPage;
