import React, {Component} from 'react'
import Nav from './Nav'
import { Image } from 'cloudinary-react'
import { Button } from 'react-materialize'
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

  getAngleForKeyAlbumImage = (images, key_image_id) => {
    const keyImageData = images.find(image => image.publicId === key_image_id)
    return (keyImageData && keyImageData.angle) ? keyImageData.angle : 0
  }

  renderAlbum = ({id, album_name, key_image_id, images, album_description }) => {
    const angle = this.getAngleForKeyAlbumImage(images, key_image_id)
    return (
      <Link to={`/collections/${id}`}
            key={`albums-${key_image_id}`} 
            onClick={() => this.props.fetchOneAlbum(id)
            }>
        <div key={`album-${id}`} className='album-card animated fadeIn'>
          <Image style={this.handleRotation(angle)} publicId={key_image_id} width='450px'/>
          <div>
            {album_name}
          </div>
          <div>
            {album_description}
          </div>
        </div>
      </Link>   
    )
  }

  renderAddAlbumButton = () => (
    <Button     large
      floating
      className='#03a9f4 light-blue' 
      waves='light' 
      icon='add'
      onClick={() => this.props.history.push('/collections/new')} />
  )

  render(){
    
    const { albums } = this.props
    const reversedAlbums = albums.reverse()
    return (
      <div>
        <Nav />
        
        <div className='flex-center'>
          <h4 className='heading'>
            Collections
          </h4>
        </div>    
        <div className='album-flex-container'>
          {reversedAlbums.map(this.renderAlbum)}
          {localStorage.getItem('token') ? 
          this.renderAddAlbumButton() :
          '' } 
        </div>
       
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