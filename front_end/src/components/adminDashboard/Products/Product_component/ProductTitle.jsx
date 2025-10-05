import React from 'react'
import styled from "styled-components"

function ProductTitle({formData, setFormData}) {

  const handelChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      name: {
        ...prev.name,
        [name]: value,
      },
    }));
  }
  return (
    <Container>
    <div>
      <label htmlFor="title" style={{fontFamily:"sans-serif"}}> Product Title english</label>
      <div className="title">
        <input
          type="text"
          name="en"
          value={formData?.name?.en}
          onChange={handelChange}
        />
      </div>
    </div>
    <div>
      <label htmlFor="title" style={{fontFamily:"sans-serif"}}> Product Title spanish</label>
      <div className="title">
        <input
          type="text"
          name="es"
          value={formData?.name?.es}
          onChange={handelChange}
        />
      </div>
    </div>
    <div>
      <label htmlFor="title" style={{fontFamily:"sans-serif"}}> Product Title arabic</label>
      <div className="title">
        <input
          type="text"
          name="ar"
          value={formData?.name?.ar}
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