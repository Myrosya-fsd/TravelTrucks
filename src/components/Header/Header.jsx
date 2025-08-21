import React from "react";
import styles from "./Header.module.css";
import { NavLink } from "react-router-dom";
import logo from "/public/img/Logo.svg";

const Header = () => {
  const setActiveClass = ({ isActive }) =>
    isActive ? `${styles.link} ${styles.active}` : styles.link;

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <img src={logo} width={136} height={16} alt="Logo" />
      </div>
      <nav className={styles.nav}>
        <NavLink className={setActiveClass} to="/" end>
          Home
        </NavLink>
        <NavLink className={setActiveClass} to="/catalog">
          Catalog
        </NavLink>
      </nav>
      <div className={styles.spacer} /> {/* Порожній блок для симетрії */}
    </header>
  );
};

export default Header;
