import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import styled from "styled-components";

function Description() {
  const productData = useSelector(
    (state) => state.product.productData
  );

  const { i18n, t } = useTranslation();

  const descriptions = productData?.description;

  const language = i18n.language?.split("-")[0] || "en";

  const description =
    descriptions?.[language] ||
    descriptions?.en ||
    "";

  if (!description?.trim()) return null;

  return (
    <Container>
      <SectionHeader>
        <Eyebrow>ENOUZA</Eyebrow>

        <Title>
          {t(
            "customer_reviews.description",
            "Product Description"
          )}
        </Title>

        <Accent />
      </SectionHeader>

      <DescriptionContent
        dangerouslySetInnerHTML={{
          __html: description,
        }}
      />
    </Container>
  );
}

export default Description;

/* =========================================================
   ENOUZA — PRODUCT DESCRIPTION
========================================================= */

const Container = styled.section`
  width: 100%;
  max-width: 1180px;
  margin: 0 auto;
  padding: 54px 32px 64px;
  box-sizing: border-box;
  color: #3f3932;

  @media (max-width: 768px) {
    padding: 42px 22px 52px;
  }

  @media (max-width: 480px) {
    padding: 36px 17px 44px;
  }
`;

/* =========================================================
   HEADER
========================================================= */

const SectionHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 38px;
  text-align: center;

  @media (max-width: 768px) {
    margin-bottom: 30px;
  }

  @media (max-width: 480px) {
    margin-bottom: 26px;
  }
`;

const Eyebrow = styled.span`
  margin-bottom: 7px;
  color: #a88a62;

  font-family: Arial, Helvetica, sans-serif;
  font-size: 8px;
  font-weight: 500;

  letter-spacing: 0.34em;
  text-transform: uppercase;
`;

const Title = styled.h2`
  margin: 0;
  color: #211e1a;

  font-family:
    "Cormorant Garamond",
    Georgia,
    "Times New Roman",
    serif;

  font-size: clamp(27px, 3.4vw, 37px);
  font-weight: 400;
  line-height: 1.15;
  letter-spacing: 0.01em;
`;

const Accent = styled.span`
  width: 30px;
  height: 1px;
  margin-top: 13px;
  background: #b39a76;
`;

/* =========================================================
   DESCRIPTION CONTENT
========================================================= */

const DescriptionContent = styled.div`
  width: 100%;
  max-width: 940px;
  margin: 0 auto;

  color: #514a42;

  font-family: Arial, Helvetica, sans-serif;

  font-size: 15px;
  font-weight: 400;
  line-height: 1.72;
  letter-spacing: 0.005em;

  p {
    margin: 0 0 15px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin-top: 30px;
    margin-bottom: 10px;

    color: #29251f;

    font-family:
      "Cormorant Garamond",
      Georgia,
      "Times New Roman",
      serif;

    font-weight: 500;
    line-height: 1.25;
    letter-spacing: 0.01em;

    &:first-child {
      margin-top: 0;
    }
  }

  h1 {
    font-size: 30px;
  }

  h2 {
    font-size: 26px;
  }

  h3 {
    font-size: 23px;
  }

  h4 {
    font-size: 20px;
  }

  h5 {
    font-size: 18px;
  }

  h6 {
    font-size: 17px;
  }

  img {
    display: block;
    width: auto;
    max-width: 100%;
    height: auto;
    margin: 24px auto;
    object-fit: contain;
    border-radius: 0;
  }

  figure {
    margin: 28px 0;
    text-align: center;

    img {
      margin: 0 auto 9px;
    }

    figcaption {
      color: #9a8d7f;
      font-family: Arial, Helvetica, sans-serif;
      font-size: 8px;
      line-height: 1.5;
      letter-spacing: 0.09em;
      text-transform: uppercase;
    }
  }

  /* LISTS */

  ul,
  ol {
    padding-left: 24px;
  }



    li {
        list-style: initial;

      position: relative;
      margin-bottom: 7px;
      padding-left: 16px;

      &::before {
        content: "";
        position: absolute;
        left: 0;
        top: 0.78em;

        width: 3px;
        height: 3px;

        border-radius: 50%;
        background: #b39a76;
      }
    }
  }

  ol {
    li {
      margin-bottom: 7px;
    }
  }

  li {
    line-height: 1.65;
  }

  strong,
  b {
    color: #29251f;
    font-weight: 600;
  }

  em,
  i {
    color: #766a5d;
  }

  a {
    color: #8f7655;
    text-decoration: none;

    border-bottom: 1px solid
      rgba(168, 138, 98, 0.35);

    transition:
      color 0.2s ease,
      border-color 0.2s ease;

    &:hover {
      color: #5f4b35;
      border-color: #8f7655;
    }
  }

  blockquote {
    margin: 22px 0;
    padding: 5px 0 5px 20px;

    border-left: 1px solid #b39a76;

    color: #62584e;

    font-family:
      "Cormorant Garamond",
      Georgia,
      "Times New Roman",
      serif;

    font-size: 20px;
    font-style: italic;
    line-height: 1.55;
  }

  hr {
    width: 100%;
    height: 1px;
    margin: 28px 0;

    border: 0;
    background: #e4ded6;
  }

  table {
    width: 100%;
    margin: 24px 0;

    border-collapse: collapse;

    font-family: Arial, Helvetica, sans-serif;

    font-size: 12px;
    line-height: 1.5;
  }

  th,
  td {
    padding: 10px 12px;

    border-bottom: 1px solid #e4ded6;

    text-align: left;
    vertical-align: top;
  }

  th {
    color: #29251f;

    font-size: 9px;
    font-weight: 600;

    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  td {
    color: #665d54;
  }

  @media (max-width: 768px) {
    font-size: 15px;
    line-height: 1.7;

    p {
      margin-bottom: 14px;
    }

    h1 {
      font-size: 27px;
    }

    h2 {
      font-size: 24px;
    }

    h3 {
      font-size: 21px;
    }

    h4 {
      font-size: 19px;
    }

    img {
      max-width: 100%;
      margin: 22px auto;
    }

    figure {
      margin: 24px 0;
    }

    blockquote {
      margin: 20px 0;
      padding-left: 16px;
      font-size: 18px;
    }

    table {
      display: block;
      width: 100%;
      overflow-x: auto;
      white-space: nowrap;

      -webkit-overflow-scrolling: touch;
    }
  }

  @media (max-width: 480px) {
    font-size: 14.5px;
    line-height: 1.68;

    ul,
    ol {
      padding-left: 21px;
    }

    ul li {
      padding-left: 14px;
    }

    h1 {
      font-size: 25px;
    }

    h2 {
      font-size: 22px;
    }

    h3 {
      font-size: 20px;
    }

    img {
      margin: 20px auto;
    }

    table {
      font-size: 11px;
    }

    th,
    td {
      padding: 9px 10px;
    }
  }
`;
