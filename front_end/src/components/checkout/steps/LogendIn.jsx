import React from 'react'
import styled from 'styled-components'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
function LogendIn() {
  return (
    <Wrapper>
        <div>
            <CheckCircleIcon className='check-icon' />
            <h3>You are loged in Continue</h3>
        </div>

    </Wrapper>
  )
}

export default LogendIn
const Wrapper  =  styled.div`
   display:flex;
   justify-content:center;
   align-items:center;
   width:300px;
   height:180px;
   background:#99ffdd;
   border-radius:8px;
   div{
       display:flex;
       flex-direction:column;
       align-items:center;
       justify-content:center;
   }
   .check-icon{
       font-size:50px;
       color:#66ff66;
   }

`