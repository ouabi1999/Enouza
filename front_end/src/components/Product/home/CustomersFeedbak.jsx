import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import Slider from "react-slick";

import ApiInstance from "../../../../common/baseUrl";

const CustomersFeedback = () => {
  const [reviews, setReviews] = useState([]);
  const { t } = useTranslation();

  useEffect(() => {
    ApiInstance.get("ratings/")
      .then((res) => {
        setReviews(res.data);
      })
      .catch((err) => {
        console.log("Ratings error:", err);
      });
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: false,

    responsive: [
      {
        breakpoint: 1100,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 550,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <Section>
      <Container>

        {/* HEADER */}
        <Header>
          <Eyebrow>
            {t("customersFeedback.eyebrow")}
          </Eyebrow>

          <Title>
            {t("customersFeedback.title")}
          </Title>

          <Description>
            {t("customersFeedback.description")}
          </Description>

          <Rating>
            <RatingNumber>4.9</RatingNumber>

            <RatingContent>
              <Stars aria-label="5 out of 5 stars">
                ★★★★★
              </Stars>

              <RatingText>
                {t("customersFeedback.ratingText")}
              </RatingText>
            </RatingContent>
          </Rating>
        </Header>

        {/* REVIEWS */}
        {reviews.length > 0 && (
          <Reviews>
            <Slider {...settings}>
              {reviews.map((item) => (
                <ReviewSlide key={item.id}>
                  <ReviewCard>

                    {/* IMAGE */}
                    {item.review?.images?.length > 0 && (
                      <ImageWrapper>
                        <ReviewImage
                          src={item.review.images[0]}
                          alt="Customer review"
                          loading="lazy"
                        />
                      </ImageWrapper>
                    )}

                    {/* CONTENT */}
                    <ReviewContent>

                      <Stars
                        aria-label={`${item.stars} out of 5 stars`}
                      >
                        {"★".repeat(item.stars || 0)}
                      </Stars>

                      <ReviewText>
                        “{item.review?.text || ""}”
                      </ReviewText>

                      <Customer>
                        <CustomerName>
                          {item.user?.firstName ||
                            item.user?.firstname ||
                            "Customer"}
                        </CustomerName>

                        <Verified>
                          <Check>✓</Check>

                          {t(
                            "customersFeedback.verifiedPurchase"
                          )}
                        </Verified>
                      </Customer>

                    </ReviewContent>
                  </ReviewCard>
                </ReviewSlide>
              ))}
            </Slider>
          </Reviews>
        )}

      </Container>
    </Section>
  );
};

export default CustomersFeedback;


/* =====================================================
   SECTION
===================================================== */

const Section = styled.section`
  padding: 110px 20px 120px;
  background: #faf9f7;
`;


/* =====================================================
   CONTAINER
===================================================== */

const Container = styled.div`
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
`;


/* =====================================================
   HEADER
===================================================== */

const Header = styled.div`
  max-width: 700px;
  margin: 0 auto 65px;
  text-align: center;
`;

const Eyebrow = styled.span`
  display: block;
  margin-bottom: 18px;

  font-size: 11px;
  font-weight: 600;
  letter-spacing: 2.5px;
  text-transform: uppercase;

  color: #777;
`;

const Title = styled.h2`
  margin: 0;

  font-family: Georgia, serif;
  font-size: clamp(36px, 5vw, 58px);
  font-weight: 400;
  line-height: 1.1;

  color: #1d1d1b;
`;

const Description = styled.p`
  max-width: 560px;
  margin: 24px auto 32px;

  font-size: 16px;
  line-height: 1.7;

  color: #666;
`;


/* =====================================================
   RATING
===================================================== */

const Rating = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 14px;
`;

const RatingNumber = styled.strong`
  font-family: Georgia, serif;
  font-size: 32px;
  font-weight: 400;

  color: #1d1d1b;
`;

const RatingContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
`;

const Stars = styled.span`
  display: block;
  color: #ffc852;
  font-size: 15px;
  line-height: 1;
  letter-spacing: 3px;

  
`;

const RatingText = styled.span`
  font-size: 12px;
  color: #777;
`;


/* =====================================================
   REVIEWS SLIDER
===================================================== */

const Reviews = styled.div`
  width: 100%;

  .slick-list {
    margin: 0 -10px;
    padding: 10px 0 25px;
  }

  .slick-slide {
    padding: 0 10px;
    box-sizing: border-box;
  }

  .slick-track {
    display: flex;
  }

  .slick-slide > div {
    height: 100%;
  }

  .slick-dots {
    bottom: -15px;
  }

  .slick-dots li {
    margin: 0 2px;
  }

  .slick-dots li button:before {
    font-size: 7px;
    color: #1d1d1b;
    opacity: 0.25;
  }

  .slick-dots li.slick-active button:before {
    opacity: 0.8;
  }

  @media (max-width: 550px) {
    .slick-list {
      margin: 0;
    }

    .slick-slide {
      padding: 0 5px;
    }
  }
`;


/* =====================================================
   SLIDE
===================================================== */

const ReviewSlide = styled.div`
  height: 100%;
`;


/* =====================================================
   REVIEW CARD
===================================================== */

const ReviewCard = styled.article`
  height: 100%;
  overflow: hidden;

  display: flex;
  flex-direction: column;

  background: #fff;

  border: 1px solid #e8e6e2;

  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 18px 45px rgba(0, 0, 0, 0.08);
  }
`;


/* =====================================================
   IMAGE
===================================================== */

const ImageWrapper = styled.div`
  width: 100%;
  aspect-ratio: 16 / 10;

  overflow: hidden;

  background: #f2f1ee;
`;

const ReviewImage = styled.img`
  width: 100%;
  height: 100%;

  display: block;

  object-fit: cover;

  transition: transform 0.6s ease;

  ${ReviewCard}:hover & {
    transform: scale(1.03);
  }
`;


/* =====================================================
   CONTENT
===================================================== */

const ReviewContent = styled.div`
  min-height: 225px;

  padding: 28px 30px 30px;

  display: flex;
  flex-direction: column;

  box-sizing: border-box;
`;

const ReviewText = styled.p`
  margin: 22px 0 30px;

  font-family: Georgia, serif;
  font-size: 17px;
  line-height: 1.7;

  color: #292929;
`;


/* =====================================================
   CUSTOMER
===================================================== */

const Customer = styled.div`
  margin-top: auto;
`;

const CustomerName = styled.span`
  display: block;

  margin-bottom: 6px;

  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.2px;

  color: #1d1d1b;
`;

const Verified = styled.span`
  display: flex;
  align-items: center;
  gap: 6px;

  font-size: 11px;
  letter-spacing: 0.2px;

  color: #777;
`;

const Check = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  width: 15px;
  height: 15px;

  border-radius: 50%;

  font-size: 9px;

  background: #1d1d1b;
  color: #fff;
`;