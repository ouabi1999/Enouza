import React from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import styled from "styled-components"

function Description() {
  const productData = useSelector(state => state.product.productData)
  const { i18n, t } = useTranslation()
  const language = productData?.description[i18n.language]
  return (
    <Container>
          <h2>{t("productInfo.description")}</h2>

    <div>
      <div
        dangerouslySetInnerHTML={{ __html: language? language: productData?.description["en"] }}
        style={{  padding: '10px' }}
      />
    </div>

    </Container>
  )
}

export default Description

const Container = styled.div`
  font-size:0.8rem;
  img{
    width:85%;
  }
  ul,
li {
    list-style: initial;
}
  

`