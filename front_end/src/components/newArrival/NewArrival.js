import React, { useEffect } from 'react'
import styled from 'styled-components'
import "../../App.css"
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode, Navigation, Pagination } from "swiper";
// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { Link } from 'react-router-dom'
import axios from 'axios'

function NewArrival({newArrivalsProducts}) {

  return (

     <Parent_container>
     <img  className="title" src="./images/newarrivals.svg" alt=""/>
      <div className='container'>
     <Swiper
        
        slidesPerView={2}
        spaceBetween={10}
        freeMode={true}
        loop={true}
        
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}

        pagination={{
          clickable: true,
        }}
        breakpoints={{
         
          // when window width is >= 320px
          320: {
            slidesPerView: 2,
            spaceBetween: 10
          },
          
         
          650: {
            slidesPerView: 3,
            spaceBetween: 10
          },
         
          840: {
            slidesPerView: 4,
            spaceBetween: 10
          },
          1024:{
            slidesPerView: 5,
            spaceBetween: 10,
          },
          1280: {
            slidesPerView: 6,
            spaceBetween: 10
          },
        }
          
      }
      modules={[FreeMode, Navigation, Autoplay]}
      className="mySwiper"
      >   
     
            {newArrivalsProducts.length >  0 ? (
                  newArrivalsProducts?.map((item, index) => {
                    return (
                     
                     <SwiperSlide key={index}>
                        <Wrapp>
                        <Link   to={"product_details/" + item.id}>
                            <img src={item.colors[0]} alt="" />
                          </Link>
                         
                      
                          <div className='price-discount-container'>
                          <span className="product-price"> US ${item.price} </span>
                          <span className={item.discount > item.price && item.discount && "product-discount"}> {item.discount > item.price ? `-${((item.discount - item.price) / item.discount * 100).toFixed(0)}% `  : ""}</span>
                          </div>
                        </Wrapp>
                       </SwiperSlide>
                      
                  )
                 })

              ) :
              <Wrapper>
                <div className="skeleton item1"/> 
                <div className="skeleton item2"/> 
                <div className="skeleton item3" />
                <div className="skeleton item4"/> 
                <div className="skeleton item5"/> 
                <div className="skeleton item6"/>
              </Wrapper>
            }
          </Swiper>
     
          </div>
     </Parent_container>
   )
}

export default NewArrival
const Parent_container = styled.div`
   width:95%;
   min-height:200px;
   margin: 15px auto;
   box-shadow: 0px 0px 0px 0.5px rgba(50, 50, 93, 0.1),
   0px 2px 5px 0px rgba(50, 50, 93, 0.1),
   0px 1px 1.5px 0px rgba(0, 0, 0, 0.07);
   border-radius: 4px;
   background: rgb(241,145,49);
   background: linear-gradient(90deg, rgba(63,231,251,0.4) 0%, rgba(68,55,251,0.5) 100%);
   padding: 15px 4px;
   .container{
      display:flex;
      justify-content:center;
   }
   .product-price{
      color:#000000;
     
      font-family:'Trebuchet MS', sans-serif;
      font-size:20px;
      font-weight:bold;
    
      white-space: nowrap; 
    }

    .product-discount{
      font-size:12px;
      text-decoration:line-through;
      font-family: sans-serif;
      color:#ffff;
      padding:4px 10px;
      background:rgb(255, 0, 0, 0.4);
      border-radius: 0px 8px 0 0px;
      
    }
    .price-discount-container{
        display:flex;
        align-items:center;
        margin-left:2px;
        justify-content:space-between;
        padding:4px;
    }
   
   img.title {
      width:125px;
      height:auto;
      margin-bottom:5px;
      margin-left:10px;
   }
  .mySwiper{
         margin:auto;
         width:100%;
  }

   @media only screen and (min-width: 600px) {
    /* For tablets: */
       .item3 {
        display:none;
      }
      
    
  }

  @media only screen and (max-width: 480px) {
    .item1, .item2, .item3, .item4 {
        display:none;
        
        
      }
      .skeleton{
        height:175px;
        width:140px;
      }
      
  }
  @media only screen and (max-width: 768px) {
    /* For mobile phones: */
    .product-price{
        font-size:15px;
    }
    .item1, .item2 {
        display:none;
      }
   
  }
  
   .skeleton {
      animation: skeleton-loading 1s linear infinite alternate;
      width:180px;
      height:195px;
      border:1px solid lightgray;
   }
  
  @-webkit-keyframes skeleton-loading {
    0% {
      background-color: #c2cfd6;
    }
    100% {
      background-color: #f0f3f5;
    }
  }
  
  @keyframes skeleton-loading {
    0% {
      background-color: #c2cfd6;
    }
    100% {
      background-color: #f0f3f5;
    }
  }
`


const Wrapp = styled.div` 
   margin:0 10px;
   background:#c2cfd6;
   border-radius:4px;
   max-width:180px;
   width:100%;
   img{
      width:100%;
      min-width:110px;
      max-width:180px;
      height:185px;
      object-fit:cover;
     
      
      box-shadow: 0px 0px 0px 0.5px rgba(50, 50, 93, 0.1),
               0px 2px 5px 0px rgba(50, 50, 93, 0.1),
               0px 1px 1.5px 0px rgba(0, 0, 0, 0.07);
   
     
      }
    @media only screen and (max-width: 768px) {
    /* For mobile phones: */
     
   
  }
  
   

`
const Wrapper = styled.div` 
    display:flex;
    justify-content:space-around;
`


