import {useState} from 'react';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useHistory } from "react-router-dom";
import { Avatar, Button, Stack } from "@mui/material";
// import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import React from "react";
import "./Header.css";

const Header = ({ children, hasHiddenAuthButtons }) => {
  
  const history = useHistory();
    return (
      <Box className="header">
        <Box className="header-title">
            <img src="logo_light.svg" alt="QKart-icon"></img>
        </Box>
          {
            hasHiddenAuthButtons ? children :
          
          <Button
            className="explore-button"
            startIcon={<ArrowBackIcon />}
            variant="text"
            onClick={()=>{history.push("/")}}
          >
            Back to explore
          </Button>
           }
      </Box>
    );
};

export default Header;
