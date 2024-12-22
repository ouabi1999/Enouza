import React, { useState } from 'react';
import { Box, FormControl, InputLabel, MenuItem, Select, Button, Typography, TextField } from '@mui/material';
import {data} from "../../../../../common/specification";

import axios from 'axios';
  
const Specifications = ({formData, setFormData}) => {
   
    

    
    const [selections, setSelections] = useState({});
    
    const handleChange = (event) => {
      setSelections({options:event.target.value, label: event.target.name})
       setFormData((prev) => ({
          ...prev,
          specifications : [...prev.specifications, {value:event.target.value, label: event.target.name}],
        }));
        console.log(formData)
      };
    
      return (
        <Box sx={{ p: 3, maxWidth: '600px', margin: 'auto' }}>
          <Typography variant="h5" sx={{ mb: 3, textAlign: 'center' }}>
            Select Product Specifications
          </Typography>
          {data?.map((item) => (
            <TextField fullWidth sx={{ mb: 2 }}
            className="text_input"
            select
            value={selections[item.label]} onChange={(e) => handleChange(e,  item.label)}
            label={item.label}
            name = {item.label}
            >
                {item.options.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
            </TextField>
          ))}
         
        </Box>
      );
    };
    
   
    
export default Specifications;
