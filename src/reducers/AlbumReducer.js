import { FETCH_ONE_ALBUM, SAVE_ALBUM, UPLOAD_IMAGE_NAME } from '../utils/Constants'

const AlbumReducer = (album = {}, action) => {
  switch(action.type){
    case FETCH_ONE_ALBUM: {
      return action.payload
    }
    case SAVE_ALBUM : {
      return action.payload
    }
    case UPLOAD_IMAGE_NAME: {
      const newImages = [...album.images].filter(image => image.id !== action.payload.id)
      const imagesWithPayload = [...newImages, action.payload]
      const newAlbum = {...album, images: imagesWithPayload}
      return newAlbum
    }
    default: {
      return album
    }
  }
}

export default AlbumReducer