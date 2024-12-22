import React from 'react'
import styled from "styled-components"

function ProductTitle({formData, handelChange}) {
  return (
    <Container>
    <div>
      <label htmlFor="title" style={{fontFamily:"sans-serif"}}> Product Title</label>
      <div className="title">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handelChange}
        />
      </div>
    </div>
  </Container>
  )
}

export default ProductTitle
const Container = styled.div`
    margin-bottom: 10px;
    input {
      width: 45vw;
      height: 45px;
      min-width: 220px;
      border-radius: 6px;
      border: 1px solid lightgray;
      &:focus {
        outline: 1px solid lightblue;
      }
    }
  `;