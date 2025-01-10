import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

export default function AccessibleTable({ rows }) {
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
            <TableCell>Title</TableCell>
            <TableCell align="right">Id</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">Currency</TableCell>
            <TableCell align="center">Actions</TableCell> 
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.Id}> 
              <TableCell component="th" scope="row">
                {row.Title}
              </TableCell>
              <TableCell align="right">{row.Id}</TableCell>
              <TableCell align="right">{row.Price}</TableCell>
              <TableCell align="right">{row.Curency}</TableCell>
              <TableCell align="center">
            
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => deleteRow(row.Id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
