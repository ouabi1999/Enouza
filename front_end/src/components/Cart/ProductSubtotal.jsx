import React from 'react'
import styled from 'styled-components'
import { Link , useNavigate } from 'react-router-dom';



function ProductSubtotal(props) {
    const navigate = useNavigate()
    const auth = window.localStorage.getItem("access_token")
    const location = window.locationbar
    const navigateTo = ()=>{
     
        if (auth){
            navigate("/checkout")
        }
        else{
            navigate("/auth")
        }
    }
  return (
        <Container>
            <div className='container'>
            <div className="total-section">

            <h2>Summary</h2>

              <div className="total">
                  <h4>Subtotal</h4>
                  {props.cartItems?.length !== 0 && (

                      <span>
                          {" "}
                          ${props.cartItems?.reduce((a, c) => a + c.price * c.quantity, 0).toFixed(2)}
                      </span>

                  )}
              </div>
              <div className="total">
                  <h4>Total</h4>
                  {props.cartItems?.length !== 0 && (

                      <span>
                          {" "}
                          ${props.cartItems?.reduce((a, c) => a + c.price * c.quantity, 0).toFixed(2)}
                      </span>

                  )}

              </div>

            </div>
            <div className='procces-button-container'>
                <button  onClick={navigateTo} className="procces-button">
                    Checkout
                </button>
            </div>
            </div>
        </Container>
    )
}

export default ProductSubtotal

const Container = styled.div`
    
    font-family:Open Sans,Roboto,Arial,Helvetica,sans-serif,SimSun;
    width:100%;

  .container{
    border:2px solid rgb(255, 255, 255);
    box-shadow: rgba(60, 64, 67, 0.12) 0px 1px 2px 0px, rgba(60, 64, 67, 0.12) 0px 2px 6px 2px;
    padding: 5px 10px;
    max-width:350px;
    height:285px;
    position:sticky;
    top:15%;
    background:#fff;
    width:100%;
    font-family: sans-serif;
    min-width:185px;
  }
  .total{
   
    color:#000;
    display:flex;
    align-items:center;
    justify-content:space-between;

  }
  
  .procces-button-container{
    display:flex;
    justify-content:center;
  }
  .procces-button {
    margin-top:20px;
    padding:10px 0;
    border-radius: 20px; 
    text-align:center;
    background:#000;
    color:#fff;
    font-size:20px;
    font-weight: normal;
    width:100%;
    letter-spacing:1px;
    max-width:300px;
    min-width:115px;
  }

  .total-section{
    border-bottom: 2px solid rgb(208, 209, 207);
    
    
    }
   
    

    @media only screen and (max-width: 1200px){
        &{
            position:none;
            
            margin-top:20px;
            display:flex;
            justify-content:center;
            align-items:center;
        }
        .container{
            max-width:65%;
        }

    }
    @media only screen and (max-width: 780px){
        .container{
            max-width:100%;
        }
          

    }
    
`