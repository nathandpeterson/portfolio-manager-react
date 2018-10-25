import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Image, Transformation } from 'cloudinary-react'
import { Button, Icon } from 'react-materialize'
import ImageForm from './ImageForm';


class ImageManagerCard extends Component {

  constructor(){
    super()

    this.state = {
      editMode: false,
      currentAngle: 0
    }
  }

  componentDidMount(){
    const { publicId, angle } = this.props.imageData
    if(angle){
      this.setState({ currentAngle: angle, publicId })
    } else {
      this.setState({ publicId })
    }
  }

  fieldConfig = [
    {label: 'TITLE', fieldName: 'name'},
    {label: 'DESCRIPTION', fieldName: 'description'},
    {label: 'DATE', fieldName: 'date'},
    {label: 'SIZE', fieldName: 'size'}
  ]

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

  handleRotation = (degreeChange, currentDegree) => {
    const newAngle = currentDegree + degreeChange
    Math.abs(newAngle === 360) ?
      this.setState({currentAngle: 0}) :
      this.setState({currentAngle: newAngle})
  }

  renderRotateIcons = (angle) => {
    return (
      <div className='flex-space-between'>
        <Button onClick={() => this.handleRotation(-90, angle)}>
          <Icon>
            rotate_left
          </Icon>
        </Button>
        <Button onClick={() => this.handleRotation(90, angle)}>
          <Icon>
            rotate_right
          </Icon>
        </Button>   
      </div>
    )
  }

  renderTransformation = () => {
    const { currentAngle } = this.state
    if(currentAngle){
      return <Transformation angle={currentAngle} />
    }
  }

  render(){
    const { editMode, currentAngle, publicId } = this.state
    console.log('currentAngle', currentAngle)
    return (
      <div key={`image-thumbnail-${publicId}`} className='image-card-manage'>
        <div>
          <Image publicId={publicId} width='200px'>
              {this.renderTransformation()}
          </Image>
          {editMode ? this.renderRotateIcons(currentAngle) : ''}
        </div>
          
          
          <div style={{marginTop: '1rem'}}>
            {editMode ?
            <ImageForm  exists={true}
                        editMode={editMode}
                        toggleEditMode={this.toggleEditMode}
                        imageData={this.props.imageData}/> : 
            this.fieldConfig.map(field => this.renderImageData(field, this.props.imageData))}
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

// const mapDispatchToProps = dispatch => (
//   { fetchOneAlbum: (id) => { dispatch(fetchOneAlbum(id)) } }
// )

const mapStateToProps = state => (
  { album: state.album }
)

export default connect(null, mapStateToProps )(ImageManagerCard)