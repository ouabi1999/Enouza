import React from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { toggleCategory } from "../../../features/filterSlice";
import { Link } from "react-router-dom";
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat';
import { optimizeCloudinaryImage } from "../../../utilis/cloudinary";

const CollectionSection = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();

  const collections = [
    {
      key: "pendant_lights",
      image: "https://sc04.alicdn.com/kf/Hb7b209b8ca4d4a58afb4a71b3176b56ep.jpg",
      link: "/collections?category=pendant_lights",
    },
    {
      key: "decorative_accessories",
      image: "https://res.cloudinary.com/dzpzy1o1y/image/upload/v1795302820/marble_tray_compressed_jsseye.webp",
      link: "/collections?category=decorative_accessories",
    },
    {
      key: "table_lamps",
      image: "https://res.cloudinary.com/dzpzy1o1y/image/upload/v1789820414/enouza/products/jpxlalafq9zdygzqqe3f.png",
      link: "/collections?category=table_lamps",
    },
  ];

  return (
    <Section dir={i18n.dir()}>
      <Title>{t("collectionSection.title")}</Title>
      <CollectionGrid>
        {collections.map((collection) => (
          <CollectionCard
            key={collection.key}
            to={collection.link}
            onClick={() => dispatch(toggleCategory(collection.key))}
          >
            <ImageWrapper>
              <CollectionImage
                src={optimizeCloudinaryImage(collection.image, { width: 800 })}
                alt=""
                loading="lazy"
                decoding="async"
              />
            </ImageWrapper>
            <CardContent>
              <CardTitle>{t(`collectionSection.categories.${collection.key}.title`)}</CardTitle>
              <Explore>
                {t("collectionSection.catlabel")}
                <TrendingFlatIcon aria-hidden="true" />
              </Explore>
            </CardContent>
          </CollectionCard>
        ))}
      </CollectionGrid>
    </Section>
  );
};

export default CollectionSection;

const Section = styled.section`
  background: #f7f5f0;
  padding:20px 0 ;
`;

const Title = styled.h2`
  margin: 0 0 clamp(16px, 3vw, 28px);
  color: #29251f;
  font: 500 clamp(24px, 3.4vw, 38px) / 1.15 "Cormorant Garamond", Georgia, serif;
  text-align: center;
`;

const CollectionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: clamp(12px, 2vw, 24px);
  max-width: 1280px;
  margin-inline: auto;

  @media (max-width: 680px) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

const CollectionCard = styled(Link)`
  display: flex;
  flex-direction: column;
  min-width: 0;
  overflow: hidden;
  border: 1px solid #e6e0d7;
  background: #fff;
  color: #29251f;
  text-decoration: none;

  &:is(:hover, :focus-visible) {
    color: #806547;
  }

  &:focus-visible {
    outline: 2px solid #806547;
    outline-offset: 3px;
  }
`;

const ImageWrapper = styled.div`
  aspect-ratio: 4 / 5;
  overflow: hidden;
  background: #eee9e1;

  @media (max-width: 680px) {
    aspect-ratio: 4 / 3;
  }
`;

const CollectionImage = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;

  @media (hover: hover) and (prefers-reduced-motion: no-preference) {
    transition: transform 350ms ease;

    ${CollectionCard}:hover & {
      transform: scale(1.035);
    }
  }
`;

const CardContent = styled.div`
  display: grid;
  align-content: start;
  gap: 6px;
  padding: clamp(12px, 2vw, 20px);
`;

const CardTitle = styled.h3`
  margin: 0;
  font: 500 clamp(20px, 2.2vw, 27px) / 1.2 "Cormorant Garamond", Georgia, serif;
`;

const Explore = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: #664d32;
  font-size: 12px;
  font-weight: 600;

  svg {
    font-size: 16px;
  }

  &:dir(rtl) svg {
    transform: rotate(180deg);
  }

  ${CollectionCard}:is(:hover, :focus-visible) & {
    color: #806547;
    text-decoration: underline;
    text-underline-offset: 3px;
  }
`;
