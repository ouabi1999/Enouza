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
import { ClickAwayListener } from "@mui/material";

function NavBar({ outlet }) {
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
              <input placeholder="Search" />
            </div>

            <div className="search-icon-container">
              <SearchIcon className="search-icon" />
            </div>
          </div>
        </ClickAwayListener>
      )}
      <Container>
        <ChildContainer>
          <Logo>
            <Link to="/">
              <img width="100vw" src="../Asset 4.png" alt="" />
            </Link>
          </Logo>
          <SearchContainer>
            <div className="search-bar">
              <input placeholder="Search " />
            </div>

            <div className="search-icon-container">
              <SearchIcon className="search-icon" />
            </div>
          </SearchContainer>
        </ChildContainer>
        <Wrapper>
          <div className="search-icon-container-responsive">
            <SearchIcon
              onClick={() => setIsSearchInputOpen(!isSearchInputOpen)}
              className="search-icon-responsive"
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
          <DropDownMenuLang
            isLangMenuOpen={isLangMenuOpen}
            setIsLangMenuOpen={setIsLangMenuOpen}
            country={country}
            topPosition="60px"
            righPosition="20px"
          />

          <DropDownMenu
            logout={logout}
            isAuth={isAuth}
            isProfileOpen={isProfileOpen}
            openProfileMenu={openProfileMenu}
            setIsProfileOpen={setIsProfileOpen}
          />

          <MenuIcon className="menu-icon" onClick={hideSideBarMenu} />
        </Wrapper>
      </Container>
      {isSideBarOpen && (
        <SideBar
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
  width: calc(100% - 20px);

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
    }

    .responsive-input input {
      height: 100%;
      width: 100%;
      border: none;
      padding: 0 4px 0 4px;
      outline: none;
      background: lightgray;
    }
    .responsive-input:focus {
      outline: 0.5px solid orange;
    }
    .search-bar {
      height: 100%;
    }
    .search-icon-container {
      height: 100%;
      background: #f37421;
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
      top: 60px;
      z-index: 1;
      left: 0;
    }
  }
`;
const Container = styled.div`
  display: flex;
  align-items: center;
  height: 40px;
  padding: 10px;
  width: 100%;
  max-width: 1920px;
  min-width: 320px;
  background: #141414;
  position: sticky;
  top: 0;
  z-index: 1;

  a {
    color: #000000;
  }
  .menu-icon {
    color: #ffff;
    cursor: pointer;
    font-size: 30px;
    display: none;
  }
  @media only screen and (max-width: 615px) {
    img {
      width: 25vw;
      max-width: 120px;
    }
  }
  @media only screen and (max-width: 860px) {
    /* For mobile phones: */

    .menu-icon {
      display: inline;
    }
    .Lang_currency {
      display: none;
    }
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
  }
  .shopping-cart-icon {
    color: #ffffff;
    font-size: 30px;
  }
  .cart-number-container {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    right: -10px;
    top: -10px;
    background: #fff;
    color: #000000;
    border-radius: 50%;
    width: 20px;
    height: 20px;
  }

  .search-icon-container-responsive {
    display: none;
  }
  .search-icon-responsive {
    color: #ffff;
    cursor: pointer;
    font-size: 30px;
  }
  @media only screen and (max-width: 650px) {
    .search-icon-container-responsive {
      display: flex;
    }
  }
`;
const Logo = styled.div`
  display: flex;
  justify-content: space-between;
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
    background: #f37421;
    border-radius: 0 4px 4px 0;
    display: flex;
    align-items: center;
  }
  .search-icon {
    padding: 8px;
    color: #fff;
  }

  @media only screen and (max-width: 650px) {
    /* For mobile phones: */
    display: none;
  }
`;
