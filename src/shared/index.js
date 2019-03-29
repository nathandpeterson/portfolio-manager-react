import React from 'react'
import '../styles/Preloader.css'
/*!
 * Load Awesome v1.1.0 (http://github.danielcardoso.net/load-awesome/)
 * Copyright 2015 Daniel Cardoso <@DanielCardoso>
 * Licensed under MIT
 */

export const Preloader = () => (
  <div className='flex-center loader'>
    <div className='la-square-spin la-2x'>
      <div></div>
    </div>
  </div>
)