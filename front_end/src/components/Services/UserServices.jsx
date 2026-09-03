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
    {
      icon: <MonetizationOnIcon className="icon" />,
      text: t("homePage.money_Back"),
    },
    {
      icon: <VerifiedUserIcon className="icon" />,
      text: t("homePage.safe_reliable_payments"),
    },
    {
      icon: <SupportAgentIcon className="icon" />,
      text: t("homePage.support_24_7"),
    },
    {
      icon: <LocalShippingIcon className="icon" />,
      text: t("common.free_shipping"),
    },
  ];

  const isRTL = i18n.language[0] === "ar";

  return (
    <Container>
      <Track
        $rtl={isRTL}
        animate={{
          x: isRTL ? ["0%", "50%"] : ["0%", "-50%"],
        }}
        transition={{
          duration:12,
          ease: "linear",
          repeat: Infinity,
          repeatType: "loop",
        }}
      >
        <Group>
          {services.map((service, index) => (
            <MinWrap key={`one-${index}`}>
              {service.icon}
              <span>{service.text}</span>
            </MinWrap>
          ))}
        </Group>

        <Group>
          {services.map((service, index) => (
            <MinWrap key={`two-${index}`}>
              {service.icon}
              <span>{service.text}</span>
            </MinWrap>
          ))}
        </Group>
      </Track>
    </Container>
  );
}

export default UserServices;

const Container = styled.div`
  width: 100%;
  max-width: 100vw;
  padding: 13px 0;
  background: #ffffff;
  overflow: hidden;

  border-top: 1px solid #f1efec;
  border-bottom: 1px solid #f1efec;

  position: relative;
`;

const Track = styled(motion.div)`
  display: flex;

  width: 200vw;

  will-change: transform;

  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;

  transform: translate3d(0, 0, 0);

  @media only screen and (max-width: 815px) {
    will-change: transform;
  }
`;

const Group = styled.div`
  flex: 0 0 100vw;
  width: 100vw;

  display: flex;
  align-items: center;
  justify-content: space-around;
`;

const MinWrap = styled.div`
  position: relative;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 3px 18px;

  font-family:
    "Franklin Gothic Medium",
    "Arial Narrow",
    Arial,
    sans-serif;

  white-space: nowrap;

  span {
    font-size: 14px;
    font-weight: 500;
    line-height: 1.2;
    letter-spacing: 0.25px;
    color: #34312e;
  }

  .icon {
    width: 19px;
    height: 19px;

    color: #81766b;

    margin-right: 7px;
    margin-left: 7px;

    flex-shrink: 0;
  }

  &::after {
    content: "";

    position: absolute;

    right: -1px;
    top: 50%;

    width: 3px;
    height: 3px;

    transform: translateY(-50%);

    border-radius: 50%;
    background: #b8afa7;
  }

  @media only screen and (max-width: 815px) {
    padding: 3px 10px;

    span {
      font-size: 11px;
      font-weight: 500;
      letter-spacing: 0.15px;
      color: #383532;
    }

    .icon {
      width: 16px;
      height: 16px;

      margin-right: 4px;
      margin-left: 4px;
    }

    &::after {
      width: 2.5px;
      height: 2.5px;
    }
  }

  @media only screen and (max-width: 420px) {
    padding: 2px 6px;

    span {
      font-size: 8px;
      font-weight: 600;
      letter-spacing: 0.05px;
      color: #3b3835;
    }

    .icon {
      width: 13px;
      height: 13px;

      margin-right: 3px;
      margin-left: 3px;
    }

    &::after {
      width: 2px;
      height: 2px;
    }
  }
`;