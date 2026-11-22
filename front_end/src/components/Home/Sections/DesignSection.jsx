import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import DesignServicesIcon from "@mui/icons-material/DesignServices";
import StarIcon from "@mui/icons-material/Star";
import SpaIcon from "@mui/icons-material/Spa";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { optimizeCloudinaryImage } from "../../../utilis/cloudinary";

const imageUrl =
  "https://res.cloudinary.com/dzpzy1o1y/image/upload/v1794095318/stone-showroom-girl-optimized_lkqh3n.webp";

const principles = [
  { key: "minimalism", Icon: DesignServicesIcon },
  { key: "materials", Icon: StarIcon },
  { key: "ambient", Icon: SpaIcon },
];

const DesignSection = () => {
  const { t, i18n } = useTranslation();

  return (
    <Section dir={i18n.dir()} aria-labelledby="design-section-title">
      <Layout>
        <Content>
          <Title id="design-section-title">{t("designSection.title")}</Title>
          <Principles>
            {principles.map(({ key, Icon }) => (
              <Principle key={key}>
                <Icon aria-hidden="true" />
                <div>
                  <h3>{t(`designSection.principles.${key}.title`)}</h3>
                  <p>{t(`designSection.principles.${key}.description`)}</p>
                </div>
              </Principle>
            ))}
          </Principles>
        </Content>

        <ImageFrame>
          <ShowroomImage
            src={optimizeCloudinaryImage(imageUrl, { width: 1200 })}
            alt=""
            loading="lazy"
            decoding="async"
            width="600"
            height="580"
          />
        </ImageFrame>

        <BrandLink to="/about-us">
          {t("designSection.catlabel", { defaultValue: "Discover our brand" })}
          <ArrowForwardIcon aria-hidden="true" />
        </BrandLink>
      </Layout>
    </Section>
  );
};

export default DesignSection;

const Section = styled.section`
  padding: clamp(40px, 7vw, 96px) clamp(20px, 5vw, 64px);
  background: #f7f5f0;
  color: #1d1c1a;
`;

const Layout = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1.25fr) minmax(0, 1.15fr);
  grid-template-areas:
    "image content"
    "image link";
  gap: 24px clamp(28px, 4vw, 64px);
  max-width: 1240px;
  margin-inline: auto;
  align-items: center;

  @media (max-width: 900px) {
    grid-template-columns: minmax(0, 1fr);
    grid-template-areas: "content" "image" "link";
    max-width: 600px;
  }
`;

const Content = styled.div`
  grid-area: content;
  align-self: end;
`;

const Title = styled.h2`
  margin: 0 0 clamp(20px, 3vw, 36px);
  font: 500 clamp(32px, 4vw, 52px) / 1.08 "Cormorant Garamond", Georgia, serif;
  text-wrap: balance;
`;

const Principles = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`;

const Principle = styled.li`
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  gap: 14px;
  padding-block: 17px;
  border-block-start: 1px solid #ded4c4;

  @media (width > 900px) {
    padding-block: 25px;
  }

  > svg {
    margin-block-start: 2px;
    font-size: 20px;
    color: #806547;
  }

  h3 {
    margin: 0 0 4px;
    font-size: 1rem;
    font-weight: 600;
    line-height: 1.35;
  }

  p {
    margin: 0;
    color: #655f55;
    font-size: 0.9rem;
    line-height: 1.65;
  }
`;

const ImageFrame = styled.div`
  grid-area: image;
  position: relative;
  align-self: stretch;
  min-height: clamp(480px, 41vw, 550px);
  background: #eee9e1;

  @media (max-width: 900px) {
    aspect-ratio: 6 / 7;
    min-height: 0;
  }
`;

const ShowroomImage = styled.img`
  position: absolute;
  inset: 0;
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const BrandLink = styled(Link)`
  grid-area: link;
  align-self: start;
  justify-self: start;

  @media (max-width: 900px) {
    justify-self: center;
  }

  display: inline-flex;
  align-items: center;
  gap: 12px;
  box-sizing: border-box;
  min-height: 44px;
  padding: 10px 18px;
  border: 1px solid #1d1c1a;
  border-radius: 4px;
  background: #1d1c1a;
  color: #fff;
  font-size: 0.875rem;
  font-weight: 600;
  line-height: 1.35;
  text-decoration: none;

  svg {
    flex-shrink: 0;
    font-size: 16px;
  }

  &:dir(rtl) svg {
    transform: scaleX(-1);
  }

  &:hover {
    background: #f7f5f0;
    color: #1d1c1a;
  }

  &:focus-visible {
    outline: 2px solid #806547;
    outline-offset: 4px;
  }
`;
