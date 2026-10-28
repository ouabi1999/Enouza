import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { Link } from "react-router-dom";
import ApiInstance from "../../../../common/baseUrl";
import { useTranslation } from "react-i18next";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { optimizeCloudinaryImage } from "../../../utilis/cloudinary";
import DecorationLine from "../../../../common/DecorationLine";
export default function HeroSection() {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const { t, i18n } = useTranslation();

  useEffect(() => {
    const getHeroProduct = async () => {
      try {
        const res = await ApiInstance.get("/products/hero");
        setProduct(res.data);
      } catch (error) {
        setProduct(null);
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    getHeroProduct();
  }, []);

  const imageUrl = optimizeCloudinaryImage(
    product?.multimediaInfo?.image_urls?.[2],
    { width: 620 }
  );

  const isRTL = i18n.dir() === "rtl";

  // Show skeleton while fetching the hero product
  if (loading) {
    return <HeroSkeleton $rtl={isRTL} />;
  }

  // Do not render an empty hero if the product is unavailable
  if (!imageUrl || !product) return null;

  return (
    <HeroBox $rtl={isRTL}>
      <HeroContainer>
        <Content dir={isRTL ? "rtl" : "ltr"}>
          <Title>{t("heroSection.title")}</Title>

          <Description>
            {t("heroSection.description")}
          </Description>

          <DecorationLine />
        </Content>

        <ImageSide>
          <ImageContainer>
            <HeroImage
              src={imageUrl}
              alt={t("heroSection.title")}
              fetchPriority="high"
              width="700"
              height="620"
            />

            <ShopButton
              to={`/product/${product.slug}`}
              $rtl={isRTL}
              dir={isRTL ? "rtl" : "ltr"}
            >
              <span>{t("countdownSection.shopNow")}</span>

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
   HERO SKELETON
========================= */
const HeroSkeleton = ({ $rtl }) => {
  const { t, i18n } = useTranslation();

  return (
    <HeroBox $rtl={$rtl} aria-busy="true">
      <HeroContainer>
        {/* TEXT SIDE */}

        <SkeletonContent dir={i18n.dir()}>
          <SkeletonTitle>
            <SkeletonBase />
            <SkeletonBase />
            <SkeletonBase $short />
          </SkeletonTitle>

          <SkeletonDescription>
            <SkeletonBase />
            <SkeletonBase />
            <SkeletonBase $short />
          </SkeletonDescription>

          <SkeletonDecoration />
        </SkeletonContent>

        {/* IMAGE SIDE */}

        <SkeletonImageSide>
          <SkeletonImageContainer>
            <SkeletonImage />

            {/* SHOP BUTTON PLACEHOLDER */}

            <SkeletonShopButton>
              <SkeletonButtonText />
              <SkeletonButtonArrow />
            </SkeletonShopButton>
          </SkeletonImageContainer>
        </SkeletonImageSide>
      </HeroContainer>
    </HeroBox>
  );
};


/* =========================
   SKELETON ANIMATION
========================= */

const skeletonShimmer = keyframes`
  0% {
    background-position: 200% 0;
  }

  100% {
    background-position: -200% 0;
  }
`;

const SkeletonBase = styled.div`
  background: linear-gradient(
    90deg,
    #e8e3db 25%,
    #f5f2ed 50%,
    #e8e3db 75%
  );

  background-size: 200% 100%;

  animation: ${skeletonShimmer} 1.6s ease-in-out infinite;

  border-radius: 3px;
`;




/* =========================
   SKELETON TEXT
========================= */

const SkeletonContent = styled.div`
  width: 100%;
  max-width: 570px;

  text-align: center;

  @media (max-width: 900px) {
    max-width: 680px;
    margin: 0 auto;
  }
`;

const SkeletonTitle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  gap: 12px;

  margin-bottom: 37px;

  div {
    width: 90%;
    height: 42px;
  }

  div:nth-child(2) {
    width: 78%;
  }

  div:nth-child(3) {
    width: 48%;
  }

  @media (max-width: 600px) {
    gap: 10px;
    margin-bottom: 20px;

    div {
      height: 30px;
    }
  }
`;

const SkeletonDescription = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  gap: 11px;

  margin-bottom: 37px;

  div {
    width: 100%;
    height: 12px;
  }

  div:nth-child(2) {
    width: 90%;
  }

  div:nth-child(3) {
    width: 65%;
  }

  @media (max-width: 600px) {
    gap: 10px;
    margin-bottom: 23px;

    div {
      height: 10px;
    }
  }
`;

const SkeletonDecoration = styled(SkeletonBase)`
  width: 90px;
  height: 2px;

  margin: 0 auto;
`;

/* =========================
   SKELETON IMAGE
========================= */

const SkeletonImageSide = styled.div`
  width: 100%;

  @media (max-width: 900px) {
    max-width: 720px;
    margin: 0 auto;
  }
`;

const SkeletonImageContainer = styled.div`
  position: relative;

  width: 100%;

  overflow: hidden;

  background: #ded9d0;

  box-shadow:
    0 26px 65px rgba(48, 43, 39, 0.13),
    0 8px 22px rgba(48, 43, 39, 0.06);

  @media (max-width: 600px) {
    box-shadow:
      0 20px 45px rgba(48, 43, 39, 0.12),
      0 6px 18px rgba(48, 43, 39, 0.05);
  }
`;

const SkeletonImage = styled(SkeletonBase)`
  width: 100%;

  height: clamp(470px, 46vw, 620px);

  aspect-ratio: 700 / 620;

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
   SKELETON SHOP BUTTON
========================= */

const SkeletonShopButton = styled.div`
  position: absolute;

  right: 7%;
  bottom: 20px;

  display: inline-flex;
  align-items: center;

  gap: 9px;

  padding: 10px 15px;

  border: 2px solid rgba(255, 255, 255, 0.6);

  background: rgba(0, 0, 0, 0.15);

  z-index: 5;

  @media (max-width: 700px) {
    right: 50%;
    transform: translateX(50%);

    bottom: 30px;
  }

  @media (max-width: 420px) {
    bottom: 24px;
  }
`;

const SkeletonButtonText = styled(SkeletonBase)`
  width: 75px;
  height: 9px;
`;

const SkeletonButtonArrow = styled(SkeletonBase)`
  width: 14px;
  height: 14px;

  border-radius: 50%;
`;


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
  min-height: 600px;

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

  text-align: center;

  max-width: 570px;

  @media (max-width: 900px) {
    max-width: 680px;
    margin: 0 auto;
    width: 100%;
  }
`;

const Title = styled.h1`
  margin: 0 0 37px;

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

  text-align: center;

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

  margin: 0 0 37px;

  color: #68635d;

  font-family:
    "Inter",
    Arial,
    sans-serif;

  font-size: clamp(1rem, 1.4vw, 1.17rem);

  font-weight: 400;

  line-height: 1.78;

  text-align: center;

  @media (max-width: 600px) {
    margin-bottom: 23px;

    font-size: 0.96rem;

    line-height: 1.72;
  }
`;

const QualityTitle = styled.p`
  display: flex;

  align-items: center;

  justify-content: center;

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
  aspect-ratio: 700 / 620;

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
  right: 7%;
  border: 2px solid #ffffff;
  padding:10px 15px;
  bottom: 20px;
  display: inline-flex;
  align-items: center;
  gap: 9px;
  color: #ffffff;
  text-decoration: none;
   background: #0000004f;

  font-wieght:500;
    font-size: 0.7rem;

  white-space: nowrap; /* ✅ fixed */
  letter-spacing: 0.12em;
  text-transform: uppercase;
  z-index: 5; /* ✅ prevents hiding behind image */
  transition: color 0.25s ease, border-color 0.25s ease, gap 0.25s ease; /* ✅ explicit + gap */

  &:hover {
    border-color: #000000;
      color: #ffffff;

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
//////////////////





