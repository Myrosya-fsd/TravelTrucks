import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchVehicles } from "../../redux/vehiclesSlice";
import { setCity } from "../../redux/filtersSlice";
import VehicleFilters from "./VehicleFilters.jsx";
import CatalogItem from "../CatalogItem/CatalogItem.jsx";
import Loader from "../Loader/Loader.jsx";
import { useNavigate } from "react-router-dom";
import styles from "./CatalogList.module.css";

const CatalogList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { list: trucks, loading } = useSelector((state) => state.vehicles);
  const { city } = useSelector((state) => state.filters);
  const [visibleCount, setVisibleCount] = useState(4);

  useEffect(() => {
    dispatch(fetchVehicles());
  }, [dispatch]);

  const handleCityChange = (e) => {
    dispatch(setCity(e.target.value));
  };

  const handleCityBlur = () => {
    let value = city.trim();
    if (value) {
      value = value.charAt(0).toUpperCase() + value.slice(1);
      if (!value.toLowerCase().includes("ukraine")) {
        value = `${value}, Ukraine`;
      }
      dispatch(setCity(value));
    }
  };

  const handleSearch = () => {
    dispatch(fetchVehicles()).then((res) => {
      if (!res.payload || res.payload.length === 0) {
        navigate("/not-found");
      } else {
        setVisibleCount(4);
      }
    });
  };

  if (loading) return <Loader />;

  return (
    <div className={styles.catalogLoad}>
      <div className={styles.catalogList}>
        <div className={styles.trucksSort}>
          <div className={styles.locationBlock}>
            <label className={styles.location}>Location</label>
            <div className={styles.inputWrapper}>
              <input
                className={styles.input}
                type="text"
                placeholder="City, Ukraine"
                value={city}
                onChange={handleCityChange}
                onBlur={handleCityBlur}
              />
            </div>
          </div>

          <VehicleFilters onSearch={handleSearch} />
        </div>

        <div className={styles.trucksBlocs}>
          <ul className={styles.trucksGrid}>
            {trucks.slice(0, visibleCount).map((truck) => (
              <li key={truck.id}>
                <CatalogItem data={truck} page="catalog" />
              </li>
            ))}
          </ul>

          {visibleCount < trucks.length && (
            <div className={styles.loadMoreRow}>
              <button
                className={styles.btnLoad}
                onClick={() => setVisibleCount(visibleCount + 4)}
              >
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
