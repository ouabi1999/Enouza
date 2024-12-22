import React, { useState, useEffect, useContext } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "./CheckoutForm";
import styled from "styled-components";
import Billing from "./Billing";
import { FormContext } from "../../../pages/CheckoutPage";
import Skeleton from "../Skeleton";
import SkeletonLoader from "../Skeleton";
import { OrderContext } from "../../../App";
import { useSelector } from "react-redux";
import ApiInstance from "../../../../common/baseUrl";
import { json } from "react-router";
// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe(
  "pk_test_51MmjNCDJSVePKF96pkaAntU5Qbfu9tgiZYGbp9OtsAWjPvQO1RogW4pnmYy9uYk2UBjyJ9YGvRTsGoOc5UijySPL00w23RXVVK"
);
export default function StripeContanier() {
  const [clientSecret, setClientSecret] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { activeStepIndex, setActiveStepIndex } = useContext(FormContext);
  const { formData, setFormData } = useContext(OrderContext);
  const cartItems = useSelector((state) => state.cart.cartItems);

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    ApiInstance.post("create-payment-intent/", {
      user: formData.userId,
      first_name: formData.firstName,
      last_name: formData.lastName,
      email: formData.email,
      city: formData.city,
      address1: formData.address1,
      address2: formData.address2,
      zipcode: formData.zip,
      state: formData.state,
      country: formData.country,
      shipping_method: formData.shippingMethod,
      payment_method: "Credit Card",
      shipping_price: formData.shippingPrice,
      delivery_time: formData.deliveryTime,
      total_price: formData.totalPrice,
      currency: "usd",
      ordered_items: JSON.stringify(cartItems),
    })

      .then((response) => setClientSecret(response.data.clientSecret))
      .then((error) => console.log(error));
  }, []);

  const appearance = {
    theme: "night",
    labels: "floating",
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <Container>
      {clientSecret ? (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      ) : (
        <div style={{ padding: "0 10px" }}>
          <SkeletonLoader />
        </div>
      )}
    </Container>
  );
}
const Container = styled.div`
  margin-top: 50px;
`;
