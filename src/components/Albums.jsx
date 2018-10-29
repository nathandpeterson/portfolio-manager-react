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

  renderAlbum = ({id, album_name, key_image_id }) => {

    return (
      <Link to={`/collections/${id}`}
            key={`albums-${key_image_id}`} 
            onClick={() => this.props.fetchOneAlbum(id)
            }>
        <div key={`album-${id}`} className='album-card'>
          <Image publicId={key_image_id} width='70%'/>
          <div>
            {album_name}
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
    return (
      <div>
        <Nav />
        <br />
        <div className='album-flex-container'>
          {albums.map(this.renderAlbum)}
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