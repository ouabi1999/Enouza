import React, { useContext, useEffect, useState } from 'react'
import { Button, CircularProgress, IconButton, InputAdornment, TextField } from '@mui/material';
import DisabledByDefaultIcon from '@mui/icons-material/DisabledByDefault';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

import { Form, Formik, useFormik } from 'formik';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { UserContext } from '../UserInfo';
import * as Yup from "yup"
function EditPassword(props) {
    const { formData, setFormData, updateUserPassword, loading} = useContext(UserContext)

    const handleClickShowPassword = (value) => {

        if(value === "old"){
        setFormData({
          ...formData,
          showPassword: !formData.showPassword,
        });
     }
       if(value === "new"){
      setFormData({
        ...formData,
        showNewPassword: !formData.showNewPassword,
      });
     }
      if(value === "confirm"){
        setFormData({
            ...formData,
            showConfirmPassword: !formData.showConfirmPassword,
          });
      }
    }

      const handleMouseDownPassword = (event) => {
        event.preventDefault();
      };
    const editSechema = Yup.object({
        
        oldPassword:Yup.string().required("Please Enter your old password"),
        
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
        initialValues : formData,
        validationSchema :editSechema,
        onSubmit: values => {
           
          updateUserPassword({...formData, oldPassword: values.oldPassword, newPassword: values.newPassword })

        },
    });
   

    return (
        <Container>

            {props.passwordEdit && (
                <form onSubmit={formik.handleSubmit}>
                <PopUpEdit>
                    <div className='edit-title'>
                        <span>Edit your password</span>
                        <DisabledByDefaultIcon className="disable-icon" onClick={props.closePasswordEdit} />
                    </div>
                    <div className='text'>

                        <span>
                            Changes made to your profile password here,
                            will be the password that you will use
                            when  you want login into animis website
                        </span>


                    </div>
                    <div className="input">
                        <TextField
                            label="Old password"
                            fullWidth
                            variant="filled"
                            size="small"

                            name="oldPassword"
                            value={formik.values.oldPassword}
                            onChange={formik.handleChange}
                            error={formik.touched.oldPassword && Boolean(formik.errors.oldPassword)}
                            helperText={formik.touched.oldPassword && formik.errors.oldPassword}
                            type={formData.showPassword ? "text" : "password"}
                            InputProps={{
                                endAdornment: <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={(e) => handleClickShowPassword("old")}
                                        onMouseDown={handleMouseDownPassword}
                                    >
                                        {formData.showPassword === true ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>

                                </InputAdornment>,
                            }}
                        />
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
                            error={formik.touched.newPassword && Boolean(formik.errors.newPassword)}
                            helperText={formik.touched.newPassword && formik.errors.newPassword}
                            type={formData.showNewPassword ? "text" : "password"}
                            InputProps={{
                                endAdornment: <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={() => handleClickShowPassword("new")}
                                        onMouseDown={handleMouseDownPassword}
                                    >
                                        {formData.showNewPassword ? <VisibilityOff /> : <Visibility />}
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
                            value={formik.values.confirmPassword}
                            onChange={formik.handleChange}
                            error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                            helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                            type={formData.showConfirmPassword ? "text" : "password"}
                            InputProps={{
                                endAdornment: <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={() => handleClickShowPassword("confirm")} 
                                        onMouseDown={handleMouseDownPassword}
                                    >
                                        {formData.showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>

                                </InputAdornment>,
                            }}
                        />
                    </div>
                    <div className='save-button'>

                        <Button type="submit" variant="contained">
                        <span>Save changes</span>
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
                </PopUpEdit>
                </form>
            )}

        </Container>
    )
}

export default EditPassword

const Container = styled.div`


`
const  PopUpEdit = styled.div`
     box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
     border:2px solid lightgray;
     border-radius:6px;
     min-width:280px;
     background:#fff;
     position:absolute;
     bottom:15%;
     max-width:500px;
     right:25%;
     left:25%;


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
     @media only screen and (max-width:480px) {
            &{  
               width:100%;
               left:0;   
            }
     }
`