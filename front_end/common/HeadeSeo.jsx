import React from 'react'
import { Helmet} from 'react-helmet-async';

function HeadeSeo({title, description, product}) {
  return (
    <Helmet>
        <title>{title}</title>
        <meta name="description" data-hr="true"
            content={description}
        />
       <h1>{product?.name}</h1>
       <p>{product?.description}</p>
       
    </Helmet>
  )
}

export default HeadeSeo