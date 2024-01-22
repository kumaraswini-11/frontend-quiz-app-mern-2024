import React, { forwardRef, useId } from "react";

const InputComponent = forwardRef(function Input(
  {
    prevLabel,
    prevLabelClassName = "",
    type = "text",
    className = "",
    ariaLabelledby = "",
    children,
    ...rest
  },
  ref
) {
  // Generate a unique ID for the input element
  const generatedId = useId();

  return (
    <div className="">
      {/* Rendering a previous label if the 'label' prop is provided */}
      {prevLabel && (
        <label htmlFor={generatedId} className={prevLabelClassName}>
          <span>{prevLabel}</span>
        </label>
      )}

      {/* Input element with specified styling and attributes */}
      <input
        type={type}
        className={className}
        id={generatedId}
        ref={ref}
        autoComplete="off"
        aria-labelledby={ariaLabelledby || (prevLabel && generatedId)}
        {...rest}
      />
      {children}
    </div>
  );
});

export default InputComponent;
