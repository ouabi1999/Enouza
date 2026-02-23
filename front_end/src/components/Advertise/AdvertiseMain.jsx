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
    margin:0;
    padding:0;
    
    width:100%;
    /* fallback for old browsers */
   

    display:grid;
  
  
    grid-template-columns: 100%;
    
     .main-slider{
       
      
     }
     .categorie-main{
       
      
     }
     .container{
          
          
    
}
    

    

`