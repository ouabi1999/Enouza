
import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { toggleCategory } from "../../features/filterSlice";
import {
  optimizeCloudinaryImage,
  optimizeCloudinaryVideo,
} from "../../utilis/cloudinary";
import { Link } from "react-router-dom";

const MainSlider = () => {
  const { t } = useTranslation();
  const videoRef = useRef(null);
  const dispatch = useDispatch();

  const videoUrl =
    "https://res.cloudinary.com/dzpzy1o1y/video/upload/v1790536327/Aure_Portable_Lamp_Travertine_Stone_Linen_-_Blossholm_3_c7eahz.mp4";

  const posterUrl =
    "https://res.cloudinary.com/dzpzy1o1y/image/upload/v1790529844/ChatGPT_Image_Sep_27_2026_07_23_04_PM_csaple.png";

  const videoUrl2 =
    "https://res.cloudinary.com/dzpzy1o1y/video/upload/v1786567618/About_iiabi5.mp4";

  useEffect(() => {
    videoRef.current?.play().catch(() => {});
  }, []);

  return (
    <Container>
      <video
        className="mobile-video"
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster={optimizeCloudinaryImage(posterUrl, { width: 1820 })}
        aria-label="Enouza luxury home lighting and interior design"
      >
        <source src={optimizeCloudinaryVideo(videoUrl)} type="video/mp4" />
      </video>

      <Poster>
        <video
          className="desktop-video"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={optimizeCloudinaryImage(posterUrl, { width: 1820 })}
          aria-label="Enouza luxury home lighting and interior design"
        >
          <source src={optimizeCloudinaryVideo(videoUrl2)} type="video/mp4" />
        </video>
      </Poster>

      {/* Subtle overlay to improve text readability */}
      <OverlayBackground />

      <Overlay>
        <bdi>
        <h1>{t("mainSlider.title")}</h1>
        <span>{t("mainSlider.description")}</span>
         
          <h5>{t("mainSlider.welcome")}</h5>
        </bdi>
      </Overlay>

      <ShopNowButton
        to="/collections?category=table_lamps"
        onClick={() => dispatch(toggleCategory("table_lamps"))}
      >
        {t("profile.start_shopping")}
      </ShopNowButton>
    </Container>
  );
};

export default MainSlider;

const Container = styled.div`
  position: relative;
  width: 100%;
  min-width: 200px;
  height: 550px;
  overflow: hidden;
  background: #24231f;

  .mobile-video {
    display: none;
  }

  .desktop-video {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  @media only screen and (max-width: 850px) {
    min-width: 315px;
    height: 500px;
  }

  @media only screen and (max-width: 445px) {
    min-width: 290px;
    height: 450px;

    .desktop-video {
      display: none;
    }

    .mobile-video {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
`;

const Poster = styled.div`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

/* Minimal dark gradient for readable text */
const OverlayBackground = styled.div`
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;

  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.22) 0%,
    rgba(0, 0, 0, 0.12) 35%,
    rgba(0, 0, 0, 0.42) 100%
  );
`;

const Overlay = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;

  width: 90%;
  max-width: 850px;

  color: #fff;
  text-align: center;
  font-family: "Playfair Display", serif;

  h1 {
    margin: 0 0 16px;
    font-size: clamp(34px, 4.2vw, 58px);
    font-weight: 400;
    line-height: 1.2;
    letter-spacing: 0.3px;
    text-shadow: 0 2px 14px rgba(0, 0, 0, 0.45);
  }

  span {
    display: block;
    max-width: 650px;
    margin: 0 auto;
    font-family: "Cormorant Garamond", Georgia, serif;
    font-size: clamp(18px, 2vw, 23px);
    line-height: 1.6;
    text-shadow: 0 1px 10px rgba(0, 0, 0, 0.65);
  }

  h5 {
    margin-top: 20px;
    font-family: Arial, sans-serif;
    font-size: 10px;
    font-weight: 400;
    letter-spacing: 2.5px;
    line-height: 1.8;
    text-transform: uppercase;
    text-shadow: 0 1px 8px rgba(0, 0, 0, 0.65);
  }

  @media only screen and (max-width: 850px) {
    width: 88%;

    h1 {
      font-size: 38px;
    }

    span {
      font-size: 18px;
    }
  }

  @media only screen and (max-width: 445px) {
    width: 90%;

    h1 {
      margin-bottom: 12px;
      font-size: 27px;
      line-height: 1.3;
      letter-spacing: 0;
    }

    span {
      max-width: 330px;
      font-size: 15px;
      line-height: 1.55;
    }

    h5 {
      margin-top: 14px;
      font-size: 8px;
      letter-spacing: 1.5px;
      line-height: 1.7;
    }
  }

  @media only screen and (max-width: 350px) {
    h1 {
      font-size: 24px;
    }

    span {
      font-size: 14px;
    }
  }
`;

const ShopNowButton = styled(Link)`
  color: #ffffff;
  font-family: "Playfair Display", serif;

  padding: 10px 18px;
  border: 1px solid rgba(255, 255, 255, 0.9);

  position: absolute;
  cursor: pointer;
  text-wrap: nowrap;
  text-transform: uppercase;
  font-size: 12px;
  letter-spacing: 1px;

  z-index: 1;
  top: 90%;
  left: 50%;
  transform: translate(-50%, -50%);

  background: rgba(0, 0, 0, 0.12);
  backdrop-filter: blur(3px);
  -webkit-backdrop-filter: blur(3px);

  transition:
    background 0.25s ease,
    color 0.25s ease,
    border-color 0.25s ease;

  &:hover {
    color: #e6d2a8;
    border-color: #e6d2a8;
    background: rgba(0, 0, 0, 0.3);
  }

  &:focus-visible {
    outline: 2px solid #e6d2a8;
    outline-offset: 4px;
  }

  @media only screen and (max-width: 445px) {
    top: 89%;
    padding: 9px 14px;
    font-size: 10px;
    letter-spacing: 0.7px;
  }
`;
