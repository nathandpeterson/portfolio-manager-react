import React, { Component } from 'react'
import { Input, Col, Row, Button } from 'react-materialize'
import { uploadImageName } from '../../actions'
import { cloud_name, upload_preset } from '../../config/config'
import { connect } from 'react-redux'

class NewImage extends Component {
  constructor(){
    super()

    this.state = {
      name: '',
      description: '',
      size: '',
      date: '',
      albumId: ''
    }
  }

  componentDidMount(){
    this.setState({albumId: this.props.albumId})
  }

  handleUpload = (cloudinaryResultArray) => {

    if(cloudinaryResultArray){
      cloudinaryResultArray.forEach(result => {
        this.props.uploadImage({...this.state, publicId: result.public_id}, this.props.updateAlbumState)
      })
    }
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

  render(){
    return (
      <div>
        {this.imageDataConfig.map(this.renderField)}
        <Row>
          <Col s={3}/>
          <Button     large 
                      className='#80deea cyan lighten-1' 
                      waves='light'
                      id="upload_widget_opener"
                      onClick={() => {
                        window.cloudinary.openUploadWidget({ cloud_name, upload_preset },
                          (error, result) => {
                              this.handleUpload(result)
                          })
                        }
                        }>
                  UPLOAD
          </Button>
        </Row>
        
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => (
  { 
    uploadImage: (publicId, cb) => dispatch(uploadImageName(publicId, cb))
  }
)

export default connect(null, mapDispatchToProps)(NewImage)