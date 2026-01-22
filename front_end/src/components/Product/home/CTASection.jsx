import React from 'react';
import styled, { keyframes } from 'styled-components';
import { Container, Typography, Button, Box, Grid } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import PlaceIcon from '@mui/icons-material/Place';
import { useTranslation } from 'react-i18next';
import { rt } from 'framer-motion/client';
// Luxury color palette for Enouza
const COLORS = {
  charcoal: '#1A1A1A',
  slate: '#2D3439',
  cream: '#F7F5F0',
  gold: '#C4A96A',
  lightGold: '#E1D4B7',
  stone: '#8C8C8C',
};

// Animations
const slideInLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const slideInRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

// Styled Components
const CTAContainer = styled(Container)`
  padding: 6rem 2rem !important;
  background: ${COLORS.cream};
  position: relative;
  width:"100%"
`;

const LeftPanel = styled(Box)`
  padding-right: 3rem;
  animation: ${slideInLeft} 0.8s ease-out;
  border-right: 1px solid ${COLORS.lightGold};
  
  @media (max-width: 900px) {
    border-right: none;
    border-bottom: 1px solid ${COLORS.lightGold};
    padding-right: 0;
    padding-bottom: 3rem;
    margin-bottom: 3rem;
  }
`;

const RightPanel = styled(Box)`
  padding-left: 3rem;
  animation: ${slideInRight} 0.8s ease-out;
  
  @media (max-width: 900px) {
    padding-left: 0;
  }
`;

const SectionTitle = styled(Typography)`
  font-family: 'Playfair Display', serif !important;
  position: relative;
  display: inline-block;
  margin-bottom: 3rem !important;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 0;
    width: 40px;
    height: 2px;
    background: ${COLORS.gold};
  }
`;

const CTAButton = styled(Button)`
  padding: 0.75rem 2rem !important;
  border-radius: 0 !important;
  background: ${COLORS.gold} !important;
  color: ${COLORS.cream} !important;
  font-weight: 300 !important;
  letter-spacing: 0.15em !important;
  text-transform: uppercase !important;
  font-size: 0.8rem !important;
  transition: all 0.3s ease !important;
  margin-top: 1rem !important;
  
  &:hover {
    background: transparent !important;
    color: ${COLORS.gold} !important;
    border: 1px solid ${COLORS.gold} !important;
    transform: translateY(-2px);
  }
`;

const ContactItem = styled(Box)`
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateX(5px);
    
    .contact-icon {
      color: ${COLORS.gold};
    }
  }
`;

const ContactIcon = styled(Box)`
  color: ${COLORS.charcoal};
  margin-right: 1rem;
  transition: color 0.3s ease;
  
  svg {
    font-size: 1.2rem !important;
  }
`;

const ContactText = styled(Box)``;

const Divider = styled.div`
  height: 1px;
  width: 100%;
  background: ${COLORS.lightGold};
  margin: 2rem 0;
`;

const CTASection = () => {
  const { t, i18n } = useTranslation();
 const contactInfo = [
  {
    icon: <EmailIcon />,
    title: t("ctaSection.contact.email.title"),
    details: "contact@enouza.com",
    description: t("ctaSection.contact.email.description")
  },
  {
    icon: <PhoneIcon />,
    title: t("ctaSection.contact.phone.title"),
    details: "+1 (555) 123-4567",
    description: t("ctaSection.contact.phone.description")
  },
  {
    icon: <PlaceIcon />,
    title: t("ctaSection.contact.studio.title"),
    details: "123 Design District",
    description: t("ctaSection.contact.studio.description")
  }
];

  return (
    <CTAContainer maxWidth="xlg">
      <Grid container>
        <Grid item xs={12} md={6}>
          <LeftPanel>
            <SectionTitle 
              variant="h4" 
              sx={{ color: COLORS.charcoal }}
            >
  {t("ctaSection.titleLeft")}
            </SectionTitle>
            
            <Typography 
              variant="body1" 
              sx={{ 
                color: COLORS.stone,
                lineHeight: 1.8,
                mb: 3
              }}
            >
                {t("ctaSection.description")}

            </Typography>
            
            <CTAButton endIcon={<ArrowForwardIcon style={{ rotate: i18n.dir() === 'ltr' ? '0deg' : '180deg', margin:"0 3px" }} />} >
                    {t("ctaSection.button")}
            </CTAButton>
          </LeftPanel>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <RightPanel>
            <SectionTitle 
              variant="h4" 
              sx={{ color: COLORS.charcoal }}
            >
  {t("ctaSection.titleRight")}

            </SectionTitle>
            
            {contactInfo.map((item, index) => (
              <React.Fragment key={index}>
                <ContactItem>
                  <ContactIcon className="contact-icon">
                    {item.icon}
                  </ContactIcon>
                  <ContactText>
                    <Typography 
                      variant="body1" 
                      sx={{ 
                        color: COLORS.charcoal,
                        fontWeight: 500,
                        mb: 0.5
                      }}
                    >
                      {item.title}
                    </Typography>
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        color: COLORS.gold,
                        fontWeight: 400
                      }}
                    >
                      {item.details}
                    </Typography>
                    <Typography 
                      variant="caption" 
                      sx={{ 
                        color: COLORS.stone,
                        display: 'block',
                        mt: 0.5,
                        fontSize: '0.75rem'
                      }}
                    >
                      {item.description}
                    </Typography>
                  </ContactText>
                </ContactItem>
                {index < contactInfo.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </RightPanel>
        </Grid>
      </Grid>
    </CTAContainer>
  );
};

export default CTASection;