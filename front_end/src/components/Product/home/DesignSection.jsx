import React from "react";
import styled from "styled-components";
import { Container, Typography, Grid, Box } from "@mui/material";

import DesignServicesIcon from "@mui/icons-material/DesignServices";
import StarIcon from "@mui/icons-material/Star";
import SpaIcon from "@mui/icons-material/Spa";

import { useTranslation } from "react-i18next";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

import { useSelector } from "react-redux";

// ==========================================
// COLORS
// ==========================================

const COLORS = {
  sand: "#E6DFD5",
  clay: "#D4C9B8",
  terracotta: "#B3543C",
  darkTerracotta: "#8C3D2C",
  earth: "#3A332D",
  warmGray: "#5A534A",
  lightClay: "#EAE4DC",
  taupe: "#7A6E64",
};

// ==========================================
// STYLED COMPONENTS
// ==========================================

const DesignContainer = styled(Container)`
  padding: 8rem 2rem !important;

  background: ${COLORS.sand};

  position: relative;
  overflow: hidden;

  &:before {
    content: "";

    position: absolute;

    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    background-image:
      radial-gradient(
        circle at 10% 20%,
        ${COLORS.clay} 0%,
        transparent 20%
      ),
      radial-gradient(
        circle at 90% 80%,
        ${COLORS.lightClay} 0%,
        transparent 20%
      );

    opacity: 0.3;

    pointer-events: none;
  }

  @media (max-width: 600px) {
    padding: 1rem 0.3rem !important;
  }
`;

const DesignGrid = styled(Grid)`
  align-items: center;

  position: relative;
  z-index: 1;
`;

const DesignPrinciple = styled(Box)`
  display: flex;
  align-items: flex-start;

  margin-bottom: 3rem;
  padding-left: 1rem;

  border-left: 2px solid ${COLORS.terracotta};

  
`;

const PrincipleIcon = styled(Box)`
  color: ${COLORS.terracotta};

  margin-right: 1rem;
  margin-top: 5px;

  transition: color 0.3s ease;

  ${DesignPrinciple}:hover & {
    color: ${COLORS.darkTerracotta};
  }
`;

const PrincipleContent = styled(Box)`
  flex: 1;
`;

// ==========================================
// COMPONENT
// ==========================================

const DesignSection = () => {
  const { t } = useTranslation();

  const products = useSelector(
    (state) => state.products.productData
  );

  // ========================================
  // DESIGN PRINCIPLES
  // ========================================

  const principles = [
    {
      icon: <DesignServicesIcon />,
      title: t("designSection.principles.minimalism.title"),
      description: t(
        "designSection.principles.minimalism.description"
      ),
    },
    {
      icon: <StarIcon />,
      title: t("designSection.principles.materials.title"),
      description: t(
        "designSection.principles.materials.description"
      ),
    },
    {
      icon: <SpaIcon />,
      title: t("designSection.principles.ambient.title"),
      description: t(
        "designSection.principles.ambient.description"
      ),
    },
  ];

  // ========================================
  // SLIDER SETTINGS
  // ========================================

  const settings = {
    dots: false,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    waitForAnimate: false,
    autoplay: true,
    autoplaySpeed: 2500,
    arrows: false,
  };

  // ========================================
  // PRODUCTS
  // ========================================

  const productList =
    products?.[0]?.products?.slice(0, 3) || [];

  // ========================================
  // RETURN
  // ========================================

  return (
    <DesignContainer maxWidth={false}>
      <DesignGrid container spacing={6}>

        {/* ==================================
            PRODUCT IMAGE SLIDER
        ================================== */}

        <Grid item xs={12} md={6}>
          {productList.length > 0 ? (
            <Slider {...settings}>
              {productList.map((item, index) => {
                const image =
                  item?.multimediaInfo?.image_urls
                    ?.split(";")[0]
                    ?.trim() || "";

                if (!image) {
                  return null;
                }

                return (
                  <div key={item?.id || index}>
                    <img
                      src={image}
                      alt={
                        item?.name ||
                        item?.title ||
                        "Luxury lamp"
                      }
                      style={{
                        width: "100%",
                        height: "500px",
                        objectFit: "cover",
                        borderRadius: "6px",
                        display: "block",
                      }}
                    />
                  </div>
                );
              })}
            </Slider>
          ) : (
            <div
              style={{
                width: "100%",
                height: "500px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography
                sx={{
                  color: COLORS.warmGray,
                }}
              >
                {t("designSection.noProducts")}
              </Typography>
            </div>
          )}
        </Grid>

        {/* ==================================
            DESIGN CONTENT
        ================================== */}

        <Grid item xs={12} md={6}>
          <Typography
            variant="h3"
            sx={{
              color: COLORS.earth,
              mb: 6,
              fontFamily: "'Playfair Display', serif",
              fontSize: {
                xs: "2rem",
                md: "2.5rem",
              },
              fontWeight: 400,
            }}
          >
            {t("designSection.title")}
          </Typography>

          {principles.map((principle, index) => (
            <DesignPrinciple key={index}>
              <PrincipleIcon>
                {principle.icon}
              </PrincipleIcon>

              <PrincipleContent>
                <Typography
                  variant="h6"
                  sx={{
                    color: COLORS.earth,
                    mb: 1,
                    fontWeight: 500,
                    transition: "color 0.3s ease",
                  }}
                >
                  {principle.title}
                </Typography>

                <Typography
                  variant="body1"
                  sx={{
                    color: COLORS.warmGray,
                    lineHeight: 1.7,
                  }}
                >
                  {principle.description}
                </Typography>
              </PrincipleContent>
            </DesignPrinciple>
          ))}
        </Grid>
      </DesignGrid>
    </DesignContainer>
  );
};

export default DesignSection;