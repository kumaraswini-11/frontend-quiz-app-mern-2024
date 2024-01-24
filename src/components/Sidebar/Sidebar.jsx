import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { logoutSuccess } from "../../redux/slices/authenticationSlice";
import { ButtonComponent } from "../";
import { logout } from "../../api/authService";
import { logoutSuccess } from "../../redux/slices/authenticationSlice";
import styles from "./Sidebar.module.css";

// Component for individual navigation links
const NavigationLink = ({ id, path, label, isActive, onClick }) => (
  <Link
    to={path}
    className={`${styles["sidebar-link"]} ${isActive ? styles.active : ""}`}
    onClick={() => onClick(id)}
  >
    {label}
  </Link>
);

const Sidebar = ({ activePage, handleNavigation }) => {
  // Menu items for the navigation
  const menuItems = [
    { id: "dashboard", label: "Dashboard", path: "/app" },
    { id: "analytics", label: "Analytics", path: "/analytics" },
    { id: "createquiz", label: "Create Quiz", path: "/create-quiz" },
  ];

  // Redux dispatch and React Router's navigate function
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Handler for the logout button
  const handleLogout = async () => {
    try {
      const response = await logout();

      if (response && response.success) {
        dispatch(logoutSuccess());
        toast.success("Logged out successfully.");
        navigate("/login");
      }
    } catch (error) {
      toast.error(error.response?.data || error.message);
    }
  };

  return (
    <aside className={styles.sidebar}>
      {/* Header section with the QUIZZIE title */}
      <h1 className={styles["sidebar-header"]}>QUIZZIE</h1>

      {/* Navigation section with menu items */}
      <nav className={styles["sidebar-nav"]}>
        {menuItems.map((menuItem) => (
          <NavigationLink
            key={menuItem.id}
            {...menuItem}
            isActive={activePage === menuItem.id}
            onClick={handleNavigation}
          />
        ))}
      </nav>

      {/* Separator line */}
      <hr className={styles["sidebar-separator"]} />

      {/* Logout button */}
      <ButtonComponent
        type="button"
        aria-label="Logout of the account"
        className={styles["sidebar-logout"]}
        onClick={handleLogout}
      >
        Logout
      </ButtonComponent>
    </aside>
  );
};

export default Sidebar;
