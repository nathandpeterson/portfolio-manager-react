import React, { Component } from 'react'
import { CloudinaryContext } from 'cloudinary-react'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import './App.css'
import PhotoCard from './components/PhotoCard'
import Albums from './components/Albums'
import Album from './components/Album'
import AlbumForm from './components/Forms/AlbumForm'
import ImageManager from './components/Forms/ImageManager'
import InitiateLogin from './components/InitiateLogin'
import EmailForm from './components/Forms/EmailForm'
import Homepage from './components/Homepage'

const cloud_name = process.env.REACT_APP_CLOUD_NAME

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
                path="/collections/new"
                component={AlbumForm}
              />
            <Route
                exact
                path="/contact"
                component={EmailForm}  />
            <Route
                exact
                path="/collections/:id"
                component={Album} />
            <Route
                exact
                path="/collections"
                component={Albums} />             
            <Route
                exact
                path="/:albumId/:id"
                component={PhotoCard} />
            <Route
                exact
                path="/collections/:id/manageCollection"
                component={AlbumForm} />
            <Route
                exact
                path="/"
                component={Homepage} />
            <Route
                exact
                path="/collections/:id/manageImages"
                component={ImageManager}  />
            <Redirect from="/" to="/" />
          </Switch>
        </BrowserRouter>        
      </CloudinaryContext>
    );
  }
}

export default App
