import React from 'react'
import CategorieMain from './CategorieMain'
import MainSlider from './MainSlider'
import styled from 'styled-components'


function AdvertiseMain() {
  return (
    <Container>
       
        <div className="main-slider">
        <MainSlider />
        </div>
      
      <div className="categorie-main">
        <CategorieMain />
      </div>

    </Container>
  )
}
export default AdvertiseMain

const Container = styled.div`
    
    
    height:100%;
    width:95%;
    /* fallback for old browsers */
    background: rgb(241,145,49);
    background: linear-gradient(90deg, rgba(63,231,251,0.4) 0%, rgba(68,55,251,0.5) 100%);
    padding:18px 15px;
    margin: 15px auto;
   

    display:grid;
    grid-gap:10px;
  
  
    grid-template-columns: 55%  44%;
    
     .main-slider{
       
      
     }
     .categorie-main{
       
      
     }
     .container{
          
          
    
     }
    
    @media only screen and (max-width:1280px) {
      &{
        
        grid-template-columns: 100%;
      
      }
      .main-slider{
        
        grid-column: 1;
        grid-row: 1 ;
    }
    .categorie-main{
      
        grid-column: 1;
        grid-row: 3;
    }
    
    }

    @media only screen and (max-width:560px) {
      &{
        
        
        padding:10px 5px;
      
      }
    
    }

    

`