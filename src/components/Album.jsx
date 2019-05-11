import React, { useState, useEffect } from 'react'
import { Image, Transformation } from 'cloudinary-react'
import { Preloader } from '../shared'
import Nav from './Nav'
import { Link, withRouter } from 'react-router-dom'
import { fetchOneAlbum, fetchAlbums } from '../actions'
import { connect } from 'react-redux'
import axios from 'axios'

const SERVER = process.env.REACT_APP_SERVER

const Album = ({ match, history, albums }) => {

  const [currentAlbums, setAllAlbums] = useState(null)

  useEffect(() => {
    async function fetchData(id){
      const { data } = await axios.get(`${SERVER}/albums`)
      setAllAlbums(data)
    }
    if(!albums || !albums.length){
     fetchData(match.params.id)
    } else {
      setAllAlbums(albums)
    }
  }, [])

  function renderManageButton () {
    const token = localStorage.getItem('token')
    if(!token) {
      return <div />
    } else {
      const { id } = match.params
      return (
        <div className='flex-space-around' style={{marginTop: '1rem'}}>
          <button className='btn #03a9f4 light-blue waves-light waves-effect'
                  onClick={() => history.push(`/collections/${id}/manageImages`)}>
            EDIT COLLECTION IMAGES
          </button>
          <button className='btn #03a9f4 light-blue waves-light waves-effect'
                   onClick={() => history.push(`/collections/${id}/sortImages`)}>
            SORT IMAGES
          </button>
          <button className='btn #03a9f4 light-blue waves-light waves-effect'
                  onClick={() => history.push(`/collections/${id}/manageCollection`)}
          >
          EDIT COLLECTION INFORMATION
          </button>
        </div>
      )
    }
  }

  function handleRotation (angle){
    const angleStyle = angle ? 
      {transform: `rotate(${angle}deg)`} : {}
      return angleStyle
  }

  function renderImages(){
    const thisAlbum = currentAlbums.find(albumInState => {
      return albumInState.id === Number(match.params.id)
    })
    const { images } = thisAlbum
    const sortedImages = images.sort((a, b) => a.sortOrder - b.sortOrder)
    return (
        <div className='album-flex-container'>
        {sortedImages && sortedImages.map((image) => {
          const { publicId, id, angle, name } = image
          return (
            <div key={publicId} style={{ padding: '2.5rem .5rem' }}>
              <Link to={`/${thisAlbum.id}/${id}`} >
                <Image 
                  publicId={publicId} 
                  width='auto' 
                  height='180px' 
                  style={handleRotation(angle)}
                  alt={name ? name : 'Painting by Stephen Rawls'}>
                  <Transformation height="180" width="auto" />
                  <Transformation quality="30" />
                </Image>
              </Link>
            </div>
            )}
          )}
        </div>
      )
    }

    if(!currentAlbums || !currentAlbums.length) return (
    <div className='flex-center'>
      <Preloader/>
    </div>
    )
  
    return (
      <div>
        <div >
          <Nav />
        </div>
        {renderManageButton()}
        {renderImages()}
      </div>
    )
}

const mapStateToProps = state => {
  return { album: state.album, albums: state.albums }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchOneAlbum: (id) => { dispatch(fetchOneAlbum(id)) },
    fetchAlbums: () => dispatch(fetchAlbums())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Album))