import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import NewsLetter from "./NewsLetter";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <FooterContainer>
      <MainFooter>
        <LinksSection>
          {/* HELP */}
          <FooterColumn>
            <ColumnTitle>
              {t("footer.help.title")}
            </ColumnTitle>

            <FooterLink to="contact-us">
              {t("footer.help.contactUs")}
            </FooterLink>

            <FooterLink to="about-us">
              {t("footer.help.aboutUs")}
            </FooterLink>

            <FooterLink to="help-center">
              {t("footer.help.faq")}
            </FooterLink>
          </FooterColumn>

          {/* FOLLOW US */}
          <FooterColumn>
            <ColumnTitle>
              {t("footer.followUs.title")}
            </ColumnTitle>

            <SocialLink
              href="https://www.facebook.com/profile.php?id=61571681156358"
              target="_blank"
              rel="noreferrer"
            >
              <SocialIcon>f</SocialIcon>
              {t("footer.followUs.facebook")}
            </SocialLink>

            <SocialLink
              href="https://www.instagram.com/en.ouza"
              target="_blank"
              rel="noreferrer"
            >
              <SocialIcon>◎</SocialIcon>
              {t("footer.followUs.instagram")}
            </SocialLink>

            <SocialLink
              href="https://www.tiktok.com/@en.ouza"
              target="_blank"
              rel="noreferrer"
            >
              <SocialIcon>♪</SocialIcon>
              {t("footer.followUs.tiktok")}
            </SocialLink>
          </FooterColumn>

          {/* POLICIES */}
          <FooterColumn>
            <ColumnTitle>
              {t("footer.policies.title")}
            </ColumnTitle>

            <FooterLink to="terms-of-services">
              {t("footer.policies.termsOfService")}
            </FooterLink>

            <FooterLink to="privacy-policy">
              {t("footer.policies.privacyPolicy")}
            </FooterLink>

            <FooterLink to="shipping-policy">
              {t("footer.policies.shippingPolicy")}
            </FooterLink>

            <FooterLink to="return-policy">
              {t("footer.policies.refundPolicy")}
            </FooterLink>
          </FooterColumn>
        </LinksSection>

        {/* NEWSLETTER */}
        <NewsletterSection>
          <NewsLetter />
        </NewsletterSection>
      </MainFooter>

      {/* BOTTOM FOOTER */}
      <BottomFooter>
        <PaymentMethods>
          <img
            src="/payment-methods.png"
            alt="Secure payment methods"
          />
        </PaymentMethods>

        <Copyright>
          © {new Date().getFullYear()} Enouza,{" "}
          {t("footer.newsletter.all_rights_reserved")}
        </Copyright>
      </BottomFooter>
    </FooterContainer>
  );
};

export default Footer;


/* =====================================================
   FOOTER
===================================================== */

const FooterContainer = styled.footer`
  width: 100%;
  box-sizing: border-box;

  background: linear-gradient(
    135deg,
    #f5f3ef 0%,
    #e8e4d9 100%
  );

  font-family: "Jost", system-ui, -apple-system, sans-serif;

  color: #1d1d1b;
`;


/* =====================================================
   MAIN FOOTER
===================================================== */

const MainFooter = styled.div`
  max-width: 1280px;
  margin: 0 auto;

  padding: 70px 30px 55px;

  display: grid;
  grid-template-columns: 1.3fr 1fr;
  gap: 80px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 50px;
  }

  @media (max-width: 600px) {
    padding: 55px 22px 40px;
    gap: 40px;
  }
`;


/* =====================================================
   LINKS SECTION
===================================================== */

const LinksSection = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 45px;

  @media (max-width: 700px) {
    gap: 30px;
  }

  @media (max-width: 520px) {
    grid-template-columns: 1fr 1fr;
    gap: 35px 25px;
  }
`;


/* =====================================================
   FOOTER COLUMN
===================================================== */

const FooterColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;


/* =====================================================
   COLUMN TITLE
===================================================== */

const ColumnTitle = styled.h3`
  margin: 0 0 20px;

  font-size: 11px;
  font-weight: 600;
  letter-spacing: 2px;
  text-transform: uppercase;

  color: #1d1d1b;
`;


/* =====================================================
   FOOTER LINKS
===================================================== */

const FooterLink = styled(Link)`
  position: relative;

  margin-bottom: 11px;

  font-size: 14px;
  line-height: 1.6;

  color: #66615a;

  text-decoration: none;

  transition:
    color 0.25s ease,
    transform 0.25s ease;

  &:hover {
    color: #1d1d1b;
    transform: translateX(3px);
  }
`;


/* =====================================================
   SOCIAL LINKS
===================================================== */

const SocialLink = styled.a`
  display: flex;
  align-items: center;
  gap: 10px;

  margin-bottom: 11px;

  font-size: 14px;

  color: #66615a;

  text-decoration: none;

  transition: color 0.25s ease;

  &:hover {
    color: #1d1d1b;
  }
`;


/* =====================================================
   SOCIAL ICON
===================================================== */

const SocialIcon = styled.span`
  width: 20px;
  height: 20px;

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 13px;
  font-weight: 500;

  color: #1d1d1b;
`;


/* =====================================================
   NEWSLETTER
===================================================== */

const NewsletterSection = styled.div`
  
  @media (max-width: 900px) {
    width: 100%;
  }
`;


/* =====================================================
   BOTTOM FOOTER
===================================================== */

const BottomFooter = styled.div`
  max-width: 1280px;
  margin: 0 auto;

  padding: 22px 30px;

  border-top: 1px solid rgba(29, 29, 27, 0.12);

  display: flex;
  align-items: center;
  justify-content: space-between;

  gap: 30px;

  @media (max-width: 600px) {
    padding: 20px 22px;

    flex-direction: column;
    justify-content: center;

    gap: 15px;
  }
`;


/* =====================================================
   PAYMENT METHODS
===================================================== */

const PaymentMethods = styled.div`
  width: 260px;

  img {
    width: 100%;
    height: auto;

    display: block;

    object-fit: contain;
  }

  @media (max-width: 600px) {
    width: 240px;
  }
`;


/* =====================================================
   COPYRIGHT
===================================================== */

const Copyright = styled.span`
  font-size: 12px;
  line-height: 1.5;

  color: #777;

  text-align: right;

  @media (max-width: 600px) {
    text-align: center;
  }
`;