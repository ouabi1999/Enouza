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
    product?.multimediaInfo?.image_urls?.[0],
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
  return (
    <HeroBox $rtl={$rtl} aria-busy="true">
      <HeroContainer aria-hidden="true">
        <SkeletonContent>
          <span className="skeleton-heading" />
          <span className="skeleton-line" />
          <span className="skeleton-line skeleton-line-short" />
        </SkeletonContent>

        <SkeletonImageSide>
          <SkeletonImage />
        </SkeletonImageSide>
      </HeroContainer>
    </HeroBox>
  );
};


const SkeletonContent = styled.div`
  display: grid;
  justify-items: center;
  gap: 10px;
  width: min(100%, 520px);
  margin-inline: auto;
  padding-block: clamp(8px, 2vw, 24px);

  span {
    border-radius: 4px;
    background: #e8e8e8;
  }

  .skeleton-heading {
    width: 66%;
    height: clamp(24px, 4vw, 44px);
    margin-block-end: 8px;
  }

  .skeleton-line {
    width: 80%;
    height: 10px;
  }

  .skeleton-line-short {
    width: 56%;
  }
`;

const SkeletonImageSide = styled.div`
  width: 100%;

  @media (max-width: 900px) {
    max-width: 720px;
    margin: 0 auto;
  }
`;

const SkeletonImage = styled.div`
  width: 100%;
  background: #e2e2e2;

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
  bottom: 20px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  box-sizing: border-box;
  min-height: 44px;
  max-width: 86%;
  padding: 10px 18px;
  border: 1px solid #f5efe5;
  border-radius: 4px;
  background: #f5efe5;
  color: #24231f;
  font-size: 0.8125rem;
  font-weight: 600;
  line-height: 1.3;
  text-align: center;
  text-decoration: none;
  z-index: 5;
  transition: background-color 160ms ease, color 160ms ease;

  &:hover {
    background: #24231f;
    color: #f5efe5;
  }

  &:focus-visible {
    outline: 2px solid #fff;
    outline-offset: 4px;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }

  @media (max-width: 700px) {
    right: 50%;
    transform: translateX(50%);
    bottom: 30px;
  }

  @media (max-width: 420px) {
    bottom: 24px;
  }
`;
//////////////////





