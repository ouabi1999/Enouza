import React, { useState, useEffect } from "react";
import styled from "styled-components";
import StarIcon from "@mui/icons-material/Star";
import { useTranslation } from "react-i18next";

function ProductInfo({ productData,
  ratings,
  sum_stars,
  selectedAttributes,
  setSelectedAttributes,
  availableAttributes,
  setAvailableAttributes,
  currentSku,
  setCurrentSku,
  selectColor

}) {

  const { t, i18n } = useTranslation();
  const stars = Array(5).fill(0);
  const skuInfo = productData?.skuInfo || [];




  // Initialize available attributes
  useEffect(() => {
    const attributes = {};
    skuInfo.forEach((sku) => {
      Object.entries(sku.attributes).forEach(([key, attr]) => {
        if (!attributes[key]) attributes[key] = new Set();
        attributes[key].add(attr.value);
      });
    },[]);

    const normalized = {};
    Object.entries(attributes).forEach(([k, v]) => {
      normalized[k] = Array.from(v);
    });

    setAvailableAttributes(normalized);
    // Set default selected attributes (first of each)
    const defaultSelected = {};

    Object.entries(normalized).forEach(([k, v]) => {
      defaultSelected[k] = v[0];
    });
    setSelectedAttributes(defaultSelected);
  }, [skuInfo]);

  // Update current SKU based on selected attributes
  useEffect(() => {
    const found = skuInfo.find((sku) =>
      Object.entries(selectedAttributes).every(
        ([key, value]) => sku.attributes[key]?.value === value
      )
    );
    setCurrentSku(found || null);
    console.log("Selected SKU:", found);
  }, [selectedAttributes, skuInfo]);

  // Handler for selecting an attribute
  const selectAttribute = (attrKey, value) => {
    setSelectedAttributes((prev) => ({ ...prev, [attrKey]: value }));
    
  };

  return (
    <Container>
      {/* Price */}
      <div className="prices-container">
        <div className="product-price">
          <span>€{currentSku?.sellingPrice || productData?.price}</span>
        </div>
        <div className="product-discount">
          <span>€ {currentSku?.comparePrice || productData?.discount}</span>
        </div>
        <div className="product-discount-percent">
          <span>
            {((
              (currentSku?.comparePrice - currentSku?.sellingPrice) /
              currentSku?.comparePrice) *
              100
            ).toFixed(0)}
            %
          </span>
        </div>
      </div>

      {/* Product Title */}
      <div className="product-title">
        <p>{productData?.name[i18n.language] || productData?.name["en"]}</p>
      </div>
     
      {/* Ratings */}
      <div className="product-rating">
        <div className="stars-icons-container">
          {stars.map((_, index) => (
            <span key={index} className="ratings-stars">
              <StarIcon
                className="star-icon"
                id={index < (sum_stars / ratings?.length).toFixed(1) ? "on" : "off"}
              />
            </span>
          ))}
        </div>
        <div>
          <span>{ratings?.length > 0 ? (sum_stars / ratings?.length).toFixed(1) : "0.0"}</span>
        </div>
        <div>
          <span>
            {productData?.orders?.length + productData?.aliexpress_ratings?.length || 0}{" "}
            {t("productInfo.order")}
          </span>
        </div>
      </div>
      {/* Attribute Selection (Color, Size, etc) */}
      {Object.entries(availableAttributes).map(([attrKey, values]) => (
        <div key={attrKey} className="product-attribute">
          <span className="attribute-title">{attrKey.toLowerCase().includes("color") ?  t(`productInfo.${attrKey}`):"" } :</span>
          <div className={`attribute-values attribute`}>
            {values.map((value) => {
              const skuWithValue = skuInfo.some(
                (sku) =>
                  sku.attributes[attrKey]?.value === value &&
                  Object.entries(selectedAttributes).every(([k, v]) =>
                    k === attrKey ? true : sku.attributes[k]?.value === v
                  )
              );

              // Get image if it's color
              let image = null;
              if (attrKey.toLowerCase().includes("color")) {
                const skuWithColor = skuInfo.find(
                  (sku) => sku.attributes[attrKey]?.value === value
                );
                image = skuWithColor?.attributes[attrKey]?.image;
              }

              return image ? (
                <div key={value} onClick={() => {
                      skuWithValue && selectAttribute(attrKey, value)
                      selectColor()

                    }} className={`attribute-item ${selectedAttributes[attrKey] === value ? "active" : ""}`} style={{ opacity: skuWithValue ? 1 : 0.4 }}>
                  <img
                    
                    src={image}
                    alt={value}
                  />
                  <span className="attribute-label">{value}</span>
                </div>
              ) : (
                <button
                  key={value}
                  className={`attribute-item ${selectedAttributes[attrKey] === value ? "active" : ""}`}
                  onClick={() => skuWithValue && selectAttribute(attrKey, value)}
                  disabled={!skuWithValue}
                >
                  {value}
                </button>
              );
            })}
          </div>
        </div>
      ))}

    </Container>
  );
}


export default ProductInfo;
const Container = styled.div`
  padding: 5px;
  margin-bottom: 8px;

 /* ---------- Active / Selected ---------- */
#activate,
.attribute-item.active {
  border: 2px solid #111;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
  transform: translateY(-1px);
}

/* ---------- Prices ---------- */
.prices-container {
  display: flex;
  align-items: flex-end;
  gap: 12px;
    background: linear-gradient(135deg, #ffddddff, #ffffff );
  padding: 8px;
}

.product-price {
  font-size: 2rem;
  font-weight: 700;

}

.product-discount {
  text-decoration: line-through;
  font-size: 1.2rem;
  color: #8a8a8a;
}

.product-discount-percent {
  font-size: 1.3rem;
  color: #d40000;
  font-weight: 600;
}

/* ---------- Title ---------- */
.product-title {
  font-size: 0.95rem;
  font-weight: 600;
  line-height: 1.35;
  word-wrap: break-word;
  width: 95%;
  color: #1f1f1f;
}

/* ---------- Attributes ---------- */
.product-attribute {
  margin: 18px 0;
}

.attribute-title {
  display: block;
  font-weight: 600;
  font-size: 0.9rem;
  margin-bottom: 10px;
  color: #222;
}

.attribute-values {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

/* ---------- Attribute Item ---------- */
.attribute-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  border-radius: 10px;
  border: 1px solid #ddd;
  padding: 8px 10px;
  background: #fff;
  min-width: 60px;
  transition: all 0.2ms;
}

.attribute-item:hover {
  border-color: #111;
  transform: translateY(-2px);
  box-shadow: 0 6px 14px rgba(0, 0, 0, 0.08);
}

/* ---------- Attribute Image ---------- */
.attribute-item img {
  width: 52px;
  height: 52px;
  border-radius: 8px;
  margin-bottom: 6px;
  object-fit: cover;
  background: #f6f6f6;
}

/* ---------- Label ---------- */
.attribute-label {
  font-size: 0.8rem;
  text-align: center;
  color: #333;
}

/* ---------- Rating ---------- */
.product-rating {
  margin: 14px 0;
  display: flex;
  align-items: center;
  gap: 18px;
  border-bottom: 1px solid #eee;
  padding: 12px 0;
  background: linear-gradient(135deg, #f6f7f9, #ffffff);

}

.stars-icons-container {
  margin-top: 3px;
}

.star-icon {
  font-size: 20px;
}

#on {
  color: #ff9900;
}

#off {
  color: #c2bebeff;
}

/* ---------- Mobile ---------- */
@media only screen and (max-width: 420px) {
  & {
    width: calc(100% - 10px);
  }

  .product-title {
    font-size: 0.8rem;
  }

  .attribute-item {
    padding: 6px 8px;
    min-width: 54px;
  }

  .attribute-item img {
    width: 42px;
    height: 42px;
  }

  .attribute-label {
    font-size: 0.72rem;
  }
}
`;
