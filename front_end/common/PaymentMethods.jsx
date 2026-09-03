import React from "react";
import styled from "styled-components";

;

function PaymentMethods() {
  

  return (
    <Container>
      <PaymentRow>
        <PaymentIcon src="https://res.cloudinary.com/dzpzy1o1y/image/upload/v1788353548/visa_payment_method_card_icon_142729_hi0vvw.svg" alt="Visa" />
        <PaymentIcon src="https://res.cloudinary.com/dzpzy1o1y/image/upload/v1788353547/mastercard_payment_method_card_icon_142734_xc6uqc.svg" alt="Mastercard" />
        <PaymentIcon src="https://res.cloudinary.com/dzpzy1o1y/image/upload/v1788368908/amazon-payments-inverted_82055_hctxsm.png" alt="amazon Pay" />
        <PaymentIcon
          src="https://res.cloudinary.com/dzpzy1o1y/image/upload/v1788353547/amex_payment_method_card_icon_142744_q0dtfq.svg"
          alt="American Express"
        />
        <PaymentIcon src="https://res.cloudinary.com/dzpzy1o1y/image/upload/v1788370983/paypal_payment_method_card_icon_142733_tz08at.png" alt="PayPal" />
        <PaymentIcon src = "https://res.cloudinary.com/dzpzy1o1y/image/upload/v1788370981/jcb_payment_method_card_icon_142738_utwp3t.png" alt="JCB" />
        <PaymentIcon src="https://res.cloudinary.com/dzpzy1o1y/image/upload/v1788354252/discover_payment_method_card_icon_142741_y62x9b.svg" alt="Discover" />

        <PaymentIcon src="https://res.cloudinary.com/dzpzy1o1y/image/upload/v1788370951/apple_pay_icon_195995_uv2rkw.png" alt="Apple Pay" />
      </PaymentRow>
    </Container>
  );
}

export default PaymentMethods;

/* =========================
   CONTAINER
========================= */

const Container = styled.div`
  width: 100%;

  

  overflow: hidden;
`;

/* =========================
   PAYMENT ROW
========================= */

const PaymentRow = styled.div`
  width: 100%;

  max-width: 1100px;

  margin: 0 auto;

  display: flex;

  align-items: center;

  justify-content: center;

  flex-wrap: wrap;

  column-gap: 32px;
  row-gap: 12px;
`;

/* =========================
   PAYMENT ICON
========================= */

const PaymentIcon = styled.img`
  

  cursor: default;
 
  transition:
    opacity 0.25s ease,
    transform 0.25s ease;

  
   border-radius: 6px;

    width: auto;
    height: 30px;
    object-fit: contain;

    transition:
      transform 0.25s ease;
  

  &:hover {
    opacity: 1;

    transform: translateY(-1px);

    
  }

  @media only screen and (max-width: 815px) {
    & {
      width: 38px;
      height: 38px;
    }
  }

  @media only screen and (max-width: 600px) {
    & {
      width: 34px;
      height: 34px;
    }
  }

  @media only screen and (max-width: 420px) {
    & {
      width: 28px;
      height: 28px;
    }
  }
`;