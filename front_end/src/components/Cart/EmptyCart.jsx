import React from 'react'
import styled from 'styled-components'

function EmptyCart() {
  return (

      <Container>
          <div className="emptycart">
              Your cart is currently empty..
          </div>
      </Container>
   
  )
}

export default EmptyCart
const Container = styled.div`
.emptycart{
    font-size:20px;
    font-weight: 800;
    color:rgb(0, 0, 0);
    display:flex;
    justify-content: center;
    align-items: center;
    width:inherit;
    height: 408px;;
  }





`

