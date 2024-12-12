import React, { useState, useEffect } from "react";
import styles from './languageButton.module.css'

const LanguageButton = () => {
  const [language, setLanguage] = useState(
    localStorage.getItem("language") || "Ru"
  );

  const toggleLanguage = (language) => {
    const newLanguage = language === "Az" ? "Az" : language === "Ru" ? "Ru" : "Eng";   
     localStorage.setItem("language", newLanguage);
    setLanguage(newLanguage);
    window.location.reload(); 
  };

  return (
    <nav class="navbar navbar-expand-lg navbar-dark bg-white p-2">
    <div class="container-fluid">
      <div class="collapse navbar-collapse" id="navbarNavDarkDropdown">
        <ul class="navbar-nav">
          <li class="nav-item dropdown">
            <button class="btn btn-sm btn-dark dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
              {language}
            </button>
            <ul class="dropdown-menu dropdown-menu-dark">
              <li><a class="dropdown-item" onClick={()=>toggleLanguage("Az")}>Azərbaycan</a></li>
              <li><a class="dropdown-item" onClick={()=>toggleLanguage("Eng")}>English</a></li>
              <li><a class="dropdown-item" onClick={()=>toggleLanguage("Ru")}>Russian</a></li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  
  );
  
};

export default LanguageButton;
