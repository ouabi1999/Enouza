import React, { useContext, useEffect, useState } from 'react'
import {Button, IconButton, MenuItem, InputAdornment, TextField}from '@mui/material';
import DisabledByDefaultIcon from '@mui/icons-material/DisabledByDefault';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Formik, useFormik } from 'formik';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { UserContext } from '../UserInfo';
import * as Yup from "yup"
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import CircularProgress from "@mui/material/CircularProgress"

function EditGender(props) {
    const { formData, setFormData, updateUserInfo, loading} = useContext(UserContext)
    const editSechema = Yup.object({
        gender :  Yup.mixed().oneOf(['Male', 'Female'])
        .defined()
       
            })

    const formik = useFormik({
        initialValues :{
            gender:formData.gender

            },
        validationSchema :editSechema,
        onSubmit: values => {
           
            // same shape as initial values
            updateUserInfo({...formData, gender:values.gender})
        },
    });  const {
        nameEdit,
        emailEdit,
        passwordEdit,
        countryEdit,
        genderEdit,
        closeNameEdit,
        closeEmailEdit,
        closePasswordEdit,
        closeCountryEdit,
        closeGenderEdit,
        closeAgeEdit,
        ageEdit } = props;

    const genders = [
        {gender : "Male", icon:<MaleIcon/>},
        {gender : "Female", icon:<FemaleIcon/>}
    ]
    return (
        <div>
            {genderEdit && (
                <form onSubmit={formik.handleSubmit}>
                <PopUpEdit>
                    <div className='edit-title'>
                        <span>Edit your gender</span>
                        <DisabledByDefaultIcon className="disable-icon" onClick={closeGenderEdit} />
                    </div>
                    <div className='text'>

                        <span>
                            Changes made to your profile gender here,
                            will be shown anywhere your profile is used
                        </span>


                    </div>
                    <div className="input">
                        <TextField
                            label="Gender"
                            id="filled-size-small"
                            fullWidth
                            variant="filled"
                            size="small"
                            name="gender"
                            select
                            error={formik.touched.gender && Boolean(formik.errors.gender)}
                            helperText={formik.touched.gender && formik.errors.gender}
                            value={formik.values.gender}
                            onChange={formik.handleChange}

                        >  
                        {genders.map((sex, index)=>{
                             return(
                            <MenuItem key= {index} value = {sex.gender} >
                                    <div style={{display:"flex" , alignItems:"center"}}>
                                    {sex.icon}
                                    <span>{sex.gender}</span>
                                    </div>
                            </MenuItem>
                            )
                              })}
                        </TextField>
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
        </div>
    )
}

export default EditGender

const  PopUpEdit = styled.div`
     box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
     border:2px solid lightgray;
     border-radius:6px;
     min-width:280px;
     background:#fff;
     position:absolute;
     bottom:25%;
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