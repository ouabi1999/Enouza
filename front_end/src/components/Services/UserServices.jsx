import React, { useEffect, useState } from "react";
import styled from "styled-components";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";

function UserServices() {
  const { t, i18n } = useTranslation();

  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const isRTL = i18n.language?.startsWith("ar");

  const services = [
    {
      icon: MonetizationOnIcon,
      text: t("homePage.money_Back"),
    },
    {
      icon: VerifiedUserIcon,
      text: t("homePage.safe_reliable_payments"),
    },
    {
      icon: SupportAgentIcon,
      text: t("homePage.support_24_7"),
    },
    {
      icon: LocalShippingIcon,
      text: t("common.free_shipping"),
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(isRTL ? -1 : 1);

      setActiveIndex((prev) => {
        return (prev + 1) % services.length;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [services.length, isRTL]);

  const ActiveIcon = services[activeIndex].icon;

  return (
    <Container>
      <SliderViewport $rtl={isRTL}>
        <AnimatePresence
          mode="popLayout"
          initial={false}
          custom={direction}
        >
          <SliderItem
            key={activeIndex}
            custom={direction}
            $rtl={isRTL}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              duration: 0.55,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <IconWrapper>
              <ActiveIcon />
            </IconWrapper>

            <Text>
              {services[activeIndex].text}
            </Text>
          </SliderItem>
        </AnimatePresence>
      </SliderViewport>
    </Container>
  );
}

export default UserServices;


/* =========================================================
   SLIDE ANIMATION
========================================================= */

const slideVariants = {
  enter: (direction) => ({
    x: direction > 0 ? "100%" : "-100%",
    opacity: 0,
  }),

  center: {
    x: "0%",
    opacity: 1,
  },

  exit: (direction) => ({
    x: direction > 0 ? "-100%" : "100%",
    opacity: 0,
  }),
};


/* =========================================================
   MAIN BAR
========================================================= */

const Container = styled.div`
  position: -webkit-sticky;
  position: sticky;

  top: 0;

  z-index: 20;

  width: 100%;

  height: 38px;

  background: #363633;

  overflow: hidden;

  display: flex;
  align-items: center;

  box-sizing: border-box;

  @media (max-width: 815px) {
    height: 34px;
  }

  @media (max-width: 480px) {
    height: 30px;
  }
`;


/* =========================================================
   SLIDER VIEWPORT
========================================================= */

const SliderViewport = styled.div`
  position: relative;

  width: 100%;
  height: 100%;

  overflow: hidden;

  display: flex;
  align-items: center;
  justify-content: center;

  direction: ${({ $rtl }) => ($rtl ? "rtl" : "ltr")};
`;


/* =========================================================
   SLIDER ITEM
========================================================= */

const SliderItem = styled(motion.div)`
  position: absolute;

  inset: 0;

  width: 100%;
  height: 100%;

  display: flex;

  align-items: center;
  justify-content: center;

  white-space: nowrap;

  box-sizing: border-box;

  padding: 0 20px;

  direction: ${({ $rtl }) => ($rtl ? "rtl" : "ltr")};

  will-change: transform, opacity;
`;


/* =========================================================
   ICON
========================================================= */

const IconWrapper = styled.div`
  width: 18px;
  height: 18px;

  display: flex;
  align-items: center;
  justify-content: center;

  flex-shrink: 0;

  margin-inline-end: 7px;

  svg {
    width: 100%;
    height: 100%;

    color: #ffffff;
  }

  @media (max-width: 815px) {
    width: 15px;
    height: 15px;

    margin-inline-end: 5px;
  }

  @media (max-width: 480px) {
    width: 13px;
    height: 13px;

    margin-inline-end: 4px;
  }
`;


/* =========================================================
   TEXT
========================================================= */

const Text = styled.span`
  color: #ffffff;

  font-family:
    "Franklin Gothic Medium",
    "Arial Narrow",
    Arial,
    sans-serif;

  font-size: 12px;

  font-weight: 500;

  line-height: 1;

  letter-spacing: 0.15px;

  white-space: nowrap;

  @media (max-width: 815px) {
    font-size: 10px;
  }

  @media (max-width: 480px) {
    font-size: 8.5px;
  }

  @media (max-width: 360px) {
    font-size: 8px;
  }
`;