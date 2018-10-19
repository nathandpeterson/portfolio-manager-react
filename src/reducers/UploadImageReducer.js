import { UPLOAD_IMAGE_NAME } from '../utils/Constants'

const uploadImage = (photoData={}, action) => {
  switch (action) {
    case UPLOAD_IMAGE_NAME:
      return action.imageName
    default:
      return {}
  }
}

export default uploadImage