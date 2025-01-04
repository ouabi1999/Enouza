import React from 'react';
import { Box, Table, TableBody, TableCell, TableContainer, TableRow, Typography, Paper } from '@mui/material';
import { useSelector } from 'react-redux';

const Specifications = () => {
  // Example specifications data
  const productData = useSelector(state => state.products.productData)

  return (
    <Box sx={{ maxWidth: '1016px', margin: 'auto' }}>
      
      <TableContainer component={Paper} sx={{border:"1px solid lightgray", borderRadius:"0" }}>
        <Table>
          <TableBody>
            {productData[0]?.specifications?.map((spec, index) => (
              <TableRow key={index}>
                <TableCell sx={{ fontWeight: 'bold', width: '40%' }}>
                  {spec.label}
                </TableCell>
                <TableCell>{spec.value}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Specifications;
