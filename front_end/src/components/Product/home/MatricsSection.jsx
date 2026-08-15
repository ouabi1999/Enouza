import React from "react";
import styled from "styled-components";
import {
  AutoAwesome,
  WorkspacePremium,
  Groups,
  Timeline,
  ArrowForward,
} from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const MetricsSection = () => {
  const { t, i18n } = useTranslation();

  const metrics = [
    {
      icon: <AutoAwesome />,
      number: "20",
      title: t("matricsSection.exclusiveDesigns"),
      progress: 100,
    },
    {
      icon: <WorkspacePremium />,
      number: "10",
      title: t("matricsSection.internationalAwards"),
      progress: 90,
    },
    {
      icon: <Groups />,
      number: "41",
      title: t("matricsSection.artisanPartners"),
      progress: 85,
    },
    {
      icon: <Timeline />,
      number: "8",
      title: t("matricsSection.yearsOfExcellence"),
      progress: 95,
    },
  ];

  return (
    <Section>

      {/* =========================
          METRICS
      ========================= */}

      <MetricsContainer>

        <SectionTitle>
          {t("matricsSection.why_us")}
        </SectionTitle>

        <MetricsGrid>
          {metrics.map((metric, index) => (
            <Metric key={index}>

              <Circle>
                <CircleSvg viewBox="0 0 100 100">

                  <BackgroundCircle
                    cx="50"
                    cy="50"
                    r="44"
                  />

                  <ProgressCircle
                    cx="50"
                    cy="50"
                    r="44"
                    $progress={metric.progress}
                  />

                </CircleSvg>

                <CircleContent>

                  <Icon>
                    {metric.icon}
                  </Icon>

                  <Number>
                    {metric.number}
                    <Plus>+</Plus>
                  </Number>

                </CircleContent>
              </Circle>

              <MetricTitle>
                {metric.title}
              </MetricTitle>

            </Metric>
          ))}
        </MetricsGrid>

      </MetricsContainer>


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

        <ShopButton
          to="/product/29"
        >
          {t("common.buyNow")}

          <Arrow
            $rtl={i18n.dir() === "rtl"}
          >
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
  background: "#FFFFFF",
  text: "#292929",
  bronze: "#9A7743",
  light: "#E5E0D8",
};


/* =========================
   SECTION
========================= */

const Section = styled.section`
  width: 100%;
  background: ${COLORS.background};
`;


/* =========================
   METRICS
========================= */

const MetricsContainer = styled.div`
  width: min(1100px, calc(100% - 40px));
  margin: auto;

  padding: 80px 0 90px;

  @media (max-width: 700px) {
    padding: 60px 0 70px;
  }
`;


const SectionTitle = styled.h2`
  margin: 0 0 65px;

  text-align: center;

  font-family: "Playfair Display", serif;
  font-size: 1.7rem;
  font-weight: 400;

  color: ${COLORS.text};

  text-transform: uppercase;
  letter-spacing: 0.08em;

  @media (max-width: 600px) {
    font-size: 1.25rem;
    margin-bottom: 50px;
  }
`;


const MetricsGrid = styled.div`
  display: grid;

  grid-template-columns: repeat(4, 1fr);

  gap: 40px;

  @media (max-width: 800px) {
    grid-template-columns: repeat(2, 1fr);

    gap: 55px 25px;
  }

  @media (max-width: 420px) {
    gap: 45px 10px;
  }
`;


const Metric = styled.div`
  display: flex;

  flex-direction: column;

  align-items: center;

  text-align: center;
`;


/* =========================
   CIRCLE
========================= */

const Circle = styled.div`
  position: relative;

  width: 145px;
  height: 145px;

  @media (max-width: 600px) {
    width: 125px;
    height: 125px;
  }

  @media (max-width: 400px) {
    width: 115px;
    height: 115px;
  }
`;


const CircleSvg = styled.svg`
  position: absolute;

  inset: 0;

  width: 100%;
  height: 100%;

  transform: rotate(-90deg);
`;


const BackgroundCircle = styled.circle`
  fill: none;

  stroke: ${COLORS.light};

  stroke-width: 2;
`;


const ProgressCircle = styled.circle`
  fill: none;

  stroke: ${COLORS.bronze};

  stroke-width: 2;

  stroke-linecap: round;

  stroke-dasharray: 276.46;

  stroke-dashoffset: ${({ $progress }) =>
    276.46 - (276.46 * $progress) / 100};

  transition: stroke-dashoffset 1.4s ease;
`;


/* =========================
   CIRCLE CONTENT
========================= */

const CircleContent = styled.div`
  position: absolute;

  inset: 0;

  display: flex;

  flex-direction: column;

  align-items: center;

  justify-content: center;
`;


const Icon = styled.div`
  display: flex;

  color: ${COLORS.bronze};

  margin-bottom: 7px;

  svg {
    font-size: 27px;

    font-weight: 300;
  }

  @media (max-width: 600px) {
    svg {
      font-size: 22px;
    }
  }
`;


const Number = styled.div`
  display: flex;

  align-items: baseline;

  font-family: "Playfair Display", serif;

  font-size: 1.8rem;

  font-weight: 400;

  color: ${COLORS.text};

  @media (max-width: 600px) {
    font-size: 1.5rem;
  }
`;


const Plus = styled.span`
  color: ${COLORS.bronze};

  font-size: 1rem;

  margin-left: 2px;
`;


const MetricTitle = styled.p`
  margin: 18px 0 0;

  max-width: 180px;

  color: ${COLORS.text};

  font-family: Arial, sans-serif;

  font-size: 0.72rem;

  font-weight: 500;

  line-height: 1.5;

  letter-spacing: 0.08em;

  text-transform: uppercase;

  @media (max-width: 600px) {
    max-width: 140px;

    font-size: 0.62rem;

    letter-spacing: 0.06em;
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

  background: rgba(0, 0, 0, 0.28);
`;


/* =========================
   VIDEO TEXT
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