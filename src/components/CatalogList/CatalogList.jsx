import React, { useEffect, useState } from "react";
import CatalogItem from "../CatalogItem/CatalogItem.jsx";
import styles from "./CatalogList.module.css";
import Icon from "../Icon/Icon.jsx";
import VehicleFilters from "./VehicleFilters.jsx";

const CatalogList = () => {
  const [trucks, setTrucks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [city, setCity] = useState("");

  const handleChange = (e) => {
    setCity(e.target.value);
  };

  const handleBlur = () => {
    if (city && !city.endsWith(", Ukraine")) {
      setCity(`${city}, Ukraine`);
    }
  };

  const handleSearch = (filters) => {
    console.log("Filters selected:", filters);
    // тут робити запит з фільтрами
  };

  useEffect(() => {
    fetch("https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/campers")
      .then((res) => res.json())
      .then((data) => {
        const items = Array.isArray(data.items) ? data.items : [];
        setTrucks(items.slice(0, 4));
      })
      .catch((err) => console.error("Error fetching data:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading campers...</p>;
  if (!trucks.length) return <p>No campers found</p>;

  return (
    <div className={styles.catalogLoad}>
      <div className={styles.catalogList}>
        <div className={styles.trucksSort}>
          <div className={styles.locationBlock}>
            <label className={styles.location}>Location</label>
            <div className={styles.inputWrapper}>
              <Icon iconName="icon-map" width={16} height={16} />
              <input
                className={styles.input}
                type="text"
                placeholder="City"
                value={city}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
          </div>

          <VehicleFilters onSearch={handleSearch} />
        </div>

        <ul className={styles.trucksGrid}>
          {trucks.map((truck) => (
            <li key={truck.id}>
              <CatalogItem data={truck} page="catalog" />
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.loadMoreRow}>
        <button className={styles.btnLoad}>Load more</button>
      </div>
    </div>
  );
};

export default CatalogList;
