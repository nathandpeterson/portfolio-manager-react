import React, { Component, Fragment } from 'react'
import { uploadImageName, fetchAlbums, fetchOneAlbum, deleteImage } from '../../actions'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

class ImageForm extends Component {
  constructor() {
    super()
    this.state = this.initialState;
    this.widget = null;
  }

  initialState = {
    name: '',
    description: '',
    size: '',
    date: '',
    deleteConfirmation: false
  }

  componentDidMount = async () => {
    const { id } = this.props.match.params
    await this.props.fetchAlbums()
    await this.props.fetchOneAlbum(id)
    const { exists, imageData, album } = this.props
    if (exists) {
      const cleanedData = this.cleanData({ ...imageData })
      this.setState({ ...cleanedData })
    } else {
      this.setState({ albumId: album.id })
    }
    this.widget = window.cloudinary.createUploadWidget({
      cloudName: process.env.REACT_APP_CLOUD_NAME,
      uploadPreset: process.env.REACT_APP_UPLOAD_PRESET
    }, (error, result) => {
      if (result && result.event && result.event === 'success') {
        return this.handleUpload(result, this.props.setModalMessage)
      }
      if (error) {
        this.props.setModalMessage('Error');
      }
    })
  }

  componentDidUpdate(prevProps) {
    if (this.props.angle !== prevProps.angle) {
      this.setState({ angle: this.props.angle })
    }
  }

  cleanData = (data) => {
    const { image_id, album_id, updated_at, created_at, deleteConfirmation, ...cleanedData } = data
    return { ...cleanedData, albumId: album_id }
  }

  handleUpload = (cloudinaryResponse, cb) => {
    if (cloudinaryResponse.info) {
      const { public_id } = cloudinaryResponse.info;
      const { deleteConfirmation, ...cleanedState } = this.state
      this.props.uploadImage({ ...cleanedState, publicId: public_id }, cb)
    };
  }

  handleClick = () => {
    this.widget.open();
  }

  imageDataConfig = [
    { displayName: 'Image Name', property: 'name', placeholder: 'Title' },
    { displayName: 'Description', property: 'description', placeholder: 'Add text here' },
    { displayName: 'Size', property: 'size', placeholder: 'e.g. 10 X 6' },
    { displayName: 'Date', property: 'date', placeholder: 'e.g. September 2018' },
  ]

  renderField = ({ displayName, property, placeholder }) => {
    return (
      <div key={`imageUploader-${property}`}>
        <input className='input'
          value={this.state[property]}
          autoFocus={displayName === 'Image Name'}
          onChange={(e) => this.setState({ [property]: e.target.value })}
          placeholder={placeholder}
          label={displayName} />
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
              const { deleteConfirmation, ...cleanedState } = this.state
              this.props.uploadImage(cleanedState, this.props.setModalMessage)
            }}> SAVE
          </button>
        </div>
        <br />
        {this.renderDeleteButton()}
      </Fragment>
    )
  }
  handleDelete(cb) {
    return this.props.deleteImage(this.state.id, cb)
  }

  renderDeleteButton() {
    const { deleteConfirmation } = this.state
    return (
      <div className='flex-center' >
        <div style={{ width: '15rem', textAlign: 'center' }}>
          <div>
            <button className={`btn ${deleteConfirmation ? "red" : "grey"}`}
              onClick={() => {
                if (deleteConfirmation) {
                  this.handleDelete(this.props.setModalMessage)
                } else {
                  this.setState({ deleteConfirmation: true })
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

  render() {
    return (
      <div className='image-form-container'>
        {this.imageDataConfig.map(this.renderField)}
        {this.props.exists ? this.renderButtonGroup() :
        <Fragment>
          <button
            className='btn #80deea cyan lighten-1'
            waves='light'
            id="upload_widget_opener"
            onClick={this.handleClick} >
            UPLOAD
          </button>
          <button
           className='btn grey'
           waves='light'
           onClick={() => this.props.toggleEditMode(false)}
           >
            CANCEL
          </button>
        </Fragment>
        }
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => (
  {
    uploadImage: (data, cb) => dispatch(uploadImageName(data, cb)),
    fetchAlbums: () => dispatch(fetchAlbums()),
    fetchOneAlbum: (id) => dispatch(fetchOneAlbum(id)),
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