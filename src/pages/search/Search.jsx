import React, { useEffect, useState,useRef } from "react";
import styles from "./Search.module.css";
import hederImg from "../../img/hederIco.jpg";
import { useTranslation } from "react-i18next";
import Filter from "../../components/filter/Filters";
import { useNavigate } from "react-router-dom";
import mapico from "../../icons/mapIco.png";
import heartico from "../../icons/heart.png";
import homeico from "../../icons/home.png";
import filterico from "../../icons/filter.png";

const Search = () => {
  const lang = localStorage.getItem("language");
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [isMapVisible, setIsMapVisible] = useState(false);
  const filter_item =localStorage.getItem("filter");

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const homereturn =()=>{
    navigate("/")
  }
  useEffect(() => {
    i18n.changeLanguage(lang);
  }, [i18n, lang]);

  const mainNav = () => {
    navigate("/");
  };
  const mapNav = () => {
    navigate("/map");
  };
  return (
    <>
      <div className={styles.full}>
        <div>
          <div className={styles.heder}>
            <img
              src={hederImg}
              alt="Next Flat"
              className={styles.animated_image}
              onClick={homereturn}
            />
          </div>
          <hr className={styles.bottomHR} />
        </div>
        <div className={styles.body}>
          <Filter isVisible={isVisible} toggleVisibility={toggleVisibility} filteritem={filter_item} />
          <div className={styles.bodyLeft}>
            <div className={styles.bodyLeftTop}>
              <button className={styles.bodyLeftTopBtn} onClick={mainNav}>
                <img
                  className={styles.bodyLeftTopBtnico}
                  alt=""
                  src={homeico}
                />
                {t("Home")}
              </button>
              <button className={styles.bodyLeftTopBtn}>
                <img
                  className={styles.bodyLeftTopBtnico}
                  alt=""
                  src={heartico}
                />
                {t("Favorites")}
              </button>
              <button className={styles.bodyLeftTopBtn} onClick={mapNav}>
                <img
                  className={styles.bodyLeftTopBtnicoM}
                  alt=""
                  src={mapico}
                />
                {t("Map")}
              </button>
              <button
                className={styles.bodyLeftTopBtnF}
                onClick={toggleVisibility}
              >
                {t("Filter")}
              </button>
            </div>
            <div className={styles.bodyLeftBody}>
              body
            </div>
          </div>
        </div>
      </div>

    </>
  );
};

export default Search;
