import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import PhotosListReducer from './reducers/PhotosListReducer';
import SelectedPhotoReducer from './reducers/SelectedPhotoReducer'
import UploadImageReducer from './reducers/UploadImageReducer'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { uploadImageName } from './actions'

const rootReducer = combineReducers({
  photos: PhotosListReducer,
  selectedPhoto: SelectedPhotoReducer,
  uploadImage: UploadImageReducer
})

const store = createStore(rootReducer, applyMiddleware(thunk))

store.dispatch(uploadImageName())

ReactDOM.render( 
    <Provider store={store}>
      <App  />
    </Provider>, 
  document.getElementById('root'))
registerServiceWorker()
