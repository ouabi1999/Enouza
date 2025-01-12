import React, { useEffect, useRef, useState } from "react";
import NavBar from "../components/Navbar/NavBar";
import styled from "styled-components";
import AboutProductLayout from "../components/Product/aboutProduct/AboutProductLayout";
import UserServices from "../components/Services/UserServices";
import ProductLayout from "../components/Product/ProductLayout";
import BuyerTrustServices from "../components/Services/BuyerTrustServices";
import SideCart from "../components/Product/Sections/SideCart";
import PopUpShoppingMethod from "../components/Product/Sections/PopUpShoppingMethod";
import productData from "../../common/data.json";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, buyNowItem } from "../features/cartSlice";
import { v4 as uuidv4 } from "uuid";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import CircularProgress from "@mui/material/CircularProgress";
import HeadeSeo from "../../common/HeadeSeo";

function HomePage({setRetry , retry}) {
  const isAuth = window.localStorage.getItem("access_token");
  const [quantity, setQuantity] = useState(1);
  const [isPopUpShippingOpen, setIsPopUpShippingOpen] = useState(false);
  const [shippingMethodIndex, setShippingMethodIndex] = useState(0);
  const [countryCode, setCountryCode] = useState(
    window.localStorage.getItem("country") || "us"
  );
  const [isColorActive, setIsColorActive] = useState(false);
  const [isPicsDetailsActive, setIsPicsDetailsActive] = useState(false);
  const [colorIndex, setColorIndex] = useState(0);
  const [sizeIndex, setSizeIndex] = useState(0);
  const [picsDetailsIndex, setPicsDetailsIndex] = useState(0);
  const [maxOrderWorning, setMaxOrderWorning] = useState(false);
  const isLoading = useSelector((state) => state.products.isLoading);
  const productData = useSelector((state) => state.products.productData);
  const hasError = useSelector((state) => state.products.hasError);


  const [shippingInfo, setShippingInfo] = useState({
    date1: "sun Dec 22 2024",
    date2: "sun Dec 29 2024",
    from: 5,
    to: 7,
    cost: 0.0,
    methodName: "Free Shipping",
  });

  const today = new Date();
  let date1 = new Date(today);
  let date2 = new Date(today);

  const navigate = useNavigate();
  // constant
  const dispatch = useDispatch();
  const index = uuidv4();

  const selectSize = (index) => {
    setSizeIndex(index);
  };

  const selectColor = (index) => {
    setColorIndex(index);
    setIsColorActive(true);
    setIsPicsDetailsActive(false);
  };

  const selectPicsDetails = (index) => {
    setPicsDetailsIndex(index);
    setIsColorActive(false);
    setIsPicsDetailsActive(true);
  };
  const deselectPicsDetails = () => {
    setIsColorActive(true);
    setIsPicsDetailsActive(false);
  };

  const addQuantity = () => {
    if (quantity < productData[0].quantity && quantity < 5) {
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
  const add_item_to_cart = (product) => {
    console.log(product);
    dispatch(
      addToCart({
        id: product.id,
        name: product.name,
        shipping_info: shippingInfo,
        price: product.price,
        selectedColor: product.colors[colorIndex],
        selectedSize: product.sizes[sizeIndex],
        selectedQuantity: quantity,
        index: index,
      })
    );
  };

  
  const buy_Now_item = (product) => {
    if (isAuth) {
      navigate("/checkout");
      dispatch(
        buyNowItem({
          id: product.id,
          name: product.name,
          shipping_info: shippingInfo,
          price: product.price,
          selectedColor: product.colors[colorIndex],
          selectedSize: product.sizes[sizeIndex],
          selectedQuantity: quantity,
          index: index,
        })
      );
    } else {
      navigate("/auth");
    }
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
          <span style={{color:"gray"}}>Opps an error accourd</span>

          <button
            style={{
              fontWeight: "bolder",
              background: "lightgray",
              padding: "10px 20px",
              borderRadius: "4px",
            }}
            onClick={() => setRetry(!retry)}
          >
            Retry
          </button>
        </div>
      ) : (
        <>
          <HeadeSeo title="Enouza" product={productData[0]} />
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
                    picsDetailsIndex={picsDetailsIndex}
                    colorIndex={colorIndex}
                    selectPicsDetails={selectPicsDetails}
                    isColorActive={isColorActive}
                    isPicsDetailsActive={isPicsDetailsActive}
                    deselectPicsDetails={deselectPicsDetails}
                    setColorIndex={setColorIndex}
                    sizeIndex={sizeIndex}
                    selectSize={selectSize}
                    selectColor={selectColor}
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
                    setMaxOrderWorning = {setMaxOrderWorning}
                    countryCode={countryCode}
                    shippingInfo={shippingInfo}
                    setCountryCode={setCountryCode}
                    add_item_to_cart={add_item_to_cart}
                    buy_Now_item={buy_Now_item}
                    shippingMethodIndex={shippingMethodIndex}
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

export default HomePage;
const PrentContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
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
    margin-right: 10px;
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
