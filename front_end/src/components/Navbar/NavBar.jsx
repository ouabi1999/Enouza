import React, { useState } from "react";
import styled from "styled-components";

import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import MenuIcon from "@mui/icons-material/Menu";

import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import ClickAwayListener from "@mui/material/ClickAwayListener";
import { setLogout } from "../../features/authSlice";
import { setSearch } from "../../features/filterSlice";

import ApiInstance from "../../../common/baseUrl";

import DropDownMenu from "./DropDownMenu";
import DropDownMenuLang from "./DropDownMenuLang";
import SideBar from "./SideBar";

import { useTranslation } from "react-i18next";
import UserServices from "../Services/UserServices";


// ============================================================
// ENOUZA — LUXURY COLORS
// ============================================================

const COLORS = {
  cream: "#F7F5F0",
  white: "#FFFFFF",
  ink: "#373737",
  muted: "#77736B",
  gold: "#B39A76",
  softGold: "#DED4C4",
  border: "#E4DED4",
};


// ============================================================
// COLLECTION KEYS
// ============================================================

const COLLECTION_KEYS = [
  "table_lamps",
];


// ============================================================
// COMPONENT
// ============================================================

function NavBar({ outlet, setSearchValue, value }) {

  // ----------------------------------------------------------
  // REDUX
  // ----------------------------------------------------------

  const cartItems = useSelector(
    (state) => state.cart.cartItems
  );

  const country = useSelector(
    (state) => state.location.country
  );

  const [required, setRequired] = useState(false);


  // ----------------------------------------------------------
  // AUTH
  // ----------------------------------------------------------

  const isAuth =
    window.localStorage.getItem("refresh_token");

  const refresh_token =
    window.localStorage.getItem("refresh_token");


  // ----------------------------------------------------------
  // STATE
  // ----------------------------------------------------------

  const [isSearchInputOpen, setIsSearchInputOpen] =
    useState(false);

  const [isProfileOpen, setIsProfileOpen] =
    useState(false);

  const [isSideBarOpen, setIsSideBarOpen] =
    useState(false);

  const [isLangMenuOpen, setIsLangMenuOpen] =
    useState(false);


  // ----------------------------------------------------------
  // HOOKS
  // ----------------------------------------------------------

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { t, i18n } = useTranslation();


  // ==========================================================
  // LOGOUT
  // ==========================================================

  const logout = () => {

    ApiInstance.post("logout/", {
      refresh_token: refresh_token,
    })

      .then((response) => {

        dispatch(setLogout(response.data));

        navigate("/");

      })

      .catch((error) => {

        console.log(error);

      });
  };


  // ==========================================================
  // PROFILE
  // ==========================================================

  const openProfileMenu = () => {
    setIsProfileOpen(!isProfileOpen);
  };


  // ==========================================================
  // SIDEBAR
  // ==========================================================

  const hideSideBarMenu = () => {
    setIsSideBarOpen(!isSideBarOpen);
  };


  // ==========================================================
  // SEARCH
  // ==========================================================

  const handleSearchInput = () => {

    dispatch(setSearch(value));

    if (value) {

      navigate(`/collections/?search=${encodeURIComponent(value)}`);

    } else {

      setRequired(true);

    }
  };


  // ==========================================================
  // RETURN
  // ==========================================================

  return (

    <ParentContainer dir="ltr">

      {/* ======================================================
          MOBILE SEARCH
      ====================================================== */}

      {isSearchInputOpen && (

        <ClickAwayListener
          mouseEvent="onMouseDown"
          touchEvent="onTouchEnd"
          onClickAway={() =>
            setIsSearchInputOpen(false)
          }
        >

          <div
            className="search-container"
            dir={
              i18n.language === "ar"
                ? "rtl"
                : "ltr"
            }
          >

            <div className="responsive-input">

              <input
                style={{
                  borderColor: required
                    ? "red"
                    : undefined,
                }}

                placeholder={t("common.search")}

                value={value}

                onChange={(e) => {

                  setSearchValue(e.target.value);

                  setRequired(false);

                }}

                maxLength="100"
              />

            </div>


            <button
              type="button"
              className="search-icon-container"
              onClick={handleSearchInput}
              aria-label={t("common.search")}
              onMouseLeave={() =>
                setRequired(false)
              }
            >

              <SearchIcon
                className="search-icon"
              />

            </button>

          </div>

        </ClickAwayListener>
      )}


      {/* ======================================================
          MAIN NAVBAR
      ====================================================== */}

      <UserServices />

      <Container>

        {/* ====================================================
            LEFT: menu + logo + collection nav
        ==================================================== */}

        <ChildContainer>

          {/* ==================================================
              MOBILE MENU
              ================================================== */}

          <button
            type="button"
            className="menu-icon"
            aria-label="Menu"
            aria-expanded={isSideBarOpen}
            onClick={hideSideBarMenu}
          >
            <MenuIcon aria-hidden="true" />
          </button>

          {/* ==================================================
              LOGO
              ================================================== */}

          <LogoLink to="/">

            <BrandLogo>

              <img
                src="https://res.cloudinary.com/dzpzy1o1y/image/upload/f_auto,q_auto,w_100/v1791076399/enouza_logo_black_vpsxgw.png"

                alt="ENOUZA"
              />

              <span>NOUZA</span>

            </BrandLogo>

          </LogoLink>


          {/* ==================================================
              COLLECTION LINKS (BESIDE LOGO)
              ================================================== */}

          <CollectionsNav
            dir={i18n.language === "ar" ? "rtl" : "ltr"}
          >

            <NavLink to="/collections/?sort=newest" end>
              {t("common.new")} {t("filterPage.collection")}
            </NavLink>

            <NavLink to="/collections/?sort=best_sellers">
              {t("homePage.best_sellers")}
            </NavLink>

            <NavLink to="/collections/?category=collection_lamp">
              {t("collectionSection.categories.lamp_collection.title")}
            </NavLink>




          </CollectionsNav>

        </ChildContainer>


        {/* ====================================================
            RIGHT: search + icons
        ==================================================== */}

        <Wrapper>

          {/* ==================================================
              DESKTOP SEARCH
              ================================================== */}

          <SearchContainer
            dir={
              i18n.language === "ar"
                ? "rtl"
                : "ltr"
            }
          >

            <div className="search-bar">

              <input
                style={{
                  borderColor: required
                    ? "red"
                    : undefined,
                }}

                placeholder={t("common.search")}

                value={value}

                onChange={(e) => {

                  setSearchValue(e.target.value);

                  setRequired(false);

                }}

                maxLength="50"
              />

            </div>


            <button
              type="button"
              className="search-icon-container"
              onClick={handleSearchInput}
              aria-label={t("common.search")}
              onMouseLeave={() =>
                setRequired(false)
              }
            >

              <SearchIcon
                className="search-icon"
              />

            </button>

          </SearchContainer>


          {/* ==================================================
              MOBILE SEARCH ICON
              ================================================== */}

          <div className="search-icon-container-responsive">

            <SearchIcon

              onClick={() =>
                setIsSearchInputOpen(true)
              }

              className="search-icon-responsive"

            />

          </div>


          {/* ==================================================
              LANGUAGE
              ================================================== */}

          <div className="drop-down-lang-container">

            <DropDownMenuLang

              isLangMenuOpen={isLangMenuOpen}

              setIsLangMenuOpen={setIsLangMenuOpen}

              country={country}

              topPosition="60px"

              righPosition="20px"

              t={t}

              i18n={i18n}

            />

          </div>


          {/* ==================================================
              PROFILE
              ================================================== */}

          <div className="drop-down-menu-container">

            <DropDownMenu

              logout={logout}

              isAuth={isAuth}

              isProfileOpen={isProfileOpen}

              openProfileMenu={openProfileMenu}

              setIsProfileOpen={setIsProfileOpen}

              t={t}

              i18n={i18n}

            />

          </div>


          {/* ==================================================
              SHOPPING CART
              ================================================== */}

          <Link to="/shopping-cart">

            <div className="shopping-cart">

              <ShoppingCartIcon
                className="shopping-cart-icon"
              />

              <div className="cart-number-container">

                <span>
                  {cartItems?.length || 0}
                </span>

              </div>

            </div>

          </Link>

        </Wrapper>

      </Container>


      {/* ======================================================
          SIDEBAR
      ====================================================== */}

      {isSideBarOpen && (

        <SideBar

          t={t}

          isAuth={isAuth}

          isLangMenuOpen={isLangMenuOpen}

          setIsLangMenuOpen={setIsLangMenuOpen}

          country={country}

          hideSideBarMenu={hideSideBarMenu}

          logout={logout}

          isProfileOpen={isProfileOpen}

          openProfileMenu={openProfileMenu}

          setIsProfileOpen={setIsProfileOpen}

          collectionKeys={COLLECTION_KEYS}

        />

      )}


      {/* ======================================================
          OUTLET
      ====================================================== */}

      {outlet}

    </ParentContainer>

  );
}

export default NavBar;


const ParentContainer = styled.div`

  position: relative;

  width: 100%;

  color: ${COLORS.ink};


  /* ==========================================================
     MOBILE SEARCH
  ========================================================== */

  .search-container {

    display: flex;

    align-items: center;

    position: fixed;

    top: 35px;

    inset-inline: 0;

    z-index: 3;

    height: 50px;

    padding: 8px 14px;

    box-sizing: border-box;

    background: ${COLORS.cream};

    border-bottom: 1px solid ${COLORS.border};

    box-shadow:
      0 8px 25px rgba(29, 28, 26, 0.06);

  }


  .responsive-input {

    flex: 1;

    min-width: 0;

    height: 35px;

    display: flex;

  }


  .responsive-input input {

    box-sizing: border-box;

    width: 100%;

    height: 35px;

    padding: 0 16px;

    border: 1px solid ${COLORS.border};

    outline: none;

    background: ${COLORS.white};

    color: ${COLORS.ink};

    font-family: inherit;

    font-size: 16px;

    line-height: 1;

    -webkit-text-size-adjust: 100%;

    transition:
      border-color 0.2s ease;

  }


  .responsive-input input::placeholder {

    color: ${COLORS.muted};

    font-size: 16px;

  }


  .responsive-input input:focus {

    border-color: ${COLORS.gold};

  }


  .search-container
  .search-icon-container {

    width: 42px;

    height: 35px;

    flex-shrink: 0;

    display: flex;

    align-items: center;

    justify-content: center;

    border: none;

    background: ${COLORS.ink};

    color: ${COLORS.white};

    cursor: pointer;

  }


  .search-container
  .search-icon {

    display: block;

    padding: 0;

    color: ${COLORS.white};

    font-size: 20px;

  }


  /* ==========================================================
     DESKTOP
  ========================================================== */

  @media only screen and (min-width: 861px) {

    .search-container {

      display: none;

    }

  }

`;

const Container = styled.div`
  position: sticky;
  top: 34px;
  z-index: 2;
  display: flex;
  min-height: 60px;
  box-sizing: border-box;
  align-items: center;
  justify-content: space-between;
  gap: clamp(16px, 3vw, 40px);
  padding-inline: clamp(16px, 3vw, 40px);
  border-bottom: 1px solid ${COLORS.border};
  background: ${COLORS.white};
  color: ${COLORS.ink};

  a {
    color: inherit;
    text-decoration: none;
  }

  :is(a, button):focus-visible {
    outline: 2px solid #806547;
    outline-offset: 2px;
  }

  .menu-icon {
    display: none;
    cursor: pointer;
    background:none;
  }

  @media (max-width: 860px) {
    min-height: 54px;

    .menu-icon {
      display: block;
    }

    .drop-down-lang-container,
    .drop-down-menu-container {
      display: none;
    }
  }
`;

const ChildContainer = styled.div`
  display: flex;
  align-items: center;
  gap: clamp(16px, 3vw, 44px);
  min-width: 0;
`;

const LogoLink = styled(Link)`
  display: inline-flex;
  flex-shrink: 0;

  @media (max-width: 860px) {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

const BrandLogo = styled.div`
  display: flex;
  align-items: center;
  color: #20201d;
  font: 26px / 1 Georgia, serif;
  letter-spacing: 0.15em;

  img {
    display: block;
    width: 26px;
  }

  @media (max-width: 420px) {
    font-size: 22px;

    img {
      width: 22px;
    }
  }
`;

const CollectionsNav = styled.nav`
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  gap: 2px clamp(8px, 1vw, 16px);
  padding-block: 8px;

  a {
    padding: 7px 8px;
    font-size: 14px;
    font-weight: 600;
    line-height: 1.25;
    white-space: nowrap;
  }

  a:is(:hover, :focus-visible) {
    text-decoration: underline;
    text-underline-offset: 5px;
    color: #563f29;
  }

  @media (max-width: 1250px) {
    display: none;
  }
`;

const SearchContainer = styled.div`

  display: flex;

  align-items: center;

  width: auto;

  height: 38px;


  .search-bar {

    height: 38px;

    display: flex;

  }


  input {

    box-sizing: border-box;

    width: clamp(170px, 30vw, 420px);

    height: 38px;

    padding: 0 13px;

    border: 1px solid ${COLORS.border};

    outline: none;

    background: ${COLORS.white};

    color: ${COLORS.ink};

    font-family: inherit;

    font-size: 14px;

    line-height: 1;

    transition:
      border-color 0.25s ease,
      background 0.25s ease;

  }


  input::placeholder {

    color: ${COLORS.muted};

  }


  input:focus {

    border-color: ${COLORS.gold};

    background: ${COLORS.white};

  }


  .search-icon-container {

    box-sizing: border-box;

    width: 40px;

    height: 38px;

    flex-shrink: 0;

    display: flex;

    align-items: center;

    justify-content: center;

    border: none;

    background: ${COLORS.ink};

    cursor: pointer;

    transition:
      background 0.25s ease;

  }


  .search-icon-container:hover {

    background: ${COLORS.gold} !important;

  }


  .search-icon {

    display: block;

    padding: 0;

    color: ${COLORS.white};

    font-size: 19px;

  }


  /* ========================================================
     MOBILE
  ======================================================== */

  @media only screen and (max-width: 860px) {

    display: none;

  }

`;

const Wrapper = styled.div`
  display: flex;
  flex-shrink: 0;
  align-items: center;
  gap: clamp(12px, 1.5vw, 24px);

  .shopping-cart {

    position: relative;

    display: flex;

    align-items: center;

    justify-content: center;

    direction: ltr;

    cursor: pointer;

    transition:
      transform 0.25s ease;

  }


  .shopping-cart:hover {

    transform: translateY(-1px);

  }


  .shopping-cart-icon {

    display: block;

    color: ${COLORS.ink};

    font-size: 22px;

    transition:
      color 0.25s ease;

  }


  .shopping-cart:hover
  .shopping-cart-icon {

    color: ${COLORS.gold};

  }


  /* ========================================================
     CART NUMBER
  ======================================================== */

  .cart-number-container {

    position: absolute;

    top: -8px;

    inset-inline-end: -8px;

    width: 15px;

    height: 15px;

    display: flex;

    align-items: center;

    justify-content: center;

    border-radius: 50%;

    background: ${COLORS.gold};

    color: ${COLORS.white};

    font-size: 8px;

    font-weight: 700;

    line-height: 1;

  }


  .search-icon-responsive {
    display: block;
    font-size: 22px;
  }

  .search-icon-container-responsive {
    display: none;
    cursor: pointer;
  }

  @media (max-width: 860px) {
    .search-icon-container-responsive {
      display: flex;
    }
  }
`;
