import React from "react";
import { Accordion, AccordionSummary, AccordionDetails, Typography, TextField, Box, Grid } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MediaManager from "./MediaManager";

const SKUAccordion = ({ sku, skuIndex, editableProduct, setEditableProduct }) => {
  const handleFieldChange = (key, value) => {
    const newSkus = [...editableProduct.ae_item_sku_info_dtos];
    newSkus[skuIndex][key] = value;
    setEditableProduct(prev => ({ ...prev, ae_item_sku_info_dtos: newSkus }));
  };

  return (
    <Accordion sx={{ marginBottom: "1rem" }}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography>SKU {skuIndex + 1}: {sku.sku_code}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container spacing={2}>
          {Object.keys(sku).map(key => {
            if (typeof sku[key] === "object") return null;
            return (
              <Grid item xs={6} key={key}>
                <TextField
                  fullWidth
                  label={key}
                  value={sku[key]}
                  onChange={(e) => handleFieldChange(key, e.target.value)}
                />
              </Grid>
            );
          })}
        </Grid>

        {/* SKU Media */}
        <Box sx={{ marginTop: 2 }}>
          <MediaManager sku={sku} skuIndex={skuIndex} editableProduct={editableProduct} setEditableProduct={setEditableProduct} />
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};

export default SKUAccordion;
