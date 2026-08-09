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
        <strong> {t("homePage.more_products")}</strong>
      </div>



      <Products isLoading={isLoading} products={homeProducts} columsNumber={5} placeItems="center" scrolTo={scrolTo} />

      

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
            style={nextStart >= totalProducts ? { opacity: "0.5", cursor: "not-allowed" } : {}}
            disabled={nextStart >= totalProducts ? true : false}> {t("common.view_more")}</button>
        </div>
      )}

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
    letter-spacing: 2px;
    font-size:1.5rem;
    font-weight:490;
    font-family:'Arial Narrow', Arial, sans-serif
} 

.veiw-more{
    margin:20px 0;
}

.veiw-more > button{
    outline-style: none;
    width:115px;
    height: 40px;
    outline-style: none;
    display:flex;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
    margin: auto ;
    background-color: #000000; 
    
    color:white;
    font-weight: bold;
    letter-spacing: 2px;
}

`