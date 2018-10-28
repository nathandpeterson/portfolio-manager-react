import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Image } from 'cloudinary-react'
import { Button, Icon } from 'react-materialize'
import ImageForm from './ImageForm'
import { fieldConfig } from '../../utils/Constants'

class ImageManagerCard extends Component {

  constructor(){
    super()

    this.state = {
      editMode: false,
      angle: 0,
      id: null
    }
  }

  componentDidMount(){
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
        <Button onClick={() => this.handleRotation(-90)}>
          <Icon>
            rotate_left
          </Icon>
        </Button>
        <Button onClick={() => this.handleRotation(90)}>
          <Icon>
            rotate_right
          </Icon>
        </Button>   
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

  render(){
   
    const { editMode, publicId,  } = this.state
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
      <div className='flex-center'>
        <Button onClick={() => this.toggleEditMode(true)}>
          <Icon>
            edit
          </Icon>
        </Button>
      </div> 
    }
      </div>
      
    )
  }
}


const mapStateToProps = state => (
  { album: state.album }
)

export default connect(mapStateToProps)(ImageManagerCard)