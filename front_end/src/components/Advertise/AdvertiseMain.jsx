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
      
      {/*<div className="categorie-main">
        <CategorieMain />
      </div>*/}

    </Container>
  )
}
export default AdvertiseMain

const Container = styled.div`
    
    
    height:100%;
    width:100%;
    /* fallback for old browsers */
    background: rgb(241,145,49);
    background: #ffff;
   

    display:grid;
    grid-gap:15px;
  
  
    grid-template-columns: 100%;
    
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

    

    

`