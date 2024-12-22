import React, {useEffect, useContext} from 'react'
import styled from "styled-components"
import { FormContext } from '../../pages/CheckoutPage';

function Stepper() {
    const { activeStepIndex, setActiveStepIndex } = useContext(FormContext);
    
    useEffect(() => {
        const stepperItems = document.querySelectorAll(".stepper-item");
        stepperItems.forEach((step, i) => {
          if (i <= activeStepIndex) {
        step.classList.add("bg-indigo-500", "text-white");
          } else {
            step.classList.remove("bg-indigo-500", "text-white");
          }
        });

      }, [activeStepIndex]);
  return (
    <Container>
       <Wraper>
        <div className='stepper-item'>
            <h5> Sign in </h5>
        </div>
        <div className="flex-auto border-t-2"></div>
   
        <div className='stepper-item'>
            <h5> Address </h5>
        </div>
        <div className="flex-auto border-t-2"></div>
        <div className='stepper-item' >
            <h5> Shipping  </h5>
        </div>
        <div className="flex-auto border-t-2"></div>
        <div className='stepper-item'>
            <h5> Payment </h5>
        </div>
      </Wraper>
    </Container>
  )
}

export default Stepper;

const Container = styled.div`
  
 
  
 


`
const Wraper = styled.div`
  display:flex;
  justify-content:center;
  align-items:center;
  padding: 20.5px 8px;
  border-bottom:1px solid gray;
  box-shadow: 0px 0px 0px 0.5px rgba(50, 50, 93, 0.1),
  0px 2px 5px 0px rgba(50, 50, 93, 0.1), 0px 1px 1.5px 0px rgba(0, 0, 0, 0.07);
  
 .stepper-item{
     height:35px;
     display:flex;
     align-items:center;
     padding:0px 10px;
     border-radius:6px;
  }

.bg-indigo-500{
 background:#000;
}

.text-white{
    color:#ffff
}

.border-t-2{
    border-top:1px solid black;
    width:25%;

}

h5{
min-width:50px;
text-align:center;
}
@media only screen and (max-width: 500px){
      h5{

        min-width:30px;
        white-space: nowrap;
        font-size:10px;
     }
    }
   

`