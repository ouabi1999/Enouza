import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";

const MainSlider = () => {
  const { t } = useTranslation();
  const videoRef = useRef(null);
  const [loadVideo, setLoadVideo] = useState(false);

  const videoUrl = "https://res.cloudinary.com/dzpzy1o1y/video/upload/v1790536327/Aure_Portable_Lamp_Travertine_Stone_Linen_-_Blossholm_3_c7eahz.mp4"

  // Optimized Cloudinary poster
  const posterUrl =
    "https://res.cloudinary.com/dzpzy1o1y/image/upload/v1790529844/ChatGPT_Image_Sep_27_2026_07_23_04_PM_csaple.png";

  /*
   * Let the poster render first.
   * Load the video after the initial page becomes usable.
   */
  useEffect(() => {
    const loadTimer = setTimeout(() => {
      setLoadVideo(true);
    }, 1200);

    return () => clearTimeout(loadTimer);
  }, []);

  /*
   * Start playback once the video source has been mounted.
   */
  useEffect(() => {
    if (!loadVideo || !videoRef.current) return;

    const video = videoRef.current;

    const playVideo = async () => {
      try {
        await video.play();
      } catch (error) {
        // Autoplay can be blocked by some browsers.
      }
    };

    if (video.readyState >= 2) {
      playVideo();
    } else {
      video.addEventListener("canplay", playVideo, { once: true });

      return () => {
        video.removeEventListener("canplay", playVideo);
      };
    }
  }, [loadVideo]);

  return (
    <Container>
    
        <video
        className="video"
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={posterUrl}
          aria-label="Enouza luxury home lighting and interior design"
        >
          <source src={videoUrl} type="video/mp4" />
        </video>
   
        <Poster
          src={posterUrl}
          alt="Enouza luxury home lighting and interior design"
          width="1200"
          height="675"
          decoding="async"
          className="poster"
        />

      <Overlay>
        <h1>{t("mainSlider.title")}</h1>

        <span>{t("mainSlider.description")}</span>

        <bdi>
          <h5>{t("mainSlider.welcome")}</h5>
        </bdi>
      </Overlay>
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
  video{
    display:none;
   
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  @media only screen and (max-width: 850px) {
    min-width: 315px;
    height: 500px;
  }

  @media only screen and (max-width: 420px) {
    min-width: 290px;
    height: 450px;

    img{
    display:none;
    }
    video{
    display:block;
     width: 100%;
    height: 100%;
    object-fit: cover;
    }
  }
`;

const Poster = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Overlay = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  z-index: 1;

  width: 90%;

  color: #fff;
  text-align: center;

  font-family: "Playfair Display", serif;

  h1 {
    margin: 0 0 12px;
  }

  span {
    display: block;
  }

  h5 {
    margin-top: 18px;
  }
`;