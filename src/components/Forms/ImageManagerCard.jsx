import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Image } from 'cloudinary-react'
import ImageForm from './ImageForm'
import { updateAlbum, updateHomeImage } from '../../actions'
import { withRouter } from 'react-router-dom'
import { fieldConfig } from '../../utils/Constants'
import RotateRight from 'rmdi/lib/RotateRight'
import RotateLeft from 'rmdi/lib/RotateLeft'
import Edit from 'rmdi/lib/Edit'

class ImageManagerCard extends Component {

  constructor(){
    super()

    this.state = {
      editMode: false,
      angle: 0,
      id: null
    }
  }

  async componentDidMount(){
    const { publicId, angle, id } = this.props.imageData
    if(angle){
      this.setState({ angle, publicId, id })
    } else {
      this.setState({ publicId, id })
    }
  }

  renderImageData = (field, data) => {
    const { fieldName, label } = field
    return (
      <div key={`${data.publicId}-${fieldName}`} className='image-field'>
        <label>{label}</label>
        <span>{data[fieldName]}</span>
      </div>
    )
  }

  toggleEditMode = (boolean) => {
    this.setState({editMode: boolean})
  }

  handleRotation = (degreeChange) => {
    const { angle } = this.state
    const newAngle = angle + degreeChange
    Math.abs(newAngle === 360) ?
      this.setState({angle: 0 }) :
      this.setState({angle: newAngle })
  }

  renderRotateIcons = () => {
    return (
      <div className='flex-space-between'>
        <button className='btn #03a9f4 light-blue flex-align' 
                onClick={() => this.handleRotation(-90)}>
          <RotateLeft />
        </button>
        <button className='btn #03a9f4 light-blue flex-align'
                onClick={() => this.handleRotation(90)}>
          <RotateRight />
        </button>   
      </div>
    )
  }

  renderImage = () => {
    const { publicId, angle } = this.state
    if(angle){
      return (
        <Image publicId={publicId} width='200px' style={{transform: `rotate(${angle}deg)`}} />
      )
    } else {
      return (
        <Image publicId={publicId} width='200px' />
      )
    }
  }

  handleUpdateKeyImage = (keyImageId) => {
    const { created_at, images, updated_at, ...albumCopy } = this.props.album
    this.props.updateAlbum({...albumCopy, key_image_id: keyImageId})
  }

  render(){
   
    const { editMode, publicId  } = this.state
    return (
      <div key={`image-thumbnail-${publicId}`} className='image-card-manage'>
        <div style={{padding: '2rem 3rem', margin: '0 auto'}}>
          {this.renderImage()}
        </div>
          <div style={{marginTop: '1rem'}}>
          {editMode ? this.renderRotateIcons() : ''}
            {editMode ?
            <ImageForm  exists={true}
                        id={this.state.id}
                        editMode={editMode}
                        toggleEditMode={this.toggleEditMode}
                        angle={this.state.angle}
                        imageData={this.props.imageData}/> : 
            fieldConfig.map(field => this.renderImageData(field, this.props.imageData))}
          </div>
        
          {editMode ? '' :   
      <div className='flex-space-between'>
        <button className='#03a9f4 light-blue btn flex-align'
                onClick={() => this.toggleEditMode(true)}>
          <Edit />
        </button>
        <button className='#03a9f4 light-blue btn'
                onClick={() => {
                  this.props.updateHomeImage(publicId)}}
          >
          HOMEPAGE IMAGE
        </button>
        <button className='#03a9f4 light-blue btn'
                onClick={(e) => this.handleUpdateKeyImage(publicId)}>
          KEY IMAGE
        </button>
      </div> 
    }
      </div>
      
    )
  }
}

const mapDispatchToProps = dispatch => (
  { 
    updateAlbum: (albumData) => dispatch(updateAlbum(albumData)),
    updateHomeImage: (imageId) => dispatch(updateHomeImage(imageId))
  }
)


const mapStateToProps = state => (
  { album: state.album }
)

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ImageManagerCard))