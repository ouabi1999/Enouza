import React, { useEffect, useState } from "react";
import styled from "styled-components";

import data from "../../../common/countryData.json";
import { ClickAwayListener } from "@mui/material";
import { setLocation } from "../../features/locationSlice";
import { useDispatch, useSelector } from "react-redux";
function DropDownMenuLang(props) {
  const [isActive, setIsActive] = useState(false);
  const dispatch =  useDispatch()
 
 
  

  useEffect(() => {
    if (!window.localStorage.getItem("country")) {
      fetch("https://ipinfo.io/json?token=ced98efb100ff5")
        .then((response) => response.json())
        .then((data) => {
          dispatch(setLocation(data.country));
          console.log(data);
        })
        .catch((error) => console.log(error));
    }
  }, []);
  useEffect(() => {
    console.log(props.country)
  }, [])
  

  return (
    <ClickAwayListener
      mouseEvent="onMouseDown"
      touchEvent="onScroll"
      onClickAway={() => props.setIsLangMenuOpen(!props.isLangMenuOpen)}
    >
      <Container>
          <Wrapper>
            <div>
              <label> Ship to </label>
              <select
                value={props.country}
                onChange={(e) => {
                  dispatch(setLocation(e.target.value));
                }}
              >
                {data?.map((country, index) => {
                  return (
                    <option key={index} value={country.value}>
                      {country.label}
                    </option>
                  );
                })}
              </select>
            </div>
            <div>
              <label> Language </label>
              <select>
                <option value="Japan">English</option>
              </select>
            </div>
            <div>
              <label> Currency </label>
              <select>
                <option value="Japan">USD</option>
              </select>
            </div>
            <div className="save-button">
              <button onClick={()=> props.setIsLangMenuOpen(!props.isLangMenuOpen)} type="button">
                Save
              </button>
            </div>
          </Wrapper>
      </Container>
    </ClickAwayListener>
  );
}

export default DropDownMenuLang;

const Container = styled.div`
   position:fixed;
    padding:10px;
    right:10px;
    top:60px;
    background:#ffff;
    box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
    width:255px;
 
  select {
    width: 100%;
    border-radius: 4px;
    padding: 10px;
    border: 1px solid lightgrey;
    color: black;
    background-image: linear-gradient(
      45deg,
      transparent 84%,
      rgb(240, 240, 240, 0.7) 20%
    );
    cursor: pointer;
  }
`;
const Wrapper = styled.div`
 
  

  .save-button {
    display: flex;
    justify-content: center;
  }
  .save-button button {
    background: orange;
    border-radius: 4px;
    margin-top: 10px;
    color: #fff;
    padding: 8px 15px;
    font-size: 15px;
    width: 100%;
  }
`;
