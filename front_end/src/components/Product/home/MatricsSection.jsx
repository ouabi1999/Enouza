import React from "react";
import styled from "styled-components";
import {
  AutoAwesome,
  WorkspacePremium,
  LightMode,
  DiamondOutlined,
  ArrowForward,
} from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const MetricsSection = () => {
  const { t, i18n } = useTranslation();

  const features = [
    {
      icon: <AutoAwesome />,
      title: t("matricsSection.curated"),
    },
    {
      icon: <WorkspacePremium />,
      title: t("matricsSection.refined"),
    },
    {
      icon: <LightMode />,
      title: t("matricsSection.atmospheric"),
    },
    {
      icon: <DiamondOutlined />,
      title: t("matricsSection.distinctive"),
    },
  ];

  return (
    <Section >
      {/* =========================
          WHY CHOOSE ENOUZA
      ========================= */}

      <WhyChooseContainer>
        <SectionHeader dir = {i18n.language === "ar"? "rtl": "ltr"}>
          <SectionTitle>
            {t("matricsSection.why_us")}
          </SectionTitle>

          <TitleDecoration>
            <DecorationLine />
            <DecorationDot />
            <DecorationLine />
          </TitleDecoration>
        </SectionHeader>

        <FeaturesGrid>
          {features.map((feature, index) => (
            <Feature key={index}>
              <IconCircle>
                <FeatureIcon>
                  {React.cloneElement(feature.icon, {
                    fontSize: "inherit",
                  })}
                </FeatureIcon>
              </IconCircle>

              <FeatureTitle>
                {feature.title}
              </FeatureTitle>
            </Feature>
          ))}
        </FeaturesGrid>
      </WhyChooseContainer>

      {/* =========================
          VIDEO
      ========================= */}

      <VideoSection>
        <Video
          autoPlay
          muted
          loop
          playsInline
        >
          <source
            src="https://res.cloudinary.com/dzpzy1o1y/video/upload/v1786567618/About_iiabi5.mp4"
            type="video/mp4"
          />
        </Video>

        <VideoOverlay />

        <VideoContent>
          <VideoTitle>
            {t("matricsSection.title")}
          </VideoTitle>

          <VideoDescription>
            {t("matricsSection.description")}
          </VideoDescription>
        </VideoContent>

        <ShopButton to="/product/50">
          {t("common.buyNow")}

          <Arrow $rtl={i18n.dir() === "rtl"}>
            <ArrowForward />
          </Arrow>
        </ShopButton>
      </VideoSection>
    </Section>
  );
};

export default MetricsSection;


/* =========================
   COLORS
========================= */

const COLORS = {
  background: "#F7F5F0",
  white: "#FFFFFF",
  text: "#1D1C1A",
  muted: "#77736B",
  gold: "#B39A76",
  softGold: "#DED4C4",
  border: "#E4DED4",
};


/* =========================
   SECTION
========================= */

const Section = styled.section`
  width: 100%;
  background: ${COLORS.background};
`;


/* =========================
   WHY CHOOSE US
========================= */

const WhyChooseContainer = styled.div`
  width: min(1300px, calc(100% - 48px));
  margin: 0 auto;

  padding: 100px 0 105px;

  @media (max-width: 768px) {
    width: min(100% - 40px, 600px);
    padding: 75px 0 80px;
  }

  @media (max-width: 480px) {
    width: calc(100% - 32px);
    padding: 60px 0 65px;
  }
`;


/* =========================
   HEADER
========================= */

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 50px;

  @media (max-width: 768px) {
    margin-bottom: 55px;
  }
`;

const SectionTitle = styled.h2`
  margin: 0;

  color: ${COLORS.text};

  font-family: "Playfair Display", serif;
  font-size: clamp(1.4rem, 1vw, 2rem);
  font-weight: 400;

  letter-spacing: 0.12em;
  text-transform: uppercase;
  

  @media (max-width: 480px) {
    font-size: 1.3rem;
    letter-spacing: 0.08em;
  }
`;


/* =========================
   TITLE DECORATION
========================= */

const TitleDecoration = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  gap: 10px;

  margin-top: 22px;
`;

const DecorationLine = styled.span`
  width: 55px;
  height: 1px;

  background: ${COLORS.softGold};

  @media (max-width: 480px) {
    width: 40px;
  }
`;

const DecorationDot = styled.span`
  width: 6px;
  height: 6px;

  border-radius: 50%;

  background: ${COLORS.gold};
`;


/* =========================
   FEATURES GRID
========================= */

const FeaturesGrid = styled.div`
  display: grid;

  grid-template-columns: repeat(4, 1fr);

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 60px 20px;
  }

 
`;

const Feature = styled.div`
  position: relative;

  display: flex;
  flex-direction: column;

  align-items: center;
  justify-content: center;

  text-align: center;

  min-height: 190px;

  padding: 0 20px;

  &:not(:last-child)::after {
    content: "";

    position: absolute;

    top: 50%;
    right: 0;

    transform: translateY(-50%);

    width: 1px;
    height: 115px;

    background: ${COLORS.border};
  }

  @media (max-width: 900px) {
    &:not(:last-child)::after {
      display: none;
    }
  }

  @media (max-width: 520px) {
    min-height: auto;
    padding: 0;
  }
`;


/* =========================
   ICON CIRCLE
========================= */

const IconCircle = styled.div`
  width: 105px;
  height: 105px;

  border: 1px solid ${COLORS.gold};
  border-radius: 50%;

  display: flex;
  align-items: center;
  justify-content: center;

  margin-bottom: 24px;

  color: ${COLORS.gold};

  transition:
    transform 0.35s ease,
    background 0.35s ease,
    border-color 0.35s ease,
    color 0.35s ease;

  

  @media (max-width: 600px) {
    width: 92px;
    height: 92px;
  }
`;

const FeatureIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 34px;

  svg {
    font-size: inherit;
  }

  @media (max-width: 600px) {
    font-size: 30px;
  }
`;


/* =========================
   FEATURE TITLE
========================= */

const FeatureTitle = styled.h3`
  margin: 0;

  color: ${COLORS.text};

  font-family: "Playfair Display", serif;
  font-size: 0.85rem;
  font-weight: 500;

  letter-spacing: 0.14em;
  text-transform: uppercase;

  @media (max-width: 600px) {
    font-size: 0.82rem;
  }
`;


/* =========================
   VIDEO
========================= */

const VideoSection = styled.div`
  position: relative;

  width: 100%;
  height: 580px;

  overflow: hidden;

  @media (max-width: 700px) {
    height: 500px;
  }

  @media (max-width: 500px) {
    height: 450px;
  }
`;

const Video = styled.video`
  width: 100%;
  height: 100%;

  object-fit: cover;

  display: block;
`;

const VideoOverlay = styled.div`
  position: absolute;

  inset: 0;

  background: rgba(0, 0, 0, 0.3);
`;


/* =========================
   VIDEO CONTENT
========================= */

const VideoContent = styled.div`
  position: absolute;

  top: 50%;
  left: 50%;

  transform: translate(-50%, -50%);

  width: min(700px, 85%);

  text-align: center;

  color: white;
`;

const VideoTitle = styled.h2`
  margin: 0;

  font-family: "Playfair Display", serif;

  font-size: clamp(2rem, 4vw, 3.8rem);

  font-weight: 400;

  line-height: 1.15;

  @media (max-width: 500px) {
    font-size: 2rem;
  }
`;

const VideoDescription = styled.p`
  margin: 20px auto 0;

  max-width: 580px;

  font-family: Arial, sans-serif;

  font-size: 0.9rem;

  line-height: 1.7;

  opacity: 0.92;

  @media (max-width: 500px) {
    font-size: 0.75rem;

    margin-top: 15px;
  }
`;


/* =========================
   BUTTON
========================= */

const ShopButton = styled(Link)`
  position: absolute;

  right: 7%;
  bottom: 45px;

  display: inline-flex;

  align-items: center;

  gap: 8px;

  color: white;

  text-decoration: none;

  font-family: Arial, sans-serif;

  font-size: 0.8rem;

  letter-spacing: 0.12em;

  text-transform: uppercase;

  padding-bottom: 7px;

  border-bottom: 1px solid rgba(255, 255, 255, 0.8);

  transition: 0.25s ease;

  &:hover {
    color: #d4bd91;

    border-color: #d4bd91;
  }

  @media (max-width: 700px) {
    right: 50%;

    transform: translateX(50%);

    bottom: 30px;

    font-size: 0.7rem;
  }
`;

const Arrow = styled.span`
  display: flex;

  transform: ${({ $rtl }) =>
    $rtl ? "rotate(180deg)" : "none"};

  svg {
    font-size: 17px;
  }
`;