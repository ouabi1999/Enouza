import { TextField } from '@mui/material';
import React from 'react'
import styled from 'styled-components'

function Pricing({handelChange, formData}) {
    return (
        <Container>
            <div>
                <label htmlFor="discount" style={{fontFamily:"sans-serif"}}>Discount</label>
                <div className="discount">
                    
                <TextField
                        
                        value={formData.discount}
                        name="discount"
                        required
                        onChange={handelChange}
                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*'}}
                        type="number"
                        
                        
                    />
                </div>
            </div>

            <div>
                <label htmlFor="Price" style={{fontFamily:"sans-serif"}} >Price</label>
                <div className="price">
                <TextField
                        value={formData.price}
                        name="price"
                        required
                        onChange={handelChange}
                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*'}}
                        type="number"
                    />
                </div>
            </div>
        </Container>
    )
}

export default Pricing
const Container = styled.div`
padding: 10px;
border-radius: 6px;
margin:15px 0;
border:1px solid lightgray;
margin-bottom: 10px;
background: rgb(245, 245, 245);
input {
  width: 45vw;
  background: rgb(255, 255, 255);
}
`;