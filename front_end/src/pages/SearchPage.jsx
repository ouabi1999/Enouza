import React from 'react'
import styled from 'styled-components'

function SearchPage({value}) {
  return (
    <Container>
        <span>
            
           Sorry, your search "{value}" did not match any products. Please try again.
        </span>
        
        </Container>
  )
}

export default SearchPage

const Container = styled.div`
   display:flex;
   justify-content:center;
   align-items:center;
   height: 70vh;
   span{
    max-width:50%;

   }
    
     
`