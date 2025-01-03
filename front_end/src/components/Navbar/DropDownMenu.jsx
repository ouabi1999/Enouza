import React from "react";
import styled from "styled-components";
import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import LiveHelpIcon from "@mui/icons-material/LiveHelp";
import { Link } from "react-router-dom";
import { ClickAwayListener } from "@mui/material";
import { useSelector } from "react-redux";
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';

function DropDownMenu(props) {
  const user = useSelector((state) => state.auth.user);

  return (
    <Container>
      {props.isAuth !== null ? (
        <div>
          <PersonOutlineOutlinedIcon
            className="person-icon"
            onClick={props.openProfileMenu}
          />
        </div>
      ) : (
        <div className="sign-in-button">
          <Link to="auth"> Login </Link>
        </div>
      )}
      {props.isProfileOpen && (
        <ClickAwayListener
          mouseEvent="onMouseDown"
          touchEvent="onScroll"
          onClickAway={props.openProfileMenu}
        >
          <Wrapper>
            <Link onClick={props.openProfileMenu} to={user?.is_staff ? "admin-dashboard" : "/profile"}>
              <AccountBoxIcon className="icon" />
              <span> Dashbaord </span>
            </Link>
            <Link onClick={props.openProfileMenu} to="/help-center">
              <LiveHelpIcon className="icon" />
              <span>FAQ</span>
            </Link>
            <button onClick={props.logout}>
              <ExitToAppOutlinedIcon className="icon" />
              <span>Logout</span>
            </button>
          </Wrapper>
        </ClickAwayListener>
      )}
    </Container>
  );
}

export default DropDownMenu;

const Container = styled.div`
  

  .person-icon {
    color: #ffff;
    font-size: 30px;
    cursor: pointer;
  }
  .sign-in-button {
    display: flex;

    justify-content: center;
    align-items: center;
    padding: 0px 8px;
    margin-right: 10px;
    background: #ffffff;
    color: #000000;
    border-radius: 5px 5px 0px 0;
    width: 50px;
    height: 38px;
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
`;
const Wrapper = styled.div`

position: fixed;
  padding: 10px;
  right: 10px;
  top: 60px;
  width: 150px;
  background: #ffff;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
  a,
  button {
    display: flex;
    align-items: center;
    font-weight: normal;
    font-size: normal;
  }
  button {
    background: none;
  }
  .icon {
    font-size: 20px;
  }

`;
