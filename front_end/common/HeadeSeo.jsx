import React from 'react'
import { Helmet} from 'react-helmet-async';

function HeadeSeo({title, description }) {
  return (
    <Helmet>
        <title> {title} </title>
        <meta name="description" data-hr="true"
            content={description}
        />
      
       
    </Helmet>
  )
}

export default HeadeSeo