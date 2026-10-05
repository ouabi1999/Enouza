import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { useNavigate } from "react-router-dom";
import ApiInstance from "../../../../common/baseUrl";
import ReviewImagePopup from "../aboutProduct/reviews/ReviewImagePopup";


const CustomersFeedback = () => {
  const [reviews, setReviews] = useState([]);
  const { t } = useTranslation();
  const [expanded, setExpanded] = useState(false);
  const [selected, setSelected] = useState({
    id: null,
    index: null,
  });
  const [review, setReview] = useState({})
const navigate = useNavigate();
  // 1. Helper function to determine slides based on width
  const getSlidesToShow = () => {
    if (window.innerWidth < 550) return 1;
    if (window.innerWidth < 800) return 2;
    if (window.innerWidth < 1100) return 3;
    return 4;
  };

  // 2. State to hold the current number
  const [slidesToShow, setSlidesToShow] = useState(getSlidesToShow());

  // 3. Update state on resize
  useEffect(() => {
    const handleResize = () => {
      setSlidesToShow(getSlidesToShow());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 4. Fetch data (unchanged)
  useEffect(() => {
    ApiInstance.get("ratings/")
      .then((res) => setReviews(res.data))
      .catch((err) => console.error("Ratings error:", err));
  }, []);

  // 5. Settings - REMOVE the 'responsive' array entirely
  const settings = {
    dots: true,
    infinite: reviews.length > slidesToShow, // Use dynamic variable
    autoplay: true,
    autoplaySpeed: 2500,
    speed: 600,
    slidesToShow: slidesToShow, // 👈 Dynamic
    slidesToScroll: 1, // Keep this 1 so it doesn't skip slides
    arrows: false,
    pauseOnHover: true,
    // responsive: []  // ❌ DELETE THIS LINE
  };
  const setRate = (item, index) => {
    setExpanded(true)
    setReview(item)
    setSelected({ id: item.id, index: index },)
    console.log(review, expanded)
  }

  const optimizeCloudinaryImage = (url, width = 700) => {
    if (!url?.includes("res.cloudinary.com")) return url;
    if (!url.includes("/image/upload/")) return url;

    return url.replace(
      "/image/upload/",
      `/image/upload/f_auto,q_auto,w_${width}/`
    );
  };
  return (
    <Section>
      <Container>

        {/* HEADER */}

        <Header>
          <Eyebrow>
            <bdi>
              {t("customersFeedback.eyebrow")}
            </bdi>
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
              {reviews.map((item, index) => {


                return (
                  <ReviewSlide key={item.id}>
                    <ReviewCard>

                      {/* IMAGE */}

                      {item.review?.images?.length > 0 ? (
                        <ImageWrapper>
                          <ReviewImage
                            src={optimizeCloudinaryImage(item.review.images[0], 700)}
                            alt="Customer review"
                            loading="lazy"
                            decoding="async"
                            width="700"
                            height="500"
                            onClick={() => setRate(item, 0)}
                          />
                        </ImageWrapper>
                      ) : <ImageWrapper>

                        <ReviewImage
                          src={optimizeCloudinaryImage(
                            "https://res.cloudinary.com/dzpzy1o1y/image/upload/v1786734712/ChatGPT_Image_Aug_14_2026_09_11_32_PM_lok4wr.png",
                            700
                          )}
                          alt="Customer review"
                          loading="lazy"
                          decoding="async"
                          width="700"
                          height="500"
                          onClick={() => setRate(item, 0)}
                        />
                      </ImageWrapper>}

                      {/* CONTENT */}

                      <ReviewContent>

                        <Stars
                          aria-label={`${item.stars} out of 5 stars`}
                        >
                          {"★".repeat(item.stars || 0)}
                        </Stars>

                        <ReviewText>
                          {item.review?.text || ""}

                        </ReviewText>


                        <Customer>
                          <CustomerName>
                            {item.user?.firstName
                              ? `${item.user.firstName} ${item.user?.lastName?.slice(0, 1) + "." || ""}`
                              : "Customer"}
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

                );


              })}
            </Slider>
            {expanded === true && (
              <ReviewImagePopup rate={review} selected={selected} setSelected={setSelected} />
            )}

          </Reviews>
        )}

      </Container>
      <ViewAllButton onClick={() => navigate("/reviews")}>
  {t("customersFeedback.viewAllReviews")}
  <Arrow>→</Arrow>
</ViewAllButton>

    </Section>
  );
};

export default CustomersFeedback;


const Section = styled.section`
  width: 100%;

  padding: 110px 20px 120px;

  background: #faf9f7;

  box-sizing: border-box;

  @media (max-width: 550px) {
    padding: 80px 18px 90px;
  }
`;


// =====================================================
// CONTAINER
// =====================================================

const Container = styled.div`
  width: 100%;

  max-width: 1280px;

  margin: 0 auto;

  box-sizing: border-box;
`;


// =====================================================
// HEADER
// =====================================================

const Header = styled.div`
  max-width: 700px;

  margin: 0 auto 65px;

  text-align: center;

  @media (max-width: 550px) {
    margin-bottom: 50px;
  }
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

  letter-spacing: -0.5px;

  color: #1d1d1b;
`;


const Description = styled.p`
  max-width: 560px;

  margin: 24px auto 32px;

  font-size: 16px;

  line-height: 1.7;

  color: #666;

  @media (max-width: 550px) {
    margin-top: 20px;

    font-size: 14px;
  }
`;


// =====================================================
// RATING
// =====================================================

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

  line-height: 1;

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

  color: #c9a35c;

  font-size: 15px;

  line-height: 1;

  letter-spacing: 3px;
`;


const RatingText = styled.span`
  font-size: 12px;

  color: #777;
`;


// =====================================================
// REVIEWS SLIDER
// =====================================================

const Reviews = styled.div`
  width: 100%;

  margin: 0 auto;

  box-sizing: border-box;

  .slick-slider {
    width: 100%;
  }

  .slick-list {
    width: 100%;

    margin: 0 -10px;

    padding: 10px 0 35px;

    overflow: hidden;
  }

  .slick-track {
    display: flex;

    align-items: stretch;
  }

  .slick-slide {
    height: auto;

    padding: 0 10px;

    box-sizing: border-box;
  }

  .slick-slide > div {
    height: 100%;
  }

  .slick-dots {
    bottom: -15px;

    height: 10px;
  }

  .slick-dots li {
    width: 18px;

    margin: 0 2px;
  }

  .slick-dots li button {
    width: 18px;

    padding: 0;
  }

  .slick-dots li button:before {
    width: 18px;

    font-size: 7px;

    color: #1d1d1b;

    opacity: 0.22;

    transition:
      opacity 0.25s ease,
      color 0.25s ease;
  }

  .slick-dots li.slick-active button:before {
    color: #c9a35c;

    opacity: 1;
  }

  @media (max-width: 1100px) {
    .slick-list {
      margin: 0 -8px;
    }

    .slick-slide {
      padding: 0 8px;
    }
  }

  @media (max-width: 800px) {
    .slick-list {
      margin: 0 -7px;
    }

    .slick-slide {
      padding: 0 7px;
    }
  }

  @media (max-width: 550px) {
    .slick-list {
      margin: 0;

      padding: 5px 0 35px;
    }

    .slick-slide {
      padding: 0 5px;
    }
  }
`;


// =====================================================
// SLIDE
// =====================================================

const ReviewSlide = styled.div`
  width: 100%;

  height: 100%;

  box-sizing: border-box;
`;


// =====================================================
// REVIEW CARD
// =====================================================

const ReviewCard = styled.article`
  position: relative;

  width: 100%;

  height: 510px;

  overflow: hidden;

  display: flex;

  flex-direction: column;

  background: #fff;

  border: 1px solid #e8e6e2;

  box-sizing: border-box;

  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease,
    border-color 0.3s ease;

  &:hover {
    transform: translateY(-4px);

    border-color: #dedbd5;

    box-shadow:
      0 18px 45px rgba(0, 0, 0, 0.08);
  }

  @media (max-width: 550px) {
    height: 500px;
  }
`;


// =====================================================
// IMAGE
// =====================================================

const ImageWrapper = styled.div`
  position: relative;

  width: 100%;

  height: 300px;

  flex-shrink: 0;

  overflow: hidden;

  background: #f2f1ee;

  cursor: pointer;
`;


const ReviewImage = styled.img`
  display: block;

  width: 100%;

  height: 100%;

  object-fit: cover;

  cursor: pointer;

  transition:
    transform 0.6s ease;

  ${ReviewCard}:hover & {
    transform: scale(1.03);
  }
`;


// =====================================================
// CONTENT
// =====================================================

const ReviewContent = styled.div`
  flex: 1;

  min-height: 0;

  padding: 28px 30px 30px;

  display: flex;

  flex-direction: column;

  box-sizing: border-box;

  justify-content: flex-start;

  background: #fff;

  @media (max-width: 550px) {
    padding: 24px 24px 25px;
  }
`;


// =====================================================
// REVIEW TEXT
// =====================================================

const ReviewText = styled.p`
  margin: 18px 0 24px;

  font-family: Georgia, serif;

  font-size: clamp(15px, 1.2vw, 17px);

  line-height: 1.7;

  color: #292929;

  display: -webkit-box;

  -webkit-box-orient: vertical;

  -webkit-line-clamp: 3;

  overflow: hidden;

  text-overflow: ellipsis;
`;


// =====================================================
// CUSTOMER
// =====================================================

const Customer = styled.div`
  margin-top: auto;

  padding-top: 4px;
`;


const CustomerName = styled.span`
  display: block;

  text-transform: capitalize;

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

  flex-shrink: 0;

  border-radius: 50%;

  font-size: 9px;

  background: #1d1d1b;

  color: #fff;
`;


// =====================================================
// VIEW ALL BUTTON
// =====================================================

const ViewAllButton = styled.button`
  display: flex;

  align-items: center;

  justify-content: center;

  gap: 12px;

  margin: 55px auto 0;

  padding: 14px 28px;

  border: 1px solid #1d1d1b;

  background: transparent;

  color: #1d1d1b;

  font-size: 12px;

  font-weight: 500;

  letter-spacing: 1px;

  text-transform: uppercase;

  cursor: pointer;

  transition:
    background 0.3s ease,
    color 0.3s ease,
    transform 0.3s ease;

  &:hover {
    background: #1d1d1b;

    color: #fff;

    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 550px) {
    margin-top: 45px;

    padding: 13px 24px;

    font-size: 11px;
  }
`;


const Arrow = styled.span`
  display: inline-block;

  font-size: 16px;

  line-height: 1;

  transition:
    transform 0.3s ease;

  ${ViewAllButton}:hover & {
    transform: translateX(4px);
  }
`;