import React, {useState, useEffect} from "react";
import { Container, Grid2, Typography, Button, Box } from "@mui/material";
import { styled, keyframes } from "@mui/material/styles";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import axios from "axios";
import ApiInstance from "../../../../common/baseUrl";
import { useTranslation } from "react-i18next";


export default function HeroSection() {
    const [product, setProduct] = useState(null);
    const {t, i18n}  = useTranslation()
 
  const heroSection = {
    title: t("heroSection.title"),
    description: t("heroSection.description"),
    image: "https://sc04.alicdn.com/kf/H36e0ccd693504a1da1984ba5130e798el.jpg",
    ctaLabel: t("heroSection.ctaLabel"),
    ctaLink: `/product/${product?.id}`,
    materials: t("heroSection.materials", { returnObjects: true })
  };
const getHeroProduct = async () => {
  ApiInstance.get("/products/hero").
  then(res =>  {
    setProduct(res.data);
    console.log(res.data);
  })
  .catch(err => {
    setProduct(null)
    console.log(err)
  } 
)};

  useEffect(() => {
    getHeroProduct()
  }, []);

  if (!product) return null;
  return (
    <HeroBox>
      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        <Grid2 container spacing={6} alignItems="center">
          <Grid2 size={{ xs: 12, md: 6 }}>
            <Box sx={{ animation: `${fadeInUp} 0.8s ease-out` }}>
              <Typography
                variant="h2"
                sx={{
                  fontWeight: 300,
                  lineHeight: 1.1,
                  fontSize: { xs: '2.5rem', md: '3.5rem', lg: '4rem' },
                  mb: 3,
                  whiteSpace: "pre-line",
                  color: "#1a1a1a",
                  fontFamily: "'Playfair Display', serif",
                }}
              >
                {heroSection.title}
              </Typography>
              
              <Typography
                variant="body1"
                sx={{
                  fontSize: { xs: '1rem', md: '1.25rem' },
                  mb: 5,
                  color: "#666666",
                  lineHeight: 1.8,
                  maxWidth: "90%",
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                {heroSection.description}
              </Typography>

              {/* Materials */}
              <Box sx={{ mb: 5 }}>
                <Typography variant="overline" sx={{ color: "#B87333", mb: 2, display: "block", fontWeight: 600 }}>
                  {t("heroSection.whereQualityMeetsDesign")}
                </Typography>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                  {heroSection.materials.map((material, index) => (
                    <MaterialChip key={index}>
                      <Typography variant="caption" sx={{ color: "#3C2F2F", fontWeight: 500 }}>
                        {material}
                      </Typography>
                    </MaterialChip>
                  ))}
                </Box>
              </Box>

              
              
              {/* Stats */}
              <Box sx={{ display: "flex", gap: 4 }}>
                <Box>
                  <Typography variant="h4" sx={{ color: "#D4AF37", fontWeight: 600 }}>
                    24H
                  </Typography>
                  <Typography variant="caption" sx={{ color: "#666666", textTransform: "uppercase" }}>
                    
                    {t("heroSection.stats.craftHours")}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="h4" sx={{ color: "#D4AF37", fontWeight: 600 }}>
                    98%
                  </Typography>
                  <Typography variant="caption" sx={{ color: "#666666", textTransform: "uppercase" }}>
                    {t("heroSection.stats.satisfaction")}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="h4" sx={{ color: "#D4AF37", fontWeight: 600 }}>
                    5★
                  </Typography>
                  <Typography variant="caption" sx={{ color: "#666666", textTransform: "uppercase" }}>
                    {t("heroSection.stats.rated")}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid2>
          
          <Grid2 size={{ xs: 12, md: 6 }}>
  <Box sx={{ animation: `${fadeInUp} 0.8s ease-out 0.3s` }}>
    <HeroImageContainer
      sx={{ animation: `${floatAnimation} 6s ease-in-out infinite` }}
    >
      <HeroImage
        src={product?.multimediaInfo.image_urls.split(";")[0]}
        alt="Luxury Wall Lamp"
      />
      <ShopButtonContainer>
        {/* SHOP NOW BUTTON BELOW IMAGE */}
    <Box sx={{ mt: 4, textAlign: "center" }}>
      <StyledButton
        variant="contained"
        size="large"
        href={heroSection.ctaLink}
        endIcon={
          <ArrowForwardIcon
            style={{
              rotate: i18n.dir() === "ltr" ? "0deg" : "180deg",
              margin: "0 3px",
            }}
          />
        }
      >
        {heroSection.ctaLabel}
      </StyledButton>
    </Box>
      </ShopButtonContainer>
    </HeroImageContainer>

    
  </Box>
</Grid2>

        </Grid2>
      </Container>
    </HeroBox>
  );
}
// Animations
const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const floatAnimation = keyframes`
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
`;

// Styled Components
const HeroBox = styled("section")`
  padding: 20px 10px;
  position: relative;
  overflow: hidden;
  background: linear-gradient(135deg, #F5F3EF 0%, #E8E4D9 100%);
  color: #1a1a1a;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;


  @media only screen and (max-width:420px){
    &{
    
      padding: 40px 0px;}
  }
  

  
`
const HeroImageContainer = styled(Box)(({ theme }) => ({
  position: "relative",
  borderRadius: "8px",
  overflow: "hidden",
  boxShadow: "0 40px 80px rgba(58, 50, 50, 0.15)",
  "&::before": {
    content: '""',
    position: "absolute",
    inset: 0,
    background: "linear-gradient(45deg, rgba(212, 175, 55, 0.1), rgba(216, 196, 182, 0.1))",
    zIndex: 1,
    borderRadius: "8px",
  },
  "&::after": {
    content: '""',
    position: "absolute",
    inset: -2,
    background: "linear-gradient(45deg, #D4AF37, #B87333)",
    borderRadius: "8px",
    zIndex: 0,
    opacity: 0.3,
    filter: "blur(15px)",
  },
}));

const HeroImage = styled("img")({
  width: "100%",
  height: "550px",
  objectFit: "cover",
  borderRadius: "8px",
  position: "relative",
  zIndex: 2,
  transition: "transform 0.6s ease",
  "&:hover": {
    transform: "scale(1.02)",
  },
});

const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: "8px",
  padding: theme.spacing(1.5, 4),
  fontSize: "1rem",
  fontWeight: 600,
  textTransform: "none",
  background: "#000306",
  color: "#F5F3EF",
  transition: "all 0.3s ease",
  position: "relative",
  overflow: "hidden",
  textWrap: "nowrap",
  "&:hover": {
    background: "#1a1a1a",
    transform: "translateY(-2px)",
    boxShadow: "0 10px 30px rgba(60, 47, 47, 0.3)",
  },
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: -100,
    width: "100%",
    height: "100%",
    background: "linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.2), transparent)",
    transition: "left 0.6s",
  },
  "&:hover::before": {
    left: "100%",
  },
}));

const ShopButtonContainer = styled(Box)(({ theme }) => ({
  position: "absolute",
  bottom: 10,
  left: "25%",
  right: "25%",
  zIndex: 3,
  
}));

const MaterialChip = styled(Box)(({ theme }) => ({
  display: "inline-flex",
  alignItems: "center",
  padding: theme.spacing(0.5, 1.5),
  background: "rgba(216, 196, 182, 0.2)",
  borderRadius: "8px",
  border: "1px solid rgba(216, 196, 182, 0.3)",
  marginRight: theme.spacing(1),
  marginBottom: theme.spacing(1),
}));