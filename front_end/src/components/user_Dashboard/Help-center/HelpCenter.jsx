import React from 'react'
import styled from 'styled-components'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import ReturnFAQ from './ReturnFAQ';
import ShippingFAQ from './ShippingFAQ';


 function HelpCenter() {

  return (
    <Container>
      <h2 className="main-header"> ANIMIS STORE FAQ</h2>
      <ReturnFAQ/>
      <ShippingFAQ/>
    </Container>
  )
}
export default HelpCenter

const Container = styled.div`
 margin-left:50px;
.main-header{
        font-family:"sans-serif";
        border-bottom:1px solid gray;
        width:fit-content;
        margin-left:15px;
        
      }

     
`
