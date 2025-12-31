import React from 'react';
import styled from 'styled-components';
import StarIcon from '@mui/icons-material/Star';
import { Link } from 'react-router-dom';

function Products({ products, scrollTo, columsNumber, placeItems}) {
  return (
    <ProductContainer columsNumber={columsNumber} placeItems={placeItems}>
      <div className="grid-container">
        {products?.map((item) => {
          const mainSku = item.skuInfo?.[0];
          const image = item.multimediaInfo?.image_urls?.split(';')[0] || '';
          const avgRating =
            item.ratings?.length > 0
              ? (item.ratings.reduce((total, r) => total + r.stars, 0) / item.ratings.length).toFixed(1)
              : null;
          const ordersCount = item.orders?.length || 0;

          return (
            <div key={item.id} className="product-container">
              <a href={`/product/${item.id}`} >
                <img src={image} alt={item.name?.en || 'product'} />
              </a>

              <ProductInfo>
                <FirstSection>
                  <p className="product-title">{item.name?.en}</p>
                </FirstSection>

                <SecondSection>
                  <div className="orders">Orders({ordersCount})</div>

                  {avgRating && (
                    <div className="reviews-container">
                      <StarIcon className="star-icon" />
                      <div className="reviews">{avgRating}</div>
                    </div>
                  )}
                </SecondSection>

                <ThirdSection>
                  <span className="product-price">US ${mainSku?.sellingPrice}</span>
                </ThirdSection>

                {item.available_shipping?.map(
                  (ship, index) =>
                    ship.type === 'Free' && (
                      <span key={index} className="shipping">
                        Free Shipping
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
  min-width: 300px;
  
  font-family: 'Arial Narrow', Arial, sans-serif;

  .grid-container {
    padding: 10px;
    display: grid;
    grid-template-columns: repeat(${(props) => props.columsNumber}, auto);
    gap: 20px;
    place-items: ${(props) => props.placeItems || 'center'} ;

    img {
      width: 100%;
      height: 100%;
      border-radius: 6px 6px 0 0;
      object-fit: cover;
      background-color: #fff;
    }
  }

  .product-container {
    padding-bottom: 12px;
    background-color: #fafafa;
    border-radius: 8px;
    width: 100%;
    box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
      rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
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
      gap: 8px;
    }
    img {
      height: auto;
      object-fit: contain;
    }
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
    font-size: 0.75rem;
    max-width: 245px;
    margin-top: 3px;
    font-weight: smaller;
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
    align-items: center;
    justify-content: center;
    margin-right: 8px;
  }

  .reviews {
    font-size: 12px;
  }

  .star-icon {
    color: #1f1f2e;
    font-size: 14px;
    margin-top: 2.5px;
    margin-right: 2px;
    background: orange;
  }
`;

const ThirdSection = styled.div`
  margin-top: 10px;
  display: flex;

  .product-price {
    color: #000;
    font-family: 'Trebuchet MS', sans-serif;
    font-size: 20px;
    font-weight: bold;
    margin-left: 2px;
    margin-right: 30px;
    white-space: nowrap;  
    padding: 0 5px;

  }

  @media (max-width: 360px) {
    .product-price {
      margin-right: 8px;
      font-size: 16px;
    }
  }
`;
