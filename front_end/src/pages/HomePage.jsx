import React, { useState, useEffect, useRef, useLayoutEffect } from 'react'
import styled from 'styled-components'
import { useSelector, useDispatch } from "react-redux"
import { setProducts } from "../features/productSlice"
import axios from 'axios'
import { CircularProgress } from '@mui/material'
import Products from '../components/Product/home/Products'
import UserServices from '../components/Services/UserServices'
import ApiInstance from '../../common/baseUrl'
import AdvertiseMain from '../components/Advertise/AdvertiseMain.jsx'
import { useTranslation } from 'react-i18next'
import HeroSection from '../components/Product/home/HeroSection.jsx'
import DesignSection from '../components/Product/home/DesignSection.jsx'
import CTASection from '../components/Product/home/CTASection.jsx'
import MatricsSection from "../components/Product/home/MatricsSection.jsx"
import HeadeSeo from '../../common/HeadeSeo.jsx'
import CustomersFeedback from '../components/Product/home/CustomersFeedbak.jsx'
import Spinner from '../../common/Spinner.jsx'

function HomePage() {
  const dispatch = useDispatch()
  //const products = useSelector((state) => state.products?.products)


  const [nextStart, setNextStart] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [totalProducts, setTotalProducts] = useState(0)
  const [homeProducts, setHomeProducts] = useState([]);
  const { t, i18n } = useTranslation();
  
  const scrolTo = useRef()
  // show more products




  const viewMore = () => {
    setNextStart(prevStart => prevStart + 10);

  }




  useEffect(() => {
    setIsLoading(true);
    ApiInstance.get('product-api/', { params: { start: nextStart, per_page: 10 } })
      .then(response => {
        setIsLoading(false);
        setHomeProducts(prev => {
          const newProducts = response.data.products.filter(
            p => !prev.some(prevP => prevP.id === p.id)
          );
          return [...prev, ...newProducts];
        });
        setTotalProducts(response.data.total_products);
        dispatch(setProducts(response.data.products));
      })
      .catch(error => {
        setIsLoading(false);
        console.error(error);
      });
  }, [nextStart]);


  useEffect(() => {

    scrolTo.current?.scrollTo({ behavior: "smooth", block: "center", inline: "nearest" });
  }, [nextStart])




  return (
    <Container>
      <UserServices />
      <AdvertiseMain />
      <HeroSection/>
      <DesignSection/>
      <MatricsSection/>


      <div className="product-header">
        <strong> {t("homePage.best_sellers")}</strong>
      </div>



      <Products isLoading={isLoading} products={homeProducts} columsNumber={4} placeItems="center" scrolTo={scrolTo} />

      

      {isLoading && (

         <div style={{ display: "flex", justifyContent: "center", alignItems: "center", margin: "10px" }}>
          <CircularProgress
            size={25}
            thickness={4}
          />
        </div>
      )
      }
      {!isLoading && (
        <div className="veiw-more"  >
          <button onClick={viewMore}
            className=""
            style={nextStart >= totalProducts ? { opacity: "0.7", cursor: "not-allowed" } : {}}
            disabled={nextStart >= totalProducts ? true : false}> {t("common.view_more")}</button>
        </div>
      )}
      <CustomersFeedback/>
      <CTASection/>

    </Container>
  )
}

export default HomePage
const Container = styled.div`
    width:100%;
    margin:auto;
    min-height:80vh;
.product-header{
    display: flex;
    justify-content: center;
    border-bottom: 2px solid rgb(194, 193, 193);
    margin:15px 5px;
    margin-top:15px;
    background-color:white;  
    }

.product-header strong{
    padding:15px;

    font-size:1.8rem;
    font-weight:500;
    font-family: "Playfair Display", serif;
} 

.veiw-more{
    margin:20px 0;
    display:flex;
    justify-content:center;
}

.veiw-more > button{
   

  color: black;
 
  text-decoration: none;

  font-family: Arial, sans-serif;

  font-size: 0.8rem;

  letter-spacing: 0.12em;

  text-transform: uppercase;

  padding-bottom: 7px;

  border-bottom: 1px solid rgba(26, 25, 25, 0.8);
  background:none;
  transition: 0.25s ease;

  &:hover {
    color: #ab9161;

    border-color: #ab9161;
  }

 
`;

