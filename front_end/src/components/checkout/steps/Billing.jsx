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

const ValidationSchema  =  Yup.object().shape({
  firstName : Yup.string().required(),
  lastName : Yup.string().required(),
  email : Yup.string().email().required(),
  city : Yup.string().required(),
  country : Yup.string().required(),
  zip : Yup.string().required(),
  state : Yup.string().required(),
  address1 : Yup.string().required()
 
  
})
function Billing() {
  const { activeStepIndex, setActiveStepIndex } =
    useContext(FormContext);
  const { formData, setFormData} = useContext(OrderContext);
 
  
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
            label="First name"
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
            label="Last name"
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
            label="Email"
            type="email"
            fullWidth
            autoComplete="email"
            variant="outlined"
            helperText={touched.email ? errors.email : ""}
            error={touched.email && Boolean(errors.email)}
        />
        </Grid>
        <Grid item  sm={5} xs={12}>
          <TextField
            value={values.address1} 
            onChange={handleChange}
            id="address1"
            name="address1"
            label="Address line 1"
            fullWidth
            autoComplete="shipping address-line1"
            variant="outlined"
            helperText={touched.address1 ? errors.address1 : ""}
            error={touched.address1 && Boolean(errors.address1)}
          />
        </Grid>
        <Grid item sm={5} xs={12}>
          <TextField
            value={values.address2} 
            onChange={handleChange}
            id="address2"
            name="address2"
            label="Address line 2"
            fullWidth
            autoComplete="shipping address-line2"
            variant="outlined"
           
          />
        </Grid>
        <Grid item xs={12} sm={5}>
          <TextField
            value={values.city} 
            onChange={handleChange}
            
            id="city"
            name="city"
            label="City"
            fullWidth
            autoComplete="shipping address-level2"
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
            label="State/Province/Region"
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
            label="Zip / Postal code"
            fullWidth
            autoComplete="shipping postal-code"
            variant="outlined"
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
            label="Country"
            fullWidth
            autoComplete="shipping country"
            variant="outlined"
            helperText={touched.country ? errors.country : ""}
            error={touched.country && Boolean(errors.country)}
          />
        </Grid>
        <Grid item marginLeft="60px" justifyContent="center" paddingBottom="5px" xs={12}>
          <FormControlLabel 
            control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
            label="Use this address for payment details"
          />
        </Grid>

      </Grid>
        <Buttons_container>
            <button className='button' onClick={()=> setActiveStepIndex(activeStepIndex - 1)}>Back</button>
            <button  className="button" type="submit">Next</button>
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

