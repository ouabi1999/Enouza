import React from 'react'
import { Helmet} from 'react-helmet-async';

function HeadeSeo({title, description}) {
  return (
    <Helmet>
        <meta name="description" data-hr="true"
            content={description}
        />
      <title>{title}</title>
       
    </Helmet>
  )
}

export default HeadeSeo