import React, { useEffect, useRef } from "react";
import styles from "./Main.module.css";
import homeIco from "../../img/RoomSketcherPlans.png";
import { useTranslation } from "react-i18next";
import Heder from "../../components/heder/Heder";
import CustomizedInputBase from "../../components/input/SearchInput/SearchInpit";
import CategoryButton from "../../components/button/categoryButton/categoryButton";
import penthouseImg from "../../img/penthouse.png";
import oneImg from "../../img/one.jpg";
import twoImg from "../../img/two.jpg";
import studioImg from "../../img/studio.jpg";
import loftImg from "../../img/loft.jpg";
import duplexImg from "../../img/duplex.jpg";
import Card from "../../components/card/card";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProperties } from "../../features/propertiesSlice";

const Main = () => {
  const lang = localStorage.getItem("language");
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const properties = useSelector((state) => state.properties.properties);
  const propertiesStatus = useSelector((state) => state.properties.status);
  const error = useSelector((state) => state.properties.error);
  const navigate = useNavigate();

  const categories = [
    { category: "One", imageSrc: oneImg },
    { category: "Two", imageSrc: twoImg },
    { category: "Studio", imageSrc: studioImg },
    { category: "Penthouse", imageSrc: penthouseImg },
    { category: "Loft", imageSrc: loftImg },
    { category: "Duplex", imageSrc: duplexImg },
  ];

  useEffect(() => {
    i18n.changeLanguage(lang);
    if (propertiesStatus === "idle") {
      dispatch(fetchProperties());
    }
  }, [i18n, lang, propertiesStatus, dispatch]);

  const handleClick = (category) => {
    navigate("/search");
    localStorage.setItem("filter",category);
  };




  const handleCardClick = (property) => {
    console.log(`${property.title} clicked`);

  };

  const bottomRef = useRef(null);
  const scrollToBottom = () => {
    bottomRef.current.scrollIntoView({ behavior: "smooth" });
  };

  let content;
  if (propertiesStatus === "loading") {
    content = <div>Loading...</div>;
  } else if (propertiesStatus === "succeeded") {
    content = Array.isArray(properties) ? (
      properties.map((property, index) => (
        <Card
          key={index}
          image={property.image}
          title={property.title}
          author={property.author}
          price={property.price}
          onClick={() => handleCardClick(property)}
        />
      ))
    ) : (
      <div>No properties found</div>
    );
  } else if (propertiesStatus === "failed") {
    content = <div>{error}</div>;
  }
  



  return (
    <>
      <Heder scrollToBottom={scrollToBottom} />
      <div className={styles.main}>
        <div className={styles.top}>
          <div className={styles.top_left}>
            <div className={styles.top_left_text1}>
              <h1>
                {t("Find your dream apartment in")}
                <span style={{ display: "block" }}>{t("the city!")}</span>
              </h1>
              <span className={styles.spanLow}>
                {t("Browse by location, size or price range!")}
              </span>
            </div>
            <CustomizedInputBase place={t("Enter location or keyword")} />
          </div>
          <div className={styles.top_right}>
            <img src={homeIco} height="330px" width="600px" alt="Cart" />
          </div>
        </div>
        <div className={styles.body}>
          <span>{t("Categories")}</span>
          <div className={styles.scrollContainer}>
            {categories.map(({ category, imageSrc }) => (
              <CategoryButton
                key={category}
                category={category}
                imageSrc={imageSrc}
                onClick={() => handleClick(category)}
              />
            ))}
          </div>
        </div>
        <div className={styles.bottom} ref={bottomRef}>
          {content}
        </div>
      </div>
    </>
  );
};

export default Main;
