import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loginSuccess } from "../../redux/slices/authenticationSlice";
import { ButtonComponent, InputComponent } from "..";
import { login } from "../../api/authService";
import styles from "./Login.module.css";

function Login() {
  // Ref for the form
  const formRef = useRef();

  // Hooks for navigation, dispatch
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // useEffect for initial setup
  useEffect(() => {
    // Set focus on the form on page load
    formRef.current.focus();
  }, [navigate]);

  // Event handler for input changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Event handler for form submission
  const handleOnSubmit = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);

      const response = await login(formData);

      // Only when successful
      if (response && response.success) {
        dispatch(loginSuccess(response.data));
        toast.success("User logged in successfully!");

        // Add a delay before navigation
        setTimeout(() => {
          navigate("/app/dashboard");
        }, 1000);
      }
    } catch (error) {
      // Display error message using toast
      toast.error(error.message);
    } finally {
      // Set loading to false regardless of success or failure
      setLoading(false);
    }
  };

  return (
    <form ref={formRef} onSubmit={handleOnSubmit} className={styles.formUi}>
      <div className={styles.formDivContainer}>
        {/* Input fields for email and password */}
        <InputComponent
          prevLabel="Email"
          prevLabelClassName={styles.label}
          type="email"
          className={styles.input}
          ariaLabelledby="Email"
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
          {loading ? "Login..." : "Login"}
        </ButtonComponent>
      </div>
    </form>
  );
}

export default Login;
