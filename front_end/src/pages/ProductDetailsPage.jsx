import React, { useEffect, useState } from "react";
import styled from "styled-components";
import AboutProductLayout from "../components/Product/aboutProduct/AboutProductLayout";
import UserServices from "../components/Services/UserServices";
import ProductLayout from "../components/Product/ProductLayout";
import SideCart from "../components/Product/productDetails/SideCart";
import PopUpShoppingMethod from "../components/Product/productDetails/PopUpShoppingMethod";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, buyNowItem } from "../features/cartSlice";
import { v4 as uuidv4 } from "uuid";
import {  toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useParams } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import HeadeSeo from "../../common/HeadeSeo";
import { useTranslation } from "react-i18next";
import { getProductDetails } from "../features/productDetails_slice";
import { useLayoutEffect } from "react";

function ProductDetailsPage({ setRetry, retry }) {
  const isAuth = window.localStorage.getItem("access_token");
  const [quantity, setQuantity] = useState(1);
  const [isPopUpShippingOpen, setIsPopUpShippingOpen] = useState(false);
  const [shippingMethodIndex, setShippingMethodIndex] = useState(0);
  const [countryCode, setCountryCode] = useState(window.localStorage.getItem("country") || "us");
 
  const [currentSku, setCurrentSku] = useState(null);
  const [maxOrderWorning, setMaxOrderWorning] = useState(false);
  const isLoading = useSelector((state) => state.products.isLoading);
  const productData = useSelector((state) => state.product.productData);
  const hasError = useSelector((state) => state.products.hasError);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const { t , i18n} = useTranslation()
  const params = useParams()
  
  const today = new Date();
  let date1 = new Date(today);
  let date2 = new Date(today);
  const [shippingInfo, setShippingInfo] = useState({
    date1: date1.toDateString(),
    date2: date2.toDateString(),
    from: 5,
    to: 7,
    cost: 0.0,
    methodName: t("sideCard.free_Shipping"),
  });



  const navigate = useNavigate();
  // constant
  const dispatch = useDispatch();
  const index = uuidv4();

  useLayoutEffect(() => {

      dispatch(getProductDetails(params.id))
      //window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
    
      
    }, [params.id])

  

  const addQuantity = () => {
    if (quantity < currentSku?.available_stock && quantity < 5) {
      setQuantity(quantity + 1);
    } else {
      setMaxOrderWorning(true);
    }

  };

  const subtractQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
      setMaxOrderWorning(false);
    }
  };

  const checkboxChange = (item, index) => {
    date1.setDate(date1.getDate() + Number(item.from));
    date2.setDate(date2.getDate() + Number(item.to));

    setShippingInfo({
      date1: date1.toDateString(),
      date2: date2.toDateString(),
      from: item.from,
      to: item.to,
      cost: item.cost,
      methodName: item.methodName,
    });

    setShippingMethodIndex(index);
  };




  const add_item_to_cart = (selectedSku, id, shippingInfo, name) => {
    console.log("selectedSku", selectedSku);
    if (cartItems.find(item => item.selectedSku.sku_attr === selectedSku.sku_attr)) 
      {

      toast.success(t("sideCard.item_already_in_cart"))

    }
    else {
      dispatch(addToCart(
        {
          
          id: id,
          selectedSku: selectedSku,
          name: name[i18n.language] || name["en"],
          available_shipping: shippingInfo,
          quantity: quantity,
          price: parseFloat(selectedSku.sellingPrice),
          subtotal: parseFloat(selectedSku.sellingPrice) * quantity,
          
        })
      )
      toast.success(t("sideCard.item_has_been_added"))

    }

  };
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [])

  const buy_Now_item = (selectedSku, id, shippingInfo, name) => {

    navigate("/checkout");
    dispatch(
      buyNowItem({
          id: id,
          selectedSku: selectedSku,
          name: name[i18n.language] || name["en"],
          available_shipping: shippingInfo,
          quantity: quantity,
          price: parseFloat(selectedSku.sellingPrice),
          subtotal: parseFloat(selectedSku.sellingPrice) * quantity,
      })
    );

  };

  return (
    <>
      {hasError ? (
        <div
          style={{
            height: "70vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          <span style={{ color: "gray" }}>{t("common.error")}</span>

          <button
            style={{
              fontWeight: "bolder",
              background: "lightgray",
              padding: "10px 20px",
              borderRadius: "4px",
            }}
            onClick={() => setRetry(!retry)}
          >
            {t("common.tryAgain")}
          </button>
        </div>
      ) : (
        <>
          <HeadeSeo title="Enouza" product={productData} />
          <PrentContainer>
            {isLoading ? (
              <div
                style={{
                  height: "70vh",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <CircularProgress
                  size={30}

                />
              </div>
            ) : (
              <Container>
                <div className="item2">
                  <UserServices />
                </div>

                <div className="item3">
                  <ProductLayout
                    quantity={quantity}
                    shippingInfo={shippingInfo}
                    checkboxChange={checkboxChange}
                    currentSku = {currentSku}
                    setCurrentSku = {setCurrentSku}
                  />
                </div>

                <div className="item4">
                  <SideCart
                    quantity={quantity}
                    setQuantity={setQuantity}
                    addQuantity={addQuantity}
                    subtractQuantity={subtractQuantity}
                    setIsPopUpShippingOpen={setIsPopUpShippingOpen}
                    isPopUpShippingOpen={isPopUpShippingOpen}
                    maxOrderWorning={maxOrderWorning}
                    setMaxOrderWorning={setMaxOrderWorning}
                    countryCode={countryCode}
                    shippingInfo={shippingInfo}
                    setCountryCode={setCountryCode}
                    add_item_to_cart={add_item_to_cart}
                    buy_Now_item={buy_Now_item}
                    shippingMethodIndex={shippingMethodIndex}
                    currentSku = {currentSku}
                    setShippingInfo={setShippingInfo}

                  />
                </div>
                <div className="item5">
                  <AboutProductLayout />
                </div>

                {isPopUpShippingOpen && (
                  <PopUpShoppingMethod
                    setIsPopUpShippingOpen={setIsPopUpShippingOpen}
                    isPopUpShippingOpen={isPopUpShippingOpen}
                    checkboxChange={checkboxChange}
                    shippingMethodIndex={shippingMethodIndex}
                    shippingInfo={shippingInfo}
                    
                  />
                )}
              </Container>
            )}
          </PrentContainer>
        </>
      )}
    </>
  );
}

export default ProductDetailsPage;
const PrentContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom:50px;
`;

const Container = styled.div`
  height: 100%;
  width: 100%;
  position: relative;
  display: grid;
  justify-content: center;
  align-content: center;
  grid-template-areas:
    "userServices userServices userServices userServices userServices userServices"
    "product product product product product  sideCart"
    "aboutProduct aboutProduct aboutProduct aboutProduct aboutProduct sideCart"
    "buyerTrustServices buyerTrustServices buyerTrustServices buyerTrustServices buyerTrustServices sideCart";

  .item2 {
    grid-area: userServices;
    padding: 0;
    margin: 0;
  }
  .item3 {
    grid-area: product;
  }
  .item4 {
    grid-area: sideCart;
    width: 310px;
    height: 400px;
    min-width: 300px;
    position: sticky;
    top: 75px;
    margin: 0 20px;
    margin-top: 5px;
  }
  .item5 {
    grid-area: aboutProduct;
    margin-top: 15px;
    padding: 0 10px;
  }

  /* Mobile Devices */
  @media (max-width: 480px) {
    /* Your mobile styles here */
  }

  /* Tablets/iPads */
  @media (max-width: 924px) {
    /* Your tablet styles here */
  }

  /* Desktops/Large Screens */
  @media (max-width: 1200px) {
    /* Your desktop/large screen styles here */
    grid-template-areas:
      "userServices userServices userServices userServices userServices userServices"
      "product product product product product  product"
      "sideCart sideCart sideCart sideCart sideCart sideCart"
      "aboutProduct aboutProduct aboutProduct aboutProduct aboutProduct aboutProduct";
    .item4 {
      margin: auto;
      position: static;
      width: 90%;
      min-width: 300px;
      max-width: 924px;
    }
  }
`;
