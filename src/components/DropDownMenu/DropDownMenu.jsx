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
import Badge from '@mui/material/Badge';
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


  const handleClose = (option) => {

 
    if(option==="rent")
    {
        navigate("/search");
        localStorage.setItem("filter","rental");
    }
    else if(option==="search")
    {
        navigate("/search");

    }
    else if(option==="filter")
    { 
        navigate("/detail/2");
    }   
    else if(option==="cart")
    { 
        navigate("/detail/2");
    }

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
          'font-family': 'Poppins, sans-serif',

        }}
      >
        <MenuItem class={styles.GroupBox1}><AccauntMenu/></MenuItem>
        <div class={styles.GroupBox}>
            <MenuItem>
                <LanguageButton2/>
            </MenuItem>
            <MenuItem>             
                <Badge badgeContent={4} color="primary" >
                    <img src={envelopeIco} className={styles.menuButtonimg1} alt="Nottiifications" />
                </Badge>
            </MenuItem>
        </div>
        <MenuItem onClick={()=>handleClose("rent")}>{t("Rent Apartment")}</MenuItem>
        <MenuItem onClick={()=>handleClose("search")}>{t("Search")}</MenuItem>
        <MenuItem onClick={()=>handleClose("filter")}>{t("Filter")}</MenuItem>
        <MenuItem onClick={()=>{handleClose("apartment");scrollToBottomm();}}>{t("Apartments")}</MenuItem>
        <MenuItem onClick={()=>handleClose("cart")}>{t("Cart")}</MenuItem>
      </Menu>
    </div>
  );
}