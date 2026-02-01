import React, { useLayoutEffect } from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import HeadeSeo from "../../../common/HeadeSeo"; // keep your existing path

function ShippingPolicy() {
  const { t } = useTranslation("shipping"); // using default namespace so we call t("shipping.xxx")

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0 });
  }, []);

  return (
    <Container>
      <HeadeSeo title={t("shipping.seoTitle")} />
      <Title>{t("shipping.title")}</Title>
      <Content>
        <div>
          <h2>{t("shipping.title")}</h2>
          <p>{t("shipping.intro")}</p>
        </div>

        <h3>{t("shipping.deliveryTime.title")}</h3>
        <p>{t("shipping.deliveryTime.description")}</p>

        <h3>{t("shipping.tracking.title")}</h3>
        <p>{t("shipping.tracking.description")}</p>

        <h3>{t("shipping.customFees.title")}</h3>
        <p>{t("shipping.customFees.description")}</p>

        <h3>{t("shipping.lostOrDelayedPackages.title")}</h3>
        <p>{t("shipping.lostOrDelayedPackages.description")}</p>

        <h3>{t("shipping.contact.title")}</h3>
        <p>{t("shipping.contact.description")}</p>
      </Content>
    </Container>
  );
}

export default ShippingPolicy;

// Styled Components (unchanged)
const Container = styled.div`
  width: calc(100% - 30px);
  min-height: 100vh;
  margin: 10px auto;
  padding: 10px 15px;
 
`;

const Title = styled.h2`
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
