import React, { Component, Fragment } from 'react'
import { Input, Row, Button, Collapsible, CollapsibleItem } from 'react-materialize'
import { uploadImageName, fetchAlbums, fetchOneAlbum, deleteImage } from '../../actions'
// import { cloud_name, upload_preset } from '../../config/config'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

const cloud_name = process.env.REACT_APP_CLOUD_NAME
const upload_preset = process.env.REACT_APP_UPLOAD_PRESET

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

  componentDidMount =  async () => {
    const { id } = this.props.match.params
    await this.props.fetchAlbums()
    await this.props.fetchOneAlbum(id)
    const { exists, imageData, album } = this.props
    if(exists){
      const cleanedData = this.cleanData({ ...imageData })
      this.setState({ ...cleanedData })
    } else {
      this.setState({albumId: album.id})
    }
  }

  componentDidUpdate(prevProps){
    if(this.props.angle !== prevProps.angle){
      this.setState({angle: this.props.angle})
    }
  }

  cleanData = (data) => {
    const { image_id, album_id, updated_at, created_at, ...cleanedData } = data
    return {...cleanedData, albumId: album_id}
  }

  handleUpload = (cloudinaryResultArray, cb) => {
    if(cloudinaryResultArray){
      cloudinaryResultArray.forEach(result => {
        this.props.uploadImage({...this.state, publicId: result.public_id}, cb)
      })
    }
  }

  handleClick = () => {
    window.cloudinary.openUploadWidget({ cloud_name, upload_preset },
      (error, result) => {
          this.handleUpload(result, () => this.props.toggleEditMode(false))
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
          <Button onClick={() => toggleEditMode(false)}
                  className='#03a9f4 light-blue'>
            CANCEL
          </Button>
          
          <Button className='#03a9f4 light-blue' 
                  onClick={() => {
            this.props.uploadImage(this.state)
          }}>
            SAVE
          </Button>
        </div>
        <br />
        {this.renderDeleteButton()}
        {this.renderMoveImageControl()}
       
      </Fragment>
    )
  }
  
  renderDeleteButton(){
    return (
      <div className='flex-center' >
          <Collapsible style={{width:'15rem', textAlign: 'center'}}>
              <CollapsibleItem header='DELETE'>
                <Button className='red'
                        onClick={() => this.props.deleteImage(this.state.id, () => console.log('success'))}>
                  DELETE
                </Button>
              </CollapsibleItem>
          </Collapsible>
        </div>
    )
  }

  renderMoveImageControl(){

    const { albums } = this.props
    const otherAlbums = albums.filter(album => parseInt(album.id,10) !== parseInt(this.state.albumId, 10))
    if(otherAlbums.length){
      return (
      
        <div>
          <div>
            This image is currently associated with {this.props.album.album_name}
          </div>
          <Input  s={12} 
                  type='select' 
                  label='Move to another collection'
                  onChange={(e) => this.setState({albumId: e.target.value})}
                  value={this.props.albumId} 
                  defaultValue={this.props.albumId}>
            {otherAlbums.map(({id, album_name}) => {
              return <option key={`album-select-${id}`} value={id}>{album_name}</option>
            })}
          </Input>
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
    fetchOneAlbum: (id) => { dispatch(fetchOneAlbum(id)) },
    deleteImage: (id, cb) => dispatch(deleteImage(id, cb))
  }
)

const mapStateToProps = state => (
  {
    album: state.album,
    albums: state.albums
  }
)

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ImageForm))