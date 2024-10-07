import React, { useState, useEffect } from "react";
import styles from "./Heder.module.css";
import userIco from "../../icons/userIco.png";
import cartIco from "../../icons/cartIco.png";
import magnifierIco from "../../icons/magnifierIco.png";
import logoIco from "../../icons/logoIco.png";
import menuIco from "../../icons/menu.png";
import { useTranslation } from "react-i18next";
import LanguageButton from "../button/languageToggle/languageButton";
import hederImg from "../../img/hederIco.jpg";
import { useNavigate } from "react-router-dom";

const Heder = ({ scrollToBottom }) => {
  const lang = localStorage.getItem("language");
  const { t, i18n } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    i18n.changeLanguage(lang);
  }, [i18n, lang]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  const loginNav = () => {
    navigate("/search");
  };
  const detail = () => {
    navigate("/detail/2");
  };
  const handleClickRent =() => {
    navigate("/search");
    localStorage.setItem("filter","rental");
  };
  return (
    <>
      <div className={styles.main}>
        <div className={styles.top}>
          <img src={hederImg} alt="Next Flat" className={styles.animated_image} />
          <div className={`${styles.right} ${menuOpen ? styles.showMenu : ''}`}>
            <span onClick={handleClickRent}>{t("Rent Apartment")}</span>
            <span onClick={loginNav}>{t("Search")}</span>
            <span onClick={detail}>{t("Filter")}</span>
            <span onClick={scrollToBottom}>{t("Apartments")}</span>
            <span>{t("Cart")}</span>
          </div>
          <div className={styles.left}>
            <button className={styles.menuButton} onClick={toggleMenu}>
              <img src={menuIco} className={styles.menuButtonimg} alt="Menu" />
            </button>
            <div className={`${styles.dropdownIcons} ${menuOpen ? styles.showIcons : ''}`}>
             <LanguageButton />
              <img src={magnifierIco} className={styles.menuButtonimg1} onClick={loginNav} alt="Search" />
              <img src={cartIco} className={styles.menuButtonimg1} alt="Cart" />
              <img src={userIco} className={styles.menuButtonimg1} alt="User" />
            </div>
          </div>
        </div>
        <hr className={styles.bottomHR} />
      </div>
    </>
  );
};

export default Heder;
