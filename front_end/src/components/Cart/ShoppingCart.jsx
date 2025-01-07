import React, { useEffect } from 'react';
import { removeFromCart, addQuantity, subtractQuantity, setCartItems } from "../../features/cartSlice"
import DeleteIcon from '@mui/icons-material/Delete';
import styled from 'styled-components';
import EmptyCart from './EmptyCart';
import ProductSubtotal from './ProductSubtotal';
import { useLayoutEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import axios from 'axios';
import HeadeSeo from '../../../common/HeadeSeo';

function ShoppingCart() {
  const dispatch = useDispatch()
  const [products, setProducts] = useState([])
  const cartItems =  useSelector((state) => state.cart.cartItems)
  const [isLoading, setIsLoading] = useState(false)
  const productData = useSelector((state) => state.products.productData)
  useLayoutEffect(() => {

      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }, [])

  useEffect(() => {
    getShoppingCart_product()
    console.log(cartItems)
  }, [])
  
  const updateCart = (products) => {
      
      const newCart = cartItems.filter((item) =>
        productData[0].some((product) => product.id === item.id)
      );
      window.localStorage.setItem("cartItems", JSON.stringify(newCart))
      dispatch(setCartItems(newCart))
    };

    
  const getShoppingCart_product = ()=>{
    setIsLoading(true)
    axios.post('/api/get_shopping_cart_products', cartItems)
      .then(response => {
        setIsLoading(false)
        //dispatch(setProducts(response.data.products))
      
         setProducts(response.data.products);
         updateCart(response.data.products)
         
        
        })
      .catch(error => {
        setIsLoading(false)
        console.error(error);
      });

  } 
   
  

  
  return (
    <Container>
      <HeadeSeo title = "Enouza - shopping cart"/>
      
      <h2 style={{ fontFamily: "sans-serif" }} className="shopping-cart-h2">Shopping Cart ({cartItems?.length})</h2>
      {cartItems?.length === 0 ? (
        <EmptyCart />
      )
        :
        (
          <div>

          <Wrap>
              <Wrapper>
                  {cartItems?.map((item, index)=> {
                    return (

                      <div key={index} className="product-container">
                        <div className="product-img">
                          <img src={item.color} alt={""} />

                        </div>

                        <div className='flex-container'>

                          <div className="first-child" >
                          
                            <span>
                                {item?.name}
                            </span>
                            

                              <div className="delete-button">
                                <button onClick={() => dispatch(removeFromCart(index))}>
                                {productData[0]?.id === item.id &&(
                                      <DeleteIcon />
                                )}
                                </button>
                              </div>


                            

                          </div>
                          <div className="selected-size">
                            <span>

                              {item.size}
                            </span>


                          </div>
                          <div className="thired-child">
                            <span className="price"> US ${item.price}</span>
                            <div className="Quantity">
                              <button
                                className="subtract-quantity-button"
                                onClick={() => dispatch(subtractQuantity(index))}>
                                -
                              </button>
                              <span>{item.quantity}</span>
                              <button
                                className="add-quantity-button"
                                onClick={() => dispatch(addQuantity(index))}>
                                +
                              </button>
                            </div>

                          </div>





                          {/*this.props.cartItems.cartItems.length !== 0 && (
                              <div className="subtotal">
                                {" "}
                                <span>${item.subtotal.toFixed(2)}</span>
                              </div>
                            )*/}

                        </div>
                      </div>

                    )
                  })}


              </Wrapper>

              <ProductSubtotal
                cartItems={cartItems}
              />
            </Wrap>
          </div>
        )}
    </Container>
  )
}



export default ShoppingCart


const Container = styled.div`
  background-color: #fff;
  min-height:90vh;
  min-width:320px;
  padding-bottom:60px;
  background-color:rgba(250, 250, 250, 0.4);
  margin:auto;
  
  
  .shopping-cart-h2{
      font-weight:bold;
      color:#000;
      margin-top:0;
      padding: 15px 20px;
      background:#fff;
      
}



 
.cartnumber{
  margin:20px 35px;
  font-size: large;
  font-weight: bold;
  text-shadow: 10px 8px  4px rgb(85, 84, 84);
  letter-spacing: 1px;
}
.cartnumber>span{
  color:red
}

.delete-button>button{
  
  border:none;
  color:#000;
  background:none;
 
}

.delete-button>button:hover{
  color:tomato
}





`
const Wrap = styled.div`
   width:96vw;
   margin:auto;
  
   display:flex;
   @media only screen and (max-width: 1200px){

  &{
        flex-direction:column;
        
   }
  
  


}   

`
const Wrapper = styled.div`
    position:relative;
    box-shadow: rgba(60, 64, 67, 0.12) 0px 1px 2px 0px, rgba(60, 64, 67, 0.12) 0px 2px 6px 2px;
    background:#ffff;
    margin-right:20px;
   

    .product-container{
        display:flex;
        padding:10px;
        border-radius:4px;
        border-bottom:1px solid lightgray;
       
    }

    .flex-container{
      display:flex;
      flex-direction:column;
      max-width:780px;
      width:calc(95vw - 100px);
      min-width:175px;
    
      
     

    }
    
.product-img{
  display:flex;
  align-items:center;
  
}

.product-img img{
  width:100px;
  height:120px;
  box-shadow: rgba(60, 64, 67, 0.12) 0px 1px 2px 0px, rgba(60, 64, 67, 0.40) 0px 2px 6px 2px;
  margin-right:10px;
  object-fit:cover;
  animation: skeleton-loading 1s linear infinite alternate;
}



.product-img div{
       display:flex;
       flex-direction:column;
 
  

      }

    .first-child{
      display:flex;
      align-items:center;
      justify-content: space-between;
      width:100%;
      
      
      
      
    }
    .first-child span{
      text-overflow:ellipsis;
      white-space: nowrap; 
      overflow: hidden;
      font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      opacity:0.6;
      

    }

    .selected-size{
      font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
      text-transform:uppercase;
      color:rgb(20, 51, 102);
    }

    .price{
      font-family:'Trebuchet MS', sans-serif;
      margin-top:8px;
    }

    .thired-child{
         display:flex;
       
         justify-content: space-between;
         align-items:center;
    }

    .Quantity{
 
        border: 1px solid rgb(196, 193, 193);
        display:flex;
        justify-content: space-between;
        border-radius: 4px;
        align-items: center;
        font-size: 20px;
        font-weight: bold;
        width:85px;
        height:25px; 
        margin-top:8px;
      
}
    .subtract-quantity-button{
        border-bottom-left-radius: 4px;
        border-top-left-radius: 4px;
        border:none;
        width:25px;
        outline-style: none; 
        height:100%;
     
  }
  
  .add-quantity-button{
    border:none;
    border-bottom-right-radius: 4px;
    border-top-right-radius: 4px;
    width:25px;
    outline-style: none;
    height:100%;
    
  }

  .Quantity button:hover{
    color:white;
    background-color:rgb(199, 196, 196)
   }
   
   .Quantity>span{
    
     text-align: center;
     font-size: small;
     color:blue
   }

   .skeleton {
        animation: skeleton-loading 1s linear infinite alternate;
    }

    @keyframes skeleton-loading {
    0% {
       background-color: #c2cfd6;
      }
      100% {
        background-color: #f0f3f5;
      }
    }
  
    @media only screen and (max-width: 1200px){


    &{
        margin-right:0;
      }

    .flex-container{
        max-width:995px;

      }

    } 
  

`
  


