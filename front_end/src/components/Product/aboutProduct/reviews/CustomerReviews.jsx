import React, { useEffect, useState } from "react";
import Ratings from "./Ratings";
import styled from "styled-components";
import StarIcon from "@mui/icons-material/Star";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import Flag from "react-world-flags";
import ClearIcon from "@mui/icons-material/Clear";
import { ClickAwayListener } from "@mui/base";
import Feedback from "./FeedBack";
function CustomerReviews(props) {
  const [selected, setSelected] = useState({ index: null, id: null });

  const {
    fiveStars,
    twoStars,
    fourStars,
    threeStars,
    oneStar,
    product,
    sum_stars,
    newRatings,
    productData,
    ratings,
  } = props;

  const stars = Array(5).fill(0);
  return (
    <Container>
      <Ratings
        fiveStars={fiveStars}
        twoStars={twoStars}
        fourStars={fourStars}
        threeStars={threeStars}
        oneStar={oneStar}
        productData={productData}
        sum_stars={sum_stars}
        ratings={ratings}
        newRatings={newRatings}
      />

      <ChildContainer>
        {ratings?.map((rate, index) => {
          return (
            <div  className="ratings-container">
              <div>
                <AccountCircleOutlinedIcon className="person-icon" />
              </div>
              <div>
                <div>
                  <div className="stars">
                    {stars.map((_, index) => {
                      return (
                        <div key={index}>
                          <StarIcon
                            className={
                              index < rate.stars.toFixed(0) ? "on" : "off"
                            }
                          />
                        </div>
                      );
                    })}
                  </div>

                  <div>
                    <span style={{ marginLeft: "4px" , fontSize:"16px"}}> {rate.user?.firstName.slice(0, 2) + "***" + rate.user?.firstName.slice(4, 6)}</span>
                  </div>

                  <div style={{ marginLeft: "4px" , fontSize:"14px"}}>
                    <p>{rate.review.text}</p>
                  </div>
                  <div className="img-container">
                    {rate.review?.images?.slice(0, 4)?.map((img, index) => {
                      return (
                        <img
                          key={index}
                          onClick={() =>
                            setSelected({ index: index, id: rate.id })
                          }
                          className={
                            selected.index === index && rate.id === selected.id
                              ? "selected"
                              : "reviews-img"
                          }
                          src={img}
                          alt=""
                        />
                      );
                    })}
                  </div>
                  <p
                    style={{
                      fontSize: "13px",
                      display: "flex",
                      justifyContent: "flex-end",
                    }}
                  >
                    {rate.created_at}
                  </p>
                </div>
                  {selected.index != null && rate.id === selected.id && (
                    <ClickAwayListener
                      mouseEvent="onMouseDown"
                      touchEvent="onScroll"
                      onClickAway={() => setSelected({ index: null, id: null })}
                    >
                    <PupUpSelectedImage>

                        {/*<div>
                            <ClearIcon 
                                className="cancel-icon"
                                onClick={()=> setSelected({index:null, id:null})}/>
                                </div>*/}

                        <img
                          className=" selected-img"
                          src={rate.review.images[selected.index]}
                          alt=""
                        />
                    </PupUpSelectedImage>
                    </ClickAwayListener>
                  )}
                
              </div>
            </div>
          );
        })}
      </ChildContainer>
    </Container>
  );
}

export default CustomerReviews;

const Container = styled.div`
    
  

  .person-icon {
    font-size: 40px;
    color: gray;
  }
  .img-container {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;

    img {
      width: 80px;
      height: 80px;
      margin-left: 8px;
    }
  }
  .stars {
    display: flex;
  }
  .on {
    color: #ffba5a;
    font-size: 16px;
  }
  .off {
    color: #ccc;
    font-size: 16px;
  }
  .reviews-img {
    position: relative;
    width: 50px;
    height: 55px;
    border: 1px solid lightgray;
    padding: 2px;
    margin-right: 5px;
    object-fit: contain;
    cursor: pointer;
    transition: width 1s, height 1s;
  }
  .selected {
    width: 50px;
    height: 55px;
    border: 1px solid orange;
    padding: 2px;
    cursor: pointer;
  }

  .selected-img {
    height: 45vh;
    min-height: 200px;
    max-height: 360px;
    max-width: 360px;
    padding: 20px;
    object-fit: contain;
    border-radius: 6px;
    width: 40vw;
    border-radius: 6px;
    position: fixed;
    z-index: 102;
    top: 25%;
    bottom: 25%;
    right: 30%;
    left: 30%;
    background: #fdfdfd;
    border: 1px solid lightgray;
    box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
      rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
  }

  .cancel-icon {
    display: flex;
    color: #fff;

    font-weight: 900;
    cursor: pointer;
    background: #0282eb;
    border-radius: 50%;
  }
  .cancel-icon:hover {
    color: #000;
  }
  .img-parent-container {
    display: flex;

    flex-wrap: wrap;
  }
`;
const ChildContainer = styled.div`
    display: grid;
    grid-template-columns: auto auto;
    column-gap: 10px;
    margin-top: 15px;


  .ratings-container{
    border: 1px solid lightgray;
    padding: 10px;
    border-radius: 8px;
    display:flex;
  }
  
    
  

  @media (max-width: 690px) {
    &{
      grid-template-columns: 100%;
      row-gap:10px;
    }
  }

`
const PupUpSelectedImage = styled.div`
      position: relative;
      width:100%;
  
      @media (max-width: 690px) {
    
  }

`;
