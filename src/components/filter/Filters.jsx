import React, { useState, useEffect } from "react";
import styles from "./Filters.module.css";
import { useTranslation } from "react-i18next";

const Filters = ({ isVisible, toggleVisibility, filteritem }) => {
  const lang = localStorage.getItem("language");
  const { t, i18n } = useTranslation();

  const initialFilters = {
    apartmentSize: {
      bedroom_1: filteritem === "One",
      bedroom_2: filteritem === "Two",
      bedroom_3: filteritem === "bedroom_3",
    },
    showOnly: {
      apartmentList: filteritem === "apartmentList",
      discounted: filteritem === "discounted",
      available: filteritem === "available",
      rental: filteritem ==="rental"
    },
    neighborhoodAmenities: {
      localSchools: filteritem === "localSchools",
      parking: filteritem === "parking",
      park: filteritem === "park",
    },
    apartmentType: {
      duplex: filteritem === "Duplex",
      Studio: filteritem === "Studio",
      loft: filteritem === "Loft",
      Penthouse: filteritem === "Penthouse",
    },
  };

  const [filters, setFilters] = useState(initialFilters);

  useEffect(() => {
    setFilters(initialFilters);
  }, [filteritem]);

  const handleChange = (category, filter) => {
    setFilters((prevState) => ({
      ...prevState,
      [category]: {
        ...prevState[category],
        [filter]: !prevState[category][filter],
      },
    }));
  };

  const clearFilters = () => {
    localStorage.removeItem("filter");
    setFilters(initialFilters);
    window.location.reload();
  };
  useEffect(() => {
    i18n.changeLanguage(lang);
  }, [i18n, lang]);

  return (
    <div className={styles.mainDiv}>
      <div className={`${styles.filters} ${isVisible ? styles.visible : ""}`}>
        <div className={styles.filterCategory}>
          <h3>{t("Apartment size")}</h3>
          <label>
            <input
              type="checkbox"
              checked={filters.apartmentSize.bedroom_1}
              onChange={() => handleChange("apartmentSize", "bedroom_1")}
            />
            {t("1 bedroom")}
          </label>
          <label>
            <input
              type="checkbox"
              checked={filters.apartmentSize.bedroom_2}
              onChange={() => handleChange("apartmentSize", "bedroom_2")}
            />
            {t("2 bedrooms")}
          </label>
          <label>
            <input
              type="checkbox"
              checked={filters.apartmentSize.bedroom_3}
              onChange={() => handleChange("apartmentSize", "bedroom_3")}
            />
            {t("3 and more bedrooms")}
          </label>
        </div>

        <div className={styles.filterCategory}>
          <h3>{t("Show only")}</h3>
          <label>
            <input
              type="checkbox"
              checked={filters.showOnly.apartmentList}
              onChange={() => handleChange("showOnly", "apartmentList")}
            />
            {t("Apartment Listings")}
          </label>
          <label>
            <input
              type="checkbox"
              checked={filters.showOnly.discounted}
              onChange={() => handleChange("showOnly", "discounted")}
            />
            {t("Discounted")}
          </label>
          <label>
            <input
              type="checkbox"
              checked={filters.showOnly.available}
              onChange={() => handleChange("showOnly", "available")}
            />
            {t("Available")}
          </label>
          <label>
            <input
              type="checkbox"
              checked={filters.showOnly.rental}
              onChange={() => handleChange("showOnly", "rental")}
            />
            {t("Rental")}
          </label>
        </div>

        <div className={styles.filterCategory}>
          <h3>{t("Neighborhood Amenities")}</h3>
          <label>
            <input
              type="checkbox"
              checked={filters.neighborhoodAmenities.localSchools}
              onChange={() =>
                handleChange("neighborhoodAmenities", "localSchools")
              }
            />
            {t("Local Schools")}
          </label>
          <label>
            <input
              type="checkbox"
              checked={filters.neighborhoodAmenities.parking}
              onChange={() => handleChange("neighborhoodAmenities", "parking")}
            />
            {t("Parking")}
          </label>
          <label>
            <input
              type="checkbox"
              checked={filters.neighborhoodAmenities.park}
              onChange={() => handleChange("neighborhoodAmenities", "park")}
            />
            {t("Park")}
          </label>
        </div>

        <div className={styles.filterCategory}>
          <h3>{t("Apartment Type")}</h3>
          <label>
            <input
              type="checkbox"
              checked={filters.apartmentType.duplex}
              onChange={() => handleChange("apartmentType", "duplex")}
            />
            {t("Duplex")}
          </label>
          <label>
            <input
              type="checkbox"
              checked={filters.apartmentType.loft}
              onChange={() => handleChange("apartmentType", "loft")}
            />
            {t("Loft")}
          </label>
          <label>
            <input
              type="checkbox"
              checked={filters.apartmentType.Studio}
              onChange={() => handleChange("apartmentType", "Studio")}
            />
            {t("Studio")}
          </label>
          <label>
            <input
              type="checkbox"
              checked={filters.apartmentType.Penthouse}
              onChange={() => handleChange("apartmentType", "Penthouse")}
            />
            {t("Penthouse")}
          </label>
        </div>
        <div className={styles.ButtonDiv}>
          <button className={styles.clearButton} onClick={clearFilters}>
            {t("Clear Filters")}
          </button>
          <button className={styles.applyButton}>{t("Apply")}</button>
        </div>
      </div>
    </div>
  );
};

export default Filters;
