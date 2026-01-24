import React from "react";
import styled from "styled-components";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import { useTranslation } from "react-i18next";
import { motion } from 'framer-motion';

function UserServices() {
  const {t, i18n} = useTranslation();
  return (
    <Container>
       
      <Wrapp>
        <MinWrap>
          <MonetizationOnIcon className="icon" />
          <span>{t("homePage.money_Back")}</span>
        </MinWrap>
        <MinWrap>
          <VerifiedUserIcon className="icon" />
          <span>{t("homePage.safe_reliable_payments")}</span>
        </MinWrap>
        <MinWrap>
          <SupportAgentIcon className="icon" />
          <span> {t("homePage.support_24_7")}</span>
        </MinWrap>
      </Wrapp>
    </Container>
  );
}

export default UserServices;

const Container = styled.div`
  width:100%; 
  padding: 10px 0;
  color: rgba(60, 60, 60, 0.9);
  background: #ffffff;

 
  

 

`;
const Wrapp = styled.div`

  display: flex;
  align-items: center;
  justify-content: space-between;


  
`;

const MinWrap = styled.div`
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
  display: flex;
  align-items: center;
  padding: 2px 5px;
  flex-wrap: nowrap;
  border-left: 1px solid rgba(60, 64, 67, 0.1);

  span {
    font-size: 15px;
    color: #000;
  }
  .icon {
    color: #870e0e;
    margin-right: 3px;
  }
  @media only screen and (max-width: 815px) {
    /* For mobile phones: */
    span{
      font-size:12px;
    }
    .icon{
      color: #C4A96A;
      margin-right:3px;
      font-size:99%;
    }
    }
    @media only screen and (max-width: 420px) {
     
    /* For mobile phones: */
    span{
      font-size:9px;
      font-weight:bolder;
    }
    .icon{
      color:  #C4A96A;
      margin-right:3px;
      font-size:99%;
    }
    }
`;
