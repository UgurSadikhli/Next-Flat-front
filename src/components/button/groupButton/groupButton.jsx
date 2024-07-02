import * as React from "react";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";

export default function DisableElevation() {
  return (
    <ButtonGroup
      disableElevation
      variant="contained"
      aria-label="Disabled button group"
    >
      <Button
        sx={{
          color: "black",
          backgroundColor: "white",
          fontFamily: "Poppins, sans-serif",
          "&:hover": {
            backgroundColor: "gray",
            color: "white",
          },
        }}
      >
        Home
      </Button>
      <Button
        sx={{
          color: "black",
          backgroundColor: "#0000",
          fontFamily: "Poppins, sans-serif",
          "&:hover": {
            backgroundColor: "gray",
            color: "white",
          },
        }}
      >
        Map
      </Button>
      <Button
        sx={{
          color: "black",
          backgroundColor: "#0000",
          fontFamily: "Poppins, sans-serif",
          "&:hover": {
            backgroundColor: "gray",
            color: "white",
          },
        }}
      >
        Favorites
      </Button>
      <Button
        sx={{
          color: "black",
          backgroundColor: "#0000",
          fontFamily: "Poppins, sans-serif",
          "&:hover": {
            backgroundColor: "gray",
            color: "white",
          },
        }}
      >
        Best Value
      </Button>
    </ButtonGroup>
  );
}
