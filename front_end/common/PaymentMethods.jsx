import React from "react";
import styled from "styled-components";

function PaymentMethods() {
  return (
    <Container>
      <PaymentRow>
        <PaymentIcon
          src="https://res.cloudinary.com/dzpzy1o1y/image/upload/v1788353548/visa_payment_method_card_icon_142729_hi0vvw.svg"
          alt="Visa"
        />

        <PaymentIcon
          src="https://res.cloudinary.com/dzpzy1o1y/image/upload/v1788353547/mastercard_payment_method_card_icon_142734_xc6uqc.svg"
          alt="Mastercard"
        />

        <PaymentIcon
          src="https://res.cloudinary.com/dzpzy1o1y/image/upload/v1788368908/amazon-payments-inverted_82055_hctxsm.png"
          alt="Amazon Pay"
        />

        <PaymentIcon
          src="https://res.cloudinary.com/dzpzy1o1y/image/upload/v1788353547/amex_payment_method_card_icon_142744_q0dtfq.svg"
          alt="American Express"
        />

        <PaymentIcon
          src="https://res.cloudinary.com/dzpzy1o1y/image/upload/v1788370983/paypal_payment_method_card_icon_142733_tz08at.png"
          alt="PayPal"
        />

        <PaymentIcon
          src="https://res.cloudinary.com/dzpzy1o1y/image/upload/v1788370981/jcb_payment_method_card_icon_142738_utwp3t.png"
          alt="JCB"
        />

        <PaymentIcon
          src="https://res.cloudinary.com/dzpzy1o1y/image/upload/v1788354252/discover_payment_method_card_icon_142741_y62x9b.svg"
          alt="Discover"
        />

        <PaymentIcon
          src="https://res.cloudinary.com/dzpzy1o1y/image/upload/v1788514961/applepay_logo_icon_247576_rcv5ud.svg"
          alt="Apple Pay"
        />
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
`;


/* =========================
   PAYMENT ROW
========================= */

const PaymentRow = styled.div`
  width: 100%;
  
  display: flex;
  align-items: center;
  justify-content: center;

  flex-wrap: nowrap;

  gap: 16px;

  margin: 0 auto;


  @media (max-width: 750px) {
    gap: 14px;
  }


  @media (max-width: 420px) {
    gap: 10px;
  }
`;


/* =========================
   PAYMENT ICON
========================= */

const PaymentIcon = styled.img`
  display: block;

  width: 45px;
  height: 45px;

  max-width: 52px;

  object-fit: contain;

  border-radius: 4px;

  opacity: 0.9;

  transition:
    opacity 0.25s ease,
    transform 0.25s ease;


  &:hover {
    opacity: 1;
    transform: translateY(-1px);
  }


  @media (max-width: 750px) {
    height: 30px;
    width:30px;
    max-width: 46px;
  }


  @media (max-width: 420px) {
    height: 30px;
    width:30px;
    max-width: 40px;
  }
`;