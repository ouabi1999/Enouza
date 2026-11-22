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
  productData = {},
  ratingSummary,
}) {
  const { t, i18n } = useTranslation();

  // Total number of reviews
  const totalReviews = ratingSummary?.count ?? (Number(productData?.ratings_count) || 0);

  // Rating breakdown
  const rows = [
    { value: 5, count: Number(fiveStars) || 0 },
    { value: 4, count: Number(fourStars) || 0 },
    { value: 3, count: Number(threeStars) || 0 },
    { value: 2, count: Number(twoStars) || 0 },
    { value: 1, count: Number(oneStar) || 0 },
  ].map((row) => ({
    ...row,
    count: ratingSummary ? Number(ratingSummary.buckets[row.value]) || 0 : row.count,
  }));

  const average = ratingSummary && totalReviews > 0
    ? rows.reduce((sum, row) => sum + row.value * row.count, 0) / totalReviews
    : Number(productData?.average_rating) || 0;

  // Calculate percentage using total reviews
  const getPercentage = (count) => {
    if (totalReviews <= 0) return 0;

    const percentage = (count / totalReviews) * 100;

    return Math.min(100, Math.round(percentage));
  };

  // Star labels
  const getStarLabel = (value) => {
    if (i18n.dir() === "rtl") {
      const keys = {
        5: "five_stars",
        4: "four_stars",
        3: "three_stars",
        2: "two_stars",
        1: "one_star",
      };

      return t(`productInfo.${keys[value]}`, `${value} نجوم`);
    }

    return `${value} ${t(value === 1 ? "productInfo.star" : "productInfo.stars")}`;
  };

  return (
    <Container dir={i18n.dir() === "rtl" ? "rtl" : "ltr"}>
      <Title>{t("customer_reviews.customer_reviews")}</Title>

      <RatingsLayout>
        <Summary>
          <Average>{average.toFixed(1)}</Average>

          <Stars aria-hidden="true">
            {[0, 1, 2, 3, 4].map((star) => (
              <StarIcon key={star} className={average >= star + 0.5 ? "filled" : undefined} />
            ))}
          </Stars>

          <ReviewCount>
            {totalReviews}{" "}
            {t(
              totalReviews === 1
                ? "customer_reviews.customer_review"
                : "customer_reviews.customer_reviews"
            )}
          </ReviewCount>

          <Verified>

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
                <StarLabel>
                  {getStarLabel(value)}
                </StarLabel>

                <ProgressTrack
                  role="progressbar"
                  aria-label={getStarLabel(value)}
                  aria-valuenow={percentage}
                  aria-valuemin={0}
                  aria-valuemax={100}
                >
                  <ProgressFill $percentage={percentage} />
                </ProgressTrack>

                <Percentage>
                  {percentage}%
                </Percentage>
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
  --rating-muted: #625d55;
  --rating-accent: #946a32;
  padding: clamp(16px, 4vw, 28px);
  border: 1px solid #e6e0d7;
  border-radius: 10px;
  background: #fff;
  color: #29251f;

  @media (max-width: 540px) {
    margin-inline: calc(-1 * var(--reviews-gutter, 0px));
    border-inline: 0;
    border-radius: 0;
  }
`;

const Title = styled.h3`
  margin: 0 0 20px;
  font: 400 clamp(22px, 3vw, 30px) / 1.2 Georgia, serif;

  @media (max-width: 540px) {
    text-align: center;
  }
`;

const RatingsLayout = styled.div`
  display: grid;
  grid-template-columns: minmax(130px, 1fr) minmax(0, 2fr);
  align-items: center;
  gap: clamp(16px, 4vw, 32px);

  @media (max-width: 540px) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

const Summary = styled.div`
  display: grid;
  gap: 6px;
  justify-items: start;

  @media (max-width: 540px) {
    justify-items: center;
    text-align: center;
  }
`;

const Average = styled.span`
  font: 400 44px / 1 Georgia, serif;
  font-variant-numeric: tabular-nums;
`;

const Stars = styled.div`
  display: flex;
  gap: 3px;

  svg {
    font-size: 18px;
    color: #ded7cb;
  }

  .filled {
    color: var(--rating-accent);
  }
`;

const ReviewCount = styled.span`
  color: var(--rating-muted);
  font-size: 14px;
`;

const Verified = styled.span`
  color: var(--rating-muted);
  font-size: 12px;
`;

const Breakdown = styled.div`
  display: grid;
  grid-template-columns: max-content minmax(0, 1fr) max-content;
  align-items: center;
  gap: 8px 12px;
`;

const RatingRow = styled.div`
  display: grid;
  grid-template-columns: subgrid;
  grid-column: 1 / -1;
  align-items: center;
`;

const StarLabel = styled.span`
  color: var(--rating-muted);
  font-size: 13px;
`;

const ProgressTrack = styled.div`
  height: 6px;
  overflow: hidden;
  border-radius: 10px;
  background: #eee9e1;
`;

const ProgressFill = styled.span`
  display: block;
  width: ${({ $percentage }) => $percentage}%;
  height: 100%;
  border-radius: inherit;
  background: var(--rating-accent);
`;

const Percentage = styled.span`
  color: var(--rating-muted);
  font-size: 13px;
  font-variant-numeric: tabular-nums;
  text-align: end;
`;
