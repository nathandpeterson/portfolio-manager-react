import React from 'react'
import { Helmet } from 'react-helmet'

export const MetaHeaders = () => (
  <Helmet>
    <meta charSet="utf-8" />
    <title>Stephen Rawls</title>
    <meta name="description" content="Paintings by Stephen Rawls" />
    <link rel="canonical" href="https://stephenrawls.com" />
    <meta http-equiv="Cache-control" content="public"  max-age="31536000"></meta>
  </Helmet>
)