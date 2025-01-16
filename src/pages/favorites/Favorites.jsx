import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import backIco from "../../../src/icons/back.png";
import styles from "./Favorites.module.css"
import hederImg from "../../img/hederIco.jpg";
import Card from "../../components/card/card"
import { CircularProgress, Box } from '@mui/material';


const FavoritesPage = () => {
  const lang = localStorage.getItem("language");
  const { t, i18n } = useTranslation();  
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);
  const [propertiesStatus, setPropertiesStatus] = useState("idle");
  const [error, setError] = useState(null);
  const [user1, setUser] = useState(null);


   useEffect(() => {
      i18n.changeLanguage(lang); 
      
      const user = JSON.parse(localStorage.getItem("user")); 

const fetchUserDataAndFavorites = async () => {
  if (!user?.id) { 
    setPropertiesStatus("no_login");
    return;
  }

  try {

    const userResponse = await fetch(`https://api.nextflat.my/users/${user.id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!userResponse.ok) {
      throw new Error(`Failed to fetch user data: ${userResponse.statusText}`);
    }

    const userData = await userResponse.json();
    console.log("User Data:", userData);

  
    const { fav_apartments } = userData;

    if (!fav_apartments || fav_apartments.length === 0) {
      console.log("No favorite apartments found.");
      setPropertiesStatus("no_favorites");
      return;
    }

 
    setPropertiesStatus("loading");

    const favoriteProperties = await Promise.all(
      fav_apartments.map(async (id) => {
        const apartmentResponse = await fetch(`https://api.nextflat.my/apartments/${id}`);
        if (!apartmentResponse.ok) {
          throw new Error(`Failed to fetch apartment with ID: ${id}`);
        }
        return apartmentResponse.json();
      })
    );

    setProperties(favoriteProperties);
    setPropertiesStatus("successful");
  } catch (error) {
    console.error("Error during data fetching:", error);
    setError(error.message);
    setPropertiesStatus("failed");
  }
};

fetchUserDataAndFavorites();



    }, [i18n, lang]);

    const homePage =()=> {
        navigate(`/main`); 
      };

      const handleCardClick = (property) => {
        navigate(`/detail/${property.id}`);
    
      };


      let content;
      if (propertiesStatus === "loading") {
        content = <Box
            sx={{
             position:"relative",
             left:50,
             top:50
          
            }}
          >
            <CircularProgress size={60} sx={{ color: 'goldenrod' }} />
          </Box>  ;
      } else if (propertiesStatus === "successful") {
        content = Array.isArray(properties) ? (
          properties.map((property, index) => (
            <Card
              key={index}
              image={property.image}
              title={property.title}
              author={property.author}
              price={property.price}
              currency={property.currency}
             onClick={() => handleCardClick(property)}
            />
          ))
        ) : (
          <div>No properties found</div>
        );
      } else if (propertiesStatus === "failed") {
        content = <div>{error}</div>;
      }else if (propertiesStatus === "no_favorites"){
        content =<div className={styles.ErrorMessageNOFav}>
            <span>{t("no_favorites")}</span>
            <button onClick={()=>navigate("/main")}>
                Home
            </button>
        </div>;
      }else if (propertiesStatus === "no_login"){
        content =<div className={styles.ErrorMessageNOFav}>
            <span>{t("not_logged_in")}</span>
            <button onClick={()=>navigate("/login")}>
                Login
            </button>
        </div>;
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
                onClick={homePage}
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
        <div className={styles.bodyAnnouncements}>
        {content}
        </div>

        </div>
    )
}

export default FavoritesPage;
