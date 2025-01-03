import React, { useEffect , useState } from 'react'

import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { createTheme } from '@mui/material/styles';
import { styled as styles} from '@mui/material/styles';
import { purple, red, orange, lightGreen } from '@mui/material/colors';
import {Stack} from "@mui/material"
import Box from '@mui/material/Box';
import styled from 'styled-components';
import StarIcon from '@mui/icons-material/Star';
import ClearIcon from '@mui/icons-material/Clear';



const BorderLinearProgress = styles(LinearProgress)(({ theme }) => ({
    height: 6,
    maxWidth:"265px",
    width:"25vw",
    minWidth:"150px",
   
    
    
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 50 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
     
      backgroundColor: theme.palette.mode === 'light' ? '#181616' : '#0044ff',
    },
  }));
function Ratings(props) {

  const {fiveStars,
    twoStars,
    fourStars,
    threeStars,
    oneStar,
    sum_stars,
    ratings,
    productData} = props;
    
    
    const [selected, setSelected] = useState({index:null, id:null})
    const [reviews , setReviews] = useState(productData?.ratings)
     
    const stars = Array(5).fill(0);
   
 
   

  
   
  return (
    <Container>
      <h5>Customer Reviews</h5>

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
            <bold style={{color:"green", fontWeight:"bold"}}>All from verified purchases</bold>
          </div>
        </div>
        
        <div className="border-linear-container">
          <div>
            <span className="star-number">5 Stars</span>
            <span>
              <BorderLinearProgress
                variant="determinate"
                value={sum_stars <= 0 ? 0 : ((fiveStars / sum_stars) * 100).toFixed(0)}
              />
            </span>
            <span className="percent">
              {sum_stars <= 0 ? 0 : ((fiveStars / sum_stars) * 100).toFixed(0)}%
            </span>
          </div>
          <div>
            <span className="star-number">4 Stars</span>
            <span>
              <BorderLinearProgress
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
            <span className="star-number">3 Stars</span>
            <span>
              <BorderLinearProgress
                variant="determinate"
                value={
                  sum_stars <= 0
                    ? 0
                    : ((threeStars / sum_stars) * 100).toFixed(0)
                }
              />
            </span>
            <span className="percent">
              {sum_stars <= 0 ? 0 : ((threeStars / sum_stars) * 100).toFixed(0)}
              %
            </span>
          </div>
          <div>
            <span className="star-number">2 Stars</span>
            <span>
              <BorderLinearProgress
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
            <span className="star-number star1">1 Star</span>
            <span>
              <BorderLinearProgress
                variant="determinate"
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
  width:calc(100% - 20px);
  padding: 10px;
  border-bottom: 1px solid lightgray;

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
    grid-template-columns: 50% 50%;
    column-gap: 10px;
    place-content:center;
  }
  @media (max-width: 715px) {
    .ratings-container {
      
    grid-template-columns:100%;
    row-gap: 10px;
  }
}
 

  .border-linear-container > div {
    display: flex;
    align-items: center;
    flex-direction: row;
    margin-bottom: 5px;
  }

  .border-linear-container,
  .sum-ratings {
      background: #ececec;

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

  span {
    font-size: 13px;
  }
  .star-number {
    width: 50px;
  }
  .star1 {
    padding-left: 2px;
  }

  .percent {
    display: flex;
    justify-content: center;
    padding: 0px 8px;
    border: 1px solid lightgray;
    width: 45px;
    border-radius: 4px;
    margin-left: 8px;
  }

 
`;

