import React from "react";
import { Link } from "react-router-dom";
import styles from "./HomePage.module.css";
import home1x from "/public/img/home-1x.jpg";
import home2x from "/public/img/home-2x.jpg";

const HomePage = () => {
  return (
    <section
      className="hero"
      style={{
        backgroundImage: `image-set(url(${home1x}) 1x, url(${home2x}) 2x)`,
        alt: "travel truck",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "top center",
        backgroundSize: "cover",
      }}
    >
      <div className={styles.overlay}>
        <h1 className={styles.title}>Campers of your dreams</h1>
        <p className={styles.text}>
          You can find everything you want in our catalog
        </p>
        <Link to="/catalog" className={styles.link}>
          View Now
        </Link>
      </div>
    </section>
  );
};

export default HomePage;
