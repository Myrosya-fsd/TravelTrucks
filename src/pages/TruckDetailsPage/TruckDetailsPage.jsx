import React, { useEffect, useState } from "react";
import { useParams, NavLink, Outlet } from "react-router-dom";
import axios from "axios";
import Icon from "../../components/Icon/Icon.jsx";
import styles from "./TruckDetailsPage.module.css";

const TruckDetailsPage = () => {
  const { id } = useParams();
  const [truck, setTruck] = useState(null);
  const [loading, setLoading] = useState(true);

  const [nameInput, setNameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [dateInput, setDateInput] = useState("");
  const [commentInput, setCommentInput] = useState("");

  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/campers/${id}`)
      .then((res) => setTruck(res.data))
      .catch((err) => console.error("Error fetching data:", err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!truck) return <p>Truck not found</p>;

  const { gallery, name, price, rating, location, description } = truck;

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      name: nameInput,
      email: emailInput,
      date: dateInput,
      comment: commentInput,
      truckId: id,
    };

    console.log("Sending form data:", formData);

    setNameInput("");
    setEmailInput("");
    setDateInput("");
    setCommentInput("");
  };

  return (
    <div className={styles.truckDetailsPage}>
      <div className={styles.catalogItem__content}>
        <div className={styles.catalogItem__header}>
          <h2 className={styles.name}>{name}</h2>
        </div>

        <div className={styles.inform}>
          <div className={styles.iconRatig}>
            <Icon iconName="icon-Rating" width={20} height={20} />
            <span>
              {rating} ({truck.reviews?.length || 0} Reviews)
            </span>
          </div>

          <div className={styles.iconLocat}>
            <svg width="16" height="16">
              <Icon iconName="icon-map" width={16} height={16} />
            </svg>
            <span>{location}</span>
          </div>
        </div>

        <div className={styles.informPrice}>
          <span className={styles.price}>€{price}</span>
        </div>

        <div className={styles.gallery}>
          {gallery?.map((img, index) => (
            <img
              key={index}
              className={styles.catalogItem__image}
              src={img.thumb}
              alt={`${name} ${index + 1}`}
            />
          ))}
        </div>

        <p className={styles.catalogItem__description}>{description}</p>
      </div>

      <div className={styles.tabs}>
        <NavLink
          to="features"
          className={({ isActive }) =>
            isActive ? `${styles.link} ${styles.active}` : styles.link
          }
        >
          Features
        </NavLink>

        <NavLink
          to="reviews"
          className={({ isActive }) =>
            isActive ? `${styles.link} ${styles.active}` : styles.link
          }
        >
          Reviews
        </NavLink>
      </div>

      <hr className={styles.typeDivider} />

      <div className={styles.bottomSection}>
        <Outlet context={{ truck }} />
        <div className={styles.contactBlock}>
          <h2 className={styles.contactBlockTitle}>Book your campervan now</h2>
          <p className={styles.contactBlockText}>
            Stay connected! We are always ready to help you
          </p>
          <form onSubmit={handleSubmit}>
            <input
              className={styles.contactBlockInput}
              type="text"
              placeholder="Name*"
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              required
            />
            <input
              className={styles.contactBlockInput}
              type="email"
              placeholder="Email*"
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              required
            />
            <input
              className={styles.contactBlockInput}
              type="text"
              placeholder="Booking date*"
              value={dateInput}
              onChange={(e) => setDateInput(e.target.value)}
              required
            />
            <textarea
              className={styles.contactBlockTextarea}
              placeholder="Comment"
              value={commentInput}
              onChange={(e) => setCommentInput(e.target.value)}
            ></textarea>
            <button className={styles.btn} type="submit">
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TruckDetailsPage;
