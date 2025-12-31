import React from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import styled from "styled-components"

function Description() {
  const productData = useSelector(state => state.products.productData)
  const { i18n } = useTranslation()
  return (
    <Container>

<div>
      <div
        dangerouslySetInnerHTML={{ __html: productData[0]?.description[i18n.language || 'en']  }}
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
    width:99%;
  }
  ul,
li {
    list-style: initial;
}
  

`