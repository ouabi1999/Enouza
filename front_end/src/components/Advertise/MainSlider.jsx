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
  const { t, i18n } = useTranslation();
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
    <Container dir={i18n.dir()}>
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

      <Overlay>
        <h1>{t("mainSlider.title")}</h1>
        <p>{t("mainSlider.description")}</p>
        <ShopNowButton to="/collections" onClick={() => dispatch(toggleCategory(""))}>
          {t("profile.start_shopping")}
        </ShopNowButton>
      </Overlay>
    </Container>
  );
};

export default MainSlider;

const Container = styled.div`
  position: relative;
  isolation: isolate;
  display: grid;
  align-items: end;
  justify-items: start;
  box-sizing: border-box;
  min-height: clamp(450px, 48vw, 550px);
  padding: clamp(24px, 5vw, 56px);
  overflow: hidden;
  background: #24231f;

  video,
  &::before {
    position: absolute;
    inset: 0;
  }

  video {
    z-index: -2;
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &::before {
    z-index: -1;
    content: "";
    background: linear-gradient(to bottom, transparent 30%, #171512e6 100%);
    pointer-events: none;
  }

  .mobile-video {
    display: none;
  }

  @media (max-width: 445px) {
    .desktop-video {
      display: none;
    }

    .mobile-video {
      display: block;
    }
  }
`;

const Overlay = styled.div`
  display: grid;
  justify-items: start;
  gap: 8px;
  max-width: 420px;
  color: #fff;
  text-align: start;

  h1 {
    margin: 0;
    font-family: "Cormorant Garamond", Georgia, serif;
    font-size: clamp(22px, 2.5vw, 34px);
    font-weight: 500;
    line-height: 1.15;
  }

  p {
    max-width: 44ch;
    margin: 0;
    font-size: 14px;
    line-height: 1.5;
    text-wrap: pretty;
  }
`;

const ShopNowButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  min-height: 44px;
  color: #fff;
  font-size: 13px;
  font-weight: 600;
  line-height: 1.3;
  text-decoration: underline;
  text-underline-offset: 5px;

  &:hover {
    color: #ead6b9;
  }

  &:focus-visible {
    outline: 2px solid #fff;
    outline-offset: 4px;
  }
`;
