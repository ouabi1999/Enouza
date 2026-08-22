import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence } from "motion/react";
import * as motion from "motion/react-client";
import styled from "styled-components";
import { useTranslation } from "react-i18next";

import FullscreenIcon from "@mui/icons-material/Fullscreen";
import CloseIcon from "@mui/icons-material/Close";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

function MainImages(props) {
  const {
    colorIndex,
    currentSku,
    productData,
    picsDetailsIndex,
    selectPicsDetails,
    isPicsDetailsActive,
    isColorActive,
  } = props;

  const { t, i18n } = useTranslation();

  /*
    Arabic = RTL
    Everything else = LTR
  */
  const isRTL = i18n.language === "ar";

  const [isFullscreen, setIsFullscreen] = useState(false);

  const images =
    productData?.multimediaInfo?.image_urls
      ?.split(";")
      ?.filter(Boolean) || [];

  const activeImage = isColorActive
    ? currentSku?.attributes?.[currentSku?.colorKey]?.image
    : isPicsDetailsActive
      ? images[picsDetailsIndex]
      : images[0];

  const currentIndex = isColorActive
    ? 0
    : isPicsDetailsActive
      ? picsDetailsIndex
      : 0;

  /* =========================================================
     OPEN FULLSCREEN
  ========================================================= */

  const openFullscreen = () => {
    if (!activeImage) return;

    setIsFullscreen(true);
  };

  /* =========================================================
     CLOSE FULLSCREEN
  ========================================================= */

  const closeFullscreen = () => {
    setIsFullscreen(false);
  };

  /* =========================================================
     ESC KEY
  ========================================================= */

  useEffect(() => {
    if (!isFullscreen) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        closeFullscreen();
      }

      if (event.key === "ArrowLeft") {
        handlePrevious();
      }

      if (event.key === "ArrowRight") {
        handleNext();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);

      document.body.style.overflow = "";
    };
  }, [isFullscreen, currentIndex, images.length]);

  /* =========================================================
     PREVIOUS
  ========================================================= */

  const handlePrevious = () => {
    if (!images.length) return;

    const previousIndex =
      currentIndex <= 0
        ? images.length - 1
        : currentIndex - 1;

    selectPicsDetails(previousIndex);
  };

  /* =========================================================
     NEXT
  ========================================================= */

  const handleNext = () => {
    if (!images.length) return;

    const nextIndex =
      currentIndex >= images.length - 1
        ? 0
        : currentIndex + 1;

    selectPicsDetails(nextIndex);
  };

  /* =========================================================
     FULLSCREEN IMAGE CLICK
  ========================================================= */

  const handleFullscreenBackgroundClick = (event) => {
    if (event.target === event.currentTarget) {
      closeFullscreen();
    }
  };

  return (
    <>
      <Container>
        <Gallery>

          {/* =====================================================
              THUMBNAILS
          ===================================================== */}

          <ImageDetailsContainer>
            {images.map((img, index) => {
              const isActive =
                !isColorActive &&
                picsDetailsIndex === index &&
                isPicsDetailsActive;

              return (
                <Thumbnail
                  key={`${img}-${index}`}
                  $active={isActive}
                  onMouseEnter={() =>
                    selectPicsDetails(index)
                  }
                  onClick={() =>
                    selectPicsDetails(index)
                  }
                  type="button"
                >
                  <img
                    src={img}
                    alt={`${productData?.name || "Product"} ${index + 1
                      }`}
                  />
                </Thumbnail>
              );
            })}
          </ImageDetailsContainer>

          {/* =====================================================
              MAIN IMAGE
          ===================================================== */}

          <ProductImg>

            {/* =================================================
                TOP LEFT TEXT
            ================================================= */}

            <TopLeftLabel $rtl={isRTL}>
              <Brand>
                ENOUZA
              </Brand>

              <LabelLine />

              <Details >
                {t("productInfo.product_details")}
              </Details>
            </TopLeftLabel>

            {/* =================================================
                CENTER IMAGE
            ================================================= */}

            <ImageViewport>

              <NavigationButton
                $left
                type="button"
                onClick={handlePrevious}
                aria-label="Previous image"
              >
                <ChevronLeftIcon />
              </NavigationButton>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeImage}
                  initial={{
                    opacity: 0,
                    scale: 0.97,
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.97,
                  }}
                  transition={{
                    duration: 0.35,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {activeImage && (
                    <MainImage
                      src={activeImage}
                      alt={
                        productData?.name || "Product"
                      }
                    />
                  )}
                </motion.div>
              </AnimatePresence>

              <NavigationButton
                type="button"
                onClick={handleNext}
                aria-label="Next image"
              >
                <ChevronRightIcon />
              </NavigationButton>

            </ImageViewport>

            {/* =================================================
                BOTTOM LEFT PROGRESS
            ================================================= */}

            <ProgressContainer>
              <CurrentNumber>
                {String(currentIndex + 1).padStart(
                  2,
                  "0"
                )}
              </CurrentNumber>

              <ProgressTrack>
                <ProgressBar
                  $progress={
                    images.length
                      ? ((currentIndex + 1) /
                        images.length) *
                      100
                      : 0
                  }
                />
              </ProgressTrack>

              <TotalNumber>
                {String(images.length).padStart(
                  2,
                  "0"
                )}
              </TotalNumber>
            </ProgressContainer>

            {/* =================================================
                BOTTOM RIGHT VIEW BUTTON
            ================================================= */}

            <FullscreenButton
              type="button"
              onClick={openFullscreen}
              aria-label="View image fullscreen"
            >
              <FullscreenIcon />

              <ViewText>
                {t("common.view")}
              </ViewText>
            </FullscreenButton>

          </ProductImg>
        </Gallery>
      </Container>

      {/* =======================================================
          FULLSCREEN OVERLAY
      ======================================================= */}

      {isFullscreen &&
        typeof document !== "undefined" &&
        createPortal(
          <FullscreenOverlay
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            transition={{
              duration: 0.35,
            }}
          >

            {/* =================================================
                    FULLSCREEN TOP
                ================================================= */}

            <FullscreenTop>
              <FullscreenCollection>
                {t(
                  "footer.newsletter.eyebrow"
                )}
              </FullscreenCollection>

              <CloseButton
                type="button"
                onClick={() =>
                  setIsFullscreen(false)
                }
                aria-label="Close fullscreen gallery"
              >
                ×
              </CloseButton>
            </FullscreenTop>

            {/* =================================================
                    FULLSCREEN CONTENT
                ================================================= */}

            <FullscreenContent>
              <FullscreenImage>
              <motion.img key={activeImage} 
              src={activeImage} alt={productData?.name || "Product"} 
              initial={{ opacity: 0, scale: 0.96, }} 
              animate={{ opacity: 1, scale: 1, }} 
              exit={{ opacity: 0, scale: 0.96, }} 
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1], }} />
               </FullscreenImage>
              {images.length > 1 &&
                !isColorActive && (
                  <>
                    <FullscreenNavigation
                      $position="left"
                      type="button"
                      onClick={
                        handlePrevious
                      }
                      aria-label="Previous image"
                    >
                      ←
                    </FullscreenNavigation>

                    <FullscreenNavigation
                      $position="right"
                      type="button"
                      onClick={handleNext}
                      aria-label="Next image"
                    >
                      →
                    </FullscreenNavigation>
                  </>
                )}

            </FullscreenContent>

            {/* =================================================
                    FULLSCREEN BOTTOM
                ================================================= */}

            <FullscreenBottom>
              <FullscreenCounter>
                {String(
                  currentIndex + 1
                ).padStart(2, "0")}

                <span>/</span>

                {String(
                  Math.max(
                    images.length,
                    1
                  )
                ).padStart(2, "0")}
              </FullscreenCounter>

              <FullscreenHint>
                USE ← → TO NAVIGATE
              </FullscreenHint>
            </FullscreenBottom>

          </FullscreenOverlay>,
          document.body
        )}
    </>
  );
}

export default MainImages;


/* =========================================================
   CONTAINER
========================================================= */

const Container = styled.div`
  width: 100%;
  margin-bottom: 28px;
`;


/* =========================================================
   GALLERY
========================================================= */

const Gallery = styled.div`
  width: 100%;

  display: grid;

  grid-template-columns: 62px minmax(0, 1fr);

  gap: 18px;

  align-items: stretch;

  @media (max-width: 768px) {
    display: flex;

    flex-direction: column;

    gap: 10px;
  }
`;


/* =========================================================
   THUMBNAILS
========================================================= */

const ImageDetailsContainer = styled.div`
  width: 62px;

  display: flex;

  flex-direction: column;

  align-items: center;

  gap: 10px;

  max-height: 700px;

  overflow-y: auto;

  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: 768px) {
    order: 2;

    width: 100%;

    max-height: none;

    flex-direction: row;

    overflow-x: auto;

    overflow-y: hidden;

    gap: 8px;

    padding: 2px 0 5px;
  }
`;


/* =========================================================
   THUMBNAIL
========================================================= */

const Thumbnail = styled.button`
  flex: 0 0 auto;

  min-width: 55px;
  min-height: 38px;

  padding: 2px;

  border: 1px solid
    ${({ $active }) =>
    $active ? "#1A1917" : "#E5DED3"};

  background: #f7f5f0;

  overflow: hidden;

  cursor: pointer;

  transition:
    border-color 0.25s ease,
    transform 0.25s ease;

  &:hover {
    border-color: #1a1917;

    transform: translateY(-1px);
  }

  img {
    width: 100%;
    height: 100%;

    object-fit: cover;

    display: block;

    opacity: ${({ $active }) =>
    $active ? 1 : 0.65};

    transition: opacity 0.25s ease;
  }

  &:hover img {
    opacity: 1;
  }
`;


/* =========================================================
   MAIN IMAGE
========================================================= */

const ProductImg = styled.div`
  position: relative;

  width: 100%;


  min-height: 500px;

  background: #f7f5f0;

  overflow: hidden;

  display: flex;

  align-items: center;

  justify-content: center;

  @media (max-width: 1100px) {
    height: min(620px, 72vw);

    min-height: 450px;
  }

  @media (max-width: 768px) {
    order: 1;

    width: 100%;

    height: auto;

    min-height: 0;

    aspect-ratio: 1 / 1;
  }
`;


/* =========================================================
   IMAGE VIEWPORT
========================================================= */

const ImageViewport = styled.div`
  width: 100%;

  height: 100%;

  display: flex;

  align-items: center;

  justify-content: center;

  overflow: hidden;
`;


/* =========================================================
   MAIN IMAGE
========================================================= */

const MainImage = styled.img`
  display: block;

  width: 100%;

  height: 100%;

  max-width: 100%;

  max-height: 100%;

  object-fit: contain;

  object-position: center;

  user-select: none;

  -webkit-user-drag: none;
`;


/* =========================================================
   TOP LEFT TEXT
   RTL SUPPORT ADDED HERE
========================================================= */

const TopLeftLabel = styled.div`
  position: absolute;

  top: 20px;

  left: 22px;

  z-index: 10;

  display: flex;

  align-items: center;

  gap: 10px;

  pointer-events: none;

  /*
    Only the text composition changes direction.
    The gallery itself remains LTR.
  */
  direction: ${({ $rtl }) =>
    $rtl ? "ltr" : "ltr"};

  @media (max-width: 768px) {
    top: 14px;

    left: 14px;

    gap: 7px;
  }
`;


/* =========================================================
   BRAND
   ALWAYS LTR
========================================================= */

const Brand = styled.span`
  direction: ltr;

  padding: 7px 9px;

  background: rgba(247, 245, 240, 0.78);

  backdrop-filter: blur(10px);

  -webkit-backdrop-filter: blur(10px);

  color: #1a1917;

  font-size: 9px;

  font-weight: 600;

  letter-spacing: 0.26em;

  white-space: nowrap;
`;


/* =========================================================
   LABEL LINE
========================================================= */

const LabelLine = styled.span`
  width: 28px;

  height: 1px;

  background: #b59a72;

  flex: 0 0 auto;

  @media (max-width: 768px) {
    width: 18px;
  }
`;


/* =========================================================
   PRODUCT DETAILS
   RTL TEXT SUPPORT
========================================================= */

const Details = styled.span`
  

  

  padding: 7px 9px;

  background: rgba(247, 245, 240, 0.78);

  backdrop-filter: blur(10px);

  -webkit-backdrop-filter: blur(10px);

  color: #1a1917;

  font-size: 9px;

  letter-spacing: 0.18em;

  white-space: nowrap;

  @media (max-width: 500px) {
    display: none;
  }
`;


/* =========================================================
   PROGRESS
========================================================= */

const ProgressContainer = styled.div`
  position: absolute;

  left: 22px;

  bottom: 20px;

  z-index: 10;

  display: flex;

  align-items: center;

  gap: 10px;

  padding: 7px 10px;

  background: rgba(247, 245, 240, 0.78);

  backdrop-filter: blur(10px);

  -webkit-backdrop-filter: blur(10px);

  pointer-events: none;

  @media (max-width: 768px) {
    left: 14px;

    bottom: 14px;

    gap: 7px;

    padding: 6px 8px;
  }
`;


/* =========================================================
   PROGRESS NUMBERS
========================================================= */

const CurrentNumber = styled.span`
  color: #1a1917;

  font-size: 9px;

  font-weight: 600;

  letter-spacing: 0.14em;
`;

const TotalNumber = styled.span`
  color: #777168;

  font-size: 8px;

  letter-spacing: 0.12em;
`;


/* =========================================================
   PROGRESS TRACK
========================================================= */

const ProgressTrack = styled.span`
  position: relative;

  width: 55px;

  height: 1px;

  background: #ded4c4;

  overflow: hidden;

  @media (max-width: 768px) {
    width: 38px;
  }
`;

const ProgressBar = styled.span`
  position: absolute;

  left: 0;

  top: 0;

  height: 100%;

  width: ${({ $progress }) =>
    `${$progress}%`};

  background: #1a1917;

  transition: width 0.35s ease;
`;


/* =========================================================
   VIEW BUTTON
========================================================= */

const FullscreenButton = styled.button`
  position: absolute;

  right: 22px;

  bottom: 20px;

  z-index: 10;

  display: flex;

  align-items: center;

  gap: 8px;

  height: 34px;

  padding: 0 11px;

  border: 1px solid rgba(26, 25, 23, 0.12);

  background: rgba(247, 245, 240, 0.78);

  backdrop-filter: blur(10px);

  -webkit-backdrop-filter: blur(10px);

  color: #1a1917;

  cursor: pointer;

  transition:
    background 0.25s ease,
    color 0.25s ease,
    transform 0.25s ease;

  svg {
    font-size: 17px;
  }

  &:hover {
    background: #1a1917;

    color: #ffffff;

    transform: translateY(-1px);
  }

  @media (max-width: 768px) {
    right: 14px;

    bottom: 14px;

    height: 32px;

    padding: 0 9px;

    gap: 6px;

    svg {
      font-size: 16px;
    }
  }
`;

const ViewText = styled.span`
  font-size: 8px;

  font-weight: 600;

  letter-spacing: 0.18em;

  @media (max-width: 500px) {
    display: none;
  }
`;


/* =========================================================
   NAVIGATION
========================================================= */

const NavigationButton = styled.button`
  position: absolute;

  ${({ $left }) =>
    $left
      ? "left: 18px;"
      : "right: 18px;"}

  top: 50%;

  transform: translateY(-50%);

  z-index: 8;

  width: 42px;

  height: 42px;

  display: flex;

  align-items: center;

  justify-content: center;

  border: 1px solid rgba(26, 25, 23, 0.1);

  background: rgba(247, 245, 240, 0.75);

  backdrop-filter: blur(10px);

  -webkit-backdrop-filter: blur(10px);

  color: #1a1917;

  cursor: pointer;

  opacity: 0;

  transition:
    opacity 0.25s ease,
    background 0.25s ease,
    color 0.25s ease;

  ${ProductImg}:hover & {
    opacity: 1;
  }

  &:hover {
    background: #1a1917;

    color: #ffffff;
  }

  svg {
    font-size: 21px;
  }

  @media (max-width: 768px) {
    width: 34px;

    height: 34px;

    ${({ $left }) =>
    $left
      ? "left: 10px;"
      : "right: 10px;"}

    opacity: 1;

    background: rgba(247, 245, 240, 0.85);

    svg {
      font-size: 18px;
    }
  }
`;

/* =========================================================
   LUXURY FULLSCREEN
*/

const FullscreenOverlay = styled(motion.div)`
  position: fixed;

  inset: 0;

  z-index: 2147483647;

  width: 100vw;
  height: 100vh;

  display: flex;
  flex-direction: column;

  background: #171614;

  color: #f4f0e9;

  overscroll-behavior: contain;
`;

/* =========================================================
   FULLSCREEN TOP
========================================================= */

const FullscreenTop = styled.div`
  position: absolute;

  top: 0;
  left: 0;
  right: 0;

  z-index: 10;

  height: 78px;

  display: flex;

  align-items: center;

  justify-content: space-between;

  padding: 0 34px;

  box-sizing: border-box;

  @media (max-width: 700px) {
    height: 70px;
    padding: 0 22px;
  }

  @media (max-width: 480px) {
    height: 64px;
    padding: 0 18px;
  }
`;

/* =========================================================
   FULLSCREEN COLLECTION
========================================================= */

const FullscreenCollection = styled.span`
  font-size: 9px;

  letter-spacing: 0.3em;

  color: #b9aa9a;

  @media (max-width: 480px) {
    font-size: 7px;
    letter-spacing: 0.22em;
  }
`;

/* =========================================================
   CLOSE
========================================================= */

const CloseButton = styled.button`
  width: 38px;
  height: 38px;

  display: flex;

  align-items: center;
  justify-content: center;

  border: 1px solid
    rgba(255, 255, 255, 0.16);

  background: transparent;

  color: #f4f0e9;

  font-size: 24px;
  font-weight: 200;

  cursor: pointer;

  transition:
    background 200ms ease,
    border-color 200ms ease;

  &:hover {
    background:
      rgba(255, 255, 255, 0.08);

    border-color:
      rgba(255, 255, 255, 0.3);
  }

  @media (max-width: 480px) {
    width: 36px;
    height: 36px;
    font-size: 22px;
  }
`;

/* =========================================================
   FULLSCREEN CONTENT
========================================================= */

const FullscreenContent = styled.div`
  position: relative;

  width: 100%;
  height: 100%;

  display: flex;

  align-items: center;
  justify-content: center;


  box-sizing: border-box;

  @media (max-width: 700px) {
    padding: 78px 48px 72px;
  }

  @media (max-width: 480px) {
    padding: 72px 38px 68px;
  }
`;

/* =========================================================
   FULLSCREEN IMAGE
========================================================= */

const FullscreenImage = styled.div`
  width: 100%;
  height: 100%;
  display:flex;
  justify-content:center;

 

 

  user-select: none;

  -webkit-user-drag: none;
   img{
    object-fit: contain;
    
   }
`;

/* =========================================================
   FULLSCREEN FALLBACK
========================================================= */

const FullscreenFallback = styled.div`
  width: min(800px, 90vw);
  height: min(800px, 80vh);
`;

/* =========================================================
   FULLSCREEN NAVIGATION
========================================================= */

const FullscreenNavigation = styled.button`
  position: absolute;

  top: 50%;

  ${({ $position }) =>
    $position === "left"
      ? "left: 28px;"
      : "right: 28px;"}

  transform: translateY(-50%);

  width: 50px;
  height: 50px;

  border: 1px solid
    rgba(255, 255, 255, 0.15);

  background:
    rgba(255, 255, 255, 0.04);

  color: #f4f0e9;

  font-size: 18px;

  cursor: pointer;

  transition:
    background 200ms ease,
    border-color 200ms ease;

  &:hover {
    background:
      rgba(255, 255, 255, 0.1);

    border-color:
      rgba(255, 255, 255, 0.3);
  }

  @media (max-width: 700px) {
    width: 42px;
    height: 42px;

    ${({ $position }) =>
    $position === "left"
      ? "left: 12px;"
      : "right: 12px;"}
  }

  @media (max-width: 480px) {
    width: 38px;
    height: 38px;

    font-size: 15px;

    ${({ $position }) =>
    $position === "left"
      ? "left: 8px;"
      : "right: 8px;"}
  }
`;

/* =========================================================
   FULLSCREEN BOTTOM
========================================================= */

const FullscreenBottom = styled.div`
  position: absolute;

  left: 0;
  right: 0;
  bottom: 0;

  z-index: 10;

  height: 74px;

  display: flex;

  align-items: center;

  justify-content: space-between;

  padding: 0 34px;

  box-sizing: border-box;

  @media (max-width: 700px) {
    height: 64px;
    padding: 0 22px;
  }

  @media (max-width: 480px) {
    height: 56px;
    padding: 0 18px;
  }
`;

/* =========================================================
   FULLSCREEN COUNTER
========================================================= */

const FullscreenCounter = styled.span`
  display: flex;

  align-items: center;

  gap: 8px;

  font-size: 10px;

  letter-spacing: 0.16em;

  color: #ddd6cc;

  span {
    color: #746b61;
  }

  @media (max-width: 480px) {
    font-size: 8px;
    gap: 6px;
  }
`;

/* =========================================================
   FULLSCREEN HINT
========================================================= */

const FullscreenHint = styled.span`
  font-size: 7px;

  letter-spacing: 0.2em;

  color: #746b61;

  @media (max-width: 600px) {
    display: none;
  }
`;