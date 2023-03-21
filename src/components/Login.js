import { Button, CircularProgress, Stack, TextField } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { config } from "../App";
import Footer from "./Footer";
import Header from "./Header";
import "./Login.css";

const Login = () => {
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const [Loader, setLoader]=useState(false);
  const [loginData, setLoginData] = useState({
    username:'',
    password:'',
  });

  let handleChange = (e) => {
    setLoginData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value
      };
    });
  };
  // TODO: CRIO_TASK_MODULE_LOGIN - Fetch the API response
  /**
   * Perform the Login API call
   * @param {{ username: string, password: string }} formData
   *  Object with values of username, password and confirm password user entered to register
   *
   * API endpoint - "POST /auth/login"
   *
   * Example for successful response from backend:
   * HTTP 201
   * {
   *      "success": true,
   *      "token": "testtoken",
   *      "username": "criodo",
   *      "balance": 5000
   * }
   *
   * Example for failed response from backend:
   * HTTP 400
   * {
   *      "success": false,
   *      "message": "Password is incorrect"
   * }
   *
   */
  const login = async (loginData) => {
    try {
      setLoader(true)
      let res = await axios.post(`${config.endpoint}/auth/login`, loginData);
      let {token, username, balance} = res.data
      persistLogin(token, username, balance)
      enqueueSnackbar('Logged in successfully',  {variant: "success"});
      setLoader(false)
      history.push("/")
    } catch(error){
      enqueueSnackbar(error.response.data.message,  {variant: "error"});
      setLoader(false)
    } 
  };

  // TODO: CRIO_TASK_MODULE_LOGIN - Validate the input
  /**
   * Validate the input values so that any bad or illegal values are not passed to the backend.
   *
   * @param {{ username: string, password: string }} data
   *  Object with values of username, password and confirm password user entered to register
   *
   * @returns {boolean}
   *    Whether validation has passed or not
   *
   * Return false and show warning message if any validation condition fails, otherwise return true.
   * (NOTE: The error messages to be shown for each of these cases, are given with them)
   * -    Check that username field is not an empty value - "Username is a required field"
   * -    Check that password field is not an empty value - "Password is a required field"
   */
  const validateInput = ( ) => {
    if(loginData.username.length===0 ){
      enqueueSnackbar('Username is required',  {variant: "warning"});
    } else if (loginData.username.length<6){
      enqueueSnackbar('Username must be at least 6 characters', {variant: "warning"});
    } else if (loginData.password.length===0){
      enqueueSnackbar('Password is required');
    } else if (loginData.password.length<6){
      enqueueSnackbar('Password must be at least 6 characters', {variant: "warning"});
    }else {
      login(loginData);
    }
  };

  // TODO: CRIO_TASK_MODULE_LOGIN - Persist user's login information
  /**
   * Store the login information so that it can be used to identify the user in subsequent API calls
   *
   * @param {string} token
   *    API token used for authentication of requests after logging in
   * @param {string} username
   *    Username of the logged in user
   * @param {string} balance
   *    Wallet balance amount of the logged in user
   *
   * Make use of localStorage: https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
   * -    `token` field in localStorage can be used to store the Oauth token
   * -    `username` field in localStorage can be used to store the username that the user is logged in as
   * -    `balance` field in localStorage can be used to store the balance amount in the user's wallet
   */
  const persistLogin = (token, username, balance) => {
    let userDetails = {
      // token:token,
      username:username,
      // balance:balance
    }
    localStorage.setItem("username", username);
    localStorage.setItem("balance", balance);
    localStorage.setItem("token", token);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      minHeight="100vh"
    >
      <Header hasHiddenAuthButtons={false} />
      <Box className="content-login">
        <Stack spacing={2} className="form-login">
        <h2 className="title">Login</h2>
          <TextField
            id="username"
            label="Username"
            variant="outlined"
            title="Username"
            name="username"
            placeholder="Enter Username"
            fullWidth
            value={loginData.username}
            onChange={handleChange}
          />
          <TextField
            id="password"
            variant="outlined"
            label="Password"
            name="password"
            type="password"
            value={loginData.password}
            helperText="Password must be atleast 6 characters length"
            fullWidth
            placeholder="Enter a password with minimum 6 characters"
            onChange={handleChange}
          />
           <Button className="button" variant="contained" onClick={validateInput}>
           { !Loader ? `Login to Qkart`: <CircularProgress color="inherit"/>} 
           </Button>
          <p className="secondary-action">
            Don't Have an account?{" "}
             <a 
             href='/register'
             className="link" 
             onClick={()=>{
              history.push("/register")
              }}
              >
              Register Now
             </a>
          </p>
        </Stack>
      </Box>
      <Footer />
    </Box>
  );
};

export default Login;
