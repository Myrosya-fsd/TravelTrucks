import React, { useState } from "react";
import Icon from "../Icon/Icon.jsx";
import styles from "./CatalogList.module.css";

const VehicleFilters = ({ onSearch }) => {
  const [activeEquipments, setActiveEquipments] = useState([]);
  const [activeVehicleType, setActiveVehicleType] = useState(""); // тільки один тип кузова

  const equipmentItems = [
    { id: "AC", icon: "icon-wind", label: "AC" },
    { id: "automatic", icon: "icon-diagram", label: "Automatic" },
    { id: "kitchen", icon: "icon-cup-hot", label: "Kitchen" },
    { id: "TV", icon: "icon-tv", label: "TV" },
    { id: "bathroom", icon: "icon-shower", label: "Bathroom" },
  ];

  const vehicleTypeItems = [
    { id: "van", icon: "icon-grid-3x3", label: "Van" },
    { id: "fullyIntegrated", icon: "icon-grid", label: "Fully Integrated" },
    { id: "alcove", icon: "icon-grid-1x2", label: "Alcove" },
  ];

  const toggleEquipment = (id) => {
    setActiveEquipments((prev) =>
      prev.includes(id) ? prev.filter((eq) => eq !== id) : [...prev, id]
    );
  };

  const toggleVehicleType = (id) => {
    setActiveVehicleType((prev) => (prev === id ? "" : id));
  };

  const handleSearchClick = () => {
    onSearch({
      equipments: activeEquipments,
      vehicleTypes: activeVehicleType ? [activeVehicleType] : [],
    });
  };

  return (
    <>
      <div className={styles.blockType}>
        <h3 className={styles.titleType}>Vehicle equipment</h3>
        <hr className={styles.typeDivider} />
        <ul className={styles.type}>
          {equipmentItems.map((item) => (
            <li
              key={item.id}
              className={`${styles.iconText} ${
                activeEquipments.includes(item.id) ? styles.active : ""
              }`}
              onClick={() => toggleEquipment(item.id)}
            >
              <Icon iconName={item.icon} width={32} height={32} />
              {item.label}
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.blockType}>
        <h3 className={styles.titleType}>Vehicle type</h3>
        <hr className={styles.typeDivider} />
        <ul className={styles.type}>
          {vehicleTypeItems.map((item) => (
            <li
              key={item.id}
              className={`${styles.iconText} ${
                activeVehicleType === item.id ? styles.active : ""
              }`}
              onClick={() => toggleVehicleType(item.id)}
            >
              <Icon iconName={item.icon} width={32} height={32} />
              {item.label}
            </li>
          ))}
        </ul>
      </div>

      <button className={styles.Btn} onClick={handleSearchClick}>
        Search
      </button>
    </>
  );
};

export default VehicleFilters;
