import React, { Component } from 'react'
import Nav from '../Nav'
import { connect } from 'react-redux'
import { Button, Icon, Col, Row, Preloader } from 'react-materialize'
import { uploadImageName, fetchOneAlbum } from '../../actions'
import { Image, Transformation } from 'cloudinary-react'
import NewImage from './NewImage'

class ImageManager extends Component {

  constructor(){
    super()

    this.state = {
      images: [],
      albumId: '',
      addingNewImage: false,
      hasChanged: false,
      editMode: null,
      loading: true
    }
  }

  async componentDidMount(){
    await this.updateAlbumState()
  }

  async componentDidUpdate(prevProps, prevState){
    if(this.state.hasChanged && !prevState.hasChanged){
      this.updateAlbumState(this.props)
    }
    if(this.props.album.length !== prevProps.album.length){
      this.updateAlbumState(this.props)
    }
  }

  updateAlbumState = async (props = this.props) => {

    await this.props.fetchOneAlbum(this.props.match.params.id)
    
    try {
      const { album } = props
      const [ albumObject ] = album
      this.setState({images: albumObject.images, 
                    albumId: albumObject.id, 
                    hasChanged: false,
                    loading: false})
    } catch (error){
      console.log('ERROR', error.message)
      this.setState({error: error.message, hasChanged: false})
    }
  }

  fieldConfig = [
    {label: 'TITLE', fieldName: 'name'},
    {label: 'DESCRIPTION', fieldName: 'description'},
    {label: 'DATE', fieldName: 'date'},
    {label: 'SIZE', fieldName: 'size'}
  ]

  renderImageData = (field, data) => {
    const { fieldName, label } = field
    return (
      <div key={`${data.publicId}-${fieldName}`} className='image-field'>
        <label>{label}</label>
        <span>{data[fieldName]}</span>
      </div>
    )
  }

  renderCard = (data) => {
    const { editMode } = this.state
    const { publicId, angle, id } = data
    return (
        <div key={`image-thumbnail-${publicId}`} className='image-card-manage'>
          
            <Image publicId={publicId} width='200px'>
              <Transformation angle={angle}/>
            </Image>
            
            <div style={{marginTop: '1rem'}}>
              {this.fieldConfig.map(field => {
                return this.renderImageData(field, data)
              })}
            </div>
            {this.renderButtonGroup(editMode, id)}
        </div>
    )
  }

  renderButtonGroup = (editMode, id) => {
    if(editMode !== id) {
      return (
      <div className='flex-center'>
        <Button onClick={() => this.setState({editMode: id})}>
          <Icon>
            edit
          </Icon>
        </Button>
      </div> 
    )} else return (
      <div className='flex-space-between'>
        <Button onClick={() => this.setState({editMode: null})}>
          CANCEL
        </Button>
        <Button onClick={() => console.log('save')}>
          SAVE
        </Button>
      </div> 
    )
  }

  renderImages = () => {
    const { images } = this.state
    return (
      <div className='album-card'>
        {images.map(this.renderCard)}
      </div>
    )
  }

  renderSpinner = () => {
    return (
      <div className='flex-center'>
        <Preloader size={'big'} />
      </div>       
    )
  }

  render(){
    const { albumId, loading } = this.state
    return (
      <div>
        <Nav />
        {loading ? this.renderSpinner() : this.renderImages()}
        <div className='flex-center'>
          <Button onClick={() => {
                      this.setState({addingNewImage: !this.state.addingNewImage})
                                  }}>Add an image to the album
          </Button>
        
        </div>
        
        
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