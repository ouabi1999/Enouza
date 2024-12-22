import React, { Component, useEffect } from 'react'
import styled from 'styled-components'
import {Link} from "react-router-dom"
import Chart from '../adminDashboard/Chart'
import Orders from "./Orders"
import HeadeSeo from "../../../common/HeadeSeo"
import { useSelector } from 'react-redux'

function HomeDashboard(){
    
        return (
            <Wrapper>
                
                <ChartWrap>
                    <Chart />
                </ChartWrap>
                <OrdersWrap>
                    <Orders />
                </OrdersWrap>
                <HeadeSeo title = "Admin / dashboard"/>
            </Wrapper>
        )
    }


export default HomeDashboard
const Wrapper = styled.div`
    min-width:760px;
    margin:auto;
  
`
 const ChartWrap = styled.div`
    margin-top:10px;
 `
 const OrdersWrap = styled.div`
    
      
` 