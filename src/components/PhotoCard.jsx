import React, {Component} from 'react'
import { Image } from 'cloudinary-react'
import Nav from './Nav'
import { connect } from 'react-redux'
import { fetchOneAlbum } from '../actions'
import { fieldConfig } from '../utils/Constants'

class PhotoCard extends Component {

  async componentDidMount() {
    const { albumId } = this.props.match.params
    await this.props.fetchOneAlbum(albumId)
  }

  renderField(label, data){
    return (
      <div key={`${label}-${data}`} className='flex-center'>
        <div style={{color: '#BEBEBE'}}>{data}</div>
      </div>
    )
  }

  renderText(imageData){
    // filter out fields with no values
    const fieldConfigWithValue = fieldConfig.filter(field => imageData[field.fieldName])
    return fieldConfigWithValue.map(({fieldName, label}) => {
      return this.renderField(label, imageData[fieldName])
    })
  }

  rotateStyle(angle){
    return angle ? 
    {transform: `rotate(${angle}deg)`}
    :
    {}
  }

  marginForRotation = (degree) => {
    const absoluteDegree = Math.abs(degree)
    if(absoluteDegree === 90 || absoluteDegree === 270){
      return 'marginDown'
    } else {
      return ''
    }
  }

  render(){
    if(!this.props.album.id) return <div>loading image</div>
    const { album: { images } , match : { params : { id } } } = this.props
    const selectedImage = images.find(image => parseInt(image.id, 10) === parseInt(id, 10))
    const {publicId, angle} = selectedImage
    return (
      <div key={publicId}>
          <Nav />
          <div className={'flex-center image-container ' + this.marginForRotation(angle)}>
            <Image id={publicId} 
                width='auto' 
                height='500px'
                style={this.rotateStyle(angle)} 
                publicId={publicId}>
            </Image>
          </div>
          {this.renderText(selectedImage)}
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => (
  { fetchOneAlbum: (id) => { dispatch(fetchOneAlbum(id)) } }
)

const mapStateToProps = state => (
  { album: state.album }
)


export default connect(mapStateToProps, mapDispatchToProps)(PhotoCard)