import React, {Component} from 'react'
import Overdrive from 'react-overdrive'
import { Image } from 'cloudinary-react'

const photoArray = [
  {id: 1, key: 'rawls/rawls-001'}, 
  {id: 2, key: 'rawls/rawls-002'}
]

class PhotoCard extends Component {

  render(){
    console.log('this,props', this.props)
    return (
      <div>
          <Overdrive id='rawls/rawls-001'>
            <Image width='100%' publicId='rawls/rawls-001'></Image>
          </Overdrive>
      </div>
    )
  }
}



export default PhotoCard