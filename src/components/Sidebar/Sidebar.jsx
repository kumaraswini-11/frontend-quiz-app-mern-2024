import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { logoutSuccess } from "../../redux/slices/authenticationSlice";
import styles from "./Sidebar.module.css";
import { ButtonComponent } from "../";

const NavigationLink = ({ id, path, label, isActive, onClick }) => (
  <Link
    to={path}
    className={styles.link}
    onClick={() => onClick(id)}
    style={{
      fontWeight: isActive ? "bold" : "normal",
    }}
  >
    {label}
  </Link>
);

const Sidebar = ({ activePage, handleNavigation }) => {
  const menuItems = [
    { id: "dashboard", label: "Dashboard", path: "/dashboard" },
    { id: "analytics", label: "Analytics", path: "/analytics" },
    { id: "createquiz", label: "Create Quiz", path: "/create-quiz" },
  ];

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loginStatus = useSelector((store) => store.auth.status);

  const handleLogout = () => {
    if (loginStatus) {
      dispatch(logoutSuccess());
      toast.success("Logged out successfully.");
      navigate("/logout");
    }
  };

  return (
    <aside className={styles.sidebar}>
      <h1>QUIZZIE</h1>

      <nav>
        {menuItems.map((menuItem) => (
          <NavigationLink
            key={menuItem.id}
            id={menuItem.id}
            path={menuItem.path}
            label={menuItem.label}
            isActive={activePage === menuItem.id}
            onClick={handleNavigation}
          />
        ))}
      </nav>

      <hr />
      <ButtonComponent
        type="button"
        aria-label="Logout of the account"
        className={styles.button}
        onClick={handleLogout}
      >
        Logout
      </ButtonComponent>
    </aside>
  );
};

export default Sidebar;
