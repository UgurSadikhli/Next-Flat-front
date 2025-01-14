import React, { useState, useEffect } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import styles from "./Table.module.css"

export default function AccessibleTable({ rows }) {

  const lang = localStorage.getItem("language");
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();


  useEffect(() => {
    i18n.changeLanguage(lang); 
  }, [i18n, lang]);
  
  const  deleteRow = async(id) => {
      try {
        const response = await fetch(`https://api.nextflat.my/apartments/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(),
        });
  
        const result = await response.json();
        console.log("Data submitted successfully:", result);
      } catch (error) {
        console.error("Error submitting data:", error);
      }
     window.location.reload(); 
    }

  const  editRow = (id) => {
      navigate(`/edit-announcement/${id}`)
    }
  
  return (
    <TableContainer
      component={Paper}
      sx={{
        minWidth: 100,
        backgroundColor: 'white',
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
        borderRadius: '8px',
      }}
    >
      <Table aria-label="caption table">
        <TableHead>
          <TableRow>
            <TableCell>{t("Title")}</TableCell>
            <TableCell align="right">{t("Price")}</TableCell>
            <TableCell align="right">{t("Currency")}</TableCell>
            <TableCell align="center">{t("Actions")}</TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.Id}> 
              <TableCell component="th" scope="row">
                {row.Title}
              </TableCell>
              <TableCell align="right">{row.Price}</TableCell>
              <TableCell align="right">{row.Curency}</TableCell>
              <TableCell align="right">
            <div className={styles.ButtonDiv}>
                <button
        className={`${styles.button} ${styles.deleteButton}`}
        onClick={() => deleteRow(row.Id)}
      >
        <i className="bi bi-trash3-fill"></i>
      </button>
      <button
        className={`${styles.button} ${styles.editButton}`}
        onClick={() => editRow(row.Id)}
      >
        <i className="bi bi-pencil-fill"></i>
      </button>
      </div>
      </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
