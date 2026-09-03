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
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);

export default function StripeContanier({t, i18n}) {
  const [clientSecret, setClientSecret] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { activeStepIndex, setActiveStepIndex } = useContext(FormContext);
  const { formData, setFormData } = useContext(OrderContext);
  const cartItems = useSelector((state) => state.cart.cartItems);
   const ordered_items = cartItems?.map(item => ({
    id : item.id,
    quantity : item.quantity,
    sku_attr : item.selectedSku.sku_attr



   }));
  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    ApiInstance.post("create-payment-intent/", {
      user: formData.userId,
      first_name:formData.logistics_address.firstName,
      last_name: formData.logistics_address.lastName,
      city: formData.logistics_address.city,
      address1: formData.logistics_address.address1,
      zipcode: formData.logistics_address.zip,
      state: formData.logistics_address.state,
      country: formData.logistics_address.country,
      email: formData.logistics_address.email,
      shipping_method: formData.shippingMethod,
      payment_method: "Credit Card",
      shipping_price: formData.shippingPrice,
      delivery_time: formData.deliveryTime,
      total_price: formData.totalPrice,
      currency: "usd",
      ordered_items: JSON.stringify(ordered_items )
      
    })

      .then((response) => setClientSecret(response.data.clientSecret))
      .then((error) => console.log(error));
  }, []);

  
  const appearance = {
  theme: "flat",
  labeles: "floating",
  variables: {
    colorPrimary: "#B39A76",      // muted luxury gold
    colorBackground: "#F7F5F0",   // warm luxury cream

    colorText: "#1D1C1A",         // ink black
    colorTextSecondary: "#77736B",

    colorDanger: "#B42318",

    borderRadius: "0px",

    spacingUnit: "5px",
  },
};
  const loader = 'auto';
  const options = {
    clientSecret,
    appearance,
    loader,
    locale: i18n.language || "en",
  };
  
  return (
    <Container>
      {clientSecret ? (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      ) : (
        <div style={{ padding: "0 10px", width:"30vw", minWidth:"320px" }}>
          <SkeletonLoader />
        </div>
      )}
    </Container>
  );
}
const Container = styled.div`
  margin-top: 50px;
`;
