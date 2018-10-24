import { FETCH_ONE_ALBUM, SAVE_ALBUM } from '../utils/Constants'

const AlbumReducer = (album = {}, action) => {
  switch(action.type){
    case FETCH_ONE_ALBUM: {
      return action.payload
    }
    case SAVE_ALBUM : {
      return action.payload
    }
    default: {
      return album
    }
  }
}

export default AlbumReducer