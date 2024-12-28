import React from 'react'
import styled from 'styled-components'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import ReturnFAQ from './ReturnFAQ';
import ShippingFAQ from './ShippingFAQ';


 function HelpCenter() {

  return (
    <Container>
      <span className="main-header"> ANIMIS STORE FAQ</span>
      <ReturnFAQ/>
      <ShippingFAQ/>
    </Container>
  )
}
export default HelpCenter

const Container = styled.div`
 margin-left:50px;
 span{
  font-size:20px;
  font-weight:bold;
 }
.main-header{
        border-bottom:1px solid gray;
        width:fit-content;
        margin-left:15px;
        
      }
 
      @media only screen and (max-width: 460px) {
    /* For mobile phones: */
      
    .main-header{
      font-size:16px;
    }
  }
`
