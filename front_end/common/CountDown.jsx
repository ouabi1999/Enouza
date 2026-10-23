
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

const OFFER_DURATION = 7 * 24 * 60 * 60 * 1000;
const STORAGE_KEY = "enouza_offer_deadline_v1";

const getOfferDeadline = () => {
  try {
    const savedDeadline = localStorage.getItem(STORAGE_KEY);
    const parsedDeadline = Number(savedDeadline);

    if (
      savedDeadline &&
      Number.isFinite(parsedDeadline) &&
      parsedDeadline > Date.now()
    ) {
      return parsedDeadline;
    }

    const newDeadline = Date.now() + OFFER_DURATION;

    localStorage.setItem(STORAGE_KEY, String(newDeadline));

    return newDeadline;
  } catch {
    return Date.now() + OFFER_DURATION;
  }
};

const Countdown = ({title}) => {
  const [timeLeft, setTimeLeft] = useState(null);
  const {t } = useTranslation()
  useEffect(() => {
    const deadline = getOfferDeadline();

    const updateCountdown = () => {
      const difference = deadline - Date.now();

      if (difference <= 0) {
        setTimeLeft(null);
        return;
      }

      setTimeLeft({
        days: Math.floor(difference / 86400000),
        hours: Math.floor((difference / 3600000) % 24),
        minutes: Math.floor((difference / 60000) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      });
    };

    updateCountdown();

    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!timeLeft) return null;

  const format = (value) => String(value).padStart(2, "0");

  return (
    <Badge
      role="timer"
      aria-label={`Offer ends in ${
        timeLeft.days > 0 ? `${timeLeft.days} days, ` : ""
      }${timeLeft.hours} hours, ${timeLeft.minutes} minutes and ${timeLeft.seconds} seconds`}
    >
      <OfferIndicator />

      <OfferLabel>{t(`countdownSection.${title}`)}</OfferLabel>

      <Divider />

      <ClockIcon aria-hidden="true">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3 2" />
        </svg>
      </ClockIcon>

      <Time>
        {timeLeft.days > 0 && (
          <>
            <TimeUnit>{timeLeft.days}d</TimeUnit>
            <Separator>:</Separator>
          </>
        )}

        <TimeUnit>{format(timeLeft.hours)}</TimeUnit>
        <Separator>:</Separator>
        <TimeUnit>{format(timeLeft.minutes)}</TimeUnit>
        <Separator>:</Separator>
        <TimeUnit>{format(timeLeft.seconds)}</TimeUnit>
      </Time>
    </Badge>
  );
};

export default Countdown;

/* =========================
   LUXURY STYLING
========================= */

const Badge = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 7px;

  min-height: 30px;
  padding: 5px 9px;
  box-sizing: border-box;

  background: #faf8f3;
  border: 1px solid #e8dfcc;
  border-radius: 3px;

  color: #e12f23;
  font-family: inherit;
  line-height: 1;
  white-space: nowrap;
  flex-shrink: 0;

  @media (max-width: 480px) {
    gap: 5px;
    min-height: 27px;
    padding: 4px 6px;
  }
`;

const OfferIndicator = styled.span`
  width: 5px;
  height: 5px;
  flex-shrink: 0;
  border-radius: 50%;
  background: #e12f23;

  @media (max-width: 480px) {
    width: 4px;
    height: 4px;
  }
`;

const OfferLabel = styled.span`
  color: #e12f23;
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 0.65px;
  text-transform: uppercase;

  @media (max-width: 480px) {
    font-size: 8px;
    letter-spacing: 0.35px;
  }
`;

const Divider = styled.span`
  width: 1px;
  height: 13px;
  background: #e3d8c3;
  flex-shrink: 0;

  @media (max-width: 480px) {
    height: 11px;
  }
`;

const ClockIcon = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  svg {
    display: block;
    width: 14px;
    height: 14px;
  }

  @media (max-width: 480px) {
    svg {
      width: 12px;
      height: 12px;
    }
  }
`;

const Time = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 3px;

  font-size: 12px;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
  letter-spacing: 0.15px;
  color: #e12f23;

  @media (max-width: 480px) {
    gap: 2px;
    font-size: 11px;
  }
`;

const TimeUnit = styled.span`
  min-width: 14px;
  text-align: center;
`;

const Separator = styled.span`
  color: #c4b18d;
  font-size: 11px;
  font-weight: 400;
`;
