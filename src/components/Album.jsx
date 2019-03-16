import React, { Component } from 'react'
import { Image, Transformation } from 'cloudinary-react'
import { Preloader } from 'react-materialize'
import Nav from './Nav'
import { Link, withRouter } from 'react-router-dom'
import { fetchOneAlbum } from '../actions'
import { connect } from 'react-redux'

class Album extends Component {

  componentDidMount = async () => {
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
        <div className='flex-space-around' style={{marginTop: '2rem'}}>
          <button className='btn #03a9f4 light-blue waves-light waves-effect'
                  onClick={() => this.props.history.push(`/collections/${id}/manageImages`)}>
            EDIT COLLECTION IMAGES
          </button>
          <button className='btn #03a9f4 light-blue waves-light waves-effect'
                   onClick={() => this.props.history.push(`/collections/${id}/sortImages`)}>
            SORT IMAGES
          </button>
          <button className='btn #03a9f4 light-blue waves-light waves-effect'
                  onClick={() => this.props.history.push(`/collections/${id}/manageCollection`)}
          >
          EDIT COLLECTION INFORMATION
          </button>
        </div>
      )
    }
  }

  handleRotation = angle => {
    const angleStyle = angle ? 
      {transform: `rotate(${angle}deg)`} : {}
      return angleStyle
  }

  renderImages(){
    const { album, album : { images } } = this.props
    const sortedImages = images.sort((a, b) => a.sortOrder - b.sortOrder)
    return (
        <div className='album-flex-container'>
        {sortedImages && sortedImages.map((image) => {
          const {publicId, id, angle } = image
          return (
            <div style={{ padding: '2.5rem .5rem' }}>
              <Link to={`/${album.id}/${id}`} >
                <Image publicId={publicId} width='auto' height='180px'  style={this.handleRotation(angle)}>
                  <Transformation height="180" width="auto" />
                  <Transformation quality="60" />
                </Image>
              </Link>
            </div>
            )}
          )}
        </div>
    )
  }

  render() {
    if(!this.props.album.id) return (
    <div className='flex-center'>
      <Preloader size='big'/>
    </div>
    )
  
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