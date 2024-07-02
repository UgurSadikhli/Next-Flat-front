import React, { useState, useEffect } from "react";
import styles from "./Detail.module.css";
import hederImg from "../../img/hederIco.jpg";
import backIco from "../../../src/icons/back.png";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

const DetailPage = () => {
  const navigate = useNavigate();
  const lang = localStorage.getItem("language");
  const { t, i18n } = useTranslation();
  const { Productid } = useParams();

  useEffect(() => {
    i18n.changeLanguage(lang);
  }, [i18n, lang]);

  const homereturn = () => {
    navigate("/");
  };

  return (
    <div className={styles.mainC}>
      <div className={styles.mainB}>
        <div className={styles.headerContainer}>
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
        <div className={styles.top}>
          <button
            className={styles.backbtn}
            onClick={() => navigate("/search")}
          >
            <img className={styles.backIco} alt="" src={backIco} />
            {t("Back")}
          </button>
        </div>
      </div>
      <div className={styles.body}>
        <div className={styles.left}>
          <div className={styles.imageConteiner}></div>
          <div className={styles.mainImage}></div>
        </div>
        <div className={styles.right}>
          <div className={styles.userDetail}>
            <span className={styles.userDetailName}>Ugur Sadikli</span>
            <img src="" alt="User Img" />
          </div>
          <div className={styles.descripText}></div>
          <div className={styles.btnGroup}></div>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
