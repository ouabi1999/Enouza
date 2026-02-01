import React, { useLayoutEffect } from 'react';
import styled from "styled-components";
import HeadeSeo from '../../../common/HeadeSeo';
import { useTranslation } from 'react-i18next';

function RefundPolicy() {
  const { t } = useTranslation("refund", { returnObjects: true });

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0 });
  }, []);

  return (
    <Container>
      <HeadeSeo title={t("returnPolicy.seoTitle")} />

      <div>
        <Title>{t("returnPolicy.title")}</Title>
      </div>

      <Section>
        <Subtitle>{t("returnPolicy.returns.heading")}</Subtitle>
        <Text>{t("returnPolicy.returns.text")}</Text>
      </Section>

      <Section>
        <Subtitle>{t("returnPolicy.rejectedRefunds.heading")}</Subtitle>
        <OrderedList>
          {t("returnPolicy.rejectedRefunds.items", { returnObjects: true })?.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </OrderedList>
      </Section>

      <Section>
        <Subtitle>{t("returnPolicy.exceptions.heading")}</Subtitle>
        <Text>{t("returnPolicy.exceptions.text")}</Text>
      </Section>

      <Section>
        <Subtitle>{t("returnPolicy.returnShipping.heading")}</Subtitle>
        <Text>{t("returnPolicy.returnShipping.text")}</Text>
      </Section>

      <Section>
        <Subtitle>{t("returnPolicy.damagesIssues.heading")}</Subtitle>
        <Text>{t("returnPolicy.damagesIssues.text")}</Text>
      </Section>

      <Section>
        <Subtitle>{t("returnPolicy.refunds.heading")}</Subtitle>
        <Text>{t("returnPolicy.refunds.text")}</Text>
      </Section>
    </Container>
  );
}

export default RefundPolicy;

// Styled Components
const Container = styled.div`
  width: calc(100% - 30px);
  min-height: 100vh;
  margin: 10px auto;
  padding: 10px 15px;
`;

const Title = styled.h2`
  font-weight: 900;
  font-size: 32px;
  text-align: center;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    font-size: 28px;
  }

  @media (max-width: 480px) {
    font-size: 24px;
  }
`;

const Section = styled.div`
  margin-bottom: 20px;

  @media (max-width: 480px) {
    margin-bottom: 15px;
  }
`;

const Subtitle = styled.h3`
  font-size: 20px;
  font-weight: 700;
  border-bottom: 2px solid lightgray;
  margin-bottom: 10px;

  @media (max-width: 768px) {
    font-size: 18px;
  }

  @media (max-width: 480px) {
    font-size: 16px;
  }
`;

const Text = styled.p`
  font-size: 14px;
  line-height: 1.8;
  margin-bottom: 10px;

  @media (max-width: 768px) {
    font-size: 13px;
  }

  @media (max-width: 480px) {
    font-size: 12px;
  }
`;

const OrderedList = styled.ol`
  padding-left: 20px;

  li {
    font-size: 14px;
    line-height: 1.8;
    margin-bottom: 5px;

    @media (max-width: 768px) {
      font-size: 13px;
    }

    @media (max-width: 480px) {
      font-size: 12px;
    }
  }
`;
