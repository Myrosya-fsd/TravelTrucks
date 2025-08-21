import React from "react";
import styles from "./CatalogItem.module.css";
import Icon from "../Icon/Icon.jsx";

const CatalogItem = ({ data }) => {
  const { gallery, name, price, rating, location, description } = data;

  return (
    <div className={styles.catalogItem}>
      <img
        className={styles.catalogItem__image}
        src={gallery[0].thumb}
        alt={name}
      />

      <div className={styles.catalogItem__content}>
        <div className={styles.catalogItem__header}>
          <h2 className={styles.name}>{name}</h2>
          <div className={styles.informPrice}>
            <span className={styles.price}>€{price}</span>
            <Icon iconName="icon-heard" width={20} height={20} />
          </div>
        </div>
        <div className={styles.inform}>
          <div className={styles.iconLocat}>
            <Icon iconName="icon-Rating" width={20} height={20} />
            <span>{rating} (Reviews)</span>
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

        <ul className={styles.catalogItem__features}>
          <li className={styles.iconText}>
            <Icon iconName="icon-diagram" width={20} height={20} />
            Automatic
          </li>
          <li className={styles.iconText}>
            <Icon iconName="icon-engine" width={20} height={20} />
            Petrol
          </li>
          <li className={styles.iconText}>
            <Icon iconName="icon-cup-hot" width={20} height={20} />
            Kitchen
          </li>
          <div className={styles.fullRow}>
            <li className={styles.iconText}>
              <Icon iconName="icon-wind" width={20} height={20} />
              AC
            </li>
          </div>
        </ul>
        <button className={styles.Btn}>Show more</button>
      </div>
    </div>
  );
};

export default CatalogItem;
