import React, { useEffect } from 'react'
import styled from 'styled-components'
import { AnimatePresence } from "motion/react"
import * as motion from "motion/react-client"

function MainImages(props) {

  const { colorIndex, currentSku,
 productData, picsDetailsIndex, selectPicsDetails, isPicsDetailsActive,  isColorActive } = props;
  const images = productData?.multimediaInfo.image_urls.split(";").filter(Boolean)
  const skuInfo = productData?.skuInfo

  return (
    <Container>
      <ImageDetailsContainer>
        {images?.map((img, index) => {
          return (
            <img
              onMouseOver={() => selectPicsDetails(index)}
              key={index}
              src={img}
              alt={productData?.name}
              id={picsDetailsIndex === index && isPicsDetailsActive ? "activate":  undefined}
            />
          );
        })}
      </ImageDetailsContainer>
      <ProductImg>
        <AnimatePresence mode="wait">

          <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >


            <img
              src={isColorActive ? currentSku?.attributes[currentSku.colorKey].image
                :
                isPicsDetailsActive ? images[picsDetailsIndex]
                  :
                  ""
              } alt=''
            />


          </motion.div>
        </AnimatePresence>
      </ProductImg>

    </Container>
  )
}

export default MainImages
const Container = styled.div`
    display:flex;
    flex-direction:column-reverse;
    justify-content:center;
    align-items:center;
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
    justify-content:space-between;
    margin:0 15px;
    min-width:40px;
   
    width:100%;
    
     img{
      width:50px;
      height:50px;
      
      border:1px solid lightgray;
      border-radius:4px;
      cursor:pointer;
     }
  
     @media only screen and (max-width: 500px) {
      &{
        flex-direction:row;
        flex-wrap:wrap;
        gap:5px;
        width:100%;
        max-width:100%;
        margin-top:10px;
        margin:auto;
      }
  }

`

const ProductImg = styled.div`
     width:100%;
     min-width:200px;
     
    
     img{
      width:540px;
      
      height:540px;
      border-radius:4px;
      object-fit:contain;


     }
     @media only screen and (max-width: 500px) {
      img{
        width:100%;
        height:100%;
        min-width:300px;
        min-height:300px;
      }
      &{
        border-radius:0;
      }
  }

    


`