import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import styled from "styled-components";



/* =========================
   CONTAINER
========================= */

const Container = styled.div`
  width: min(100% - 40px, 980px);
  margin: 0 auto 80px;

  @media (max-width: 600px) {
    width: calc(100% - 28px);
    margin-bottom: 50px;
  }
`;


/* =========================
   FAQ SECTION
========================= */

const FAQSection = styled.section`
  width: 100%;

  &.return-section {
    margin-top: 75px;
  }

  .content {
    border-top: 1px solid #d8d3ca;
  }

  .content:last-child {
    border-bottom: 1px solid #d8d3ca;
  }

  .button-container {
    width: 100%;
    min-height: 84px;

    padding: 0 6px;

    display: grid;
    grid-template-columns: 34px 1fr;
    align-items: center;
    column-gap: 20px;

    border: none;
    outline: none;
    background: transparent;

    cursor: pointer;

    color: #191919;
    text-align: left;

    transition:
      color 0.3s ease,
      padding 0.3s ease;
  }

  .button-container:hover {
    color: #777;
    padding-left: 14px;
  }

  .arrow-wrapper {
    width: 28px;
    height: 28px;

    display: flex;
    align-items: center;
    justify-content: center;
  }

  .arrow-icon {
    font-size: 21px;
    color: #777;

    transition:
      transform 0.3s ease,
      color 0.3s ease;
  }

  .button-container:hover .arrow-icon {
    color: #191919;
    transform: translateX(3px);
  }

  .question {
    font-family: Georgia, "Times New Roman", serif;

    font-size: 16px;
    font-weight: 400;
    line-height: 1.5;
    letter-spacing: 0.2px;
  }

  .show {
    max-width: 720px;

    margin-left: 54px;

    padding: 0 20px 30px 0;

    color: #68645e;

    font-size: 14px;
    line-height: 1.85;

    animation: faqOpen 0.3s ease;
  }

  .show p {
    margin: 0 0 13px;
  }

  .show p:last-child {
    margin-bottom: 0;
  }

  .show ul {
    margin: 12px 0 0;
    padding-left: 20px;
  }

  .show li {
    margin-bottom: 7px;
    padding-left: 4px;
  }

  @keyframes faqOpen {
    from {
      opacity: 0;
      transform: translateY(-5px);
    }

    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (max-width: 600px) {
    .button-container {
      min-height: 72px;
      grid-template-columns: 28px 1fr;
      column-gap: 12px;
    }

    .question {
      font-size: 14px;
    }

    .show {
      margin-left: 40px;
      padding-right: 8px;
      padding-bottom: 24px;

      font-size: 13px;
      line-height: 1.8;
    }

    .arrow-icon {
      font-size: 19px;
    }
  }
`;