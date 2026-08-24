import React, { useState } from "react";
import styled from "styled-components";
import Description from "./Description";
import ReviewsLayout from "./reviews/ReviewsLayout";
import { useTranslation } from "react-i18next";

function AboutProductLayout() {
  const [isOpen, setIsOpen] = useState(1);
  const { t, i18n } = useTranslation();

  return (
    <Container dir={i18n.language === "ar" ? "rtl" : "ltr"}>
      <TabsWrapper>
        <Tabs>
          <Tab
            type="button"
            $active={isOpen === 1}
            onClick={() => setIsOpen(1)}
          >
            {t("productInfo.CostumerReviews")}
          </Tab>

          <Tab
            type="button"
            $active={isOpen === 3}
            onClick={() => setIsOpen(3)}
          >
            {t("productInfo.description")}
          </Tab>
        </Tabs>
      </TabsWrapper>

      <Content>
        {isOpen === 1 && <ReviewsLayout />}
        {isOpen === 3 && <Description />}
      </Content>
    </Container>
  );
}

export default AboutProductLayout;

const Container = styled.section`
  width: 100%;
  max-width: 1400px;
  box-sizing: border-box;
  
`;

const TabsWrapper = styled.div`
  position: sticky;
  top: 69px;
  z-index:1;

  width: 100%;

  padding: 20px 0;

background:#F6F3ED;

  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);

  border-bottom: 1px solid #eee9e2;

  @media (max-width: 700px) {
    top: 55px;
    padding: 16px 0;
  }
`;

const Tabs = styled.nav`
  display: flex;
  align-items: center;
  justify-content: center;

  gap: clamp(28px, 5vw, 70px);

  width: 100%;

  @media (max-width: 500px) {
    gap: 24px;
  }
`;

const Tab = styled.button`
  position: relative;

  display: inline-flex;
  align-items: center;
  justify-content: center;

  padding: 7px 0;

  border: none;
  background: transparent;

  color: ${({ $active }) =>
    $active ? "#211e1a" : "#8b8278"};

  font-family:
    "Cormorant Garamond",
    Georgia,
    serif;

  font-size: clamp(18px, 2vw, 23px);
  font-weight: ${({ $active }) => ($active ? 500 : 400)};

  line-height: 1.2;

  letter-spacing: 0.015em;

  white-space: nowrap;

  cursor: pointer;

  transition:
    color 220ms ease,
    opacity 220ms ease;

  &::after {
    content: "";

    position: absolute;

    left: 0;
    right: 0;
    bottom: -1px;

    height: 1px;

    background: #a88a62;

    transform: scaleX(${({ $active }) => ($active ? 1 : 0)});
    transform-origin: center;

    transition: transform 280ms
      cubic-bezier(0.22, 1, 0.36, 1);
  }

  &:hover {
    color: #211e1a;
  }

  &:focus-visible {
    outline: 1px solid #a88a62;
    outline-offset: 6px;
  }

  @media (max-width: 550px) {
    font-size: 17px;
  }

  @media (max-width: 400px) {
    font-size: 15px;
  }
`;

const Content = styled.div`
  width: 100%;
  padding-top: 10px;
`;