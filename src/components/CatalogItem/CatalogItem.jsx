import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./CatalogItem.module.css";
import Icon from "../Icon/Icon.jsx";

const CatalogItem = ({ data }) => {
  const { gallery, name, price, rating, location, description, id } = data;
  const navigate = useNavigate();
  const [isLiked, setIsLiked] = useState(false);

  const { transmission, engine, kitchen, AC, bathroom } = data;

  const featuresList = [
    {
      key: "transmission",
      value: transmission === "automatic",
      label: "Automatic",
      icon: "icon-diagram",
      iconType: "fill",
    },
    {
      key: "engine",
      value: engine,
      label: engine.charAt(0).toUpperCase() + engine.slice(1),
      icon: "icon-engine",
      iconType: "fill",
    },
    {
      key: "kitchen",
      value: kitchen,
      label: "Kitchen",
      icon: "icon-cup-hot",
      iconType: "fill",
    },
    {
      key: "AC",
      value: AC,
      label: "AC",
      icon: "icon-wind",
      iconType: "fill",
    },
    {
      key: "bathroom",
      value: bathroom,
      label: "Bathroom",
      icon: "icon-shower",
      iconType: "fill",
    },
  ];

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    if (savedFavorites.includes(id)) {
      setIsLiked(true);
    }
  }, [id]);

  const handleLikeClick = () => {
    const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];

    let updatedFavorites;
    if (isLiked) {
      updatedFavorites = savedFavorites.filter((favId) => favId !== id);
    } else {
      updatedFavorites = [...savedFavorites, id];
    }

    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    setIsLiked(!isLiked);
  };

  const handleShowMore = () => {
    window.open(`/truck/${id}`, "_blank");
  };

  return (
    <div className={styles.catalogItem}>
      <img
        className={styles.catalogItem__image}
        src={gallery[0].thumb}
        alt={name}
        onClick={handleShowMore}
        style={{ cursor: "pointer" }}
      />

      <div className={styles.catalogItem__content}>
        <div className={styles.catalogItem__header}>
          <h2 className={styles.name}>
            {name.length > 30 ? name.slice(0, 30) + "..." : name}
          </h2>
          <div className={styles.informPrice}>
            <span className={styles.price}>€{price.toFixed(2)}</span>
            <div onClick={handleLikeClick} style={{ cursor: "pointer" }}>
              <Icon
                iconName={isLiked ? "icon-Property" : "icon-heard"}
                width={20}
                height={20}
              />
            </div>
          </div>
        </div>

        <div className={styles.inform}>
          <div className={styles.iconLocat}>
            <Icon iconName="icon-Rating" width={20} height={20} />
            <span>
              {rating} ({data.reviews.length} Reviews)
            </span>
          </div>

          <div className={styles.iconLocat}>
            <svg width="16" height="16">
              <Icon iconName="icon-map" width={16} height={16} />
            </svg>
            <span>{location}</span>
          </div>
        </div>

        <p className={styles.catalogItem__description}>
          {description.length > 60
            ? description.slice(0, 60) + "..."
            : description}
        </p>

        <ul className={styles.catalog_Item}>
          {featuresList
            .filter((item) => item.value)
            .map((item) => (
              <li key={item.key} className={styles.iconText}>
                <Icon
                  iconName={item.icon}
                  width={20}
                  height={20}
                  iconType={item.iconType}
                />
                {item.label}
              </li>
            ))}
        </ul>

        <button className={styles.Btn} onClick={handleShowMore}>
          Show more
        </button>
      </div>
    </div>
  );
};

export default CatalogItem;
