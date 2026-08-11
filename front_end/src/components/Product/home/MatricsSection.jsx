import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { Container, Typography, Grid, Box } from '@mui/material';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import GroupsIcon from '@mui/icons-material/Groups';
import TimelineIcon from '@mui/icons-material/Timeline';
import { useTranslation } from 'react-i18next';

/* =======================
   COMPONENT
======================= */
const MetricsSection = () => {
  const { t } = useTranslation();
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    setAnimated(true);
  }, []);

  const metrics = [
    {
      icon: <AutoAwesomeIcon />,
      number: '20',
      title: t('common.exclusiveDesigns'),
      percentage: 100,
      delay: '0.1s',
    },
    {
      icon: <WorkspacePremiumIcon />,
      number: '10',
      title: t('common.internationalAwards'),
      percentage: 90,
      delay: '0.3s',
    },
    {
      icon: <GroupsIcon />,
      number: '41',
      title: t('common.artisanPartners'),
      percentage: 85,
      delay: '0.5s',
    },
    {
      icon: <TimelineIcon />,
      number: '8',
      title: t('common.yearsOfExcellence'),
      percentage: 95,
      delay: '0.7s',
    },
  ];

  return (
    <MetricsContainer maxWidth="xl">
      <div style={{ marginBottom:"15px", display:"flex", justifyContent:"center", alignItems:"center", width:"100vw"}}>
      <span style={{ fontFamily: "Playfair Display", fontSize:"1.5rem", fontWeight:"490"}}>Why Us</span>
      </div>
      <Grid container spacing={{ xs: 4, md: 8 }}>
        {metrics.map((metric, index) => {
          const radius = 45;
          const circumference = 2 * Math.PI * radius;
          const progress = (metric.percentage / 100) * circumference;

          return (
            <Grid item xs={6} md={3} key={index}>
              <MetricCircle>
                <CircleSvg viewBox="0 0 100 100">
                  <CircleBackground cx="50" cy="50" r={radius} />
                  {animated && (
                    <CircleProgress
                      cx="50"
                      cy="50"
                      r={radius}
                      strokeDasharray={circumference}
                      strokeDashoffset={circumference - progress}
                      delay={metric.delay}
                    />
                  )}
                </CircleSvg>

                <CircleContent>
                  <MetricIcon>{metric.icon}</MetricIcon>

                  <Typography
                    sx={{
                      fontFamily: "'Playfair Display', serif",
                      fontWeight: 400,
                      color: COLORS.charcoal,
                      fontSize: {
                        xs: '1rem',
                        sm: '1rem',
                        md: '1.5rem',
                      },
                      lineHeight: 1,
                    }}
                  >
                    {metric.number}
                  </Typography>

                  <Typography
                    sx={{
                      color: COLORS.bronze,
                      fontSize: '1rem',
                      fontWeight: 500,
                    }}
                  >
                    +
                  </Typography>
                </CircleContent>
              </MetricCircle>

              <MetricTitle
                align="center"
                sx={{
                  fontSize: {
                    xs: '0.75rem',
                    sm: '0.85rem',
                    md: '0.9rem',
                  },
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

/* =======================
   COLORS
======================= */
const COLORS = {
  cream: '#ffffff',
  taupe: '#E8E2D9',
  charcoal: '#2A2A2A',
  bronze: '#dbd0a2;',
};

/* =======================
   ANIMATIONS
======================= */
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

/* =======================
   STYLES
======================= */
const MetricsContainer = styled(Container)`
  background: ${COLORS.cream};
  padding: 4rem 1.5rem !important;
  position: relative;
  overflow: hidden;

  @media (min-width: 900px) {
    padding: 6rem 2rem !important;
  }

 
`;

const MetricCircle = styled(Box)`
  position: relative;
  margin: 0 auto 2rem;
  width: 150px;
  aspect-ratio: 1 / 1;
  overflow: hidden;
  animation: ${fadeInUp} 0.8s ease-out;

  @media (max-width: 900px) {
    width: 160px;
  }

  @media (max-width: 600px) {
    width: 140px;
  }
`;

const CircleSvg = styled.svg`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
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
  transform: rotate(-90deg);
  transform-origin: 50% 50%;
  animation: ${drawCircle} 2s ease-out forwards;
  animation-delay: ${({ delay }) => delay || '0s'};
`;

const CircleContent = styled(Box)`
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  pointer-events: none;
`;

const MetricIcon = styled(Box)`
  color: ${COLORS.bronze};
  margin-bottom: 0.4rem;

  svg {
    font-size: 2rem !important;

    @media (max-width: 600px) {
      font-size: 1.6rem !important;
    }
  }
`;

const MetricTitle = styled(Typography)`
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-top: 1rem !important;
  color: ${COLORS.charcoal};
  font-weight: 500;
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
