import React, { useLayoutEffect } from "react";
import {
  removeFromCart,
  addQuantity,
  subtractQuantity,
} from "../../features/cartSlice";

import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import styled from "styled-components";

import EmptyCart from "./EmptyCart";
import ProductSubtotal from "./ProductSubtotal";

import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import HeadeSeo from "../../../common/HeadeSeo";

function ShoppingCart() {
  const dispatch = useDispatch();

  const cartItems = useSelector(
    (state) => state.cart.cartItems
  );

  const { t, i18n } = useTranslation();

  useLayoutEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
    });
  }, []);

  const isRTL = i18n.dir() === "rtl";

  return (
    <Container dir={isRTL ? "rtl" : "ltr"}>
      <HeadeSeo title="Enouza - Shopping Cart" />

      {/* =====================================================
          HEADER
      ===================================================== */}

      <Header>

        <Title>
          {t("common.shopping_cart")}
        </Title>

        <CartCount>
          {cartItems?.length || 0}{" "}
          {cartItems?.length === 1
            ? t("common.item")
            : t("common.items")}
        </CartCount>

        <HeaderLine />
      </Header>


      {/* =====================================================
          EMPTY CART
      ===================================================== */}

      {cartItems?.length === 0 ? (
        <EmptyWrapper>
          <EmptyCart t={t} />
        </EmptyWrapper>
      ) : (
        <Wrap>

          {/* =================================================
              PRODUCTS
          ================================================= */}

          <Wrapper>
            {cartItems?.map((item, index) => {
              const productName =
                item?.name?.[i18n.language] ||
                item?.name?.en ||
                "";

              const image =
                item?.selectedSku?.attributes?.[
                  item?.selectedSku?.colorKey
                ]?.image;

              return (
                <ProductContainer
                  key={`${item.id}-${index}`}
                >

                  {/* PRODUCT IMAGE */}

                  <ProductImage>
                    <img
                      src={image}
                      alt={
                        item?.selectedSku?.colorKey ||
                        productName
                      }
                    />
                  </ProductImage>


                  {/* PRODUCT INFORMATION */}

                  <ProductInfo>

                    <ProductTop>

                      <ProductName>
                        {productName}
                      </ProductName>

                      <DeleteButton
                        type="button"
                        aria-label="Remove product"
                        onClick={() =>
                          dispatch(
                            removeFromCart(index)
                          )
                        }
                      >
                        <DeleteOutlineIcon />
                      </DeleteButton>

                    </ProductTop>


                    {/* VARIANT */}

                    {item?.size && (
                      <ProductVariant>
                        {item.size}
                      </ProductVariant>
                    )}


                    <ProductBottom>

                      <Price>
                        US ${item.price}
                      </Price>


                      {/* QUANTITY */}

                      <Quantity>

                        <QuantityButton
                          type="button"
                          onClick={() =>
                            dispatch(
                              subtractQuantity(index)
                            )
                          }
                        >
                          −
                        </QuantityButton>

                        <QuantityValue>
                          {item.quantity}
                        </QuantityValue>

                        <QuantityButton
                          type="button"
                          onClick={() =>
                            dispatch(
                              addQuantity(index)
                            )
                          }
                        >
                          +
                        </QuantityButton>

                      </Quantity>

                    </ProductBottom>

                  </ProductInfo>

                </ProductContainer>
              );
            })}
          </Wrapper>


          {/* =================================================
              SUBTOTAL
          ================================================= */}

          <SubtotalWrapper>
            <ProductSubtotal
              cartItems={cartItems}
              t={t}
            />
          </SubtotalWrapper>

        </Wrap>
      )}
    </Container>
  );
}

export default ShoppingCart;


/* ============================================================
   CONTAINER
============================================================ */

const Container = styled.main`
  min-height: 90vh;

  width: 100%;

  background: #faf9f7;

  padding: 55px 0 100px;

  color: #1b1b1b;

  @media (max-width: 700px) {
    padding: 38px 0 70px;
  }

  @media (max-width: 460px) {
    padding: 28px 0 55px;
  }
`;


/* ============================================================
   HEADER
============================================================ */

const Header = styled.header`
  text-align: center;

  margin: 0 auto 55px;

  padding: 0 20px;

  @media (max-width: 700px) {
    margin-bottom: 40px;
  }
`;

const Eyebrow = styled.div`
  margin-bottom: 12px;

  font-size: 10px;
  font-weight: 600;

  letter-spacing: 4px;

  text-transform: uppercase;

  color: #9a9288;
`;

const Title = styled.h1`
  margin: 0;

  font-family:
    Georgia,
    "Times New Roman",
    serif;

  font-size: 38px;

  font-weight: 400;

  line-height: 1.2;

  color: #181818;

  @media (max-width: 700px) {
    font-size: 31px;
  }

  @media (max-width: 460px) {
    font-size: 27px;
  }
`;

const CartCount = styled.div`
  margin-top: 10px;

  color: #8b847b;

  font-size: 12px;

  letter-spacing: 0.8px;
`;

const HeaderLine = styled.div`
  width: 40px;

  height: 1px;

  margin: 20px auto 0;

  background: #aaa298;
`;


/* ============================================================
   MAIN WRAPPER
============================================================ */

const Wrap = styled.div`
  width: min(1180px, calc(100% - 40px));

  margin: 0 auto;

  display: grid;

  grid-template-columns: minmax(0, 1fr) 350px;

  align-items: start;

  gap: 45px;

  @media (max-width: 1000px) {
    grid-template-columns: 1fr;

    gap: 30px;
  }

  @media (max-width: 500px) {
    width: calc(100% - 24px);
  }
`;


/* ============================================================
   PRODUCT LIST
============================================================ */

const Wrapper = styled.div`
  background: #fff;

  border: 1px solid #ebe7e1;
`;


/* ============================================================
   PRODUCT
============================================================ */

const ProductContainer = styled.article`
  display: flex;

  gap: 24px;

  padding: 24px;

  border-bottom: 1px solid #ebe7e1;

  &:last-child {
    border-bottom: none;
  }

  @media (max-width: 600px) {
    gap: 16px;

    padding: 18px;
  }

  @media (max-width: 420px) {
    gap: 13px;

    padding: 14px;
  }
`;


/* ============================================================
   PRODUCT IMAGE
============================================================ */

const ProductImage = styled.div`
  flex: 0 0 125px;

  width: 125px;

  height: 150px;

  overflow: hidden;

  background: #f3f1ed;

  @media (max-width: 600px) {
    flex-basis: 100px;

    width: 100px;

    height: 120px;
  }

  @media (max-width: 420px) {
    flex-basis: 82px;

    width: 82px;

    height: 102px;
  }

  img {
    width: 100%;

    height: 100%;

    display: block;

    object-fit: cover;

    transition: transform 0.5s ease;
  }

  &:hover img {
    transform: scale(1.035);
  }
`;


/* ============================================================
   PRODUCT INFO
============================================================ */

const ProductInfo = styled.div`
  flex: 1;

  min-width: 0;

  display: flex;

  flex-direction: column;

  justify-content: space-between;

  min-height: 150px;

  @media (max-width: 600px) {
    min-height: 120px;
  }

  @media (max-width: 420px) {
    min-height: 102px;
  }
`;


/* ============================================================
   PRODUCT TOP
============================================================ */

const ProductTop = styled.div`
  display: flex;

  align-items: flex-start;

  justify-content: space-between;

  gap: 15px;
`;


/* ============================================================
   PRODUCT NAME
============================================================ */

const ProductName = styled.h2`
  margin: 0;

  width: 100%;
  max-width: 480px;

  font-family:
    Georgia,
    "Times New Roman",
    serif;

  font-size: 16px;
  font-weight: 400;

  line-height: 1.4;

  color: #222;

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  @media (max-width: 700px) {
    font-size: 15px;
    max-width: 320px;
  }

  @media (max-width: 500px) {
    font-size: 14px;
    max-width: 220px;
  }

  @media (max-width: 380px) {
    max-width: 170px;
  }
`;

/* ============================================================
   DELETE
============================================================ */

const DeleteButton = styled.button`
  width: 32px;

  height: 32px;

  flex-shrink: 0;

  display: flex;

  align-items: center;

  justify-content: center;

  padding: 0;

  border: none;

  background: transparent;

  color: #969088;

  cursor: pointer;

  transition:
    color 0.25s ease,
    transform 0.25s ease;

  svg {
    font-size: 20px;
  }

  &:hover {
    color: #1b1b1b;

    transform: translateY(-1px);
  }
`;


/* ============================================================
   VARIANT
============================================================ */

const ProductVariant = styled.div`
  margin-top: 8px;

  font-size: 10px;

  font-weight: 600;

  letter-spacing: 1.5px;

  text-transform: uppercase;

  color: #9a9288;
`;


/* ============================================================
   PRODUCT BOTTOM
============================================================ */

const ProductBottom = styled.div`
  display: flex;

  align-items: center;

  justify-content: space-between;

  gap: 20px;

  margin-top: 20px;

  @media (max-width: 420px) {
    margin-top: 12px;
  }
`;


/* ============================================================
   PRICE
============================================================ */

const Price = styled.span`
  font-family:
    Georgia,
    "Times New Roman",
    serif;

  font-size: 16px;

  color: #242424;

  white-space: nowrap;

  @media (max-width: 420px) {
    font-size: 14px;
  }
`;


/* ============================================================
   QUANTITY
============================================================ */

const Quantity = styled.div`
  display: flex;

  align-items: center;

  height: 34px;

  border: 1px solid #dcd7d0;

  background: #fff;
`;


/* ============================================================
   QUANTITY BUTTON
============================================================ */

const QuantityButton = styled.button`
  width: 32px;

  height: 100%;

  padding: 0;

  border: none;

  background: transparent;

  color: #333;

  font-size: 17px;

  font-weight: 300;

  cursor: pointer;

  transition:
    background 0.2s ease,
    color 0.2s ease;

  &:hover {
    background: #f4f1ed;

    color: #000;
  }

  @media (max-width: 420px) {
    width: 28px;
  }
`;


/* ============================================================
   QUANTITY VALUE
============================================================ */

const QuantityValue = styled.span`
  min-width: 28px;

  text-align: center;

  font-size: 12px;

  color: #292929;
`;


/* ============================================================
   SUBTOTAL
============================================================ */

const SubtotalWrapper = styled.aside`
  position: sticky;

  top: 25px;

  @media (max-width: 1000px) {
    position: static;
  }
`;


/* ============================================================
   EMPTY CART
============================================================ */

const EmptyWrapper = styled.div`
  width: min(900px, calc(100% - 40px));

  margin: 0 auto;

  background: #fff;

  border: 1px solid #ebe7e1;

  padding: 50px 30px;

  @media (max-width: 500px) {
    width: calc(100% - 24px);

    padding: 35px 18px;
  }
`;