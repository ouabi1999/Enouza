
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
  padding: 20px;
  pointer-events: none;
`;

const Banner = styled.div`
  pointer-events: auto;
  width: 100%;
  max-width: 480px;
  margin-left: auto;
  padding: 26px;
  background: #f7f5f0;
  color: #1d1c1a;
  border: 1px solid #ded4c4;
  border-radius: 12px;
  box-shadow: 0 8px 40px rgba(0, 0, 0, 0.16);

  @media (max-width: 600px) {
    max-width: 100%;
    padding: 22px;
  }
`;

const Brand = styled.div`
  font-size: 13px;
  letter-spacing: 3px;
  font-weight: 600;
  margin-bottom: 18px;
`;

const Heading = styled.h2`
  font-family: "Cormorant Garamond", serif;
  font-size: 27px;
  font-weight: 500;
  margin: 0 0 12px;
`;

const Description = styled.p`
  font-size: 13px;
  line-height: 1.7;
  color: #5c5851;
  margin: 0 0 22px;
`;

const Actions = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 18px;

  @media (max-width: 420px) {
    flex-direction: column;
  }
`;

const ActionButton = styled.button`
  flex: 1;
  min-height: 44px;
  padding: 10px 14px;
  border: 1px solid #1d1c1a;
  border-radius: 5px;
  background: ${({ $primary }) =>
    $primary ? "#1d1c1a" : "transparent"};
  color: ${({ $primary }) =>
    $primary ? "#ffffff" : "#1d1c1a"};
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.8;
  }
`;

const SettingsLink = styled.button`
  display: block;
  margin: 18px auto 0;
  padding: 0;
  border: 0;
  background: transparent;
  color: #1d1c1a;
  text-decoration: underline;
  font-size: 12px;
  cursor: pointer;
`;

const Preferences = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

const Preference = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
`;

const PreferenceTitle = styled.div`
  font-size: 13px;
  font-weight: 600;
  margin-bottom: 4px;
`;

const PreferenceDescription = styled.div`
  color: #5c5851;
  font-size: 11px;
  line-height: 1.6;
`;

const Required = styled.span`
  flex-shrink: 0;
  color: #8c7657;
  font-size: 11px;
`;

const Toggle = styled.input`
  flex-shrink: 0;
  width: 36px;
  height: 20px;
  accent-color: #1d1c1a;
  cursor: pointer;
`;
