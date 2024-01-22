import React, { useState } from "react";
import { Sidebar, Analytics } from "../components";

function AnalyticsPage() {
  const [activePage, setActivePage] = useState("analytics");

  const handleNavigation = (pageId) => {
    setActivePage(pageId);
  };

  return (
    <div style={{ display: "flex" }}>
      <Sidebar activePage={activePage} handleNavigation={handleNavigation} />
      <Analytics activePage={activePage} />
    </div>
  );
}

export default AnalyticsPage;
