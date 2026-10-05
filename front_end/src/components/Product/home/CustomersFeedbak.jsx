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


/* =====================================================
   SECTION
===================================================== */

const ReviewCard = styled.article`
  min-width: 0;

  height: 510px;

  display: flex;
  flex-direction: column;

  background: #fff;

  border: 1px solid #eceae5;

  overflow: hidden;

  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-3px);

    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.06);
  }

  @media (max-width: 600px) {
    height: 500px;
  }
`;

/* =============================================================
   REVIEW IMAGE
============================================================= */

const ReviewImageWrapper = styled.div`
  position: relative;

  height: 300px;
  min-height: 300px;

  overflow: hidden;

  background: #f1efe9;

  cursor: pointer;

  &:focus-visible {
    outline: 2px solid #1d1d1b;
    outline-offset: -2px;
  }
`;

const ReviewImage = styled.img`
  display: block;

  width: 100%;
  height: 100%;

  object-fit: cover;

  transition: transform 0.6s ease;

  ${ReviewImageWrapper}:hover & {
    transform: scale(1.025);
  }
`;

const ImageCount = styled.span`
  position: absolute;

  right: 14px;
  bottom: 14px;

  display: flex;
  align-items: center;
  justify-content: center;

  min-width: 34px;
  height: 28px;

  padding: 0 8px;

  background: rgba(255, 255, 255, 0.94);

  color: #1d1d1b;

  font-size: 11px;
  font-weight: 600;

  backdrop-filter: blur(8px);
`;

const NoImage = styled.div`
  height: 300px;
  min-height: 300px;

  display: flex;
  align-items: center;
  justify-content: center;

  background:
    linear-gradient(
      135deg,
      #f2f0eb,
      #e9e6df
    );
    img{
    width:100%;
    }
`;

const NoImageIcon = styled.span`
  font-size: 28px;
  color: #aaa;
`;

/* =============================================================
   REVIEW CONTENT
============================================================= */

const ReviewContent = styled.div`
  flex: 1;

  display: flex;
  flex-direction: column;

  padding: 22px 24px 20px;

  min-height: 0;
`;

const TopRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  gap: 12px;

  margin-bottom: 15px;
`;

const Stars = styled.div`
  display: flex;

  flex-shrink: 0;
`;

const Star = styled.span`
  font-size: 14px;

  color: ${({ active }) =>
    active ? "#1d1d1b" : "#d8d5ce"};
`;

const Verified = styled.div`
  display: flex;
  align-items: center;

  gap: 6px;

  font-size: 9px;
  font-weight: 600;

  letter-spacing: 0.05em;
  text-transform: uppercase;

  color: #777;
`;

const VerifiedDot = styled.span`
  width: 6px;
  height: 6px;

  border-radius: 50%;

  background: #777;
`;

const ReviewText = styled.p`
  margin: 0;

  color: #444;

  font-size: 14px;
  line-height: 1.7;

  display: -webkit-box;
  -webkit-box-orient: vertical;

  overflow: hidden;

  ${({ $expanded }) =>
    !$expanded &&
    `
      -webkit-line-clamp: 5;
    `}
`;

const ReadMore = styled.button`
  align-self: flex-start;

  margin-top: 8px;

  padding: 0;

  border: 0;
  background: transparent;

  font-family: inherit;

  color: #1d1d1b;

  font-size: 11px;
  font-weight: 600;

  cursor: pointer;

  text-decoration: underline;
  text-underline-offset: 3px;
`;

const Customer = styled.div`
  display: flex;
  align-items: center;

  gap: 11px;

  margin-top: auto;
  padding-top: 18px;

  border-top: 1px solid #efede8;
`;

const Avatar = styled.div`
  width: 36px;
  height: 36px;

  flex-shrink: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 50%;

  background: #1d1d1b;

  color: #fff;

  font-size: 12px;
  font-weight: 600;
`;

const CustomerInfo = styled.div`
  min-width: 0;
`;

const CustomerName = styled.div`
  overflow: hidden;

  color: #1d1d1b;

  font-size: 12px;
  font-weight: 600;

  text-overflow: ellipsis;
  white-space: nowrap;
  text-transform: capitalize;
`;

const CustomerDate = styled.div`
  margin-top: 3px;

  color: #999;

  font-size: 10px;
`;

/* =============================================================
   EMPTY STATE
============================================================= */

const EmptyState = styled.div`
  min-height: 380px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  text-align: center;

  padding: 50px 20px;

  border: 1px solid #eceae5;

  background: #fff;
`;

const EmptyIcon = styled.div`
  margin-bottom: 20px;

  font-size: 28px;

  color: #aaa;
`;

const EmptyTitle = styled.h2`
  margin: 0;

  font-family: Georgia, "Times New Roman", serif;

  font-size: 28px;
  font-weight: 400;

  color: #1d1d1b;
`;

const EmptyText = styled.p`
  max-width: 420px;

  margin: 12px 0 0;

  color: #888;

  font-size: 13px;
  line-height: 1.7;
`;

/* =============================================================
   MATERIAL UI PAGINATION
============================================================= */

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;

  margin-top: 70px;

  .MuiPagination-root {
    direction: ltr;
  }

  .MuiPaginationItem-root {
    min-width: 38px;
    height: 38px;

    border-radius: 0;

    color: #555;

    font-family: inherit;
    font-size: 12px;

    transition:
      background 0.25s ease,
      color 0.25s ease;
  }

  .MuiPaginationItem-root:hover {
    background: #1d1d1b;
    color: #fff;
  }

  .MuiPaginationItem-root.Mui-selected {
    background: #1d1d1b;
    color: #fff;
  }

  .MuiPaginationItem-root.Mui-selected:hover {
    background: #1d1d1b;
  }

  @media (max-width: 500px) {
    .MuiPaginationItem-root {
      min-width: 34px;
      height: 34px;
    }
  }
`;

/* =============================================================
   SKELETON
============================================================= */

const SkeletonImage = styled.div`
  height: 300px;
  min-height: 300px;

  background: linear-gradient(
    90deg,
    #eeeae3 25%,
    #f7f5f0 50%,
    #eeeae3 75%
  );

  background-size: 200% 100%;

  animation: shimmer 1.5s infinite;

  @keyframes shimmer {
    0% {
      background-position: 200% 0;
    }

    100% {
      background-position: -200% 0;
    }
  }
`;

const SkeletonStars = styled.div`
  display: flex;

  gap: 4px;

  margin-bottom: 15px;
`;

const SkeletonStar = styled.div`
  width: 13px;
  height: 13px;

  border-radius: 2px;

  background: #e9e6df;

  animation: pulse 1.5s ease-in-out infinite;

  @keyframes pulse {
    0%,
    100% {
      opacity: 0.45;
    }

    50% {
      opacity: 1;
    }
  }
`;

const SkeletonText = styled.div`
  width: ${({ large }) =>
    large ? "85%" : "70%"};

  height: 10px;

  margin-bottom: 10px;

  border-radius: 3px;

  background: #eeeae3;

  animation: pulseText 1.5s ease-in-out infinite;

  @keyframes pulseText {
    0%,
    100% {
      opacity: 0.45;
    }

    50% {
      opacity: 1;
    }
  }
`;

const SkeletonBottom = styled.div`
  display: flex;
  align-items: center;

  gap: 11px;

  margin-top: auto;
  padding-top: 18px;

  border-top: 1px solid #efede8;
`;

const SkeletonAvatar = styled.div`
  width: 36px;
  height: 36px;

  flex-shrink: 0;

  border-radius: 50%;

  background: #eeeae3;

  animation: pulseAvatar 1.5s ease-in-out infinite;

  @keyframes pulseAvatar {
    0%,
    100% {
      opacity: 0.45;
    }

    50% {
      opacity: 1;
    }
  }
`;

const SkeletonSmall = styled.div`
  width: ${({ short }) =>
    short ? "60px" : "100px"};

  height: 7px;

  margin-bottom: 6px;

  border-radius: 3px;

  background: #eeeae3;

  animation: pulseSmall 1.5s ease-in-out infinite;

  @keyframes pulseSmall {
    0%,
    100% {
      opacity: 0.45;
    }

    50% {
      opacity: 1;
    }
  }
`;

