import React,{useEffect} from 'react'
import styled from 'styled-components'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useSelector } from "react-redux"
import { useState, useContext} from 'react';
import { OrderContext } from "../../App"
import { FormContext } from '../../pages/CheckoutPage'
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';



function ProductCart(props) {
 
  const {total} = useContext(FormContext);
  const {formData} = useContext(OrderContext);
  const [products, setProducts] = useState([])
  const cartItems =  useSelector((state) => state.cart.cartItems)
  const {t, i18n} = useTranslation()
  
  
  
  return (
    <Container>
      <div className='header-container'>
           
       
        <div>
          <span className='checkout'> ENOUZA - {t("common.checkout")} </span>
        </div>
      </div>
      
      <Wrraper>

        <div className="product-container">
          
            {cartItems?.map((item, index) => {
              return (
                <div className="child-container" key = {index}>
                  
                    <div className='img-container'>
                      <img src={item.selectedSku.attributes[item.selectedSku.colorKey].image} alt={item.selectedSku.colorKey} />

                      <div className="quantity">
                      <span>{item.quantity}</span>
                    </div>

                    </div>

                   
                  
                  <span className="product-title">{item?.name[i18n.language]? item?.name[i18n.language]:item?.name["en"]}</span>
                  <span className='price'>€{(item?.price * item.quantity).toFixed(2)}</span>
                  
                  {/*products?.find(product => product.id === item.id)?.sizes[item.selectedSize]*/}
                </div>
                
              )
            })}
       
        </div>

        <div className='discount' dir = {i18n.language === "ar" ? "rtl":"ltr"}>
          <input type="text" placeholder={t("common.enterCouponCode")} />
          <button   disabled={true} style={{ opacity:"0.8", cursor:"not-allowed"}} type="button"> {t("common.apply")} </button>
        </div>

        <Totals dir = {i18n.language === "ar" ? "rtl":"ltr"}>
        <div>
              <span>
                {t("common.subtotal")}
              </span>
              <span>
              €{total}
              </span>
            </div>
            <div>
              <span>
                {t("common.shipping")}
              </span>
              <span>
              €{Number(formData.shippingPrice).toFixed(2)}
              </span>
            </div>
          <div className='Total-price'>
            <span>
              {t("common.total")}
            </span>
            <span>
            €{(Number(total) + Number(formData.shippingPrice)).toFixed(2)}
            </span>
          </div>
        </Totals>
        
      </Wrraper>   
    </Container>
  )
}

export default ProductCart

const Container = styled.div`
    position:sticky;
    top:0;
    height:100vh;
    background: #F7F5F0;
    display:flex;
    flex-direction:column;
    
    .checkout{
      font-weight:600;
      font-size:20px;
      text-transform:uppercase;
      margin:0;
    }

    .header-container a {
      color:black;
    }
     .header-container{
      display:flex;
      align-items:center;
      padding: 23px 0;
       border-bottom: 1px solid #e4ded4;

      margin-bottom:30px;
   
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
    
    @media only screen and (max-width: 500px){
      &{
        height:auto;
      }
    
    }


`
const Wrraper = styled.div`
  
    width:75%;
    margin: 0 auto;


    .product-container{
        background: #ffffff;
        border-radius:4px;
        padding:15px 25px;
        overflow-y: auto;
        max-height:255px;
          border: 1px solid #e4ded4;

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
     display:flex;
     align-items:center;
    justify-content:center;
      margin:30px 0;
      background:#fff;
   
      padding: 20px 10px;
      border-radius:4px;
       border: 1px solid #e4ded4;
    }

    .discount input{
      height:40px;
      width:80%;
      padding:0 10px;
      border-radius:4px;
      border:1px solid lightgray;

      &:focus{
        border:1px solid lightblue;
        outline-style:none;
        
      }
    }
    
    .discount button{
      height:40px;
      background: #e6e6e6;
      color:#000000;
      border-radius:4px;
      padding:0 10px;
      margin:0 5px

    }

    @media only screen and (max-width: 500px){
      &{
        width:95%;
        font-size:16px;
      }
    
    }
   
     
`


const Totals = styled.div`
    margin:15px 0;
    background:#fff;
    border-radius:4px;
    border: 1px solid #e4ded4;
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