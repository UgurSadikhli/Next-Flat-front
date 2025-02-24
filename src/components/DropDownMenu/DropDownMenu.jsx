import React, { useState, useEffect } from "react";
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import menuIco from "../../icons/menu.png";
import envelopeIco from "../../icons/envelope.png";
import styles from "../DropDownMenu/DropDownMenu.module.css";
import AccauntMenu from "../../components/userSetting/userSetting";
import LanguageButton2 from "../button/languageButton2/langageButton2";
import { useTranslation } from "react-i18next";

import { useNavigate } from "react-router-dom";

export default function BasicMenu({scrollToBottomm}) {
  const lang = localStorage.getItem("language");
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  
  
  useEffect(() => {
    i18n.changeLanguage(lang);
  }, [i18n, lang]);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const handleClose = (option) => {
    if(option === "rent") {
        navigate("/search");
        localStorage.setItem("filter", "rental");
    } else if(option === "search") {
        navigate("/search");
    } else if(option === "filter") { 
        navigate("/detail/2");
    } else if(option === "favorites") { 
        navigate("/detail/2");
        navigate("/favorites")
    } 

    setAnchorEl(null);
  };

  // Check if authToken exists in localStorage
  const authToken = localStorage.getItem("authToken");

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <img src={menuIco} style={styles.imgage1} alt="Menu" />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
          'fontFamily': 'Poppins, sans-serif',
        }}
      >
        <MenuItem className={styles.GroupBox1}>
          <AccauntMenu />
          {authToken && <label>Hi, {user.name}</label>}
          
        </MenuItem>
          <MenuItem >
            <LanguageButton2 />
          </MenuItem>


        <MenuItem onClick={() => handleClose("rent")}>{t("Rent Apartment")}</MenuItem>
        <MenuItem onClick={() => handleClose("search")}>{t("Search")}</MenuItem>
        <MenuItem onClick={() => handleClose("filter")}>{t("Filter")}</MenuItem>
        <MenuItem onClick={() => {handleClose("apartment"); scrollToBottomm();}}>{t("Apartments")}</MenuItem>
        <MenuItem onClick={() => handleClose("favorites")}>{t("Favorites")}</MenuItem>
      </Menu>
    </div>
  );
}
