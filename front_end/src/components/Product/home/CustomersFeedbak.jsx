import React from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";

const CustomersFeedback = () => {
  const { t } = useTranslation();

  const reviews = [
    {
      name: "Sofia M.",
      rating: 5,
      product: "Orbis Wood LED Table Lamp",
      text: "Beautiful lamp and even better in person. It completely changed the atmosphere of our bedroom.",
      image: "/images/customer-1.jpg",
    },
    {
      name: "Daniel R.",
      rating: 5,
      product: "Modern Marble Wall Lamp",
      text: "The quality is exceptional. The design looks elegant and premium in our living room.",
      image: "/images/customer-2.jpg",
    },
    {
      name: "Emma L.",
      rating: 5,
      product: "Luxury Pendant Light",
      text: "A beautiful addition to our home. The finish and attention to detail are excellent.",
      image: "/images/customer-3.jpg",
    },
  ];

  return (
    <Section>
      <Container>
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

        <Reviews>
          {reviews.map((review) => (
            <ReviewCard key={review.name}>
              <ImageWrapper>
                <ReviewImage
                  src={review.image}
                  alt={review.product}
                  loading="lazy"
                />
              </ImageWrapper>

              <ReviewContent>
                <Stars aria-label={`${review.rating} out of 5 stars`}>
                  {"★".repeat(review.rating)}
                </Stars>

                <ReviewText>
                  “{review.text}”
                </ReviewText>

                <Customer>
                  <CustomerName>
                    {review.name}
                  </CustomerName>

                  <Verified>
                    <Check>✓</Check>
                    {t("customersFeedback.verifiedPurchase")}
                  </Verified>
                </Customer>

                <Product>
                  {review.product}
                </Product>
              </ReviewContent>
            </ReviewCard>
          ))}
        </Reviews>
      </Container>
    </Section>
  );
};

export default CustomersFeedback;
const Section = styled.section`
  padding: 110px 20px;
  background: #faf9f7;
`;

const Container = styled.div`
  max-width: 1280px;
  margin: 0 auto;
`;

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
`;

const RatingContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 3px;
`;

const Stars = styled.span`
  font-size: 15px;
  letter-spacing: 3px;
`;

const RatingText = styled.span`
  font-size: 12px;
  color: #777;
`;

const Reviews = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    max-width: 650px;
    margin: 0 auto;
  }
`;

const ReviewCard = styled.article`
  overflow: hidden;
  background: #fff;
  border: 1px solid #e8e6e2;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.06);
  }
`;

const ImageWrapper = styled.div`
  width: 100%;
  aspect-ratio: 4 / 3;
  overflow: hidden;
`;

const ReviewImage = styled.img`
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
  transition: transform 0.6s ease;

  ${ReviewCard}:hover & {
    transform: scale(1.04);
  }
`;

const ReviewContent = styled.div`
  padding: 28px;
`;

const ReviewText = styled.p`
  margin: 22px 0 28px;
  font-family: Georgia, serif;
  font-size: 18px;
  line-height: 1.65;
  color: #292929;
`;

const Customer = styled.div`
  margin-top: auto;
`;

const CustomerName = styled.span`
  display: block;
  margin-bottom: 7px;
  font-size: 14px;
  font-weight: 600;
`;

const Verified = styled.span`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: #777;
`;

const Check = styled.span`
  font-size: 11px;
`;

const Product = styled.span`
  display: block;
  margin-top: 20px;
  padding-top: 15px;
  border-top: 1px solid #eee;
  font-size: 12px;
  color: #888;
`;