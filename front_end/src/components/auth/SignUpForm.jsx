import React, { useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import {
  Grid,
  TextField,
  MenuItem,
  Button,
  IconButton,
  InputAdornment,
  CircularProgress,
} from "@mui/material";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import Flag from "react-world-flags";
import countriesData from "../../../common/countryData.json";
import { useFormik } from "formik";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { setSignUp } from "../../features/authSlice";
import { useLayoutEffect } from "react";
import HeadeSeo from "../../../common/HeadeSeo";
import ApiInstance from "../../../common/baseUrl";

function SignUpForm({ show }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuth =  window.localStorage.getItem("access_token")

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    email: "",
    password: "",
    confirmPassword: "",
    country: "",
    countryCode: window.localStorage.getItem("country") || "ES",
    birthDate: new Date(),
    showPassword: false,
  });

  useLayoutEffect(() => {
    if (isAuth) {
      window.location.href = "/";
    }
  }, []);

  const genders = [
    { gender: "Male", icon: <MaleIcon /> },
    { gender: "Female", icon: <FemaleIcon /> },
  ];
  const handleClickShowPassword = () => {
    setFormData({
      ...formData,
      showPassword: !formData.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const editSechema = Yup.object({
    firstName: Yup.string()
      .max(15, "Must be 15 characters or less")
      .required("Please enter your Fist Name"),

    lastName: Yup.string()
      .max(15, "Must be 15 characters or less")
      .required("Required"),
    country: Yup.string().required("Please select yoyr country "),
    email: Yup.string().email("Invalid email address").required("Required"),
    gender: Yup.mixed().oneOf(["Male", "Female"]).defined(),
    birthDate: Yup.date()
      .required("Please enter a date of birth")
      .max(new Date(), "You can't be born in the future!"),
    password: Yup.string().required("Please Enter your password"),
  });

  const formik = useFormik({
    initialValues: formData,
    validationSchema: editSechema,
    onSubmit: (values) => {
      // same shape as initial values
      setIsLoading(true);

      ApiInstance.post(
        "register/",
        {
          firstName: values.firstName,
          lastName: values.lastName,
          gender: values.gender,
          email: values.email,
          password: values.password,
          country: values.country,
          countryCode: formData.countryCode,
        }
      )
      .then(response => {
      // Await JSON parsing
        dispatch(setSignUp(response.data));
        console.log(response.data);
        setIsLoading(false);
        window.location.href = "/"

        return response.data
      })
      .catch((error) => {
        console.error("There has been a problem with your fetch operation:", error);
    
        // Check if `error.response` exists for HTTP errors
        if (error.response && error.response.status >= 400 && error.response.status < 500) {
          setError("This email address is already registered");
        } else {
          setError("Something went wrong..!");
        }
        setIsLoading(false);
      });
    },
  });
  return (
    <>
      <HeadeSeo title=" Animis - Sign-up" />
      {!isAuth && (
        <Form onSubmit={formik.handleSubmit}>
          <div className="logo-img-container">
            <strong>Sign Up</strong>
          </div>
          <Formwrapper>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  fullWidth
                  id="firstName"
                  label="First Name"
                  variant="filled"
                  size="small"
                  value={formik.values.firstName}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.firstName && Boolean(formik.errors.firstName)
                  }
                  helperText={
                    formik.touched.firstName && formik.errors.firstName
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="lastName"
                  fullWidth
                  id="firstName"
                  label="Last Name"
                  variant="filled"
                  size="small"
                  value={formik.values.lastName}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.lastName && Boolean(formik.errors.lastName)
                  }
                  helperText={formik.touched.lastName && formik.errors.lastName}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  variant="filled"
                  size="small"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
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
                  {genders.map((sex, index) => {
                    return (
                      <MenuItem key={index} value={sex.gender}>
                        <div style={{ display: "flex", alignItems: "center" }}>
                          {sex.icon}
                          <span>{sex.gender}</span>
                        </div>
                      </MenuItem>
                    );
                  })}
                </TextField>
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="Country"
                  id="filled-size-small"
                  select
                  fullWidth
                  variant="filled"
                  name="country"
                  size="small"
                  value={formik.values.country}
                  error={
                    formik.touched.country && Boolean(formik.errors.country)
                  }
                  helperText={formik.touched.country && formik.errors.country}
                  autoComplete="false"
                  onChange={formik.handleChange}
                >
                  {countriesData?.map((country, index) => {
                    return (
                      <MenuItem
                        key={index}
                        value={country.label}
                        defaultValue=""
                        onClick={() =>
                          setFormData({
                            ...formData,
                            countryCode: country.value,
                          })
                        }
                      >
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <span>{country.label}</span>
                        </div>
                      </MenuItem>
                    );
                  })}
                </TextField>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="Password"
                  id="filled-size-small"
                  fullWidth
                  variant="filled"
                  size="small"
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.password && Boolean(formik.errors.password)
                  }
                  helperText={formik.touched.password && formik.errors.password}
                  type={formData.showPassword ? "text" : "password"}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                        >
                          {formData.showPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              {error && (
                <Grid item xs={12} container justifyContent="center">
                  <span style={{ color: "red", fontSize: "14px" }}>
                    {error}
                  </span>
                </Grid>
              )}
              <Grid
                item
                xs={12}
                container
                justifyContent="center"
                alignItems="center"
              >
                <Button type="submit" variant="contained" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <span>Sign up</span>

                      <CircularProgress
                        style={{ marginLeft: "3px" }}
                        size={22}
                        thickness={6}
                        value={100}
                      />
                    </>
                  ) : (
                    "Sign up"
                  )}
                </Button>
              </Grid>
            </Grid>
          </Formwrapper>

          <Wrapper>
            <span> By clicking "Sign up", I agree to the </span>
            <Link to="/terms-of-services"> Terms of services </Link>
            <Link to="#" onClick={() => show("login")} className="login-link">
              I have already an account
            </Link>
          </Wrapper>
        </Form>
      )}
    </>
  );
}

export default SignUpForm;
const Form = styled.form`
  margin: auto;
  margin-top: 4%;

  width: 33%;
  position: relative;
  min-width: 360px;
  border-radius: 8px;
  border-style: none;
  box-shadow: 0px 5px 5px 3px rgba(27, 27, 27, 0.1);
  background-color: #fff;
  padding: 0 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  .logo {
    width: 100%;
  }

  .logo-img-container {
    width: 90px;
    margin: 20px 0;
    height: 80px;
  }
  strong {
    margin-bottom: 15px;
    margin-top: 0;
    font-family: sans-serif;
    font-size: 20px;
  }

  @media only screen and (max-width: 490px) {
    & {
      width: 98%;
      min-width: 320px;
    }
  }
`;
const Formwrapper = styled.div``;

const Wrapper = styled.div`
  margin-top: 6px;
  span {
    font-size: 0.9rem;
  }
  a[href="/terms-of-services"] {
    color: rgb(30, 100, 200);
    font-weight: bold;
    font-size: 0.7rem;
  }

  .login-link {
    display: flex;
    justify-content: flex-end;
    font-weight: bold;
    margin: 10px 0px;
    color: rgb(124, 124, 124);
    font-size: 0.8rem;
  }
  .login-link:hover {
    text-decoration: underline;
    opacity: 0.7;
  }
`;
