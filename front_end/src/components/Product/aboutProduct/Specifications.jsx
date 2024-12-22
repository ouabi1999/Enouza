import React from 'react';
import { Box, Table, TableBody, TableCell, TableContainer, TableRow, Typography, Paper } from '@mui/material';
import { useSelector } from 'react-redux';

const Specifications = () => {
  // Example specifications data
  const productData = useSelector(state => state.products.productData)

  return (
    <Box sx={{ p: 3, maxWidth: '1016px', margin: 'auto' }}>
      
      <TableContainer component={Paper} sx={{ boxShadow: 3 }}>
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
