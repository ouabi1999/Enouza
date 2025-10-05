import React, { useLayoutEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import HeadeSeo from "../../../common/HeadeSeo";

function TermsOfServices() {
  const { t } = useTranslation("terms", { returnObjects: true });

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0 });
  }, []);

  // Grab structured JSON from i18next
  const title = t("terms.title");
  const seoTitle = t("terms.seoTitle");
  const overview = t("terms.overview");
  const sections = t("terms.sections");

  return (
    <Container>
      <HeadeSeo title={seoTitle} />
      <h2>{title}</h2>

      {/* Overview */}
      <h3>{overview.title}</h3>
      <p>{overview.p1}</p>
      <p>{overview.p2}</p>
      <p>{overview.p3}</p>
      <p>{overview.p4}</p>

      {/* Dynamic sections */}
      {Object.entries(sections)?.map(([key, section]) => (
        <div key={key}>
          <h5>{section.title}</h5>
          <p>
            {section.text?.includes("Returns Policy") ? (
              <Link to="/return-policy">{section.text}</Link>
            ) : section.text?.includes("Privacy Policy") ? (
              <Link to="/privacy-policy">{section.text}</Link>
            ) : (
              section.text
            )}
          </p>

        </div>
      ))}
    </Container>
  );
}

export default TermsOfServices;

const Container = styled.div`
  width: calc(100% - 30px);
  min-height: 100vh;
  margin: 10px auto;
  padding: 10px 15px;
  background: linear-gradient(to right, #e9e4f0, #d3cce3);

  p {
    font-size: 1rem;
    line-height: 1.6;
    color: #333;
  }

  a {
    word-break: break-word;
    color: #0073e6;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }

  h2 {
    font-weight: 900;
    font-size: 2.5rem;
    margin: auto;
    display: flex;
    justify-content: center;
    color: #2c2c2c;
  }

  h5 {
    font-weight: bolder;
    font-size: 1.8rem;
    border-bottom: 2px solid lightgray;
    width: fit-content;
    padding: 5px 0;
    color: #555;
  }

  @media (max-width: 992px) {
    h2 {
      font-size: 2.2rem;
    }
    h5 {
      font-size: 1.6rem;
    }
  }

  @media (max-width: 768px) {
    padding: 6px;
    h2 {
      font-size: 2rem;
    }
    h5 {
      font-size: 1.4rem;
    }
    p {
      font-size: 0.9rem;
    }
  }

  @media (max-width: 576px) {
    padding: 5px;
    h2 {
      font-size: 1.8rem;
    }
    h5 {
      font-size: 1.2rem;
    }
    p {
      font-size: 0.8rem;
    }
  }
`;
