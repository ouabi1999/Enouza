import React from "react";
import { Accordion, AccordionSummary, AccordionDetails, Typography, TextField, Grid, Box } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import SKUAccordion from "./SKUAccordion";

const AdvancedSettings = ({ product, setProduct }) => {

  const handleNestedChange = (path, value) => {
    const newProduct = JSON.parse(JSON.stringify(product));
    let obj = newProduct;
    path.slice(0, -1).forEach(key => obj = obj[key]);
    obj[path[path.length - 1]] = value;
    setProduct(newProduct);
  };

  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography>Advanced Settings</Typography>
      </AccordionSummary>
      <AccordionDetails>
        {/* SKUs */}
        {product.ae_item_sku_info_dtos.map((sku, idx) => (
          <SKUAccordion
            key={idx}
            sku={sku}
            skuIndex={idx}
            editableProduct={product}
            setEditableProduct={setProduct}
          />
        ))}

        {/* Product Properties */}
        <Box sx={{ mt: 3 }}>
          <Typography variant="h6">Product Properties</Typography>
          <Grid container spacing={2}>
            {product.ae_item_properties.map((prop, idx) => (
              <React.Fragment key={idx}>
                {Object.keys(prop).map(key => (
                  <Grid item xs={6} key={key}>
                    <TextField
                      fullWidth
                      label={key}
                      value={prop[key]}
                      onChange={(e) => {
                        const newProps = [...product.ae_item_properties];
                        newProps[idx][key] = e.target.value;
                        setProduct(prev => ({ ...prev, ae_item_properties: newProps }));
                      }}
                    />
                  </Grid>
                ))}
              </React.Fragment>
            ))}
          </Grid>
        </Box>

        {/* Logistics Info */}
        <Box sx={{ mt: 3 }}>
          <Typography variant="h6">Logistics Info</Typography>
          <Grid container spacing={2}>
            {Object.keys(product.logistics_info_dto).map(key => (
              <Grid item xs={6} key={key}>
                <TextField
                  fullWidth
                  label={key}
                  value={product.logistics_info_dto[key]}
                  onChange={(e) => handleNestedChange(["logistics_info_dto", key], e.target.value)}
                />
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Product IDs */}
        <Box sx={{ mt: 3 }}>
          <Typography variant="h6">Product IDs</Typography>
          <Grid container spacing={2}>
            {Object.keys(product.product_id_converter_result).map(key => {
              const val = product.product_id_converter_result[key];
              if (typeof val === "object") {
                return Object.keys(val).map(subKey => (
                  <Grid item xs={6} key={`${key}-${subKey}`}>
                    <TextField
                      fullWidth
                      label={`${key} - ${subKey}`}
                      value={val[subKey]}
                      onChange={(e) => handleNestedChange(["product_id_converter_result", key, subKey], e.target.value)}
                    />
                  </Grid>
                ));
              } else {
                return (
                  <Grid item xs={6} key={key}>
                    <TextField
                      fullWidth
                      label={key}
                      value={val}
                      onChange={(e) => handleNestedChange(["product_id_converter_result", key], e.target.value)}
                    />
                  </Grid>
                );
              }
            })}
          </Grid>
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};

export default AdvancedSettings;
