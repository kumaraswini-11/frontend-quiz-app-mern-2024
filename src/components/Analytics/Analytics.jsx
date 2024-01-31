import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { IoShareSocialSharp } from "react-icons/io5";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { selectUserData } from "../../redux/slices/authenticationSlice";
import { setAnalyticDetails } from "../../redux/slices/quizSlice";
import { analyticsByQuiz, deleteQuiz } from "../../api/quizService";
import styles from "./Analytics.module.css";
import PageLoader from "../PageLoader/PageLoader";
import { DeleteConfirmationModal } from "../";

function Analytics() {
  const [loading, setLoading] = useState(false);
  const [quizzes, setQuizzes] = useState([]);
  const userDetails = useSelector(selectUserData);
  const [showModal, setShowModal] = useState(false);
  const [quizId, setQuizId] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        if (userDetails?.user) {
          const apiResponse = await analyticsByQuiz(userDetails.user._id);

          const updatedQuizzes = apiResponse.data.quizzes.map((record) => {
            // updated the quizLink for each record
            return {
              ...record,
              quizLink: `${window.location.hostname}/play-quiz/${record.quizLink}`,
            };
          });

          setQuizzes(updatedQuizzes);
          dispatch(setAnalyticDetails(updatedQuizzes));
        }
      } catch (error) {
        toast.error(error.response?.user || error.message);
      } finally {
        setLoading(false);
      }
    })();
  }, [userDetails?.user]);

  const handleEdit = (id) => {
    // console.log(`Editing item with id: ${id}`);
    toast("Editing feature will be implemented soon.");
  };

  const handleDelete = async () => {
    // If confirm then only delete
    try {
      const res = await deleteQuiz(quizId);

      if (res.status < 400) {
        setQuizzes((prevQuizzes) =>
          prevQuizzes.filter((quiz) => quiz._id !== quizId)
        );
        toast.success("Quiz deleted successfully.");
      }
    } catch (error) {
      toast.error("Error deleting quiz");
    } finally {
      setShowModal(false);
    }
  };

  const handleCopyLink = (quizLink) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(quizLink);
      toast.success("Link copied to clipboard!");
    } else {
      toast.error("Clipboard access not supported by your browser.");
    }
  };

  return (
    <section className={styles.container}>
      {loading ? (
        <PageLoader />
      ) : (
        <>
          <h2 className={styles.heading}>Quiz Analytics</h2>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>S.No.</th>
                <th>Quiz Name</th>
                <th>Created On</th>
                <th>Impressions</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {quizzes.map((quiz, index) => (
                <tr key={quiz._id}>
                  <td>{index + 1}</td>
                  <td>{quiz.title}</td>
                  <td>{format(quiz?.createdAt, "dd MMM yyyy")}</td>
                  <td>{quiz.quizVisits}</td>
                  <td>
                    <div className={styles.icon}>
                      <FaEdit
                        className={styles.editIcon}
                        onClick={() => handleEdit(quiz._id)}
                      />
                      <RiDeleteBin5Fill
                        className={styles.deleteIcon}
                        onClick={() => {
                          setQuizId(quiz._id);
                          setShowModal(true);
                        }}
                      />
                      <IoShareSocialSharp
                        className={styles.shareIcon}
                        onClick={() => handleCopyLink(quiz.quizLink)}
                      />
                    </div>
                  </td>
                  <td>
                    <Link
                      to={`/app/question-wise-analyis/${quiz._id}`}
                      style={{ color: "black" }}
                    >
                      Question Wise Analysis
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
      <p className={styles.end}>{`{more quiz can be added}`}</p>

      {/* Show delete modal */}
      {showModal && (
        <DeleteConfirmationModal
          confirmLabel="Confirm Delete"
          cancelLabel="Cancel"
          onConfirm={handleDelete}
          onCancel={(e) => setShowModal(false)}
          onClose={(e) => setShowModal(false)}
        />
      )}
    </section>
  );
}

export default Analytics;
