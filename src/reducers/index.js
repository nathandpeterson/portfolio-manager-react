import { combineReducers } from 'redux'
import UploadImageReducer from './UploadImageReducer'
import AlbumsReducer from './AlbumsReducer'
import AlbumReducer from './AlbumReducer'
import EmailReducer from './EmailReducer'
import InformationReducer from './InformationReducer'

export const rootReducer = combineReducers({
  uploadImage: UploadImageReducer,
  albums: AlbumsReducer,
  album: AlbumReducer,
  emailResponse: EmailReducer,
  information: InformationReducer
})
