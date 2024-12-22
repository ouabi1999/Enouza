import React, { useState } from 'react'

import LoginForm from "../components/auth/LoginForm"
import SignUpForm from "../components/auth/SignUpForm"
import ForgotPassword from "../components/auth/ForgotPassword"

function Auth() {
 
  const [pageActive , setPageActive] = useState("login")
  
  const show = (value)=>{
      
    setPageActive(value)
  }
  
  return (
    <>

      {pageActive === "login" && <LoginForm show={show} />}
      {pageActive === "sign-up" && <SignUpForm show={show} />}
      {pageActive  === "reset"&& <ForgotPassword show={show} />}



    </>
  )
}

export default Auth