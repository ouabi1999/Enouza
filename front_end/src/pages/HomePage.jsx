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
import NewArrival from '../components/newArrival/NewArrival.jsx'

function HomePage() {
  const dispatch = useDispatch()
  //const products = useSelector((state) => state.products?.products)


  const [nextStart, setNextStart] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [totalProducts, setTotalProducts] = useState(0)
  const [bestSellersProducts, setBestSellersProducts] = useState([]);
  const [newArrivalProducts, setNewArrivalProducts] = useState([]);
  const { t, i18n } = useTranslation();
  
  const scrolTo = useRef()
  // show more products



  
  const viewMore = () => {
    setNextStart(prevStart => prevStart + 8);

  }

const get_new_arrivals = async () => {
  try {
    const response = await ApiInstance.get("product-search/", {
      params: {
        sort: "newest",

        per_page: 5,
      },
    });

    const products = response.data?.results || [];

    setNewArrivalProducts(products)
     

  } catch (error) {
    console.error("Failed to get new arrivals:", error);
  }
};


const get_best_sellers_products = async () => {
  setIsLoading(true);

  try {
    const response = await ApiInstance.get("product-search/", {
      params: {
        sort: "orders",
        per_page: 8,
      },
    });

        setBestSellersProducts(response.data.results)

      

  } catch (error) {
    console.error(error);

  } finally {
    setIsLoading(false);
  }
};


useEffect(() => {
  get_new_arrivals();
  get_best_sellers_products();
}, []);


  useEffect(() => {

    scrolTo.current?.scrollTo({ behavior: "smooth", block: "center", inline: "nearest" });
  }, [nextStart])




  return (
    <Container>
      <UserServices />
      <AdvertiseMain />
      <HeroSection/>
     
      


    



       <NewArrival products={bestSellersProducts} name="best_sellers" label={"bestSellers"} loop = {true}/>
      
 <DesignSection/>
     
      <MatricsSection/>
      <NewArrival products={newArrivalProducts} name= "newArrival" label={"new"} loop = {false}/>

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

