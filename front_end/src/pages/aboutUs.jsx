
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import styled from "styled-components";

import AutoAwesome from "@mui/icons-material/AutoAwesome";
import WorkspacePremium from "@mui/icons-material/WorkspacePremium";
import LightMode from "@mui/icons-material/LightMode";
import DiamondOutlined from "@mui/icons-material/DiamondOutlined";

import SEO from "../components/SEO/SEO";



const images = {
  story:
    "https://res.cloudinary.com/dzpzy1o1y/image/upload/v1789772276/enouza/products/cf9x7hm6kfetpdhrqusc.png",
  statement:
    "https://res.cloudinary.com/dzpzy1o1y/image/upload/v1791651525/enouza/products/imgi_33_BRONZE_PRODUCT_PAGE_4_bxanev.jpg",
  approach:
    "https://res.cloudinary.com/dzpzy1o1y/image/upload/v1789953779/nano-banana-free-nano-pro-YNPdWDr2s_UIcMMIM73VTQ_cctocy.png",
  selection:
    "https://res.cloudinary.com/dzpzy1o1y/image/upload/v1789759246/wz8kkye0zyrbrhnpc5qx.png",
  promise:
    "https://res.cloudinary.com/dzpzy1o1y/image/upload/v1789477153/enouza/products/uxdsswoykxmqdb37195t.png",
};

const COLORS = {
  background: "#F7F5F0",
  text: "#292723",
  muted: "#777168",
  gold: "#B39A76",
  border: "#E4DED4",
  dark: "#292723",
};

const AboutUs = () => {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language?.startsWith("ar");

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "auto",
    });
  }, []);

  const features = [
    {
      icon: <AutoAwesome />,
      title: t("aboutus.approach.curated.title"),
      description: t("aboutus.approach.curated.description"),
    },
    {
      icon: <WorkspacePremium />,
      title: t("aboutus.approach.refined.title"),
      description: t("aboutus.approach.refined.description"),
    },
    {
      icon: <LightMode />,
      title: t("aboutus.approach.atmospheric.title"),
      description: t("aboutus.approach.atmospheric.description"),
    },
    {
      icon: <DiamondOutlined />,
      title: t("aboutus.approach.distinctive.title"),
      description: t("aboutus.approach.distinctive.description"),
    },
  ];

  const selectionItems = [
    {
      number: "01",
      title: t("aboutus.selection.form.title"),
      description: t("aboutus.selection.form.description"),
    },
    {
      number: "02",
      title: t("aboutus.selection.material.title"),
      description: t("aboutus.selection.material.description"),
    },
    {
      number: "03",
      title: t("aboutus.selection.light.title"),
      description: t("aboutus.selection.light.description"),
    },
  ];

  return (
    <Page dir={isArabic ? "rtl" : "ltr"}>
      <SEO
        title={t("aboutus.seo.title")}
        description={t("aboutus.seo.description")}
        canonical="/about-us"
      />

      
      {/* 01 — TEXT LEFT / IMAGE RIGHT */}
      <SplitSection>
        <SplitInner>
          <SplitContent $rtl={isArabic}>
            <Eyebrow>
              {t("aboutus.story.eyebrow")}
            </Eyebrow>

            <SectionTitle>
              {t("aboutus.story.title")}
            </SectionTitle>

            <Lead>
              {t("aboutus.story.lead")}
            </Lead>

            <BodyText>
              {t("aboutus.story.text")}
            </BodyText>

            <BodyText>
              {t("aboutus.story.text2")}
            </BodyText>
          </SplitContent>

          <ImageFrame>
            <SectionImage
              src={images.story}
              alt={t("aboutus.story.title")}
              loading="lazy"
            />
            <ImageIndex>01 / 05</ImageIndex>
          </ImageFrame>
        </SplitInner>
      </SplitSection>

      {/* 02 — IMAGE LEFT / TEXT RIGHT */}
      <SplitSection $reverse $tinted>
        <SplitInner $reverse>
          <ImageFrame>
            <SectionImage
              src={images.statement}
              alt={t("aboutus.statement.title")}
              loading="lazy"
            />
            <ImageIndex>02 / 05</ImageIndex>
          </ImageFrame>

          <SplitContent $rtl={isArabic}>
            <Eyebrow>
              {t("aboutus.statement.title")}
            </Eyebrow>

            <SectionTitle>
              {t("aboutus.statement.title")}
            </SectionTitle>

            <Lead>
              {t("aboutus.statement.description")}
            </Lead>
          </SplitContent>
        </SplitInner>
      </SplitSection>

      {/* 03 — TEXT LEFT / IMAGE RIGHT */}
      <SplitSection>
        <SplitInner>
          <SplitContent $rtl={isArabic}>
            <Eyebrow>
              {t("aboutus.approach.eyebrow")}
            </Eyebrow>

            <SectionTitle>
              {t("aboutus.approach.title")}
            </SectionTitle>

            <FeatureList>
              {features.map((feature, index) => (
                <Feature key={index}>
                  <FeatureIcon>
                    {React.cloneElement(feature.icon, {
                      fontSize: "inherit",
                    })}
                  </FeatureIcon>

                  <FeatureCopy>
                    <FeatureTitle>
                      {feature.title}
                    </FeatureTitle>

                    <FeatureDescription>
                      {feature.description}
                    </FeatureDescription>
                  </FeatureCopy>
                </Feature>
              ))}
            </FeatureList>
          </SplitContent>

          <ImageFrame>
            <SectionImage
              src={images.approach}
              alt={t("aboutus.approach.title")}
              loading="lazy"
            />
            <ImageIndex>03 / 05</ImageIndex>
          </ImageFrame>
        </SplitInner>
      </SplitSection>

      {/* 04 — IMAGE LEFT / TEXT RIGHT */}
      <SplitSection $reverse $tinted>
        <SplitInner $reverse>
          <ImageFrame>
            <SectionImage
              src={images.selection}
              alt={t("aboutus.selection.title")}
              loading="lazy"
            />
            <ImageIndex>04 / 05</ImageIndex>
          </ImageFrame>

          <SplitContent $rtl={isArabic}>
            <Eyebrow>
              {t("aboutus.selection.eyebrow")}
            </Eyebrow>

            <SectionTitle>
              {t("aboutus.selection.title")}
            </SectionTitle>

            <SelectionList>
              {selectionItems.map((item) => (
                <SelectionItem key={item.number}>
                  <SelectionNumber>
                    {item.number}
                  </SelectionNumber>

                  <SelectionCopy>
                    <SelectionTitle>
                      {item.title}
                    </SelectionTitle>

                    <BodyText>
                      {item.description}
                    </BodyText>
                  </SelectionCopy>
                </SelectionItem>
              ))}
            </SelectionList>
          </SplitContent>
        </SplitInner>
      </SplitSection>

      {/* 05 — TEXT LEFT / IMAGE RIGHT */}
      <SplitSection>
        <SplitInner>
          <SplitContent $rtl={isArabic}>
            <Eyebrow>
              {t("aboutus.promise.eyebrow")}
            </Eyebrow>

            <SectionTitle>
              {t("aboutus.promise.title")}
            </SectionTitle>

            <Lead>
              {t("aboutus.promise.description")}
            </Lead>
          </SplitContent>

          <ImageFrame>
            <SectionImage
              src={images.promise}
              alt={t("aboutus.promise.title")}
              loading="lazy"
            />
            <ImageIndex>05 / 05</ImageIndex>
          </ImageFrame>
        </SplitInner>
      </SplitSection>

      {/* FINAL CTA */}
      <FinalSection>
        <FinalInner $rtl={isArabic}>
          <Eyebrow>
            {t("aboutus.final.eyebrow")}
          </Eyebrow>

          <FinalTitle>
            {t("aboutus.final.title")}
          </FinalTitle>

          <FinalText>
            {t("aboutus.final.description")}
          </FinalText>

          <CollectionLink to="/collections">
            <span>{t("aboutus.final.cta")}</span>
            <Arrow>{isArabic ? "←" : "→"}</Arrow>
          </CollectionLink>
        </FinalInner>
      </FinalSection>
    </Page>
  );
};

export default AboutUs;

/* PAGE */

const Page = styled.main`
  width: 100%;
  overflow: hidden;
  background: ${COLORS.background};
  color: ${COLORS.text};
  font-family: "Jost", "Helvetica Neue", Arial, sans-serif;
`;







/* ALTERNATING SECTIONS */

const SplitSection = styled.section`
  padding: clamp(64px, 8vw, 120px) 7vw;
  background: ${({ $tinted }) =>
    $tinted ? "#ECE8E0" : COLORS.background};

  @media (max-width: 768px) {
    padding: 64px 24px;
  }

  @media (max-width: 480px) {
    padding: 48px 20px;
  }
`;

const SplitInner = styled.div`
  width: 100%;
  max-width: 1240px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: minmax(0, 0.88fr) minmax(0, 1.12fr);
  grid-template-areas: ${({ $reverse }) =>
    $reverse ? '"image content"' : '"content image"'};
  gap: clamp(40px, 7vw, 110px);
  align-items: center;

  @media (max-width: 800px) {
    grid-template-columns: minmax(0, 1fr);
    grid-template-areas:
      "image"
      "content";
    gap: 32px;
  }
`;

const SplitContent = styled.div`
  grid-area: content;
  min-width: 0;
  direction: ${({ $rtl }) => ($rtl ? "rtl" : "ltr")};
  text-align: ${({ $rtl }) => ($rtl ? "right" : "left")};
`;

const ImageFrame = styled.figure`
  position: relative;
  grid-area: image;
  width: 100%;
  min-width: 0;
  margin: 0;
  overflow: hidden;
  background: #e9e3d9;
  aspect-ratio: 4 / 4.7;

  @media (max-width: 800px) {
    aspect-ratio: 5 / 4;
  }

  @media (max-width: 480px) {
    aspect-ratio: 4 / 3.6;
  }
`;

const SectionImage = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.8s cubic-bezier(0.2, 0.7, 0.2, 1);

  ${ImageFrame}:hover & {
    transform: scale(1.035);
  }
`;

const ImageIndex = styled.figcaption`
  position: absolute;
  bottom: 18px;
  inset-inline-end: 18px;
  padding: 9px 12px;
  color: #fff;
  background: rgba(35, 32, 28, 0.68);
  font-size: 9px;
  letter-spacing: 0.15em;
  backdrop-filter: blur(8px);
`;

/* TYPOGRAPHY */

const Eyebrow = styled.span`
  display: block;
  margin-bottom: 18px;
  color: #a8895e;
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.2em;
  line-height: 1.5;
  text-transform: uppercase;

  @media (max-width: 600px) {
    margin-bottom: 12px;
    font-size: 9px;
  }
`;

const SectionTitle = styled.h2`
  max-width: 560px;
  margin: 0 0 25px;
  color: ${COLORS.text};
  font-family: "Playfair Display", Georgia, serif;
  font-size: clamp(2.3rem, 4.2vw, 4rem);
  font-weight: 400;
  line-height: 1.08;
  letter-spacing: -0.04em;

  @media (max-width: 800px) {
    max-width: 650px;
    font-size: clamp(2.2rem, 7vw, 3.2rem);
  }

  @media (max-width: 480px) {
    font-size: clamp(2rem, 9vw, 2.8rem);
  }
`;

const Lead = styled.p`
  margin: 0 0 20px;
  color: #39352f;
  font-family: "Playfair Display", Georgia, serif;
  font-size: clamp(1.15rem, 1.7vw, 1.45rem);
  font-weight: 400;
  line-height: 1.55;
`;

const BodyText = styled.p`
  margin: 0 0 16px;
  color: ${COLORS.muted};
  font-size: 14px;
  line-height: 1.9;

  &:last-child {
    margin-bottom: 0;
  }

  @media (max-width: 600px) {
    font-size: 13px;
    line-height: 1.8;
  }
`;

/* APPROACH FEATURES */

const FeatureList = styled.div`
  margin-top: 32px;
  border-top: 1px solid ${COLORS.border};
`;

const Feature = styled.article`
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding: 19px 0;
  border-bottom: 1px solid ${COLORS.border};
`;

const FeatureIcon = styled.div`
  display: flex;
  flex: 0 0 38px;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  border: 1px solid ${COLORS.gold};
  border-radius: 50%;
  color: #a8895e;
  font-size: 17px;

  svg {
    font-size: inherit;
  }
`;

const FeatureCopy = styled.div`
  flex: 1;
  min-width: 0;
`;

const FeatureTitle = styled.h3`
  margin: 0 0 6px;
  color: ${COLORS.text};
  font-family: "Playfair Display", Georgia, serif;
  font-size: 19px;
  font-weight: 400;
  line-height: 1.35;
`;

const FeatureDescription = styled.p`
  margin: 0;
  color: ${COLORS.muted};
  font-size: 12px;
  line-height: 1.75;
`;

/* SELECTION */

const SelectionList = styled.div`
  margin-top: 30px;
  border-top: 1px solid rgba(41, 39, 35, 0.2);
`;

const SelectionItem = styled.article`
  display: grid;
  grid-template-columns: 38px minmax(0, 1fr);
  gap: 15px;
  padding: 23px 0;
  border-bottom: 1px solid rgba(41, 39, 35, 0.2);
`;

const SelectionNumber = styled.span`
  padding-top: 4px;
  color: #a8895e;
  font-size: 10px;
  letter-spacing: 0.12em;
`;

const SelectionCopy = styled.div`
  min-width: 0;
`;

const SelectionTitle = styled.h3`
  margin: 0 0 9px;
  color: ${COLORS.text};
  font-family: "Playfair Display", Georgia, serif;
  font-size: 21px;
  font-weight: 400;
  line-height: 1.3;
`;

/* FINAL CTA */

const FinalSection = styled.section`
  padding: clamp(70px, 9vw, 120px) 24px;
  background: linear-gradient(135deg, #e9e3d9, #f5f2ec);
  text-align: center;

  @media (max-width: 600px) {
    padding: 72px 22px;
  }
`;

const FinalInner = styled.div`
  max-width: 760px;
  margin: 0 auto;
  direction: ${({ $rtl }) => ($rtl ? "rtl" : "ltr")};
`;

const FinalTitle = styled.h2`
  max-width: 720px;
  margin: 0 auto;
  color: ${COLORS.text};
  font-family: "Playfair Display", Georgia, serif;
  font-size: clamp(2.5rem, 5vw, 4.5rem);
  font-weight: 400;
  line-height: 1.05;
  letter-spacing: -0.04em;

  @media (max-width: 600px) {
    font-size: clamp(2.3rem, 10vw, 3.2rem);
  }
`;

const FinalText = styled.p`
  max-width: 500px;
  margin: 22px auto 30px;
  color: ${COLORS.muted};
  font-size: 14px;
  line-height: 1.8;

  @media (max-width: 600px) {
    font-size: 13px;
  }
`;

const CollectionLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 13px;
  min-height: 48px;
  padding: 0 25px;
  background: ${COLORS.dark};
  color: ${COLORS.background};
  text-decoration: none;
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  transition:
    background 0.25s ease,
    gap 0.25s ease,
    transform 0.25s ease;

  &:hover {
    gap: 18px;
    background: #a8895e;
    transform: translateY(-2px);
  }

  &:focus-visible {
    outline: 2px solid ${COLORS.gold};
    outline-offset: 4px;
  }
`;

const Arrow = styled.span`
  font-size: 15px;
  line-height: 1;
`;
