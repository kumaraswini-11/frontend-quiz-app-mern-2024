import React from "react";
import { useNavigate } from "react-router-dom";
import { IoIosClose } from "react-icons/io";
import styles from "./ShareQuiz.module.css";

function ShareQuiz() {
  const navigate = useNavigate();

  const handleClose = () => {
    navigate(-1);
  };

  return (
    <div className={styles.shareQuizContainer}>
      <div className={styles.modal}>
        <div className={styles.closeContainer}>
          <IoIosClose className={styles.closeIcon} onClick={handleClose} />
        </div>
        <section className={styles.content}>
          <h1 className={styles.title}>
            Congratulations! Your Quiz is Published
          </h1>
          <p className={styles.infoText}>
            Share your quiz with others and test their knowledge!
          </p>
          <button className={`${styles.shareButton} ${styles.btn}`}>
            Share Now
          </button>
        </section>
      </div>
    </div>
  );
}

export default ShareQuiz;
