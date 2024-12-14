import React, { useState, useEffect } from "react";
import styles from "./Heder.module.css";
import userIco from "../../icons/userIco.png";
import envelopeIco from "../../icons/envelope.png";
import magnifierIco from "../../icons/magnifierIco.png";
import Badge from '@mui/material/Badge';
import { useTranslation } from "react-i18next";
import LanguageButton from "../button/languageToggle/languageButton";
import hederImg from "../../img/hederIco.jpg";
import AccauntMenu from "../../components/userSetting/userSetting";
import DropDown from "../../components/DropDownMenu/DropDownMenu";
import { useNavigate } from "react-router-dom";
import LanguageButton2 from "../button/languageButton2/langageButton2";

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
            <div className={styles.dropdownIcons}>
              <LanguageButton2/>
            
              
              <AccauntMenu/>
            </div>
            <div className={styles.DropDownMenue}>
              <DropDown scrollToBottomm={scrollToBottom}/>
            </div>



          </div>
        </div>
        <hr className={styles.bottomHR} />
      </div>
    </>
  );
};

export default Heder;
