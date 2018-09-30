import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import { createStore, combineReducers } from 'redux'
import PhotosListReducer from './reducers/PhotosListReducer';
import UploadedPhotosReducer from './reducers/UploadedPhotosReducer';
import { Provider } from 'react-redux'
import Config from './config/config'

const rootReducer = combineReducers({
  photos: PhotosListReducer,
  uploadedPhotos: UploadedPhotosReducer
})

const store = createStore(rootReducer)

ReactDOM.render( 
    <Provider store={store}>
      <App  cloudName={Config.cloud_name}
            uploadPreset={Config.upload_preset} />
    </Provider>, 
  document.getElementById('root'))
registerServiceWorker()
