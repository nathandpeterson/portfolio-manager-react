import React, { Component, Fragment } from 'react'
import { Input, Row, Button } from 'react-materialize'
import { uploadImageName, fetchAlbums } from '../../actions'
import { cloud_name, upload_preset } from '../../config/config'
import { connect } from 'react-redux'

class ImageForm extends Component {
  constructor(){
    super()

    this.state = {
      name: '',
      description: '',
      size: '',
      date: ''
    }
  }

  async componentDidMount(){
    await this.props.fetchAlbums()
    const { exists, imageData } = this.props
    if(exists){
      // clean out data
      const cleanedData = this.cleanData(imageData)
      this.setState({ ...cleanedData })
    } else {
      this.setState({albumId: this.props.albumId})
    }
  }

  componentDidUpdate(prevProps){
    if(this.props.angle !== prevProps.angle){
      this.setState({angle: this.props.angle})
    }
  }

  cleanData = (data) => {
    const { image_id, album_id, updated_at, created_at, ...cleanedData } = data
    return {...cleanedData, id: image_id, albumId: album_id}
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
          this.handleUpload(result, this.props.toggleEditMode(false))
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
          <Input 
                  s={12}
                  value={this.state[property]}
                  autoFocus={displayName === 'Image Name'}
                  onChange={(e) => this.setState({[property]: e.target.value})}
                  placeholder={placeholder}
                  label={displayName}/>
        </Row>
    )
  }

  renderButtonGroup = () => {
    const { toggleEditMode } = this.props
    return (
      <Fragment>
        <div className='flex-space-between'>
          <Button onClick={() => toggleEditMode(false)}>
            CANCEL
          </Button>
          <Button onClick={() => console.log('remove')}>
            DELETE
          </Button>
          <Button onClick={() => {
            this.props.uploadImage(this.state, toggleEditMode(false))
          }}>
            SAVE
          </Button>
        </div>
        <br />
        {this.renderMoveImageControl()}
      </Fragment>
    )
  }

  renderMoveImageControl(){

    const { albums} = this.props
    const otherAlbums = albums.filter(album => parseInt(album.id,10) !== parseInt(this.state.albumId, 10))
    if(otherAlbums.length){
      return (
        <div className='flex-space-beween'>
          <div>
            <Input  s={12} 
                    type='select' 
                    label='Move to another album'
                    onChange={(e) => this.setState({albumId: e.target.value})}
                    value={this.props.albumId} 
                    defaultValue={this.props.albumId}>
              {otherAlbums.map(({id, album_name}) => {
                return <option value={id}>{album_name}</option>
              })}
            </Input>
          </div>        
        </div>
      )
    }
    
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
    uploadImage: (data, cb) => dispatch(uploadImageName(data, cb)),
    fetchAlbums: () => dispatch(fetchAlbums()),
  }
)

const mapStateToProps = state => (
  {
    album: state.album,
    albums: state.albums
  }
)

export default connect(mapStateToProps, mapDispatchToProps)(ImageForm)