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
  position: sticky;
  top: 0;

  height: 100vh;
  background: #f7f5f0;

  display: flex;
  flex-direction: column;

  border-left: 1px solid #e4ded4;

  .checkout {
    color: #1d1c1a;
    font-size: 17px;
    font-weight: 500;
    letter-spacing: 1.2px;
    text-transform: uppercase;
  }

  .header-container {
    min-height: 73px;

    display: flex;
    align-items: center;

    padding: 0 5%;
    border-bottom: 1px solid #e4ded4;

    background: #f7f5f0;
  }

  .header-container > div {
    width: 100%;
  }

  @media (max-width: 900px) {
    position: relative;
    height: auto;
    min-height: auto;

    border-left: none;
    border-top: 1px solid #e4ded4;

    .header-container {
      min-height: 68px;
      padding: 0 20px;
    }

    .checkout {
      font-size: 15px;
      letter-spacing: 1px;
    }
  }

  @media (max-width: 500px) {
    .header-container {
      min-height: 62px;
      padding: 0 16px;
    }

    .checkout {
      font-size: 14px;
      letter-spacing: 0.8px;
    }
  }
`;
const Wrraper = styled.div`
  width: 100%;
  max-width: 620px;

  margin: 0 auto;
  padding: 30px 8%;

  box-sizing: border-box;

  .product-container {
    background: transparent;

    border-top: 1px solid #e4ded4;
    border-bottom: 1px solid #e4ded4;

    padding: 4px 0;

    overflow-y: auto;
    max-height: 320px;

    scrollbar-width: thin;
    scrollbar-color: #ded4c4 transparent;
  }

  .product-container::-webkit-scrollbar {
    width: 4px;
  }

  .product-container::-webkit-scrollbar-track {
    background: transparent;
  }

  .product-container::-webkit-scrollbar-thumb {
    background: #ded4c4;
  }

  .child-container {
    display: grid;

    grid-template-columns: 74px minmax(0, 1fr) auto;

    align-items: center;
    gap: 16px;

    padding: 18px 0;

    border-bottom: 1px solid #e4ded4;
  }

  .child-container:last-child {
    border-bottom: none;
  }

  .img-container {
    position: relative;
    width: 74px;
    height: 88px;

    background: #ffffff;
    border: 1px solid #e4ded4;

    overflow: visible;
  }

  .product-container img {
    width: 100%;
    height: 100%;

    object-fit: cover;
    display: block;
  }

  .quantity {
    position: absolute;

    top: -8px;
    right: -8px;

    min-width: 22px;
    height: 22px;

    display: flex;
    align-items: center;
    justify-content: center;

    padding: 0 5px;

    background: #1d1c1a;
    color: #ffffff;

    border: 2px solid #f7f5f0;
    border-radius: 50%;

    font-size: 11px;
    font-weight: 500;
  }

  .product-title {
    width: 100%;

    color: #1d1c1a;

    font-size: 14px;
    font-weight: 400;

    line-height: 1.5;

    overflow: hidden;
    text-overflow: ellipsis;

    white-space: nowrap;
  }

  .price {
    color: #1d1c1a;

    font-size: 14px;
    font-weight: 500;

    white-space: nowrap;
  }

  .discount {
    display: flex;

    margin: 28px 0;

    padding: 0;

    background: transparent;
  }

  .discount input {
    flex: 1;

    height: 52px;

    padding: 0 16px;

    background: #ffffff;

    border: 1px solid #e4ded4;
    border-right: none;

    border-radius: 0;

    color: #1d1c1a;

    font-size: 16px;

    outline: none;

    transition: border-color 0.25s ease;
  }

  .discount input::placeholder {
    color: #77736b;
  }

  .discount input:focus {
    border-color: #b39a76;
  }

  .discount button {
    height: 52px;

    padding: 0 20px;

    background: #1d1c1a;
    color: #ffffff;

    border: none;
    border-radius: 0;

    font-size: 12px;
    font-weight: 500;

    letter-spacing: 1px;
    text-transform: uppercase;

    white-space: nowrap;

    transition: all 0.25s ease;
  }

  .discount button:disabled {
    opacity: 0.45 !important;
    cursor: not-allowed !important;
  }

  @media (max-width: 900px) {
    max-width: none;

    padding: 24px 20px;

    .product-container {
      max-height: 350px;
    }
  }

  @media (max-width: 500px) {
    padding: 20px 16px 28px;

    .product-container {
      max-height: 310px;
    }

    .child-container {
      grid-template-columns: 64px minmax(0, 1fr) auto;

      gap: 12px;

      padding: 15px 0;
    }

    .img-container {
      width: 64px;
      height: 76px;
    }

    .product-title {
      font-size: 13px;
    }

    .price {
      font-size: 13px;
    }

    .discount {
      margin: 24px 0;
    }

    .discount input {
      height: 50px;
      min-width: 0;

      padding: 0 12px;
    }

    .discount button {
      height: 50px;

      padding: 0 14px;

      font-size: 11px;
    }
  }
`;
const Totals = styled.div`
  margin-top: 10px;

  border-top: 1px solid #e4ded4;
  border-bottom: 1px solid #e4ded4;

  padding: 18px 0 8px;

  background: transparent;

  & > div {
    display: flex;
    justify-content: space-between;
    align-items: center;

    padding: 9px 0;

    color: #77736b;

    font-size: 14px;
  }

  & > div span:last-child {
    color: #1d1c1a;
    font-weight: 400;
  }

  .Total-price {
    margin-top: 12px;
    padding: 18px 0 14px;

    border-top: 1px solid #e4ded4;

    color: #1d1c1a;

    font-size: 18px;
    font-weight: 500;
  }

  .Total-price span:last-child {
    font-size: 24px;
    font-weight: 500;

    letter-spacing: -0.5px;
  }

  @media (max-width: 500px) {
    padding-top: 14px;

    & > div {
      font-size: 13px;
    }

    .Total-price {
      margin-top: 10px;
      padding-top: 16px;

      font-size: 16px;
    }

    .Total-price span:last-child {
      font-size: 22px;
    }
  }
`;