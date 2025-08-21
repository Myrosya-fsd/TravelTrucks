import React, { useState } from "react";
import Icon from "../Icon/Icon.jsx";
import styles from "./CatalogList.module.css";

const VehicleFilters = () => {
  const [activeEquipment, setActiveEquipment] = useState(null);
  const [activeVehicleType, setActiveVehicleType] = useState(null);

  const equipmentItems = [
    { id: 1, icon: "icon-wind", label: "AC" },
    { id: 2, icon: "icon-diagram", label: "Automatic" },
    { id: 3, icon: "icon-cup-hot", label: "Kitchen" },
    { id: 4, icon: "icon-tv", label: "TV" },
    { id: 5, icon: "icon-shower", label: "Bathroom" },
  ];

  const vehicleTypeItems = [
    { id: 1, icon: "icon-grid-3x3", label: "Van" },
    { id: 2, icon: "icon-grid", label: "Fully Integrated" },
    { id: 3, icon: "icon-grid-1x2", label: "Alcove" },
  ];

  const handleSearch = () => {
    setActiveEquipment(null);
    setActiveVehicleType(null);
    // додатковий код пошуку тут
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
                activeEquipment === item.id ? styles.active : ""
              }`}
              onClick={() => setActiveEquipment(item.id)}
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
              onClick={() => setActiveVehicleType(item.id)}
            >
              <Icon iconName={item.icon} width={32} height={32} />
              {item.label}
            </li>
          ))}
        </ul>
      </div>

      <button className={styles.Btn} onClick={handleSearch}>
        Search
      </button>
    </>
  );
};

export default VehicleFilters;
