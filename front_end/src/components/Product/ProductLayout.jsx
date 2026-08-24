import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

import MainImages from "./productDetails/MainImages";
import ProductInfo from "./productDetails/ProductInfo";
import { useTranslation } from "react-i18next";

function ProductLayout({
  quantity,
  shippingInfo,

  currentSku,
  setCurrentSku,

  setShippingInfo,

  addQuantity,
  subtractQuantity,

  maxOrderWorning,
  setMaxOrderWorning,

  add_item_to_cart,
  buy_Now_item,

  setIsPopUpShippingOpen,
  isPopUpShippingOpen,

  shippingMethodIndex,
}) {
  const productData = useSelector(
    (state) => state.product.productData
  );

   let ratings = productData?.ratings;


   let sum_stars = ratings?.length > 0 ? ratings?.reduce((total, value) => {
         return total += value.stars
      }, 0):""

  const [selectedAttributes, setSelectedAttributes] =
    useState({});

  const [availableAttributes, setAvailableAttributes] =
    useState({});

  const [picsDetailsIndex, setPicsDetailsIndex] =
    useState(0);

  const [isPicsDetailsActive, setIsPicsDetailsActive] =
    useState(true);

  const [isColorActive, setIsColorActive] =
    useState(false);
  const {i18n} = useTranslation()
  useEffect(() => {
    setPicsDetailsIndex(0);
    setIsPicsDetailsActive(true);
    setIsColorActive(false);
  }, [productData]);

  const selectPicsDetails = (index) => {
    setPicsDetailsIndex(index);
    setIsPicsDetailsActive(true);
    setIsColorActive(false);
  };

  const selectColor = () => {
    setIsColorActive(true);
  };

  if (!productData) {
    return null;
  }
  const isRTL = i18n.dir() === "rtl";
 
  return (
    <Section dir = {"ltr"}>
      <ProductGrid>

        <ImageSide>
          <MainImages
            currentSku={currentSku}
            productData={productData}
            picsDetailsIndex={picsDetailsIndex}
            selectPicsDetails={selectPicsDetails}
            isPicsDetailsActive={isPicsDetailsActive}
            isColorActive={isColorActive}
          />
        </ImageSide>

        <InfoSide>
          <ProductInfo
            productData={productData}
            ratings={ratings}
            sum_stars={sum_stars}

            selectedAttributes={
              selectedAttributes
            }

            setSelectedAttributes={
              setSelectedAttributes
            }

            availableAttributes={
              availableAttributes
            }

            setAvailableAttributes={
              setAvailableAttributes
            }

            currentSku={currentSku}
            setCurrentSku={setCurrentSku}

            selectColor={selectColor}

            quantity={quantity}
            addQuantity={addQuantity}
            subtractQuantity={subtractQuantity}

            maxOrderWorning={
              maxOrderWorning
            }

            setMaxOrderWorning={
              setMaxOrderWorning
            }

            shippingInfo={shippingInfo}

            add_item_to_cart={
              add_item_to_cart
            }

            buy_Now_item={
              buy_Now_item
            }

            setIsPopUpShippingOpen={
              setIsPopUpShippingOpen
            }

            isPopUpShippingOpen={
              isPopUpShippingOpen
            }

            shippingMethodIndex={
              shippingMethodIndex
            }

            setShippingInfo={
              setShippingInfo
            }
          />
        </InfoSide>

      </ProductGrid>
    </Section>
  );
}

export default ProductLayout;
const COLORS = {
  cream: "#f8efdd",
  white: "#FFFFFF",
  ink: "#1D1C1A",
  muted: "#77736B",
  gold: "#B39A76",
  border: "#E4DED4",
};


/* =========================================================
   SECTION
========================================================= */

const Section = styled.section`
  width: 100%;
  padding:20px 50px 75px;
 
  box-sizing: border-box;

  @media (max-width: 900px) {
   padding: 20px 20px 0;
  }

  @media (max-width: 600px) {
    padding: 20px 20px 0;
  }
`;


/* =========================================================
   GRID
========================================================= */

const ProductGrid = styled.div`
  width: 100%;
  max-width: 1500px;

  margin: 0 auto;

  display: grid;

  grid-template-columns: 1.5fr 1fr;

  align-items: center;

  gap: 40px;

  @media (max-width: 1000px) {
    grid-template-columns:
      minmax(0, 1fr)
      minmax(330px, 0.85fr);

    gap: 35px;
  }

  @media (max-width: 800px) {
    grid-template-columns: 1fr;

    max-width: 680px;

    gap: 35px;
  }
`;


/* =========================================================
   IMAGE
========================================================= */

const ImageSide = styled.div`
  

  box-sizing: border-box;
  position: sticky;
  top: 75px;

  align-self: start;

  min-width: 0;

  @media (max-width: 900px) {
    position: static;
  }
`;


/* =========================================================
   PRODUCT INFO
========================================================= */

const InfoSide = styled.div`
  width: 100%;

  min-width: 0;

  box-sizing: border-box;

  padding-top: 3px;

  @media (max-width: 800px) {
    padding-top: 0;
  }
`;