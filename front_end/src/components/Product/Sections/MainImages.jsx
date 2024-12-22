import React, { useEffect } from 'react'
import styled from 'styled-components'

function MainImages(props) {
    const {colorIndex, productData , picsDetailsIndex, selectPicsDetails, isPicsDetailsActive , deselectPicsDetails, isColorActive } = props; 
  
    
  return (
    <Container>
    <ImageDetailsContainer>
      {productData?.images.additional_images?.map((img, index) => {
        return (
          <>
            <img
              onMouseOver={()=> selectPicsDetails(index)}
              key={index}
              src={img}
              alt={productData?.name}
              id = {picsDetailsIndex === index && isPicsDetailsActive  && "activate"}
            />
          </>
        );
      })}
    </ImageDetailsContainer>
    <ProductImg>
     
        <img  
        src={isColorActive ? productData?.colors[colorIndex]
          : 
          isPicsDetailsActive? productData?.images.additional_images[picsDetailsIndex]
          : 
          productData?.images.main_image
        }  alt=''
           />

 
      
    </ProductImg>
  </Container>
  )
}

export default MainImages
const Container = styled.div`
    display:flex;
    margin-right:22px;
    max-height:410px;
    #activate {
    border: 1px solid blue;
    
  }



`
const ImageDetailsContainer = styled.div`
    display:flex;
    flex-direction:column;
    justify-content:space-between;
    margin-right:15px;
    max-width:50px;
    width:20vw;
    min-width:40px;
     img{
      width:100%;
     
      height:auto;
      border-radius:4px;
      cursor:pointer;
     }
  

`

const ProductImg = styled.div`
     max-width:410px;
     width:40vw;
     min-width:250px;
     img{
      width:100%;
      height:auto;
      border-radius:6px;
     }

    


`