import React from 'react';
import { ReactComponent as ChevronLeft } from '../images/ChevronLeft.svg'
import { ReactComponent as ChevronRight } from '../images/ChevronRight.svg'
import { fieldConfig } from '../utils/Constants'

const renderField = (label, data) => (
    <div key={`${label}-${data}`} className='flex-center'>
      <div style={{ marginTop: 0, fontSize: '1.25rem'}}>{data}</div>
    </div>
)

export const renderText = (imageData) => {
  const fieldConfigWithValue = fieldConfig.filter(field => imageData[field.fieldName])
  return fieldConfigWithValue.map(({fieldName, label}) => 
    renderField(label, imageData[fieldName]))
}


export const renderPrevious = (previousUrl) => {
  if (!previousUrl) {
    return null
  }
  return (
    <a href={previousUrl} style={{ display: 'block' }}>
        <div 
          className={`nav-button back-button`}>
          <ChevronLeft  />
        </div>
      </a>
  )
}

export const renderNext = (nextUrl) => {
  if (!nextUrl) {
    return null;
  }
  return (
    <a href={nextUrl} style={{ display: 'block' }}>
      <div 
        className={`nav-button forward-button`}>
        <ChevronRight  />
      </div>
    </a>
  )
}