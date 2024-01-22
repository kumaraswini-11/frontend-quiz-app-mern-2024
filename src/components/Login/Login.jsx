import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loginSuccess } from "../../redux/slices/authenticationSlice";
import useAxios from "../../hooks/useAxios";
import { ButtonComponent, InputComponent } from "..";
import styles from "./Login.module.css";

function Login() {
  // Refs for input fields
  const inputEmailRef = useRef();
  const inputPasswordRef = useRef();

  // Hooks for navigation, dispatch, form data, and API call
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Extract authentication status using useSelector
  const isAlreadyLoggedIn = useSelector((store) => store.auth.status);

  // useEffect for initial setup
  useEffect(() => {
    if (isAlreadyLoggedIn) {
      toast("Already a logged-in user. Redirecting to 'Dashboard Page'");
      navigate("/dashboard");
    }
    // Set focus on the first input on page load
    inputEmailRef.current.focus();
  }, [isAlreadyLoggedIn, navigate]);

  // Event handler for input changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // API request setup using useAxios hook
  const baseUrl = "http://localhost:8080/api/v1/";
  const { response, error, loading, submitRequest } = useAxios({
    method: "POST",
    url: `${baseUrl}user/login`,
    data: formData,
    requestConfig: {
      headers: {
        "Content-Type": "application/json",
        "Content-Language": "en-US",
      },
    },
  });

  // Event handler for form submission
  const handleOnSubmit = async (event) => {
    event.preventDefault();

    try {
      // Submit the form - api call
      await submitRequest();

      // Dispatch the login success action with the received response data
      if (!loading && !error && response) {
        dispatch(loginSuccess(response));
        toast.success("User logged in successfully!");

        // Add a delay before navigation
        setTimeout(() => {
          navigate("/dashboard");
        }, 1000);
      }
    } catch (error) {
      // console.error("Error during form submission:", error);
      // toast.error("Login failed. Please check your credentials.");
    }
  };

  return (
    <form onSubmit={handleOnSubmit}>
      {error && <p className={styles.error}>{error}</p>}

      {/* Input fileds for email and password */}
      <InputComponent
        prevLabel="Email"
        prevLabelClassName={styles.label}
        type="email"
        className={styles.input}
        ariaLabelledby="Email"
        ref={inputEmailRef}
        required
        onChange={handleChange}
        name="email"
        autoComplete="off"
      />
      <InputComponent
        prevLabel="Password"
        prevLabelClassName={styles.label}
        type="password"
        className={styles.input}
        ariaLabelledby="Password"
        ref={inputPasswordRef}
        required
        onChange={handleChange}
        name="password"
        autoComplete="off"
      />

      {/* Login button component */}
      <ButtonComponent
        type="submit"
        aria-label="Logging into the account"
        className={styles.button}
        disabled={loading}
      >
        {loading ? "Logging in..." : "Login"}
      </ButtonComponent>
    </form>
  );
}
export default Login;
