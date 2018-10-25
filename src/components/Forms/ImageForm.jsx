import React, { Component } from 'react'
import { Input, Col, Row, Button, Icon } from 'react-materialize'
import { uploadImageName } from '../../actions'
import { cloud_name, upload_preset } from '../../config/config'
import { connect } from 'react-redux'

class ImageForm extends Component {
  constructor(){
    super()

    this.state = {
      name: '',
      description: '',
      size: '',
      date: '',
      angle: 0
    }
  }

  componentDidMount(){
    const { exists, imageData } = this.props
    if(exists){
      // get imageData and set it in state
      this.setState({ ...imageData})
    } else {
      this.setState({albumId: this.props.albumId})
    }

  }

  handleUpload = (cloudinaryResultArray) => {
    if(cloudinaryResultArray){
      cloudinaryResultArray.forEach(result => {
        this.props.uploadImage({...this.state, publicId: result.public_id}, this.props.updateAlbumState)
      })
    }
  }

  handleClick = () => {
    window.cloudinary.openUploadWidget({ cloud_name, upload_preset },
      (error, result) => {
          this.handleUpload(result)
      })
  }

  imageDataConfig = [
    {displayName: 'Image Name', property: 'name', placeholder: ''},
    {displayName: 'Description', property: 'description', placeholder: 'Add text here'},
    {displayName: 'Size', property: 'size', placeholder: 'e.g. 10 X 6'},
    {displayName: 'Date', property: 'date', placeholder: 'e.g. September 2018'},
    ]

  renderField = ({displayName, property, placeholder}) => {
    return (
      <Row key={`imageUploader-${property}`}>
          <Col s={3}/>
          <Input 
                  s={6}
                  autoFocus={displayName === 'Image Name'}
                  onChange={(e) => this.setState({[property]: e.target.value})}
                  placeholder={placeholder}
                  label={displayName}/>
        </Row>
    )
  }

  cleanData = (data) => {
    const { image_id, album_id, ...cleanedData } = data
    console.log(cleanedData)
    return {...cleanedData, id: image_id, albumId: album_id}
  }

  renderButtonGroup = () => {
    const { toggleEditMode } = this.props
     return (
      <div className='flex-space-between'>
        <Button onClick={() => toggleEditMode(false)}>
          CANCEL
        </Button>
        <Button onClick={() => {
          const cleanedData = this.cleanData(this.state)
          this.props.uploadImage(cleanedData)
        }}>
          SAVE
        </Button>
      </div> 
    )
  }

  render(){
    return (
      <div>
        {this.imageDataConfig.map(this.renderField)}
        <Row>
          {this.props.exists ? this.renderButtonGroup() : 
            <Button large 
                    className='#80deea cyan lighten-1' 
                    waves='light'
                    id="upload_widget_opener"
                    onClick={this.handleClick} >
              UPLOAD
            </Button>}
        </Row>
        
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => (
  { 
    uploadImage: (data, cb) => dispatch(uploadImageName(data, cb))
  }
)

export default connect(null, mapDispatchToProps)(ImageForm)