import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import CircularProgress from "@mui/material/CircularProgress";
import { useTranslation } from "react-i18next";

import UserServices from "../components/Services/UserServices";
import ProductLayout from "../components/Product/ProductLayout";
import AboutProductLayout from "../components/Product/aboutProduct/AboutProductLayout";
import PopUpShoppingMethod from "../components/Product/productDetails/PopUpShoppingMethod";

import { addToCart, buyNowItem } from "../features/cartSlice";
import { getProductDetails } from "../features/productDetails_slice";

import "react-toastify/dist/ReactToastify.css";

function ProductDetailsPage({ setRetry, retry }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { t } = useTranslation();

  const [quantity, setQuantity] = useState(1);
  const [currentSku, setCurrentSku] = useState(null);

  const [maxOrderWorning, setMaxOrderWorning] = useState(false);

  const [isPopUpShippingOpen, setIsPopUpShippingOpen] =
    useState(false);

  const [shippingMethodIndex, setShippingMethodIndex] =
    useState(0);

  /* =========================
     SHIPPING DEFAULTS
  ========================= */

  const today = new Date();

  const defaultDate1 = new Date(today);
  const defaultDate2 = new Date(today);

  defaultDate1.setDate(defaultDate1.getDate() + 5);
  defaultDate2.setDate(defaultDate2.getDate() + 7);

  const [shippingInfo, setShippingInfo] = useState({
    date1: defaultDate1.toDateString(),
    date2: defaultDate2.toDateString(),
    from: 5,
    to: 7,
    cost: 0,
    methodName: t("sideCard.free_Shipping"),
  });

  /* =========================
     REDUX
  ========================= */

  const cartItems = useSelector(
    (state) => state.cart.cartItems
  );

  const isLoading = useSelector(
    (state) => state.products.isLoading
  );

  const hasError = useSelector(
    (state) => state.products.hasError
  );

  /* =========================
     LOAD PRODUCT
  ========================= */

  useEffect(() => {
    if (!id) return;

    dispatch(getProductDetails(id));
  }, [dispatch, id]);

  /* =========================
     RESET SCROLL
  ========================= */

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "auto",
    });
  }, [id]);

  /* =========================
     QUANTITY
  ========================= */

  const addQuantity = () => {
    const stock = Number(
      currentSku?.available_stock || 0
    );

    if (quantity < stock && quantity < 5) {
      setQuantity((prev) => prev + 1);
      setMaxOrderWorning(false);
      return;
    }

    setMaxOrderWorning(true);
  };

  const subtractQuantity = () => {
    if (quantity <= 1) return;

    setQuantity((prev) => prev - 1);
    setMaxOrderWorning(false);
  };

  /* =========================
     SHIPPING
  ========================= */

  const checkboxChange = (item, index) => {
    const from = Number(item?.from || 5);
    const to = Number(item?.to || 7);

    const start = new Date();

    const deliveryFrom = new Date(start);
    const deliveryTo = new Date(start);

    deliveryFrom.setDate(
      deliveryFrom.getDate() + from
    );

    deliveryTo.setDate(
      deliveryTo.getDate() + to
    );

    setShippingInfo({
      date1: deliveryFrom.toDateString(),
      date2: deliveryTo.toDateString(),
      from,
      to,
      cost: Number(item?.cost || 0),
      methodName:
        item?.methodName ||
        t("sideCard.free_Shipping"),
    });

    setShippingMethodIndex(index);
    setIsPopUpShippingOpen(false);
  };

  /* =========================
     ADD TO CART
  ========================= */

  const add_item_to_cart = (
    selectedSku,
    productId,
    shipping,
    name
  ) => {
    if (!selectedSku) return;

    const alreadyExists = cartItems?.some(
      (item) =>
        item?.selectedSku?.sku_attr ===
        selectedSku?.sku_attr
    );

    if (alreadyExists) {
      toast.success(
        t("sideCard.item_already_in_cart")
      );

      return;
    }

    const price = Number(
      selectedSku.sellingPrice
    );

    dispatch(
      addToCart({
        id: productId,
        selectedSku,
        name,
        available_shipping: shipping,
        quantity,
        price,
        subtotal: price * quantity,
      })
    );

    toast.success(
      t("sideCard.item_has_been_added")
    );
  };

  /* =========================
     BUY NOW
  ========================= */

  const buy_Now_item = (
    selectedSku,
    productId,
    shipping,
    name
  ) => {
    if (!selectedSku) return;

    const price = Number(
      selectedSku.sellingPrice
    );

    dispatch(
      buyNowItem({
        id: productId,
        selectedSku,
        name,
        available_shipping: shipping,
        quantity,
        price,
        subtotal: price * quantity,
      })
    );

    navigate("/checkout");
  };

  /* =========================
     ERROR
  ========================= */

  if (hasError) {
    return (
      <ErrorPage>
        <ErrorCard>
          <ErrorTitle>
            {t("common.error")}
          </ErrorTitle>

          <RetryButton
            onClick={() => setRetry(!retry)}
          >
            {t("common.tryAgain")}
          </RetryButton>
        </ErrorCard>
      </ErrorPage>
    );
  }

  /* =========================
     PAGE
  ========================= */

  return (
    <Page>
      {isLoading ? (
        <Loading>
          <LoadingSpinner>
            <CircularProgress size={28} />
          </LoadingSpinner>
        </Loading>
      ) : (
        <>
          {/* =========================
              SERVICES
          ========================= */}

          <ServicesSection>
            <UserServices />
          </ServicesSection>

          {/* =========================
              PRODUCT
          ========================= */}

          <ProductSection>
            <ProductLayout
              quantity={quantity}
              shippingInfo={shippingInfo}

              checkboxChange={checkboxChange}

              currentSku={currentSku}
              setCurrentSku={setCurrentSku}

              setShippingInfo={
                setShippingInfo
              }

              addQuantity={addQuantity}
              subtractQuantity={
                subtractQuantity
              }

              maxOrderWorning={
                maxOrderWorning
              }

              setMaxOrderWorning={
                setMaxOrderWorning
              }

              add_item_to_cart={
                add_item_to_cart
              }

              buy_Now_item={
                buy_Now_item
              }

              setIsPopUpShoppingOpen={
                setIsPopUpShippingOpen
              }

              isPopUpShippingOpen={
                isPopUpShippingOpen
              }

              shippingMethodIndex={
                shippingMethodIndex
              }
            />
          </ProductSection>

          {/* =========================
              ABOUT PRODUCT
          ========================= */}

          <AboutSection>
            <AboutProductLayout />
          </AboutSection>

          {/* =========================
              SHIPPING POPUP
          ========================= */}

          {isPopUpShippingOpen && (
            <PopUpShoppingMethod
              setIsPopUpShippingOpen={
                setIsPopUpShippingOpen
              }

              isPopUpShippingOpen={
                isPopUpShippingOpen
              }

              checkboxChange={
                checkboxChange
              }

              shippingMethodIndex={
                shippingMethodIndex
              }

              shippingInfo={
                shippingInfo
              }
            />
          )}
        </>
      )}
    </Page>
  );
}

export default ProductDetailsPage;

/* =====================================================
   PAGE
===================================================== */

const Page = styled.main`
  width: 100%;
  min-height: 100vh;

  background: #ffffff;

  padding-bottom: 100px;

  overflow-x: clip;
`;

/* =====================================================
   SERVICES
===================================================== */

const ServicesSection = styled.section`
  width: 100%;

  position: relative;
  z-index: 2;
`;

/* =====================================================
   PRODUCT
===================================================== */

const ProductSection = styled.section`
  width: 100%;

 
`;

/* =====================================================
   ABOUT
===================================================== */

const AboutSection = styled.section`
  width: min(100% - 48px, 1640px);

  margin: 30px auto 0;

  @media (max-width: 1100px) {
    width: min(100% - 32px, 900px);
  }

  @media (max-width: 600px) {
    width: calc(100% - 24px);

    margin-top: 15px;
  }
`;

/* =====================================================
   LOADING
===================================================== */

const Loading = styled.div`
  width: 100%;

  min-height: 70vh;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const LoadingSpinner = styled.div`
  width: 58px;
  height: 58px;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 50%;

  background: #f7f4ef;
`;

/* =====================================================
   ERROR
===================================================== */

const ErrorPage = styled.div`
  width: 100%;
  min-height: 70vh;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 30px;
`;

const ErrorCard = styled.div`
  width: min(100%, 420px);

  padding: 45px 30px;

  text-align: center;

  border: 1px solid #e8e2d9;

  background: #faf9f7;
`;

const ErrorTitle = styled.div`
  margin-bottom: 20px;

  font-size: 15px;
  letter-spacing: 0.08em;

  text-transform: uppercase;

  color: #555;
`;

const RetryButton = styled.button`
  border: 1px solid #1c1c1c;

  background: #1c1c1c;

  color: #ffffff;

  padding: 12px 25px;

  font-family: inherit;
  font-size: 13px;

  letter-spacing: 0.04em;

  cursor: pointer;

  transition:
    background 0.25s ease,
    color 0.25s ease;

  &:hover {
    background: transparent;
    color: #1c1c1c;
  }
`;