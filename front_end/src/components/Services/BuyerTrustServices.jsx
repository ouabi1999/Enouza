import React from 'react'
import styled from 'styled-components'
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import CreditScoreIcon from '@mui/icons-material/CreditScore';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import { useTranslation } from 'react-i18next';

const BuyerTrustServices = ({divRef}) => {
    const {t, i18n} = useTranslation()

    return (
        <Container>
            <div ref = {divRef}>
              <SupportAgentIcon className="icon"/>
              <span>{t("buyerTrustServices.help_center.title")}</span>
              <p> {t("buyerTrustServices.help_center.description")}</p>
            </div>
            
            <div>
              <LocalShippingIcon className="icon"/>
              <span>{t("buyerTrustServices.worldwide_shipping.title")}</span>
              <p> {t("buyerTrustServices.worldwide_shipping.description")}</p>
              
            </div>

            <div>
              <CreditScoreIcon className="icon"/>
              <span>{t("buyerTrustServices.safe_Payment.title")}</span>
              <p> {t("buyerTrustServices.safe_Payment.description")}</p>
            </div>
            
            
            <div>
              <AdminPanelSettingsIcon className="icon"/>
              <span>{t("buyerTrustServices.Shop_with_confidence.title")}</span>
              <p> {t("buyerTrustServices.Shop_with_confidence.description")}</p>
            </div>
           
            
          
        </Container>
    )
}

export default BuyerTrustServices
const Container = styled.div`

  width:100%;
  padding:25px 0;
  background-color: #ffffff;
  display:grid;
  grid-template-columns: repeat(4, auto) ;
  grid-gap:10px;
  position:relative;

  
  div{
    display:flex;
    flex-direction:column;
    
    align-items:center;
    
   
  }
  
  p{
     width:50%;
     margin-bottom: 0;
     line-height: 20px;
     word-break: keep-all;
     text-align:center;
     font-size:12px;
     border-right: 1px solid #1A1A1A;
     border-left: 1px solid #1a1a1aff;
     padding:0 10px;
  }
  
  .icon{
      font-size:40px;
      color: #C4A96A;
  }
  @media only screen and (max-width: 1000px) {
  &{
     
    grid-template-columns: repeat(2,auto);
  }
}
@media only screen and (max-width: 760px) {
  &{
     
    grid-template-columns: repeat(1,auto);
  }
}

`


