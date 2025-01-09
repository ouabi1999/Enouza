import React from 'react'
import { Helmet} from 'react-helmet-async';

function HeadeSeo({title, description, product}) {
  return (
    <Helmet>
        <title>{title}</title>
        <meta name="description" data-hr="true"
            content={product?.description}
        />
      
       
    </Helmet>
  )
}

export default HeadeSeo