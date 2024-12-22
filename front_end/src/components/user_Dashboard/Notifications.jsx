import React from 'react'
import styled from 'styled-components'
import HeadeSeo from '../../../common/HeadeSeo'

function Notifications() {
  return (
    <Container>
      <HeadeSeo title = "Dashboard / notifications"/>
      <span>
       You have no notifications !
      </span>
      </Container>
  )
}

export default Notifications
const Container = styled.div`
  display:flex;
  justify-content:center;
  align-items:center;
  height:50vh;
`