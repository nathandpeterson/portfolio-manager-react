import React, { Component } from 'react'
import Nav from '../Nav'
import { connect } from 'react-redux'
import { Button, Preloader } from 'react-materialize'
import { fetchOneAlbum, getInformation } from '../../actions'
import ImageForm from './ImageForm'
import ImageManagerCard from './ImageManagerCard';

class ImageManager extends Component {

  constructor(){
    super()

    this.state = {
      images: [],
      albumId: '',
      addingNewImage: false,
      hasChanged: false
    }
  }

  async componentDidMount() {
    const { id } = this.props.match.params
    if(this.props.album.id !== id){
      await this.props.fetchOneAlbum(id)
    }
    await this.props.fetchInformation()
  }

  renderImages = () => {
    const { images } = this.props.album
    // Change to sortPosition
    const sortedImages = images.sort((a, b) => a.id - b.id)
    if(!images) return <div />
    return (
      <div className='album-card'>
        {sortedImages.map(imageData => {
          return <ImageManagerCard
                    key={imageData.id} 
                    imageData={imageData} 
                    albumData={this.props.album} />
        }
      )}
      </div>
    )
  }

  renderSpinner = () => {
    return (
      <div className='flex-center'>
        <Preloader size={'big'} />
      </div>       
    )
  }

  render(){
    if(!this.props.album.id) {
      return this.renderSpinner()
    }
    const { albumId, images } = this.props.album
  
    return (
      <div>
        <Nav />
          {images ? this.renderImages() : this.renderSpinner()}
        <div className='flex-center'>
          <Button   className='#03a9f4 light-blue'
                    onClick={() => {
                      this.setState({addingNewImage: !this.state.addingNewImage})
                                  }}>Add an image to the COLLECTION
          </Button>
        </div>
        {this.state.addingNewImage ?
          <ImageForm
            exists={false} 
            albumId={albumId} 
            updateAlbumState={this.updateAlbumState} />
          : ''
        }
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => (
  { fetchOneAlbum: (id) => { dispatch(fetchOneAlbum(id)) },
    fetchInformation: () => dispatch(getInformation()) 
  }
)

const mapStateToProps = state => (
  { album: state.album }
)

export default connect(mapStateToProps, mapDispatchToProps)(ImageManager)