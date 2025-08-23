import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./NotFoundPage.module.css";

const NotFoundPage = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1); // повертає на попередню сторінку
  };

  return (
    <main className={styles.mainContainer}>
      <h2 className={styles.title}>No found...</h2>
      <button className={styles.goBackBtn} onClick={goBack}>
        Go Back
      </button>
    </main>
  );
};

export default NotFoundPage;
