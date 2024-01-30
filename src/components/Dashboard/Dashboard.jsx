import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { enUS } from "date-fns/locale";
import { FaRegEye } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  selectIsAuthenticated,
  selectUserData,
} from "../../redux/slices/authenticationSlice";
import { analyticsByUser, analyticsByQuiz } from "../../api/quizService";
import styles from "./Dashboard.module.css";
import PageLoader from "../PageLoader/PageLoader";

function Dashboard() {
  const [loading, setLoading] = useState(false);
  const [quizAnalytics, setQuizAnalytics] = useState([]);
  const [userAnalyticsUI, setUserAnalyticsUI] = useState([]);
  const userDetails = useSelector(selectUserData);

  const analyticsDummyDetails = [
    { message: "Quiz Created", color: "orangered" },
    { message: "Questions Created", color: "rgb(51, 172, 51)" },
    { message: "Total Impressions", color: "rgb(43, 43, 202)" },
  ];
  const isAlreadyLoggedIn = useSelector(selectIsAuthenticated);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    setLoading(true);

    // IIFE (Immediately Invoked Function Expression)
    (async () => {
      try {
        // Get user analytics details
        const userAnalytics = await analyticsByUser(
          userDetails?.user._id,
          signal
        );

        const mergedDetails = analyticsDummyDetails.map((detail, index) => ({
          total: userAnalytics.data[Object.keys(userAnalytics.data)[index]],
          ...detail,
        }));
        setUserAnalyticsUI(mergedDetails);

        // Get quiz analytics details
        const response = await analyticsByQuiz(userDetails.user._id, signal);
        setQuizAnalytics(response.data.quizzes);
      } catch (error) {
        // toast.error(error.message);
        // console.log(error);
      } finally {
        setLoading(false);
      }
    })();

    // Cleanup
    return () => {
      // console.log("Abort");
      controller.abort();
    };
  }, [userDetails]);

  return loading ? (
    <PageLoader />
  ) : (
    <section className={styles.dashboardContainer}>
      {/* Analytics based on the User */}
      <div className={styles.userDetails}>
        {userAnalyticsUI.map((item, index) => (
          <div
            key={index}
            className={styles.colorBox}
            style={{ color: item.color }}
          >
            {/* totalQuizzes,  totalQuestions, totalQuizVisitors - all these values merged as 'total'*/}
            <p className={styles.count}>{item.total}</p>
            <p className={styles.message}>{item.message}</p>
          </div>
        ))}
      </div>

      {/* Quiz wise details */}
      <div className={styles.quizDetails}>
        <h1 className={styles.quizDetailsHeader}>Trending Quizs</h1>
        {quizAnalytics ? (
          <div className={styles.quizCardContainer}>
            {quizAnalytics.map((quiz, index) => (
              <div key={index} className={styles.quizCard}>
                <div className={styles.quizInfo}>
                  <h2 className={styles.quizTitle}>{quiz.title}</h2>
                  <label className={styles.views}>
                    {quiz.quizVisits}
                    <FaRegEye style={{ color: "orange" }} />
                  </label>
                </div>
                <label className={styles.createdDate}>
                  {` Created on: ${format(quiz?.createdAt, "dd MMM yyyy", {
                    locale: enUS,
                  })}`}
                </label>
              </div>
            ))}
          </div>
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
