import { FETCH_ALBUMS, FETCH_ONE_ALBUM } from '../utils/Constants'

const AlbumReducer = (albums = [], action) => {
  switch(action.type){
    case FETCH_ALBUMS: {
      return action.payload
    }
    case FETCH_ONE_ALBUM: {
      return action.payload
    }
    default: {
      return albums
    }
  }
}

export default AlbumReducer