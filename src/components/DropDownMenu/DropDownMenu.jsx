import React, { useState, useEffect } from "react";
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import menuIco from "../../icons/menu.png";
import envelopeIco from "../../icons/envelope.png";
import styles from "../DropDownMenu/DropDownMenu.module.css"
import AccauntMenu from "../../components/userSetting/userSetting";
import LanguageButton2 from "../button/languageButton2/langageButton2";
import { useTranslation } from "react-i18next";

export default function BasicMenu() {
    const lang = localStorage.getItem("language");
    const { t, i18n } = useTranslation();

    useEffect(() => {
        i18n.changeLanguage(lang);
      }, [i18n, lang]);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <img src={menuIco} style={styles.imgage1}  alt="Cart" />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem><AccauntMenu/></MenuItem>
        <MenuItem><LanguageButton2/></MenuItem>
        <MenuItem onClick={handleClose}>{t("Rent Apartment")}</MenuItem>
        <MenuItem onClick={handleClose}>{t("Search")}</MenuItem>
        <MenuItem onClick={handleClose}>{t("Filter")}</MenuItem>
        <MenuItem onClick={handleClose}>{t("Apartments")}</MenuItem>
        <MenuItem onClick={handleClose}>{t("Cart")}</MenuItem>
      </Menu>
    </div>
  );
}