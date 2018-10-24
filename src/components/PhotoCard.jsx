import React, {Component} from 'react'
import { Image } from 'cloudinary-react'
import Nav from './Nav'
import { connect } from 'react-redux'
import { fetchOneAlbum } from '../actions'

class PhotoCard extends Component {

  async componentDidMount() {
    const { albumId } = this.props.match.params
    await this.props.fetchOneAlbum(albumId)
  }

  render(){
    if(!this.props.album.id) return <div>loading</div>
    const { images } = this.props.album
    const { publicId, id } = images.find(image => {
      return parseInt(image.id, 10) === parseInt(this.props.match.params.id, 10)
    })

    return (
      <div key={publicId}>
          <Nav />
          <div className='flex-center image-container'>
            <Image id={id} 
                width='auto' 
                height='600px' 
                publicId={publicId}></Image>
          </div>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => (
  { fetchOneAlbum: (id) => { dispatch(fetchOneAlbum(id)) } }
)

const mapStateToProps = state => (
  { album: state.album }
)


export default connect(mapStateToProps, mapDispatchToProps)(PhotoCard)