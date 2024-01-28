import React from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "../";

function ProtectedLayout() {
  return (
    <>
      <div style={{ display: "flex" }}>
        <Sidebar />
        {/* Render the respective Page if Authenticated  */}
        <Outlet />
      </div>
    </>
  );
}

export default ProtectedLayout;
