import { combineReducers } from 'redux'
import SelectedPhotoReducer from './SelectedPhotoReducer'
import UploadImageReducer from './UploadImageReducer'
import AlbumsReducer from './AlbumsReducer'
import AlbumReducer from './AlbumReducer'
import EmailReducer from './EmailReducer'

export const rootReducer = combineReducers({
  selectedPhoto: SelectedPhotoReducer,
  uploadImage: UploadImageReducer,
  albums: AlbumsReducer,
  album: AlbumReducer,
  emailResponse: EmailReducer
})
