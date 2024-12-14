import React, { useState, useEffect } from "react";
import styles from "./AddAnnouncement.module.css";
import hederImg from "../../img/hederIco.jpg";
import backIco from "../../../src/icons/back.png";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Tab } from "bootstrap/dist/js/bootstrap.bundle.min";
import AccessibleTable from '../../components/table/Table';


const AddAnnouncements = () => {

  const navigate = useNavigate();
  const lang = localStorage.getItem("language");
  const { t, i18n } = useTranslation();

  useEffect(() => {
    i18n.changeLanguage(lang); 
  }, [i18n, lang]);

  const homereturn = () => {
    navigate("/");
  };

  const data = [
    { name: 'Frozen yoghurt', calories: 159, fat: 6.0, carbs: 24, protein: 4.0 },
    { name: 'Ice cream sandwich', calories: 237, fat: 9.0, carbs: 37, protein: 4.3 },
    { name: 'Eclair', calories: 262, fat: 16.0, carbs: 24, protein: 6.0 },
    { name: 'Eclair', calories: 262, fat: 16.0, carbs: 24, protein: 6.0 },
    { name: 'Eclair', calories: 262, fat: 16.0, carbs: 24, protein: 6.0 },
    { name: 'Eclair', calories: 262, fat: 16.0, carbs: 24, protein: 6.0 },
    { name: 'Eclair', calories: 262, fat: 16.0, carbs: 24, protein: 6.0 },
    { name: 'Eclair', calories: 262, fat: 16.0, carbs: 24, protein: 6.0 },
    { name: 'Eclair', calories: 262, fat: 16.0, carbs: 24, protein: 6.0 },
    { name: 'Eclair', calories: 262, fat: 16.0, carbs: 24, protein: 6.0 },
  ];
  


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
            onClick={() => navigate("/")}
          >
            <img className={styles.backIco} alt="" src={backIco} />
            {t("Back")}
          </button>
        </div>
      </div>
      <div className={styles.body}>
        <div className={styles.Btop}>
        <label className={styles.tableLabel}>{t("My announcements")}</label>
        <div className={styles.tableDiv}>
            
            <AccessibleTable rows={data}/>
        </div>
        </div>
       <hr/>
        <div className={styles.bottom}>

        </div>
       

       
      </div>
    </div>
  );
};

export default AddAnnouncements;
