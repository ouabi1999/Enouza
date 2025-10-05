import React, { useLayoutEffect } from 'react';
import styled from 'styled-components';
import HeadeSeo from "../../../common/HeadeSeo";
import { useTranslation } from 'react-i18next';

function PrivacyPolicy() {
  const { t } = useTranslation("privacy", { returnObjects: true });

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0 });
  }, []);

  return (
    <Container>
      <HeadeSeo title={t("privacyPolicy.seoTitle")} />

      <div>
        <h2>{t("privacyPolicy.title")}</h2>
        <p>{t("privacyPolicy.intro")}</p>
      </div>

      <h3>{t("privacyPolicy.collectingPersonalInfo.title")}</h3>
      <p>{t("privacyPolicy.collectingPersonalInfo.description")}</p>

      <h3>{t("privacyPolicy.deviceInfo.title")}</h3>
      <p>{t("privacyPolicy.deviceInfo.examples")}</p>
      <p>{t("privacyPolicy.deviceInfo.purpose")}</p>
      <p>{t("privacyPolicy.deviceInfo.source")}</p>
      <p>{t("privacyPolicy.deviceInfo.disclosure")}</p>

      <h3>{t("privacyPolicy.orderInfo.title")}</h3>
      <p>{t("privacyPolicy.orderInfo.examples")}</p>
      <p>{t("privacyPolicy.orderInfo.purpose")}</p>
      <p>{t("privacyPolicy.orderInfo.source")}</p>
      <p>{t("privacyPolicy.orderInfo.disclosure")}</p>

      <h3>{t("privacyPolicy.customerSupportInfo.title")}</h3>
      <p>{t("privacyPolicy.customerSupportInfo.examples")}</p>
      <p>{t("privacyPolicy.customerSupportInfo.purpose")}</p>
      <p>{t("privacyPolicy.customerSupportInfo.source")}</p>

      <h3>{t("privacyPolicy.sharingPersonalInfo.title")}</h3>
      <p>{t("privacyPolicy.sharingPersonalInfo.text")}</p>

      <h3>{t("privacyPolicy.behavioralAdvertising.title")}</h3>
      <p>{t("privacyPolicy.behavioralAdvertising.text")}</p>

      <h3>{t("privacyPolicy.usingPersonalInfo.title")}</h3>
      <p>{t("privacyPolicy.usingPersonalInfo.text")}</p>

      <h3>{t("privacyPolicy.lawfulBasis.title")}</h3>
      <p>{t("privacyPolicy.lawfulBasis.text")}</p>

      <h3>{t("privacyPolicy.retention.title")}</h3>
      <p>{t("privacyPolicy.retention.text")}</p>

      <h3>{t("privacyPolicy.automaticDecisionMaking.title")}</h3>
      <p>{t("privacyPolicy.automaticDecisionMaking.text")}</p>

      <h3>{t("privacyPolicy.yourRights.title")}</h3>
      <p>{t("privacyPolicy.yourRights.gdpr")}</p>
      <p>{t("privacyPolicy.yourRights.ccpa")}</p>

      <h3>{t("privacyPolicy.cookies.title")}</h3>
      <p>{t("privacyPolicy.cookies.text")}</p>

      <h3>{t("privacyPolicy.doNotTrack.title")}</h3>
      <p>{t("privacyPolicy.doNotTrack.text")}</p>

      <h3>{t("privacyPolicy.changes.title")}</h3>
      <p>{t("privacyPolicy.changes.text")}</p>

      <h3>{t("privacyPolicy.contact.title")}</h3>
      <p>{t("privacyPolicy.contact.text")}</p>

      <p>{t("privacyPolicy.lastUpdated")}</p>
    </Container>
  );
}

export default PrivacyPolicy;

const Container = styled.div`
  width: calc(100% - 30px);
  min-height: 100vh;
  margin: 10px auto;
  padding: 10px 15px;
  background: #d3cce3;
  background: -webkit-linear-gradient(to right, #e9e4f0, #d3cce3);
  background: linear-gradient(to right, #e9e4f0, #d3cce3);
`;
