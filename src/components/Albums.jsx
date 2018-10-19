import React, {Component} from 'react'
import Nav from './Nav'
// import { albums } from '../data/fixtures'
import { Image } from 'cloudinary-react'
import { Button } from 'react-materialize'
import { withRouter, Link } from 'react-router-dom'
import { fetchAlbums } from '../actions'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

class Albums extends Component {

  async componentDidMount(){
    const result = await fetchAlbums()
  }

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
    const { albums } = this.props
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
          '' }        
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
  return bindActionCreators({fetchAlbums}, dispatch)
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Albums))