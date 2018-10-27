import React, {Component} from 'react'
import { Image } from 'cloudinary-react'
import { Button } from 'react-materialize'
import Nav from './Nav'
import { Link, withRouter } from 'react-router-dom'
import { fetchOneAlbum } from '../actions'
import { connect } from 'react-redux'

class Album extends Component {

  async componentDidMount() {
    const { id } = this.props.match.params
    await this.props.fetchOneAlbum(id)
  }

  renderManageButton(){
    const token = localStorage.getItem('token')
    if(!token) {
      return <div />
    } else {
      const { id } = this.props.match.params
      return (
        <div className='flex-center'>
          <Button className='#03a9f4 light-blue'
                onClick={() => this.props.history.push(`/collections/${id}/manage`)}>
            EDIT COLLECTION
          </Button>
        </div>
      )
    }
  }

  renderImages(){
    const { album, album : { images } } = this.props
    const sortedImages = images.sort((a, b) => a.id - b.id)
    return (
      <div className='album-flex-container'>
        {images && images.map((image) => {
          const {publicId, id, angle } = image
          return (
          <div key={publicId} style={{ padding: '1rem' }}>
            <Link to={`/${album.id}/${id}`} >
              <Image publicId={publicId} width='180px'  style={{transform: `rotate(${angle}deg)`}}  />
            </Link>
          </div>
            )}
          )}
        </div>
    )
  }

  render() {
    if(!this.props.album.id) return <div>loading</div>
  
    return (
      <div>
        <div >
          <Nav />
        </div>
        {this.renderManageButton()}
        {this.renderImages()}
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