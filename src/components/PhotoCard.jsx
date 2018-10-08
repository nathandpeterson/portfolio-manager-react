import React, {Component} from 'react'
import Overdrive from 'react-overdrive'
import { Image } from 'cloudinary-react'
import {connect} from 'react-redux'

const photoArray = [
  {id: 1, key: 'rawls/rawls-001'}, 
  {id: 2, key: 'rawls/rawls-002'}
]

class PhotoCard extends Component {

  render(){
    console.log('this pros', this.props)
    const {key} = this.props.selectedPhoto
    return (
      <div key={key}>
          <Overdrive id={key}>
            <Image width='100%' publicId={key}></Image>
          </Overdrive>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({selectedPhoto: state.selectedPhoto})


export default connect(mapStateToProps)(PhotoCard)