import { useHistory, Link } from "react-router-dom";
import { Button, CircularProgress, Stack, TextField } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { config } from "../App";
import Footer from "./Footer";
import Header from "./Header";
import "./Register.css";

const Register = (props) => {
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const [Loader, setLoader]=useState(false);
  const [formData, setFormData] = useState({
    username:'',
    password:'',
    confirmPassword:''
  });

  let handleChange = (e) => {
    setFormData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value
      };
    });
  };

  
 
  // TODO: CRIO_TASK_MODULE_REGISTER - Implement the register function


  /**
   * Definition for register handler
   * - Function to be called when the user clicks on the register button or submits the register form
   *
   * @param {{ username: string, password: string, confirmPassword: string }} formData
   *  Object with values of username, password and confirm password user entered to register
   *
   * API endpoint - "POST /auth/register"
   *
   * Example for successful response from backend for the API call:
   * HTTP 201
   * {
   *      "success": true,
   * }
   *
   * Example for failed response from backend for the API call:
   * HTTP 400
   * {
   *      "success": false,
   *      "message": "Username is already taken"
   * }
   */
  const register = async (data, config) => {
    try {
      setLoader(true)
      let res = await axios.post(`${config.endpoint}/auth/register`, data);
      enqueueSnackbar('Registered successfully', {variant: "success"});
      setLoader(false)
      history.push("/login")
    } catch(error){
      enqueueSnackbar(error.response.data.message, {variant: "error"});
      setLoader(false)
    } 

  };

  // TODO: CRIO_TASK_MODULE_REGISTER - Implement user input validation logic
  /**
   * Validate the input values so that any bad or illegal values are not passed to the backend.
   *
   * @param {{ username: string, password: string, confirmPassword: string }} data
   *  Object with values of username, password and confirm password user entered to register
   *
   * @returns {boolean}
   *    Whether validation has passed or not
   *
   * Return false if any validation condition fails, otherwise return true.
   * (NOTE: The error messages to be shown for each of these cases, are given with them)
   * -    Check that username field is not an empty value - "Username is a required field"
   * -    Check that username field is not less than 6 characters in length - "Username must be at least 6 characters"
   * -    Check that password field is not an empty value - "Password is a required field"
   * -    Check that password field is not less than 6 characters in length - "Password must be at least 6 characters"
   * -    Check that confirmPassword field has the same value as password field - Passwords do not match
   */
  const validateInput = () => {
    if(formData.username.length===0 ){
      enqueueSnackbar('Username is required', {variant: "warning"});
    } else if (formData.username.length<6){
      enqueueSnackbar('Username must be at least 6 characters', {variant: "warning"});
    } else if (formData.password===0){
      enqueueSnackbar('Password is required', {variant: "warning"});
    } else if (formData.password.length<6){
      enqueueSnackbar('Password must be at least 6 characters', {variant: "warning"});
    }else if (formData.password !== formData.confirmPassword){
      enqueueSnackbar('Passwords do not match', {variant: "warning"});
    }else {
     let data = {
        username:formData.username,
        password:formData.password
      }
      register(data, config);
    }
  };

  return (
    <Box
      // display="flex"
      // flexDirection="column"
      // justifyContent="space-between"
      minHeight="100vh"
    >
      <Header hasHiddenAuthButtons={false} />
      <Box className="content">
        <Stack spacing={2} className="form" >
          <h2 className="title">Register</h2>
          <TextField
            id="username"
            label="Username"
            variant="outlined"
            title="Username"
            name="username"
            placeholder="Enter Username"
            fullWidth
            value={formData.username}
            onChange={handleChange}
          />
          <TextField
            id="password"
            variant="outlined"
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            helperText="Password must be atleast 6 characters length"
            fullWidth
            placeholder="Enter a password with minimum 6 characters"
            onChange={handleChange}
          />
          <TextField
            id="confirmPassword"
            variant="outlined"
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            fullWidth
            value={formData.confirmPassword}
            onChange={handleChange}
          />
           <Button className="button" variant="contained" onClick={validateInput}>
           { !Loader ? `Register Now`: <CircularProgress color="inherit"/>} 
           </Button>
          <p className="secondary-action">
            Already have an account?{" "}
             <a className="link" href="#"
              onClick={()=>{
                history.push("/login")
                }}
                >
              Login here
             </a>
          </p>
        </Stack>
      </Box>
      <Footer />
    </Box>
  );
};

export default Register;
