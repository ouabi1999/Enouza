import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from "uuid";
import axios from "axios"
import MainImages from './Sections/MainImages';
import ProductInfo from './Sections/ProductInfo';
import PopUpShoppingMethod from './Sections/PopUpShoppingMethod';
import { buyNowItem, addToCart } from '../../features/cartSlice';

function Product(props) {

    // select thumb img to render specific image
    const date = new Date()
    const productData = useSelector(state => state.products.productData)

    let ratings = productData[0]?.ratings.concat(productData[0]?.aliexpress_ratings);

    let sum_stars = ratings?.length > 0 ? ratings?.reduce((total, value) => {
         return total += value.stars
      }, 0):""
    

   
  return (
    <ParentContainer>
      <Container>
        <FirstSection>
          <MainImages
            productData = {productData[0]}
            picsDetailsIndex={props.picsDetailsIndex}
            colorIndex={props.colorIndex}
            selectPicsDetails={props.selectPicsDetails}
            isColorActive={props.isColorActive}
            isPicsDetailsActive={props.isPicsDetailsActive}
            deselectPicsDetails={props.deselectPicsDetails}
          />
        </FirstSection>

        <SecondSection>
          <ProductInfo
            setColorIndex={props.selectColor}
            colorIndex={props.colorIndex}
            sizeIndex={props.sizeIndex}
            selectSize={props.selectSize}
            productData = {productData[0]}
            ratings = {ratings}
            sum_stars = {sum_stars}

            
          />
        </SecondSection>  
      </Container>
      
    </ParentContainer>
  );
}

export default Product
const ParentContainer = styled.div`
      display:flex;
      justify-content:center;
      
      width:100%;
      max-width:1920px;
      min-width:320px;
      margin-bottom:20px;
     

`
const Container = styled.div`
     
    width:95%;
    padding:20px 0;
    display:flex;
    justify-content:space-between;
    border-bottom:1px solid lightgray;
    @media (max-width: 835px) {

      &{
        flex-wrap:wrap;
      }
    }


    .center-align{
      display:flex;
      align-items:center
    }
    @media (max-width: 924px) {

      &{
        width:95%;
        margin:auto;

      }

    }
  
`
const FirstSection = styled.div`
`  

const SecondSection = styled.div`


`;