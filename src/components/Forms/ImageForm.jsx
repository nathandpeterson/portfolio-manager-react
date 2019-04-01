import React, { Component, Fragment } from 'react'
import { uploadImageName, fetchAlbums, fetchOneAlbum, deleteImage } from '../../actions'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

const cloud_name = process.env.REACT_APP_CLOUD_NAME
const upload_preset = process.env.REACT_APP_UPLOAD_PRESET

class ImageForm extends Component {
  constructor(){
    super()

    this.state = this.initialState
  }

  initialState = {
    name: '',
    description: '',
    size: '',
    date: '',
    message: '',
    deleteConfirmation: false
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

  handleUpload = (cloudinaryResultArray) => {
    if(cloudinaryResultArray){
      cloudinaryResultArray.forEach(result => {
        const { message, ...cleanedState } = this.state
        this.props.uploadImage({...cleanedState, publicId: result.public_id})
      })
    }
  }

  handleClick = () => {
    window.cloudinary.openUploadWidget({ cloud_name, upload_preset },
      (error, result) => {
          this.handleUpload(result)
      })
  }

  success = () => {
    this.setState({message: 'Success!'})
    setTimeout(() => {
      this.props.toggleEditMode(false)
    }, 1000);
  }

  imageDataConfig = [
    {displayName: 'Image Name', property: 'name', placeholder: 'Title'},
    {displayName: 'Description', property: 'description', placeholder: 'Add text here'},
    {displayName: 'Size', property: 'size', placeholder: 'e.g. 10 X 6'},
    {displayName: 'Date', property: 'date', placeholder: 'e.g. September 2018'},
    ]

  renderField = ({displayName, property, placeholder}) => {
    return (
      <div key={`imageUploader-${property}`}>
          <input  className='input'
                  value={this.state[property]}
                  autoFocus={displayName === 'Image Name'}
                  onChange={(e) => this.setState({[property]: e.target.value})}
                  placeholder={placeholder}
                  label={displayName}/>
        </div>
    )
  }

  renderButtonGroup = () => {
    const { toggleEditMode } = this.props
    return (
      <Fragment>
        <div className='flex-space-between'>
          <button 
                  onClick={() => toggleEditMode(false)}
                  className='btn #03a9f4 light-blue'>
            CANCEL
          </button>
          
          <button className='btn #03a9f4 light-blue' 
                  onClick={() => {
                    const { message, ...cleanedState } = this.state
                    this.props.uploadImage(cleanedState, () => this.success())
          }}> SAVE
          </button>
        </div>
        <br />
        {this.renderDeleteButton()}
      </Fragment>
    )
  }
  handleDelete(){
    // TODO: this needs to be removed from the DOM
    return this.props.deleteImage(this.state.id, () =>  this.setState({deleteConfirmation: false}))
  }
  
  renderDeleteButton(){
    const { deleteConfirmation } = this.state
    return (
      <div className='flex-center' >
          <div style={{width:'15rem', textAlign: 'center'}}>
              <div>
                <button className={`btn ${deleteConfirmation ? "red" : "grey"}`}
                        onClick={() => {
                          if (deleteConfirmation) {
                            this.handleDelete()
                          } else {
                            this.setState({deleteConfirmation: true})
                          }
                        }
                      }>
                  {`${deleteConfirmation ? "REALLY" : ""} DELETE`}
                </button>
              </div>
          </div>
        </div>
    )
  }

  render(){
    return (
      <div>
        <div className='flex-center header'>
          <h4>{this.state.message}</h4>
        </div>
        {this.imageDataConfig.map(this.renderField)}
        {this.props.exists ? this.renderButtonGroup() : 
          <button
                  className='#80deea cyan lighten-1' 
                  waves='light'
                  id="upload_widget_opener"
                  onClick={this.handleClick} >
            UPLOAD
          </button>}
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
    albums: state.albums,
    uploadedImage: state.uploadImage
  }
)

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ImageForm))