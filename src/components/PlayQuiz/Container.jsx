import React from "react";

const Container = ({ children, backColor }) => {
  const containerStyle = {
    background: backColor || "#ccc",
    width: "100%",
    minHeight: "100vh",
    padding: "20px",
    boxSizing: "border-box",
  };

  return <section style={containerStyle}>{children}</section>;
};

export default Container;
