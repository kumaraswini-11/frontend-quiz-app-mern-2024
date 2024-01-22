import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import useAxios from "../../hooks/useAxios";
import { ButtonComponent, InputComponent } from "..";
import styles from "./Signup.module.css";

const Signup = () => {
  const inputNameRef = useRef();
  const inputEmailRef = useRef();
  const inputPasswordRef = useRef();
  const inputConfirmPasswordRef = useRef();
  const buttonRef = useRef();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Extract authentication status from the Redux store using useSelector
  const isAlreadyLoggedIn = useSelector((store) => store.auth.status);

  // useEffect for initial setup
  useEffect(() => {
    if (isAlreadyLoggedIn) {
      toast("Already a logged-in user. Redirecting to 'Dashboard Page'");
      navigate("/dashboard");
    }

    inputNameRef.current.focus();
  }, [isAlreadyLoggedIn, navigate]);

  // Handle input change
  const handleChange = ({ target }) => {
    const { name, value } = target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // API Call for Post request
  const baseUrl = "http://localhost:8080/api/v1/";
  const { response, error, loading, submitRequest } = useAxios({
    method: "POST",
    url: `${baseUrl}user/register`,
    data: {
      fullName: formData.name,
      email: formData.email,
      password: formData.password,
    },
  });

  // Handle form submission
  const handleOnSubmit = async (event) => {
    event.preventDefault();

    // Validate password match
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    // Submit the form - API call
    submitRequest();
  };

  // useEffect for success response
  useEffect(() => {
    if (!loading && !error && response) {
      toast.success("Account created successfully!");
      navigate("/login");
    }
  }, [loading, error, response, navigate]);

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>QUIZZIE</h1>
      <div className={styles.navigation}>
        <nav className={styles.link}>Sign Up</nav>
        <nav className={styles.link}>Login</nav>
      </div>
      <form onSubmit={handleOnSubmit}>
        {error && <p className={styles.error}>{error}</p>}
        {/* Input fileds */}
        {["name", "email", "password", "confirmPassword"].map((fieldName) => (
          <InputComponent
            key={fieldName}
            prevLabel={fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}
            prevLabelClassName={styles.label}
            type={fieldName.includes("Password") ? "password" : "text"}
            className={styles.input}
            ariaLabelledby={fieldName}
            ref={
              fieldName === "name"
                ? inputNameRef
                : fieldName === "email"
                ? inputEmailRef
                : fieldName === "password"
                ? inputPasswordRef
                : fieldName === "confirmPassword"
                ? inputConfirmPasswordRef
                : null
            }
            required
            onChange={handleChange}
            name={fieldName}
            autoComplete={
              fieldName.includes("Password") ? "new-password" : "off"
            }
          />
        ))}

        {/* Signup button component */}
        <ButtonComponent
          type="submit"
          aria-label="Create an account"
          ref={buttonRef}
          className={styles.button}
          disabled={loading}
        >
          {loading ? "Signing up..." : "Sign Up"}
        </ButtonComponent>
      </form>
    </main>
  );
};

export default Signup;
