import React, {Component} from 'react'
import { Image } from 'cloudinary-react'
import Nav from './Nav'
import { Link, withRouter } from 'react-router-dom'
import { fetchOneAlbum } from '../actions'
import { connect } from 'react-redux'

class Album extends Component {

  async componentDidMount() {
    const { id } = this.props.match.params
    await this.props.fetchOneAlbum(id)
  }

  render() {
    if(!this.props.album.id) return <div>loading</div>
    const { album, album : { images } } = this.props

    return (
      <div>
        <div >
          <Nav />
        </div>
        <div className='album-flex-container'>
          {images && images.map((image) => {
            const {publicId, id} = image
            return (
            <div key={publicId} style={{ padding: '1rem' }}>
              <Link to={`/albums/${album.id}/photos/${id}`} >
                <Image publicId={publicId} width='180px' />
              </Link>
            </div>
          )}
          )}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return { album: state.album }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchOneAlbum: (id) => { dispatch(fetchOneAlbum(id)) }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Album))