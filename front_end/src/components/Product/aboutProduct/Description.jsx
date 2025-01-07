import React from 'react'
import { useSelector } from 'react-redux'
import styled from "styled-components"

function Description() {
  const productData = useSelector(state => state.products.productData)
  return (
    <Container>

<div>
      <div
        dangerouslySetInnerHTML={{ __html: productData[0]?.description }}
        style={{ border: '1px solid #ddd', padding: '10px' }}
      />
    </div>

    </Container>
  )
}

export default Description

const Container = styled.div`
  font-size:0.8rem;
  img{
    width:45%;
    margin-right:4px;
  }
  ul,
li {
    list-style: initial;
}
  

`