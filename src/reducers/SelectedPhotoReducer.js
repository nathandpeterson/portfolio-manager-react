import { SET_SELECTED_PHOTO } from '../utils/Constants'

const selectedPhoto = (photoData={}, action) => {
  switch (action) {
    case SET_SELECTED_PHOTO:
      return photoData
    default:
      return {}
  }
}

export default selectedPhoto