import React from "react";
import styled from "styled-components";
import StarIcon  from "@mui/icons-material/Star"; 
function ProductInfo(props) {
    
      const {setColorIndex,  selectSize, sizeIndex, productData, colorIndex, ratings, sum_stars } = props
      const stars = Array(5).fill(0);

  return (
    <Container>
      <div className="prices-container">
        <div className="product-price">
          <span>${productData?.price}</span>
        </div>
        <div className="product-discount">
          <span> ${productData?.discount} </span>
        </div>
        <div className="product-discount-percent" >
          <span>
            {" "}
            {((productData?.price/ productData?.discount) * 100).toFixed(0)}%
          </span>
        </div>
      </div>

      <div className="product-title">
        <p>{productData?.name}</p>
      </div>
      
      <div className="product-rating">
        <div className="stars-icons-container">

        {stars.map((_, index) => {
                      return (
                        <span key={index} className="ratings-stars">
                          <StarIcon
                             classNmae="star-icon"
                            id={
                              index < (sum_stars / ratings?.length ).toFixed(1)
                                ?
                                "on"
                                :
                                "off"} />
                        </span>
                      )
                    })}
          
        </div>
        <div>
          <span>{ratings?.length > 0 ?
                       (sum_stars / ratings?.length ).toFixed(1) : "0.0"}</span>
        </div>
        <div>
        <span> {productData?.orders?.length + productData.aliexpress_ratings?.length} Orders </span>
        </div>
      </div>
      {productData?.sizes?.length > 0 && (
          <div>
           <span>Size:</span>
           <div className="product-size">
             {productData?.sizes?.map((size, index) => {
               return (
                 <div key={index}>
                   <button
                     onClick={() => selectSize(index)}
                     id={sizeIndex === index && "activate"}
                   >
                     {size}
                   </button>
                 </div>
               );
             })}
           </div>
         </div>
   
      )}
      
      <div>
        <span>Color:</span>
        <div className="product-color">
          {productData?.colors?.map((img, index) => {

            return (
              <div >
                <img
                  id  = {colorIndex === index && "activate"}
                  onClick={() => setColorIndex(index)}
                  src={img}
                  alt={productData?.name}
                />
              </div>
            );
          })}
        </div>
      </div>
    </Container>
  );
}

export default ProductInfo;
const Container = styled.div`
margin-bottom:8px;
  #activate {
    border: 1px solid blue;
  }
  .prices-container {
    display: flex;
    align-items: flex-end;
    gap: 10px;
  }
  .product-price {
    font-size: 1.9rem;
    font-weight: bold;
  }
  .product-discount {
    text-decoration: line-through;
    font-size: 1.3rem;
    color:#575757;
  }
  .product-discount-percent {
    font-size: 1.4rem;
    color:#db0000;
  }
  .product-title {
    font-size: 0.9em;
    font-weight: bold;
    white-space:wrap;
    word-wrap:wrap;
    
    width:95%;
  }
  .product-color {
    display: flex;
    gap: 10px;
    border-bottom:1px solid lightgray;
    padding-bottom:10px;
    img {
      padding: 2px;
      border-radius: 4px;
      border: 1px solid #bcbec0;
      margin: 15px 0;
      width: 50px;
      height: 50px;
      cursor: pointer;
    }
  }
  .product-size {
    display: flex;
    gap: 10px;
    margin: 15px 0;
    

    button {
      font-size:1rem;

      border: none;
      cursor: pointer;
      padding: 5px;
      border-radius: 6px;
      border: 1px solid #bcbec0;
      width: 50px;
      background:none;
    }
    div {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  .product-rating {
    margin: 10px 0;
    display: flex;
    align-items: center;
    gap: 20px;
    border-bottom:1px solid lightgray;
    padding-bottom:10px;
  }
  .stars-icons-container {
    margin-top: 4px;
  }
  .star-icon {
    font-size: 20px;
    
  }
  #on{
    color: orange;
  }
  #off{
    color:lightgray;
  }
  @media only screen and (max-width:420px){
    &{
      margin-left:5px;
      width:100%;
      

    }
    .product-title{
      width:100%;
      font-size:0.77rem;
    }
  }
`;
