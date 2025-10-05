import React,{useContext, useState, useEffect} from 'react'
import styled from 'styled-components';
import { useSelector } from 'react-redux';


import Billing from './Billing';
import StripeContanier from './StripeContanier';
import { FormContext } from '../../../pages/CheckoutPage'
import LogendIn from './LogendIn';
import Shipping from './Shipping';
import {OrderContext} from "../../../App"
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
function Steps() {
 
    const navigate = useNavigate()
    const isAuth = window.localStorage.getItem("access_token")
    const user = useSelector(state => state.auth.user)
    const [signInMessage, setsignInMessage] = useState(null)
  
    const { activeStepIndex, setActiveStepIndex } = useContext(FormContext);
    const { formData, setFormData} = useContext(OrderContext);
    const { t, i18n } = useTranslation();
    
    const backButton =() => {
        setActiveStepIndex(activeStepIndex - 1);
      }

    const onSubmit=() => {
  
            setActiveStepIndex(activeStepIndex + 1);
            setFormData({...formData, userId:user.id})
           
          
       
        
      }
    let stepContent;
    switch (activeStepIndex) {
      case 0:
        stepContent = !isAuth ? <div> {t("common.checkout_as_guest")}</div>: <LogendIn t= {t}/>;
        break;
      case 1:
        
        stepContent = <Billing t= {t} />;
        break;
      case 2:
        stepContent = <Shipping t= {t}/>;
        break;
        case 3:
          stepContent = <StripeContanier i18n = {i18n} t = {t}/>;
          break;
      default:
        break;
    }
  
    return (
    <Container>
       
        {stepContent}

        {activeStepIndex === 0 &&(
          <button  className='button' onClick={onSubmit}>{t("common.next")}</button>
        )}
        
       
    </Container>
    )
    
  }
  const Container = styled.div`
        
        width:100%;
        display:flex;
        flex-direction:column;
        min-height:500px;
        justify-content:center;
        align-items:center;
        position:sticky;
        top:0;
       
    
      

        
        .button{
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

export default Steps