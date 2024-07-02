import React, { useState, useEffect } from "react";
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';


export default function CustomizedInputBase({ onClick, inputValue, onInputChange, place }) {


  return (
    <Paper
      component="form"
      sx={{
        display: 'flex',
        alignItems: 'center',
        width: 370,
        padding: '2px 4px',
        borderRadius: '15px', 
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.3)', 
        border: '1px solid #e0e0e0' 
      }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1,fontFamily:"Poppins" }}
        placeholder={place}
        inputProps={{ 'aria-label': 'Enter location or keyword' }}
        value={inputValue}
        onChange={onInputChange}
      />
      <IconButton type="button" sx={{ p: '10px' }} aria-label="search" onClick={onClick}>
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}
