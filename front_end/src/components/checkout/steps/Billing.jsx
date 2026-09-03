import React, { useContext } from "react";
import styled from "styled-components";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import {
  Grid,
  TextField,
  FormControlLabel,
  Checkbox,
} from "@mui/material";

import { FormContext } from "../../../pages/CheckoutPage";
import { OrderContext } from "../../../App";

function Billing({ t }) {
  const { setActiveStepIndex } = useContext(FormContext);
  const { formData, setFormData } = useContext(OrderContext);

  const ValidationSchema = Yup.object().shape({
    firstName: Yup.string().required(
      t("common.please_enter_your_first_name")
    ),
    lastName: Yup.string().required(
      t("common.please_enter_your_last_name")
    ),
    email: Yup.string()
      .email(t("errors.error_invalid_email"))
      .required(t("common.please_enter_your_email")),
    city: Yup.string().required(
      t("common.please_enter_your_city")
    ),
    country: Yup.string().required(
      t("common.please_enter_your_country")
    ),
    zip: Yup.string().required(
      t("common.please_enter_your_zip_code")
    ),
    state: Yup.string().required(
      t("common.please_enter_your_state")
    ),
    address1: Yup.string().required(
      t("common.please_enter_your_address")
    ),
  });

  return (
    <Conatiner>
      <Formik
        initialValues={formData.logistics_address}
        validationSchema={ValidationSchema}
        onSubmit={(values) => {
          setFormData((prev) => ({
            ...prev,
            logistics_address: {
              ...prev.logistics_address,
              ...values,
            },
          }));

          setActiveStepIndex((prev) => prev + 1);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
        }) => (
          <Form id="billing-form">
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
                  helperText={
                    touched.firstName ? errors.firstName : ""
                  }
                  error={
                    touched.firstName &&
                    Boolean(errors.firstName)
                  }
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
                  helperText={
                    touched.lastName ? errors.lastName : ""
                  }
                  error={
                    touched.lastName &&
                    Boolean(errors.lastName)
                  }
                />
              </Grid>

              <Grid item xs={12} sm={10}>
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
                  helperText={
                    touched.email ? errors.email : ""
                  }
                  error={
                    touched.email &&
                    Boolean(errors.email)
                  }
                />
              </Grid>

              <Grid item xs={12} sm={10}>
                <TextField
                  value={values.address1}
                  onChange={handleChange}
                  id="address1"
                  name="address1"
                  label={t("common.address")}
                  fullWidth
                  autoComplete="address-line1"
                  variant="outlined"
                  helperText={
                    touched.address1 ? errors.address1 : ""
                  }
                  error={
                    touched.address1 &&
                    Boolean(errors.address1)
                  }
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
                  variant="outlined"
                  helperText={
                    touched.city ? errors.city : ""
                  }
                  error={
                    touched.city &&
                    Boolean(errors.city)
                  }
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
                  helperText={
                    touched.state ? errors.state : ""
                  }
                  error={
                    touched.state &&
                    Boolean(errors.state)
                  }
                />
              </Grid>

              <Grid item xs={12} sm={5}>
                <TextField
                  value={values.zip}
                  onChange={handleChange}
                  id="zip"
                  name="zip"
                  label={t("common.zipCode")}
                  autoComplete="postal-code"
                  variant="outlined"
                  fullWidth
                  helperText={
                    touched.zip ? errors.zip : ""
                  }
                  error={
                    touched.zip &&
                    Boolean(errors.zip)
                  }
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
                  autoComplete="country"
                  variant="outlined"
                  helperText={
                    touched.country ? errors.country : ""
                  }
                  error={
                    touched.country &&
                    Boolean(errors.country)
                  }
                />
              </Grid>
          {/*}
              <Grid
                item
                marginLeft="60px"
                justifyContent="center"
                paddingBottom="5px"
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      color="secondary"
                      name="saveAddress"
                      value="yes"
                    />
                  }
                  label={t("common.saving_address")}
                />
              </Grid>
              */}
             
            </Grid>
          </Form>
        )}
      </Formik>
    </Conatiner>
  );
}

export default Billing;

const Conatiner = styled.div`
  padding: 25px 15px;
`;