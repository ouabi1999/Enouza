import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from "uuid";
import axios from "axios"
import MainImages from './productDetails/MainImages';
import ProductInfo from './productDetails/ProductInfo';
import PopUpShoppingMethod from './productDetails/PopUpShoppingMethod';
import { buyNowItem, addToCart } from '../../features/cartSlice';
import { useTranslation } from 'react-i18next';
import HeadeSeo from '../../../common/HeadeSeo';

function Product({currentSku, setCurrentSku}) {

    // select thumb img to render specific image
    const date = new Date()
    const productData = useSelector(state => state.product.productData)

    let ratings = productData?.ratings?.concat(productData?.aliexpress_ratings);

    let sum_stars = ratings?.length > 0 ? ratings?.reduce((total, value) => {
         return total += value.stars
      }, 0):""
      
   
    const [selectedAttributes, setSelectedAttributes] = useState({});
    const [availableAttributes, setAvailableAttributes] = useState({});
    const [isColorActive, setIsColorActive] = useState(true);
    const [isPicsDetailsActive, setIsPicsDetailsActive] = useState(false);
    const [picsDetailsIndex, setPicsDetailsIndex] = useState(0)
    const { t, i18n } = useTranslation();

   const selectColor = () => {
    setIsColorActive(true);
    setIsPicsDetailsActive(false);
  };

  const selectPicsDetails = (index) => {
    setPicsDetailsIndex(index);
    setIsColorActive(false);
    setIsPicsDetailsActive(true);
  };
  
  
    
    
   
  return (
    <ParentContainer>
                <HeadeSeo title={productData?.name[i18n.language] || productData?.name["en"]} description={productData?.description[i18n.language] } />

      <Container>
        <FirstSection>
          <MainImages
            productData = {productData}
            picsDetailsIndex={picsDetailsIndex}
            selectPicsDetails={selectPicsDetails}
            isColorActive={isColorActive}
            isPicsDetailsActive={isPicsDetailsActive}
            currentSku= {currentSku}
            

          />
        </FirstSection>

        <SecondSection>
          <ProductInfo
            

            productData = {productData}
            ratings = {ratings}
            sum_stars = {sum_stars}
            selectedAttributes={selectedAttributes}
            setSelectedAttributes=            {setSelectedAttributes}
            availableAttributes=            {availableAttributes}
            setAvailableAttributes=            {setAvailableAttributes}
            currentSku=            {currentSku}
            setCurrentSku=            {setCurrentSku}
            selectColor = {selectColor}


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
      max-width:1920px;
      min-width:320px;
      margin-bottom:20px;
      padding:0 10px;
      @media (max-width: 480px) {

&{
  padding:0 2px;

}

}

      
`
const Container = styled.div`
    width:100%;
    display:flex;
    justify-content:space-between;
    border-bottom:1px solid lightgray;
    @media only screen and (max-width: 835px) {

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
        width:100%;

      }

    }
  
`
const FirstSection = styled.div`
`  

const SecondSection = styled.div`


`;