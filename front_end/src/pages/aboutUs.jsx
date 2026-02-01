import React from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

const AboutUs = () => {
  const { t, i18n } = useTranslation("aboutus", { returnObjects: true });

  return (
    <Container
      className="about-us"
      dir={i18n.language === "ar" ? "rtl" : "ltr"}
    >
      <div className="container">
        <h1>{t("about.title")}</h1>

        <p className="lead">{t("about.intro")}</p>

        <p>{t("about.passion")}</p>

        <h2>{t("about.visionTitle")}</h2>
        <p>{t("about.visionText")}</p>

        <h2>{t("about.qualityTitle")}</h2>
        <p>{t("about.qualityText")}</p>

        <h2>{t("about.whyTitle")}</h2>
        <ul className="why-list">
          <li>{t("about.why.items.0")}</li>
          <li>{t("about.why.items.1")}</li>
          <li>{t("about.why.items.2")}</li>
          <li>{t("about.why.items.3")}</li>
          <li>{t("about.why.items.4")}</li>
        </ul>

        <h2>{t("about.modernTitle")}</h2>
        <p>{t("about.modernText")}</p>

        <p className="closing">{t("about.closing")}</p>
      </div>
    </Container>
  );
};

export default AboutUs;
const Container = styled.div`
padding: 40px 20px;
.about-us {
  padding: 80px 20px;
  background-color: #fafafa;
  color: #1a1a1a;
  font-family: "Inter", "Helvetica Neue", Arial, sans-serif;
}

.about-us .container {
  max-width: 900px;
  margin: 0 auto;
}

/* Titles */
.about-us h1 {
  font-size: 2.8rem;
  font-weight: 600;
  margin-bottom: 24px;
  letter-spacing: -0.5px;
  text-align: center;
  width:100%;
}

.about-us h2 {
  font-size: 1.6rem;
  font-weight: 500;
  margin-top: 48px;
  margin-bottom: 16px;
  letter-spacing: -0.3px;
}

/* Text */
.about-us p {
  font-size: 1.05rem;
  line-height: 1.9;
  margin-bottom: 20px;
  color: #333;
}

.about-us .lead {
  font-size: 1.25rem;
  font-weight: 400;
  color: #111;
  margin-bottom: 28px;
}

/* Why list */
.why-list {
  list-style: none;
  padding: 0;
  margin: 24px 0;
}

.why-list li {
  font-size: 1rem;
  padding: 12px 0;
  border-bottom: 1px solid #e5e5e5;
  display: flex;
  align-items: center;
}

.why-list li::before {
  content: "✦";
  margin-right: 12px;
  color: #b89b5e; /* luxury gold accent */
  font-size: 0.9rem;
}

/* Closing line */
.about-us .closing {
  margin-top: 48px;
  font-size: 1.15rem;
  font-weight: 500;
  color: #000;
}

/* RTL support (Arabic) */
.about-us[dir="rtl"] {
  text-align: right;
}

.about-us[dir="rtl"] .why-list li::before {
  margin-right: 0;
  margin-left: 12px;
}

/* Responsive */
@media (max-width: 768px) {
  .about-us {
    padding: 60px 16px;
  }

  .about-us h1 {
    font-size: 2.2rem;
  }

  .about-us h2 {
    font-size: 1.4rem;
  }

  .about-us .lead {
    font-size: 1.15rem;
  }
}


`