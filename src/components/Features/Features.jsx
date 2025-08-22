import React from "react";
import { useOutletContext } from "react-router-dom";
import Icon from "../Icon/Icon.jsx";
import styles from "./Features.module.css";

const Features = () => {
  const { truck } = useOutletContext();
  const {
    form,
    length,
    width,
    height,
    tank,
    consumption,
    transmission,
    AC,
    kitchen,
    radio,
    TV,
    refrigerator,
    microwave,
    gas,
    water,
    bathroom,
  } = truck;

  const featuresList = [
    {
      key: "transmission",
      value: transmission === "automatic",
      label: "Automatic",
      icon: "icon-diagram",
    },
    { key: "AC", value: AC, label: "AC", icon: "icon-wind" },
    { key: "kitchen", value: kitchen, label: "Kitchen", icon: "icon-cup-hot" },
    { key: "radio", value: radio, label: "Radio", icon: "icon-Vector" },
    { key: "TV", value: TV, label: "TV", icon: "icon-tv" },
    {
      key: "bathroom",
      value: bathroom,
      label: "Bathroom",
      icon: "icon-shower",
    },
    {
      key: "refrigerator",
      value: refrigerator,
      label: "Refrigerator",
      icon: "icon-fridge",
    },
    {
      key: "microwave",
      value: microwave,
      label: "Microwave",
      icon: "icon-microwave",
    },
    { key: "gas", value: gas, label: "Gas", icon: "icon-stove" },
    { key: "water", value: water, label: "Water", icon: "icon-water" },
  ];

  return (
    <div className={styles.features}>
      <ul className={styles.catalogItem__feature}>
        {featuresList
          .filter((item) => item.value)
          .map((item) => (
            <li key={item.key} className={styles.iconText}>
              <Icon iconName={item.icon} width={20} height={20} />
              {item.label}
            </li>
          ))}
      </ul>
      <div>
        <h3 className={styles.featuresTitle}>Vehicle details</h3>
        <hr className={styles.typeDivider} />
        <ul className={styles.featuresList}>
          {[
            { label: "Form", value: form },
            { label: "Length", value: length },
            { label: "Width", value: width },
            { label: "Height", value: height },
            { label: "Tank", value: tank },
            { label: "Consumption", value: consumption },
          ].map((item) => (
            <li key={item.label} className={styles.featuresItem}>
              <p className={styles.featuresItemText}>{item.label}</p>
              <p className={styles.featuresItemText}>{item.value}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Features;
