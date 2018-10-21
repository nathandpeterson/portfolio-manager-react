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
    if(!this.props.album.length) return <div>loading</div>
    const [ album ] = this.props.album
    const { images } = album 

    return (
      <div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Nav />
        </div>
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'space-evenly',
          alignItems: 'center'
        }}>
          {images && images.map((image) => {
            const {publicId, id} = image
            return (
            <div key={publicId} style={{ padding: '1rem' }}>
              <Link to={`/albums/${album.id}/photos/${id}`} >
                <Image publicId={publicId} width='150px' />
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
  return { album: state.albums }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchOneAlbum: (id) => { dispatch(fetchOneAlbum(id)) }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Album))