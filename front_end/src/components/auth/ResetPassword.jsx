import React, { useState } from 'react';
import axios from 'axios';
import { Button, CircularProgress, IconButton, InputAdornment, TextField } from '@mui/material';

import styled from 'styled-components';
import {useFormik } from 'formik';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useNavigate, useParams } from 'react-router-dom';

import * as Yup from "yup"
import HeadeSeo from '../../common/HeadeSeo';
const ResetPassword = (props) => {
  const params = useParams()
  const [password, setPassword] = useState('');
  const [token, setToken] = useState(params.id);
  const [message, setMessage] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [hasError, setHasError] = useState(null)
  const editSechema = Yup.object({

    newPassword: Yup.string()
      .required("Please Enter your new password")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
      ),
    confirmPassword: Yup.string()
      .required("Please confirm your password")
      .oneOf([Yup.ref("newPassword")], "Passwords do not match"),

  })

  const formik = useFormik({

    initialValues: {
      newPassword : "",
      confirmPassword : ""
    },

    validationSchema: editSechema,
    onSubmit: values => {

     const handleSubmit = () => {
      setLoading(true)
      axios.post(`/reset_password/${token}`, {password:  values.newPassword })
        .then(res => {
          if (res.status === 200) {
            setMessage(res.data.message);
            setHasError(false)
            window.location.href = "/"
          } 
          
      })
        .catch(err => {
          console.log(err);
          setMessage(err.response.data.message);
          setHasError(true)
          setLoading(false)
        });
    }
        
        handleSubmit()
    },
  });

  const handleClickShowPassword = (password) => {

    if (password === "new") {
      setShowNewPassword(!showNewPassword);
    }

    if (password === "confirm") {
      setShowConfirmPassword(!showConfirmPassword);
    }
  } 
 


  return (
    <Wrapp>
      <HeadeSeo title = "Reset password"/>
    <Container onSubmit={formik.handleSubmit}>
      <div className='edit-title'>
        <span> Reset your password </span>
      </div>
        {hasError === true && (
          <div style={{fontSize:"13px", background: "#ff9999", color: "#000", padding: "5px 10px" }}>
            <span>{message}</span>
          </div>
        )
        }
      <div className='text'>
        

        <span>
          Changes made to your profile password here,
          will be the password that you will use
          when  you want login into animis website
        </span>

      </div>
      <div className="input">
        <TextField
          label="New password"
          fullWidth
          variant="filled"
          size="small"
          name="newPassword"
          value={formik.values.newPassword}
          onChange={formik.handleChange}
          onMouseDown={()=> setHasError(null)}
          error={formik.touched.newPassword && Boolean(formik.errors.newPassword)}
          helperText={formik.touched.newPassword && formik.errors.newPassword}
          type={showNewPassword ? "text" : "password"}
          InputProps={{
            endAdornment: <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => handleClickShowPassword("new")}
                
              >
                {showNewPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>

            </InputAdornment>,
          }}
        />
      </div>
      <div className="input">
        <TextField
          label="Confirm password"
          fullWidth
          variant="filled"
          size="small"
          name="confirmPassword"
          onMouseDown={()=> setHasError(null)}
          value={formik.values.confirmPassword}
          onChange={formik.handleChange}
          error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
          helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
          type={showConfirmPassword ? "text" : "password"}
          InputProps={{
            endAdornment: <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => handleClickShowPassword("confirm")}
            
              >
                {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>

            </InputAdornment>,
          }}
        />
      </div>
      <div className='save-button'>

        <Button type="submit" variant="contained">
          <span>Reset Password</span>
          {loading && (

            <CircularProgress
              style={{ marginLeft: "5px", color: "white" }}
              size={23}
              thickness={6}

              value={100}
            />
          )

          }
        </Button>
      </div>
    </Container>
    </Wrapp>
  );
}

export default ResetPassword;
const  Wrapp = styled.div`
    display:flex;
    justify-content:center;
    align-items:center;
    height:100vh;

`

const  Container = styled.form`

     box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
     border:2px solid lightgray;
     border-radius:6px;
     min-width:280px;
     background:#fff;
     
     max-width:500px;
    

     .edit-title{
        border-radius: 4px 4px 0px 0px;
        border-bottom:1px solid lightgray;
        padding:8px 10px;
        background-color:lightgray;
        font-weight:900;
        font-size:19px;
        font-family:'Trebuchet MS', sans-serif;
        display:flex;
        justify-content:space-between;
        
       
     }
     .text{
         font-size:14px;
         margin:15px 10px;
         
     }
     .save-button{
        padding:10px;
        display:flex;
        justify-content:flex-end;
     }
     .input{
         margin-top:8px;
     }
`