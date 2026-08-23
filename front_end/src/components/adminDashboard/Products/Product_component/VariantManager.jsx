import React, { useMemo } from "react";
import styled from "styled-components";

import AddIcon from "@mui/icons-material/Add";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import ImageIcon from "@mui/icons-material/Image";

/* =========================================================
   HELPERS
========================================================= */

const createVariantId = () => {
  if (
    typeof crypto !== "undefined" &&
    typeof crypto.randomUUID === "function"
  ) {
    return crypto.randomUUID();
  }

  return `variant-${Date.now()}-${Math.random()
    .toString(36)
    .substring(2, 9)}`;
};

const toNumber = (value) => {
  if (value === "" || value === null || value === undefined) {
    return 0;
  }

  const number = Number(value);

  return Number.isFinite(number) ? number : 0;
};

/*
 * IMPORTANT
 *
 * Every attribute contains BOTH:
 *
 * value
 * definitionName
 *
 * value:
 *   Original AliExpress/internal value.
 *
 * definitionName:
 *   Customer-facing name that YOU can edit.
 */
const createEmptyVariant = (attributeNames = []) => {
  const attributes = {};

  attributeNames.forEach((name) => {
    attributes[name] = {
      value: "",
      definitionName: "",
      image: null,
      propertyId: null,
      valueId: null,
    };
  });

  return {
    id: createVariantId(),
    sku_attr: "",
    attributes,
    cost: 0,
    sellingPrice: 0,
    comparePrice: 0,
    profitPrice: 0,
    available_stock: 0,
  };
};

/* =========================================================
   NORMALIZE VARIANT
========================================================= */

const normalizeVariant = (variant = {}) => {
  const attributes = {};

  if (
    variant.attributes &&
    typeof variant.attributes === "object"
  ) {
    Object.entries(variant.attributes).forEach(
      ([name, attribute]) => {
        if (
          attribute &&
          typeof attribute === "object" &&
          Object.prototype.hasOwnProperty.call(
            attribute,
            "value"
          )
        ) {
          attributes[name] = {
            /*
             * NEVER replace this when editing.
             * This remains the original AliExpress value.
             */
            value: attribute.value ?? "",

            /*
             * This is the value displayed/edited
             * by your store.
             *
             * If an old product has no definitionName,
             * fall back to value.
             */
            definitionName:
              attribute.definitionName?.trim() ||
              attribute.value ||
              "",

            image: attribute.image ?? null,

            propertyId:
              attribute.propertyId ?? null,

            valueId:
              attribute.valueId ?? null,
          };
        } else {
          attributes[name] = {
            value: attribute ?? "",

            definitionName:
              attribute ?? "",

            image: null,

            propertyId: null,

            valueId: null,
          };
        }
      }
    );
  }

  /* =======================================================
     OLD PRODUCT COMPATIBILITY
  ======================================================= */

  if (
    variant.color &&
    !Object.keys(attributes).some(
      (name) =>
        name.toLowerCase() === "color"
    )
  ) {
    attributes.Color = {
      value: variant.color,
      definitionName: variant.color,
      image: variant.image || null,
      propertyId: null,
      valueId: null,
    };
  }

  if (
    variant.size &&
    !Object.keys(attributes).some(
      (name) =>
        name.toLowerCase() === "size"
    )
  ) {
    attributes.Size = {
      value: variant.size,
      definitionName: variant.size,
      image: null,
      propertyId: null,
      valueId: null,
    };
  }

  return {
    id:
      variant.id ||
      createVariantId(),

    sku_attr:
      variant.sku_attr || "",

    attributes,

    cost:
      toNumber(variant.cost),

    sellingPrice:
      toNumber(variant.sellingPrice),

    comparePrice:
      toNumber(variant.comparePrice),

    profitPrice:
      toNumber(variant.profitPrice),

    available_stock:
      toNumber(variant.available_stock),
  };
};

/* =========================================================
   COMPONENT
========================================================= */

export default function VariantManager({
  formData,
  setFormData,
}) {
  /*
   * formData.skuInfo remains the single source of truth.
   */
  const variants = useMemo(() => {
    return (formData?.skuInfo || []).map(
      normalizeVariant
    );
  }, [formData?.skuInfo]);

  /*
   * Find all attributes.
   */
  const attributeNames = useMemo(() => {
    const names = [];

    variants.forEach((variant) => {
      Object.keys(
        variant.attributes || {}
      ).forEach((name) => {
        if (!names.includes(name)) {
          names.push(name);
        }
      });
    });

    return names;
  }, [variants]);

  /* =======================================================
     SAVE
  ======================================================= */

  const saveVariants = (nextVariants) => {
    setFormData((prev) => ({
      ...prev,
      skuInfo: nextVariants,
    }));
  };

  /* =======================================================
     VARIANT UPDATE
  ======================================================= */

  const updateVariant = (
    variantId,
    field,
    value
  ) => {
    const nextVariants = variants.map(
      (variant) => {
        if (variant.id !== variantId) {
          return variant;
        }

        return {
          ...variant,
          [field]: value,
        };
      }
    );

    saveVariants(nextVariants);
  };

  /* =======================================================
     DEFINITION NAME UPDATE
     
     IMPORTANT:
     
     This changes:
     
     definitionName
     
     NOT:
     
     value
  ======================================================= */

  const updateAttributeDefinitionName = (
    variantId,
    attributeName,
    definitionName
  ) => {
    const nextVariants = variants.map(
      (variant) => {
        if (variant.id !== variantId) {
          return variant;
        }

        const currentAttribute =
          variant.attributes?.[
            attributeName
          ] || {};

        return {
          ...variant,

          attributes: {
            ...variant.attributes,

            [attributeName]: {
              ...currentAttribute,

              /*
               * ONLY CHANGE THE DISPLAY NAME.
               */
              definitionName,
            },
          },
        };
      }
    );

    saveVariants(nextVariants);
  };

  /* =======================================================
     IMAGE
  ======================================================= */

  const updateAttributeImage = (
    variantId,
    attributeName,
    file
  ) => {
    if (!file) return;

    const previewUrl =
      URL.createObjectURL(file);

    const nextVariants = variants.map(
      (variant) => {
        if (variant.id !== variantId) {
          return variant;
        }

        const currentAttribute =
          variant.attributes?.[
            attributeName
          ] || {};

        return {
          ...variant,

          attributes: {
            ...variant.attributes,

            [attributeName]: {
              ...currentAttribute,
              image: previewUrl,
            },
          },
        };
      }
    );

    saveVariants(nextVariants);
  };

  /* =======================================================
     ADD VARIANT
  ======================================================= */

  const addVariant = () => {
    const newVariant =
      createEmptyVariant(
        attributeNames
      );

    saveVariants([
      ...variants,
      newVariant,
    ]);
  };

  /* =======================================================
     DUPLICATE
  ======================================================= */

  const duplicateVariant = (
    variantId
  ) => {
    const original =
      variants.find(
        (variant) =>
          variant.id === variantId
      );

    if (!original) return;

    const duplicate = {
      ...original,

      id: createVariantId(),

      /*
       * Do not duplicate supplier SKU.
       */
      sku_attr: "",

      attributes:
        Object.fromEntries(
          Object.entries(
            original.attributes || {}
          ).map(
            ([name, attribute]) => [
              name,
              {
                /*
                 * Preserve original AliExpress value.
                 */
                value:
                  attribute?.value || "",

                /*
                 * Preserve your edited definition.
                 */
                definitionName:
                  attribute?.definitionName ||
                  attribute?.value ||
                  "",

                image:
                  attribute?.image || null,

                propertyId:
                  attribute?.propertyId ||
                  null,

                valueId:
                  attribute?.valueId ||
                  null,
              },
            ]
          )
        ),
    };

    const index =
      variants.findIndex(
        (variant) =>
          variant.id === variantId
      );

    const nextVariants = [
      ...variants,
    ];

    nextVariants.splice(
      index + 1,
      0,
      duplicate
    );

    saveVariants(nextVariants);
  };

  /* =======================================================
     DELETE
  ======================================================= */

  const deleteVariant = (
    variantId
  ) => {
    const nextVariants =
      variants.filter(
        (variant) =>
          variant.id !== variantId
      );

    saveVariants(nextVariants);
  };

  /* =======================================================
     ADD ATTRIBUTE
  ======================================================= */

  const addAttribute = () => {
    const name = window.prompt(
      "Option name (example: Body Color, Lampshade Color, Size):"
    );

    if (!name) return;

    const cleanName =
      name.trim();

    if (!cleanName) return;

    const alreadyExists =
      attributeNames.some(
        (attribute) =>
          attribute.toLowerCase() ===
          cleanName.toLowerCase()
      );

    if (alreadyExists) {
      window.alert(
        `"${cleanName}" already exists.`
      );

      return;
    }

    const nextVariants =
      variants.map(
        (variant) => ({
          ...variant,

          attributes: {
            ...variant.attributes,

            [cleanName]: {
              value: "",
              definitionName: "",
              image: null,
              propertyId: null,
              valueId: null,
            },
          },
        })
      );

    saveVariants(nextVariants);
  };

  /* =======================================================
     REMOVE ATTRIBUTE
  ======================================================= */

  const removeAttribute = (
    attributeName
  ) => {
    const confirmed =
      window.confirm(
        `Remove "${attributeName}" from all variants?`
      );

    if (!confirmed) return;

    const nextVariants =
      variants.map(
        (variant) => {
          const attributes = {
            ...variant.attributes,
          };

          delete attributes[
            attributeName
          ];

          return {
            ...variant,
            attributes,
          };
        }
      );

    saveVariants(nextVariants);
  };

  /* =======================================================
     PROFIT
  ======================================================= */

  const getProfit = (variant) => {
    const cost =
      toNumber(variant.cost);

    const selling =
      toNumber(
        variant.sellingPrice
      );

    return selling - cost;
  };

  /* =======================================================
     TOTAL STOCK
  ======================================================= */

  const totalStock =
    variants.reduce(
      (total, variant) =>
        total +
        toNumber(
          variant.available_stock
        ),
      0
    );

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <Wrapper>
      <Header>
        <HeaderLeft>
          <Title>
            Variants & Pricing
          </Title>

          <Subtitle>
            Manage product options,
            pricing, stock and SKUs.
          </Subtitle>
        </HeaderLeft>

        <HeaderActions>
          <SecondaryButton
            type="button"
            onClick={addAttribute}
          >
            <AddIcon fontSize="small" />
            Add Option
          </SecondaryButton>

          <PrimaryButton
            type="button"
            onClick={addVariant}
          >
            <AddIcon fontSize="small" />
            Add Variant
          </PrimaryButton>
        </HeaderActions>
      </Header>

      {/* =================================================
          SUMMARY
      ================================================= */}

      <Summary>
        <SummaryItem>
          <SummaryLabel>
            Variants
          </SummaryLabel>

          <SummaryValue>
            {variants.length}
          </SummaryValue>
        </SummaryItem>

        <SummaryItem>
          <SummaryLabel>
            Options
          </SummaryLabel>

          <SummaryValue>
            {attributeNames.length}
          </SummaryValue>
        </SummaryItem>

        <SummaryItem>
          <SummaryLabel>
            Total Stock
          </SummaryLabel>

          <SummaryValue>
            {totalStock}
          </SummaryValue>
        </SummaryItem>
      </Summary>

      {/* =================================================
          OPTIONS
      ================================================= */}

      {attributeNames.length > 0 && (
        <OptionsBar>
          <OptionsTitle>
            Product options
          </OptionsTitle>

          <OptionsList>
            {attributeNames.map(
              (attributeName) => (
                <OptionChip
                  key={attributeName}
                >
                  <span>
                    {attributeName}
                  </span>

                  <RemoveOption
                    type="button"
                    onClick={() =>
                      removeAttribute(
                        attributeName
                      )
                    }
                  >
                    ×
                  </RemoveOption>
                </OptionChip>
              )
            )}
          </OptionsList>
        </OptionsBar>
      )}

      {/* =================================================
          EMPTY
      ================================================= */}

      {variants.length === 0 ? (
        <EmptyState>
          <EmptyIcon>
            <ImageIcon />
          </EmptyIcon>

          <EmptyTitle>
            No variants yet
          </EmptyTitle>

          <EmptyText>
            Add a variant to start
            managing product options,
            pricing and stock.
          </EmptyText>

          <EmptyActions>
            <PrimaryButton
              type="button"
              onClick={addVariant}
            >
              <AddIcon fontSize="small" />
              Add Variant
            </PrimaryButton>

            <SecondaryButton
              type="button"
              onClick={addAttribute}
            >
              <AddIcon fontSize="small" />
              Add Option
            </SecondaryButton>
          </EmptyActions>
        </EmptyState>
      ) : (
        <TableContainer>
          <Table>
            <thead>
              <tr>
                <TH sticky>#</TH>

                {attributeNames.map(
                  (attributeName) => (
                    <TH key={attributeName}>
                      {attributeName}
                    </TH>
                  )
                )}

                <TH>SKU</TH>
                <TH>Cost</TH>
                <TH>Selling</TH>
                <TH>Compare</TH>
                <TH>Profit</TH>
                <TH>Stock</TH>
                <TH>Actions</TH>
              </tr>
            </thead>

            <tbody>
              {variants.map(
                (variant, index) => (
                  <TR key={variant.id}>

                    <TD sticky>
                      <VariantNumber>
                        {index + 1}
                      </VariantNumber>
                    </TD>

                    {/* =================================
                        ATTRIBUTES
                    ================================= */}

                    {attributeNames.map(
                      (attributeName) => {
                        const attribute =
                          variant
                            .attributes?.[
                            attributeName
                          ];

                        const hasImage =
                          Boolean(
                            attribute?.image
                          );

                        const isImageOption =
                          attributeName
                            .toLowerCase()
                            .includes(
                              "color"
                            );

                        return (
                          <TD
                            key={
                              attributeName
                            }
                          >
                            <AttributeCell>

                              {/* =================================
                                  CUSTOMER-FACING NAME
                              ================================= */}

                              <AttributeInput
                                value={
                                  attribute
                                    ?.definitionName ||
                                  ""
                                }
                                placeholder={
                                  attributeName
                                }
                                onChange={(
                                  event
                                ) =>
                                  updateAttributeDefinitionName(
                                    variant.id,
                                    attributeName,
                                    event.target
                                      .value
                                  )
                                }
                              />

                              {hasImage && (
                                <OptionImage
                                  src={
                                    attribute.image
                                  }
                                  alt={
                                    attribute
                                      ?.definitionName ||
                                    ""
                                  }
                                />
                              )}

                              {isImageOption && (
                                <>
                                  <HiddenFileInput
                                    id={`variant-image-${variant.id}-${attributeName}`}
                                    type="file"
                                    accept="image/*"
                                    onChange={(
                                      event
                                    ) =>
                                      updateAttributeImage(
                                        variant.id,
                                        attributeName,
                                        event
                                          .target
                                          .files?.[0]
                                      )
                                    }
                                  />

                                  <ImageButton
                                    type="button"
                                    title="Change option image"
                                    onClick={() =>
                                      document
                                        .getElementById(
                                          `variant-image-${variant.id}-${attributeName}`
                                        )
                                        ?.click()
                                    }
                                  >
                                    <ImageIcon fontSize="small" />
                                  </ImageButton>
                                </>
                              )}

                            </AttributeCell>
                          </TD>
                        );
                      }
                    )}

                    {/* =================================
                        SKU
                    ================================= */}

                    <TD>
                      <TextInput
                        value={
                          variant.sku_attr ||
                          ""
                        }
                        placeholder="SKU"
                        onChange={(
                          event
                        ) =>
                          updateVariant(
                            variant.id,
                            "sku_attr",
                            event.target
                              .value
                          )
                        }
                      />
                    </TD>

                    {/* =================================
                        COST
                    ================================= */}

                    <TD>
                      <NumberInput
                        type="number"
                        min="0"
                        step="0.01"
                        value={
                          variant.cost
                        }
                        onChange={(
                          event
                        ) =>
                          updateVariant(
                            variant.id,
                            "cost",
                            toNumber(
                              event.target
                                .value
                            )
                          )
                        }
                      />
                    </TD>

                    {/* =================================
                        SELLING
                    ================================= */}

                    <TD>
                      <NumberInput
                        type="number"
                        min="0"
                        step="0.01"
                        value={
                          variant.sellingPrice
                        }
                        onChange={(
                          event
                        ) =>
                          updateVariant(
                            variant.id,
                            "sellingPrice",
                            toNumber(
                              event.target
                                .value
                            )
                          )
                        }
                      />
                    </TD>

                    {/* =================================
                        COMPARE
                    ================================= */}

                    <TD>
                      <NumberInput
                        type="number"
                        min="0"
                        step="0.01"
                        value={
                          variant.comparePrice
                        }
                        onChange={(
                          event
                        ) =>
                          updateVariant(
                            variant.id,
                            "comparePrice",
                            toNumber(
                              event.target
                                .value
                            )
                          )
                        }
                      />
                    </TD>

                    {/* =================================
                        PROFIT
                    ================================= */}

                    <TD>
                      <Profit
                        positive={
                          getProfit(
                            variant
                          ) >= 0
                        }
                      >
                        €
                        {getProfit(
                          variant
                        ).toFixed(2)}
                      </Profit>
                    </TD>

                    {/* =================================
                        STOCK
                    ================================= */}

                    <TD>
                      <StockInput
                        type="number"
                        min="0"
                        step="1"
                        value={
                          variant.available_stock
                        }
                        onChange={(
                          event
                        ) =>
                          updateVariant(
                            variant.id,
                            "available_stock",
                            toNumber(
                              event.target
                                .value
                            )
                          )
                        }
                      />
                    </TD>

                    {/* =================================
                        ACTIONS
                    ================================= */}

                    <TD>
                      <ActionsGroup>

                        <IconButton
                          type="button"
                          title="Duplicate variant"
                          onClick={() =>
                            duplicateVariant(
                              variant.id
                            )
                          }
                        >
                          <ContentCopyIcon fontSize="small" />
                        </IconButton>

                        <DeleteButton
                          type="button"
                          title="Delete variant"
                          onClick={() =>
                            deleteVariant(
                              variant.id
                            )
                          }
                        >
                          <DeleteOutlineIcon fontSize="small" />
                        </DeleteButton>

                      </ActionsGroup>
                    </TD>

                  </TR>
                )
              )}
            </tbody>
          </Table>
        </TableContainer>
      )}

      {/* =================================================
          BOTTOM
      ================================================= */}

      {variants.length > 0 && (
        <BottomBar>
          <BottomInfo>
            {variants.length} variant
            {variants.length !== 1
              ? "s"
              : ""}

            {" · "}

            {attributeNames.length} option
            {attributeNames.length !== 1
              ? "s"
              : ""}
          </BottomInfo>

          <PrimaryButton
            type="button"
            onClick={addVariant}
          >
            <AddIcon fontSize="small" />
            Add Variant
          </PrimaryButton>
        </BottomBar>
      )}
    </Wrapper>
  );
}

/* =========================================================
   STYLES
========================================================= */

const Wrapper = styled.div`
  width: 100%;
  box-sizing: border-box;

  background: #ffffff;

  border: 1px solid #e5e7eb;
  border-radius: 14px;

  overflow: hidden;

  font-family:
    Inter,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    sans-serif;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  gap: 20px;

  padding: 22px 24px 18px;

  border-bottom: 1px solid #e5e7eb;

  @media (max-width: 760px) {
    align-items: flex-start;
    flex-direction: column;
  }
`;

const HeaderLeft = styled.div`
  min-width: 0;
`;

const Title = styled.h2`
  margin: 0;

  color: #111827;

  font-size: 20px;
  line-height: 1.3;
  font-weight: 700;
`;

const Subtitle = styled.p`
  margin: 5px 0 0;

  color: #6b7280;

  font-size: 13px;
  line-height: 1.5;
`;

const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  @media (max-width: 500px) {
    width: 100%;

    button {
      flex: 1;
    }
  }
`;

const PrimaryButton = styled.button`
  min-height: 38px;

  display: inline-flex;
  align-items: center;
  justify-content: center;

  gap: 6px;

  padding: 8px 14px;

  border: 1px solid #111827;
  border-radius: 8px;

  background: #111827;
  color: #ffffff;

  font-size: 13px;
  font-weight: 600;

  cursor: pointer;

  transition:
    background 0.18s ease,
    transform 0.18s ease;

  &:hover {
    background: #1f2937;
  }

  &:active {
    transform: translateY(1px);
  }
`;

const SecondaryButton = styled.button`
  min-height: 38px;

  display: inline-flex;
  align-items: center;
  justify-content: center;

  gap: 6px;

  padding: 8px 14px;

  border: 1px solid #d1d5db;
  border-radius: 8px;

  background: #ffffff;
  color: #374151;

  font-size: 13px;
  font-weight: 600;

  cursor: pointer;

  &:hover {
    background: #f9fafb;
    border-color: #9ca3af;
  }
`;

const Summary = styled.div`
  display: flex;
  align-items: center;

  gap: 30px;

  padding: 14px 24px;

  border-bottom: 1px solid #e5e7eb;

  background: #fafafa;

  @media (max-width: 500px) {
    gap: 18px;
    flex-wrap: wrap;
  }
`;

const SummaryItem = styled.div`
  display: flex;
  align-items: baseline;

  gap: 7px;
`;

const SummaryLabel = styled.span`
  color: #9ca3af;

  font-size: 12px;
`;

const SummaryValue = styled.strong`
  color: #111827;

  font-size: 14px;
`;

const OptionsBar = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  gap: 12px;

  padding: 12px 24px;

  border-bottom: 1px solid #e5e7eb;

  background: #ffffff;
`;

const OptionsTitle = styled.span`
  color: #6b7280;

  font-size: 12px;
  font-weight: 600;
`;

const OptionsList = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  gap: 7px;
`;

const OptionChip = styled.div`
  display: inline-flex;
  align-items: center;

  gap: 6px;

  padding: 5px 8px 5px 10px;

  border: 1px solid #e5e7eb;
  border-radius: 999px;

  background: #fafafa;

  color: #374151;

  font-size: 12px;
  font-weight: 600;
`;

const RemoveOption = styled.button`
  width: 18px;
  height: 18px;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 0;

  border: none;
  border-radius: 50%;

  background: transparent;

  color: #9ca3af;

  font-size: 15px;
  line-height: 1;

  cursor: pointer;

  &:hover {
    background: #f3f4f6;
    color: #dc2626;
  }
`;

const TableContainer = styled.div`
  width: 100%;

  overflow-x: auto;

  scrollbar-width: thin;
`;

const Table = styled.table`
  width: max-content;
  min-width: 100%;

  border-collapse: separate;
  border-spacing: 0;
`;

const TH = styled.th`
  position: ${(props) =>
    props.sticky
      ? "sticky"
      : "static"};

  left: ${(props) =>
    props.sticky ? "0" : "auto"};

  z-index: ${(props) =>
    props.sticky ? "4" : "1"};

  min-width: 115px;

  padding: 12px;

  border-bottom: 1px solid #e5e7eb;

  background: #f9fafb;

  color: #6b7280;

  font-size: 11px;
  font-weight: 700;

  text-align: left;

  text-transform: uppercase;

  letter-spacing: 0.04em;

  white-space: nowrap;
`;

const TR = styled.tr`
  &:hover td {
    background: #fafafa;
  }
`;

const TD = styled.td`
  min-width: 115px;

  padding: 10px 12px;

  border-bottom: 1px solid #f0f1f3;

  background: #ffffff;

  vertical-align: middle;

  &:first-child {
    min-width: 55px;
  }
`;

const VariantNumber = styled.span`
  width: 30px;
  height: 28px;

  display: inline-flex;
  align-items: center;
  justify-content: center;

  border-radius: 7px;

  background: #f3f4f6;

  color: #6b7280;

  font-size: 12px;
  font-weight: 700;
`;

const AttributeCell = styled.div`
  display: flex;
  align-items: center;

  gap: 6px;
`;

const AttributeInput = styled.input`
  width: 140px;
  min-width: 140px;

  box-sizing: border-box;

  padding: 8px 9px;

  border: 1px solid #d1d5db;
  border-radius: 7px;

  outline: none;

  background: #ffffff;

  color: #111827;

  font-size: 13px;

  &:focus {
    border-color: #9ca3af;

    box-shadow:
      0 0 0 3px
      rgba(17, 24, 39, 0.06);
  }

  &::placeholder {
    color: #9ca3af;
  }
`;

const TextInput = styled.input`
  width: 150px;
  min-width: 150px;

  box-sizing: border-box;

  padding: 8px 9px;

  border: 1px solid #d1d5db;
  border-radius: 7px;

  outline: none;

  background: #ffffff;

  color: #111827;

  font-size: 12px;

  &:focus {
    border-color: #9ca3af;

    box-shadow:
      0 0 0 3px
      rgba(17, 24, 39, 0.06);
  }
`;

const NumberInput = styled.input`
  width: 88px;
  min-width: 88px;

  box-sizing: border-box;

  padding: 8px;

  border: 1px solid #d1d5db;
  border-radius: 7px;

  outline: none;

  background: #ffffff;

  color: #111827;

  font-size: 13px;

  &:focus {
    border-color: #9ca3af;

    box-shadow:
      0 0 0 3px
      rgba(17, 24, 39, 0.06);
  }
`;

const StockInput = styled(NumberInput)`
  width: 70px;
  min-width: 70px;
`;

const OptionImage = styled.img`
  width: 30px;
  height: 30px;

  flex: 0 0 30px;

  object-fit: cover;

  border: 1px solid #e5e7eb;
  border-radius: 6px;
`;

const HiddenFileInput = styled.input`
  display: none;
`;

const ImageButton = styled.button`
  width: 30px;
  height: 30px;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 0;

  border: 1px solid #d1d5db;
  border-radius: 6px;

  background: #ffffff;

  color: #6b7280;

  cursor: pointer;

  &:hover {
    background: #f9fafb;
    color: #111827;
  }
`;

const Profit = styled.span`
  color: ${(props) =>
    props.positive
      ? "#15803d"
      : "#dc2626"};

  font-size: 13px;
  font-weight: 700;

  white-space: nowrap;
`;

const ActionsGroup = styled.div`
  display: flex;
  align-items: center;

  gap: 5px;
`;

const IconButton = styled.button`
  width: 32px;
  height: 32px;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 0;

  border: 1px solid #e5e7eb;
  border-radius: 7px;

  background: #ffffff;

  color: #6b7280;

  cursor: pointer;

  &:hover {
    background: #f3f4f6;
    color: #111827;
  }
`;

const DeleteButton = styled(IconButton)`
  &:hover {
    border-color: #fecaca;

    background: #fef2f2;

    color: #dc2626;
  }
`;

const EmptyState = styled.div`
  min-height: 280px;

  display: flex;
  flex-direction: column;

  align-items: center;
  justify-content: center;

  padding: 40px 20px;

  text-align: center;
`;

const EmptyIcon = styled.div`
  width: 52px;
  height: 52px;

  display: flex;
  align-items: center;
  justify-content: center;

  margin-bottom: 13px;

  border-radius: 12px;

  background: #f3f4f6;

  color: #9ca3af;
`;

const EmptyTitle = styled.h3`
  margin: 0;

  color: #111827;

  font-size: 15px;
  font-weight: 700;
`;

const EmptyText = styled.p`
  max-width: 390px;

  margin: 7px 0 18px;

  color: #6b7280;

  font-size: 13px;
  line-height: 1.5;
`;

const EmptyActions = styled.div`
  display: flex;

  gap: 8px;

  @media (max-width: 500px) {
    width: 100%;

    flex-direction: column;

    button {
      width: 100%;
    }
  }
`;

const BottomBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 13px 18px;

  border-top: 1px solid #e5e7eb;

  background: #fafafa;

  @media (max-width: 500px) {
    align-items: stretch;

    flex-direction: column;

    gap: 10px;
  }
`;

const BottomInfo = styled.span`
  color: #6b7280;

  font-size: 12px;
  font-weight: 500;
`;