import React from 'react'
import styled from "styled-components"
import { Button, InputLabel, MenuItem, OutlinedInput, TextField } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import CircularProgress from '@mui/material/CircularProgress';
function Inventory({formData, setFormData, handelChange}) {
    return (
        <Container>
            <div>
                <h4 style={{fontFamily:"sans-serif"}}>Inventory</h4>
                <div className="availability">
                    <TextField
                        className="text_input"
                        select
                        label="Availability"
                        /*helperText="Please select your currency"*/
                        value={formData.availability}
                        onChange={(event) =>
                            setFormData({
                                ...formData,
                                availability: event.target.value,
                            })
                        }
                    >
                        <MenuItem value={"In Stock"}>In Stock</MenuItem>
                        <MenuItem value={"Not In Stock"}>Not In Stock</MenuItem>
                    </TextField>
                </div>
            </div>

            <div>
                <TextField
                    inputProps={{ inputMode: 'numeric', pattern: '[0-9]*'}}
                    type="number"
                    className="text_input"
                    onChange={handelChange}
                    name="quantity"
                    value={formData.quantity}
                    label="Quantity"
                />
            </div>
        </Container>
    )
}

export default Inventory

 const Container = styled.div`
    margin-bottom: 10px;
    background: rgb(245, 245, 245);
    border-radius: 6px;
    padding: 10px;

    
  

   
  `;