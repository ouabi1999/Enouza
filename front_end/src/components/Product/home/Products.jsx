import React from 'react';
import styled from 'styled-components';
import StarIcon from '@mui/icons-material/Star';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function Products({ products, scrollTo, columsNumber, placeItems}) {
  const {t, i18n}  = useTranslation();
  return (
    <ProductContainer colums_number={columsNumber} place_items={placeItems}>
      <div className="grid-container">
        {products?.map((item) => {
          const mainSku = item.skuInfo?.[0];
          const image = item.multimediaInfo?.image_urls?.split(';')[0] || '';
          const sumRatings = item.ratings

          const avgRating =
            sumRatings?.length > 0
              ? (sumRatings.reduce((total, r) => total + r.stars, 0) / sumRatings.length).toFixed(1)
              : null;

          const ordersCount = item?.orders?.length + item?.ratings?.length|| 0; 


          return (
            <div key={item.id} className="product-container">
              <a href={`/product/${item.id}`} >
                <img src={image} alt={item.name?.en || 'product'} />
              </a>

              <ProductInfo>
                <FirstSection>
                  <p className="product-title">{item.name[i18n.language]?item.name[i18n.language]: item.name["en"]}</p>
                </FirstSection>

                <SecondSection>
                 {/* <div className="orders">{t("common.orders")}({ordersCount})</div>*/}

                  {avgRating && (
                    <div className="reviews-container">
                      <span>
                      <StarIcon className="star-icon" />
                      </span>
                      <span className="reviews">{avgRating}</span>
                    </div>
                  )}
                </SecondSection>

                <ThirdSection>
                  <span className="product-price">${mainSku?.sellingPrice}
        
                  </span>
                  {mainSku?.comparePrice > 0 && (

              (<div className="product-discount-percent">
          <span>
                  {t("productInfo.save")} {" "}

                <bdi>{((mainSku?.comparePrice - mainSku?.sellingPrice)
                  /
                  (mainSku?.comparePrice) *
                  100
                ).toFixed(0)}%</bdi>
                </span>
              </div>)

            )}
                </ThirdSection>

                {item.available_shipping?.map(
                  (ship, index) =>
                    ship.type === 'Free' && (
                      <span key={index} className="shipping">
                        {t("common.free_shipping")}
                      </span>
                    )
                )}
              </ProductInfo>
            </div>
          );
        })}
      </div>

      <div ref={scrollTo} />
    </ProductContainer>
  );
}

export default Products;

// ------------------- Styled Components -------------------

const ProductContainer = styled.div`
  width:100%;
  
  font-family: 'Arial Narrow', Arial, sans-serif;

  .grid-container {
    padding: 10px;
    display: grid;
    grid-wrap: wrap;
    grid-template-columns: repeat(${(props) => props.colums_number}, auto);
    gap: 20px;
    place-content: ${(props) => props.place_items || 'center'} ;
    align-items: center;

    img {
      width: 100%;
      height: 100%;
      max-width:400px;
      object-fit: contain;
      background-color: #fff;
    }
  }

  .product-container {
    padding-bottom: 12px;
    background-color: #fafafa;
    width: 100%;
   
  }

  @media (max-width: 1200px) {
    .grid-container {
      grid-template-columns: repeat(4, 23.5%);
    }
  }

  @media (max-width: 950px) {
    .grid-container {
      grid-template-columns: repeat(3, 30%);
    }
  }

  @media (max-width: 730px) {
    .grid-container {
      grid-template-columns: repeat(2, auto);
    }
  }

  @media (max-width: 490px) {
    .grid-container {
      grid-template-columns: repeat(2, 50%);
      gap: 5px;
      padding: 6px;



    
    .product-container {
      padding-bottom: 5px;
      height: auto;
    }
    p {
      font-size: 11px;
    }
  }
`;

const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  .shipping {
    font-size: 11px;
    margin: 10px 0 0 4px;
    color: #006622;
  }
`;

const FirstSection = styled.div`
  p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 0.9rem;
    max-width: 245px;
    margin-top: 3px;
    padding: 0 5px;

  }
`;

const SecondSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  .orders {
    font-size: 0.7em;
    font-weight: smaller;
    padding: 0 5px;
  }

  .reviews-container {
    display: flex;
    
    justify-content: center;
    margin:0 8px;
  }

  .reviews {
    font-size: 13px;
  }

  .star-icon {
    color: #dfbf7a;
    font-size: 16px;
    margin: 0 2px;
  }
`;

const ThirdSection = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content:space-between;
  .product-price {
    color: #000;
    font-family: 'Trebuchet MS', sans-serif;
    font-size: 20px;
    font-weight: bold;
    
    white-space: nowrap;  
    padding: 0 5px;

  }
    .product-discount-percent span{
    
       background:  #dfbf7a;
       padding:4px;
       text-transform:uppercase;
       font-family:robot sant serif;
       font-size:0.9rem;

       color: #ffffff;
    }

  @media (max-width: 360px) {
    .product-price {
      margin-right: 8px;
      font-size: 16px;
    }
  }
`;
