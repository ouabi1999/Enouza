import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import styled from "styled-components";
import SEO from "../components/SEO/SEO";

const AboutUs = () => {
  const { t, i18n } = useTranslation();

  const isArabic = i18n.language?.startsWith("ar");

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <Page dir={isArabic ? "rtl" : "ltr"}>
      <SEO
        title={t("aboutus.seo.title")}
        description={t("aboutus.seo.description")}
        canonical="/about-us"
      />

      {/* =====================================================
          HERO
      ===================================================== */}

      <Hero>
        <HeroInner>
          <HeroEyebrow>
            {t("aboutus.hero.eyebrow")}
          </HeroEyebrow>

          <HeroTitle>
            {t("aboutus.hero.title")}
          </HeroTitle>

          <HeroDescription>
            {t("aboutus.hero.description")}
          </HeroDescription>

          <HeroLine />
        </HeroInner>
      </Hero>

      {/* =====================================================
          STORY
      ===================================================== */}

      <StorySection>
        <StoryGrid>
          <StoryIntro>
            <Eyebrow>
              {t("aboutus.story.eyebrow")}
            </Eyebrow>

            <StoryTitle>
              {t("aboutus.story.title")}
            </StoryTitle>
          </StoryIntro>

          <StoryContent>
            <StoryLead>
              {t("aboutus.story.lead")}
            </StoryLead>

            <StoryText>
              {t("aboutus.story.text")}
            </StoryText>

            <StoryText>
              {t("aboutus.story.text2")}
            </StoryText>
          </StoryContent>
        </StoryGrid>
      </StorySection>

      {/* =====================================================
          BRAND STATEMENT
      ===================================================== */}

      <StatementSection>
        <StatementInner>
          <StatementMark>✦</StatementMark>

          <Statement>
            {t("aboutus.statement.title")}
          </Statement>

          <StatementDescription>
            {t("aboutus.statement.description")}
          </StatementDescription>
        </StatementInner>
      </StatementSection>

      {/* =====================================================
          ENOUZA APPROACH
      ===================================================== */}

      <ApproachSection>
        <SectionHeader>
          <Eyebrow>
            {t("aboutus.approach.eyebrow")}
          </Eyebrow>

          <SectionTitle>
            {t("aboutus.approach.title")}
          </SectionTitle>
        </SectionHeader>

        <ApproachGrid>
          <ApproachItem>
            <ApproachNumber>01</ApproachNumber>

            <ApproachTitle>
              {t("aboutus.approach.curated.title")}
            </ApproachTitle>

            <ApproachText>
              {t("aboutus.approach.curated.description")}
            </ApproachText>
          </ApproachItem>

          <ApproachItem>
            <ApproachNumber>02</ApproachNumber>

            <ApproachTitle>
              {t("aboutus.approach.refined.title")}
            </ApproachTitle>

            <ApproachText>
              {t("aboutus.approach.refined.description")}
            </ApproachText>
          </ApproachItem>

          <ApproachItem>
            <ApproachNumber>03</ApproachNumber>

            <ApproachTitle>
              {t("aboutus.approach.atmospheric.title")}
            </ApproachTitle>

            <ApproachText>
              {t("aboutus.approach.atmospheric.description")}
            </ApproachText>
          </ApproachItem>

          <ApproachItem>
            <ApproachNumber>04</ApproachNumber>

            <ApproachTitle>
              {t("aboutus.approach.distinctive.title")}
            </ApproachTitle>

            <ApproachText>
              {t("aboutus.approach.distinctive.description")}
            </ApproachText>
          </ApproachItem>
        </ApproachGrid>
      </ApproachSection>

      {/* =====================================================
          SELECTION
      ===================================================== */}

      <SelectionSection>
        <SelectionHeader>
          <Eyebrow>
            {t("aboutus.selection.eyebrow")}
          </Eyebrow>

          <SelectionTitle>
            {t("aboutus.selection.title")}
          </SelectionTitle>
        </SelectionHeader>

        <SelectionList>
          <SelectionItem>
            <SelectionNumber>01</SelectionNumber>

            <SelectionContent>
              <SelectionItemTitle>
                {t("aboutus.selection.form.title")}
              </SelectionItemTitle>

              <SelectionText>
                {t("aboutus.selection.form.description")}
              </SelectionText>
            </SelectionContent>
          </SelectionItem>

          <SelectionItem>
            <SelectionNumber>02</SelectionNumber>

            <SelectionContent>
              <SelectionItemTitle>
                {t("aboutus.selection.material.title")}
              </SelectionItemTitle>

              <SelectionText>
                {t("aboutus.selection.material.description")}
              </SelectionText>
            </SelectionContent>
          </SelectionItem>

          <SelectionItem>
            <SelectionNumber>03</SelectionNumber>

            <SelectionContent>
              <SelectionItemTitle>
                {t("aboutus.selection.light.title")}
              </SelectionItemTitle>

              <SelectionText>
                {t("aboutus.selection.light.description")}
              </SelectionText>
            </SelectionContent>
          </SelectionItem>
        </SelectionList>
      </SelectionSection>

      {/* =====================================================
          PROMISE
      ===================================================== */}

      <PromiseSection>
        <PromiseInner>
          <Eyebrow>
            {t("aboutus.promise.eyebrow")}
          </Eyebrow>

          <PromiseTitle>
            {t("aboutus.promise.title")}
          </PromiseTitle>

          <PromiseText>
            {t("aboutus.promise.description")}
          </PromiseText>
        </PromiseInner>
      </PromiseSection>

      {/* =====================================================
          FINAL CTA
      ===================================================== */}

      <FinalSection>
        <FinalInner>
          <FinalEyebrow>
            {t("aboutus.final.eyebrow")}
          </FinalEyebrow>

          <FinalTitle>
            {t("aboutus.final.title")}
          </FinalTitle>

          <FinalText>
            {t("aboutus.final.description")}
          </FinalText>

          <CollectionLink to="/collections">
            <span>
              {t("aboutus.final.cta")}
            </span>

            <Arrow>
              {isArabic ? "←" : "→"}
            </Arrow>
          </CollectionLink>
        </FinalInner>
      </FinalSection>
    </Page>
  );
};

export default AboutUs;


/* =========================================================
   PAGE
========================================================= */

const Page = styled.main`
  width: 100%;
  overflow: hidden;

  background: #f7f5f0;

  color: #292723;

  font-family:
    "Jost",
    "Helvetica Neue",
    Arial,
    sans-serif;
`;


/* =========================================================
   SHARED
========================================================= */

const Eyebrow = styled.span`
  display: block;

  margin-bottom: 14px;

  color: #a8895e;

  font-family:
    "Helvetica Neue",
    Arial,
    sans-serif;

  font-size: 9px;

  font-weight: 600;

  letter-spacing: 0.22em;

  line-height: 1.4;

  text-transform: uppercase;

  @media (max-width: 600px) {
    font-size: 8px;

    letter-spacing: 0.18em;
  }
`;


/* =========================================================
   HERO
========================================================= */

const Hero = styled.section`
  min-height: 58vh;

  display: flex;

  align-items: center;

  justify-content: center;

  padding: 90px 24px;

  background:
    linear-gradient(
      145deg,
      #f9f7f3 0%,
      #f1eee7 55%,
      #e9e3da 100%
    );

  text-align: center;

  @media (max-width: 768px) {
    min-height: 54vh;

    padding: 75px 22px;
  }
`;


const HeroInner = styled.div`
  width: 100%;

  max-width: 720px;

  margin: 0 auto;
`;


const HeroEyebrow = styled(Eyebrow)`
  margin-bottom: 20px;
`;


const HeroTitle = styled.h1`
  margin: 0;

  color: #211f1c;

  font-family:
    "Playfair Display",
    Georgia,
    serif;

  font-size: clamp(
    2.8rem,
    6vw,
    5.2rem
  );

  font-weight: 400;

  line-height: 1;

  letter-spacing: -0.04em;

  @media (max-width: 600px) {
    font-size: clamp(
      2.5rem,
      12vw,
      3.8rem
    );
  }
`;


const HeroDescription = styled.p`
  max-width: 480px;

  margin: 24px auto 0;

  color: #68625a;

  font-size: 14px;

  line-height: 1.7;

  @media (max-width: 600px) {
    max-width: 360px;

    margin-top: 20px;

    font-size: 13px;
  }
`;


const HeroLine = styled.span`
  display: block;

  width: 38px;

  height: 1px;

  margin: 27px auto 0;

  background: #ad9067;
`;


/* =========================================================
   STORY
========================================================= */

const StorySection = styled.section`
  padding: 90px 7vw;

  background: #f7f5f0;

  @media (max-width: 768px) {
    padding: 70px 24px;
  }
`;


const StoryGrid = styled.div`
  width: 100%;

  max-width: 1080px;

  margin: 0 auto;

  display: grid;

  grid-template-columns:
    minmax(240px, 0.8fr)
    minmax(0, 1.2fr);

  gap: clamp(45px, 8vw, 110px);

  align-items: start;

  @media (max-width: 800px) {
    grid-template-columns: 1fr;

    gap: 30px;
  }
`;


const StoryIntro = styled.div`
  position: static;
`;


const StoryTitle = styled.h2`
  max-width: 390px;

  margin: 0;

  color: #292723;

  font-family:
    "Playfair Display",
    Georgia,
    serif;

  font-size: clamp(
    2rem,
    3.5vw,
    3.2rem
  );

  font-weight: 400;

  line-height: 1.08;

  letter-spacing: -0.03em;
`;


const StoryContent = styled.div`
  max-width: 570px;
`;


const StoryLead = styled.p`
  margin: 0 0 20px;

  color: #302d29;

  font-family:
    "Playfair Display",
    Georgia,
    serif;

  font-size: clamp(
    1.15rem,
    1.8vw,
    1.45rem
  );

  font-weight: 400;

  line-height: 1.45;
`;


const StoryText = styled.p`
  margin: 0 0 16px;

  color: #6b655d;

  font-size: 14px;

  line-height: 1.8;

  &:last-child {
    margin-bottom: 0;
  }
`;


/* =========================================================
   STATEMENT
========================================================= */

const StatementSection = styled.section`
  padding: 90px 24px;

  background: #292723;

  color: #f7f5f0;

  text-align: center;

  @media (max-width: 600px) {
    padding: 75px 24px;
  }
`;


const StatementInner = styled.div`
  max-width: 700px;

  margin: 0 auto;
`;


const StatementMark = styled.div`
  margin-bottom: 22px;

  color: #b89a6b;

  font-size: 12px;
`;


const Statement = styled.h2`
  max-width: 680px;

  margin: 0 auto;

  color: #f7f5f0;

  font-family:
    "Playfair Display",
    Georgia,
    serif;

  font-size: clamp(
    2rem,
    4vw,
    3.6rem
  );

  font-weight: 400;

  line-height: 1.1;

  letter-spacing: -0.03em;
`;


const StatementDescription = styled.p`
  max-width: 510px;

  margin: 22px auto 0;

  color: rgba(247, 245, 240, 0.65);

  font-size: 14px;

  line-height: 1.8;
`;


/* =========================================================
   APPROACH
========================================================= */

const ApproachSection = styled.section`
  padding: 90px 7vw;

  background: #f7f5f0;

  @media (max-width: 768px) {
    padding: 70px 24px;
  }
`;


const SectionHeader = styled.div`
  max-width: 1080px;

  margin: 0 auto 45px;
`;


const SectionTitle = styled.h2`
  max-width: 520px;

  margin: 0;

  color: #292723;

  font-family:
    "Playfair Display",
    Georgia,
    serif;

  font-size: clamp(
    2rem,
    3.8vw,
    3.5rem
  );

  font-weight: 400;

  line-height: 1.08;

  letter-spacing: -0.03em;
`;


const ApproachGrid = styled.div`
  max-width: 1080px;

  margin: 0 auto;

  display: grid;

  grid-template-columns:
    repeat(4, 1fr);

  border-top: 1px solid
    rgba(41, 39, 35, 0.14);

  @media (max-width: 900px) {
    grid-template-columns:
      repeat(2, 1fr);
  }

  @media (max-width: 520px) {
    grid-template-columns: 1fr;
  }
`;


const ApproachItem = styled.article`
  min-height: 190px;

  padding: 22px 22px 25px;

  border-bottom: 1px solid
    rgba(41, 39, 35, 0.14);

  &:not(:last-child) {
    border-inline-end: 1px solid
      rgba(41, 39, 35, 0.14);
  }

  @media (max-width: 900px) {
    &:nth-child(2) {
      border-inline-end: none;
    }

    &:nth-child(3) {
      border-inline-end: 1px solid
        rgba(41, 39, 35, 0.14);
    }

    &:nth-child(4) {
      border-inline-end: none;
    }
  }

  @media (max-width: 520px) {
    min-height: auto;

    padding: 25px 0;

    border-inline-end: none !important;
  }
`;


const ApproachNumber = styled.span`
  display: block;

  margin-bottom: 35px;

  color: #a8895e;

  font-size: 9px;

  letter-spacing: 0.14em;
`;


const ApproachTitle = styled.h3`
  margin: 0 0 10px;

  color: #292723;

  font-family:
    "Playfair Display",
    Georgia,
    serif;

  font-size: 21px;

  font-weight: 400;

  line-height: 1.2;
`;


const ApproachText = styled.p`
  max-width: 220px;

  margin: 0;

  color: #6b655d;

  font-size: 12px;

  line-height: 1.7;
`;


/* =========================================================
   SELECTION
========================================================= */

const SelectionSection = styled.section`
  padding: 90px 7vw;

  background: #ece8e0;

  @media (max-width: 768px) {
    padding: 70px 24px;
  }
`;


const SelectionHeader = styled.div`
  max-width: 1080px;

  margin: 0 auto 45px;
`;


const SelectionTitle = styled.h2`
  max-width: 570px;

  margin: 0;

  color: #292723;

  font-family:
    "Playfair Display",
    Georgia,
    serif;

  font-size: clamp(
    2rem,
    3.8vw,
    3.5rem
  );

  font-weight: 400;

  line-height: 1.08;

  letter-spacing: -0.03em;
`;


const SelectionList = styled.div`
  max-width: 1080px;

  margin: 0 auto;

  border-top: 1px solid
    rgba(41, 39, 35, 0.18);
`;


const SelectionItem = styled.div`
  display: grid;

  grid-template-columns: 65px 1fr;

  gap: 25px;

  padding: 27px 0;

  border-bottom: 1px solid
    rgba(41, 39, 35, 0.18);

  @media (max-width: 600px) {
    grid-template-columns: 40px 1fr;

    gap: 15px;

    padding: 23px 0;
  }
`;


const SelectionNumber = styled.span`
  padding-top: 3px;

  color: #a8895e;

  font-size: 9px;

  letter-spacing: 0.14em;
`;


const SelectionContent = styled.div`
  display: grid;

  grid-template-columns:
    minmax(150px, 0.5fr)
    minmax(0, 1fr);

  gap: 30px;

  @media (max-width: 650px) {
    grid-template-columns: 1fr;

    gap: 7px;
  }
`;


const SelectionItemTitle = styled.h3`
  margin: 0;

  color: #292723;

  font-family:
    "Playfair Display",
    Georgia,
    serif;

  font-size: 21px;

  font-weight: 400;
`;


const SelectionText = styled.p`
  max-width: 480px;

  margin: 0;

  color: #6b655d;

  font-size: 13px;

  line-height: 1.7;
`;


/* =========================================================
   PROMISE
========================================================= */

const PromiseSection = styled.section`
  padding: 95px 24px;

  background: #f7f5f0;

  text-align: center;

  @media (max-width: 600px) {
    padding: 75px 24px;
  }
`;


const PromiseInner = styled.div`
  max-width: 650px;

  margin: 0 auto;
`;


const PromiseTitle = styled.h2`
  max-width: 620px;

  margin: 0 auto;

  color: #292723;

  font-family:
    "Playfair Display",
    Georgia,
    serif;

  font-size: clamp(
    2rem,
    4vw,
    3.6rem
  );

  font-weight: 400;

  line-height: 1.08;

  letter-spacing: -0.03em;
`;


const PromiseText = styled.p`
  max-width: 500px;

  margin: 20px auto 0;

  color: #6b655d;

  font-size: 14px;

  line-height: 1.8;
`;


/* =========================================================
   FINAL CTA
========================================================= */

const FinalSection = styled.section`
  padding: 85px 24px;

  background:
    linear-gradient(
      135deg,
      #e9e3d9,
      #f5f2ec
    );

  text-align: center;

  @media (max-width: 600px) {
    padding: 70px 24px;
  }
`;


const FinalInner = styled.div`
  max-width: 720px;

  margin: 0 auto;
`;


const FinalEyebrow = styled(Eyebrow)`
  margin-bottom: 18px;
`;


const FinalTitle = styled.h2`
  max-width: 700px;

  margin: 0 auto;

  color: #292723;

  font-family:
    "Playfair Display",
    Georgia,
    serif;

  font-size: clamp(
    2.2rem,
    4.5vw,
    4rem
  );

  font-weight: 400;

  line-height: 1.05;

  letter-spacing: -0.035em;
`;


const FinalText = styled.p`
  max-width: 480px;

  margin: 20px auto 28px;

  color: #6b655d;

  font-size: 14px;

  line-height: 1.75;
`;


const CollectionLink = styled(Link)`
  display: inline-flex;

  align-items: center;

  justify-content: center;

  gap: 12px;

  min-height: 44px;

  padding: 0 22px;

  background: #292723;

  color: #f7f5f0;

  text-decoration: none;

  font-size: 9px;

  font-weight: 500;

  letter-spacing: 0.15em;

  text-transform: uppercase;

  transition:
    background 0.25s ease,
    gap 0.25s ease;

  &:hover {
    background: #a8895e;

    gap: 16px;
  }
`;


const Arrow = styled.span`
  font-size: 14px;

  line-height: 1;
`;