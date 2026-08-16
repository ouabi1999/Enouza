import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { AnimatePresence } from "motion/react";
import * as motion from "motion/react-client";

function MainImages({
  colorIndex,
  currentSku,
  productData,
  picsDetailsIndex,
  selectPicsDetails,
  isPicsDetailsActive,
  isColorActive,
}) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const images =
    productData?.multimediaInfo?.image_urls
      ?.split(";")
      .map((image) => image.trim())
      .filter(Boolean) || [];

  const productName =
    productData?.name?.en || "Enouza luxury product";

  /* =========================================================
     CURRENT COLOR IMAGE
  ========================================================= */

  const colorImage =
    isColorActive &&
    currentSku?.colorKey &&
    currentSku?.attributes?.[currentSku.colorKey]?.image;

  /* =========================================================
     CURRENT IMAGE INDEX
  ========================================================= */

  const currentIndex = isColorActive
    ? 0
    : Math.min(
        Math.max(picsDetailsIndex || 0, 0),
        Math.max(images.length - 1, 0)
      );

  /* =========================================================
     SELECTED IMAGE
  ========================================================= */

  const selectedImage =
    colorImage ||
    (isPicsDetailsActive ? images[currentIndex] : images[0]);

  /* =========================================================
     RESET IMAGE STATE
  ========================================================= */

  useEffect(() => {
    setImageLoaded(false);
    setImageError(false);
  }, [selectedImage]);

  /* =========================================================
     IMAGE SELECTION
  ========================================================= */

  const handleImageSelect = (index) => {
    if (isColorActive) return;

    setImageLoaded(false);
    setImageError(false);

    selectPicsDetails(index);
  };

  /* =========================================================
     NEXT IMAGE
  ========================================================= */

  const handleNext = () => {
    if (isColorActive || images.length <= 1) return;

    const nextIndex =
      currentIndex >= images.length - 1 ? 0 : currentIndex + 1;

    handleImageSelect(nextIndex);
  };

  /* =========================================================
     PREVIOUS IMAGE
  ========================================================= */

  const handlePrevious = () => {
    if (isColorActive || images.length <= 1) return;

    const previousIndex =
      currentIndex <= 0 ? images.length - 1 : currentIndex - 1;

    handleImageSelect(previousIndex);
  };

  /* =========================================================
     KEYBOARD NAVIGATION
  ========================================================= */

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsFullscreen(false);
      }

      if (!isFullscreen) return;

      if (event.key === "ArrowRight") {
        handleNext();
      }

      if (event.key === "ArrowLeft") {
        handlePrevious();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isFullscreen, currentIndex, isColorActive]);

  /* =========================================================
     BODY SCROLL LOCK
  ========================================================= */

  useEffect(() => {
    if (!isFullscreen) return;

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isFullscreen]);

  /* =========================================================
     FALLBACK
  ========================================================= */

  const renderFallback = () => (
    <ImageFallback>
      <FallbackBrand>ENOUZA</FallbackBrand>

      <FallbackText>Image unavailable</FallbackText>
    </ImageFallback>
  );

  return (
    <>
      <Container>
        <Gallery>

          {/* =================================================
              THUMBNAILS
          ================================================= */}

          <EditorialSide>
            <VerticalBrand>ENOUZA</VerticalBrand>

            {images.length > 1 && (
              <ImageDetailsContainer>
                {images.map((img, index) => {
                  const isActive =
                    !isColorActive && currentIndex === index;

                  return (
                    <ThumbnailButton
                      key={`${img}-${index}`}
                      type="button"
                      $active={isActive}
                      onClick={() => handleImageSelect(index)}
                      aria-label={`View product image ${index + 1}`}
                      aria-current={
                        isActive ? "true" : undefined
                      }
                    >
                      <Thumbnail
                        src={img}
                        alt={`${productName} ${index + 1}`}
                        loading={index === 0 ? "eager" : "lazy"}
                      />
                    </ThumbnailButton>
                  );
                })}
              </ImageDetailsContainer>
            )}
          </EditorialSide>

          {/* =================================================
              MAIN IMAGE
          ================================================= */}

          <ProductImg>

            <ImageHeader>
              <CollectionLabel>
                ENOUZA COLLECTION
              </CollectionLabel>

              <ImageNumber>
                {String(currentIndex + 1).padStart(2, "0")}

                <NumberDivider />

                {String(Math.max(images.length, 1)).padStart(
                  2,
                  "0"
                )}
              </ImageNumber>
            </ImageHeader>

            <ImageStage>

              <AnimatePresence mode="wait">
                {selectedImage && !imageError ? (
                  <motion.div
                    key={selectedImage}
                    initial={{
                      opacity: 0,
                      scale: 0.985,
                    }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                    }}
                    exit={{
                      opacity: 0,
                      scale: 0.985,
                    }}
                    transition={{
                      duration: 0.5,
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
                    {!imageLoaded && <ImageLoading />}

                    <MainImage
                      src={selectedImage}
                      alt={productName}
                      draggable={false}
                      $loaded={imageLoaded}
                      onLoad={() => setImageLoaded(true)}
                      onError={() => setImageError(true)}
                    />
                  </motion.div>
                ) : (
                  renderFallback()
                )}
              </AnimatePresence>

              {/* =================================================
                  DESKTOP NAVIGATION
              ================================================= */}

              {images.length > 1 && !isColorActive && (
                <>
                  <NavigationButton
                    $position="left"
                    type="button"
                    onClick={handlePrevious}
                    aria-label="Previous product image"
                  >
                    <ArrowIcon>←</ArrowIcon>
                  </NavigationButton>

                  <NavigationButton
                    $position="right"
                    type="button"
                    onClick={handleNext}
                    aria-label="Next product image"
                  >
                    <ArrowIcon>→</ArrowIcon>
                  </NavigationButton>
                </>
              )}

              {/* =================================================
                  FULLSCREEN
              ================================================= */}

              {selectedImage && !imageError && (
                <FullscreenButton
                  type="button"
                  onClick={() => setIsFullscreen(true)}
                  aria-label="View image fullscreen"
                >
                  <FullscreenIcon>↗</FullscreenIcon>

                  <FullscreenText>
                    VIEW FULL IMAGE
                  </FullscreenText>
                </FullscreenButton>
              )}

              {/* =================================================
                  PROGRESS
              ================================================= */}

              {images.length > 1 && (
                <ProgressWrapper>
                  <ProgressNumber>
                    {String(currentIndex + 1).padStart(2, "0")}
                  </ProgressNumber>

                  <ProgressTrack>
                    <ProgressBar
                      $progress={
                        ((currentIndex + 1) / images.length) * 100
                      }
                    />
                  </ProgressTrack>

                  <ProgressNumber>
                    {String(images.length).padStart(2, "0")}
                  </ProgressNumber>
                </ProgressWrapper>
              )}
            </ImageStage>

          </ProductImg>
        </Gallery>
      </Container>

      {/* =====================================================
          FULLSCREEN GALLERY
      ===================================================== */}

      <AnimatePresence>
        {isFullscreen && selectedImage && (
          <FullscreenOverlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.35,
            }}
          >

            <FullscreenTop>
              <FullscreenCollection>
                ENOUZA COLLECTION
              </FullscreenCollection>

              <CloseButton
                type="button"
                onClick={() => setIsFullscreen(false)}
                aria-label="Close fullscreen gallery"
              >
                ×
              </CloseButton>
            </FullscreenTop>

            <FullscreenContent>

              {!imageError ? (
                <FullscreenImage
                  src={selectedImage}
                  alt={productName}
                  draggable={false}
                />
              ) : (
                <FullscreenFallback>
                  {renderFallback()}
                </FullscreenFallback>
              )}

              {images.length > 1 && !isColorActive && (
                <>
                  <FullscreenNavigation
                    $position="left"
                    type="button"
                    onClick={handlePrevious}
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

            <FullscreenBottom>
              <FullscreenCounter>
                {String(currentIndex + 1).padStart(2, "0")}

                <span>/</span>

                {String(Math.max(images.length, 1)).padStart(
                  2,
                  "0"
                )}
              </FullscreenCounter>

              <FullscreenHint>
                USE ← → TO NAVIGATE
              </FullscreenHint>
            </FullscreenBottom>

          </FullscreenOverlay>
        )}
      </AnimatePresence>
    </>
  );
}

export default MainImages;

/* =========================================================
   CONTAINER
========================================================= */

const Container = styled.div`
  width: 100%;
  min-width: 0;
  box-sizing: border-box;
`;

/* =========================================================
   GALLERY
========================================================= */

const Gallery = styled.div`
  width: 100%;

  display: grid;

  grid-template-columns: 78px minmax(0, 1fr);

  gap: 22px;

  align-items: start;

  @media (max-width: 700px) {
    display: flex;
    flex-direction: column;

    gap: 18px;
  }
`;

/* =========================================================
   EDITORIAL SIDE
========================================================= */

const EditorialSide = styled.div`
  width: 78px;

  display: flex;
  flex-direction: column;

  align-items: center;

  gap: 26px;

  @media (max-width: 700px) {
    width: 100%;

    flex-direction: row;

    align-items: center;

    gap: 16px;

    padding: 0 2px;

    box-sizing: border-box;
  }
`;

/* =========================================================
   BRAND
========================================================= */

const VerticalBrand = styled.div`
  writing-mode: vertical-rl;

  transform: rotate(180deg);

  color: #9c815f;

  font-size: 8px;

  font-weight: 500;

  letter-spacing: 0.38em;

  line-height: 1;

  user-select: none;

  @media (max-width: 700px) {
    writing-mode: initial;

    transform: none;

    flex: 0 0 auto;

    font-size: 8px;

    letter-spacing: 0.28em;

    padding-left: 2px;
  }
`;

/* =========================================================
   THUMBNAILS
========================================================= */

const ImageDetailsContainer = styled.div`
  width: 100%;

  display: flex;

  flex-direction: column;

  align-items: center;

  gap: 12px;

  max-height: 590px;

  overflow-y: auto;

  overflow-x: hidden;

  padding: 3px;

  box-sizing: border-box;

  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: 700px) {
    width: auto;

    flex: 1;

    min-width: 0;

    max-width: calc(100vw - 68px);

    flex-direction: row;

    align-items: center;

    justify-content: flex-start;

    gap: 9px;

    overflow-x: auto;

    overflow-y: hidden;

    padding: 3px 3px 8px;

    scrollbar-width: none;

    &::-webkit-scrollbar {
      display: none;
    }
  }
`;

/* =========================================================
   THUMBNAIL BUTTON
========================================================= */

const ThumbnailButton = styled.button`
  position: relative;

  flex: 0 0 62px;

  width: 62px;
  height: 62px;

  padding: 2px;

  border: 1px solid
    ${({ $active }) =>
      $active ? "#24211e" : "#e3ddd5"};

  background: #f7f5f1;

  cursor: pointer;

  opacity: ${({ $active }) =>
    $active ? 1 : 0.62};

  transition:
    opacity 220ms ease,
    border-color 220ms ease,
    transform 220ms ease;

  &:hover {
    opacity: 1;

    border-color: #9c815f;

    transform: translateY(-2px);
  }

  &:focus-visible {
    outline: 1px solid #9c815f;

    outline-offset: 3px;
  }

  @media (max-width: 700px) {
    flex: 0 0 58px;

    width: 58px;
    height: 58px;
  }

  @media (max-width: 380px) {
    flex-basis: 54px;

    width: 54px;
    height: 54px;
  }
`;

/* =========================================================
   THUMBNAIL IMAGE
========================================================= */

const Thumbnail = styled.img`
  display: block;

  width: 100%;
  height: 100%;

  object-fit: cover;

  background: #f1eee8;
`;

/* =========================================================
   PRODUCT IMAGE
========================================================= */

const ProductImg = styled.div`
  position: relative;

  width: 100%;

  min-width: 0;
`;

/* =========================================================
   IMAGE HEADER
========================================================= */

const ImageHeader = styled.div`
  position: absolute;

  top: 18px;

  left: 24px;
  right: 24px;

  z-index: 5;

  display: flex;

  align-items: center;

  justify-content: space-between;

  pointer-events: none;

  @media (max-width: 700px) {
    top: 18px;

    left: 20px;
    right: 20px;
  }

  @media (max-width: 480px) {
    top: 17px;

    left: 18px;
    right: 18px;
  }
`;

/* =========================================================
   COLLECTION LABEL
========================================================= */

const CollectionLabel = styled.span`
  font-size: 8px;

  font-weight: 500;

  letter-spacing: 0.22em;

  color: #81786f;

  text-transform: uppercase;

  @media (max-width: 480px) {
    font-size: 7px;

    letter-spacing: 0.18em;
  }
`;

/* =========================================================
   IMAGE NUMBER
========================================================= */

const ImageNumber = styled.span`
  display: flex;

  align-items: center;

  gap: 7px;

  font-size: 8px;

  letter-spacing: 0.12em;

  color: #81786f;

  @media (max-width: 480px) {
    font-size: 7px;

    gap: 6px;
  }
`;

/* =========================================================
   NUMBER DIVIDER
========================================================= */

const NumberDivider = styled.span`
  width: 18px;

  height: 1px;

  background: #c8c0b6;

  @media (max-width: 480px) {
    width: 13px;
  }
`;

/* =========================================================
   IMAGE STAGE
========================================================= */

const ImageStage = styled.div`
  position: relative;

  width: 100%;

  aspect-ratio: 1 / 1.04;

  display: flex;

  align-items: center;

  justify-content: center;

  overflow: hidden;

  box-sizing: border-box;

  background:
    radial-gradient(
      circle at 50% 45%,
      #faf9f6 0%,
      #f6f3ee 48%,
      #f1eee8 100%
    );

  @media (max-width: 700px) {
    /*
      More vertical breathing room on mobile.
      This prevents the UI text from visually
      touching the product.
    */
    aspect-ratio: 0.94 / 1;

    min-height: 360px;
  }

  @media (max-width: 600px) {
    aspect-ratio: 0.92 / 1;

    min-height: 340px;
  }

  @media (max-width: 480px) {
    aspect-ratio: 0.9 / 1;

    min-height: 325px;
  }

  @media (max-width: 380px) {
    aspect-ratio: 0.88 / 1;

    min-height: 310px;
  }
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

  padding: clamp(
    42px,
    5vw,
    72px
  );

  box-sizing: border-box;

  user-select: none;

  -webkit-user-drag: none;

  opacity: ${({ $loaded }) =>
    $loaded ? 1 : 0};

  transition:
    opacity 500ms ease,
    transform 900ms
      cubic-bezier(
        0.22,
        1,
        0.36,
        1
      );

  ${ImageStage}:hover & {
    transform: scale(1.022);
  }

  @media (max-width: 700px) {
    /*
      Increased padding keeps the actual product
      comfortably away from all UI elements.
    */
    padding: 54px 38px 62px;
  }

  @media (max-width: 600px) {
    padding: 52px 34px 64px;
  }

  @media (max-width: 480px) {
    padding: 50px 30px 66px;
  }

  @media (max-width: 380px) {
    padding: 48px 26px 62px;
  }
`;

/* =========================================================
   LOADING
========================================================= */

const ImageLoading = styled.div`
  position: absolute;

  inset: 0;

  z-index: 1;

  background:
    linear-gradient(
      100deg,
      #f4f1eb 25%,
      #faf8f4 40%,
      #f4f1eb 55%
    );

  background-size: 200% 100%;

  animation:
    imageShimmer 1.6s
    ease-in-out infinite;

  @keyframes imageShimmer {
    from {
      background-position: 200% 0;
    }

    to {
      background-position: -200% 0;
    }
  }
`;

/* =========================================================
   DESKTOP NAVIGATION
========================================================= */

const NavigationButton = styled.button`
  position: absolute;

  top: 50%;

  ${({ $position }) =>
    $position === "left"
      ? "left: 18px;"
      : "right: 18px;"}

  transform: translateY(-50%);

  width: 42px;
  height: 42px;

  display: flex;

  align-items: center;
  justify-content: center;

  border: 1px solid
    rgba(60, 54, 48, 0.12);

  background:
    rgba(255, 255, 255, 0.58);

  backdrop-filter: blur(10px);

  color: #302c28;

  cursor: pointer;

  opacity: 0;

  transition:
    opacity 250ms ease,
    background 250ms ease,
    transform 250ms ease;

  ${ImageStage}:hover & {
    opacity: 1;
  }

  &:hover {
    background: #ffffff;

    transform:
      translateY(-50%)
      scale(1.04);
  }

  @media (max-width: 700px) {
    display: none;
  }
`;

/* =========================================================
   ARROW
========================================================= */

const ArrowIcon = styled.span`
  font-size: 16px;

  font-weight: 300;

  line-height: 1;
`;

/* =========================================================
   FULLSCREEN BUTTON
========================================================= */

const FullscreenButton = styled.button`
  position: absolute;

  left: 20px;

  bottom: 20px;

  z-index: 4;

  display: flex;

  align-items: center;

  gap: 8px;

  padding: 8px 0;

  border: 0;

  background: transparent;

  color: #4d4741;

  cursor: pointer;

  opacity: 0;

  transform: translateY(5px);

  transition:
    opacity 250ms ease,
    transform 250ms ease,
    color 250ms ease;

  ${ImageStage}:hover & {
    opacity: 1;

    transform: translateY(0);
  }

  &:hover {
    color: #9c815f;
  }

  @media (max-width: 700px) {
    left: 18px;

    bottom: 20px;

    opacity: 1;

    transform: none;

    padding: 9px 0;
  }

  @media (max-width: 480px) {
    left: 16px;

    bottom: 19px;
  }
`;

/* =========================================================
   FULLSCREEN ICON
========================================================= */

const FullscreenIcon = styled.span`
  font-size: 14px;

  line-height: 1;

  @media (max-width: 480px) {
    font-size: 13px;
  }
`;

/* =========================================================
   FULLSCREEN TEXT
========================================================= */

const FullscreenText = styled.span`
  font-size: 8px;

  font-weight: 500;

  letter-spacing: 0.16em;

  @media (max-width: 480px) {
    font-size: 7px;

    letter-spacing: 0.13em;
  }
`;

/* =========================================================
   PROGRESS
========================================================= */

const ProgressWrapper = styled.div`
  position: absolute;

  right: 20px;

  bottom: 22px;

  z-index: 4;

  display: flex;

  align-items: center;

  gap: 8px;

  @media (max-width: 700px) {
    right: 18px;

    bottom: 21px;

    gap: 7px;
  }

  @media (max-width: 480px) {
    right: 16px;

    bottom: 20px;

    gap: 6px;
  }
`;

/* =========================================================
   PROGRESS NUMBER
========================================================= */

const ProgressNumber = styled.span`
  font-size: 8px;

  letter-spacing: 0.12em;

  color: #706860;

  @media (max-width: 480px) {
    font-size: 7px;
  }
`;

/* =========================================================
   PROGRESS TRACK
========================================================= */

const ProgressTrack = styled.div`
  position: relative;

  width: 46px;

  height: 1px;

  background: #d4cec5;

  overflow: hidden;

  @media (max-width: 480px) {
    width: 34px;
  }
`;

/* =========================================================
   PROGRESS BAR
========================================================= */

const ProgressBar = styled.span`
  position: absolute;

  top: 0;
  left: 0;

  width: ${({ $progress }) =>
    `${$progress}%`};

  height: 100%;

  background: #6e6257;

  transition:
    width 400ms
    cubic-bezier(
      0.22,
      1,
      0.36,
      1
    );
`;

/* =========================================================
   FALLBACK
========================================================= */

const ImageFallback = styled.div`
  width: 100%;
  height: 100%;

  display: flex;

  flex-direction: column;

  align-items: center;
  justify-content: center;

  gap: 10px;

  color: #8c8278;
`;

/* =========================================================
   FALLBACK BRAND
========================================================= */

const FallbackBrand = styled.span`
  font-size: 12px;

  letter-spacing: 0.35em;

  color: #9c815f;
`;

/* =========================================================
   FALLBACK TEXT
========================================================= */

const FallbackText = styled.span`
  font-size: 9px;

  letter-spacing: 0.12em;

  text-transform: uppercase;
`;

/* =========================================================
   FULLSCREEN OVERLAY
========================================================= */

const FullscreenOverlay = styled(
  motion.div
)`
  position: fixed;

  inset: 0;

  z-index: 9999;

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

  padding: 80px 90px;

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

const FullscreenImage = styled.img`
  width: 100%;
  height: 100%;

  object-fit: contain;

  max-width: 1400px;
  max-height: 90vh;

  user-select: none;

  -webkit-user-drag: none;
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