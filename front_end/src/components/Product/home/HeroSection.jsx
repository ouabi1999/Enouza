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
          <Title>
            {t("heroSection.title")}
          </Title>

          <Description>
            {t("heroSection.description")}
          </Description>

          <QualityTitle>
            <QualityLine />
            {t("heroSection.whereQualityMeetsDesign")}
          </QualityTitle>

          {/* MATERIALS */}
          <Materials>
            {Array.isArray(materials) &&
              materials.map((material, index) => (
                <MaterialChip key={index}>
                  {material}
                </MaterialChip>
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
              <span>
                {t("heroSection.ctaLabel")}
              </span>

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
    transform: translateY(22px);
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
    transform: translateY(-7px);
  }
`;

/* =========================
   HERO
========================= */

const HeroBox = styled.section`
  min-height: 100vh;

  padding: 30px 10px;

  position: relative;
  overflow: hidden;

  display: flex;
  align-items: center;
  justify-content: center;

  background:
    linear-gradient(
      135deg,
      #f7f5f1 0%,
      #eeeae2 52%,
      #e8e3da 100%
    );

  color: #1a1a1a;

  direction: ${({ $rtl }) =>
    $rtl ? "rtl" : "ltr"};

  @media (max-width: 900px) {
    padding: 60px 20px;
  }

  @media (max-width: 420px) {
    padding: 40px 10px;
  }
`;

const HeroContainer = styled.div`
  width: 100%;
  max-width: 1200px;

  margin: 0 auto;

  display: grid;

  grid-template-columns: 1fr 1fr;

  gap: 64px;

  align-items: center;

  position: relative;
  z-index: 1;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 50px;
  }
`;

/* =========================
   LEFT CONTENT
========================= */

const Content = styled.div`
  animation: ${fadeInUp} 0.8s ease-out;

  text-align: start;
`;

const Title = styled.h1`
  margin: 0 0 24px;

  max-width: 600px;

  color: #171615;

  font-family:
    "Playfair Display",
    Georgia,
    serif;

  font-size: 3rem;
  font-weight: 400;

  line-height: 1.08;

  letter-spacing: -0.02em;

  text-align: start;

  @media (max-width: 1100px) {
    font-size: 2.5rem;
  }

  @media (max-width: 600px) {
    font-size: 2rem;
  }
`;

const Description = styled.p`
  max-width: 90%;

  margin: 0 0 22px;

  color: #68645f;

  font-family:
    "Inter",
    Arial,
    sans-serif;

  font-size: 1.25rem;

  line-height: 1.75;

  text-align: start;

  @media (max-width: 600px) {
    font-size: 1rem;
    line-height: 1.7;
  }
`;

const QualityTitle = styled.p`
  display: flex;

  align-items: center;

  justify-content: flex-start;

  gap: 9px;

  margin: 0 0 20px;

  color: #806b45;

  font-family:
    "Inter",
    Arial,
    sans-serif;

  font-size: 1rem;

  font-weight: 500;

  letter-spacing: 0.04em;

  text-align: start;

  @media (max-width: 600px) {
    font-size: 0.75rem;
  }
`;

const QualityLine = styled.span`
  width: 28px;
  height: 1px;

  flex-shrink: 0;

  background: #a08a61;
`;

/* =========================
   MATERIALS
========================= */

const Materials = styled.div`
  display: flex;

  flex-wrap: wrap;

  align-items: center;

  justify-content: flex-start;

  gap: 0;

  margin-bottom: 36px;
`;

const MaterialChip = styled.span`
  display: inline-flex;

  align-items: center;

  padding-inline: 15px;

  color: #45413d;

  font-family:
    "Inter",
    Arial,
    sans-serif;

  font-size: 0.8rem;

  font-weight: 500;

  line-height: 1.2;

  border: 0;

  border-radius: 0;

  position: relative;

  white-space: nowrap;

  &:not(:last-child)::after {
    content: "";

    position: absolute;

    inset-inline-end: 0;

    width: 1px;
    height: 13px;

    background: #c9c3b9;
  }

  &:first-child {
    padding-inline-start: 0;
  }

  &:last-child {
    padding-inline-end: 0;
  }

  @media (max-width: 600px) {
    padding-inline: 11px;

    font-size: 0.75rem;
  }
`;

/* =========================
   STATS
========================= */

const Stats = styled.div`
  display: flex;

  align-items: stretch;

  gap: 0;

  max-width: 450px;

  border-top: 1px solid rgba(65, 59, 52, 0.15);

  border-bottom: 1px solid rgba(65, 59, 52, 0.15);

  padding: 17px 0;
`;

const Stat = styled.div`
  flex: 1;

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

    width: 1px;
    height: 32px;

    background: rgba(65, 59, 52, 0.15);
  }
`;

const StatNumber = styled.span`
  color: #302b27;

  font-family:
    "Playfair Display",
    Georgia,
    serif;

  font-size: 1.6rem;

  font-weight: 500;

  line-height: 1.1;

  @media (max-width: 600px) {
    font-size: 1.5rem;
  }
`;

const StatLabel = styled.span`
  margin-top: 5px;

  color: #77716a;

  font-family:
    "Inter",
    Arial,
    sans-serif;

  font-size: 0.7rem;

  letter-spacing: 0.08em;

  text-transform: uppercase;

  white-space: nowrap;
`;

/* =========================
   IMAGE
========================= */

const ImageSide = styled.div`
  animation:
    ${fadeInUp}
    0.8s
    ease-out
    0.3s
    both;
`;

const ImageContainer = styled.div`
  position: relative;

  width: 100%;

  overflow: hidden;

  background: #ded9d0;

  box-shadow:
    0 30px 70px
    rgba(48, 43, 39, 0.16);

  animation:
    ${floatAnimation}
    8s
    ease-in-out
    infinite;

  &::after {
    content: "";

    position: absolute;

    inset: 0;

    border: 1px solid
      rgba(255, 255, 255, 0.35);

    pointer-events: none;

    z-index: 2;
  }
`;

const HeroImage = styled.img`
  display: block;

  width: 100%;

  height: 600px;

  max-width: 600px;

  object-fit: cover;

  position: relative;

  transition:
    transform 0.8s ease;

  ${ImageContainer}:hover & {
    transform: scale(1.015);
  }

  @media (max-width: 900px) {
    max-width: none;

    height: 520px;
  }

  @media (max-width: 600px) {
    height: 400px;
  }

  @media (max-width: 420px) {
    height: 400px;
  }
`;

/* =========================
   SHOP BUTTON
========================= */

const ShopButton = styled(Link)`
  position: absolute;

  inset-inline-end: 7%;

  bottom: 42px;

  display: inline-flex;

  align-items: center;

  gap: 8px;

  color: #ffffff;

  text-decoration: none;

  font-family:
    "Inter",
    Arial,
    sans-serif;

  font-size: 0.7rem;

  font-weight: 500;

  letter-spacing: 0.14em;

  text-transform: uppercase;

  padding-bottom: 8px;

  border-bottom: 1px solid
    rgba(255, 255, 255, 0.8);

  z-index: 3;

  transition:
    color 0.3s ease,
    border-color 0.3s ease,
    gap 0.3s ease;

  &:hover {
    color: #ded0b5;

    border-color: #ded0b5;

    gap: 12px;
  }

  @media (max-width: 700px) {
    inset-inline-end: 50%;

    transform: translateX(
      ${({ $rtl }) =>
        $rtl ? "50%" : "50%"}
    );

    bottom: 30px;

    font-size: 0.7rem;
  }
`;

const Arrow = styled.span`
  display: flex;

  align-items: center;

  transform: ${({ $rtl }) =>
    $rtl
      ? "rotate(180deg)"
      : "none"};

  svg {
    font-size: 12px;
  }
`;