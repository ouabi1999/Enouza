import React, { useRef } from "react";

import styled from "styled-components";

import { Link } from "react-router-dom";

import { useTranslation } from "react-i18next";

import { optimizeCloudinaryImage } from "../../../utilis/cloudinary";

import { Autoplay } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";



import "swiper/css";



function HomeInsperationSlider() {

  const { t } = useTranslation();



  const prevRef = useRef(null);

  const nextRef = useRef(null);

  const swiperRef = useRef(null);

  const isAuto = false;



  const images = [

    "https://res.cloudinary.com/dzpzy1o1y/image/upload/v1791651541/enouza/products/imgi_71_749432644_18122195843504741_8870022788877468262_n_yl4kfw.jpg",

    "https://res.cloudinary.com/dzpzy1o1y/image/upload/v1791651540/enouza/products/imgi_544_VIOLA_MARBLE_PRODUCT_PAGE_1_f3b00d2e-295e-4c78-aa94-b6b977a3974f_ecpmtq.jpg",

    "https://res.cloudinary.com/dzpzy1o1y/image/upload/v1791651539/enouza/products/imgi_509_VIOLA_MARBLE_PRODUCT_PAGE_4_d3b71aa0-0cc4-4fd0-afda-7c2ebc5fc876_z9ittr.jpg",

    "https://res.cloudinary.com/dzpzy1o1y/image/upload/v1791651538/enouza/products/imgi_477_VIOLA_MARBLE_PRODUCT_PAGE_4_ryz7o8.jpg",

    "https://res.cloudinary.com/dzpzy1o1y/image/upload/v1791651536/enouza/products/imgi_394_PORTABLE_LAMP_AURIE_BLOSSHOLM_34_11_nnuk88.jpg",

    "https://res.cloudinary.com/dzpzy1o1y/image/upload/v1791651534/enouza/products/imgi_66_789347683_18128114612504741_5460984068981384882_n_jwsfq6.jpg",

    "https://res.cloudinary.com/dzpzy1o1y/image/upload/v1791651532/enouza/products/imgi_543_VIOLA_MARBLE_PRODUCT_PAGE_1_f3b00d2e-295e-4c78-aa94-b6b977a3974f_egvsqc.jpg",

    "https://res.cloudinary.com/dzpzy1o1y/image/upload/v1791651531/enouza/products/imgi_505_VIOLA_MARBLE_PRODUCT_PAGE_4_d3b71aa0-0cc4-4fd0-afda-7c2ebc5fc876_x1c5jp.jpg",

    "https://res.cloudinary.com/dzpzy1o1y/image/upload/v1791651530/enouza/products/imgi_68_783753534_18127103324504741_1561167418310626593_n_zm8cas.jpg",

    "https://res.cloudinary.com/dzpzy1o1y/image/upload/v1791651523/enouza/products/imgi_758_SnapInsta.to_560998532_18539425210021416_1675032473802283587_n_mwaqu4.jpg",

    "https://res.cloudinary.com/dzpzy1o1y/image/upload/v1791651524/enouza/products/imgi_762_ugc_section_new_content_5_nc0v9w.jpg",

    "https://res.cloudinary.com/dzpzy1o1y/image/upload/v1791651410/enouza/products/imgi_31_32cd18dfefbb4435967166bb971aff4a.thumbnail.0000000000_rtyliu.jpg",

    "https://res.cloudinary.com/dzpzy1o1y/image/upload/v1791651409/enouza/products/imgi_15_Aurie_PDP_Sep_2_b1niom.jpg"

  ];



  return (

    <Section dir="ltr">

      <Container>



        {/* ============================

            HEADER

        ============================ */}





        {/* ============================

            NAVIGATION

        ============================ */}
        <SectionHeaderRow>
          <Header>
            <Title>{t("homePage.homeInsperation")}</Title>
          </Header>



        <NavigationArea>

          <button

            ref={prevRef}

            type="button"

            className="best-sellers-prev"

            aria-label="Previous images"

            onClick={() => {

              swiperRef.current?.slidePrev();

            }}

          >

            <Arrow $direction="prev" />

          </button>



          <button

            ref={nextRef}

            type="button"

            className="best-sellers-next"

            aria-label="Next images"

            onClick={() => {

              swiperRef.current?.slideNext();

            }}

          >

            <Arrow $direction="next" />

          </button>

        </NavigationArea>

        </SectionHeaderRow>



        {/* ============================

            images

        ============================ */}



        <SwiperWrapper>

          <Swiper

            className="mySwiper"

            loop={images.length > 4}

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

            {images.length > 0 ? (

              images?.map((img, index) => {



                return (

                  <SwiperSlide key={index}>

                    <ProductCard>



                      {/* ============================

                          IMAGE

                      ============================ */}



                      <ImageWrapper>



                        {/* PRIMARY IMAGE */}



                        <ProductImage

                          src={optimizeCloudinaryImage(

                            img,

                            { width: 1000, height:1000 }

                          )}

                          alt="Lighting inspiration"



                          $secondary={false}

                          fetchPriority="high"

                        />

                      </ImageWrapper>

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



export default HomeInsperationSlider;



/* =========================================================

   SECTION

\========================================================= */



const Section = styled.section`

  width: 100%;

  background: #f7f5f0;

  padding: 30px 0;

  overflow: hidden;

`;



/* =========================================================

   CONTAINER

\========================================================= */



const Container = styled.div`

  width: min(1440px, calc(100% - 64px));

  margin: 0 auto;



  @media (max-width: 600px) {

    width: calc(100% - 32px);

  }

`;





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

  margin: 0;

  width: 100%;

  color: #9b815f;

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
  z-index: 2;



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

  }



  @media (max-width: 400px) {

    display: none;

  }

`;



/* =========================================================

   ARROW

\========================================================= */



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

\========================================================= */



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

\========================================================= */



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

\========================================================= */



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



`;





/* =========================================================

   SKELETON

\========================================================= */



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








