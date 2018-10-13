import React, { Component } from 'react'
import { CloudinaryContext, Image } from 'cloudinary-react'
import { fetchPhotos } from './utils/CloudinaryService'
import { photosFetched } from './actions'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import './App.css'
import {cloud_name, upload_preset} from './config/config'
import GroupThumbnails from './components/GroupThumbnails'
import PhotoCard from './components/PhotoCard'
import AddPhoto from './components/AddPhoto'

class App extends Component {
  async componentDidMount() {
    const result = await fetchPhotos(cloud_name)
    console.log('result', result)
  }

  render() {
    return (
      <CloudinaryContext cloudName={cloud_name}>
        <BrowserRouter>
          <Switch className="router">
                          <Route
                              exact
                              path="/photos"
                              component={GroupThumbnails}
                          />
                          <Route
                              exact
                              path="/photos/:id"
                              component={PhotoCard}
                          />
                          <Route
                              exact
                              path="/photos/new"
                              component={AddPhoto}
                          />
                      
                          <Redirect from="/" to="/photos" />
                      </Switch>

          </BrowserRouter>
      </CloudinaryContext>
    );
  }
}

export default App
