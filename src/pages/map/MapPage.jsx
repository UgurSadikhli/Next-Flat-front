import React, { useState, useEffect } from "react";
import styles from "./MapPage.module.css";
import hederImg from "../../img/hederIco.jpg";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import locIco from "../../icons/location.png";
import backIco from "../../../src/icons/back.png";

// Fix the default icon issue in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

const MapPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [center, setCenter] = useState([40.4093, 49.8671]); //Baku location

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCenter([latitude, longitude]);
        },

        (error) => {
          console.error("Error fetching geolocation:", error);
        },
        { enableHighAccuracy: true }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }, []); //auto place opener

  const handleLocateMe = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setCenter([latitude, longitude]);
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }; //place button

  const MapUpdater = ({ newCenter }) => {
    const map = useMap();

    useEffect(() => {
      if (newCenter) {
        map.flyTo(newCenter, 13);
      }
    }, [newCenter, map]);

    return null;
  }; //fly to place

  return (
    <div className={styles.mainC}>
      <div className={styles.mainB}>
        <div className={styles.headerContainer}>
          <div className={styles.heder}>
            <img
              src={hederImg}
              alt="Next Flat"
              className={styles.animated_image}
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
          <button className={styles.mebtn} onClick={handleLocateMe}>
            <img className={styles.locatIcon} alt={t("Me")} src={locIco} />
          </button>
        </div>
      </div>
      <div className={styles.mapContainer}>
        <MapContainer
          center={center}
          zoom={13}
          style={{ width: "100%", height: "49em" }}
          maxBounds={[
            [85, -180],
            [-85, 180],
          ]}
          maxBoundsViscosity={1.0}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; Uğur Sadıxlı"
          />
          <Marker position={center}>
            <Popup>{t("You are here")}</Popup>
          </Marker>
          <MapUpdater newCenter={center} />
        </MapContainer>
      </div>
    </div>
  );
};

export default MapPage;
