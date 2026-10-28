import styled from "styled-components";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import SEO from "../SEO/SEO";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";


const OrderSuccess = () => {
     const cartItems = useSelector(
    (state) => state.cart.cartItems
  );
     const selectedCurrency = useSelector(
        (state) => state.currency.selectedCurrency
      );
      
  const { t } = useTranslation();
  const orderTotal =
    props.cartItems?.reduce(
      (total, item) =>
        total + item.price * item.quantity,
      0
    ) || 0;
  useEffect(() => {
      // on order success page, after API confirms order
trackPurchase({
  transactionId: "ORD_12345", // required — e.g., "ORD_12345"
  items: cartItems.map(item => ({
    productId: item.id,
    name: item.name,
    price: item.price,
    quantity: item.quantity,
  })),
  currency: selectedCurrency, // e.g., "USD"
  value: orderTotal, // total order value
  
});
  }, [])
  
  
  return (
    <SuccessContainer>
      <SEO title="Order Confirmation" />
      <Message>
        {t("orderSuccess.orderPlacedSuccessfully")}
      </Message>

      <SubText>
        {t("orderSuccess.orderProcessingMessage")}
      </SubText>

      <Button to="/">
        {t("orderSuccess.backToHome")}
      </Button>
    </SuccessContainer>
  );
};

export default OrderSuccess;
const SuccessContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: #f9f9f9;
  text-align: center;
`;

const Message = styled.h1`
  font-size: 2rem;
  color: #28a745;
`;

const SubText = styled.p`
  font-size: 1.2rem;
  margin: 10px 0;
`;

const Button = styled(Link)`
  text-decoration: none;
  background: #007bff;
  color: #fff;
  padding: 12px 20px;
  font-size: 1rem;
  border-radius: 5px;
  margin-top: 20px;
  &:hover {
    background: #0056b3;
  }
`;
