import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import StarIcon from "@mui/icons-material/Star";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { Navigation, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";

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

 

  const optimizeCloudinaryImage = (url, width = 700) => {
    if (!url?.includes("res.cloudinary.com")) return url;
    if (!url.includes("/image/upload/")) return url;

    return url.replace(
      "/image/upload/",
      `/image/upload/f_auto,q_auto,w_${width}/`
    );
  };
  return (
    <Section dir={isArabic ? "rtl" : "ltr"}>
      <Container>

        {/* ============================
            HEADER
        ============================ */}

        <Header>
          <Title>
            {t(`homePage.${name}`, "bestsellers")}
          </Title>
        </Header>

        {/* ============================
            PRODUCTS
        ============================ */}

        <SwiperWrapper>
          <Swiper
            className="mySwiper"
            loop={false}

            autoplay={
              isAuto
                ? {
                  delay: 2500,
                  disableOnInteraction: false,
                }
                : false
            }

            modules={[Navigation, Autoplay]}

            /*
             * Store the Swiper instance.
             */
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}

            slidesPerView={1.35}
            spaceBetween={16}

            breakpoints={{
              600: {
                slidesPerView: 2,
                spaceBetween: 18,
              },

              768: {
                slidesPerView: 3,
                spaceBetween: 20,
              },

              1024: {
                slidesPerView: 4,
                spaceBetween: 22,
              },

              1440: {
                slidesPerView: 4,
                spaceBetween: 24,
              },
            }}
          >
            {products.length > 0 ? (
              products.map((item) => {
                const mainSku = item.skuInfo?.[0];

                const image =
                  item.multimediaInfo?.main_image;

                const productName =
                  item.name?.[i18n.language] ||
                  item.name?.en ||
                  "ENOUZA Lamp";

                const ratings = item.ratings || [];

                const avgRating =
                  ratings.length > 0
                    ? (
                      ratings.reduce(
                        (total, rating) =>
                          total +
                          Number(rating.stars || 0),
                        0
                      ) / ratings.length
                    ).toFixed(1)
                    : null;

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

                      {/* ============================
                          IMAGE
                      ============================ */}

                      <ProductLink
                        to={`/product/${item.id}`}
                        reloadDocument
                      >
                        <ImageWrapper>

                          <ProductImage
                            src={optimizeCloudinaryImage(image, 700)}
                            alt={productName}
                            loading="lazy"
                            decoding="async"
                            width="700"
                            height="854"
                          />

                          <ProductLabels
                            $isArabic={isArabic}
                          >
                            {hasDiscount && (
                              <SaveLabel>
                                {t("productInfo.save")}{" "}
                                <bdi>
                                  {discountPercentage}%
                                </bdi>
                              </SaveLabel>
                            )}

                            {label && (
                              <Label>
                                {t(
                                  `homePage.${label}`
                                )}
                              </Label>
                            )}
                          </ProductLabels>

                        </ImageWrapper>
                      </ProductLink>

                      {/* ============================
                          INFO
                      ============================ */}

                      <ProductInfo>

                        <ProductName>
                          {productName}
                        </ProductName>

                        <BottomRow>

                          <PriceGroup>

                            <CurrentPrice>
                              $
                              {sellingPrice.toFixed(
                                2
                              )}
                            </CurrentPrice>

                            {hasDiscount && (
                              <ComparePrice>
                                $
                                {comparePrice.toFixed(
                                  2
                                )}
                              </ComparePrice>
                            )}

                          </PriceGroup>

                          {avgRating && (
                            <Rating>

                              <StarIcon />

                              <span>
                                {avgRating}
                              </span>

                              <ReviewCount>
                                {ratings.length}
                              </ReviewCount>

                            </Rating>
                          )}

                        </BottomRow>

                        {hasFreeShipping && (
                          <Shipping>
                            {t(
                              "common.free_shipping"
                            )}
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

      {/* ============================
          CUSTOM NAVIGATION
      ============================ */}

      <NavigationArea>

        <button
          ref={prevRef}
          type="button"
          className="best-sellers-prev"
          aria-label="Previous products"
        >
          <Arrow $direction="prev" />
        </button>

        <button
          ref={nextRef}
          type="button"
          className="best-sellers-next"
          aria-label="Next products"
        >
          <Arrow $direction="next" />
        </button>

      </NavigationArea>

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
  padding: 90px 0;
  overflow: hidden;
`;


/* =========================================================
   CONTAINER
========================================================= */

const Container = styled.div`
  width: min(1440px, calc(100% - 64px));
  margin: 0 auto;
`;


/* =========================================================
   HEADER
========================================================= */

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  margin-bottom: 38px;
`;

const Title = styled.h2`
  margin: 0;

  color: #25221f;

  font-family: Georgia, "Times New Roman", serif;
  font-size: clamp(2rem, 2vw, 3.2rem);
  font-weight: 400;
  line-height: 1;

  letter-spacing: -0.04em;
`;


/* =========================================================
   NAVIGATION
========================================================= */

const NavigationArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;

  gap: 8px;

  margin-top: 25px;
  margin-right: 25px;

  direction: ltr;

  button {
    position: relative;

    width: 42px;
    height: 42px;

    padding: 0;

    border: 1px solid #d7d1c8;
    border-radius: 50%;

    background: transparent;

    display: flex;
    align-items: center;
    justify-content: center;

    cursor: pointer;

    color: #25221f;

    transition:
      background 0.25s ease,
      border-color 0.25s ease,
      color 0.25s ease;

    &:hover {
      background: #25221f;
      border-color: #25221f;
      color: #ffffff;
    }

    &.swiper-button-disabled {
      opacity: 0.3;
      cursor: default;
    }

    &.swiper-button-disabled:hover {
      background: transparent;
      border-color: #d7d1c8;
      color: #25221f;
    }
  }

  @media (max-width: 400px) {
    display: none;
  }
`;


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

  /*
   * Swiper's default navigation arrows
   * are not used because we use custom buttons.
   */

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
`;

const ProductLink = styled(Link)`
  display: block;

  color: inherit;
  text-decoration: none;
`;

const ImageWrapper = styled.div`
  position: relative;

  width: 100%;
  aspect-ratio: 0.82;

  overflow: hidden;

  background: #ebe7df;
`;

const ProductImage = styled.img`
  display: block;

  width: 100%;
  height: 100%;

  object-fit: cover;

  transition:
    transform 0.7s
    cubic-bezier(0.2, 0.65, 0.3, 1);

  ${ProductCard}:hover & {
    transform: scale(1.025);
  }
`;


/* =========================================================
   PRODUCT LABELS
========================================================= */

const ProductLabels = styled.div`
  display: flex;
  align-items: center;

  gap: 20px;

  position: absolute;

  top: 12px;

  ${({ $isArabic }) =>
    $isArabic
      ? `
        right: 12px;
      `
      : `
        left: 12px;
      `}
`;


const Label = styled.span`
  padding: 5px 8px;

  background: #000000;

  color: #ffffff;

  border-radius: 4px;

  font-family: Arial, sans-serif;

  font-size: 0.65rem;

  font-weight: 500;

  letter-spacing: 0.04em;

  text-transform: uppercase;
`;


const SaveLabel = styled.span`
  padding: 5px 8px;

  background: #af956e;

  border-radius: 4px;

  color: #ffffff;

  font-family: Arial, sans-serif;

  font-size: 0.65rem;

  font-weight: 500;

  letter-spacing: 0.04em;

  text-transform: uppercase;
`;


/* =========================================================
   PRODUCT INFO
========================================================= */

const ProductInfo = styled.div`
  padding-top: 17px;
`;

const ProductName = styled.h3`
  margin: 0;

  color: #292622;

  font-family: Arial, sans-serif;

  font-size: 0.84rem;

  font-weight: 500;

  line-height: 1.45;
`;

const BottomRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  gap: 12px;

  margin-top: 9px;
`;

const PriceGroup = styled.div`
  display: flex;
  align-items: baseline;

  gap: 8px;

  min-width: 0;
`;

const CurrentPrice = styled.span`
  color: #25221f;

  font-family: Arial, sans-serif;

  font-size: 0.86rem;

  font-weight: 600;

  white-space: nowrap;
`;

const ComparePrice = styled.span`
  color: #a49c93;

  font-family: Arial, sans-serif;

  font-size: 0.72rem;

  text-decoration: line-through;

  white-space: nowrap;
`;

const Rating = styled.div`
  display: flex;
  align-items: center;

  gap: 3px;

  flex-shrink: 0;

  color: #777067;

  font-family: Arial, sans-serif;

  font-size: 0.65rem;

  svg {
    width: 12px;
    height: 12px;

    color: #9b8568;
  }
`;

const ReviewCount = styled.span`
  color: #aaa29a;

  &::before {
    content: "(";
  }

  &::after {
    content: ")";
  }
`;

const Shipping = styled.div`
  margin-top: 8px;

  color: #8b8177;

  font-family: Arial, sans-serif;

  font-size: 0.61rem;

  letter-spacing: 0.02em;
`;


/* =========================================================
   SKELETON
========================================================= */

const SkeletonCard = styled.div`
  width: 100%;
`;

const SkeletonImage = styled.div`
  width: 100%;

  aspect-ratio: 0.82;

  background: #e9e5de;

  animation: pulse 1.5s ease-in-out infinite;

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
  padding-top: 17px;
`;

const SkeletonName = styled.div`
  width: 65%;
  height: 11px;

  background: #e2ddd5;
`;

const SkeletonBottom = styled.div`
  display: flex;
  justify-content: space-between;

  margin-top: 12px;
`;

const SkeletonPrice = styled.div`
  width: 65px;
  height: 10px;

  background: #e2ddd5;
`;

const SkeletonRating = styled.div`
  width: 40px;
  height: 10px;

  background: #e2ddd5;
`;