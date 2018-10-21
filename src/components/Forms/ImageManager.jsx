import React, { Component } from 'react'
import Nav from '../Nav'
import { connect } from 'react-redux'
import { Button, Row, Col, Card } from 'react-materialize'
import { uploadImageName, fetchOneAlbum } from '../../actions'
import { Image } from 'cloudinary-react'
import NewImage from './NewImage'

class ImageManager extends Component {

  constructor(){
    super()

    this.state = {
      images: [],
      albumId: '',
      addingNewImage: false
    }
  }

  async componentDidMount(){
    await this.props.fetchOneAlbum(this.props.match.params.id)
  }

  async componentDidUpdate(prevProps){
    if(this.props.album !== prevProps.album){
      this.updateAlbumState(this.props)
    }
  }

  updateAlbumState = async (props = this.props) => {

    await this.props.fetchOneAlbum(this.props.match.params.id)

    try {
      const { album } = props
      const [ albumObject ] = album
      this.setState({images: albumObject.images, albumId: albumObject.id})
    } catch (error){
      console.log('ERROR', error.message)
    }
  }

  renderCard = ({ name, publicId}) => {
   
    return (
      <Col key={`image-thumbnail-${publicId}`} sm={4} style={{width: '25%'}}>
        <Card >
           <p>{name}</p>
           <Image publicId={publicId} width='150px' />
        </Card>
      </Col>
    )
  }

  render(){
    const { images, albumId } = this.state

    return (
      <div>
        <Nav />

        {images.map(this.renderCard)}
        <Button onClick={() => {
          this.setState({addingNewImage: !this.state.addingNewImage})
        }}>Add an image to the album
        </Button>
        
        {this.state.addingNewImage ?
          <NewImage albumId={albumId} updateAlbumState={this.updateAlbumState} />
          : ''
        }
      </div>
    )
  }
}

const mapStateToProps = state => (
  { album: state.albums }
)

const mapDispatchToProps = dispatch => (
  { 
    fetchOneAlbum: (id) => { dispatch(fetchOneAlbum(id)) }
  }
)

export default connect(mapStateToProps, mapDispatchToProps)(ImageManager)