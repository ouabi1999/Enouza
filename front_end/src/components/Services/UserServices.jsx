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
      text: t("common.free_shipping"),}
  ];

  return (
    <Container>
      <Track
        animate={{ x:i18n.dir() === "ltr" ? ["0%", "-50%"] : ["0%", "50%"] }}
        transition={{
          duration: 25,
          ease: "linear",
          repeat: Infinity,
        }}
      >
        {/* FIRST GROUP */}
        <Group>
          {services.map((service, index) => (
            <MinWrap key={`one-${index}`}>
              {service.icon}
              <span>{service.text}</span>
            </MinWrap>
          ))}
        </Group>

        {/* SECOND GROUP */}
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
  padding: 10px 0;
  max-width: 100vw;
  background: #ffffff;

  overflow: hidden;
`;

const Track = styled(motion.div)`
  display: flex;

  width: 200vw;
`;

const Group = styled.div`
  width: 100vw;
  flex-shrink: 0;

  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 0 15px;

  box-sizing: border-box;
`;

const MinWrap = styled.div`
  width: 35.3333%;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 2px 15px;

  box-sizing: border-box;

  font-family:
    "Franklin Gothic Medium",
    "Arial Narrow",
    Arial,
    sans-serif;


  white-space: nowrap;

  span {
    font-size: 15px;
    color: #000;
  }

  .icon {
    color: #181716;
    margin-right: 5px;
    margin-left: 5px;
  }

  @media only screen and (max-width: 815px) {
    padding: 2px 8px;

    span {
      font-size: 12px;
    }

    .icon {
      color: #000000;
      margin-right: 3px;
      font-size: 97%;
    }
  }

  @media only screen and (max-width: 420px) {
    padding: 2px 5px;

    span {
      font-size: 8px;
      font-weight: bolder;
    }

    .icon {
      color: #c4a96a;
      margin-right: 3px;
      font-size: 99%;
    }
  }
`;