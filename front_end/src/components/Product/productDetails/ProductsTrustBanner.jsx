import React from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";

import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import WorkspacePremiumOutlinedIcon from "@mui/icons-material/WorkspacePremiumOutlined";
import GppGoodOutlinedIcon from '@mui/icons-material/GppGoodOutlined';
import ReplayIcon from '@mui/icons-material/Replay';
import VolunteerActivismOutlinedIcon from '@mui/icons-material/VolunteerActivismOutlined';
const ProductTrustBanner = () => {
  const { t } = useTranslation();

  return (
    <Banner>
      {/* ================= SECURE CHECKOUT ================= */}
      <SecureCheckout>
        <SecureLine />

        <SecureContent>
          <GppGoodOutlinedIcon style={{ fontSize: "15px" }} />
          <span>{t("trust.secureCheckout")}</span>
        </SecureContent>

        <SecureLine />
      </SecureCheckout>

      {/* ================= PAYMENT METHODS ================= */}
      <PaymentMethods>
        <img src="https://res.cloudinary.com/dzpzy1o1y/image/upload/v1788353548/visa_payment_method_card_icon_142729_hi0vvw.svg" alt="Visa" />
        <img src="https://res.cloudinary.com/dzpzy1o1y/image/upload/v1788353547/mastercard_payment_method_card_icon_142734_xc6uqc.svg" alt="Mastercard" />
        <img src="https://res.cloudinary.com/dzpzy1o1y/image/upload/v1788355836/amazon-payments_82089_f6able.png" alt="amazon Pay" />
        <img
          src="https://res.cloudinary.com/dzpzy1o1y/image/upload/v1788353547/amex_payment_method_card_icon_142744_q0dtfq.svg"
          alt="American Express"
        />
        <img src="https://res.cloudinary.com/dzpzy1o1y/image/upload/v1788354390/paypal_payment_method_card_icon_142733_mdhwby.svg" alt="PayPal" />
        <img src="https://res.cloudinary.com/dzpzy1o1y/image/upload/v1788354252/discover_payment_method_card_icon_142741_y62x9b.svg" alt="PayPal" />

        <img src="https://res.cloudinary.com/dzpzy1o1y/image/upload/v1788354905/applepay_logo_icon_247576_e5qbki.svg" alt="Apple Pay" />
      </PaymentMethods>

      {/* ================= BENEFITS ================= */}
       <SecureCheckout>
        <SecureLine />

        <SecureContent>
          
          <VolunteerActivismOutlinedIcon style={{ fontSize: "15px" }} />
          <span>{t("trust.shopWithConfidence")}</span>
        </SecureContent>

        <SecureLine />
      </SecureCheckout>
      <TrustGrid>
        <TrustItem>
          <IconWrapper>
            <LocalShippingOutlinedIcon className="icons" />
          </IconWrapper>

          <TrustTitle>
            {t("trust.freeShipping.title")}
          </TrustTitle>

          
        </TrustItem>

        <TrustItem>
          <IconWrapper>
            <Inventory2OutlinedIcon className="icons" />
          </IconWrapper>

          <TrustTitle>
            {t("trust.fastDelivery.title")}
          </TrustTitle>

          
        </TrustItem>

        <TrustItem>
          <IconWrapper>
            <ReplayIcon className="icons" />
          </IconWrapper>

          <TrustTitle>
            {t("trust.returns.title")}
          </TrustTitle>

        
        </TrustItem>

        <TrustItem>
          <IconWrapper>
            <WorkspacePremiumOutlinedIcon className="icons"  />
          </IconWrapper>

          <TrustTitle>
            {t("trust.warranty.title")}
          </TrustTitle>

         
        </TrustItem>
      </TrustGrid>
    </Banner>
  );
};

export default ProductTrustBanner;


/* =====================================================
   MAIN BANNER
===================================================== */

const Banner = styled.section`
  width: 100%;
  box-sizing: border-box;

  color: #3d3a36;

  padding: 32px 4% 38px;

  @media (max-width: 900px) {
    padding: 28px 24px 34px;
  }

  @media (max-width: 600px) {
    padding: 24px 16px 30px;
  }
`;


/* =====================================================
   SECURE CHECKOUT
===================================================== */

const SecureCheckout = styled.div`
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  gap: 22px;

  margin-bottom: 18px;
`;

const SecureLine = styled.div`
  flex: 1;
  max-width: 420px;

  height: 1px;

  background: #d8d3ca;
`;

const SecureContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  gap: 7px;

  white-space: nowrap;

  font-family: Georgia, serif;

  font-size: 10px;
  font-weight: 400;

  letter-spacing: 2px;
  text-transform: uppercase;

  color: #716c64;

  svg {
    font-size: 18px;
    color: #9a8d78;
  }

  @media (max-width: 600px) {
    font-size: 9px;
    letter-spacing: 1.5px;

    svg {
      font-size: 16px;
    }
  }
`;


/* =====================================================
   PAYMENT METHODS
===================================================== */

const PaymentMethods = styled.div`
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  gap: 18px;

  margin-bottom: 32px;
  margin-top: 32px;

  img {
    width: 45px;
    height: 45px;

    object-fit: contain;
  }

  @media (max-width: 700px) {

    overflow-x: auto;

    padding-bottom: 4px;

    gap: 10px;

    &::-webkit-scrollbar {
      display: none;
    }

    scrollbar-width: none;

    img {
      height: 20px;
      flex-shrink: 0;
    }
  }
`;


/* =====================================================
   BENEFITS
===================================================== */

const TrustGrid = styled.div`
  width: 100%;
  max-width: 1500px;

  margin: 0 auto;
   margin-top: 32px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);

  align-items: start;

  @media (max-width: 850px) {
    grid-template-columns: repeat(2, 1fr);
    row-gap: 40px;
  }

  
`;

const TrustItem = styled.div`
  display: flex;
  flex-direction: column;

  align-items: center;
  text-align: center;

  padding: 0 15px;
  .icons{
   font-wieght:500;
   outline: none;
   font-size: 25px;
  } 
`;


/* =====================================================
   ICONS
===================================================== */

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  height: 38px;

  margin-bottom: 13px;

  svg {
    font-size: 32px;
    color: #9a8d78;

    stroke-width: 0.8;
  }

  @media (max-width: 600px) {
    height: 34px;
    margin-bottom: 10px;

    svg {
      font-size: 29px;
    }
  }
`;


/* =====================================================
   TEXT
===================================================== */

const TrustTitle = styled.div`
  
   text-wrap:nowrap;
  font-size: 12px;
  line-height: 1.18;

  font-weight: 400;

  letter-spacing: 0;

  color: #45413d;

  

  @media (max-width: 600px) {
    font-size: 12px;
  }
`;

const TrustText = styled.div`
  margin-top: 2px;

  font-family: Georgia, serif;

  font-size: 10px;
  line-height: 1.2;

  font-weight: 400;

  color: #59544e;

  @media (max-width: 1000px) {
    font-size: 14px;
  }

  @media (max-width: 600px) {
    font-size: 15px;
  }
`;