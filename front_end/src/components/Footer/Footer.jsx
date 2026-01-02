import React from 'react'
import styled from 'styled-components'
import { Link, NavLink, useNavigate } from "react-router-dom"
//import {setCategory } from '../../features/categories/categorySlice'
import {useTranslation} from 'react-i18next'
import CopyrightOutlinedIcon from '@mui/icons-material/CopyrightOutlined';
import NewsLetter from './NewsLetter'


const Footer = () => {
  //const navigate = useNavigate()
  //const dispatch = useDispatch()
  //const SelectedCategory = (value)=>{
   // dispatch(setCategory(value))
    const {t, i18n} = useTranslation()

  //}
  return (
    <Container>
      <Wrapper>
        <Wrapp>
          <ul className="social-categorie">
            <li className="text-info">{t("footer.followUs.title")}</li>
            <li>
              <i className="fab fa-facebook-f" />
              <a
                rel="noreferrer"
                target="_blank"
                href="https://www.facebook.com/profile.php?id=61571681156358"
              >
                {" "}
               {t("footer.followUs.facebook")}
              </a>
            </li>
            <li>
              <i className="fab fa-instagram" />
              <a
                rel="noreferrer"
                target="_blank"
                href="https://www.instagram.com/en.ouza"
              >
                {t("footer.followUs.instagram")}
              </a>
            </li>
            <li>
              <i className="fab fa-twitter" />
              <a
                rel="noreferrer"
                target="_blank"
                href="https://twitter.com/en_ouza"
              >
                {t("footer.followUs.twitter")}
              </a>
            </li>
            <li>
              <i className="fab fa-tiktok" />
              <a
                rel="noreferrer"
                target="_blank"
                href="https://www.tiktok.com/@en.ouza"
              >
                {t("footer.followUs.tiktok")}
              </a>
            </li>
          </ul>
          <ul className="policy">
            <li className="text-info">{t("footer.policies.title")}</li>
            <li>
              <Link to="terms-of-services">{t("footer.policies.termsOfService")}</Link>
            </li>

            <li>
              <Link to="privacy-policy">{t("footer.policies.privacyPolicy")} </Link>
            </li>
            <li>
              <Link to="shipping-policy"> {t("footer.policies.shippingPolicy")} </Link>
            </li>
            <li>
              <Link to="return-policy"> {t("footer.policies.refundPolicy")} </Link>
            </li>
          </ul>
          <ul className="social-categorie">
            <li className="text-info">{t("footer.help.title")}</li>
            <li>
              <i className="fab fa-facebook-f" />
              <Link to="contact-us">{t("footer.help.contactUs")}</Link>
            </li>
            <li>
              <i className="fab fa-instagram" />
              <Link to="about-us">{t("footer.help.aboutUs")}</Link>
            </li>
            <li>
              <i className="fab fa-twitter" />
              <Link to="help-center"> {t("footer.help.faq")}</Link>
            </li>
          </ul>

          <NewsLetter />
        </Wrapp>
      </Wrapper>
      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          marginTop: "35px",
          marginBottom: "0",
        }}
      >
        <div className="payment-methods-image">
          <img src="../payment-methods.png" alt="secure payment" />
        </div>
        <div className="CopyRight">
          <span>{t("footer.newsletter.all_rights_reserved")} </span>
           
          <span>{t("footer.newsletter.copyright")} </span>
          <CopyrightOutlinedIcon className="copy-icon" />

          <span>{new Date().getFullYear()}</span>
        </div>
      </div>
    </Container>
  );
}
export default Footer


const Container = styled.div`
  width: calc(100% - 20px);
  background: #e3e3e4;
  padding: 0px 10px;
  position: relative;

  .payment-methods-image {
    margin-left: 35px;
    width: 50vw;
    max-width: 360px;
    min-width: 320px;

    img {
      width: 100%;
      height: auto;
      object-fit: contain;
    }
  }

  .CopyRight {
    display: flex;
    align-items: center;
    span {
      font-size: 14px;
      color: #000000;
      margin-left: 4px;
    }
  }

  .copy-icon {
    font-size: 15px;
    margin-top: 2px;
    margin-left: 4px;
  }
  .CopyRight div {
    color: #000000;
  }

  @media only screen and (max-width: 700px) {
    .CopyRight {
      margin-bottom: 10px;
    }
    .payment-methods-image {
      margin-left: 0;
    }
  }
  @media only screen and (max-width: 400px) {
    .CopyRight {
      margin-bottom: 10px;
      font-size: 12px;
    }
  }
`;
const Wrapp = styled.div`
     display:grid;
     grid-template-columns: repeat(4, auto);
    
     
     @media only screen and (max-width: 870px) {
  &{
     
    grid-template-columns: repeat(2,auto);

  }
}
@media only screen and (max-width: 700px) {
  &{ 
    grid-template-columns: repeat(1, auto);
  }
  .CopyRight{
        margin-bottom:8px;
        
      }
      .payment-methods-image{
      margin-left:4px;
      

      
    }

}
`
const Wrapper = styled.div`

  a{
      color:#4d4a4a;
      font-weight: bold;
      font-size: 0.75rem;
      line-height: 1;
    
    }

  

    
    .text-info{
      font-weight: bold;
      font-size:15px;
      color:black;
    
    }
    
    
   

`