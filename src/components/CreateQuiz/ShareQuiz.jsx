import React from "react";
import { useNavigate } from "react-router-dom";
import { IoIosClose } from "react-icons/io";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { selectShareLink } from "../../redux/slices/quizSlice";
import styles from "./ShareQuiz.module.css";

function ShareQuiz() {
  const navigate = useNavigate();
  const quizLink = useSelector(selectShareLink);

  const handleClose = () => {
    navigate(-1);
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(quizLink);
      toast.success("Link copied to clipboard!");
    } else {
      toast.error("Clipboard access not supported by your browser.");
    }
  };

  return (
    <section className={styles.backdrop}>
      <div className={styles.modalContainer}>
        <div className={styles.container}>
          <IoIosClose className={styles.closeIcon} onClick={handleClose} />
          <section className={styles.content}>
            <h1 className={styles.title}>
              Congratulations! Your Quiz is Published
            </h1>
            <p className={styles.infoText}>{quizLink}</p>
            <button
              className={`${styles.shareButton} ${styles.btn}`}
              onClick={handleShare}
            >
              Share Now
            </button>
          </section>
        </div>
      </div>
    </section>
  );
}

export default ShareQuiz;
