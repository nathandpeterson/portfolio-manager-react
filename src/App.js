import React, { Component } from 'react'
import { CloudinaryContext } from 'cloudinary-react'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import './App.css'
import { cloud_name } from './config/config'
import PhotoCard from './components/PhotoCard'
import Albums from './components/Albums'
import Album from './components/Album'
import AlbumForm from './components/Forms/AlbumForm'
import ImageManager from './components/Forms/ImageManager'
import InitiateLogin from './components/InitiateLogin';

class App extends Component {

  render() {
  
    return (
      <CloudinaryContext cloudName={cloud_name}>
        <BrowserRouter>
          <Switch className="router">
            <Route exact 
                  path='/login' 
                  component={InitiateLogin}/>
            <Route
                exact
                path="/albums/new"
                component={AlbumForm}
              />
            <Route
                exact
                path="/albums/:id"
                component={Album} />
            <Route
                exact
                path="/albums"
                component={Albums} />           
            <Route
                exact
                path="/albums/:albumId/photos/:id"
                component={PhotoCard} />
            <Route
                exact
                path="/albums/:id/manageImages"
                component={ImageManager}  />
            <Redirect from="/" to="/albums" />
          </Switch>
        </BrowserRouter>        
      </CloudinaryContext>
    );
  }
}

export default App
