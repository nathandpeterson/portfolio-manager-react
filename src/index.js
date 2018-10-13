import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import { createStore, combineReducers } from 'redux'
import PhotosListReducer from './reducers/PhotosListReducer';
import UploadedPhotosReducer from './reducers/UploadedPhotosReducer';
import SelectedPhotoReducer from './reducers/SelectedPhotoReducer'
import { Provider } from 'react-redux'

const rootReducer = combineReducers({
  photos: PhotosListReducer,
  uploadedPhotos: UploadedPhotosReducer,
  selectedPhoto: SelectedPhotoReducer
})

const store = createStore(rootReducer)

ReactDOM.render( 
    <Provider store={store}>
      <App  />
    </Provider>, 
  document.getElementById('root'))
registerServiceWorker()
