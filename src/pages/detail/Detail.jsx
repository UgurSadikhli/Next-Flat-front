import React, { useState, useEffect } from "react";
import styles from "./Detail.module.css";
import hederImg from "../../img/hederIco.jpg";
import backIco from "../../../src/icons/back.png";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import Rating from '@mui/material/Rating';
import Carousel from '../../components/carousel/Carousel';
import Avatar from "@mui/material/Avatar";
import { CircularProgress, Box } from '@mui/material';



const DetailPage = () => {
  const { id } = useParams();
  const [apartment, setApartment] = useState(null);
  const [user, setUser] = useState(null);
  const [loadingApartment, setLoadingApartment] = useState(true);
  const [loadingUser, setLoadingUser] = useState(true);
  const navigate = useNavigate();
  const lang = localStorage.getItem("language");
  const { t, i18n } = useTranslation();
  const [isFavorited, setIsFavorited] = useState(false);
  const [properties, setProperties] = useState([]);
  const [propertiesStatus, setPropertiesStatus] = useState("idle");
  const [error, setError] = useState(null);

 
  
  const handlePhoneCall = () => {
    window.location.href = `tel:${user.phone_num}`;
  };


  const handleAddToFav = async () => {
    try {
     
      const user = JSON.parse(localStorage.getItem('user'));
  
      if (!user) {
        console.error('No user found in local storage');
        alert('Please log in to manage favorites.');
        return;
      }
     const favApartments = user.fav_apartments || []; 
      const updatedFavApartments = favApartments.includes(apartment.id)
        ? favApartments.filter((id) => id !== apartment.id) 
        : [...favApartments, apartment.id]; 
  
    
      const updatedUser = {
        ...user,
        fav_apartments: updatedFavApartments, 
      };
  
      
      const response = await fetch(`https://api.nextflat.my/update-users/${user.id}`, {
        method: 'PUT', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedUser), 
      });
  
      if (!response.ok) {
        throw new Error(`Error updating user: ${response.statusText}`);
      }
  
      
      localStorage.setItem('user', JSON.stringify(updatedUser));
      // alert(
      //   favApartments.includes(apartment.id)
      //     ? 'Apartment removed from favorites!'
      //     : 'Apartment added to favorites!'
      // );
    } catch (error) {
      console.error('Error toggling favorites:', error);
      alert('Failed to update favorites. Please try again.');
    }
    window.location.reload(); 

};


  useEffect(() => {
    i18n.changeLanguage(lang); 
  }, [i18n, lang]);

  useEffect(() => {
   
    if (id) {
      fetch(`https://api.nextflat.my/apartments/${id}`)
        .then((response) => response.json())
        .then((data) => {
          setApartment(data);
          setLoadingApartment(false);

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



  useEffect(() => {
    const fetchUserAndCheckFavorites = async () => {
    const user = JSON.parse(localStorage.getItem("user")); 

      try {
        const userResponse = await fetch(`https://api.nextflat.my/users/${user.id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!userResponse.ok) {
          throw new Error(`Failed to fetch user data: ${userResponse.statusText}`);
        }

        const userData = await userResponse.json();
        console.log("User Data:", userData);

        const { fav_apartments } = userData;

        if (fav_apartments && fav_apartments.includes(apartment?.id)) {
          
        

          setIsFavorited(true);
        } else {
          setIsFavorited(false);
        }
      } catch (err) {
        console.error("Error during data fetching:", err);
        setError(err.message);

      }
    };

    fetchUserAndCheckFavorites();
  }, [user?.id, apartment?.id]);

  const fetchUserDataAndFavorites = async () => {
 
    try {
      setPropertiesStatus("loading");

      const userResponse = await fetch(`https://api.nextflat.my/users/${user.id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
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

  useEffect(() => {
    fetchUserDataAndFavorites();
  }, []);

  const homereturn = () => {
    navigate("/");
  };



  if (loadingApartment) {
    return  <Box
    sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh', // Center vertically in the viewport
    }}
  >
    <CircularProgress size={60} sx={{ color: 'goldenrod' }} />
  </Box>  ;
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
            <Avatar src={user?.profile_image} sx={{ width: 50, height: 50 }} alt={user?.name} />
            <div className={styles.cityInfo}>
              <span className={styles.userDetailName}>
                {user ? `${user.name} ${user.surname}` : t("Owner Name")}
              </span>
              <span className={styles.userDetailCity}>
                {t("Country")}: {user?.country || t("N/A")}
              </span>
              <Rating
                name="read-only"
                value={apartment.rating || 3}
                readOnly
                sx={{ fontSize: "16px" }}
              />
            </div>
          </div>
          <span className={styles.descripText}>
            {apartment.description || t("No Description Available.")}
          </span>
          <div className={styles.btnGroup}>
            <button className={styles.btnGroupCall} onClick={handlePhoneCall}>
              <i className="bi bi-telephone"></i> {user ? user.phone_num : t("Call")}
            </button>
            <button
      className={`${styles.btnGroupBasket} ${isFavorited ? styles.active : ''}`}
      onClick={handleAddToFav}
    >
      <i className={`bi ${isFavorited ?  'bi-heart-fill':'bi-heart'}`}></i>
      {isFavorited}
    </button>
          </div>
          <div className={styles.appartmentpriceandvalute}>
            <span className={styles.appartmentprice}>
              {apartment.price || t("N/A")}
            </span>
            <span className={styles.appartmentpricevalute}>
            {apartment.currency || t("AZN")}
            </span>
          </div>
        </div>
      </div>
      <div className={styles.footer}>
      <span><i className="bi bi-globe"></i><span className={styles.label}>{t("Country")}:</span> <span className="data">{apartment.country}</span></span>
<span><i className="bi bi-geo-alt"></i><span className={styles.label}>{t("City")}:</span> <span className="data">{apartment.city}</span></span>
<span><i className="bi bi-signpost-2"></i><span className={styles.label}>{t("Street")}:</span> <span className="data">{apartment.street}</span></span>
<span><i className="bi bi-house"></i><span className={styles.label}>{t("Service Type")}:</span> <span className="data">{t(apartment.serviceType)}</span></span>
<span><i className="bi bi-building"></i><span className={styles.label}>{t("Type of Home")}:</span> <span className="data">{t(apartment.typeOfHome)}</span></span>
<span><i className="bi bi-cash"></i><span className={styles.label}>{t("Payment Options")}:</span> <span className="data">{t(apartment.paymentMethod)}</span></span>
<span><i className="bi bi-door-closed"></i><span className={styles.label}>{t("Rooms")}:</span> <span className="data">{apartment.roomNumber}</span></span>
<span><i className="bi bi-rulers"></i><span className={styles.label}>{t("Area (kvm)")}:</span> <span className="data">{apartment.kvmAmount}</span></span>
<span><i className="bi bi-ladder"></i><span className={styles.label}>{t("Floor")}:</span> <span className="data">{apartment.flour}</span></span>


</div>
    </div>
  );
};

export default DetailPage;
