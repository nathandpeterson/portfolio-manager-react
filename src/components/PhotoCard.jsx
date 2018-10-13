import React, {Component} from 'react'
import Overdrive from 'react-overdrive'
import { Image } from 'cloudinary-react'

const photoArray = [
  {id: 1, key: 'rawls/rawls-001'}, 
  {id: 2, key: 'rawls/rawls-002'},
  {id: 3, key: "test-upload/cb12pqhuhx9bpafa0dwp"}
]

class PhotoCard extends Component {

  constructor(){
    super()

    this.state = {
      id: ''
    }
  }

  componentDidMount(){
    const {id} = this.props.match.params
    this.setState({id})
  }

  render(){
    const {id} = this.props.match.params
    // temporary reference for development
    const photoData = photoArray[id - 1]

    return (
      <div key={photoData.key}>
          <Overdrive id={photoData.key}>
            <Image id={id} width='100%' publicId={photoData.key}></Image>
          </Overdrive>
      </div>
    )
  }
}


export default PhotoCard