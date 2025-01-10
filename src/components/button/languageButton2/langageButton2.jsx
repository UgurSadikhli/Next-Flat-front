import React, { useState } from "react";
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import styles from './languageButton2.module.css'

const options = [
  'Azərbaycan',
  'Russian',
  'English',
];

const ITEM_HEIGHT = 48;

export default function LanguageButton2() {

  const [anchorEl, setAnchorEl] = useState(null);
  const [language, setLanguage] = useState(localStorage.getItem("language") || "Eng");
  const [loading, setLoading] = useState(false);  // Состояние для загрузки

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (key) => {
    const newLanguage = key === "Azərbaycan" ? "Az" : key === "Russian" ? "Ru" : key === "English" ? "Eng" : language;
    document.body.style.overflow = 'hidden';
    setLoading(true); 
    localStorage.setItem("language", newLanguage);
    setLanguage(newLanguage);
    setTimeout(() => {
      setLoading(false); 
      document.body.style.overflow = '';
      window.location.reload();
    }, 900);  
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
          'fontFamily': 'Poppins, sans-serif',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
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
          <MenuItem key={option} onClick={() => handleClose(option.toString())}>
            {option}
          </MenuItem>
        ))}
      </Menu>

      {/* Эффект размытия фона, если загружается */}
      {loading && (
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backdropFilter: "blur(4px)",  
            zIndex: 1,
          }}
        />
      )}

      {loading && (
        <Box
          sx={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 2, 
          }}
        >
          <CircularProgress size={60} sx={{ color: 'goldenrod' }} />  
        </Box>
      )}
    </div>
  );
}
