import React from "react";

function ButtonComponent(
  { type = "button", className = "", children, ...rest },
  ref
) {
  return (
    <button type={type} className={className} ref={ref} {...rest}>
      {children}
    </button>
  );
}

// Exporting the forwarded Button component
export default React.forwardRef(ButtonComponent);
