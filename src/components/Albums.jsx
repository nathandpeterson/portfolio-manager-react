import React, {Component} from 'react'
import Nav from './Nav'
import { Image, Transformation } from 'cloudinary-react'
import { withRouter, Link } from 'react-router-dom'
import { fetchAlbums, fetchOneAlbum } from '../actions'
import { connect } from 'react-redux'


class Albums extends Component {

  async componentDidMount(){
    await this.props.fetchAlbums()
  }

  handleRotation = angle => {
    const angleStyle = angle ? 
      {transform: `rotate(${angle}deg)`} : {}
      return angleStyle
  }

  getDataForKeyAlbumImage = (images, key_image_id) => {
    const keyImageData = images.find(image => image.publicId === key_image_id)
    if (keyImageData) {
      return keyImageData
    }
    return { angle: 0, name: '' }
  }

  handleClick = (id) => {
    this.props.history.push(`/collections/${id}`)
  }

  renderAlbum = ({id, album_name, key_image_id, images, album_description }) => {
    const { angle, name } = this.getDataForKeyAlbumImage(images, key_image_id)

    return (
      <div 
        key={`album-${id}`} 
        className='album-card'
        onClick={() =>this.handleClick(id)}>
        <Image 
          style={this.handleRotation(angle)} 
          publicId={key_image_id} width='450px'
          alt={name ? name : 'Painting By Stephen Rawls'}
        >
          <Transformation quality="25" />
          <Transformation width='450' height="auto" />
        </Image>
        <div>
          {album_name}
        </div>
        <div>
          {album_description}
        </div>
      </div>
    )
  }

  renderAddAlbumButton = () => (
    <div className='flex-center'>
      <button     large
        className='btn #03a9f4 light-blue waves-effect waves-light' 
        waves='light' 
        onClick={() => this.props.history.push('/collections/new')}>
        ADD NEW ALBUM
      </button>
    </div>
    
  )

  sortByUpdate = albums => {
    return albums.sort((a, b) => {
      return new Date(b.updated_at) - new Date(a.updated_at)
    })
  }

  render(){
    
    const { albums } = this.props
    const albumsSortedByLastUpdated = this.sortByUpdate(albums)
    
    return (
      <div>
        <Nav />
        
        <div className='flex-center'>
          <h4 className='heading'>
            Collections
          </h4>
        </div>
        {/* <div className='flex-center'>
          <h5 className='heading-secondary animated pulse'>
            Click to view paintings
          </h5>
        </div>     */}
        <div className='album-flex-container albums-enter'>
          {albumsSortedByLastUpdated.map(this.renderAlbum)}
         
        </div>
        {localStorage.getItem('token') && this.renderAddAlbumButton() } 
      </div>
    )
  }
}

function mapStateToProps(state){
  return {
    albums: state.albums
  }
}

function mapDispatchToProps(dispatch){
  return {
    fetchAlbums: () => dispatch(fetchAlbums()),
    fetchOneAlbum: (id) => { dispatch(fetchOneAlbum(id)) }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Albums))