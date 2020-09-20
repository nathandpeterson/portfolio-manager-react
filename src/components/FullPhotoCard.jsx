import React from 'react'
import { Image, Transformation } from 'cloudinary-react';
import { useWindowSize } from '../contexts/WindowSize';
import { renderPrevious, renderNext, renderText } from './FullPhotoHelpers';
import './PhotoCard.css'

export function PhotoCard({ publicId, name, angle, previousUrl, nextUrl, ...imageData }){
  const windowSize = useWindowSize();
  if (windowSize.totalWidth < 550) {
    return (
      <div>
        <div style={{ paddingTop: '20px' }}>
          <Image
                id={publicId} 
                publicId={publicId}
                dpr="auto"
                width={windowSize.totalWidth}
                alt={name ? name : 'Painting By Stephen Rawls'}
            >
              <Transformation quality="auto" fetchFormat="auto" />
              { angle && <Transformation angle={angle} /> }
            </Image>
        </div>
        <div
          style={{ display: 'flex', justifyContent: 'space-between', position: 'relative' }}
        >
          {renderPrevious(previousUrl)}
          {renderNext(nextUrl)}
        </div>
        <div>
          {renderText({ name, ...imageData})}
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className='flex-center'>
          {renderPrevious(previousUrl)}
          <Image
              id={publicId} 
              publicId={publicId}
              dpr="auto"
              responsive
              height={Math.floor(windowSize.mainHeight - 120 )}
              crop="scale"
              alt={name ? name : 'Painting By Stephen Rawls'}
          >
            <Transformation quality="auto" fetchFormat="auto" />
            { angle && <Transformation angle={angle} /> }
          </Image>
          {renderNext(nextUrl)}
          
        </div>
        <div>
          {renderText({ name, ...imageData})}
        </div>
      </div>
  )
}

