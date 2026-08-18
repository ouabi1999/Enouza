import React, { useState } from "react";
import styled from "styled-components";

import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import MenuIcon from "@mui/icons-material/Menu";

import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { ClickAwayListener } from "@mui/material";

import { setLogout } from "../../features/authSlice";
import { setSearch } from "../../features/filterSlice";

import ApiInstance from "../../../common/baseUrl";

import DropDownMenu from "./DropDownMenu";
import DropDownMenuLang from "./DropDownMenuLang";
import SideBar from "./SideBar";

import { useTranslation } from "react-i18next";


// ============================================================
// ENOUZA — LUXURY COLORS
// ============================================================

const COLORS = {
  cream: "#F7F5F0",
  white: "#FFFFFF",
  ink: "#1D1C1A",
  muted: "#77736B",
  gold: "#B39A76",
  softGold: "#DED4C4",
  border: "#E4DED4",
};


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

  const [language, setLanguage] = useState("");
  const [currency, setCureency] = useState("");

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

        console.log(response.data);
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

    navigate("/collections/?search");
  };


  // ==========================================================
  // RETURN
  // ==========================================================

  return (
    <ParentContainer>

      {/* ======================================================
          MOBILE SEARCH
      ====================================================== */}

      {isSearchInputOpen && (
        <ClickAwayListener
  mouseEvent="onMouseDown"
  touchEvent="onTouchEnd"
  onClickAway={() => setIsSearchInputOpen(false)}
>
          <div className="search-container" >

            <div className="responsive-input">
              <input
                placeholder={t("common.search")}
                value={value}
                onChange={(e) =>
                  setSearchValue(e.target.value)
                }
                maxLength="100"
              />
            </div>

            <div className="search-icon-container"  style={{
                borderRadius:
                  i18n.dir() === "rtl"
                    ? "2px 0 0 2px"
                    : "0 2px 2px 0",
              }}
            >
              <SearchIcon
                className="search-icon"
                onClick={handleSearchInput}
              />
            </div>

          </div>
        </ClickAwayListener>
      )}


      {/* ======================================================
          MAIN NAVBAR
      ====================================================== */}

      <Container>

        {/* ====================================================
            LEFT
        ==================================================== */}

        <ChildContainer>

          {/* LOGO */}

          <Logo>
            <Link to="/">
              <span>ENOUZA</span>
            </Link>
          </Logo>

           
          {/* DESKTOP SEARCH */}

          <SearchContainer>

            <div className="search-bar">

              <input
                placeholder={t("common.search")}
                value={value}
                onChange={(e) =>
                  setSearchValue(e.target.value)
                }
                maxLength="50"

                style={{
                  borderRadius:
                    i18n.dir() === "rtl"
                      ? "0 2px 2px 0"
                      : "2px 0 0 2px",
                }}
              />

            </div>


            <div
              className="search-icon-container"

              style={{
                borderRadius:
                  i18n.dir() === "rtl"
                    ? "2px 0 0 2px"
                    : "0 2px 2px 0",
              }}
            >
              <SearchIcon
                className="search-icon"
                onClick={handleSearchInput}
              />
            </div>

          </SearchContainer>

        </ChildContainer>


        {/* ====================================================
            RIGHT SIDE
        ==================================================== */}

        <Wrapper>

          {/* MOBILE SEARCH */}

          <div className="search-icon-container-responsive">

            <SearchIcon
              onClick={() =>
                setIsSearchInputOpen(true)
              }

              className="search-icon-responsive"
            />

          </div>


          {/* LANGUAGE */}

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


          {/* PROFILE */}

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


          {/* =================================================
              SHOPPING CART
          ================================================= */}

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


          {/* MOBILE MENU */}

          <MenuIcon
            className="menu-icon"
            onClick={hideSideBarMenu}
          />

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


// ============================================================
// PARENT
// ============================================================

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

  top: 0;
  inset-inline: 0;

  z-index: 3;

  height: 58px;

  padding: 8px 14px;

  box-sizing: border-box;

  background: ${COLORS.cream};

  border-bottom: 1px solid ${COLORS.border};

  box-shadow:
    0 8px 25px rgba(29, 28, 26, 0.06);


  .responsive-input {
    flex: 1;

    min-width: 0;

    height: 40px;

    display: flex;
  }


  .responsive-input input {
    box-sizing: border-box;

    width: 100%;
    height: 40px;

    padding: 0 14px;

    border: 1px solid ${COLORS.border};

    border-radius: 2px 0 0 2px;

    outline: none;

    background: ${COLORS.white};
    color: ${COLORS.ink};

    font-family: inherit;
    font-size: 13px;
    line-height: 1;

    transition:
      border-color 0.2s ease;

    &::placeholder {
      color: ${COLORS.muted};
    }

    &:focus {
      border-color: ${COLORS.gold};
    }
  }


  .search-icon-container {
    width: 42px;

    height: 40px;

    flex-shrink: 0;

    box-sizing: border-box;

    display: flex;

    align-items: center;
    justify-content: center;

    background: ${COLORS.ink};

    color: ${COLORS.white};

    cursor: pointer;

    border-radius: 0 2px 2px 0;
    
  }


  .search-icon {
    display: block;

    padding: 0;

    color: ${COLORS.white};

    font-size: 20px;
  }
}
  @media only screen and (min-width: 861px) {
  .search-container {
    display: none;
  }
    .responsive-input input{
    font-size:16px;
    }
}
`;


// ============================================================
// MAIN NAVBAR
// ============================================================

const Container = styled.div`
  position: sticky;
  top: 0;
  z-index: 2;
  min-width: 320px;
  height: 68px;
  display: flex;
  align-items: center;
  padding: 0 32px;
  background: rgba(247, 245, 240, 0.96);
  color: ${COLORS.ink};

  border-bottom: 1px solid ${COLORS.border};

  backdrop-filter: blur(12px);

  -webkit-backdrop-filter: blur(12px);


  a {
    color: ${COLORS.ink};

    text-decoration: none;
  }


  /* ========================================================
     MOBILE MENU
  ======================================================== */

  .menu-icon {
    display: none;

    color: ${COLORS.ink};

    cursor: pointer;

    font-size: 27px;

    transition:
      color 0.2s ease;

    &:hover {
      color: ${COLORS.gold};
    }
  }


  .drop-down-lang-container,
  .drop-down-menu-container {
    display: flex;

    align-items: center;
  }


  @media only screen and (max-width: 1000px) {
    padding: 0 24px;
  }


  @media only screen and (max-width: 860px) {


    padding: 0 20px;


    .menu-icon {
      display: flex;
    }


    .drop-down-lang-container,
    .drop-down-menu-container {
      display: none;
    }
  }


  @media only screen and (max-width: 650px) {

    height: 58px;

    padding: 0 15px;
  }
`;


// ============================================================
// LEFT SIDE
// ============================================================

const ChildContainer = styled.div`
  width: 60%;

  display: flex;

  align-items: center;

  justify-content: space-between;

  gap: 28px;

  min-width: 0;


  @media only screen and (max-width: 1000px) {
    width: 58%;
  }


  @media only screen and (max-width: 860px) {
    width: auto;

    flex: 1;
  }
`;


// ============================================================
// LOGO
// ============================================================

const Logo = styled.div`
  flex-shrink: 0;

  display: flex;

  align-items: center;

  margin: 0;


  a {
    display: flex;

    align-items: center;

    text-decoration: none;
  }


  span {
    margin: 0 !important;

    color: ${COLORS.ink} !important;

    font-family:
      "Playfair Display",
      "Cormorant Garamond",
      Georgia,
      serif !important;

    font-size: 28px !important;

    font-weight: 600 !important;

    line-height: 1 !important;

    letter-spacing: 0.18em !important;

    transition:
      color 0.25s ease;
  }


  
    @media (hover: hover) and (pointer: fine) {
  span:hover {
        color: ${COLORS.gold} !important;

  }
}


  @media only screen and (max-width: 650px) {

    span {
      font-size: 20px !important;

      letter-spacing: 0.15em !important;
    }
  }


  @media only screen and (max-width: 380px) {

    span {
      font-size: 18px !important;
    }
  }
`;


// ============================================================
// SEARCH
// ============================================================

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
    font-size: 12px;
    line-height: 1;

    transition:
      border-color 0.25s ease,
      background 0.25s ease;

    &::placeholder {
      color: ${COLORS.muted};
    }

    &:focus {
      border-color: ${COLORS.gold};
      background: ${COLORS.white};
    }
  }

  .search-icon-container {
    box-sizing: border-box;

    width: 40px;
    height: 38px;

    flex-shrink: 0;

    display: flex;
    align-items: center;
    justify-content: center;

    background: ${COLORS.ink};

    cursor: pointer;

    transition: background 0.25s ease;
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

  

  @media only screen and (max-width: 860px) {
    display: none;
  }
`;


// ============================================================
// RIGHT SIDE
// ============================================================

const Wrapper = styled.div`
  width: 39%;

  display: flex;

  align-items: center;

  justify-content: flex-end;

  gap: 30px;

  box-sizing: border-box;

  padding-right: 0;

  /* =========================
     SHOPPING CART
  ========================= */

  .shopping-cart {
    position: relative;

    display: flex;

    align-items: center;
    justify-content: center;

    direction: ltr;

    cursor: pointer;

    transition: transform 0.25s ease;
  }

  .shopping-cart:hover {
    transform: translateY(-1px);
  }

  .shopping-cart-icon {
    display: block;

    color: ${COLORS.ink};

    font-size: 22px;

    transition: color 0.25s ease;
  }

  .shopping-cart:hover .shopping-cart-icon {
    color: ${COLORS.gold};
  }

  /* =========================
     CART NUMBER
  ========================= */

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

  /* =========================
     MOBILE SEARCH
  ========================= */

  .search-icon-container-responsive {
    display: none;

    align-items: center;
    justify-content: center;
  }

  .search-icon-responsive {
    display: block;

    color: ${COLORS.ink};

    cursor: pointer;

    font-size: 22px;

    transition:
      color 0.25s ease,
      transform 0.25s ease;
  }

  .search-icon-responsive:hover {
    color: ${COLORS.gold};

    transform: translateY(-1px);
  }

  /* =========================
     RESPONSIVE
  ========================= */

  @media only screen and (max-width: 860px) {
    .search-icon-container-responsive {
      display: flex;
    }
  }

  @media only screen and (max-width: 650px) {
    width: auto;

    gap: 24px;
  }

  @media only screen and (max-width: 420px) {
    gap: 50px;

    .shopping-cart-icon,
    .search-icon-responsive {
      font-size: 21px;
    }
  }
`;