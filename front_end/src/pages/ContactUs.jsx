import React, {useLayoutEffect, useState } from 'react'
import styled from "styled-components"
import { toast, ToastContainer } from 'react-toastify'
import { CircularProgress } from '@mui/material'
import HeadeSeo from '../../common/HeadeSeo'
import ApiInstance from '../../common/baseUrl'


function ContactUs(){
    const [email, setEmail] = useState("")
    const [message, setMessage] = useState("")
    const [loading, setIsLoading] = useState(false)
    const [messageRequired, setMessageRequired] = useState(false)
    const [emailRequired,  setEmailRequired] = useState(false)

    useLayoutEffect(() => {
        window.scrollTo({top: 0, left: 0,});
      }, [])

      const handldSendEmail = (event)=>{
        event.preventDefault()
        if (message !== "" && email !== ""){
         
        setIsLoading(true)
 
        ApiInstance.post("contact-us/", 
      
        {
            email :email,
            message : message
        },
         )
        .then(() => {
            setIsLoading(false)
            toast.success("Email sent")
            setEmail("")
            setMessage("")
            
        })
        .catch(message => {
            console.log(message)
            toast.error("an error occurred in the server ")
            setIsLoading(false)  
        })
    }
    }
     
        return (
            <Container>
                <HeadeSeo title = {"Animis - Contact us"}/>
                
                
            <div className="contact_container">
                <form onSubmit={handldSendEmail}>
                    <div className="contact_sections">
                        <label for="email">Please fell free, and text us about any problem.</label>
                        <input type="email" 
                                value={email} 
                                onChange={(e)=> setEmail(e.target.value)}
                                placeholder="email@example.com" required/>
                        
                        <textarea type="text" max="105" 
                            value={message} 
                            required 
                            placeholder="Message"
                            onChange={(e)=> setMessage(e.target.value)}
                        >
                        </textarea>
                        <button type="submit" disabled={loading}> 
                          
                        {loading && (
                
                <span>
              
                <CircularProgress 
                    style={{marginLeft:"3px" , marginRight:"3px", color:"#fff"}}
                    size={18} 
                    thickness={4} 
                    value={100}
                 />
                 </span>
                )}         
                <span>Send</span>
                </button>
                    </div>
                </form>
            </div>

            </Container>
        )
    
}

export default ContactUs

const Container = styled.div`


.contact_container{
    display:flex;
    justify-content: center;
    align-items: center;
}
.contact_sections{
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width:50vw;
}
.contact_sections input[type="email"]{
    border:none;
    border-radius: 4px;
    padding:10px 6px;
    margin:10px  0px;
    outline: none;
    width:40vw;
    background-color: rgba(100, 148, 237, 0.623);
    color:rgb(0, 0, 0);
    min-width:300px;
}
.contact_sections label[for="email"]{
    
    padding-top: 20px;
    color:rgb(1, 39, 1);
    text-transform: uppercase;
    min-width:300px;
    font-family:Arial, Helvetica, sans-serif;
    font-size:0.9rem;
    
}
.contact_sections textarea{
    width:50vw;
    border-radius: 4px;
    border: 1px solid rgba(100, 148, 237, 0.623);
    outline: none;
    padding:2px 5px;
    min-width:300px;
    height: 100vh;
    min-height:150px;
    max-height:300px;
    font-weight: bold;
}
.contact_sections button{
    margin-top: 5px;
    margin-bottom: 10px;
    background: #0052D4; 
    border-radius: 6px;
    padding:5px  15px;
    color:rgb(255, 255, 255);
    border:none;
    font-weight: bold;
    height:35px;
    display:flex;
    align-items:center;
    

}



`