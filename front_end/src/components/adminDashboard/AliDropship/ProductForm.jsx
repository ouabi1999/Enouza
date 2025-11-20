import React from "react";
import Grid from "@mui/material/Grid"; // <-- fixed import
import { TextField } from "@mui/material";
import styled from "styled-components";

const FieldWrapper = styled.div`
  margin-bottom: 1rem;
`;

const ProductForm = ({ product, setProduct }) => {
  const handleChange = (field, value) => {
    setProduct(prev => ({ ...prev, ae_item_base_info_dto: { ...prev.ae_item_base_info_dto, [field]: value } }));
  };

  return (
    <div>
      <h2>Product Info</h2>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <FieldWrapper>
            <TextField
              label="Title"
              variant="outlined"
              fullWidth
              value={product.ae_item_base_info_dto.subject}
              onChange={(e) => handleChange("subject", e.target.value)}
            />
          </FieldWrapper>
        </Grid>
        <Grid item xs={6}>
          <FieldWrapper>
            <TextField
              label="Currency"
              variant="outlined"
              fullWidth
              value={product.ae_item_base_info_dto.currency_code}
              disabled
            />
          </FieldWrapper>
        </Grid>
        <Grid item xs={6}>
          <FieldWrapper>
            <TextField
              label="Price"
              variant="outlined"
              fullWidth
              value={product.ae_item_sku_info_dtos[0].offer_sale_price}
              onChange={(e) => {
                const value = e.target.value;
                setProduct(prev => {
                  const sku = { ...prev.ae_item_sku_info_dtos[0], offer_sale_price: value };
                  return { ...prev, ae_item_sku_info_dtos: [sku] };
                });
              }}
            />
          </FieldWrapper>
        </Grid>
        <Grid item xs={6}>
          <FieldWrapper>
            <TextField
              label="Stock"
              variant="outlined"
              fullWidth
              value={product.ae_item_sku_info_dtos[0].sku_available_stock}
              onChange={(e) => {
                const value = e.target.value;
                setProduct(prev => {
                  const sku = { ...prev.ae_item_sku_info_dtos[0], sku_available_stock: value };
                  return { ...prev, ae_item_sku_info_dtos: [sku] };
                });
              }}
            />
          </FieldWrapper>
        </Grid>
        <Grid item xs={6}>
          <FieldWrapper>
            <TextField
              label="SKU"
              variant="outlined"
              fullWidth
              value={product.ae_item_sku_info_dtos[0].sku_code}
              onChange={(e) => {
                const value = e.target.value;
                setProduct(prev => {
                  const sku = { ...prev.ae_item_sku_info_dtos[0], sku_code: value };
                  return { ...prev, ae_item_sku_info_dtos: [sku] };
                });
              }}
            />
          </FieldWrapper>
        </Grid>
      </Grid>
    </div>
  );
};

export default ProductForm;
