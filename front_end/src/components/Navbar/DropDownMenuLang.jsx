import React, { useEffect, useState } from "react";
import styled from "styled-components";

import data from "../../../common/countryData.json";
import { ClickAwayListener } from "@mui/material";
import { setLocation } from "../../features/locationSlice";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

import Flag from "react-world-flags";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

function DropDownMenuLang(props) {
  const { t, i18n } = useTranslation();

  const dispatch = useDispatch();

  const [selectedLang, setSelectedLang] = useState(
    window.localStorage.getItem("selectedLang") || "en"
  );

  const languages = [
    { code: "en", label: t("languages.en") },
    { code: "es", label: t("languages.es") },
    { code: "ar", label: t("languages.ar") },
  ];

  useEffect(() => {
    if (!window.localStorage.getItem("country")) {
      fetch("https://ipinfo.io/json?token=ced98efb100ff5")
        .then((response) => response.json())
        .then((locationData) => {
          dispatch(setLocation(locationData.country));
        })
        .catch((error) => console.log(error));
    }
  }, [dispatch]);

  useEffect(() => {
    const savedLanguage =
      window.localStorage.getItem("selectedLang") || "en";

    if (i18n.language !== savedLanguage) {
      i18n.changeLanguage(savedLanguage);
    }

    setSelectedLang(savedLanguage);
  }, [i18n]);

  const switchLanguage = () => {
    window.localStorage.setItem("selectedLang", selectedLang);

    i18n.changeLanguage(selectedLang);

    props.setIsLangMenuOpen(false);
  };

  return (
    <Container>
      <div className="Lang_currency">
        <button
          type="button"
          onClick={() =>
            props.setIsLangMenuOpen(!props.isLangMenuOpen)
          }
        >
          <Flag
            className="flag-icon"
            code={props.country}
          />

          <span>
            {t(`languages.${selectedLang}`)}
          </span>

          <span className="separator">/</span>

          <span>USD</span>

          <ArrowDropDownIcon className="dropDownArrow-icon" />
        </button>
      </div>

      {props.isLangMenuOpen && (
        <ClickAwayListener
          mouseEvent="onMouseDown"
          touchEvent="onScroll"
          onClickAway={() =>
            props.setIsLangMenuOpen(false)
          }
        >
          <Wrapper>
            {/* COUNTRY */}
            <OptionGroup>
              <label>
                {t("purchaseOptions.Ship_to")}
              </label>

              <select
                value={props.country || ""}
                onChange={(e) => {
                  dispatch(
                    setLocation(e.target.value)
                  );
                }}
              >
                {data?.map((country, index) => (
                  <option
                    key={index}
                    value={country.value}
                  >
                    {country.label}
                  </option>
                ))}
              </select>
            </OptionGroup>

            {/* LANGUAGE */}
            <OptionGroup>
              <label>
                {t("purchaseOptions.Language")}
              </label>

              <select
                value={selectedLang}
                onChange={(e) =>
                  setSelectedLang(e.target.value)
                }
              >
                {languages.map((lang) => (
                  <option
                    key={lang.code}
                    value={lang.code}
                  >
                    {lang.label}
                  </option>
                ))}
              </select>
            </OptionGroup>

            {/* CURRENCY */}
            <OptionGroup>
              <label>
                {t("purchaseOptions.Currency")}
              </label>

              <select
                value="USD"
                disabled
              >
                <option value="USD">
                  USD
                </option>
              </select>
            </OptionGroup>

            {/* SAVE */}
            <SaveButton
              onClick={switchLanguage}
              type="button"
            >
              {t("common.save")}
            </SaveButton>
          </Wrapper>
        </ClickAwayListener>
      )}
    </Container>
  );
}

export default DropDownMenuLang;

/* =========================
   CONTAINER
========================= */

const Container = styled.div`
  position: relative;

  .Lang_currency button {
    display: flex;
    align-items: center;
    justify-content: center;

    gap: 2px;

    padding: 4px 2px;

    border: none;
    border-radius: 0;

    z-index: 4;

    color: #171615;
    background: transparent;

    cursor: pointer;

    font-family:
      "Inter",
      Arial,
      sans-serif;
  }

  .Lang_currency span {
    font-size: 12.5px;
    font-weight: 400;

    white-space: nowrap;
  }

  .Lang_currency .separator {
    margin-inline: 4px;

    color: #a09b94;
  }

  .Lang_currency .flag-icon {
    width: 22px;

    object-fit: cover;

    margin-inline: 5px;
  }

  .dropDownArrow-icon {
    font-size: 18px;

    margin-inline-start: 1px;

    color: #45413d;

    transition:
      transform 0.25s ease;
  }

  .Lang_currency button:hover
  .dropDownArrow-icon {
    transform: translateY(1px);
  }

  select {
    width: 100%;

    padding: 10px 11px;

    border: 1px solid #ddd9d2;

    border-radius: 3px;

    outline: none;

    background: #ffffff;

    color: #26231f;

    cursor: pointer;

    font-family:
      "Inter",
      Arial,
      sans-serif;

    font-size: 13px;

    transition:
      border-color 0.2s ease,
      box-shadow 0.2s ease;

    &:focus {
      border-color: #a08a61;

      box-shadow:
        0 0 0 2px
        rgba(160, 138, 97, 0.08);
    }

    &:disabled {
      cursor: default;

      color: #55504a;

      background: #f7f5f1;
    }
  }

  @media (max-width: 600px) {
    .Lang_currency span {
      font-size: 11px;
    }

    .Lang_currency .flag-icon {
      width: 20px;

      margin-inline: 3px;
    }

    .dropDownArrow-icon {
      font-size: 17px;
    }
  }
`;

/* =========================
   DROPDOWN
========================= */

const Wrapper = styled.div`
  position: fixed;

  inset-inline-end: 10px;

  top: 68px;

  z-index: 9999;

  width: 255px;

  padding: 10px;

  background: #ffffff;

  border: 1px solid #e6e1d9;

  box-shadow:
    0 18px 45px
    rgba(30, 27, 24, 0.12);

  direction: inherit;

  @media (max-width: 420px) {
    inset-inline: 10px auto;

    width: auto;

    max-width: 255px;

    padding: 15px;
  }
`;

/* =========================
   OPTION GROUP
========================= */

const OptionGroup = styled.div`
  margin-bottom: 15px;

  label {
    display: block;

    margin-bottom: 7px;

    color: #514b44;

    font-family:
      "Inter",
      Arial,
      sans-serif;

    font-size: 11px;

    font-weight: 500;

    letter-spacing: 0.07em;

    text-transform: uppercase;
  }
`;

/* =========================
   SAVE BUTTON
========================= */

const SaveButton = styled.button`
  width: 100%;

  margin-top: 3px;

  padding: 10px 15px;

  border: 1px solid #25221f;

  border-radius: 2px;

  background: #25221f;

  color: #ffffff;

  font-family:
    "Inter",
    Arial,
    sans-serif;

  font-size: 13px;

  font-weight: 500;

  letter-spacing: 0.05em;

  cursor: pointer;

  transition:
    background 0.25s ease,
    color 0.25s ease;

  &:hover {
    background: #ffffff;

    color: #25221f;
  }
`;