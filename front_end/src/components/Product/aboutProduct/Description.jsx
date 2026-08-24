import React from "react";
import styled from "styled-components";

// Static professional description (HTML)
const PROFESSIONAL_DESCRIPTION = `
  <p>
    ENOUZA embodies the pinnacle of artisanal craftsmanship, where each piece is a testament to timeless elegance and meticulous attention to detail. Our collections are born from a harmonious blend of heritage techniques and contemporary vision, using only the finest materials sourced from the world’s most revered ateliers.
  </p>
  <h3>Uncompromising Quality</h3>
  <p>
    From the supple hand‑finished leathers to the precision‑cut gemstones, every component is chosen for its exceptional character and durability. Our master artisans devote weeks to perfecting each creation, ensuring that every stitch, seam, and setting meets the exacting standards that define the ENOUZA name.
  </p>
  <ul>
    <li>Hand‑picked, full‑grain Italian leather</li>
    <li>18‑karat gold hardware with anti‑tarnish coating</li>
    <li>Natural, ethically sourced precious stones</li>
    <li>Reinforced stitching for enduring strength</li>
  </ul>
  <blockquote>
    “Luxury is in each detail – a philosophy we honour in every collection.”
  </blockquote>
  <p>
    Each design tells a story of passion and precision, destined to become a cherished heirloom. Experience the ENOUZA difference – where heritage meets modernity, and every piece is crafted not just to be worn, but to be admired for a lifetime.
  </p>
`;

function Description() {
  return (
    <Container>
      <SectionHeader>
        <Eyebrow>ENOUZA</Eyebrow>
        <Title>Product Description</Title>
        <Accent />
      </SectionHeader>

      <DescriptionContent
        dangerouslySetInnerHTML={{ __html: PROFESSIONAL_DESCRIPTION }}
      />
    </Container>
  );
}

export default Description;

/* =========================================================
   STYLES (unchanged – only header & typography kept)
========================================================= */

const Container = styled.section`
  width: 100%;
  max-width: 1100px;
  margin: 0 auto;
  padding: 70px 28px 80px;
  box-sizing: border-box;
  color: #29251f;

  @media (max-width: 768px) {
    padding: 52px 20px 60px;
  }

  @media (max-width: 480px) {
    padding: 42px 16px 50px;
  }
`;

const SectionHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 48px;
  text-align: center;

  @media (max-width: 768px) {
    margin-bottom: 36px;
  }
`;

const Eyebrow = styled.span`
  margin-bottom: 9px;
  color: #a88a62;
  font-family: "Cormorant Garamond", Georgia, "Times New Roman", serif;
  font-size: 9px;
  font-weight: 500;
  letter-spacing: 0.42em;
  line-height: 1;
`;

const Title = styled.h2`
  margin: 0;
  color: #211e1a;
  font-family: "Cormorant Garamond", Georgia, "Times New Roman", serif;
  font-size: clamp(28px, 4vw, 40px);
  font-weight: 400;
  line-height: 1.05;
  letter-spacing: 0.015em;
`;

const Accent = styled.span`
  width: 28px;
  height: 1px;
  margin-top: 14px;
  background: #a88a62;
`;

const DescriptionContent = styled.div`
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
  color: #4b443d;
  font-family: "Cormorant Garamond", Georgia, "Times New Roman", serif;
  font-size: 18px;
  font-weight: 400;
  line-height: 1.85;
  letter-spacing: 0.008em;

  p {
    margin: 0 0 24px;
    &:last-child {
      margin-bottom: 0;
    }
  }

  h1, h2, h3, h4, h5, h6 {
    margin: 42px 0 18px;
    color: #29251f;
    font-family: "Cormorant Garamond", Georgia, "Times New Roman", serif;
    font-weight: 500;
    line-height: 1.2;
    letter-spacing: 0.015em;
    &:first-child {
      margin-top: 0;
    }
  }

  h1 { font-size: 30px; }
  h2 { font-size: 27px; }
  h3 { font-size: 24px; }
  h4 { font-size: 21px; }
  h5, h6 { font-size: 19px; }

  img {
    display: block;
    width: auto;
    max-width: 100%;
    height: auto;
    margin: 38px auto;
    object-fit: contain;
    border-radius: 1px;
  }

  figure {
    margin: 42px 0;
    text-align: center;
    img { margin: 0 auto 12px; }
    figcaption {
      color: #9a8d7f;
      font-family: Arial, Helvetica, sans-serif;
      font-size: 9px;
      line-height: 1.6;
      letter-spacing: 0.1em;
      text-transform: uppercase;
    }
  }

  ul, ol {
    margin: 24px 0;
    padding-left: 28px;
  }

  ul {
    list-style: none;
    li {
      position: relative;
      margin-bottom: 11px;
      padding-left: 18px;
      &::before {
        content: "";
        position: absolute;
        left: 0;
        top: 0.78em;
        width: 4px;
        height: 4px;
        border-radius: 50%;
        background: #a88a62;
      }
    }
  }

  ol {
    list-style-position: outside;
  }

  li {
    margin-bottom: 10px;
    padding-left: 4px;
  }

  strong, b {
    color: #29251f;
    font-weight: 600;
  }

  em, i {
    color: #766a5d;
  }

  a {
    color: #8f7655;
    text-decoration: none;
    border-bottom: 1px solid rgba(168, 138, 98, 0.4);
    transition: color 0.2s ease, border-color 0.2s ease;
    &:hover {
      color: #5f4b35;
      border-color: #8f7655;
    }
  }

  blockquote {
    margin: 38px 0;
    padding: 6px 0 6px 28px;
    border-left: 1px solid #a88a62;
    color: #62584e;
    font-size: 22px;
    font-style: italic;
    line-height: 1.65;
  }

  hr {
    width: 100%;
    height: 1px;
    margin: 42px 0;
    border: 0;
    background: #e4ded6;
  }

  table {
    width: 100%;
    margin: 34px 0;
    border-collapse: collapse;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 13px;
    line-height: 1.6;
  }

  th, td {
    padding: 13px 14px;
    border-bottom: 1px solid #e4ded6;
    text-align: left;
  }

  th {
    color: #29251f;
    font-size: 10px;
    font-weight: 500;
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }

  td {
    color: #665d54;
  }



  @media (max-width: 768px) {
    font-size: 17px;
    line-height: 1.8;
    h1 { font-size: 27px; }
    h2 { font-size: 24px; }
    h3 { font-size: 22px; }
    img { width: 100%; margin: 30px auto; }
    blockquote { margin: 30px 0; padding-left: 20px; font-size: 19px; }
  }

  @media (max-width: 480px) {
    font-size: 16px;
    line-height: 1.78;
    ul, ol { padding-left: 22px; }
    table { display: block; overflow-x: auto; white-space: nowrap; }
    > p:first-child::first-letter { font-size: 44px; }
  }
`;