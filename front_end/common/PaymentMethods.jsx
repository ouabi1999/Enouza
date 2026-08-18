import React from "react";
import styled from "styled-components";

import {
  FaCcPaypal,
  FaCcApplePay,
  FaCcVisa,
  FaCcMastercard,
  FaCcAmex,
  FaStripe,
  FaAmazonPay,
} from "react-icons/fa";

import {
  SiGooglepay,
  SiKlarna,
  SiAfterpay,
} from "react-icons/si";

function PaymentMethods() {
  const paymentMethods = [
    {
      id: "paypal",
      icon: FaCcPaypal,
      color: "#003087",
      label: "PayPal",
    },
    {
      id: "applepay",
      icon: FaCcApplePay,
      color: "#000000",
      label: "Apple Pay",
    },
    {
      id: "googlepay",
      icon: SiGooglepay,
      color: "#2573f0",
      label: "Google Pay",
    },
    {
      id: "visa",
      icon: FaCcVisa,
      color: "#1A1F71",
      label: "Visa",
    },
    {
      id: "mastercard",
      icon: FaCcMastercard,
      color: "#EB001B",
      label: "Mastercard",
    },
    {
      id: "amex",
      icon: FaCcAmex,
      color: "#006FCF",
      label: "American Express",
    },
    {
      id: "stripe",
      icon: FaStripe,
      color: "#635BFF",
      label: "Stripe",
    },
    {
      id: "amazonpay",
      icon: FaAmazonPay,
      color: "#232F3E",
      label: "Amazon Pay",
    },
    {
      id: "klarna",
      icon: SiKlarna,
      color: "#FFB3C7",
      label: "Klarna",
    },
    {
      id: "afterpay",
      icon: SiAfterpay,
      color: "#00C7B7",
      label: "Afterpay",
    },
  ];

  return (
    <Container>
      <PaymentRow>
        {paymentMethods.map((method) => {
          const Icon = method.icon;

          return (
            <PaymentIcon
              key={method.id}
              title={method.label}
              aria-label={method.label}
            >
              <Icon
                style={{
                  color: method.color,
                }}
              />
            </PaymentIcon>
          );
        })}
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

const PaymentIcon = styled.div`
  display: flex;

  align-items: center;
  justify-content: center;

  opacity: 0.9;

  cursor: default;

  transition:
    opacity 0.25s ease,
    transform 0.25s ease;

  svg {
    display: block;

    width: 40px;
    height: 40px;

    transition:
      transform 0.25s ease;
  }

  &:hover {
    opacity: 1;

    transform: translateY(-1px);

    svg {
      transform: scale(1.03);
    }
  }

  @media only screen and (max-width: 815px) {
    svg {
      width: 38px;
      height: 38px;
    }
  }

  @media only screen and (max-width: 600px) {
    svg {
      width: 34px;
      height: 34px;
    }
  }

  @media only screen and (max-width: 420px) {
    svg {
      width: 28px;
      height: 28px;
    }
  }
`;