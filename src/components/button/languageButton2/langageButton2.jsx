import React, { useState, useEffect } from "react";

import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const options = [
  'Azərbaycan',
  'Russian',
  'English',
];

const ITEM_HEIGHT = 48;

export default function LanguageButton2() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [language, setLanguage] = useState(
    localStorage.getItem("language") || "Ru"
  );

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (key) => {
    const newLanguage = key === "Azərbaycan" ? "Az" : key === "Russian" ? "Ru" : "Eng";   
    localStorage.setItem("language", newLanguage);
   setLanguage(newLanguage);
   window.location.reload(); 
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
       {language}
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          paper: {
            style: {
              maxHeight: ITEM_HEIGHT * 4.5,
              width: '20ch',
            },
          },
        }}
      >
        {options.map((option) => (
          <MenuItem key={option} selected={option === 'Pyxis'} onClick={()=>handleClose(option.toString())}>
            {option}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}