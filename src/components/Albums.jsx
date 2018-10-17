import React, {Component} from 'react'
import Nav from './Nav'
import { albums } from '../data/fixtures'
import { Image } from 'cloudinary-react'
import { Button, Modal, Icon } from 'react-materialize'
import { withRouter, Link } from 'react-router-dom'
import Login from './Login'

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

  render(){
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
        <Button     large
                    floating
                    className='#80deea cyan lighten-3' 
                    waves='light' 
                    icon='add'
                    id="upload_widget_opener"
                    onClick={() => this.props.history.push('/albums/new')} />
        <Modal header='login-modal'
                trigger={
                <Button><Icon>person</Icon></Button>}>
            <Login />
        </Modal>
      </div>
    )
  }
}

export default withRouter(Albums)