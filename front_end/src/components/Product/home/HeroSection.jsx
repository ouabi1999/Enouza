import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { Link } from "react-router-dom";
import ApiInstance from "../../../../common/baseUrl";
import { useTranslation } from "react-i18next";

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

  return (
    <HeroBox>
      <HeroContainer>

        {/* LEFT SIDE */}
        <Content>
          <Title>
            {t("heroSection.title")}
          </Title>

          <Description>
            {t("heroSection.description")}
          </Description>

          <QualityTitle>
            {t("heroSection.whereQualityMeetsDesign")}
          </QualityTitle>

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
              <StatNumber>5★</StatNumber>
              <StatLabel>
                {t("heroSection.stats.rated")}
              </StatLabel>
            </Stat>
          </Stats>
        </Content>

        {/* RIGHT SIDE */}
        <ImageSide>
          <ImageContainer>
            <HeroImage
              src={imageUrl}
              alt={t("heroSection.title")}
            />

            {/* SHOP BUTTON INSIDE IMAGE */}
            <ShopButton
              to={`/product/${product.id}`}
              $rtl={i18n.dir() === "rtl"}
            >
              <span>
                {t("heroSection.ctaLabel")}
              </span>

              <Arrow $rtl={i18n.dir() === "rtl"}>
                →
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
    transform: translateY(30px);
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
    transform: translateY(-20px);
  }
`;

/* =========================
   HERO
========================= */

const HeroBox = styled.section`
  min-height: 100vh;
  padding: 20px 10px;

  position: relative;
  overflow: hidden;

  display: flex;
  align-items: center;
  justify-content: center;

  background: linear-gradient(
    135deg,
    #f5f3ef 0%,
    #e8e4d9 100%
  );

  color: #1a1a1a;

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

  gap: 48px;

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
`;

const Title = styled.h1`
  margin: 0 0 24px;

  color: #1a1a1a;

  font-family: "Playfair Display", serif;

  font-size: 3rem;
  font-weight: 300;

  line-height: 1.1;

  @media (max-width: 1100px) {
    font-size: 2.5rem;
  }

  @media (max-width: 600px) {
    font-size: 2rem;
  }
`;

const Description = styled.p`
  max-width: 90%;

  margin: 0 0 18px;

  color: #666666;

  font-family: "Inter", sans-serif;

  font-size: 1.25rem;

  line-height: 1.8;

  @media (max-width: 600px) {
    font-size: 1rem;
  }
`;

const QualityTitle = styled.p`
  margin: 0 0 18px;

  color: #000000;

  font-family: "Inter", sans-serif;

  font-size: 1rem;

  font-weight: 600;

  text-transform: uppercase;

  @media (max-width: 600px) {
    font-size: 0.75rem;
  }
`;

/* =========================
   MATERIALS
========================= */

const Materials = styled.div`
  display: flex;
  flex-wrap: wrap;

  gap: 8px;

  margin-bottom: 30px;
`;

const MaterialChip = styled.span`
  display: inline-flex;
  align-items: center;

  padding: 6px 14px;

  background: #ffffff;

  color: #3c2f2f;

  border: 1px solid rgba(216, 196, 182, 0.3);

  border-radius: 4px;

  font-size: 0.8rem;
  font-weight: 500;
`;

/* =========================
   STATS
========================= */

const Stats = styled.div`
  display: flex;

  justify-content: space-between;

  gap: 30px;

  max-width: 450px;
`;

const Stat = styled.div`
  display: flex;

  flex-direction: column;

  align-items: center;

  text-align: center;
`;

const StatNumber = styled.span`
  color: #000000;

  font-size: 1.8rem;

  font-weight: 600;

  @media (max-width: 600px) {
    font-size: 1.5rem;
  }
`;

const StatLabel = styled.span`
  margin-top: 4px;

  color: #666666;

  font-size: 0.65rem;

  text-transform: uppercase;

  white-space: nowrap;
`;

/* =========================
   IMAGE
========================= */

const ImageSide = styled.div`
  animation: ${fadeInUp} 0.8s ease-out 0.3s both;
`;

const ImageContainer = styled.div`
  position: relative;

  width: 100%;

  border-radius: 4px;

  box-shadow:
    0 40px 80px
    rgba(58, 50, 50, 0.15);

  animation:
    ${floatAnimation}
    6s ease-in-out infinite;

  &::before {
    content: "";

    position: absolute;
    inset: 0;

    background: linear-gradient(
      45deg,
      rgba(212, 175, 55, 0.1),
      rgba(216, 196, 182, 0.1)
    );

    border-radius: 4px;

    z-index: 1;

    pointer-events: none;
  }

  &::after {
    content: "";

    position: absolute;

    inset: -2px;

    background: linear-gradient(
      45deg,
      #d4af37,
      #b87333
    );

    border-radius: 8px;

    opacity: 0.3;

    filter: blur(15px);

    z-index: -1;

    pointer-events: none;
  }
`;

const HeroImage = styled.img`
  display: block;

  width: 100%;
  height: 550px;

  object-fit: cover;

  border-radius: 6px;

  position: relative;

  z-index: 2;

  @media (max-width: 600px) {
    height: 400px;
  }

  @media (max-width: 420px) {
    height: 350px;
  }
`;

/* =========================
   SHOP BUTTON
   BOTTOM RIGHT OF IMAGE
========================= */

const ShopButton = styled(Link)`
  position: absolute;

  right: 25px;
  bottom: 20px;

  z-index: 5;

  display: inline-flex;
  align-items: center;

  gap: 6px;

  padding: 8px 0;

  color: #ffffff;

  background: transparent;

  font-family: "Inter", sans-serif;

  font-size: 1rem;
  font-weight: 600;

  text-decoration: none;

  white-space: nowrap;

  cursor: pointer;

  transition: color 0.3s ease;

  &:hover {
    color: #cccccc;
  }

  @media (max-width: 600px) {
    right: 18px;
    bottom: 15px;

    font-size: 0.9rem;
  }
`;

const Arrow = styled.span`
  display: inline-flex;
  align-items: center;

  font-size: 20px;
  line-height: 1;

  transform: ${({ $rtl }) =>
    $rtl ? "rotate(180deg)" : "none"};
`;