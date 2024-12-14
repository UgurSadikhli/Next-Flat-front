import React, { useState, useEffect } from "react";
import styles from "./Detail.module.css";
import hederImg from "../../img/hederIco.jpg";
import backIco from "../../../src/icons/back.png";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import Rating from '@mui/material/Rating';
import Carousel from '../../components/carousel/Carousel';
import cartIco from "../../icons/cartIco.png";

const DetailPage = () => {
  const { id } = useParams();
  const [apartment, setApartment] = useState(null);
  const [user, setUser] = useState(null);
  const [loadingApartment, setLoadingApartment] = useState(true);
  const [loadingUser, setLoadingUser] = useState(true);
  const navigate = useNavigate();
  const lang = localStorage.getItem("language");
  const { t, i18n } = useTranslation();
  const imagesArray = [
    "https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg",
    "https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnnFf6DXcgRxe71BOQm1orHpnKjJloo9c2jg&s",
  ];
  useEffect(() => {
    i18n.changeLanguage(lang); 
  }, [i18n, lang]);

  useEffect(() => {
    // Fetch apartment details
    if (id) {
      {/*http://localhost:3000/apartments/${id} */}
      fetch(`https://api.nextflat.my/apartments/${id}`)
        .then((response) => response.json())
        .then((data) => {
          setApartment(data);
          setLoadingApartment(false);

          // http://localhost:3000/users/${data.author_id}
          if (data.author_id) {
            fetch(`https://api.nextflat.my/users/${data.author_id}`)
              .then((response) => response.json())
              .then((userData) => {
                setUser(userData);
                setLoadingUser(false);
              })
              .catch((error) => {
                console.error("Error fetching user:", error);
                setLoadingUser(false);
              });
          }
        })
        .catch((error) => {
          console.error("Error fetching apartment:", error);
          setLoadingApartment(false);
        });
    }
  }, [id]);

  const homereturn = () => {
    navigate("/");
  };

  if (loadingApartment) {
    return <div>Loading apartment details...</div>;
  }

  if (!apartment) {
    return <div>Apartment not found</div>;
  }

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
          <div className={styles.mainImage}>
            <Carousel images={apartment.images} />
          </div>
        </div>
        <div className={styles.right}>
          <span className={styles.appartmentName}>{apartment.title}</span>
          <div className={styles.userDetail}>
            <img
              className={styles.userDetailIMG}
              src={user?.profile_image || "default_user_image_url"}
              alt="User Img"
            />
            <div className={styles.cityInfo}>
              <span className={styles.userDetailName}>
                {user ? `${user.name} ${user.surname}` : t("Owner Name")}
              </span>
              <span className={styles.userDetailCity}>
                {t("City")}: {apartment?.city || t("N/A")}
              </span>
              <Rating
                name="read-only"
                value={apartment.rating || 3}
                readOnly
                sx={{ fontSize: "16px" }}
              />
            </div>
          </div>
          <div className={styles.descripText}>
            {apartment.description || t("No Description Available.")}
          </div>
          <div className={styles.btnGroup}>
            <button className={styles.btnGroupCall}>
              <i className="bi bi-telephone"></i> {t("Call")}
            </button>
            <button className={styles.btnGroupBasket}>
              <i className="bi bi-cart-fill"></i>
            </button>
            <button className={styles.btnGroupFavorite}>
              <i className="bi bi-map-fill"></i>
            </button>
          </div>
          <div className={styles.appartmentpriceandvalute}>
            <span className={styles.appartmentprice}>
              {apartment.price || t("N/A")}
            </span>
            <span className={styles.appartmentpricevalute}>
              {t("AZN")}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
