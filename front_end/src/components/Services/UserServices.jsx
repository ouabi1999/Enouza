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

  const isRTL = i18n.dir() === "rtl";

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

  return (
    <Container>
      <Viewport>
        <Track
          $rtl={isRTL}
          animate={{
            x: isRTL
              ? ["-50%", "0%"]
              : ["0%", "-50%"],
          }}
          transition={{
            duration: 24,
            ease: "linear",
            repeat: Infinity,
            repeatType: "loop",
          }}
        >
          {/* =================================================
              FIRST GROUP
          ================================================= */}

          <Group $rtl={isRTL}>
            {services.map((service, index) => {
              const Icon = service.icon;

              return (
                <React.Fragment key={`first-${index}`}>
                  <Service>
                    <Icon className="service-icon" />

                    <span>{service.text}</span>
                  </Service>

                  {/* Dot after EVERY item.
                      This includes the last item so that
                      the loop connects naturally. */}
                  <Separator aria-hidden="true">
                    <span />
                  </Separator>
                </React.Fragment>
              );
            })}
          </Group>

          {/* =================================================
              SECOND GROUP
              Exact duplicate for seamless infinite loop
          ================================================= */}

          <Group
            $rtl={isRTL}
            aria-hidden="true"
          >
            {services.map((service, index) => {
              const Icon = service.icon;

              return (
                <React.Fragment key={`second-${index}`}>
                  <Service>
                    <Icon className="service-icon" />

                    <span>{service.text}</span>
                  </Service>

                  {/* Dot after EVERY item */}
                  <Separator aria-hidden="true">
                    <span />
                  </Separator>
                </React.Fragment>
              );
            })}
          </Group>
        </Track>
      </Viewport>
    </Container>
  );
}

export default UserServices;


/* =========================================================
   CONTAINER
========================================================= */

const Container = styled.div`
  position: -webkit-sticky;
  position: sticky;

  top: 0;
  z-index: 20;

  width: 100%;
  height: 34px;

  overflow: hidden;

  background: #353531;

  display: flex;
  align-items: center;

  box-sizing: border-box;
`;


/* =========================================================
   VIEWPORT
========================================================= */

const Viewport = styled.div`
  position: relative;

  width: 100%;
  height: 100%;

  overflow: hidden;

  display: flex;
  align-items: center;

  box-sizing: border-box;
`;


/* =========================================================
   TRACK
========================================================= */

const Track = styled(motion.div)`
  display: flex;
  align-items: center;

  width: max-content;
  min-width: max-content;

  height: 100%;

  flex-shrink: 0;

  direction: ${({ $rtl }) =>
    $rtl ? "rtl" : "ltr"};

  will-change: transform;

  transform: translate3d(0, 0, 0);

  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
`;


/* =========================================================
   GROUP
========================================================= */

const Group = styled.div`
  /*
   * Desktop-first canvas.
   *
   * At desktop sizes:
   *     the group fills the viewport.
   *
   * Below 1440px:
   *     the group DOES NOT shrink.
   *
   * This is what allows the viewport to show:
   *     4 items
   *     3.5 items
   *     3 items
   *     2.5 items
   *     2 items
   * etc.
   */
  width: max(100vw, 1440px);
  min-width: max(100vw, 1440px);

  height: 100%;

  flex: 0 0 auto;

  display: flex;
  align-items: center;

  justify-content: space-between;

  box-sizing: border-box;

  padding: 0 50px;

  direction: ${({ $rtl }) =>
    $rtl ? "rtl" : "ltr"};
   @media only screen and (max-width: 816px) {

      width: max(100vw, 1000px);
      min-width: max(100vw, 1000px);
  }
`;


/* =========================================================
   SERVICE
========================================================= */

const Service = styled.div`
  /*
   * Natural fixed width.
   *
   * The item never stretches
   * and never shrinks.
   */
  width: max-content;
  min-width: max-content;

  flex: 0 0 auto;

  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  box-sizing: border-box;

  white-space: nowrap;

  font-family:
    "Franklin Gothic Medium",
    "Arial Narrow",
    Arial,
    sans-serif;

  color: #ffffff;

  .service-icon {
    width: 18px;
    height: 18px;

    flex: 0 0 18px;

    color: #ffffff;

    margin-inline-end: 7px;
  }

  span {
    display: block;

    width: max-content;
    min-width: max-content;

    font-size: 12px;

    font-weight: 500;

    line-height: 1;

    letter-spacing: 0.2px;

    color: #ffffff;

    white-space: nowrap;
  }
`;


/* =========================================================
   SEPARATOR / DOT
========================================================= */

const Separator = styled.div`
  width: 36px;
  min-width: 36px;

  height: 100%;

  flex: 0 0 36px;

  display: flex;
  align-items: center;
  justify-content: center;

  box-sizing: border-box;

  /*
   * The dot is a real element.
   * It is centered vertically by flexbox.
   */
  span {
    display: block;

    width: 3px;
    height: 3px;

    flex: 0 0 3px;

    border-radius: 50%;

    background: #ffffff;

    transform: translateY(-0.5px);
  }
`;