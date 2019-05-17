import React, { Component } from 'react'
import Nav from '../Nav'
import { connect } from 'react-redux'
import { Preloader } from '../../shared'
import { fetchOneAlbum, getInformation } from '../../actions'
import ImageForm from './ImageForm'
import ImageManagerCard from './ImageManagerCard'
import Modal from 'react-modal'
import { Transition } from "react-transition-group"

Modal.setAppElement('#root')

class ImageManager extends Component {

  constructor() {
    super()

    this.state = {
      images: [],
      albumId: '',
      addingNewImage: false,
      message: ''
    }
  }

  async componentDidMount() {
    const { id } = this.props.match.params
    if (this.props.album.id !== id) {
      await this.props.fetchOneAlbum(id)
    }
  }

  renderImages = () => {
    const { images } = this.props.album
    const sortedImages = images.sort((a, b) => a.sortOrder - b.sortOrder)
    if (!images) return <div />
    return (
      <div className='album-card'>
        {sortedImages.map(imageData => {
          return <ImageManagerCard
            key={imageData.id}
            imageData={imageData}
            albumData={this.props.album}
            setModalMessage={this.setModalMessage}
            toggleEditMode={this.toggleEditMode}
            />
        }
        )}
      </div>
    )
  }

  renderSpinner = () => (
    <div className='flex-center'>
      <Preloader />
    </div>
    )


  setModalMessage = (message) => {
    this.setState({ message })
    setTimeout(() => {
      this.setState({ message: '', addingNewImage: false })
    }, 700);
  }

  toggleEditMode = (boolean) => {
    this.setState({addingNewImage: boolean})
  }

  render() {
    if (!this.props.album.id) {
      return this.renderSpinner()
    }
    const { albumId, images } = this.props.album

    return (
      <div>
        <Nav />
        {this.state.addingNewImage && 
          <ImageForm
            exists={false}
            albumId={albumId}
            updateAlbumState={this.updateAlbumState}
            setModalMessage={this.setModalMessage}
            toggleEditMode={this.toggleEditMode}
            />
        }
        <div className='flex-center'>
          <button className='btn #03a9f4 light-blue'
            onClick={() => this.setState({addingNewImage: !this.state.addingNewImage})}>
            Add an image to the COLLECTION
          </button>
        </div>
        {images ? this.renderImages() : this.renderSpinner()}

        <Transition
          in={this.state.message}
          timeout={500}>
          {state => {
            return (
              <Modal
                contentLabel={''}
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
    fetchOneAlbum: (id) => { dispatch(fetchOneAlbum(id)) },
    fetchInformation: () => dispatch(getInformation())
  }
)

const mapStateToProps = state => (
  { album : state.album }
)

export default connect(mapStateToProps, mapDispatchToProps)(ImageManager)