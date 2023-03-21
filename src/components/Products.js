import { Search, SentimentDissatisfied } from "@mui/icons-material";
import { Avatar } from "@mui/material";
import { Button } from "@mui/material";
import {
  CircularProgress,
  Grid,
  InputAdornment,
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { config } from "../App";
import Footer from "./Footer";
import Header from "./Header";
import "./Products.css";



const Products = () => {
  const history = useHistory();
  const [logged, setLogged] = useState(false);
  let username = localStorage.getItem('username')
  let balance = localStorage.getItem('balance')
  let token = localStorage.getItem('token')

  useEffect(()=>{
    if(username){
      setLogged(true);
    }else{
      setLogged(false);
    }
  },[])



  return (
    <div>
      <Header hasHiddenAuthButtons={true}>
        {
          logged ? 
          <>
          <Avatar alt={`${username}`} src="../assets/hero_image.png" /> 
          {username}
          <Button role='button' className="button" variant="contained" 
          onClick={()=>{
            localStorage.removeItem("username")
            localStorage.removeItem("balance")
            localStorage.removeItem("token")
            history.push("/login")
            } }>
           LOGOUT
           </Button>
          </>
           : 
           <>
            <Button className="button" variant="contained" onClick={()=>{history.push("/login")}}>
            Login
            </Button>
            <Button className="button" variant="contained" onClick={()=>{history.push("/register")}}>
            Register
            </Button>
           </>
        }
      </Header>

       <Grid container>
         <Grid item className="product-grid">
           <Box className="hero">
             <p className="hero-heading">
               India’s <span className="hero-highlight">FASTEST DELIVERY</span>{" "}
               to your door step
             </p>
           </Box>
         </Grid>
       </Grid>
      <Footer />
    </div>
  );
};

export default Products;
