import React,{useEffect} from 'react'
import styled from 'styled-components'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useSelector } from "react-redux"
import { useState, useContext} from 'react';
import { OrderContext } from "../../App"
import { FormContext } from '../../pages/CheckoutPage'
import { Link } from 'react-router-dom';
import axios from 'axios';
import productData from "../../../common/data.json"


function ProductCart(props) {
 
  const {total} = useContext(FormContext);
  const {formData} = useContext(OrderContext);
  const [products, setProducts] = useState([])
  const cartItems =  useSelector((state) => state.cart.cartItems)

  
  
  
  return (
    <Container>
      <div className='header-container'>
           
        <Link to = "/" >
        <div style = {{display:"flex", alignItems:"stretch", marginBottom:"3px"}}>
          <span>
            <ArrowBackIcon style={{width:"19px"}} />
          </span>
          <span>
          Back
        </span>
        </div>
        </Link>

        <div>
          <h3>CHECKOUT</h3>
        </div>
      </div>
      
      <Wrraper>

        <div className="product-container">
          
            {cartItems?.map((item, index) => {
              return (
                <div className="child-container" key = {index}>
                  
                    <div className='img-container'>
                      <img src={item.color} alt="" />
                      <div className="quantity">
                      <span>{item.quantity}</span>
                    </div>

                    </div>

                   
                  
                  <span className="product-title">{item.name}</span>
                  <span className='price'>${(item?.price * item.quantity).toFixed(2)}</span>
                  
                  {/*products?.find(product => product.id === item.id)?.sizes[item.selectedSize]*/}
                </div>
                
              )
            })}
       
        </div>

        <div className='discount'>
          <input type="text" placeholder='Discount code' />
          <button   disabled={true} style={{ opacity:"0.8", cursor:"not-allowed"}} type="button"> Apply </button>
        </div>

        <Totals>
        <div>
              <span>
                Subtotal
              </span>
              <span>
               ${total}
              </span>
            </div>
            <div>
              <span>
                Shipping
              </span>
              <span>
                 ${Number(formData.shippingPrice).toFixed(2)}
              </span>
            </div>
          <div className='Total-price'>
            <span>
              Total
            </span>
            <span>
              ${(Number(total) + Number(formData.shippingPrice)).toFixed(2)}
            </span>
          </div>
        </Totals>
        
      </Wrraper>   
    </Container>
  )
}

export default ProductCart

const Container = styled.div`
    
    height:100%;
    background: rgb(63,231,251);
    background: linear-gradient(90deg, rgba(63,231,251,0.4) 0%, rgba(68,55,251,0.5) 100%);
    display:flex;
    flex-direction:column;

    h3{
      letter-spacing:2px;
      margin:0;
    }

    .header-container a {
      color:black;
    }
     .header-container{
      display:flex;
      align-items:center;
      padding: 16px 20px;
      border-bottom:1px solid gray;
      margin-bottom:10px;
      width:100%;
      box-shadow: 0px 0px 0px 0.5px rgba(50, 50, 93, 0.1),
      0px 2px 5px 0px rgba(50, 50, 93, 0.1), 0px 1px 1.5px 0px rgba(0, 0, 0, 0.07);
     }

     .header-container span{
      margin-top:10px;
     }
     .header-container img{
         width:220px;  
     }
     
     .header-container >div{
     
      margin: 0 auto;

     }
     .product-title{
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap; 
      width:100%;
      max-width:520px;
      font-size:13px;
      margin-right:8px;   
    }
    



`
const Wrraper = styled.div`
  
    width:75%;
    margin: 0 auto;


    .product-container{
        background:rgba(255, 255, 255, 0.5);
        border-radius:6px;
        box-shadow: 0px 4px 5.5px 0px rgba(0, 0, 0, 0.07);
        padding:5px 10px;
    }


    .child-container{
      display:flex;
      align-items:center;
    }
   
    .product-container img{
     
      width:60px;
      height:75px;
      object-fit:cover;
      box-shadow: 0px 4px 5.5px 0px rgba(0, 0, 0,);
      border:1px solid lightgray;
      padding:1px;
      margin-right:4px;
      
    }
    .img-container{
       position:relative;
    }
    
     .quantity{
          border-radius:50%;
          padding:1px 4px;
          font-size:12px;
          min-width:20px;
          min-height:20px;
          text-align:center;
          background:#000;
          color:#ffff;
          position:absolute;
          top:-6px;
          left:-6px;
     }
   
     p{
      font-size:13px;
      
    }
   
   
    .discount{
     
      margin-top:10px;
      background:#fff;
   
      padding: 15px 10px;
      border-radius:6px;
    }

    .discount input{
      height:40px;
      width:87%;
      padding-left:5px;
      border-radius:4px;
      border:1px solid lightgray;
      margin-right:8px;
      margin-bottom:3px;

      &:focus{
        border:1px solid lightblue;
        outline-style:none;
        
      }
    }
    
    .discount button{
      height:40px;
      background:#000;
      color:#ffff;
      border-radius:4px;
      padding:0 10px;
    }

    @media only screen and (max-width: 500px){
      &{
        width:95%;
      }
    
    }
   
     
`


const Totals = styled.div`
    margin:15px 0;
    width:100%;
    background:#fff;
    border-radius:6px;
    padding:15px;


    & div{
      display:flex;
      justify-content:space-between;
      
      padding:10px 5px;
      margin-bottom:4px;
    }
    & div:last-child{
         border-top:1px solid lightgray;
    }

    .Total-price{
         font-size:24px;
         font-weight:bold;

    }

    



`