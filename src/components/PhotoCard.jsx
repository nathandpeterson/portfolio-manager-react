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
    console.log('this.props', this.props)
    if(!this.props.album.length) return <div>loading</div>
    const [ album ] = this.props.album
    const { images } = album
    console.log('images', images)
    const { publicId, id } = images.find(image => {
      return parseInt(image.id, 10) === parseInt(this.props.match.params.id, 10)
    })

    return (
      <div key={publicId}>
          <Nav />
          <Image id={id} width='100%' publicId={publicId}></Image>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => (
  { fetchOneAlbum: (id) => { dispatch(fetchOneAlbum(id)) } }
)

const mapStateToProps = state => (
  { album: state.albums }
)


export default connect(mapStateToProps, mapDispatchToProps)(PhotoCard)