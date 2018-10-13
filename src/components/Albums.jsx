import React, {Component} from 'react'
import Nav from './Nav'
import { albums } from '../data/fixtures'
import { Image } from 'cloudinary-react'
import { Button } from 'react-materialize'
import { withRouter } from 'react-router-dom'

class Albums extends Component {

  renderAlbum = ({id, album_name, key_image_id}) => {
    return (
      <div key={`album-${id}`} className='album-card'>
        <Image publicId={key_image_id} width='150px'/>
        {album_name}
      </div>
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
                    tooltip='Add a new album'
                    tooltipOptions={{'position':'right'}}
                    className='#80deea cyan lighten-3' 
                    waves='light' 
                    icon='add'
                    id="upload_widget_opener"
                    onClick={() => this.props.history.push('/albums/new')} />
      </div>
    )
  }
}

export default withRouter(Albums)