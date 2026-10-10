import React, { useRef } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { optimizeCloudinaryImage } from "../../utilis/cloudinary";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import CurrencyPrice from "../../../common/CurrencyPrice";

function NewArrival({
  products = [],
  name,
  label,
  isAuto = false,
}) {
  const { t, i18n } = useTranslation();

  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const swiperRef = useRef(null);

  const isArabic = i18n.dir() === "rtl";

  return (
    <Section dir="ltr">
      <Container>
        {/* HEADER + NAVIGATION */}
        <SectionHeaderRow>
          <Header>
            <Title>{t(`homePage.${name}`)}</Title>
          </Header>

          <NavigationArea>
            <button
              ref={prevRef}
              type="button"
              className="best-sellers-prev"
              aria-label="Previous products"
              onClick={() => swiperRef.current?.slidePrev()}
            >
              <Arrow $direction="prev" />
            </button>

            <button
              ref={nextRef}
              type="button"
              className="best-sellers-next"
              aria-label="Next products"
              onClick={() => swiperRef.current?.slideNext()}
            >
              <Arrow $direction="next" />
            </button>
          </NavigationArea>
        </SectionHeaderRow>

        {/* PRODUCTS */}
        <SwiperWrapper>
          <Swiper
            className="mySwiper"
            loop={products.length > 4}
            autoplay={
              isAuto
                ? {
                    delay: 3000,
                    disableOnInteraction: false,
                  }
                : false
            }
            modules={[Autoplay]}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            slidesPerView={1.25}
            spaceBetween={16}
            breakpoints={{
              480: {
                slidesPerView: 1.6,
                spaceBetween: 18,
              },
              600: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 22,
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 24,
              },
              1440: {
                slidesPerView: 4,
                spaceBetween: 28,
              },
            }}
          >
            {products.length > 0 ? (
              products.map((item) => {
                const mainSku = item.skuInfo?.[0];

                const image =
                  item.multimediaInfo?.main_image;

                const imageUrls =
                  item.multimediaInfo?.image_urls || [];

                const secondaryImage =
                  imageUrls.find(
                    (img) => img && img !== image
                  ) || image;

                const productName =
                  item.name?.[i18n.language] ||
                  item.name?.en ||
                  "ENOUZA Lamp";

                const sellingPrice = Number(
                  mainSku?.sellingPrice || 0
                );

                const comparePrice = Number(
                  mainSku?.comparePrice || 0
                );

                const hasDiscount =
                  comparePrice > sellingPrice &&
                  sellingPrice > 0;

                const discountPercentage = hasDiscount
                  ? Math.round(
                      ((comparePrice - sellingPrice) /
                        comparePrice) *
                        100
                    )
                  : null;

                const hasFreeShipping =
                  item.available_shipping?.some(
                    (shipping) =>
                      shipping.type === "Free"
                  );

                return (
                  <SwiperSlide key={item.id}>
                    <ProductCard>
                      <ProductLink
                        to={`/product/${item.slug}`}
                      >
                        <ImageWrapper>
                          {/* PRIMARY IMAGE */}
                          <ProductImage
                            src={optimizeCloudinaryImage(
                              image,
                              { width: 800 }
                            )}
                            alt={productName}
                            width="800"
                            height="976"
                            $secondary={false}
                            fetchPriority="high"
                          />

                          {/* SECONDARY IMAGE */}
                          {secondaryImage && (
                            <ProductImage
                              src={optimizeCloudinaryImage(
                                secondaryImage,
                                { width: 800 }
                              )}
                              alt={`${productName} alternate view`}
                              width="800"
                              height="976"
                              $secondary
                            />
                          )}

                          {/* PRODUCT LABELS */}
                          <ProductLabels
                            $isArabic={isArabic}
                          >
                            {hasDiscount && (
                              <SaveLabel>
                                -{discountPercentage}%
                              </SaveLabel>
                            )}

                            {label && (
                              <Label>
                                {t(`homePage.${label}`)}
                              </Label>
                            )}
                          </ProductLabels>
                        </ImageWrapper>
                      </ProductLink>

                      {/* PRODUCT INFORMATION */}
                      <ProductInfo>
                        <ProductName>
                          {productName}
                        </ProductName>

                        <PriceGroup>
                          <CurrentPrice>
                            <CurrencyPrice
                              price={sellingPrice}
                            />
                          </CurrentPrice>

                          {hasDiscount && (
                            <ComparePrice>
                              <CurrencyPrice
                                price={comparePrice}
                              />
                            </ComparePrice>
                          )}
                        </PriceGroup>

                        {hasFreeShipping && (
                          <Shipping>
                            {t("common.free_shipping")}
                          </Shipping>
                        )}
                      </ProductInfo>
                    </ProductCard>
                  </SwiperSlide>
                );
              })
            ) : (
              <>
                {[1, 2, 3, 4, 5].map((item) => (
                  <SwiperSlide key={item}>
                    <SkeletonCard>
                      <SkeletonImage />

                      <SkeletonInfo>
                        <SkeletonName />

                        <SkeletonBottom>
                          <SkeletonPrice />
                          <SkeletonRating />
                        </SkeletonBottom>
                      </SkeletonInfo>
                    </SkeletonCard>
                  </SwiperSlide>
                ))}
              </>
            )}
          </Swiper>
        </SwiperWrapper>
      </Container>
    </Section>
  );
}

export default NewArrival;

/* =========================================================
   SECTION
========================================================= */

const Section = styled.section`
  width: 100%;
  background: #f7f5f0;
  padding: 70px 0 105px;
  overflow: hidden;

  @media (max-width: 600px) {
    padding: 60px 0 70px;
  }
`;

/* =========================================================
   CONTAINER
========================================================= */

const Container = styled.div`
  width: min(1440px, calc(100% - 64px));
  margin: 0 auto;

  @media (max-width: 600px) {
    width: calc(100% - 32px);
  }
`;

/* =========================================================
   HEADER
   Title centered independently of the arrows
========================================================= */

const SectionHeaderRow = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 42px;
  margin-bottom: 28px;

  @media (max-width: 600px) {
    margin-bottom: 24px;
  }
`;

const Header = styled.div`
  width: min(700px, 100%);
  margin: 0 auto;
  text-align: center;
`;

const Title = styled.h2`
  width: 100%;
  margin: 0;
  color: #00000;
  font-family: Arial, sans-serif;
  font-size: clamp(30px, 2.5vw, 50px);
  font-weight: 400;
  letter-spacing: 3px;
  line-height: 1.2;
  text-align: center;
  overflow-wrap: anywhere;

  @media (max-width: 600px) {
    font-size: clamp(25px, 6vw, 35px);
    letter-spacing: 1.8px;
  }
`;

/* =========================================================
   NAVIGATION
========================================================= */

const NavigationArea = styled.div`
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
  margin: 0;
  direction: ltr;

  button {
    position: relative;
    flex-shrink: 0;
    width: 42px;
    height: 42px;
    padding: 0;
    border: 1px solid #d4cec5;
    border-radius: 50%;
    background: transparent;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: #25221f;
    transition:
      background 0.35s ease,
      border-color 0.35s ease,
      color 0.35s ease,
      transform 0.35s ease;

    &:hover {
      background: #25221f;
      border-color: #25221f;
      color: #fff;
      transform: translateY(-2px);
    }

    &:active {
      transform: translateY(0);
    }

    &:focus-visible {
      outline: 2px solid #9b815f;
      outline-offset: 3px;
    }
  }

  @media (max-width: 400px) {
    display: none;
  }
`;

/* =========================================================
   ARROW
========================================================= */

const Arrow = styled.span`
  width: 7px;
  height: 7px;
  border-top: 1px solid currentColor;
  border-right: 1px solid currentColor;

  transform: ${({ $direction }) =>
    $direction === "prev"
      ? "rotate(-135deg)"
      : "rotate(45deg)"};

  ${({ $direction }) =>
    $direction === "prev"
      ? "margin-left: 3px;"
      : "margin-right: 3px;"}
`;

/* =========================================================
   SWIPER
========================================================= */

const SwiperWrapper = styled.div`
  width: 100%;

  .swiper {
    width: 100%;
    overflow: visible;
  }

  .swiper-wrapper {
    display: flex;
  }

  .swiper-slide {
    height: auto;
    flex-shrink: 0;
  }

  .swiper-button-prev,
  .swiper-button-next {
    display: none;
  }
`;

/* =========================================================
   PRODUCT
========================================================= */

const ProductCard = styled.article`
  width: 100%;
  position: relative;
`;

const ProductLink = styled(Link)`
  display: block;
  color: inherit;
  text-decoration: none;
`;

/* =========================================================
   IMAGE
========================================================= */

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 0.82;
  overflow: hidden;
  background: #ebe7df;
  isolation: isolate;
  cursor: pointer;
`;

const ProductImage = styled.img`
  position: absolute;
  inset: 0;
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;

  transition:
    opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1),
    transform 1.1s cubic-bezier(0.16, 1, 0.3, 1);

  opacity: ${({ $secondary }) =>
    $secondary ? 0 : 1};

  transform: scale(1);

  ${ProductCard}:hover & {
    transform: scale(1.025);

    ${({ $secondary }) =>
      $secondary
        ? `
          opacity: 1;
        `
        : `
          opacity: 0;
        `}
  }

  @media (max-width: 768px) {
    transition: none;

    ${ProductCard}:hover & {
      transform: none;
      opacity: ${({ $secondary }) =>
        $secondary ? 0 : 1};
    }
  }
`;

/* =========================================================
   PRODUCT LABELS
========================================================= */

const ProductLabels = styled.div`
  position: absolute;
  top: 15px;

  ${({ $isArabic }) =>
    $isArabic
      ? `
        right: 15px;
      `
      : `
        left: 15px;
      `}

  display: flex;
  align-items: center;
  gap: 7px;
  z-index: 4;
  pointer-events: none;
`;

const Label = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 25px;
  padding: 0 10px;
  background: rgba(37, 34, 31, 0.94);
  color: #ffffff;
  font-family: Arial, sans-serif;
  font-size: 0.58rem;
  font-weight: 500;
  letter-spacing: 0.11em;
  line-height: 1;
  text-transform: uppercase;
  white-space: nowrap;
`;


const SaveLabel = styled.span`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 25px;
  padding: 0 10px;
  overflow: hidden;

  background: #a88556;
  
  color: #ffffff;

  font-family: Arial, sans-serif;
  font-size: 0.58rem;
  font-weight: 600;
  letter-spacing: 0.09em;
  line-height: 1;
  white-space: nowrap;

  box-shadow: 0 2px 7px rgba(100, 76, 43, 0.12);
  animation: saveLabelPulse 2.4s ease-in-out infinite;

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    left: -120%;
    width: 70%;
    background: linear-gradient(
      105deg,
      transparent 0%,
      rgba(255, 255, 255, 0.05) 25%,
      rgba(255, 255, 255, 0.48) 50%,
      rgba(255, 255, 255, 0.05) 75%,
      transparent 100%
    );
    transform: skewX(-20deg);
    animation: saveLabelShine 3.5s ease-in-out infinite;
    pointer-events: none;
  }

  @keyframes saveLabelPulse {
    0%, 100% {
      box-shadow: 0 2px 7px rgba(100, 76, 43, 0.12);
    }
    50% {
      box-shadow: 0 3px 12px rgba(173, 146, 112, 0.38);
    }
  }

  @keyframes saveLabelShine {
    0%, 25% {
      left: -120%;
    }
    65%, 100% {
      left: 160%;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;

    &::after {
      animation: none;
      display: none;
    }
  }
`;


/* =========================================================
   PRODUCT INFO
========================================================= */

const ProductInfo = styled.div`
  padding-top: 20px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProductName = styled.h3`
  margin: 0;
  max-width: 95%;
  color: #292622;
  font-family: Arial, sans-serif;
  font-size: 0.82rem;
  font-weight: 500;
  line-height: 1.5;
  letter-spacing: 0.005em;
  text-align: center;
`;

/* =========================================================
   PRICE
========================================================= */

const PriceGroup = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 9px;
  margin-top: 9px;
`;

const CurrentPrice = styled.span`
  color: #25221f;
  font-family: Arial, sans-serif;
  font-size: 0.82rem;
  font-weight: 600;
  letter-spacing: 0.01em;
  white-space: nowrap;
`;

const ComparePrice = styled.span`
  color: #aaa39b;
  font-family: Arial, sans-serif;
  font-size: 0.68rem;
  font-weight: 400;
  text-decoration: line-through;
  white-space: nowrap;
`;

/* =========================================================
   SHIPPING
========================================================= */

const Shipping = styled.div`
  margin-top: 7px;
  color: #918980;
  font-family: Arial, sans-serif;
  font-size: 0.59rem;
  font-weight: 400;
  letter-spacing: 0.045em;
  text-transform: uppercase;
`;

/* =========================================================
   SKELETON LOADING
========================================================= */

const SkeletonCard = styled.div`
  width: 100%;
`;

const SkeletonImage = styled.div`
  width: 100%;
  aspect-ratio: 0.82;
  background: #e9e5de;
  animation: pulse 1.7s ease-in-out infinite;

  @keyframes pulse {
    0% {
      opacity: 0.55;
    }

    50% {
      opacity: 1;
    }

    100% {
      opacity: 0.55;
    }
  }
`;

const SkeletonInfo = styled.div`
  padding-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SkeletonName = styled.div`
  width: 62%;
  height: 10px;
  background: #e2ddd5;
`;

const SkeletonBottom = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 14px;
  margin-top: 13px;
`;

const SkeletonPrice = styled.div`
  width: 65px;
  height: 9px;
  background: #e2ddd5;
`;

const SkeletonRating = styled.div`
  width: 38px;
  height: 9px;
  background: #e2ddd5;
`;