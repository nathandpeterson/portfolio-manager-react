import React, { Component } from 'react'
import Nav from '../Nav'
import { connect } from 'react-redux'
import { Button } from 'react-materialize'
import { uploadImageName, fetchOneAlbum } from '../../actions'
import { Image, Transformation } from 'cloudinary-react'
import NewImage from './NewImage'

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

  async componentDidMount(){
    await this.updateAlbumState()
  }

  async componentDidUpdate(prevProps, prevState){
    if(this.state.hasChanged && !prevState.hasChanged){
      this.updateAlbumState(this.props)
    }
    if(this.props.album.length !== prevProps.album.length){
      this.updateAlbumState(this.props)
    }
  }

  updateAlbumState = async (props = this.props) => {

    await this.props.fetchOneAlbum(this.props.match.params.id)
  
    try {
      const { album } = props
      const [ albumObject ] = album
      this.setState({images: albumObject.images, albumId: albumObject.id, hasChanged: false})
    } catch (error){
      console.log('ERROR', error.message)
      this.setState({error: error.message, hasChanged: false})
    }
  }

  renderImageData = (fieldName) => {
    return (
      <div className='image-field'>
        <label>TITLE</label>
        <p>{name}</p>
      </div>
    )
  }

  renderCard = ({ name, publicId, angle }) => {
  
    return (
        <div key={`image-thumbnail-${publicId}`} className='image-card-manage'>
            <Image publicId={publicId} width='200px'>
              <Transformation angle={angle}/>
            </Image>
            <div>
              <div className='image-field'>
                <label>TITLE</label>
                <p>{name}</p>
              </div>
             
            </div>           
        </div>
    )
  }

  render(){
    const { images, albumId } = this.state
    console.log('this props', this.props)
    return (
      <div>
        <Nav />
        <div className='album-flex-container'>
          {images.map(this.renderCard)}
        </div>
        <Button onClick={() => {
          this.setState({addingNewImage: !this.state.addingNewImage})
        }}>Add an image to the album
        </Button>
        
        {this.state.addingNewImage ?
          <NewImage albumId={albumId} updateAlbumState={this.updateAlbumState} />
          : ''
        }
      </div>
    )
  }
}

const mapStateToProps = state => (
  { album: state.albums }
)

const mapDispatchToProps = dispatch => (
  { 
    fetchOneAlbum: (id) => { dispatch(fetchOneAlbum(id)) }
  }
)

export default connect(mapStateToProps, mapDispatchToProps)(ImageManager)