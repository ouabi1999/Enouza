import React, { useState } from "react";
import styled from "styled-components";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import { setLogout } from "../../features/authSlice";
import ApiInstance from "../../../common/baseUrl";
import DropDownMenu from "./DropDownMenu";
import DropDownMenuLang from "./DropDownMenuLang";
import MenuIcon from "@mui/icons-material/Menu";
import SideBar from "./SideBar";
import { ClickAwayListener, TextField } from "@mui/material";
import { useTranslation } from "react-i18next";
import { setSearch } from "../../features/filterSlice";

function NavBar({ outlet, setSearchValue, value }) {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const isAuth = window.localStorage.getItem("refresh_token");
  const refresh_token = window.localStorage.getItem("refresh_token");
  const [language, setLanguage] = useState("");
  const [currency, setCureency] = useState("");
  const [isSearchInputOpen, setIsSearchInputOpen] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const country = useSelector((state) => state.location.country);

  const logout = () => {
    ApiInstance.post("logout/", { refresh_token: refresh_token })
      .then((response) => {
        dispatch(setLogout(response.data));
        navigate("/");
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const openProfileMenu = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const hideSideBarMenu = () => {
    setIsSideBarOpen(!isSideBarOpen);
  };

  const handleSearchInput = (e) => {
    dispatch(setSearch(value))
    navigate("/search")
  }

  return (
    <ParentContainer>
      {isSearchInputOpen && (
        <ClickAwayListener
          mouseEvent="onMouseDown"
          touchEvent="onScroll"
          onClickAway={() => setIsSearchInputOpen(false)}
        >
          <div className="search-container">
            <div className="responsive-input">
              <input placeholder={t("common.search")} value={value} onChange={(e) => setSearchValue(e.target.value)} maxLength="100" 
              />
            </div>

            <div className="search-icon-container" >
              <SearchIcon className="search-icon" onClick={handleSearchInput} />
            </div>
          </div>
        </ClickAwayListener>
      )}
      <Container>
        <ChildContainer>
          <Logo>
            <Link to="/">
              <span style={{"margin":"0 5px", "letterSpacing": "2px", "color": "#000000", "fontSize": "20px", "fontFamily": "Playfair Display Cormorant Garamond, serif", "fontWeight": "bold" }}>ENOUZA</span>
            </Link>
          </Logo>
          <SearchContainer>
            <div className="search-bar">
              <input placeholder={t("common.search")} style={{
                borderRadius: i18n.dir() === "rtl" ? "0 4px 4px 0" : "4px 0 0 4px"
              }} value={value} onChange={(e) => setSearchValue(e.target.value)} maxLength="50" />
            </div>

            <div className="search-icon-container" style={{
              borderRadius: i18n.dir() === "rtl" ? "4px 0 0 4px" : "0 4px 4px 0"
            }}>
              <SearchIcon className="search-icon" onClick={handleSearchInput} />
            </div>
          </SearchContainer>
        </ChildContainer>
        <Wrapper>
          <div className="search-icon-container-responsive">
            <SearchIcon
              onClick={() => setIsSearchInputOpen(true)}
              className="search-icon-responsive"
            />
          </div>
         
          <div className="drop-down-lang-container">
            <DropDownMenuLang
              isLangMenuOpen={isLangMenuOpen}
              setIsLangMenuOpen={setIsLangMenuOpen}
              country={country}
              topPosition="60px"
              righPosition="20px"
              t = {t}
              i18n={i18n}

            />
          </div>
          <div className="drop-down-menu-container">
            <DropDownMenu
              logout={logout}
              isAuth={isAuth}
              isProfileOpen={isProfileOpen}
              openProfileMenu={openProfileMenu}
              setIsProfileOpen={setIsProfileOpen}
              t = {t}
              i18n={i18n}
            />
          </div>
           <Link to="/shopping-cart">
            <div className="shopping-cart">
              <ShoppingCartIcon className="shopping-cart-icon" />
              <div className="cart-number-container">
                <span>{cartItems?.length || 0}</span>
              </div>
            </div>
          </Link>
          <MenuIcon className="menu-icon" onClick={hideSideBarMenu} />
        </Wrapper>
      </Container>
      {isSideBarOpen && (
        <SideBar
          t = {t}
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
      {outlet}
    </ParentContainer>
  );
}

export default NavBar;
const ParentContainer = styled.div`
  position: relative;
  width:100%;
  .search-container {
    display: none;
    align-items: center;
    height: 40px;
    width: 100%;
    margin: 0;
    padding: 0;
    min-width: 300px;
    max-width: 1920px;
    background-color: blue;

    .responsive-input {
      height: 100%;
      width: 100%;
      font-size: 16px;

    }

    .responsive-input input {
      font-size: 16px;
      height: 100%;
      width: 100%;
      border: none;
      padding: 0 4px 0 4px;
      border-radius:0;
      outline: none;
      background: #c5c5c5;
      z-index: 999;
    }
    .responsive-input:focus {
      outline: 0.5px solid orange;
    }
    .search-bar {
      height: 100%;
      cursor: pointer;

    }
    .search-icon-container {
      height: 100%;
      width: 45px;
      background:  #000000;
      color:#ffffff;
      display: flex;
      align-items: center;
    }
    .search-icon {
      padding: 8px;
      color: #fff;
    }
  }

  @media only screen and (max-width: 650px) {
    /* For mobile phones: */
    .search-container {
      display: flex;
      position: fixed;
      top: 50px;
      z-index: 9999;
      left: 0;
    }
  }
`;
const Container = styled.div`
  display: flex;
  align-items: center;
  height: 40px;
  padding: 10px 0;
  max-width: 1920px;
  min-width: 320px;
  background: #dfd9d9;
  position: sticky;
  top: 0;
  z-index: 99;
  
  a {
    color: #000000;
  }
  .menu-icon {
    color: #000000;
    cursor: pointer;
    font-size: 30px;
    display: none;
  }
  @media only screen and (max-width: 615px) {
    img {
      width: 22vw;
      max-width: 120px;
    }
  }
  @media only screen and (max-width: 860px) {
    /* For mobile phones: */

    .menu-icon {
      display: inline;
    }
    .drop-down-lang-container {
      display: none;
    }
    .drop-down-menu-container {
      display: none;
    }
    .sign-in-button {
      display: none;
    }
    .person-icon {
      display: none;
    }
  }
      @media only screen and (max-width: 650px) {
      
      &{
        padding:10px 0px;}
    }

`;
const ChildContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 60%;
  gap: 15px;
`;
const Wrapper = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  width: 39%;
  gap: 30px;

  .shopping-cart {
    position: relative;
    display: flex;
    justify-content: center;
    align-content: center;
    margin:0 10px;
  }
  .shopping-cart-icon {
    color: #000000;
    font-size: 25px;
  }
  .cart-number-container {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    right: 4px;
    top: -12px;
    color: #000000;
    border-radius: 50%;
    width: 18px;
    height: 18px;
    font-size: 14px;
  }

  .search-icon-container-responsive {
    display: none;
  }
  .search-icon-responsive {
    color: #ffffff;
    cursor: pointer;
    font-size: 30px;
  }
  @media only screen and (max-width: 650px) {
    .search-icon-container-responsive {
      display: flex;
    }
    &{
      width: 50%;
      justify-content: space-between;
      
    }
  }
`;
const Logo = styled.div`
 margin-left: 10px;
   @media only screen and (max-width: 650px) {
    /* For mobile phones: */
    &{
      margin-top:4px;
    }
  }
`;
const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  margin-right: 15px;
  height: 40px;
  input {
    height: 100%;
    width: 30vw;
    min-width: 100px;
    border: none;
    border-radius: 4px 0 0 4px;
    padding: 0 4px 0 4px;
    outline: none;
  }
  input:focus {
    outline: 0.5px solid orange;
  }
  .search-bar {
    height: 100%;
  }
  .search-icon-container {
    height: 100%;
    width: 45px;
    background:  #000000;
    border-radius: 0 4px 4px 0;
    display: flex;
    align-items: center;
    cursor: pointer;
  }
  .search-icon {
    padding: 8px;
    color: #ffffff;
  }

  @media only screen and (max-width: 650px) {
    /* For mobile phones: */
    display: none;
  }
`;
