import React from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

const AboutUs = () => {
  const { t, i18n } = useTranslation("aboutus", {
    returnObjects: true,
  });

  return (
    <Container
      className="about-us"
      dir={i18n.language === "ar" ? "rtl" : "ltr"}
    >
      <Content>

        <Header>
          <Eyebrow>
            ENOUZA
          </Eyebrow>

          <Title>
            {t("about.title")}
          </Title>

          <Lead>
            {t("about.intro")}
          </Lead>
        </Header>

        <Text>
          {t("about.passion")}
        </Text>

        <Section>
          <SectionTitle>
            {t("about.visionTitle")}
          </SectionTitle>

          <Text>
            {t("about.visionText")}
          </Text>
        </Section>

        <Section>
          <SectionTitle>
            {t("about.qualityTitle")}
          </SectionTitle>

          <Text>
            {t("about.qualityText")}
          </Text>
        </Section>

        <Section>
          <SectionTitle>
            {t("about.whyTitle")}
          </SectionTitle>

          <WhyList>
            <li>{t("about.why.items.0")}</li>
            <li>{t("about.why.items.1")}</li>
            <li>{t("about.why.items.2")}</li>
            <li>{t("about.why.items.3")}</li>
            <li>{t("about.why.items.4")}</li>
          </WhyList>
        </Section>

        <Section>
          <SectionTitle>
            {t("about.modernTitle")}
          </SectionTitle>

          <Text>
            {t("about.modernText")}
          </Text>
        </Section>

        <Closing>
          {t("about.closing")}
        </Closing>

      </Content>
    </Container>
  );
};

export default AboutUs;


/* =========================================================
   PAGE
========================================================= */

const Container = styled.main`
  width: 100%;

  min-height: 100vh;

  box-sizing: border-box;

  padding: 90px 24px;

  background: #f7f4ee;

  color: #292723;

  font-family:
    "Jost",
    "Helvetica Neue",
    Arial,
    sans-serif;

  @media (max-width: 768px) {
    padding: 65px 20px;
  }

  @media (max-width: 420px) {
    padding: 50px 16px;
  }
`;


/* =========================================================
   CONTENT
========================================================= */

const Content = styled.div`
  width: 100%;

  max-width: 780px;

  margin: 0 auto;
`;


/* =========================================================
   HEADER
========================================================= */

const Header = styled.header`
  margin-bottom: 45px;

  text-align: center;
`;


const Eyebrow = styled.span`
  display: block;

  margin-bottom: 14px;

  color: #b8955b;

  font-size: 10px;

  font-weight: 600;

  letter-spacing: 0.25em;

  text-transform: uppercase;
`;


const Title = styled.h1`
  margin: 0 0 24px;

  color: #292723;

  font-family:
    "Playfair Display",
    Georgia,
    serif;

  font-size: 48px;

  font-weight: 400;

  line-height: 1.15;

  letter-spacing: -0.02em;

  @media (max-width: 768px) {
    font-size: 38px;
  }

  @media (max-width: 420px) {
    font-size: 32px;
  }
`;


const Lead = styled.p`
  max-width: 680px;

  margin: 0 auto;

  color: #5f5a52;

  font-size: 16px;

  line-height: 1.9;

  @media (max-width: 420px) {
    font-size: 14px;
  }
`;


/* =========================================================
   TEXT
========================================================= */

const Text = styled.p`
  margin: 0;

  color: #656057;

  font-size: 15px;

  line-height: 1.95;

  font-weight: 400;
`;


/* =========================================================
   SECTION
========================================================= */

const Section = styled.section`
  margin-top: 48px;

  padding-top: 32px;

  border-top: 1px solid
    rgba(41, 39, 35, 0.12);
`;


const SectionTitle = styled.h2`
  margin: 0 0 17px;

  color: #292723;

  font-family:
    "Playfair Display",
    Georgia,
    serif;

  font-size: 25px;

  font-weight: 400;

  line-height: 1.3;

  @media (max-width: 420px) {
    font-size: 22px;
  }
`;


/* =========================================================
   WHY ENOUZA
========================================================= */

const WhyList = styled.ul`
  list-style: none;

  padding: 0;

  margin: 0;

  border-top: 1px solid
    rgba(41, 39, 35, 0.1);

  li {
    position: relative;

    padding: 15px 0;

    border-bottom: 1px solid
      rgba(41, 39, 35, 0.1);

    color: #5f5a52;

    font-size: 14px;

    line-height: 1.7;

    display: flex;

    align-items: flex-start;

    gap: 12px;

    &::before {
      content: "✦";

      flex-shrink: 0;

      color: #b8955b;

      font-size: 10px;

      line-height: 1.8;
    }
  }
`;


/* =========================================================
   CLOSING
========================================================= */

const Closing = styled.p`
  margin: 55px 0 0;

  padding-top: 35px;

  border-top: 1px solid
    rgba(41, 39, 35, 0.15);

  color: #292723;

  font-family:
    "Playfair Display",
    Georgia,
    serif;

  font-size: 19px;

  font-weight: 400;

  line-height: 1.8;

  text-align: center;

  @media (max-width: 420px) {
    font-size: 17px;
  }
`;