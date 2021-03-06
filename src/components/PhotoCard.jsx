import React, {Component} from 'react'
import { Image, Transformation } from 'cloudinary-react'
import Nav from './Nav'
import { Preloader } from '../shared'
import { connect } from 'react-redux'
import { fetchOneAlbum } from '../actions'
import { fieldConfig } from '../utils/Constants'
import { withRouter } from 'react-router-dom'
import './PhotoCard.css'
import { ReactComponent as ChevronLeft } from '../images/ChevronLeft.svg'
import { ReactComponent as ChevronRight } from '../images/ChevronRight.svg'

class PhotoCard extends Component {

  state = {
    images: [],
    isFirst: true,
    isLast: true
  }

  async componentDidMount() {
    const { albumId } = this.props.match.params
    await this.props.fetchOneAlbum(albumId)
  }

  componentDidUpdate(prevProps) {
    if(this.props.album !== prevProps.album){
      const { images } = this.props.album;
      const sortedImages = images.sort((a, b) => a.sortPosition - b.sortPosition)
      const {isFirst, isLast} = this.isFirstOrLastInAlbum(this.props.album.images, this.props.match.params.id)
      this.setState({images: sortedImages, isFirst, isLast})
    }
  }

  renderField(label, data){
    return (
      <div key={`${label}-${data}`} className='flex-center'>
        <div style={{ marginTop: 0, fontSize: '1.25rem'}}>{data}</div>
      </div>
    )
  }

  renderText(imageData){
    // filter out fields with no values
    const fieldConfigWithValue = fieldConfig.filter(field => imageData[field.fieldName])
    return fieldConfigWithValue.map(({fieldName, label}) => {
      return this.renderField(label, imageData[fieldName])
    })
  }

  rotateStyle(angle){
    return angle ? 
    {transform: `rotate(${angle}deg)`, alignSelf: 'center'}
    :
    {alignSelf: 'center'}
  }

  marginForRotation = (degree) => {
    const absoluteDegree = Math.abs(degree)
    if(absoluteDegree === 90 || absoluteDegree === 270){
      return 'marginDown'
    } else {
      return ''
    }
  }

  loading = () => {
    return (
      <div className='flex-center'>
        <Preloader /> 
        </div>
      )
  }

  navigate = (destination) => {
    const { images } = this.state
    const currentImageId = this.props.match.params.id
    images.forEach((image, i) => {
      if(Number(image.id) === Number(currentImageId)){
        const imageToNaviagateTo = images[i + destination]
        return this.props.history.push(`/${this.props.album.id}/${imageToNaviagateTo.id}`)
      }
    })
  }

  isFirstOrLastInAlbum = (images, id) => {
    if(!images || !images.length || !id) return {isFirst : true, isLast: true }
    const isFirst = parseInt(images[0].id, 10) === parseInt(id, 10)
    const isLast = parseInt(images[images.length - 1].id, 10) === parseInt(id, 10)
    return { isFirst, isLast }
  }

  render(){
    if(!this.props.album.id) return this.loading()
    const { album: { images } , match : { params : { id } } } = this.props
    const selectedImage = images.find(image => parseInt(image.id, 10) === parseInt(id, 10))
    const { publicId, angle, name } = selectedImage
    const { isFirst, isLast } = this.isFirstOrLastInAlbum(images, id);
    return (
      <div key={publicId}>
          <Nav />
          <div
            className={'photo-card image-container ' + this.marginForRotation(angle)}
            style={{ display: 'grid', gridTemplateColumns: '10% 80% 10%' }}
          >
            <div onClick={() => this.navigate(-1)} >
              <div
                className={`nav-button back-button ${isFirst ? 'nav-button-inactive' : ''}`}>
                <ChevronLeft  />
              </div>
            </div>
            <div>
              <Image id={publicId} 
                  className='full-image'
                  style={this.rotateStyle(angle)} 
                  publicId={publicId}
                  dpr="auto"
                  responsive
                  width="auto"
                  crop="scale"
                  responsiveUseBreakpoints="true"
                  alt={name ? name : 'Painting By Stephen Rawls'}
                  >
                <Transformation quality="auto" fetchFormat="auto"/>
              </Image>
            </div>
            <div onClick={() => this.navigate(1)} >
              <div 
                className={`nav-button forward-button ${isLast ? 'nav-button-inactive' : ''}`}>
                <ChevronRight />
              </div>
            </div>
            
          </div>
          {this.renderText(selectedImage)}
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


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PhotoCard))