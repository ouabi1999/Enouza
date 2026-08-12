
import React, { useEffect, useState } from 'react'

import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { createTheme } from '@mui/material/styles';
import { styled as styles } from '@mui/material/styles';
import { purple, red, orange, lightGreen } from '@mui/material/colors';
import { Stack } from "@mui/material"
import Box from '@mui/material/Box';
import styled from 'styled-components';
import StarIcon from '@mui/icons-material/Star';
import ClearIcon from '@mui/icons-material/Clear';



const BorderLinearProgress = styles(LinearProgress)(({ theme }) => ({
  height: 6,
  maxWidth: "265px",
  width: "40%",
  minWidth: "160px",



  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 50 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {

    backgroundColor: theme.palette.mode === 'light' ? '#181616' : '#0044ff',
  },
}));
function Ratings(props) {

  const { fiveStars,
    twoStars,
    fourStars,
    threeStars,
    oneStar,
    sum_stars,
    ratings,
    productData,
    i18n,
    t
  } = props;


  const [selected, setSelected] = useState({ index: null, id: null })
  const [reviews, setReviews] = useState(productData?.ratings)

  const stars = Array(5).fill(0);






  return (
    <Container>

      <div className="ratings-container">
        <div className="sum-ratings">
          <span>{ratings?.length > 0 ?
            (sum_stars / ratings?.length).toFixed(1) : "0.0"}</span>
          <div className="start-icons-container">
            <StarIcon />
            <StarIcon />
            <StarIcon />
            <StarIcon />
            <StarIcon />
          </div>
          <div>
            <h4 style={{ color: "green", fontWeight: "bold" }}>{t("productInfo.all_from_verified_purchases")}</h4>
          </div>
        </div>

        <div className="border-linear-container">
          <div>
            <span className="star-number">5 {t("productInfo.stars")}</span>
            <span>
              <BorderLinearProgress
              className='progress-bar'
                variant="determinate"
                value={sum_stars <= 0 ? 0 : ((fiveStars / sum_stars) * 100).toFixed(0)}
              />
            </span>
            <span className="percent">
              {sum_stars <= 0 ? 0 : ((fiveStars / sum_stars) * 100).toFixed(0)}%
            </span>
          </div>
          <div>
            <span className="star-number">4 {t("productInfo.stars")}</span>
            <span>
              <BorderLinearProgress
                className='progress-bar'

                variant="determinate"
                value={
                  sum_stars <= 0
                    ? 0
                    : ((fourStars / sum_stars) * 100).toFixed(0)
                }
              />
            </span>
            <span className="percent">
              {sum_stars <= 0 ? 0 : ((fourStars / sum_stars) * 100).toFixed(0)}%
            </span>
          </div>
          <div>
            <span className="star-number">3 {t("productInfo.stars")}</span>
            <span>
              <BorderLinearProgress
              className='progress-bar'
                variant="determinate"
                value={
                  sum_stars <= 0
                    ? 0
                    : ((threeStars / sum_stars) * 100).toFixed(0)
                }
              />
            </span>
            <span className="percent">
              {sum_stars <= 0 ? 0: ((threeStars / sum_stars) * 100).toFixed(0)}
              %
            </span>
          </div>
          <div>
            <span className="star-number">{i18n.language === "ar" ? t("productInfo.two_stars"): "2 " + t("productInfo.two_stars") }</span>
            <span>
              <BorderLinearProgress
                className='progress-bar'
                variant="determinate"
                value={
                  sum_stars <= 0 ? 0 : ((twoStars / sum_stars) * 100).toFixed(0)
                }
              />
            </span>
            <span className="percent">
              {sum_stars <= 0 ? 0 : ((twoStars / sum_stars) * 100).toFixed(0)}%
            </span>
          </div>
          <div>
            <span className="star-number star1">{i18n.language === "ar" ? t("productInfo.one_star"): "1 " + t("productInfo.one_star") }</span>
            <span>
              <BorderLinearProgress
                variant="determinate"
                className='progress-bar'
                value={
                  sum_stars <= 0 ? 0 : ((oneStar / sum_stars) * 100).toFixed(0)
                }
              />
            </span>
            <span className="percent">
              {sum_stars <= 0 ? 0 : ((oneStar / sum_stars) * 100).toFixed(0)}%
            </span>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default Ratings

const Container = styled.div`
 
  .user-name {
    font-size: 15px;
    font-family: Arial, Helvetica, sans-serif;
  }
  .start-icons-container {
    display: flex;
    flex-direction: row;
    color: gold;
  }

  .ratings-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 10px;
    place-content:center;
  }
  @media (max-width: 715px) {
    .ratings-container {
      
    grid-template-columns:1fr;
    row-gap: 10px;
  }
}
 

  .border-linear-container > div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: row;
    margin-bottom: 5px;
  }

  .border-linear-container,
  .sum-ratings {
      background: #f1f1f1ff;

    border-radius: 8px;
    padding: 5px 15px;
    height: 155px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  
  .sum-ratings {
    flex: flex-start;

    span {
      font-size: 3rem;
      font-weight: bold;
    }
  }
   .progress-bar{
   margin-left:10px;
   margin-right:10px;
   }
   
  span {
    font-size: 13px;
  }
  .star-number {
    text-wrap:nowrap;
    white-spacing:nowrap;
    width: 55px;

  }
  .star1 {
    
  }

  .percent {
    display: flex;
    justify-content: center;
    padding: 0px 8px;
    border: 1px solid lightgray;
    border-radius: 4px;
  }

 
`;
