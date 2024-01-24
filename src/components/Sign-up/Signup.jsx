import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ButtonComponent, InputComponent } from "..";
import styles from "./Signup.module.css";
import { signup } from "../../api/authService";

const Signup = () => {
  const formRef = useRef();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // useEffect for initial setup
  useEffect(() => {
    // Set focus on the form on page load
    formRef.current.focus();
  }, [navigate]);

  // Handle input change
  const handleChange = ({ target }) => {
    const { name, value } = target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handle form submission
  const handleOnSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);

    // Validate password match
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const response = await signup({
        fullName: formData.name,
        email: formData.email,
        password: formData.password,
      });

      if (response && response.success) {
        toast.success(
          "Account created successfully! Redirecting to login page..."
        );
        navigate("/login");
      }
    } catch (error) {
      // Handle error at the component level if needed
      toast.error(error.response?.data || error.message);
    } finally {
      setLoading(false); // Corrected from setLoading(true)
    }
  };

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>QUIZZIE</h1>
      <div className={styles.navigation}>
        <nav className={styles.link}>Sign Up</nav>
        <nav className={styles.link}>Login</nav>
      </div>
      <form ref={formRef} onSubmit={handleOnSubmit}>
        {/* Input fields */}
        {["name", "email", "password", "confirmPassword"].map((fieldName) => (
          <InputComponent
            key={fieldName}
            prevLabel={fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}
            prevLabelClassName={styles.label}
            type={fieldName.includes("Password") ? "password" : "text"}
            className={styles.input}
            ariaLabelledby={fieldName}
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
          className={styles.button}
          disabled={loading}
        >
          {loading ? "Sign Up..." : "Sign Up"}
        </ButtonComponent>
      </form>
    </main>
  );
};

export default Signup;
