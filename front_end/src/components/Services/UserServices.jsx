import React from "react";
import styled from "styled-components";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

function UserServices() {
  const { t, i18n } = useTranslation();

  const services = [
    { icon: <MonetizationOnIcon className="icon" />, text: t("homePage.money_Back") },
    { icon: <VerifiedUserIcon className="icon" />, text: t("homePage.safe_reliable_payments") },
    { icon: <SupportAgentIcon className="icon" />, text: t("homePage.support_24_7") },
    { icon: <LocalShippingIcon className="icon" />, text: t("common.free_shipping") },
  ];

  return (
    <Container>
      <Track
        animate={{
          x: i18n.dir() === "ltr" ? ["0%", "-50%"] : ["0%", "50%"],
        }}
        transition={{
          duration: 30,
          ease: "linear",
          repeat: Infinity,
        }}
      >
        <Group>
          {services.map((service, index) => (
            <MinWrap key={`one-${index}`}>
              <IconWrap>{service.icon}</IconWrap>
              <span>{service.text}</span>
            </MinWrap>
          ))}
        </Group>
        <Group>
          {services.map((service, index) => (
            <MinWrap key={`two-${index}`}>
              <IconWrap>{service.icon}</IconWrap>
              <span>{service.text}</span>
            </MinWrap>
          ))}
        </Group>
      </Track>
    </Container>
  );
}

export default UserServices;

// ---------- Styled Components (Soft & Luminous Luxury) ----------

const Container = styled.div`
  width: 100%;
  max-width: 100vw;
  padding: 8px 0;
  background: #faf6f0; /* warm, soft cream - reflects light */
  
  overflow: hidden;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.03); /* barely-there soft shadow */
`;

const Track = styled(motion.div)`
  display: flex;
  width: 200vw;
  will-change: transform;
`;

const Group = styled.div`
  width: 100vw;
  min-width: 100vw;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

const MinWrap = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px 24px;
  font-family: "Playfair Display", "Georgia", serif; /* elegant, classic */
  white-space: nowrap;
  transition: all 0.4s ease;
  cursor: default;

  span {
    font-size: 17px;
    font-weight: 400;
    letter-spacing: 0.8px;
    color: #4a3b32; /* warm espresso, not harsh black */
    transition: color 0.4s ease;
  }

  /* Soft, warm separator dot */
  &:not(:last-child)::after {
    content: "•";
    position: absolute;
    right: -2px;
    color: #e2d6c6; /* muted warm beige */
    font-size: 18px;
    font-weight: 300;
    opacity: 0.8;
  }

  /* Hover: gentle lift + warm glow like turning on a lamp */
  &:hover {
    transform: translateY(-2px);
    span {
      color: #b8956a; /* soft champagne bronze */
    }
    .icon {
      filter: drop-shadow(0 0 12px rgba(196, 160, 122, 0.25));
      color: #b8956a;
    }
  }

  /* Responsive */
  @media only screen and (max-width: 815px) {
    padding: 6px 14px;
    span {
      font-size: 13px;
      letter-spacing: 0.5px;
    }
    &:not(:last-child)::after {
      right: 0px;
      font-size: 14px;
    }
  }

  @media only screen and (max-width: 420px) {
    padding: 4px 8px;
    span {
      font-size: 9px;
      letter-spacing: 0.3px;
      font-weight: 500;
    }
    &:not(:last-child)::after {
      right: 0px;
      font-size: 10px;
    }
  }
`;

const IconWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
  margin-left: 6px;

  .icon {
    display: block;
    color: #c4a07a; /* refined champagne bronze */
    font-size: 20px;
    transition: all 0.4s ease;
    filter: drop-shadow(0 0 6px rgba(196, 160, 122, 0.1));
  }

  @media only screen and (max-width: 815px) {
    margin-right: 8px;
    margin-left: 4px;
    .icon {
      font-size: 16px;
    }
  }

  @media only screen and (max-width: 420px) {
    margin-right: 5px;
    margin-left: 3px;
    .icon {
      font-size: 12px;
    }
  }
`;