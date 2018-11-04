import { UPLOAD_IMAGE_NAME } from '../utils/Constants'

const uploadImage = (photoData={}, action) => {
  switch (action.type) {
    case UPLOAD_IMAGE_NAME:
      return action.payload
    default:
      return photoData
  }
}

export default uploadImage