import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { Container, Typography, Grid, Box } from '@mui/material';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import GroupsIcon from '@mui/icons-material/Groups';
import TimelineIcon from '@mui/icons-material/Timeline';
import { useTranslation } from 'react-i18next';


const MetricsSection = () => {
  const { t } = useTranslation();
  const metrics = [
    { 
      icon: <AutoAwesomeIcon />,
      number: '200', 
      title: t("common.exclusiveDesigns"),

      percentage: 100,
      delay: '0.1s'
    },
    { 
      icon: <WorkspacePremiumIcon />,
      number: '47', 
      title: t("common.internationalAwards"),
      percentage: 90,
      delay: '0.3s'
    },
    { 
      icon: <GroupsIcon />,
      number: '98', 
      title: t("common.artisanPartners"),
      percentage: 85,
      delay: '0.5s'
    },
    { 
      icon: <TimelineIcon />,
      number: '15', 
      title: t("common.yearsOfExcellence"),
      percentage: 95,
      delay: '0.7s'
    },
  ];

  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    setAnimated(true);
  }, []);

  return (
    <MetricsContainer maxWidth="xl">
      <Grid container spacing={8}>
        {metrics.map((metric, index) => {
          const circumference = 2 * Math.PI * 45;
          const progress = (metric.percentage / 100) * circumference;
          
          return (
            <Grid item xs={6} md={3} key={index}>
              <MetricCircle>
                <svg width="200" height="200" viewBox="0 0 100 100">
                  <CircleBackground cx="50" cy="50" r="45" />
                  {animated && (
                    <CircleProgress 
                      cx="50" 
                      cy="50" 
                      r="45" 
                      strokeDasharray={circumference}
                      strokeDashoffset={circumference - progress}
                      delay={metric.delay}
                    />
                  )}
                </svg>
                
                <CircleContent>
                  <MetricIcon>
                    {metric.icon}
                  </MetricIcon>
                  <Typography 
                    variant="h2" 
                    sx={{ 
                      color: COLORS.charcoal,
                      fontFamily: "'Playfair Display', serif",
                      fontWeight: 400,
                      fontSize: { xs: '2.5rem', md: '3rem' },
                      lineHeight: 1
                    }}
                  >
                    {metric.number}
                  </Typography>
                  <Typography 
                    variant="caption" 
                    sx={{ 
                      color: COLORS.bronze,
                      fontSize: '1rem',
                      fontWeight: 500
                    }}
                  >
                    +
                  </Typography>
                </CircleContent>
              </MetricCircle>
              
              <MetricTitle 
                variant="h6" 
                align="center"
                sx={{ 
                  color: COLORS.charcoal,
                  fontWeight: 500,
                  fontSize: '0.9rem'
                }}
              >
                {metric.title}
              </MetricTitle>
            </Grid>
          );
        })}
      </Grid>
    </MetricsContainer>
  );
};

export default MetricsSection;
// Luxury color palette
const COLORS = {
  cream: '#F8F5F2',
  taupe: '#E8E2D9',
  charcoal: '#2A2A2A',
  bronze: '#8C7A5E',
  lightBronze: '#B8A88C',
  stone: '#7D7D7D',
};

// Animations
const drawCircle = keyframes`
  to {
    stroke-dashoffset: 0;
  }
`;

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

// Styled Components
const MetricsContainer = styled(Container)`
  padding: 6rem 2rem !important;
  background: ${COLORS.cream};
  position: relative;
  overflow: hidden;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, ${COLORS.taupe}, transparent);
  }
`;

const MetricCircle = styled(Box)`
  position: relative;
  width: 200px;
  height: 200px;
  margin: 0 auto 2rem;
  animation: ${fadeInUp} 0.8s ease-out;
`;

const CircleBackground = styled.circle`
  fill: none;
  stroke: ${COLORS.taupe};
  stroke-width: 6;
`;

const CircleProgress = styled.circle`
  fill: none;
  stroke: ${COLORS.bronze};
  stroke-width: 6;
  stroke-linecap: round;
  stroke-dasharray: 565;
  stroke-dashoffset: 565;
  transform: rotate(-90deg);
  transform-origin: 50% 50%;
  animation: ${drawCircle} 2s ease-out forwards;
  animation-delay: ${props => props.delay || '0s'};
`;

const CircleContent = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
`;

const MetricIcon = styled(Box)`
  color: ${COLORS.bronze};
  margin-bottom: 0.5rem;
  
  svg {
    font-size: 2rem !important;
  }
`;

const MetricTitle = styled(Typography)`
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-top: 1rem !important;
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 50%;
    transform: translateX(-50%);
    width: 30px;
    height: 1px;
    background: ${COLORS.taupe};
  }
`;