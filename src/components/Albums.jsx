import React, {Component} from 'react'
import Nav from './Nav'
import { albums } from '../data/fixtures'
import { Image } from 'cloudinary-react'
import { Button } from 'react-materialize'
import { withRouter, Link } from 'react-router-dom'
import InitiateLogin from './InitiateLogin'

class Albums extends Component {

  renderAlbum = ({id, album_name, key_image_id}) => {
    return (
      <Link to={`/albums/${id}`}>
        <div key={`album-${id}`} className='album-card'>
          <Image publicId={key_image_id} width='150px'/>
          {album_name}
        </div>
      </Link>   
    )
  }

  renderAddAlbumButton = () => (
    <Button     large
      floating
      className='#80deea cyan lighten-3' 
      waves='light' 
      icon='add'
      id="upload_widget_opener"
      onClick={() => this.props.history.push('/albums/new')} />
  )

  render(){
    console.log('this.pros', this.props.token)
    return (
      <div>
        <Nav />
        <br />
        <div className='heading flex-center'>
          ALBUMS
        </div>
        <div className='album-flex-container'>
          {albums.map(this.renderAlbum)}
        </div>
        {localStorage.getItem('token') ? 
          this.renderAddAlbumButton() :
          <InitiateLogin/> }        
      </div>
    )
  }
}


export default withRouter(Albums)