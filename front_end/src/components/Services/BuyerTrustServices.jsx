import React from "react";
import styled from "styled-components";

import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import CreditScoreIcon from "@mui/icons-material/CreditScore";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";

import { useTranslation } from "react-i18next";

const BuyerTrustServices = ({ divRef }) => {
  const { t, i18n } = useTranslation();

  return (
    <Container dir={i18n.language === "ar" ? "rtl" : "ltr"}>
      <Service ref={divRef}>
        <IconWrapper>
          <SupportAgentIcon className="icon" />
        </IconWrapper>

        <ServiceTitle>
          {t("buyerTrustServices.help_center.title")}
        </ServiceTitle>

        <ServiceDescription>
          {t("buyerTrustServices.help_center.description")}
        </ServiceDescription>
      </Service>

      <Service>
        <IconWrapper>
          <LocalShippingIcon className="icon" />
        </IconWrapper>

        <ServiceTitle>
          {t("buyerTrustServices.worldwide_shipping.title")}
        </ServiceTitle>

        <ServiceDescription>
          {t(
            "buyerTrustServices.worldwide_shipping.description"
          )}
        </ServiceDescription>
      </Service>

      <Service>
        <IconWrapper>
          <CreditScoreIcon className="icon" />
        </IconWrapper>

        <ServiceTitle>
          {t("buyerTrustServices.safe_Payment.title")}
        </ServiceTitle>

        <ServiceDescription>
          {t("buyerTrustServices.safe_Payment.description")}
        </ServiceDescription>
      </Service>

      <Service>
        <IconWrapper>
          <AdminPanelSettingsIcon className="icon" />
        </IconWrapper>

        <ServiceTitle>
          {t(
            "buyerTrustServices.Shop_with_confidence.title"
          )}
        </ServiceTitle>

        <ServiceDescription>
          {t(
            "buyerTrustServices.Shop_with_confidence.description"
          )}
        </ServiceDescription>
      </Service>
    </Container>
  );
};

export default BuyerTrustServices;


/* =========================================================
   CONTAINER
========================================================= */

const Container = styled.section`
  width: 100%;

  display: grid;
  grid-template-columns: repeat(4, 1fr);

  background: #faf9f6;

  border-top: 1px solid #ebe6df;
  border-bottom: 1px solid #ebe6df;

  box-sizing: border-box;

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;


/* =========================================================
   SERVICE
========================================================= */

const Service = styled.div`
  position: relative;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  padding: 32px 20px;

  text-align: center;

  /* DESKTOP — 3 separators */
  &:not(:last-child)::after {
    content: "";

    position: absolute;

    top: 50%;
    inset-inline-end: 0;

    width: 1px;
    height: 46px;

    transform: translateY(-50%);

    background: #ddd6cd;
  }

  /* TABLET — 2 columns */
  @media (max-width: 900px) {
    &:nth-child(2n)::after {
      display: none;
    }
  }

  /* MOBILE — horizontal separators */
  @media (max-width: 600px) {
    &:not(:last-child)::after {
      top: auto;
      bottom: 0;
      inset-inline-end: 50%;

      width: 60px;
      height: 1px;

      transform: translateX(50%);

      display: block;
    }
  }
`;


/* =========================================================
   ICON
========================================================= */

const IconWrapper = styled.div`
  width: 46px;
  height: 46px;

  display: flex;
  align-items: center;
  justify-content: center;

  margin-bottom: 13px;

  border: 1px solid #ded5ca;
  border-radius: 50%;

  background: #ffffff;

  box-sizing: border-box;

  .icon {
    font-size: 21px;

    color: #9b815f;

    transition: transform 250ms ease;
  }

  ${Service}:hover & .icon {
    transform: translateY(-2px);
  }
`;


/* =========================================================
   TITLE
========================================================= */

const ServiceTitle = styled.span`
  margin-bottom: 7px;

  color: #26221e;

  font-family:
    "Cormorant Garamond",
    Georgia,
    serif;

  font-size: 17px;

  font-weight: 600;

  line-height: 1.2;

  letter-spacing: 0.02em;
`;


/* =========================================================
   DESCRIPTION
========================================================= */

const ServiceDescription = styled.p`
  width: min(148px, 100%);

  margin: 0;

  color: #817970;

  font-size: 10px;

  font-weight: 400;

  line-height: 1.7;

  letter-spacing: 0.04em;

  text-align: center;
`;