import React, {  useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, TextField, Button, IconButton, InputAdornment } from '@mui/material';
import { Link, useLocation, useNavigate}  from 'react-router-dom'
import styled from 'styled-components';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useFormik } from 'formik';
import * as Yup from "yup"
import CircularProgress, {
} from '@mui/material/CircularProgress';
import { useLayoutEffect } from 'react';
//import HeadeSeo from "../../common/Heade"
import ApiInstance from "../../../common/baseUrl"
import { setLogin } from '../../features/authSlice';

function LoginForm({show}) {
  
  const { state } = useLocation();
  
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user =  null //useSelector(state => state.auth.auth) ||  []
  const isAuth = window.localStorage.getItem("access_token") 
  const [isLoading, setIsLoading] = useState(false)
  const [error , setError] = useState(false)
  const [showPassword , setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email:"",
    password:"",
  })
  
  

  const hideerror = () => {
    setError(null)
  }
  const handleClickShowPassword = () => {


    setShowPassword(!showPassword);

  }

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };


  const sign_in = (values) =>{

    setIsLoading(true)
    ApiInstance.post("login/", 
      values
    ).then(response => {
      console.log(response)
      dispatch(setLogin(response.data))
      setIsLoading(false);
      navigate(-1)
    
    })

      
      .catch(error => {
        console.log('There has been a problem with your fetch operation:', error.status);
        if (error.status === 400){
          setError("Password or email incorrect")
        }else if (error.status === 401){
          setError("This email address not registered.")
        }else{
          setError("Somthing went wrong..!")
        }
        setIsLoading(false)

      });
  

  }


  
 
  useLayoutEffect(() => {
    if(isAuth !== null) {
      window.location.href = "/"
    }
  
  }, [])

  const editSechema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Required'),
    password: Yup.string().required("Please Enter your password")

  })


  const formik = useFormik({
    initialValues: formData,
    validationSchema: editSechema, 
    onSubmit: values => {

      // same shape as initial values
      setFormData({ ...values })
      sign_in(values)
    }
  });
  
  return (
    <>
    
    {/*<HeadeSeo title= "Animis - Login"/>*/}
    
    {isAuth == null && (
    <Form onSubmit = {formik.handleSubmit}>
        <div className='logo-img-container'>
          
      
      <strong> LOGIN</strong>
      </div>
      {user == null && (
     <Grid container spacing={2}>

          <Grid item xs={12}>
            <TextField
              label="Email"
              id="filled-size-small"
              fullWidth
              variant="filled"
         
              name="email"
              onMouseDown={hideerror}
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Password"
              id="filled-size-small"
              fullWidth
              variant="filled"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              onMouseDown={hideerror}
              type={showPassword ? "text" : "password"}
              InputProps={{
                endAdornment: <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>

                </InputAdornment>
              }}
            />
           
          </Grid>
          {error && (
            <Grid item xs={12} container
              justifyContent="center" >
              <span style={{ color: "red", fontSize: "14px" }}>{error}</span>
            </Grid>
          )}
          
          <Grid item xs={12} 
                  container    
                  justifyContent="center"
                  
          
          >
            <Button type="submit" variant="contained" disabled={isLoading} >

             {isLoading ? (
                  <>
                   <span>Login</span>
                    <CircularProgress 
                      style={{marginLeft:"3px"}}
                        size={22} 
                        thickness={6} 
                        value={100}
                                  />
                    </>) 
                  : "Login"}

            </Button>
          </Grid>
          <Grid item xs={12}
              container 
              justifyContent="space-evenly" 
              className="other-info" >
         
            <Link to="#"  onClick={()=> show("reset")} className="f-password"> Forgot Password</Link>
            <Link to="#" onClick={()=> show("sign-up")}> Create an account</Link>

          </Grid>
          
        </Grid>
         ) 
         
        }
    
      </Form>
    )}
    </>
  )
}

export default LoginForm

 


const Form = styled.form`
    margin:auto;
    margin-top:4%;
    width:33%;
    min-width:360px;
    min-height:480px;
    border-radius:8px;
    border-style:none;
    box-shadow:0 5px 8px 6px rgba(27, 27, 27, 0.1);
    background-color: #fff;
    padding:0 10px;
    display:flex;
    flex-direction:column;
    align-items:center;
    @media only screen and (max-width: 490px) {
 
    &{
        width:98%;
        min-width:320px;
      }
    }
  
.logo{
   width:100%;
   
}
.logo-img-container{
  width:90px;
  margin:20px 0;
  height:80px;
}
.other-info{
  margin-top:25px;
  margin-bottom:15px;
}
.other-info a{
  font-size:0.8rem;
  font-weight:bold;
  color:rgb(30, 100, 80);
  
  
}
strong{
    margin-bottom:15px;
    font-family:sans-serif;
    font-size:25px;
  }
/* spinner/processing state, errors */
.spinner,
.spinner:before,
.spinner:after {
  border-radius: 50%;
}
.spinner {
  color: #ffffff;
  font-size: 22px;
  text-indent: -99999px;
  margin: 0px auto;
  position: relative;
  width: 20px;
  height: 20px;
  box-shadow: inset 0 0 0 2px;
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
}
.spinner:before,
.spinner:after {
  position: absolute;
  content: '';
}
.spinner:before {
  width: 10.4px;
  height: 20.4px;
  background: #5469d4;
  border-radius: 20.4px 0 0 20.4px;
  top: -0.2px;
  left: -0.2px;
  -webkit-transform-origin: 10.4px 10.2px;
  transform-origin: 10.4px 10.2px;
  -webkit-animation: loading 2s infinite ease 1.5s;
  animation: loading 2s infinite ease 1.5s;
}
.spinner:after {
  width: 10.4px;
  height: 10.2px;
  background: #5469d4;
  border-radius: 0 10.2px 10.2px 0;
  top: -0.1px;
  left: 10.2px;
  -webkit-transform-origin: 0px 10.2px;
  transform-origin: 0px 10.2px;
  -webkit-animation: loading 2s infinite ease;
  animation: loading 2s infinite ease;
}
@keyframes loading {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
`
const FormWrapper = styled.div`
`
