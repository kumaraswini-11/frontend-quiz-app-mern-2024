import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { fetchQuestionWiseAnalytics } from "../api/quizService";
import { selectAnalyticDetails } from "../redux/slices/quizSlice";
import styles from "../styles/QuestionWiseAnalysisPage.module.css";
import { PageLoader } from "../components";

function QuestionWiseAnalysisPage() {
  const { quizId } = useParams();
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState([]);

  const analyticDetails = useSelector(selectAnalyticDetails);
  const analyticDetail = analyticDetails.find(
    (details) => details._id === quizId
  );

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    (async () => {
      setLoading(true);
      try {
        const response = await fetchQuestionWiseAnalytics(quizId, signal);
        if (response.success) {
          setQuestions(response.data.questionDetails);
        }
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    })();

    return () => {
      // Cancel the request when the component unmounts
      controller.abort();
    };
  }, [quizId]);

  if (!analyticDetail) {
    toast("This quiz has been deleted.");
    // navigate("/app/analytics");
    return null;
  }

  return (
    <section className={styles.container}>
      {/* Header Part */}
      <div className={styles.headerContainer}>
        <h2>{`${analyticDetail.title} Question Analysis`}</h2>
        <p>
          <span>
            {` Created on: ${format(analyticDetail.createdAt, "dd MMM yyyy")}`}
          </span>
          <span>{`Impressions: ${analyticDetail.quizVisits}`} </span>
        </p>
      </div>

      {/* Body Part */}
      <div className={styles.bodyContainer}>
        {questions.map((question, qIndex) => (
          <div
            key={`${question._id} + ${qIndex}`}
            className={styles.bodySubContainer}
          >
            <p>{`Q.${qIndex + 1} ${question.questionText}`}</p>

            <div className={styles.optionsContainer}>
              <div className={styles.subOptionsContainer}>
                <div className={styles.option}>
                  <label>{question.totalAttempted}</label>
                  <label>People Attempted the question</label>
                </div>
                <div className={styles.option}>
                  <label>{question.correctResponses}</label>
                  <label>People Answered correctly</label>
                </div>
                <div className={styles.option}>
                  <label>{question.incorrectResponses}</label>
                  <label>People Answered incorrectly</label>
                </div>
              </div>
            </div>

            <div className={styles.hrContainer}>
              <hr className={styles.hrLine} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default QuestionWiseAnalysisPage;
