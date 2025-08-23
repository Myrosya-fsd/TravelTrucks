import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CatalogItem from "../CatalogItem/CatalogItem.jsx";
import styles from "./CatalogList.module.css";
import Icon from "../Icon/Icon.jsx";
import VehicleFilters from "./VehicleFilters.jsx";
import Loader from "../Loader/Loader.jsx";

const CatalogList = () => {
  const navigate = useNavigate();
  const [trucks, setTrucks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [city, setCity] = useState("");
  const [allItems, setAllItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [visibleCount, setVisibleCount] = useState(4);

  const [selectedEquipment, setSelectedEquipment] = useState(null);
  const [selectedType, setSelectedType] = useState(null);

  const handleChange = (e) => setCity(e.target.value);

  const handleBlur = () => {
    if (city) {
      let normalizedCity = city.split(",")[0].trim();
      normalizedCity =
        normalizedCity.charAt(0).toUpperCase() + normalizedCity.slice(1);

      setCity(`${normalizedCity}, Ukraine`);
    }
  };

  const handleSearch = ({ equipments = [], vehicleTypes = [] } = {}) => {
    const searchCity = city.split(",")[0].trim().toLowerCase();

    const nextFiltered = allItems.filter((item) => {
      const cityFromApi = item.location.split(",")[1]?.trim().toLowerCase();
      const matchesCity =
        searchCity === "" ? true : cityFromApi?.includes(searchCity);

      const matchesEquipment = equipments.every((eq) => {
        if (eq === "automatic") return item.transmission === "automatic";
        return item[eq] === true;
      });

      const matchesType =
        vehicleTypes.length === 0 ? true : vehicleTypes.includes(item.form);

      return matchesCity && matchesEquipment && matchesType;
    });

    setFilteredItems(nextFiltered);
    setTrucks(nextFiltered.slice(0, 4));
    setVisibleCount(4);
  };

  useEffect(() => {
    setLoading(true);
    axios
      .get("https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/campers")
      .then((res) => {
        const items = Array.isArray(res.data.items) ? res.data.items : res.data;
        setAllItems(items);
        setFilteredItems(items);
        setTrucks(items.slice(0, 4));
      })
      .catch((err) => console.error("Error fetching data:", err))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!loading && trucks.length === 0) {
      navigate("/not-found");
    }
  }, [loading, trucks, navigate]);

  const handleLoadMore = () => {
    setLoadingMore(true);
    setTimeout(() => {
      const newCount = visibleCount + 4;
      setTrucks(filteredItems.slice(0, newCount));
      setVisibleCount(newCount);
      setLoadingMore(false);
    }, 500);
  };

  if (loading) return <Loader />;

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
                placeholder="City, Ukraine"
                value={city}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
          </div>

          <VehicleFilters
            onSearch={handleSearch}
            onEquipmentChange={setSelectedEquipment}
            onTypeChange={setSelectedType}
          />
        </div>

        <div>
          <ul className={styles.trucksGrid}>
            {trucks.map((truck) => (
              <li key={truck.id}>
                <CatalogItem data={truck} page="catalog" />
              </li>
            ))}
          </ul>

          {loadingMore && <Loader />}

          {!loadingMore && visibleCount < filteredItems.length && (
            <div className={styles.loadMoreRow}>
              <button className={styles.btnLoad} onClick={handleLoadMore}>
                Load more
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CatalogList;
