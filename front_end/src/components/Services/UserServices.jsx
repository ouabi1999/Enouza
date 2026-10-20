import React from "react";
import styled from "styled-components";

import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import ReplayIcon from "@mui/icons-material/Replay";

import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

function UserServices() {
  const { t, i18n } = useTranslation();

  const isRTL = i18n.dir() === "rtl";

  const services = [
    {
      icon: VerifiedUserIcon,
      text: t("trust.secureCheckout"),
    },
    {
      icon: LocalShippingIcon,
      text: t("trust.freeShipping.text"),
    },
    {
      icon: ReplayIcon,
      text: t("trust.returns.text"),
    },
    {
      icon: WorkspacePremiumIcon,
      text: t("trust.warranty.title"),
    },
  ];

  return (
    <Container>
      <Viewport>
        <Track
          $rtl={isRTL}
          animate={{
            x: isRTL ? ["-50%", "0%"] : ["0%", "-50%"],
          }}
          transition={{
            duration: 28,
            ease: "linear",
            repeat: Infinity,
            repeatType: "loop",
          }}
        >
          {[0, 1].map((groupIndex) => (
            <Group
              key={groupIndex}
              $rtl={isRTL}
              aria-hidden={groupIndex === 1 ? "true" : undefined}
            >
              {services.map((service, index) => {
                const Icon = service.icon;

                return (
                  <React.Fragment key={`${groupIndex}-${index}`}>
                    <Service>
                      <Icon className="service-icon" />
                      <span>{service.text}</span>
                    </Service>

                    <Separator aria-hidden="true">
                      <span />
                    </Separator>
                  </React.Fragment>
                );
              })}
            </Group>
          ))}
        </Track>
      </Viewport>
    </Container>
  );
}

export default UserServices;

/* =========================================================
   CONTAINER — ORIGINAL HEIGHT PRESERVED
========================================================= */

const Container = styled.div`
  position: sticky;
  top: 0;
  z-index: 2;

  width: 100%;
  height: 34px;
  min-height: 34px;

  overflow: hidden;

  background: #292925;

  display: flex;
  align-items: center;

  box-sizing: border-box;

  border-bottom: 1px solid rgba(194, 164, 118, 0.3);

  @media (prefers-reduced-motion: reduce) {
    scroll-behavior: auto;
  }
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

  &::before,
  &::after {
    content: "";

    position: absolute;
    top: 0;
    bottom: 0;

    width: 24px;

    z-index: 2;
    pointer-events: none;
  }

  &::before {
    inset-inline-start: 0;
    background: linear-gradient(
      to right,
      #292925,
      transparent
    );
  }

  &::after {
    inset-inline-end: 0;
    background: linear-gradient(
      to left,
      #292925,
      transparent
    );
  }

  @media (max-width: 600px) {
    &::before,
    &::after {
      width: 10px;
    }
  }
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

  direction: ${({ $rtl }) => ($rtl ? "rtl" : "ltr")};

  will-change: transform;

  transform: translate3d(0, 0, 0);

  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;

  @media (prefers-reduced-motion: reduce) {
    animation: none !important;
  }
`;

/* =========================================================
   GROUP
========================================================= */

const Group = styled.div`
  width: max(100vw, 1440px);
  min-width: max(100vw, 1440px);

  height: 100%;

  flex: 0 0 auto;

  display: flex;
  align-items: center;
  justify-content: space-between;

  box-sizing: border-box;

  padding: 0 50px;

  direction: ${({ $rtl }) => ($rtl ? "rtl" : "ltr")};

  @media (max-width: 816px) {
    width: max(100vw, 1000px);
    min-width: max(100vw, 1000px);
    padding: 0 28px;
  }

  @media (max-width: 480px) {
    padding: 0 20px;
  }
`;

/* =========================================================
   SERVICE
========================================================= */

const Service = styled.div`
  width: max-content;
  min-width: max-content;

  flex: 0 0 auto;

  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  box-sizing: border-box;

  white-space: nowrap;

  color: #f8f5ef;

  .service-icon {
    width: 16px;
    height: 16px;

    flex: 0 0 16px;

    color: #c6a779;

    margin-inline-end: 7px;
  }

  span {
    display: block;

    width: max-content;
    min-width: max-content;

    font-size: 11.5px;
    font-weight: 500;

    line-height: 1;
    letter-spacing: 0.25px;

    color: #f8f5ef;

    white-space: nowrap;
  }

  @media (max-width: 600px) {
    .service-icon {
      width: 15px;
      height: 15px;
      flex-basis: 15px;

      margin-inline-end: 6px;
    }

    span {
      font-size: 11px;
      letter-spacing: 0.1px;
    }
  }
`;

/* =========================================================
   SEPARATOR
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

  span {
    display: block;

    width: 3px;
    height: 3px;

    flex: 0 0 3px;

    border-radius: 50%;

    background: #c6a779;

    transform: translateY(-0.5px);
  }

  @media (max-width: 600px) {
    width: 26px;
    min-width: 26px;
    flex-basis: 26px;
  }
`;
