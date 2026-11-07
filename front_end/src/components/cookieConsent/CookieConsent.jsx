
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

const CONSENT_KEY = "enouza_cookie_consent_v1";

const DEFAULT_CONSENT = {
  necessary: true,
  analytics: false,
  marketing: false,
};

const readConsent = () => {
  try {
    const saved = localStorage.getItem(CONSENT_KEY);
    return saved ? JSON.parse(saved) : null;
  } catch {
    return null;
  }
};

const saveConsent = (consent) => {
  const value = {
    ...consent,
    necessary: true,
    updatedAt: new Date().toISOString(),
  };

  localStorage.setItem(CONSENT_KEY, JSON.stringify(value));

  window.dispatchEvent(
    new CustomEvent("enouza:consent-change", {
      detail: value,
    })
  );

  return value;
};

export const getCookieConsent = () => readConsent();

export const openCookieSettings = () => {
  window.dispatchEvent(new Event("enouza:open-cookie-settings"));
};

const CookieConsent = () => {
  const { t } = useTranslation();

  const [consent, setConsent] = useState(null);
  const [visible, setVisible] = useState(false);
  const [settings, setSettings] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    const saved = readConsent();

    if (saved) {
      setConsent(saved);
      setAnalytics(Boolean(saved.analytics));
      setMarketing(Boolean(saved.marketing));
    } else {
      setVisible(true);
    }

    const openSettings = () => {
      const current = readConsent();

      setAnalytics(Boolean(current?.analytics));
      setMarketing(Boolean(current?.marketing));
      setSettings(true);
      setVisible(true);
    };

    window.addEventListener(
      "enouza:open-cookie-settings",
      openSettings
    );

    return () => {
      window.removeEventListener(
        "enouza:open-cookie-settings",
        openSettings
      );
    };
  }, []);

  const chooseConsent = (value) => {
    const saved = saveConsent(value);

    setConsent(saved);
    setAnalytics(Boolean(saved.analytics));
    setMarketing(Boolean(saved.marketing));
    setSettings(false);
    setVisible(false);
  };

  const acceptAll = () => {
    chooseConsent({
      necessary: true,
      analytics: true,
      marketing: true,
    });
  };

  const rejectOptional = () => {
    chooseConsent(DEFAULT_CONSENT);
  };

  const savePreferences = () => {
    chooseConsent({
      necessary: true,
      analytics,
      marketing,
    });
  };

  if (!visible) return null;

  return (
    <Overlay>
      <Banner role="dialog" aria-modal="true">
        <Brand>ENOUZA</Brand>

        <Heading>
          {t("cookies.title", "Your privacy matters")}
        </Heading>

        <Description>
          {t(
            "cookies.description",
            "We use cookies to improve your experience, understand how our website is used, and measure our advertising performance. You can accept all cookies, reject optional cookies, or customize your preferences."
          )}
        </Description>

        {!settings ? (
          <>
            <Actions>
              <ActionButton
                $primary
                onClick={acceptAll}
              >
                {t("cookies.acceptAll", "Accept all")}
              </ActionButton>

              <ActionButton onClick={rejectOptional}>
                {t(
                  "cookies.rejectOptional",
                  "Reject optional"
                )}
              </ActionButton>
            </Actions>

            <SettingsLink
              onClick={() => setSettings(true)}
            >
              {t(
                "cookies.customize",
                "Customize preferences"
              )}
            </SettingsLink>
          </>
        ) : (
          <Preferences>
            <Preference>
              <div>
                <PreferenceTitle>
                  {t(
                    "cookies.necessary",
                    "Necessary cookies"
                  )}
                </PreferenceTitle>

                <PreferenceDescription>
                  {t(
                    "cookies.necessaryDescription",
                    "Required for the website, cart, checkout, and security."
                  )}
                </PreferenceDescription>
              </div>

              <Required>
                {t("cookies.alwaysOn", "Always on")}
              </Required>
            </Preference>

            <Preference>
              <div>
                <PreferenceTitle>
                  {t("cookies.analytics", "Analytics")}
                </PreferenceTitle>

                <PreferenceDescription>
                  {t(
                    "cookies.analyticsDescription",
                    "Help us understand how visitors use our website."
                  )}
                </PreferenceDescription>
              </div>

              <Toggle
                type="checkbox"
                checked={analytics}
                onChange={(e) =>
                  setAnalytics(e.target.checked)
                }
              />
            </Preference>

            <Preference>
              <div>
                <PreferenceTitle>
                  {t("cookies.marketing", "Marketing")}
                </PreferenceTitle>

                <PreferenceDescription>
                  {t(
                    "cookies.marketingDescription",
                    "Allow advertising measurement and personalized marketing."
                  )}
                </PreferenceDescription>
              </div>

              <Toggle
                type="checkbox"
                checked={marketing}
                onChange={(e) =>
                  setMarketing(e.target.checked)
                }
              />
            </Preference>

            <Actions>
              <ActionButton
                $primary
                onClick={savePreferences}
              >
                {t(
                  "cookies.savePreferences",
                  "Save preferences"
                )}
              </ActionButton>

              <ActionButton onClick={rejectOptional}>
                {t(
                  "cookies.rejectOptional",
                  "Reject optional"
                )}
              </ActionButton>
            </Actions>
          </Preferences>
        )}
      </Banner>
    </Overlay>
  );
};

export default CookieConsent;
const Overlay = styled.div`
  position: fixed;
  z-index: 99999;
  inset: auto 0 0;
  padding: 16px;
  padding-bottom: max(16px, env(safe-area-inset-bottom));
  pointer-events: none;
  box-sizing: border-box;

  @media (max-width: 600px) {
    padding: 10px;
    padding-bottom: max(10px, env(safe-area-inset-bottom));
  }
`;

const Banner = styled.div`
  box-sizing: border-box;
  pointer-events: auto;
  width: min(100%, 480px);
  max-height: min(80dvh, 720px);
  margin-left: auto;
  padding: clamp(18px, 4vw, 26px);
  overflow-y: auto;
  overscroll-behavior: contain;
  background: #f7f5f0;
  color: #1d1c1a;
  border: 1px solid #ded4c4;
  border-radius: 12px;
  box-shadow: 0 8px 40px rgba(0, 0, 0, 0.16);

  @media (max-width: 600px) {
    width: 100%;
    max-height: min(75dvh, 620px);
    border-radius: 12px;
  }

  @media (max-width: 360px) {
    padding: 16px;
  }
`;

const Brand = styled.div`
  font-size: 13px;
  letter-spacing: 3px;
  font-weight: 600;
  margin-bottom: 14px;
`;

const Heading = styled.h2`
  font-family: "Cormorant Garamond", serif;
  font-size: clamp(22px, 6vw, 27px);
  line-height: 1.2;
  font-weight: 500;
  margin: 0 0 10px;
`;

const Description = styled.p`
  font-size: 13px;
  line-height: 1.6;
  color: #5c5851;
  margin: 0 0 18px;
  overflow-wrap: anywhere;
`;

const Actions = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 16px;

  @media (max-width: 420px) {
    flex-direction: column;
  }
`;

const ActionButton = styled.button`
  box-sizing: border-box;
  flex: 1;
  min-width: 0;
  min-height: 44px;
  padding: 10px 14px;
  border: 1px solid #1d1c1a;
  border-radius: 5px;
  background: ${({ $primary }) =>
    $primary ? "#1d1c1a" : "transparent"};
  color: ${({ $primary }) =>
    $primary ? "#ffffff" : "#1d1c1a"};
  font: inherit;
  font-size: 12px;
  font-weight: 500;
  line-height: 1.4;
  overflow-wrap: anywhere;
  cursor: pointer;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.8;
  }
`;

const SettingsLink = styled.button`
  display: block;
  max-width: 100%;
  margin: 16px auto 0;
  padding: 6px;
  border: 0;
  background: transparent;
  color: #1d1c1a;
  text-decoration: underline;
  font: inherit;
  font-size: 12px;
  line-height: 1.4;
  cursor: pointer;
`;

const Preferences = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Preference = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
  min-width: 0;

  > div {
    min-width: 0;
  }
`;

const PreferenceTitle = styled.div`
  font-size: 13px;
  font-weight: 600;
  margin-bottom: 4px;
`;

const PreferenceDescription = styled.div`
  color: #5c5851;
  font-size: 11px;
  line-height: 1.5;
  overflow-wrap: anywhere;
`;

const Required = styled.span`
  flex-shrink: 0;
  padding-top: 2px;
  color: #8c7657;
  font-size: 11px;
  white-space: nowrap;
`;

const Toggle = styled.input`
  flex-shrink: 0;
  width: 40px;
  height: 22px;
  margin: 0;
  accent-color: #1d1c1a;
  cursor: pointer;
`;