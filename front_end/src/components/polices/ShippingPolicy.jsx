import React, { useLayoutEffect } from "react";
import styled from "styled-components";

function ShippingPolicy() {
  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0 });
  }, []);

  return (
    <Container>
      <Title>Shipping Policy</Title>
      <Content>
        <p>
          We offer worldwide free shipping on all our products, and we deliver
          to almost every country in the world. However, please note that the
          estimated delivery time is 10-30 business days for most countries,
          with a maximum delivery time of 72 business days. Our delivery
          partners usually deliver the products within the expected timeframe of
          10-30 business days.
        </p>
        <p>
          Upon shipment of your order, we will send you an email with a tracking
          number, although please note that tracking may not always be available
          due to the free shipping option. Additionally, items in the same
          purchase may be shipped separately for logistical reasons, even if you
          have requested combined shipping. Please be aware that any custom fees
          incurred upon shipment are not our responsibility.
        </p>
        <p>
          Tracking numbers are assigned to packages once they have shipped, and
          we will send you an email with the tracking code. However, please note
          that the current status of your package may not be the actual status,
          and if your package is not moving, it could already be in your country
          and not yet updated.
        </p>
        <p>
          If you have any further questions, please do not hesitate to contact
          us, and we will do our best to assist you.
        </p>
      </Content>
    </Container>
  );
}

export default ShippingPolicy;

// Styled Components
const Container = styled.div`
  width: calc(100% - 30px);
  min-height: 100vh;
  margin: 10px auto;
  padding: 10px 15px;
  background: linear-gradient(to right, #e9e4f0, #d3cce3);
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);

 
`;

const Title = styled.h1`
  font-size: 32px;
  font-weight: 900;
  text-align: center;
  margin-bottom: 20px;
  color: #333;

  @media (max-width: 768px) {
    font-size: 28px;
  }

  @media (max-width: 480px) {
    font-size: 24px;
  }
`;

const Content = styled.div`
  font-size: 16px;
  line-height: 1.8;
  color: #444;

  p {
    margin-bottom: 15px;

    @media (max-width: 768px) {
      font-size: 15px;
    }

    @media (max-width: 480px) {
      font-size: 14px;
    }
  }
`;
