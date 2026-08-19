import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { Link } from "react-router-dom";
import ApiInstance from "../../../../common/baseUrl";
import { useTranslation } from "react-i18next";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

export default function HeroSection() {
  const [product, setProduct] = useState(null);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const getHeroProduct = async () => {
      try {
        const res = await ApiInstance.get("/products/hero");
        setProduct(res.data);
      } catch (error) {
        setProduct(null);
        console.error(error);
      }
    };

    getHeroProduct();
  }, []);

  if (!product) return null;

  const materials = t("heroSection.materials", {
    returnObjects: true,
  });

  const imageUrl = product?.multimediaInfo?.image_urls
    ?.split(";")
    ?.filter(Boolean)?.[0];

  if (!imageUrl) return null;

  const isRTL = i18n.dir() === "rtl";

  return (
    <HeroBox $rtl={isRTL}>
      <HeroContainer>
        {/* LEFT / TEXT SIDE */}
        <Content>
          <Title>{t("heroSection.title")}</Title>

          <Description>{t("heroSection.description")}</Description>

          <QualityTitle>
            <QualityLine />
            {t("heroSection.whereQualityMeetsDesign")}
          </QualityTitle>

          {/* MATERIALS */}
          <Materials>
            {Array.isArray(materials) &&
              materials.map((material, index) => (
                <MaterialChip key={index}>{material}</MaterialChip>
              ))}
          </Materials>

          {/* STATS */}
          <Stats>
            <Stat>
              <StatNumber>24H</StatNumber>
              <StatLabel>
                {t("heroSection.stats.craftHours")}
              </StatLabel>
            </Stat>

            <Stat>
              <StatNumber>98%</StatNumber>
              <StatLabel>
                {t("heroSection.stats.satisfaction")}
              </StatLabel>
            </Stat>

            <Stat>
              <StatNumber>4.9</StatNumber>
              <StatLabel>
                {t("heroSection.stats.rated")} ★
              </StatLabel>
            </Stat>
          </Stats>
        </Content>

        {/* IMAGE SIDE */}
        <ImageSide>
          <ImageContainer>
            <HeroImage
              src={imageUrl}
              alt={t("heroSection.title")}
            />

            {/* SHOP BUTTON */}
            <ShopButton
              to={`/product/${product.id}`}
              $rtl={isRTL}
            >
              <span>{t("heroSection.ctaLabel")}</span>

              <Arrow $rtl={isRTL}>
                <ArrowForwardIcon />
              </Arrow>
            </ShopButton>
          </ImageContainer>
        </ImageSide>
      </HeroContainer>
    </HeroBox>
  );
}

/* =========================
   ANIMATIONS
========================= */

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(24px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const floatAnimation = keyframes`
  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-6px);
  }
`;

/* =========================
   HERO
========================= */

const HeroBox = styled.section`
  min-height: 100vh;

  padding: 54px 32px;

  position: relative;
  overflow: hidden;

  display: flex;
  align-items: center;
  justify-content: center;

  background:
    linear-gradient(
      135deg,
      #f8f6f2 0%,
      #f1eee8 48%,
      #e9e4dc 100%
    );

  color: #1a1917;

  direction: ${({ $rtl }) => ($rtl ? "rtl" : "ltr")};

  @media (max-width: 1100px) {
    padding: 48px 28px;
  }

  @media (max-width: 900px) {
    min-height: auto;
    padding: 72px 24px;
  }

  @media (max-width: 600px) {
    padding: 56px 18px;
  }

  @media (max-width: 420px) {
    padding: 46px 14px;
  }
`;

const HeroContainer = styled.div`
  width: 100%;
  max-width: 1240px;

  margin: 0 auto;

  display: grid;

  grid-template-columns: minmax(0, 0.92fr) minmax(0, 1.08fr);

  gap: clamp(42px, 6vw, 78px);

  align-items: center;

  position: relative;
  z-index: 1;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 52px;
  }

  @media (max-width: 600px) {
    gap: 42px;
  }
`;

/* =========================
   LEFT CONTENT
========================= */

const Content = styled.div`
  animation: ${fadeInUp} 0.8s ease-out both;

  text-align: start;

  max-width: 570px;

  @media (max-width: 900px) {
    max-width: 680px;
    margin: 0 auto;
    width: 100%;
  }
`;

const Title = styled.h1`
  margin: 0 0 25px;

  max-width: 570px;

  color: #171615;

  font-family:
    "Playfair Display",
    Georgia,
    serif;

  font-size: clamp(2.45rem, 4.2vw, 3.55rem);

  font-weight: 400;

  line-height: 1.06;

  letter-spacing: -0.025em;

  text-align: start;

  @media (max-width: 900px) {
    max-width: 700px;
  }

  @media (max-width: 600px) {
    margin-bottom: 20px;

    font-size: clamp(2rem, 9vw, 2.45rem);

    line-height: 1.1;
  }
`;

const Description = styled.p`
  max-width: 535px;

  margin: 0 0 27px;

  color: #68635d;

  font-family:
    "Inter",
    Arial,
    sans-serif;

  font-size: clamp(1rem, 1.4vw, 1.17rem);

  font-weight: 400;

  line-height: 1.78;

  text-align: start;

  @media (max-width: 600px) {
    margin-bottom: 23px;

    font-size: 0.96rem;

    line-height: 1.72;
  }
`;

const QualityTitle = styled.p`
  display: flex;

  align-items: center;

  justify-content: flex-start;

  gap: 10px;

  margin: 0 0 21px;

  color: #806b45;

  font-family:
    "Inter",
    Arial,
    sans-serif;

  font-size: 0.78rem;

  font-weight: 500;

  letter-spacing: 0.11em;

  line-height: 1.4;

  text-align: start;

  text-transform: uppercase;

  @media (max-width: 600px) {
    gap: 8px;

    margin-bottom: 18px;

    font-size: 0.68rem;

    letter-spacing: 0.08em;
  }
`;

const QualityLine = styled.span`
  width: 30px;

  height: 1px;

  flex-shrink: 0;

  background: #a08a61;

  opacity: 0.9;

  @media (max-width: 600px) {
    width: 24px;
  }
`;

/* =========================
   MATERIALS
========================= */
const Materials = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;

  width: 100%;
  max-width: 540px;

  margin-bottom: 37px;

  @media (max-width: 900px) {
    max-width: 620px;
  }

  @media (max-width: 600px) {
    justify-content: center;
    margin-bottom: 30px;
  }

  @media (max-width: 420px) {
    margin-bottom: 27px;
  }
`;

const MaterialChip = styled.span`
  position: relative;

  display: flex;
  align-items: center;
  justify-content: center;

  flex: 1 1 0;

  min-width: 0;

  padding: 0 16px;

  color: #45413d;

  font-family:
    "Inter",
    Arial,
    sans-serif;

  font-size: clamp(0.68rem, 1vw, 0.76rem);

  font-weight: 500;

  line-height: 1.35;

  letter-spacing: 0.015em;

  text-align: center;

  white-space: normal;

  &:not(:last-child)::after {
    content: "";

    position: absolute;

    inset-inline-end: 0;

    top: 50%;

    width: 1px;

    height: 14px;

    transform: translateY(-50%);

    background: #c7c0b6;

    opacity: 0.8;
  }

  &:first-child {
    padding-inline-start: 0;
  }

  &:last-child {
    padding-inline-end: 0;
  }

  @media (max-width: 700px) {
    padding: 0 10px;

    font-size: 0.68rem;

    line-height: 1.4;

    &:not(:last-child)::after {
      height: 12px;
    }
  }

  @media (max-width: 520px) {
    flex: 1 1 50%;

    min-height: 34px;

    padding: 4px 12px;

    &:nth-child(2)::after {
      display: none;
    }

    &:nth-child(1)::after,
    &:nth-child(3)::after {
      height: 11px;
    }
  }

  @media (max-width: 380px) {
    font-size: 0.63rem;

    padding-inline: 8px;
  }

`;

/* =========================
   STATS
========================= */

const Stats = styled.div`
  display: flex;

  align-items: stretch;

  gap: 0;

  width: 100%;

  max-width: 460px;

  border-top: 1px solid rgba(65, 59, 52, 0.15);

  border-bottom: 1px solid rgba(65, 59, 52, 0.15);

  padding: 18px 0;

  @media (max-width: 600px) {
    max-width: 100%;

    padding: 15px 0;
  }
`;

const Stat = styled.div`
  flex: 1;

  min-width: 0;

  display: flex;

  flex-direction: column;

  align-items: center;

  justify-content: center;

  text-align: center;

  position: relative;

  &:not(:last-child)::after {
    content: "";

    position: absolute;

    inset-inline-end: 0;

    top: 50%;

    width: 1px;

    height: 32px;

    transform: translateY(-50%);

    background: rgba(65, 59, 52, 0.14);
  }
`;

const StatNumber = styled.span`
  color: #302b27;

  font-family:
    "Playfair Display",
    Georgia,
    serif;

  font-size: clamp(1.4rem, 2.2vw, 1.65rem);

  font-weight: 500;

  line-height: 1.1;

  letter-spacing: -0.01em;

  @media (max-width: 600px) {
    font-size: 1.35rem;
  }

  @media (max-width: 380px) {
    font-size: 1.2rem;
  }
`;

const StatLabel = styled.span`
  margin-top: 6px;

  color: #77716a;

  font-family:
    "Inter",
    Arial,
    sans-serif;

  font-size: 0.63rem;

  font-weight: 500;

  letter-spacing: 0.1em;

  line-height: 1.3;

  text-transform: uppercase;

  white-space: nowrap;

  @media (max-width: 600px) {
    margin-top: 5px;

    font-size: 0.57rem;

    letter-spacing: 0.07em;
  }

  @media (max-width: 380px) {
    font-size: 0.52rem;
  }
`;

/* =========================
   IMAGE
========================= */

const ImageSide = styled.div`
  width: 100%;

  animation:
    ${fadeInUp}
    0.8s
    ease-out
    0.2s
    both;

  @media (max-width: 900px) {
    max-width: 720px;
    margin: 0 auto;
    width: 100%;
  }
`;

const ImageContainer = styled.div`
  position: relative;

  width: 100%;

  overflow: hidden;

  background: #ded9d0;

  box-shadow:
    0 26px 65px rgba(48, 43, 39, 0.13),
    0 8px 22px rgba(48, 43, 39, 0.06);

  animation:
    ${floatAnimation}
    8s
    ease-in-out
    infinite;

  &::after {
    content: "";

    position: absolute;

    inset: 0;

    border: 1px solid rgba(255, 255, 255, 0.4);

    pointer-events: none;

    z-index: 2;
  }

  @media (max-width: 600px) {
    box-shadow:
      0 20px 45px rgba(48, 43, 39, 0.12),
      0 6px 18px rgba(48, 43, 39, 0.05);
  }
`;

const HeroImage = styled.img`
  display: block;

  width: 100%;

  height: clamp(470px, 46vw, 620px);

  max-width: 100%;

  object-fit: cover;

  position: relative;

  transition:
    transform 0.9s cubic-bezier(0.2, 0.65, 0.25, 1);

  ${ImageContainer}:hover & {
    transform: scale(1.018);
  }

  @media (max-width: 900px) {
    height: min(68vw, 540px);
  }

  @media (max-width: 600px) {
    height: min(115vw, 470px);
  }

  @media (max-width: 420px) {
    height: 105vw;
    min-height: 350px;
  }
`;

/* =========================
   SHOP BUTTON
========================= */
const Arrow = styled.span`
  display: flex;
  
  svg{
   font-size: 10px;
  }
  transform: ${({ $rtl }) =>
    $rtl ? "rotate(180deg)" : "none"};

  
`;
const ShopButton = styled(Link)`
  position: absolute;
  left: 7%;
  bottom: 20px;
  display: inline-flex;
  align-items: center;
  gap: 9px;
  color: white;
  text-decoration: none;
  font-family:
  "Times New Roman",
  serif;
  font-wieght:500;
    font-size: 0.7rem;

  white-space: nowrap; /* ✅ fixed */
  letter-spacing: 0.12em;
  text-transform: uppercase;
  padding-bottom: 7px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.8);
  z-index: 5; /* ✅ prevents hiding behind image */
  transition: color 0.25s ease, border-color 0.25s ease, gap 0.25s ease; /* ✅ explicit + gap */

  &:hover {
    color: #d4bd91;
    border-color: #d4bd91;
    gap: 12px; /* optional: makes arrow move on hover */
  }

  &:focus-visible {
    outline: 1px solid white;
    outline-offset: 5px;
  }

  /* RTL support */
  [dir="rtl"] & {
    left: auto;
    right: 7%;

  }

  @media (max-width: 700px) {
    left: auto; /* ✅ clear the desktop left value */
    right: 50%;
    transform: translateX(50%);
    bottom: 30px;
    font-size: 0.7rem;

    /* RTL fix for mobile */
    [dir="rtl"] & {
      left: 50%;
      right: auto;
      transform: translateX(-50%); /* mirror the centering */
          font-size: 10rem;

    }
  }

  @media (max-width: 420px) {
    bottom: 24px;
  }
`;