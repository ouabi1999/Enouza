import React, { useEffect, useState, useRef } from 'react'
import styled from 'styled-components'
import countriesData from "../../../../common/countryData.json"

import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import VerifiedUserOutlinedIcon from "@mui/icons-material/VerifiedUserOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import AutoAwesomeMotionOutlinedIcon  from "@mui/icons-material/AutoAwesomeMotionOutlined";
import LocationOnOutlinedIcon from  "@mui/icons-material/LocationOnOutlined";
import Flag from 'react-world-flags';
import PopUpShoppingMethod from './PopUpShoppingMethod';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../../features/cartSlice';
import { setLocation } from '../../../features/locationSlice';
import { ClickAwayListener } from '@mui/material';

function SideCart(props) {
    const {isOpen, setIsOpen} = useState(false)
    const dispatch = useDispatch()
   const productData = useSelector(state => state.products.productData)
   const [fromDate, setFromDate] = useState("")
   const [toDate, setToDate] = useState("")
   let country = useSelector(state => state.location.country)

   const today = new Date();
   const {
    shippingInfo,
    addQuantity,
    maxOrderWorning,
    setMaxOrderWorning,
    subtractQuantity,
    quantity,
    add_item_to_cart,
    buy_Now_item,
    setIsPopUpShippingOpen,
    isPopUpShippingOpen,
    shippingMethodIndex,
    hideDiv,
    divRef
  } = props;

  let Date1 = new Date(today)
  let  Date2 = new Date(today)

    useEffect(() => {
      
      Date1.setDate(Date1.getDate() + (Number(productData[0]?.available_shipping[shippingMethodIndex]?.from) || 5))
      setFromDate(Date1.toDateString())
      Date2.setDate(Date2.getDate() + (Number(productData[0]?.available_shipping[shippingMethodIndex]?.to) || 7))
      setToDate(Date2.toDateString())
      

      

    }, [productData, shippingMethodIndex])
    
    const intervalRef = useRef(0);

  

    
  return (
    <Container>
      <div>
        <div className="shipping-to">
          <div className="center-align">
            <LocationOnOutlinedIcon className="location-icon" />
            <span className="header">Chip to </span>
          </div>

          <div className="center-align flex-end">
            <Flag code={country} height={12} />

            <div>
              <select
                value={country}
                className="chip-to-select"
                style={{
                  border: "none",
                  width: "75px",
                  outline: "none",
                  cursor: "pointer",
                }}
                onChange={(e) => {
                  dispatch(setLocation(e.target.value));

                }}
              >
                {countriesData?.map((item, index) => {
                  return (
                    <option key={index} value={item.value}>
                      <span>{item.label}</span>
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
        </div>
        <div className="shipping-method">
          <div className="shipping">
            <div className="center-align" style={{ marginTop: "10px" }}>
              <LocalShippingOutlinedIcon className="Shipping-icon" />
              {productData[0]?.available_shipping?.length > 0 ? (
                <span className="header"> {Number(productData[0]?.available_shipping[shippingMethodIndex]?.cost) === 0 ? "Free shipping" : productData[0]?.available_shipping[shippingMethodIndex]?.methodName}</span>
            ):
            <span className="header"> {shippingInfo.cost <= 0 ? "Free shipping" : shippingInfo.methodName} </span>

          }
            </div>
            <div> 
              <ArrowForwardIosOutlinedIcon className="arrow-icon" onClick={() => setIsPopUpShippingOpen(!isPopUpShippingOpen)} />
            </div>
          </div>
          <div className="delivrey-time">
            <span> Delivrey:</span>
            {productData[0]?.available_shipping?.length > 0 ? (
                <span> {fromDate.slice(3, -4) } - {toDate.slice(7, -4) }</span>

            ):
            <span> {shippingInfo.date1?.slice(3, -4) } - {shippingInfo.date2?.slice(7, -4) }</span>

          }
          </div>
        </div>
        <div className="security-privacy">
          <div style={{ display: "flex", alignItems: "center" }}>
            <VerifiedUserOutlinedIcon className="security-icon" />
            <span className="header">Security & Privacy</span>
          </div>
          <div className="security-privacy-text">
            <span>
              Safe payments: We do not share your personal details with any
              third parties without your consent. Secure personal details: We
              protect your privacy and keep your personal details safe and
              secure.
            </span>
          </div>
        </div>
        <div className="center-align">
          <AutoAwesomeMotionOutlinedIcon className="security-icon" />
          <span className="header"> Quantity </span>
        </div>
        <div className="quantity-container">
          <div className="quantity-button-container">
            <button onClick={subtractQuantity}> -</button>
            <span> {quantity} </span>
            <button onClick={addQuantity}>+</button>
          </div>
          <div>
            <span>{productData[0]?.quantity - quantity} available</span>
          </div>
          
          <ClickAwayListener
          mouseEvent="onMouseDown"
          touchEvent="onScroll"
          onClickAway={()=> setMaxOrderWorning(false)}
          
          >
            <span className={maxOrderWorning ? "max-order-warning":"not-show"}>
              You have reached the maximum order limit
              </span>
        </ClickAwayListener>
      
        </div>
        
        <div>
          <div className="button-container">
            <button className="buy-button" onClick={()=> buy_Now_item(productData[0])}> Buy now</button>
            <button
              className="add-button"
              onClick={() => add_item_to_cart(productData[0])}
            >
              {" "}
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default SideCart
 
 
 

const Container = styled.div`
  padding: 10px;
  background: #fff;
  border: 1px solid lightgray;
  border-radius: 6px;
 .center-align{
  display:flex;
  align-items:center;
 }


  
  .chip-to-select {
    -webkit-appearance: none;
    appearance: none;
    padding: 5px;
    background:none;
  }

  .shipping-to {
    display: flex;
    justify-content: space-between;
  }

  .security-privacy {
  }

  .header {
    font-size: 0.9rem;
    font-weight: bold;
  }
  .security-privacy-text {
    font-size: 0.7rem;
    color: #868385;
  }

  .location-icon,
  .security-icon {
    font-size: 16px;
    color: #4d4c4c;
    margin-right: 3px;
  }

  .button-container {
    display: flex;
    justify-content: space-evenly;
  }
  .buy-button {
    border: none;
    cursor: pointer;
    padding: 10px 5px;
    border-radius: 4px;
    background: #055bfc;
    color: #fff;
    font-weight: bold;
    width: 80px;
  }
  .add-button {
    border: none;
    cursor: pointer;
    padding: 10px 5px;
    border-radius: 4px;
    background: #252525;
    color: #fff;
    font-weight: bold;
    width: 100px;
  }
  .shipping-method {
  }
  .shipping {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  }
  .arrow-icon {
    display: grid;
    place-self: end;
    font-size: 15px;
    cursor: pointer;
  }
  .Shipping-icon {
    font-size: 16px;
    color: #4d4c4c;
    margin-right: 3px;
  }
  .delivrey-time {
    margin-bottom: 10px;
  }
  .delivrey-time span:first-child {
    color: gray;
    margin-left: 19px;
    font-size: 0.99rem;
  }
  .security-privacy-text {
    width: 75%;
    margin-left: 10px;
    white-space: wrap;
    border-bottom: 1px solid lightgray;
    padding: 10px;
    margin-bottom: 20px;
  }

  .quantity-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 25px;
  }
  .quantity-button-container {
    display: flex;

    align-items: center;
  }
  .quantity-button-container button {
    border: none;
    border-radius: 50%;
    padding: 5px;
    width: 30px;
    height: 30px;
    margin: 0 10px;
    cursor: pointer;
  }
  .quantity-container span:nth-child(1) {
    font-size: 0.8rem;
    color: #5e5c5c;
  }
  @media only screen and (max-width: 500px) {
    .add-button, .buy-button {
      font-size:12px;
      padding: 8px 4px;
      width:76px;
                
      }
  }
  .not-show {
    display: none;
  }
  .max-order-warning {
    display: block;
    color: #f73939;
    font-size: 0.8rem;
    animation-name: warning;
    animation-duration: 250ms;  
    transition:all 250ms ease-in;   
  
  @keyframes warning {
    from {
      font-size: 0.1rem;
    }
    to {
      font-size: 0.8rem;
    }
  }
}
`;
