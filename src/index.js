import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import SelectedPhotoReducer from './reducers/SelectedPhotoReducer'
import UploadImageReducer from './reducers/UploadImageReducer'
import AlbumReducer from './reducers/AlbumReducer'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'

const rootReducer = combineReducers({
  selectedPhoto: SelectedPhotoReducer,
  uploadImage: UploadImageReducer,
  albums: AlbumReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunk))

ReactDOM.render( 
    <Provider store={store}>
      <App  />
    </Provider>, 
  document.getElementById('root'))
registerServiceWorker()
