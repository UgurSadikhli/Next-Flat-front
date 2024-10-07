import React, { useState, useEffect } from "react";
import styles from "./Detail.module.css";
import hederImg from "../../img/hederIco.jpg";
import backIco from "../../../src/icons/back.png";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import Rating from '@mui/material/Rating';
import Carousel from '../../components/carousel/Carousel'
import cartIco from "../../icons/cartIco.png";

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
          <div className={styles.mainImage}><Carousel/></div>
        </div>
        <div className={styles.right}>
          <span className={styles.appartmentName}> Good Appartment</span>
          <div className={styles.userDetail}>
            <img className={styles.userDetailIMG} src="https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small_2x/user-profile-icon-free-vector.jpg" alt="User Img" />
            <div className={styles.cityInfo}> 
              <span className={styles.userDetailName}>Ugur Sadikli</span>
              <span className={styles.userDetailCity}>Baku, Az</span>
              <Rating name="read-only" value={3} readOnly  sx={{ fontSize: '16px',  }} />
            </div>
          </div>
          <div className={styles.descripText}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Integer ut sem eget dolor feugiat tincidunt. Curabitur venenatis, eros sit amet venenatis accumsan, arcu eros sagittis urna, at vehicula nibh ante vel quam. Vivamus laoreet, lacus sed luctus vehicula, enim justo felis.</div>
          <div className={styles.btnGroup}> 
             <button className={styles.btnGroupCall}><i class="bi bi-telephone"></i> Call</button>
             <button className={styles.btnGroupBasket}><i class="bi bi-cart-fill"></i></button>
             <button className={styles.btnGroupFavorite}>
             <i class="bi bi-map-fill"></i>
             </button>
          </div>
          <div className={styles.appartmentpriceandvalute}>
            <span className={styles.appartmentprice}>1000</span>
            <span className={styles.appartmentpricevalute}>AZN</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
