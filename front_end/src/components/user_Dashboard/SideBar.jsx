import React from 'react'
import styled from "styled-components"
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';
import HelpCenterIcon from '@mui/icons-material/HelpCenter';
import DeleteIcon from '@mui/icons-material/Delete';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import FeedIcon from '@mui/icons-material/Feed';
import { Link } from 'react-router-dom';
import EmailIcon from '@mui/icons-material/Email';
import EditIcon from '@mui/icons-material/Edit';

function SideBar() { 
  return (
    <Side_Bar>

     
      <Link to="/profile">
        <FeedIcon className="sidebar_icons" />
        
          <span>
            My Profile
          </span>
        </Link>
      
      <Link to="my-orders">
        <ShoppingBasketIcon className="sidebar_icons" />
        
          <span>My Orders</span>
        </Link>
      
      <Link to="notifications">
        <NotificationsIcon className="sidebar_icons" />
        
          <span>
            Notifications
          </span>
        </Link>
      
      <Link to="contact-us">
        <EmailIcon className="sidebar_icons" />
        
          <span>
            Chat
          </span>
        </Link>
     
      <Link to="help-center">
        <HelpCenterIcon className="sidebar_icons" />
        
          <span>
            Help Center
          </span>
        </Link>
        

  </Side_Bar>
  )
}

export default SideBar

const Side_Bar = styled.div`
    background-color:#fff;
    width:100%;
    height:calc(100vh - 60px);
    flex:0.5;
    min-width:250px;
    padding-left:10px;
    position:sticky;
    top:10%;
    bottom:10%;
    box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
    
    
   
    span{
      font-size:15px;
    }
   


     a{
        display:flex;
        align-items:center;
        color:black;
        padding: 10px;
      }
    
    .sidebar_icons{
      color:gray;
      margin-right:8px;
    }

    @media only screen and (min-width: 600px) {
    /* For tablets: */
    }

  
  @media only screen and (max-width: 820px) {
    /* For mobile phones: */
      
      &{
        position:sticky;
        top:10%;
        bottom:10%;
        left:5%;
        min-height:70px;
        display:flex;
        width:100%;
        justify-content:space-between;
        z-index: 1;
        box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
      }
   
    

     

     
   
  }

  @media only screen and (max-width: 640px) {
    
    a span{
        display:none;
      }

  }
`