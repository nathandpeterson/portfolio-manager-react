import React, {Component} from 'react'
import { Image } from 'cloudinary-react'
import Nav from './Nav'
import Footer from './Footer'
import { connect } from 'react-redux'
import { fetchOneAlbum } from '../actions'
import { fieldConfig } from '../utils/Constants'

class PhotoCard extends Component {

  async componentDidMount() {
    const { albumId } = this.props.match.params
    await this.props.fetchOneAlbum(albumId)
  }

  // renderField(label, data){
  //   return (
  //     <div style={{width: '40%', margin: '0 auto'}}>
  //       <div className='flex-space-between header'>
  //         <div>{label}</div>
  //         <div style={{color: '#BEBEBE'}}>{data}</div>
  //       </div>
  //     </div>
  //   )
  // }

  renderField(label, data){
    return (
      <div className='flex-center'>
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

  render(){
    if(!this.props.album.id) return <div>loading</div>
    const { album: { images } , match : { params : { id } } } = this.props
    const selectedImage = images.find(image => parseInt(image.id, 10) === parseInt(id, 10))
    const {publicId, angle} = selectedImage
    return (
      <div key={publicId}>
          <Nav />
          <div className='flex-center image-container'>
            <Image id={publicId} 
                width='auto' 
                height='600px'
                style={{transform: `rotate(${angle}deg)`}} 
                publicId={publicId}>
            </Image>
          </div>
          {this.renderText(selectedImage)}
          <Footer />
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