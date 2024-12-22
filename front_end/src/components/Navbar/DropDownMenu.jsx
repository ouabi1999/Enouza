import React from 'react'
import styled from "styled-components"
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import LiveHelpIcon from '@mui/icons-material/LiveHelp';
import { Link } from 'react-router-dom';
import { ClickAwayListener } from '@mui/material';
import { useSelector } from 'react-redux';

function DropDownMenu(props) {
  const user = useSelector(state=> state.auth.user)

  

  return (
    <ClickAwayListener
    mouseEvent="onMouseDown"
    touchEvent="onScroll"
    onClickAway={()=> props.setIsProfileOpen(!props.isProfileOpen)}
    >
    <Container>
        <Link to= {user?.is_staff ? "admin-dashboard" : "/profile"}>
         <AccountBoxIcon className='icon'/>
         <span> Dashbaord </span>
        </Link>
        <Link to="/help-center">
          <LiveHelpIcon className='icon'/>
          <span>FAQ</span>
        </Link>
        <button onClick={props.logout}>
          <ExitToAppOutlinedIcon className='icon'/>
          <span>Logout</span>
        </button>
    </Container>
    </ClickAwayListener>
  )
}

export default DropDownMenu


const Container = styled.div`
     position:fixed;
     padding:10px;
     right:10px;
     top:60px;
     width:150px;
     background:#ffff;
     box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
    a, button{
      display:flex;
      align-items:center;
      font-weight:normal;
      font-size:normal
    }
    button{
      background:none;
      
    }
    .icon{
      font-size:20px;
    }


`