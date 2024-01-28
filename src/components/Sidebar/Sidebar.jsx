import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { logoutSuccess } from "../../redux/slices/authenticationSlice";
import { ButtonComponent } from "../";
import { logout } from "../../api/authService";
import styles from "./Sidebar.module.css";

const Sidebar = () => {
  // Menu items for the navigation
  const menuItems = [
    { id: "dashboard", label: "Dashboard", path: "/app/dashboard" },
    { id: "analytics", label: "Analytics", path: "/app/analytics" },
    { id: "createquiz", label: "Create Quiz", path: "/app/create-quiz" },
  ];

  // Redux dispatch and React Router's navigate function
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Handler for the logout button
  const handleLogout = async () => {
    try {
      const response = await logout();

      if (response && response.data.success) {
        dispatch(logoutSuccess());
        toast.success("Logged out successfully.");
        navigate("/login");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <aside className={styles.sidebar}>
      {/* Header section with the QUIZZIE title */}
      <h1 className={styles.sidebarHeader}>QUIZZIE</h1>

      {/* Navigation section with menu items */}
      <nav className={styles.sidebarNav}>
        {menuItems.map((menuItem) => (
          <NavLink
            key={menuItem.id}
            to={menuItem.path}
            className={(isActive) =>
              `${styles.sidebarLink} ${isActive ? styles.active : ""}`
            }
          >
            {menuItem.label}
          </NavLink>
        ))}
      </nav>

      {/* Separator line */}
      <hr className={styles.sidebarSeparator} />

      {/* Logout button */}
      <ButtonComponent
        type="button"
        aria-label="Logout of the account"
        className={styles.sidebarLogout}
        onClick={handleLogout}
      >
        Logout
      </ButtonComponent>
    </aside>
  );
};

export default Sidebar;
