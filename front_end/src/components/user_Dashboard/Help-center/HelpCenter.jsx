import React, { useLayoutEffect } from 'react'
import styled from 'styled-components'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import ReturnFAQ from './ReturnFAQ';
import ShippingFAQ from './ShippingFAQ';
import { useTranslation } from 'react-i18next';


function HelpCenter() {
  const { t } = useTranslation()
  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0 });
  }, []);
  return (
    <Container>
      <span className="main-header">{t("profile.enouza_faq")} </span>
      <ReturnFAQ />
      <ShippingFAQ />
    </Container>
  )
}
export default HelpCenter

const Container = styled.div`
 margin-left:20px;
 margin-top:10px;
 .main-header{
  font-size:20px;
  font-weight:bold;
  margin-right:20px;
 }
.main-header{
        border-bottom:1px solid gray;
        width:fit-content;
        margin-left:15px;
        
      }
 
      @media only screen and (max-width: 460px) {
    /* For mobile phones: */
         margin-left:0;
    .main-header{
      font-size:16px;
    }
  }
`
