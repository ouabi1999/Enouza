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
    padding:5px;
    margin-bottom:10px;
    #activate {
    border: 1px solid blue;
    
  }

  @media only screen and (max-width: 500px) {
      &{
        flex-wrap:wrap-reverse;
        margin-right:0;
        margin:auto;

      }
  }

`
const ImageDetailsContainer = styled.div`
    display:flex;
    flex-direction:column;
    justify-content:space-between;
    margin-right:15px;
    min-width:40px;
   
    width:100%;
    max-width:50px;
    
     img{
      width:50px;;
      border:1px solid lightgray;
      height:auto;
      border-radius:4px;
      cursor:pointer;
     }
  
     @media only screen and (max-width: 500px) {
      &{
        flex-direction:row;
        width:100%;
        max-width:100%;
        margin-right:0;
        margin-top:10px;
      }
  }

`

const ProductImg = styled.div`
     width:100%;
     min-width:200px;
     border:1px solid lightgray;
     border-radius:6px;
    
     img{
      width:100%;
      height:100%;
      border-radius:6px;
      

     }

    


`