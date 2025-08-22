import React from "react";
import { useOutletContext } from "react-router-dom";
import Icon from "../Icon/Icon.jsx";
import styles from "./Reviews.module.css";

const Reviews = () => {
  const { truck } = useOutletContext();
  const { reviews } = truck;

  return (
    <div className={styles.reviews}>
      <ul className={styles.reviewList}>
        {reviews.map((review, index) => (
          <li key={index} className={styles.reviewItem}>
            <div className={styles.reviewCard}>
              <div className={styles.avatar}>
                {review.reviewer_name.charAt(0).toUpperCase()}
              </div>

              <div className={styles.reviewContent}>
                <div className={styles.reviewHeader}>
                  <p className={styles.reviewerName}>{review.reviewer_name}</p>
                  <div className={styles.stars}>
                    {Array.from({ length: 5 }).map((_, i) =>
                      i < review.reviewer_rating ? (
                        <Icon
                          key={i}
                          iconName="icon-Rating" // жовта зірка
                          width={20}
                          height={20}
                        />
                      ) : (
                        <Icon
                          key={i}
                          iconName="icon-Rating1" // сіра зірка
                          width={20}
                          height={20}
                        />
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>
            <p className={styles.comment}>{review.comment}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Reviews;
