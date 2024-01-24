import React, { useEffect, useState } from "react";
import { FaRegEye } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { selectUserData } from "../redux/slices/authenticationSlice";
import { analyticsByUser, analyticsByQuiz } from "../../api/quizService";
import styles from "./Dashboard.module.css";

function Dashboard() {
  const [quizAnalytics, setQuizAnalytics] = useState([]);
  const [userAnalyticsUI, setUserAnalyticsUI] = useState([]);
  const [loading, setLoading] = useState(false);
  const dummyDetails = [
    { message: "Quiz Created", color: "blue" },
    { message: "Questions Created", color: "green" },
    { message: "Total Impressions", color: "red" },
  ];
  const userDataId = useSelector((state) => selectUserData(state)?._id);

  // const dummyArrays = [
  //   { quizTitle: "Quiz 1", views: 1000, createdDate: "04 Sep, 2023" },
  //   { quizTitle: "Quiz 2", views: 800, createdDate: "10 Oct, 2023" },
  //   { quizTitle: "Quiz 3", views: 1200, createdDate: "15 Nov, 2023" },
  // ];

  useEffect(() => {
    setLoading(true);

    // IIFE (Immediately Invoked Function Expression)
    (async () => {
      try {
        if (userDataId) {
          const userAnalytics = await analyticsByUser(userDataId);
          setQuizAnalytics(await analyticsByQuiz(userDataId));

          const userAnalyticsUI = { ...userAnalytics, ...dummyDetails };
          setUserAnalyticsUI(userAnalyticsUI);
        }
      } catch (error) {
        toast.error(error.response?.data || error.message);
      } finally {
        setLoading(false);
      }
    })();
  }, [userDataId]);

  return (
    <section className={styles.dashboardContainer}>
      {/* Analytics based on the User */}
      <div className={styles.userDetails}>
        {userAnalyticsUI.map((item, index) => (
          <div
            key={index}
            className={styles.colorBox}
            style={{ backgroundColor: item.color }}
          >
            <p className={styles.message}>{item.message}</p>
            {/* Use actual data from userAnalytics instead of hardcoded values */}
            <p className={styles.count}>{item.quizVisits}</p>
          </div>
        ))}
      </div>

      {/* Quiz wise details */}
      <div className={styles.quizDetails}>
        {quizAnalytics ? (
          quizAnalytics.map((quiz, index) => (
            <div key={index} className={styles.quizCard}>
              <div className={styles.quizInfo}>
                <h2 className={styles.quizTitle}>{quiz.title}</h2>
                <label className={styles.views}>
                  {quiz.quizVisits} <FaRegEye style={{ color: "orange" }} />
                </label>
              </div>
              <label className={styles.createdDate}>
                Created on: {quiz.createdAt}
              </label>
            </div>
          ))
        ) : (
          <p style={{ color: "red" }}>
            You haven't created any Quiz. Click on "Create Quiz" to create your
            first Quiz.
          </p>
        )}
      </div>
    </section>
  );
}

export default Dashboard;
