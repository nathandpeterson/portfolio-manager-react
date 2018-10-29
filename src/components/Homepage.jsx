import React, { PureComponent } from 'react'
import { Image } from 'cloudinary-react'
import Nav from './Nav'

class Homepage extends PureComponent {

  render(){
    return (
      <div>
      <Nav/>
      <div className='flex-center image-container'>
        <Image id={'IMG_20180716_154334.jpg'} 
            width='auto' 
            height='600px'
            publicId={'IMG_20180716_154334.jpg'}>
        </Image>
      </div>
    </div>

    )
    
  }

}

export default Homepage