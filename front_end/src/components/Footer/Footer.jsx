import React from 'react'
import styled from 'styled-components'
import { Link, NavLink, useNavigate } from "react-router-dom"
//import {setCategory } from '../../features/categories/categorySlice'
import CopyrightOutlinedIcon from '@mui/icons-material/CopyrightOutlined';
import NewsLetter from './NewsLetter'


const Footer = () => {
  //const navigate = useNavigate()
  //const dispatch = useDispatch()
  //const SelectedCategory = (value)=>{
   // dispatch(setCategory(value))
    

  //}
  return (
    <Container>
      <Wrapper>
        <Wrapp>
          <ul className="social-categorie">
            <li className="text-info">Follow us</li>
            <li>
              <i className="fab fa-facebook-f" />
              <a target="_blank" href="https://facebook.com/animisstore">
                {" "}
                Facebook
              </a>
            </li>
            <li>
              <i className="fab fa-instagram" />
              <a target="_blank" href="https://www.instagram.com/an.imis">
                Instagram
              </a>
            </li>
            <li>
              <i className="fab fa-twitter" />
              <a target="_blank" href="https://twitter.com/animisshop">
                Twitter
              </a>
            </li>
            <li>
              <i className="fab fa-youtube" />
              <a target="_blank" href="https://www.youtube.com/@animisshop">
                Tik Tok
              </a>
            </li>
          </ul>

          <ul className="social-categorie">
            <li className="text-info">Help</li>
            <li>
              <i className="fab fa-facebook-f" />
              <Link to="contact-us">
                {" "}
                Contact us
              </Link>
            </li>
            <li>
              <i className="fab fa-instagram" />
              <Link to="about-us">
                About us
              </Link>
            </li>
            <li>
              <i className="fab fa-twitter" />
              <Link to="help-center">
                FAQ
              </Link>
            </li>
          </ul>

          <ul className="policy">
            <li className="text-info">Polices</li>
            <li>
              <Link to="terms-of-services">Terms of services</Link>
            </li>

            <li>
              <Link to="privacy-policy"> Privacy policy </Link>
            </li>
          </ul>

          <NewsLetter />
        </Wrapp>
      </Wrapper>
      <div
        style={{
          display: "flex",
          width:"100%",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap:"wrap",
          marginTop:"35px",
          marginBottom:"0"
        }}
      >
        <div className="payment-methods-image">
          <img src="./payment-methods.png" alt="secure payment" />
        </div>
        <div className="CopyRight">
          
            <span>All right reserved {" "}  </span>
            
          
             <span>
            copyright {new Date().getFullYear() }
            </span>
            <CopyrightOutlinedIcon className="copy-icon" />
          
        </div>
      </div>
    </Container>
  );
}
export default Footer


const Container = styled.div`
    min-width:340px;
    background:#e3e3e4;
    padding:0px 10px;
    z-index:3;
    position:relative;
    
    
    .payment-methods-image{
      margin-left:35px;
      width:50vw;
      max-width:360px;
      min-width:320px;

      img{
        width:100%;
        height:auto;
        object-fit:contain;
      }
    }

    .CopyRight{
        display:flex;
        align-items:center;
        span{
      font-size:14px;
      color:#000000;
      margin-left:4px;
    }
        
      }
    
    
    .copy-icon{
       font-size:15px;
    }
    .CopyRight div{
      color:#000000;
    
    }
    
    @media only screen and (max-width: 700px) {
  
  .CopyRight{
        margin-bottom:10px;
      
        
      }
      .payment-methods-image{
      margin-left:0;

      
    }

}
@media only screen and (max-width: 400px) {
  
  .CopyRight{
        margin-bottom:10px;
        font-size:12px;
        
      }
    }

`
const Wrapp = styled.div`
     display:grid;
     grid-template-columns: repeat(4, auto);
    
     
     @media only screen and (max-width: 870px) {
  &{
     
    grid-template-columns: repeat(2,auto);

  }
}
@media only screen and (max-width: 700px) {
  &{ 
    grid-template-columns: repeat(1, auto);
  }
  .CopyRight{
        margin-bottom:8px;
        
      }
      .payment-methods-image{
      margin-left:4px;
      

      
    }

}
`
const Wrapper = styled.div`

  a{
      color:#4d4a4a;
      font-weight: bold;
      font-size: 0.9rem;
      line-height: 1;
    
    }

  

    
    .text-info{
      font-weight: bold;
      font-size:20px;
      color:black;
      text-transform:uppercase;
    
    }
    
    
   

`