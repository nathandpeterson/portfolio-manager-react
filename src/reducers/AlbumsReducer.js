import { FETCH_ALBUMS, DELETE_ALBUM } from '../utils/Constants'

const AlbumsReducer = (albums = [], action) => {
  switch(action.type){
    case FETCH_ALBUMS: {
      return action.payload
    }
    case DELETE_ALBUM : {
      const { id } = action.payload
      const albumsCopy = [...albums]
      return albumsCopy.filter(album => album.id !== id )
    }
    default: {
      return albums
    }
  }
}

export default AlbumsReducer