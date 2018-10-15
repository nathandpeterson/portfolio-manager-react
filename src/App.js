import React, { Component } from 'react'
import { CloudinaryContext, Image } from 'cloudinary-react'
import { fetchPhotos } from './utils/CloudinaryService'
import { photosFetched } from './actions'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import './App.css'
import { cloud_name } from './config/config'
import GroupThumbnails from './components/GroupThumbnails'
import PhotoCard from './components/PhotoCard'
import AddPhoto from './components/AddPhoto'
import Albums from './components/Albums'
import AlbumForm from './components/AlbumForm'

class App extends Component {
  async componentDidMount() {
    const result = await fetchPhotos(cloud_name)
    console.log('result', result)
  }

  render() {
    console.log('process', process.ENV)
    return (
      <CloudinaryContext cloudName={cloud_name}>
        <BrowserRouter>
          <Switch className="router">
            <Route
                exact
                path="/albums"
                component={Albums} />
            <Route
                exact
                path="/albums/new"
                component={AlbumForm}
              />
            <Route
                exact
                path="/photos"
                component={GroupThumbnails} />
            <Route
                exact
                path="/photos/:id"
                component={PhotoCard} />
            <Route
                exact
                path="/photos/new"
                component={AddPhoto}  />
            <Redirect from="/" to="/albums" />
          </Switch>
        </BrowserRouter>        
      </CloudinaryContext>
    );
  }
}

export default App
