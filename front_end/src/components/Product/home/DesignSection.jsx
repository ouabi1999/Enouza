import React from 'react';
import styled from 'styled-components';
import { Container, Typography, Grid, Box } from '@mui/material';
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import StarIcon from '@mui/icons-material/Star';
import SpaIcon from '@mui/icons-material/Spa';
import { useTranslation } from 'react-i18next';

// Warm & Earthy Natural Color Palette
const COLORS = {
  sand: '#E6DFD5',
  clay: '#D4C9B8',
  terracotta: '#B3543C',
  darkTerracotta: '#8C3D2C',
  earth: '#3A332D',
  warmGray: '#5A534A',
  lightClay: '#EAE4DC',
  taupe: '#7A6E64',
};

// Styled Components
const DesignContainer = styled(Container)`
  padding: 8rem 2rem !important;
  background: ${COLORS.sand};
  position: relative;
  overflow: hidden;

  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: 
      radial-gradient(circle at 10% 20%, ${COLORS.clay} 0%, transparent 20%),
      radial-gradient(circle at 90% 80%, ${COLORS.lightClay} 0%, transparent 20%);
    opacity: 0.3;
  }
    @media (max-width: 600px) {
    
    
    padding: 1rem 0.3rem !important;}
`;

const DesignGrid = styled(Grid)`
  align-items: center;
`;

const DesignImage = styled.div`
  width: 100%;
  height: 500px;
  background: linear-gradient(135deg, ${COLORS.clay}, ${COLORS.sand});
  position: relative;
  overflow: hidden;
  border-radius: 6px;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: url('https://res.cloudinary.com/dzpzy1o1y/image/upload/v1785096929/Gemini_Generated_Image_7u3ih37u3ih37u3i_wbshol.png');
    background-size: cover;
    background-position: center;
    opacity: 0.9;
  }
  
  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      45deg,
      rgba(179, 84, 60, 0.1) 0%,
      transparent 100%
    );
  }
`;

const DesignPrinciple = styled(Box)`
  display: flex;
  align-items: flex-start;
  margin-bottom: 3rem;
  padding-left: 1rem;
  border-left: 2px solid ${COLORS.terracotta};
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(212, 201, 184, 0.2);
    padding: 1rem 1rem 1rem 1.5rem;
    border-left: 3px solid ${COLORS.darkTerracotta};
  }
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

const PrincipleContent = styled(Box)``;

const DesignSection = () => {
 const { t, i18n } = useTranslation();

const principles = [
  {
    icon: <DesignServicesIcon />,
    title: t("designSection.principles.minimalism.title"),
    description: t("designSection.principles.minimalism.description")
  },
  {
    icon: <StarIcon />,
    title: t("designSection.principles.materials.title"),
    description: t("designSection.principles.materials.description")
  },
  {
    icon: <SpaIcon />,
    title: t("designSection.principles.ambient.title"),
    description: t("designSection.principles.ambient.description")
  }
];


  return (
    <DesignContainer maxWidth="xl">
      <DesignGrid container spacing={8} >
        <Grid item xs={12} md={6}>
          <DesignImage />
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Typography 
            variant="h3" 
            sx={{ 
              color: COLORS.earth,
              mb: 6,
              fontFamily: "'Playfair Display', serif",
              fontSize: { xs: '2rem', md: '2.5rem' },
              fontWeight: 400
            }}
          >
  {t("designSection.title")}

          </Typography>
          
          {principles.map((principle, index) => (
            <DesignPrinciple key={index} style={{ direction:'ltr'}}>
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
                    transition: 'color 0.3s ease'
                  }}
                >
                  {principle.title}
                </Typography>
                
                <Typography 
                  variant="body1" 
                  sx={{ 
                    color: COLORS.warmGray,
                    lineHeight: 1.7
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