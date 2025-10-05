import React, { useEffect, useState } from "react";
import DropDownMenu from "./DropDownMenu";
import styled from "styled-components";
import DisabledByDefaultIcon from "@mui/icons-material/DisabledByDefault";
import { Link } from "react-router-dom";
import FacebookIcon from "@mui/icons-material/Facebook";
import YouTubeIcon from "@mui/icons-material/YouTube";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import PersonIcon from "@mui/icons-material/Person";
import DropDownMenuLang from "./DropDownMenuLang";
import { useSelector } from "react-redux";
import { ClickAwayListener } from "@mui/material";
import { useTranslation } from "react-i18next";

function SideBar(props) {
  const user = useSelector(state => state.auth.user)
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
    const {t, i18n} = useTranslation();

    const openProfileMenu = () => {
      setIsProfileOpen(!isProfileOpen);
    };
  return (
    <ClickAwayListener
    mouseEvent="onMouseDown"
                  touchEvent="onScroll"
                  onClickAway={props.hideSideBarMenu}
    
    >
    <Container> 
      <div className="first-section">
        <DisabledByDefaultIcon onClick={props.hideSideBarMenu} />
        <User_container>
          {props.isAuth !== null ? (
            <div className="user">
              <span> {t(common.Hello)}, {user?.firstName.slice(0, 20)} </span>
              <div>
              <DropDownMenu
                logout={props.logout}
                isAuth={props.isAuth}
                isProfileOpen={isProfileOpen}
                openProfileMenu={openProfileMenu}
                setIsProfileOpen={setIsProfileOpen}
              />
              </div>
            </div>
          ) : (
            <Link onClick={props.hideSideBarMenu}  to="/auth" className="sign_in_button">
              <span>
                <PersonIcon />
              </span>
              <span>{t("common.register")}</span>
            </Link>
          )}
        </User_container>
      </div>
      <div className="lang">
        <DropDownMenuLang
          topPosition="100px"
          rightPosition="-2px"
          isLangMenuOpen={isLangMenuOpen}
          setIsLangMenuOpen={setIsLangMenuOpen}
          country={props.country}
        />
      </div>
      <h4>{t("policies.title")}</h4>
      <Wrapper>
        <Wrapp>
          <Link onClick={props.hideSideBarMenu}  to="terms-of-services">{t("policies.termsOfService.title")}</Link>
          <Link onClick={props.hideSideBarMenu}  to="about-us"> {t("policies.aboutUs.title")} </Link>
          <Link onClick={props.hideSideBarMenu}  to="contact-us"> {t("footer.contactUs")} </Link>
          <Link onClick={props.hideSideBarMenu}  to="privacy-policy"> {t("policies.privacyPolicy.title")} </Link>
        </Wrapp>
      </Wrapper>
      <h4>{t("footer.followUs")}</h4>
      <SocialMedia>
        <a rel="noreferrer" target="_blank" href="https://www.facebook.com/profile.php?id=61571681156358">
          <FacebookIcon className="social-icon" />
        </a>
        <a
          rel="noreferrer"
          target="_blank"
          href="https://www.youtube.com/@enouza"
        >
          <YouTubeIcon className="social-icon" />
        </a>
        <a
          rel="noreferrer"
          target="_blank"
          href="https://www.instagram.com/en.ouza"
        >
          <InstagramIcon className="social-icon" />
        </a>
        <a rel="noreferrer" target="_blank" href="https://twitter.com/en_ouza">
          <TwitterIcon className="social-icon" />
        </a>
      </SocialMedia>
    </Container>
    </ClickAwayListener>
  );
}

export default SideBar;

const Container = styled.div`
  position: fixed;
  z-index: 40;
  top: 0;
  right: 0;
  padding: 2px 5px;
  width: 300px;
  background: #d9d9d9;
  height: 100%;
  transition: ease-in-out;
  animation-duration: 1s;
  animation-name: hideShowMenu;

  @keyframes hideShowMenu {
    from {
      width: 0;
    }
    to {
      width: 300px;
    }
  }
  .first-section {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .user {
    display: flex;
    align-items: center;
  }
  .user span {
    margin-right: 10px;
    font-size: 13px;
    white-space: nowrap;
  }
  h4,
  .lang {
    margin-left: 15px;
  }
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 1.2ch;
  width: 100%;
  align-items: center;

  a {
    color: #000;
    font-size: 13px;
    margin-right: 8px;
    margin-bottom: 15px;
  }
`;
const SocialMedia = styled.div`
  display: flex;
  justify-content: space-evenly;
  .social-icon {
    color: orange;
  }
`;
const Wrapp = styled.div`
  display: flex;
  flex-direction: column;
`;
const User_container = styled.div`
  margin-right: 6px;
  margin-top: 10px;
  margin-bottom: 10px;

  .sign_in_button {
    display: flex;
    align-items: center;
    background: #007cff;
    border-radius: 6px;
    color: #ffff;
    padding: 3px 8px;
    font-size: 12px;
    white-space: nowrap;
  }
`;
