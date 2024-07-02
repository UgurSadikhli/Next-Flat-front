import React, { useState, useEffect } from "react";
import styles from './languageButton.module.css'

const LanguageButton = () => {
  const [language, setLanguage] = useState(
    localStorage.getItem("language") || "Ru"
  );

  const toggleLanguage = () => {
    const newLanguage = language === "Eng" ? "Az" : language === "Az" ? "Ru" : "Eng";   
     localStorage.setItem("language", newLanguage);
    setLanguage(newLanguage);
    window.location.reload(); 
  };

  return <button className={styles.buttonTog} onClick={toggleLanguage}>{language}</button>;
};

export default LanguageButton;
