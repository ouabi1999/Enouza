import React from 'react'
import styled from 'styled-components'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
function LogendIn() {
  return (
    <Wrapper>
        <div>
            <CheckCircleIcon className='check-icon' />
            <div>
              <span>You are loged in Continue
                </span>
                </div>
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
   background:#b2e0ff;
   border-radius:8px;
   div{
       display:flex;
       flex-direction:column;
       align-items:center;
       justify-content:center;
   }
   .check-icon{
       font-size:50px;
       color:#ffff;
   }
   span{
    font-size:1.2rem;
    font-weight:500;
   }

`