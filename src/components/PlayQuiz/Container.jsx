import React from "react";

const Container = ({ children, backColor }) => {
  const containerStyle = {
    background: backColor || "navy",
    color: "black",
    margin: "0 auto",
    minHeight: "100vh",
    // width: "100%",
  };

  return <main style={containerStyle}>{children}</main>;
};

export default Container;
