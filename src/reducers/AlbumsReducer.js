import { FETCH_ALBUMS } from '../utils/Constants'

const AlbumsReducer = (albums = [], action) => {
  switch(action.type){
    case FETCH_ALBUMS: {
      return action.payload
    }
    default: {
      return albums
    }
  }
}

export default AlbumsReducer