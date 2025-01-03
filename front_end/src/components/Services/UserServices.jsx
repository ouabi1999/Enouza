import React from "react";
import styled from "styled-components";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
function UserServices() {
  return (
    <Container>
      <Wrapp>
        <MinWrap>
          <MonetizationOnIcon className="icon" />
          <span>Money back guarantee</span>
        </MinWrap>
        <MinWrap>
          <VerifiedUserIcon className="icon" />
          <span>Safe & reliable payments</span>
        </MinWrap>
        <MinWrap>
          <SupportAgentIcon className="icon" />
          <span> 24/7 Support</span>
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
  border-bottom: 1px solid lightgray;
  background: #ffff;
  overflow:hidden;
  -webkit-overflow:hidden;
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
    color: #e65c00;
    margin-right: 3px;
  }
  @media only screen and (max-width: 815px) {
    /* For mobile phones: */
    span{
      font-size:12px;
    }
    .icon{
      color:#e65c00;
      margin-right:3px;
      font-size:99%;
    }
    }
    @media only screen and (max-width: 400px) {
     
    /* For mobile phones: */
    span{
      font-size:9px;
      font-weight:bolder;
    }
    .icon{
      color:#e65c00;
      margin-right:3px;
      font-size:99%;
    }
    }
`;
