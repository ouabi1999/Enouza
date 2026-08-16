import React from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import StarIcon from "@mui/icons-material/Star";

function Ratings({
  fiveStars = 0,
  fourStars = 0,
  threeStars = 0,
  twoStars = 0,
  oneStar = 0,
  sum_stars = 0,
  ratings = [],
}) {
  const { t, i18n } = useTranslation();

  const totalReviews = Array.isArray(ratings) ? ratings.length : 0;
  const average =
    totalReviews > 0
      ? (Number(sum_stars || 0) / totalReviews).toFixed(1)
      : "0.0";

  const rows = [
    { value: 5, count: Number(fiveStars) || 0 },
    { value: 4, count: Number(fourStars) || 0 },
    { value: 3, count: Number(threeStars) || 0 },
    { value: 2, count: Number(twoStars) || 0 },
    { value: 1, count: Number(oneStar) || 0 },
  ];

  const getPercentage = (count) => {
    if (!Number(sum_stars) || Number(sum_stars) <= 0) return 0;
    return Math.round((count / Number(sum_stars)) * 100);
  };

  const getStarLabel = (value) => {
    if (i18n.language === "ar") {
      const keys = {
        5: "five_stars",
        4: "four_stars",
        3: "three_stars",
        2: "two_stars",
        1: "one_star",
      };

      return t(`productInfo.${keys[value]}`, `${value} نجوم`);
    }

    return `${value} ${t("productInfo.stars", "stars")}`;
  };

  return (
    <Container dir={i18n.language === "ar" ? "rtl" : "ltr"}>
      <RatingsHeader>
        <Eyebrow>ENOUZA</Eyebrow>
        <Title>{t("customer_reviews.customer_rating", "Customers Rating")}</Title>
        <HeaderAccent />
      </RatingsHeader>

      <RatingsLayout>
        <Summary>
          <Average>{average}</Average>

          <Stars aria-label={`${average} out of 5`}>
            {[0, 1, 2, 3, 4].map((star) => (
              <StarIcon key={star} />
            ))}
          </Stars>

          <ReviewCount>
            {totalReviews}{" "}
            {t(
              "productInfo.customer_reviews",
              totalReviews === 1 ? "customer review" : "customer reviews"
            )}
          </ReviewCount>

          <Verified>
            <VerifiedDot />
            {t(
              "productInfo.all_from_verified_purchases",
              "Verified purchases"
            )}
          </Verified>
        </Summary>

        <Breakdown>
          {rows.map(({ value, count }) => {
            const percentage = getPercentage(count);

            return (
              <RatingRow key={value}>
                <StarLabel>{getStarLabel(value)}</StarLabel>
                <ProgressTrack aria-label={`${value} stars: ${percentage}%`}>
                  <ProgressFill $percentage={percentage} />
                </ProgressTrack>
                <Percentage>{percentage}%</Percentage>
              </RatingRow>
            );
          })}
        </Breakdown>
      </RatingsLayout>
    </Container>
  );
}

export default Ratings;

const Container = styled.section`
  width: 100%;
  margin: 0 auto;
  padding: 0;
  color: #29251f;
`;

const RatingsHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 0 42px;
  text-align: center;
`;

const Eyebrow = styled.span`
  margin-bottom: 8px;
  color: #a88a62;
  font-family: "Cormorant Garamond", Georgia, serif;
  font-size: 11px;
  font-weight: 500;
  line-height: 1;
  letter-spacing: 0.32em;
`;

const Title = styled.h3`
  margin: 0;
  color: #211e1a;
  font-family: "Cormorant Garamond", Georgia, serif;
  font-size: clamp(30px, 3.5vw, 38px);
  font-weight: 400;
  line-height: 1.1;
  letter-spacing: 0.015em;
`;

const HeaderAccent = styled.span`
  width: 25px;
  height: 1px;
  margin-top: 12px;
  background: #a88a62;
`;

const RatingsLayout = styled.div`
  display: grid;
  grid-template-columns: minmax(220px, 0.72fr) minmax(320px, 1.28fr);
  gap: 72px;
  align-items: center;
  width: 100%;
  padding: 0 4px 8px;
  box-sizing: border-box;

  @media (max-width: 760px) {
    grid-template-columns: 1fr;
    gap: 42px;
  }
`;

const Summary = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 180px;
  padding: 10px 20px;
  text-align: center;

  @media (max-width: 760px) {
    min-height: auto;
  }
`;

const Average = styled.span`
  color: #211e1a;
  font-family: "Cormorant Garamond", Georgia, serif;
  font-size: clamp(64px, 7vw, 82px);
  font-weight: 400;
  line-height: 0.9;
  letter-spacing: -0.025em;
`;

const Stars = styled.div`
  display: flex;
  align-items: center;
  gap: 3px;
  margin-top: 17px;

  svg {
    width: 15px;
    height: 15px;
    color: #a88a62;
  }
`;

const ReviewCount = styled.span`
  margin-top: 11px;
  color: #766c61;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 12px;
  font-weight: 400;
  line-height: 1.4;
  letter-spacing: 0.1em;
  text-transform: uppercase;
`;

const Verified = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 7px;
  margin-top: 15px;
  color: #8c7d6d;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 11px;
  font-weight: 500;
  line-height: 1.4;
  letter-spacing: 0.13em;
  text-transform: uppercase;
`;

const VerifiedDot = styled.span`
  width: 5px;
  height: 5px;
  flex: 0 0 5px;
  border-radius: 50%;
  background: #a88a62;
`;

const Breakdown = styled.div`
  width: 100%;
  max-width: 590px;
  margin: 0 auto;
`;

const RatingRow = styled.div`
  display: grid;
  grid-template-columns: 72px minmax(100px, 1fr) 44px;
  align-items: center;
  gap: 16px;
  min-height: 32px;

  &:not(:last-child) {
    margin-bottom: 7px;
  }

  @media (max-width: 420px) {
    grid-template-columns: 62px minmax(70px, 1fr) 40px;
    gap: 10px;
  }
`;

const StarLabel = styled.span`
  color: #665d54;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  white-space: nowrap;
`;

const ProgressTrack = styled.div`
  position: relative;
  width: 100%;
  height: 4px;
  overflow: hidden;
  background: #e7e1da;
`;

const ProgressFill = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  width: ${({ $percentage }) => `${$percentage}%`};
  height: 100%;
  background: #a88a62;
  transition: width 0.6s ease;
`;

const Percentage = styled.span`
  color: #958879;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 11px;
  font-weight: 400;
  letter-spacing: 0.04em;
  text-align: right;
`;