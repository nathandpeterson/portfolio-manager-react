import React, { Component, Fragment } from 'react'
import { uploadImageName, fetchAlbums, fetchOneAlbum, deleteImage } from '../../actions'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Modal from 'react-modal'
import { Transition } from "react-transition-group"

Modal.setAppElement('#root')

class ImageForm extends Component {
  constructor() {
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

  handleUpload = (cloudinaryResultArray, cb) => {
    if (cloudinaryResultArray) {
      cloudinaryResultArray.forEach(result => {
        const { message, deleteConfirmation, ...cleanedState } = this.state
        this.props.uploadImage({ ...cleanedState, publicId: result.public_id }, cb)
      })
    }
  }

  handleClick = () => {

    const cloud_name = process.env.REACT_APP_CLOUD_NAME
    const upload_preset = process.env.REACT_APP_UPLOAD_PRESET

    window.cloudinary.openUploadWidget({ cloud_name, upload_preset },
      (error, result) => {
        if (result) {
          return this.handleUpload(result, this.success)
        }

      })
  }

  success = () => {
    this.setState({ message: 'Success!' })
    setTimeout(() => {
      if (this.props.toggleEditMode) {
        this.props.toggleEditMode(false)
      }
      this.setState({ message: '' })
    }, 1000);
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
              const { message, deleteConfirmation, ...cleanedState } = this.state
              this.props.uploadImage(cleanedState, this.success)
            }}> SAVE
          </button>
        </div>
        <br />
        {this.renderDeleteButton()}
      </Fragment>
    )
  }
  handleDelete() {
    return this.props.deleteImage(this.state.id, () => this.deleteSuccess())
  }

  deleteSuccess() {
    this.setState({ deleteConfirmation: false, message: 'Success' })
    setTimeout(() => {
      this.setState({ message: '' })
    }, 700);
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
                  this.handleDelete()
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
           onClick={this.props.toggleForm}
           >
            CANCEL
          </button>
        </Fragment>
        }
        <Transition
          in={this.state.message}
          timeout={500}>
          {state => {
            return (
              <Modal
                contentLabel={'Log in'}
                isOpen={this.state.message}
                closeTimeoutMS={500}
                className={`modal-container modal-container-${state}`}
              >
                <div className='flex-center header'>
                  <h4>{this.state.message}</h4>
                </div>
              </Modal>
            )
          }
          }
        </Transition>
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