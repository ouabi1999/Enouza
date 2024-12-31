import React, { Component, useState } from 'react'
import styled  from "styled-components"
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { CircularProgress } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import { Grid, TextField, Button, IconButton, InputAdornment } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from "yup"
import ApiInstance from "../../../common/baseUrl"

function NewsLetter(){
    const [isLoading,  setIsLoading] = useState(false)
    const [email, setEmail] = useState("")
    const [error, setError] = useState(null)


   
    
    
     
    const handleSubscribe = (values)=>{
      
        setIsLoading(true)
        ApiInstance.post("subscribe-newsletter/", 
          {
            email: values.email,
          }
          )
    
          .then(result => {
          
    
              setError(false)
              setEmail("")
              values.email = ""
              toast.success("You are subscribed")
              setIsLoading(false);
              return result.json()
        
            }
    
    
          )
          .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
            setError(error.response.data.error)
            toast.error(error.response.data.error)
            setIsLoading(false)
    
          });
    }
    const editSechema = Yup.object({
        email: Yup.string().email('Invalid email address').required('Required'),
    
      })
    const formik = useFormik({
        initialValues: {email: email},
        validationSchema: editSechema, 
        onSubmit:  values => {
            setEmail(values.email)
          
            handleSubscribe( values)
           
            
          // same shape as initial values
          
        }
      });

        return (
            <Container  onSubmit={formik.handleSubmit}>
                
                <Wrapp>
               
                    <span className="title">Newsletter</span>
                    <p>
                        Signup for our newsletter to get notified about sales.

                    </p>
                    
                    <div className="subscribe">
                        <span>
                            <MailOutlineIcon className="mail-icon" />
                        </span>

                        <input
                            id="email"
                            name="email"
                            type="email"
                            onChange={formik.handleChange}
                            value={formik.values.email}
                        />
                        <button type="submit" > 
                        
                        {isLoading && (
                
                    <span>
                        
                    <CircularProgress 
                        style={{marginLeft:"3px" , marginRight:"3px"}}
                        size={18} 
                        thickness={4} 
                        value={100}
                     />
                     </span>
                    )}         
                    <span>Subscribe</span>
                    </button>
                        
                    </div>
                    
                </Wrapp>
                <ToastContainer
                  position="top-right"
                  zIndex= {200}
                  autoClose={5000}
                  hideProgressBar={false}
                  newestOnTop={false}
                  closeOnClick
                  rtl={false}
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover
                />
            </Container>
        )
    }

export default NewsLetter
const Container = styled.form`
    min-width:300px;
    margin-top:20px;
    height:110%;
    
`
const Wrapp = styled.div`
    height:90%;
    width:100%;

    display:flex;
    justify-content:center;
    align-items:center;
    flex-direction:column;
    border-radius:6px;
    box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
    background:rgb(0, 0, 0);
    padding:10px 0;
    margin-right:6px;
    
    p{
        font-size:15px;
        width:50%;
        word-break: keep-all;;
        text-align:center;
        margin:0 0 10px  0px;
        color:#ffffff;
        
        
    }
    .title{
        color:orange;
        font-size:20px;
        font-weight:600;
    }
    .subscribe{
        display:flex;
        justify-content:center;
        height:30px;
        min-width:290px;
        width:100vw;
        max-width:360px;
        
    
    }
    
    
    
    .subscribe input[type="email"]{
         border:1px solid lightgray;
        
         border-left:none;
         outline:none;
         width:50vw;
       
    }
    .subscribe button{
        height:30px;
        background-color:rgb(0, 26, 51);
        color:#fff;
        border:1px solid lightgray;
        border-left:none;
        display:flex;
        align-items:center;
      
       
    }
    
    
    .mail-icon{
        background:rgb(0, 26, 51);
        color:#fff;
        font-weight:600;
        padding:0;
        margin:0;
        font-size:28px;
        border:1px solid lightgrey;
    
        
    }
`