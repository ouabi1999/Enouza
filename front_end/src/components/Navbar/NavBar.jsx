import React, { useState } from 'react'
import styled from "styled-components"
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import { setLogout } from '../../features/authSlice';
import ApiInstance from '../../../common/baseUrl';
import DropDownMenu from './DropDownMenu';
import DropDownMenuLang from './DropDownMenuLang';
import Flag from 'react-world-flags'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import MenuIcon from '@mui/icons-material/Menu';


function NavBar({outlet}) {
  const cartItems = useSelector(state => state.cart.cartItems)
  const isAuth =  window.localStorage.getItem("refresh_token")
  const refresh_token  = window.localStorage.getItem("refresh_token")
  const [language, setLanguage] = useState("");
  const [currency, setCureency] = useState("");
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false)
  let country = useSelector(state => state.location.country)



  const logout = () => {
    ApiInstance
      .post(
        "logout/",
        { refresh_token: refresh_token },
        
      )
      .then((response) => {
        dispatch(setLogout(response.data));
        navigate("/");
        console.log(response.data)
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const openProfileMenu = ()=>{
    setIsProfileOpen(!isProfileOpen)
  }
  return (
    <ParentContainer>
    <div className='search-container'>
        <div className='responsive-input'>
                <input placeholder="Search" />
              </div>

              <div className="search-icon-container">
                <SearchIcon className="search-icon" />
              </div>
        </div>
      <Container>
        
        <ChildContainer>
          <Logo>
          <Link to="/">
            <img  width="100vw" src = "../Asset 4.png" alt=""/>
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
            <Link to="/shopping-cart">
              <div className="shopping-cart">
                <ShoppingCartIcon className="shopping-cart-icon" />
                <div className="cart-number-container">
                  <span>{cartItems?.length || 0}</span>
                </div>
              </div>
            </Link>

            <div className="Lang_currency">
              <button onClick={()=> setIsLangMenuOpen(!isLangMenuOpen)}>
                <Flag className="flag-icon" code={country} />
                <span> / English </span>
                <span> / USD </span>
                <ArrowDropDownIcon className="dropDownArrow-icon" />
              </button>
            </div>
           
            {isAuth !== null ? (
              <div>
                <PersonOutlineOutlinedIcon
                  className="person-icon"
                  onClick={openProfileMenu}
                />
              </div>
            ) : (
              <div className="sign-in-button">
                <Link to="auth"> Login </Link>
              </div>
            )}
             <MenuIcon className = 'menu-icon'/>
          </Wrapper>
          {isProfileOpen && (
            <>
              <DropDownMenu
                logout={logout}
                isProfileOpen={isProfileOpen}
                setIsProfileOpen={setIsProfileOpen}
              />
            </>
          )}
          {isLangMenuOpen && (
            <DropDownMenuLang
              isLangMenuOpen={isLangMenuOpen}
              setIsLangMenuOpen={setIsLangMenuOpen}
              country = {country} 
            />
          )}
        
      </Container>

      {outlet}
    </ParentContainer>
  );
}

export default NavBar
const ParentContainer = styled.div`
     .search-container{
      display:none;
      align-items:center;
      height:40px;
      max-width:1920px;
      min-width:320px;
      width:100%;
      background-color:blue;
      
     
     .responsive-input{
      height:100%;
      width:100%;
     }
     
     .responsive-input input{
        height:100%;
        width:100%;
        border:none;
        padding:0 4px 0 4px;
        outline:none;
      }
      .responsive-input:focus{
        outline:0.5px solid orange;
      
      }
      .search-bar{
        height:100%;
      }
      .search-icon-container{
        height:100%;
        background:#f37421;
        display:flex;
        align-items:center;
      }
      .search-icon{
       padding:8px;
        color:#fff;
      }
     }
     @media only screen and (max-width: 615px) {
    /* For mobile phones: */
    .search-container{
        display:flex;
      
    }
   
    
  }
   
`
const Container = styled.div`
      display: flex;
      align-items: center;
      height:40px;
      padding: 10px;
      max-width:1920px;
      min-width:320px;
      background:#141414;
      position:sticky;
      top:0;
      z-index:1;

       .Lang_currency button {
        display:flex;
        align-items:center;
        justify-content:space-between;
        padding:2px 10px;
        background:#fff;
        height:38px;
        border-radius:5px 5px 0px 0;
        z-index: 1;
        
      }
      .Lang_currency span:nth-child(3){
        margin-left:5px;
      }
    
      .Lang_currency .flag-icon{
          width:30px;
          height:20px;
          object-fit:cover;
          margin-right:5px;
      }
      .Lang_currency span{
          font-size:12.5px;
          white-space: nowrap;
          
      }
    select{
        width:100%;
        border-radius:4px;
        padding:10px;
        border:1px solid lightgrey;
        color:black;
        background-image:linear-gradient(45deg, transparent 84%, rgb(240, 240, 240, 0.7) 20%);
        cursor:pointer; 
    }
    a {
    color: #000000;
  }
  .menu-icon{
    color:#ffff;
    cursor:pointer;
    font-size:30px;
    display:none;
  }
  @media only screen and (max-width: 615px) {

    img{
      width:25vw;
      max-width:120px;
    }
  }
  @media only screen and (max-width: 815px) {
    /* For mobile phones: */
      
    .menu-icon{
 
       display:inline;
  }
  .Lang_currency{
    display:none;
  }
   
    
  }
 
`
const ChildContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width:60%;
    gap:15px;
   
 
`;
const Wrapper = styled.div`
      display:flex;
      justify-content:end;
      align-items:center;
      width:39%;
      gap:30px;

      .shopping-cart{
        position:relative;
        display:flex;
        justify-content:center;
        align-content:center;

      }
      .shopping-cart-icon{
       color: #ffffff;

      }
      .cart-number-container{
        display:flex;
        justify-content:center;
        align-items:center;
        position:absolute;
        right:-10px;
        top:-10px;
        background:#fff;
        color:#000000;
        border-radius:50%;
        width:20px;
        height:20px;
      }
      .shopping-cart span{
       
       


      }
      .person-icon{
          color:#ffff;
          font-size:30px;
          cursor:pointer;
        }
  .sign-in-button {
    display: flex;

    justify-content: center;
    align-items: center;
    padding: 0px 8px;
    margin-right: 10px;
    background: #ffffff;
    color: #000000;
    border-radius: 4px;
    width: 50px;
    height: 40px;
  }
 


  .logout-button button {
    border: none;
    cursor: pointer;
    padding: 10px 5px;
    border-radius: 4px;
    background: #f32334;
    color: #fff;
    font-weight: bold;
    width: 65px;
  }
  
     
  
`
const Logo = styled.div`
      display:flex;
      justify-content:space-between;
  
`
const SearchContainer = styled.div`
      display:flex;
      align-items:center;
      margin-right:15px;
      height:40px;
      input{
        height:100%;
        width:30vw;
        min-width:100px;
        border:none;
        border-radius: 4px 0 0 4px;
        padding:0 4px 0 4px;
        outline:none;
      }
      input:focus{
        outline:0.5px solid orange;
      
      }
      .search-bar{
        height:100%;
      }
      .search-icon-container{
        height:100%;
        background:#f37421;
        border-radius: 0 4px 4px 0;
        display:flex;
        align-items:center;
      }
      .search-icon{
       padding:8px;
        color:#fff;
      }

      @media only screen and (max-width: 615px) {
    /* For mobile phones: */
    
        display:none;
      
   
   
    
  }
      
`