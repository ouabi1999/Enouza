import React from 'react'
import styled from 'styled-components'
import {ErrorMessage, Field, Form, Formik, useFormik} from "formik"
import { useContext } from 'react';
import * as Yup from "yup"
import {Grid, Typography, TextField, FormControlLabel, Checkbox } from "@mui/material";

import { FormContext } from '../../../pages/CheckoutPage';
import {OrderContext} from "../../../App"
import { useState } from 'react';
import { useSelector } from 'react-redux';


function Billing({t}) {
  const { activeStepIndex, setActiveStepIndex } =
    useContext(FormContext);
  const { formData, setFormData} = useContext(OrderContext);

  const ValidationSchema  =  Yup.object().shape({
    firstName : Yup.string().required(t("common.please_enter_your_first_name")),
    lastName : Yup.string().required(t("common.please_enter_your_last_name")),
    email : Yup.string().email(t("errors.error_invalid_email")).required(t("common.please_enter_your_email")),
    city : Yup.string().required(t("common.please_enter_your_city")),
    country : Yup.string().required(t("common.please_enter_your_country")),
    zip : Yup.string().required(t("common.please_enter_your_zip_code")),
    state : Yup.string().required(t("common.please_enter_your_state")),
    address1 : Yup.string().required(t("common.please_enter_your_address"))
   
    
  })
  
  return (
    <Conatiner>
    <Formik
        initialValues = {formData}
        validationSchema = {ValidationSchema}
        onSubmit={(values) => {
        setActiveStepIndex(activeStepIndex +1 )
        setFormData({...formData, ...values})

    }}
    
    >

  { ({  
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
         /* and other goodies */
       }) =>
    <Form onSubmit={handleSubmit} >
       
      <Grid container justifyContent="center" spacing={3}>
        <Grid item xs={12} sm={5}>
          <TextField

            value={values.firstName} 
            onChange={handleChange}
            id="firstName"
            name="firstName"
            label={t("common.firstName")}
            fullWidth
            autoComplete="given-name"
            variant="outlined"
            helperText={touched.firstName ? errors.firstName : ""}
            error={touched.firstName && Boolean(errors.firstName)}
          />

        </Grid>
        <Grid item xs={12} sm={5}>
          <TextField
            value={values.lastName} 
            onChange={handleChange}
            id="lastName"
            name="lastName"
            label={t("common.lastName")}
            fullWidth
            autoComplete="family-name"
            variant="outlined"
            helperText={touched.lastName ? errors.lastName : ""}
            error={touched.lastName && Boolean(errors.lastName)}
          />
        </Grid>
        <Grid item xs={12} sm={10} >
          <TextField
            value={values.email} 
            onChange={handleChange}
            id="email"
            name="email"
            label={t("common.email")}
            type="email"
            fullWidth
            autoComplete="email"
            variant="outlined"
            helperText={touched.email ? errors.email : ""}
            error={touched.email && Boolean(errors.email)}
        />
        </Grid>
        <Grid item  sm={10} xs={12}>
          <TextField
            value={values.address1} 
            onChange={handleChange}
            id="address1"
            name="address1"
            label={t("common.address")}
            fullWidth
            autoComplete="shipping address-line1"
            variant="outlined"
            helperText={touched.address1 ? errors.address1 : ""}
            error={touched.address1 && Boolean(errors.address1)}
          />
        </Grid>
     
        <Grid item xs={12} sm={5}>
          <TextField
            value={values.city} 
            onChange={handleChange}
            
            id="city"
            name="city"
            label={t("common.city")}
            fullWidth
            autoComplete
            variant="outlined"
            helperText={touched.city ? errors.city : ""}
            error={touched.city && Boolean(errors.city)}
          />
        </Grid>
        <Grid item xs={12} sm={5}>
          <TextField
            value={values.state} 
            onChange={handleChange}
            id="state"
            name="state"
            label={t("common.state")}
            fullWidth
            variant="outlined"
            helperText={touched.state ? errors.state : ""}
            error={touched.state && Boolean(errors.state)}
          />
        </Grid>
        <Grid item xs={12} sm={5}>
          <TextField
            value={values.zip} 
            onChange={handleChange}
            id="zip"
            name="zip"
            label={t("common.zipCode")}
            autoComplete="shipping postal-code"
            variant="outlined"
            fullWidth

            helperText={touched.zip ? errors.zip : ""}
            error={touched.zip && Boolean(errors.zip)}
          />
        </Grid>
        <Grid item xs={12} sm={5}>
          <TextField
            value={values.country} 
            onChange={handleChange}
            id="country"
            name="country"
            label={t("common.country")}
            fullWidth
            autoComplete="shipping country"
            variant="outlined"
            helperText={touched.country ? errors.country : ""}
            error={touched.country && Boolean(errors.country)}
          />
        </Grid>
        <Grid item marginLeft="60px" justifyContent="center" paddingBottom="5px">
          <FormControlLabel 
            control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
            label={t("common.saving_address")}
          />
        </Grid>

      </Grid>
        <Buttons_container>
            <button className='button' onClick={()=> setActiveStepIndex(activeStepIndex - 1)}>{t("common.back")}</button>
            <button  className="button" type="submit">{t("common.next")}</button>
        </Buttons_container>
        
      </Form>
    }
      </Formik>
      </Conatiner>
  )
}

export default Billing
const Conatiner = styled.div`
    
    
    padding:25px 15px;
  

`
const Buttons_container =  styled.div`
  display:flex;
  justify-content:space-evenly;
 
  button{
    color:#fff;
    background:blue;
    padding:8px 15px;
    border-radius:6px;
    margin-top:10px;
    font-size: 17px;

    &:hover{
      opacity:0.8;
    }
  }
  
`

