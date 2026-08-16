import React, { useEffect } from "react";
import styled from "styled-components";
import StarIcon from "@mui/icons-material/Star";
import VerifiedOutlinedIcon from "@mui/icons-material/VerifiedOutlined";
import { useTranslation } from "react-i18next";
import SideCart from "./SideCart";
function ProductInfo({
  productData,
  ratings,
  sum_stars,
  selectedAttributes,
  setSelectedAttributes,
  availableAttributes,
  setAvailableAttributes,
  currentSku,
  setCurrentSku,
  selectColor,

  quantity,
  addQuantity,
  subtractQuantity,
  maxOrderWorning,
  setMaxOrderWorning,
  shippingInfo,
  add_item_to_cart,
  buy_Now_item,
  setIsPopUpShippingOpen,
  isPopUpShippingOpen,
  shippingMethodIndex,
  setShippingInfo,
}) {
  const { t, i18n } = useTranslation();

  const stars = Array(5).fill(0);
  const skuInfo = productData?.skuInfo || [];

  /*
   * =========================================================
   * INITIALIZE ATTRIBUTES
   * =========================================================
   */

  useEffect(() => {
    const attributes = {};

    skuInfo.forEach((sku) => {
      Object.entries(sku.attributes || {}).forEach(
        ([key, attr]) => {
          if (!attributes[key]) {
            attributes[key] = new Set();
          }

          attributes[key].add(attr.value);
        }
      );
    });

    const normalized = {};

    Object.entries(attributes).forEach(([key, values]) => {
      normalized[key] = Array.from(values);
    });

    setAvailableAttributes(normalized);

    const defaultSelected = {};

    Object.entries(normalized).forEach(([key, values]) => {
      if (values.length > 0) {
        defaultSelected[key] = values[0];
      }
    });

    setSelectedAttributes(defaultSelected);
  }, [
    skuInfo,
    setAvailableAttributes,
    setSelectedAttributes,
  ]);

  /*
   * =========================================================
   * FIND CURRENT SKU
   * =========================================================
   */

  useEffect(() => {
    const found = skuInfo.find((sku) =>
      Object.entries(selectedAttributes).every(
        ([key, value]) =>
          sku.attributes?.[key]?.value === value
      )
    );

    setCurrentSku(found || null);
  }, [
    selectedAttributes,
    skuInfo,
    setCurrentSku,
  ]);

  /*
   * =========================================================
   * ATTRIBUTE SELECTION
   * =========================================================
   */

  const selectAttribute = (attrKey, value) => {
    setSelectedAttributes((prev) => ({
      ...prev,
      [attrKey]: value,
    }));
  };

  /*
   * =========================================================
   * PRODUCT INFORMATION
   * =========================================================
   */

  const productName =
    productData?.name?.[i18n.language] ||
    productData?.name?.en ||
    "Product";

  const averageRating =
    ratings?.length > 0
      ? (sum_stars / ratings.length).toFixed(1)
      : "0.0";

  const sellingPrice =
    currentSku?.sellingPrice > 0
      ? `$${currentSku.sellingPrice} USD`
      : productData?.price;

  const comparePrice =
    currentSku?.comparePrice > 0
      ? `$${currentSku.comparePrice} USD`
      : productData?.discount;

  const savePercentage =
    currentSku?.comparePrice > 0 &&
    currentSku?.sellingPrice >= 0
      ? (
          ((currentSku.comparePrice -
            currentSku.sellingPrice) /
            currentSku.comparePrice) *
          100
        ).toFixed(0)
      : null;

  return (
    <Container>

      {/* =====================================================
          PRODUCT HEADER
      ===================================================== */}

      <ProductHeader>

        <Eyebrow>
          {productData?.category?  t(`productInfo.${productData?.category}`) : t("footer.newsletter.eyebrow")}
        </Eyebrow>

        <ProductTitle>
          {productName}
        </ProductTitle>

        <RatingRow>

          <Stars>
            {stars.map((_, index) => (
              <StarIcon
                key={index}
                className={
                  index < Math.round(Number(averageRating))
                    ? "active"
                    : ""
                }
              />
            ))}
          </Stars>

          <RatingNumber>
            {averageRating}
          </RatingNumber>

          {ratings?.length > 0 && (
            <>
              <RatingDivider />
              <RatingCount>
                {ratings.length}{" "}
                {ratings.length === 1
                  ? "review"
                  : "reviews"}
              </RatingCount>
            </>
          )}

        </RatingRow>

      </ProductHeader>


      {/* =====================================================
          PRICE
      ===================================================== */}

      <PriceBlock>

        <PriceLine>

          <ProductPrice>
            {sellingPrice}
          </ProductPrice>

          {comparePrice && (
            <ComparePrice>
              {comparePrice}
            </ComparePrice>
          )}

          {savePercentage && (
            <SaveBadge >
              {t("productInfo.save")}{" "}
              {savePercentage}%
            </SaveBadge>
          )}

        </PriceLine>

        <PriceNote>
          <VerifiedOutlinedIcon />
          <span>
            {t("productInfo.secure_purchase_premium_quality")}
          </span>
        </PriceNote>

      </PriceBlock>


      {/* =====================================================
          ATTRIBUTES
      ===================================================== */}

      <AttributesWrapper>

        {Object.entries(availableAttributes).map(
          ([attrKey, values]) => (

            <ProductAttribute key={attrKey}>

              <AttributeHeader>

                <AttributeTitle>
                  {t(`productInfo.${attrKey}`)}
                </AttributeTitle>

                <SelectedValue>
                  {selectedAttributes[attrKey]}
                </SelectedValue>

              </AttributeHeader>

              <AttributeValues>

                {values.map((value) => {

                  const skuWithValue =
                    skuInfo.some(
                      (sku) =>
                        sku.attributes?.[attrKey]
                          ?.value === value &&
                        Object.entries(
                          selectedAttributes
                        ).every(
                          ([key, selectedValue]) =>
                            key === attrKey ||
                            sku.attributes?.[key]
                              ?.value === selectedValue
                        )
                    );

                  let image = null;

                  if (
                    attrKey
                      .toLowerCase()
                      .includes("color")
                  ) {
                    const skuWithColor =
                      skuInfo.find(
                        (sku) =>
                          sku.attributes?.[attrKey]
                            ?.value === value
                      );

                    image =
                      skuWithColor?.attributes?.[
                        attrKey
                      ]?.image;
                  }

                  /*
                   * COLOR ATTRIBUTE
                   */

                  if (image) {
                    return (
                      <ColorItem
                        key={value}
                        type="button"
                        $active={
                          selectedAttributes[attrKey] ===
                          value
                        }
                        $available={skuWithValue}
                        onClick={() => {
                          if (!skuWithValue) return;

                          selectAttribute(
                            attrKey,
                            value
                          );

                          selectColor();
                        }}
                      >

                        <ColorImageWrapper
                          $active={
                            selectedAttributes[attrKey] ===
                            value
                          }
                        >
                          <ColorImage
                            src={image}
                            alt={value}
                          />
                        </ColorImageWrapper>

                        <ColorLabel>
                          {value}
                        </ColorLabel>

                      </ColorItem>
                    );
                  }

                  /*
                   * NORMAL ATTRIBUTE
                   */

                  return (
                    <AttributeButton
                      key={value}
                      type="button"
                      $active={
                        selectedAttributes[attrKey] ===
                        value
                      }
                      disabled={!skuWithValue}
                      onClick={() => {
                        if (skuWithValue) {
                          selectAttribute(
                            attrKey,
                            value
                          );
                        }
                      }}
                    >
                      {value}
                    </AttributeButton>
                  );
                })}

              </AttributeValues>

            </ProductAttribute>
          )
        )}

      </AttributesWrapper>


      {/* =====================================================
          PURCHASE INFORMATION
      ===================================================== */}

      <PurchaseInformation>

        <PurchaseHeading>
          <span>Purchase information</span>
        </PurchaseHeading>

        <SideCart
          shippingInfo={shippingInfo}
          addQuantity={addQuantity}
          maxOrderWorning={maxOrderWorning}
          setMaxOrderWorning={setMaxOrderWorning}
          subtractQuantity={subtractQuantity}
          quantity={quantity}
          add_item_to_cart={add_item_to_cart}
          buy_Now_item={buy_Now_item}
          setIsPopUpShippingOpen={
            setIsPopUpShippingOpen
          }
          isPopUpShippingOpen={
            isPopUpShippingOpen
          }
          shippingMethodIndex={
            shippingMethodIndex
          }
          currentSku={currentSku}
          setShippingInfo={setShippingInfo}
        />

      </PurchaseInformation>


     

      

    </Container>
  );
}

export default ProductInfo;


/* =========================================================
   MAIN
========================================================= */

const Container = styled.div`
  width: 100%;
  box-sizing: border-box;

  padding: 4px 10px 35px;

  color: #202020;

  @media (max-width: 600px) {
    padding: 5px 5px 25px;
  }
`;


/* =========================================================
   PRODUCT HEADER
========================================================= */

const ProductHeader = styled.div`
  padding-bottom: 18px;

  border-bottom: 1px solid #e9e3da;
`;

const Eyebrow = styled.div`
  margin-bottom: 9px;

  font-size: 0.62rem;
  font-weight: 600;

  letter-spacing: 0.2em;

  color: #9b815f;

  text-transform: uppercase;
`;

const ProductTitle = styled.h1`
  margin: 0;

  max-width: 720px;

  font-family:
    "Playfair Display",
    Georgia,
    serif;

  font-size: clamp(
    1.35rem,
    2.2vw,
    2rem
  );

  font-weight: 500;

  line-height: 1.3;

  letter-spacing: -0.025em;

  color: #181818;
`;


/* =========================================================
   RATING
========================================================= */

const RatingRow = styled.div`
  display: flex;
  align-items: center;

  flex-wrap: wrap;

  gap: 8px;

  margin-top: 13px;
`;

const Stars = styled.div`
  display: flex;
  align-items: center;

  gap: 1px;

  svg {
    width: 16px;
    height: 16px;

    color: #d8d2ca;
  }

  svg.active {
    color: #b59771;
  }
`;

const RatingNumber = styled.span`
  font-size: 0.75rem;
  font-weight: 600;

  color: #333;
`;

const RatingDivider = styled.span`
  width: 1px;
  height: 13px;

  background: #d8d2ca;
`;

const RatingCount = styled.span`
  font-size: 0.72rem;

  color: #817c75;
`;


/* =========================================================
   PRICE
========================================================= */

const PriceBlock = styled.div`
  padding: 18px 0 17px;

  border-bottom: 1px solid #e9e3da;
`;

const PriceLine = styled.div`
  display: flex;
  align-items: center;

  flex-wrap: wrap;

  gap: 11px;
`;

const ProductPrice = styled.span`
  font-family:
    "Playfair Display",
    Georgia,
    serif;

  font-size: clamp(
    1.55rem,
    2.4vw,
    2rem
  );

  font-weight: 600;

  letter-spacing: -0.02em;

  color: #181818;
`;

const ComparePrice = styled.span`
  font-size: 0.86rem;

  color: #99928a;

  text-decoration: line-through;
`;

const SaveBadge = styled.span`
  display: inline-flex;
  align-items: center;

  padding: 4px 8px;

  background: #9b815f;

  color: white;

  font-size: 0.61rem;
  font-weight: 600;

  letter-spacing: 0.04em;

  text-transform: uppercase;
`;

const PriceNote = styled.div`
  display: flex;
  align-items: center;

  gap: 5px;

  margin-top: 9px;

  color: #888178;

  font-size: 0.65rem;

  svg {
    width: 14px;
    height: 14px;

    color: #9b815f;
  }
`;


/* =========================================================
   ATTRIBUTES
========================================================= */

const AttributesWrapper = styled.div`
  padding: 3px 0 0;
`;

const ProductAttribute = styled.div`
  padding: 18px 0;

  border-bottom: 1px solid #eee9e2;
`;

const AttributeHeader = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;

  gap: 10px;

  margin-bottom: 11px;
`;

const AttributeTitle = styled.span`
  font-size: 0.76rem;

  font-weight: 600;

  color: #282828;

  letter-spacing: 0.03em;

  text-transform: uppercase;
`;

const SelectedValue = styled.span`
  max-width: 50%;

  overflow: hidden;

  text-overflow: ellipsis;

  white-space: nowrap;

  font-size: 0.7rem;

  color: #918980;
`;

const AttributeValues = styled.div`
  display: flex;

  align-items: flex-start;

  flex-wrap: wrap;

  gap: 8px;
`;


/* =========================================================
   NORMAL ATTRIBUTE
========================================================= */

const AttributeButton = styled.button`
  min-width: 55px;
  min-height: 38px;

  padding: 7px 14px;

  border: 1px solid
    ${({ $active }) =>
      $active ? "#222" : "#dcd6ce"};

  border-radius: 2px;

  background:
    ${({ $active }) =>
      $active ? "#222" : "#fff"};

  color:
    ${({ $active }) =>
      $active ? "#fff" : "#383838"};

  font-family: inherit;

  font-size: 0.72rem;

  cursor:
    ${({ disabled }) =>
      disabled ? "not-allowed" : "pointer"};

  opacity:
    ${({ disabled }) =>
      disabled ? 0.35 : 1};

  transition:
    background 180ms ease,
    border-color 180ms ease,
    color 180ms ease;

  &:hover:not(:disabled) {
    border-color: #9b815f;
  }
`;


/* =========================================================
   COLOR
========================================================= */

const ColorItem = styled.button`
  display: flex;

  flex-direction: column;

  align-items: center;

  gap: 6px;

  padding: 4px;

  border: 1px solid transparent;

  background: transparent;

  cursor:
    ${({ $available }) =>
      $available ? "pointer" : "not-allowed"};

  opacity:
    ${({ $available }) =>
      $available ? 1 : 0.35};

  transition:
    opacity 180ms ease;
`;

const ColorImageWrapper = styled.div`
  position: relative;

  display: flex;

  align-items: center;
  justify-content: center;

  width: 58px;
  height: 58px;

  padding: 3px;

  border: 1px solid
    ${({ $active }) =>
      $active ? "#9b815f" : "#ddd7ce"};

  background: #fff;

  transition:
    border-color 180ms ease;

  &::after {
    content: "";

    position: absolute;

    inset: 1px;

    border:
      ${({ $active }) =>
        $active
          ? "1px solid #9b815f"
          : "1px solid transparent"};
  }
`;

const ColorImage = styled.img`
  width: 100%;
  height: 100%;

  object-fit: cover;

  background: #f5f2ed;
`;

const ColorLabel = styled.span`
  max-width: 65px;

  overflow: hidden;

  text-overflow: ellipsis;

  white-space: nowrap;

  font-size: 0.63rem;

  color: #5d5852;
`;


/* =========================================================
   PURCHASE INFORMATION
========================================================= */

const PurchaseInformation = styled.section`
  margin-top: 8px;

  padding-top: 2px;
`;

const PurchaseHeading = styled.div`
  display: flex;

  align-items: center;

  gap: 12px;

  margin: 3px 0 0;

  color: #262626;

  font-size: 0.69rem;

  font-weight: 600;

  letter-spacing: 0.15em;

  text-transform: uppercase;

  &::after {
    content: "";

    flex: 1;

    height: 1px;

    background: #e8e1d8;
  }
`;


/* =========================================================
   SECURE CHECKOUT
========================================================= */


const SecureHeader = styled.div`
  display: flex;

  align-items: center;
  justify-content: center;

  gap: 5px;

  margin-bottom: 9px;

  color: #858078;

  font-size: 0.63rem;

  letter-spacing: 0.05em;

  text-transform: uppercase;

  svg {
    width: 14px;
    height: 14px;

    color: #9b815f;
  }
`;

const SecureImage = styled.img`
  display: block;

  width: 100%;

  max-width: 400px;

  height: auto;

  margin: 0 auto;

  opacity: 0.9;
`;