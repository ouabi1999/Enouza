import React from "react";
import Grid from "@mui/material/Grid"; // <-- fixed import
import { TextField } from "@mui/material";
import styled from "styled-components";

const FieldWrapper = styled.div`
  margin-bottom: 1rem;
`;

const PackageInfo = ({ product, setProduct }) => {
  const handleChange = (field, value) => {
    setProduct(prev => ({ ...prev, package_info_dto: { ...prev.package_info_dto, [field]: value } }));
  };

  const pkg = product.package_info_dto;

  return (
    <div>
      <h2>Package Info</h2>
      <Grid container spacing={2}>
        {["package_width", "package_height", "package_length", "gross_weight"].map((field) => (
          <Grid item xs={6} key={field}>
            <FieldWrapper>
              <TextField
                label={field.replace("_", " ").toUpperCase()}
                variant="outlined"
                fullWidth
                value={pkg[field]}
                onChange={(e) => handleChange(field, e.target.value)}
              />
            </FieldWrapper>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default PackageInfo;
